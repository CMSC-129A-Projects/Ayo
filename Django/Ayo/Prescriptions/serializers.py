
from rest_framework import serializers

from .models import *
from django.conf import settings
from django.db.models import Q
import urllib


class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ['customer_id', 'starting_date',
                  'prescription_photo']

    def create(self, validated_data):
        try:
            instance = self.Meta.model(**validated_data)
            instance.save()
            for item in MedicineRecord.objects.filter(Q(customer_id=validated_data['customer_id']) & Q(prescription_id=None)):
                print(item)
                item.prescription_id_id = str(instance.id)
                item.save()
            return instance
        except:
            print("Error occured 1")


# do I need this?


class PrescriptionViewSerializer(serializers.ModelSerializer):
    contents = serializers.SerializerMethodField('get_content')

    def get_content(self, obj):
        content = []
        for item in (MedicineRecord.objects.filter(customer_id=obj.customer_id)):
            content.append(MedicineRecordViewSerializer(item).data)
        return content

    class Meta:
        model = Prescription
        fields = ['id', 'customer_id', 'starting_date',
                  'prescription_photo', 'contents', 'is_finished']

    def update(self, instance, validated_data):
        # TODO: what do we need to checl jere?
      #  what to put here?
        instance.is_finished = validated_data.get(
            'is_finished', instance.is_finished)
        instance.save()
        return instance


class MedicineRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicineRecord
        fields = ['customer_id', 'prescription_id', 'name', 'frequency',
                  'quantity_to_buy', 'quantity_to_take', 'first_dose']

    def create(self, validated_data):
        try:
            instance = self.Meta.model(**validated_data)
            instance.save()
            return instance
        except:
            print("Error occured 1")

    def update(self, instance, validated_data):
        # TODO: what do we need to checl jere?
        instance.quantity_to_buy = validated_data.get(
            'quantity_to_buy', instance.quantity_to_buy)
        instance.save()
        return instance

# do I need this?


class MedicineRecordViewSerializer(serializers.ModelSerializer):

    class Meta:
        model = MedicineRecord
        fields = ['id', 'customer_id', 'prescription_id', 'name', 'frequency',
                  'quantity_to_buy', 'quantity_to_take', 'first_dose']
