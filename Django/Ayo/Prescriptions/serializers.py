
from rest_framework import serializers

from .models import *
from django.conf import settings
import urllib


class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ['customer_id', 'starting_date',
                  'prescription_id', 'prescription_copy']

    def create(self, validated_data):
        try:
            instance = self.Meta.model(**validated_data)
            instance.save()
            return instance
        except:
            print("Error occured 1")

    def update(self, instance, validated_data):
        # TODO: what do we need to checl jere?
      #  what to put here?
        instance.save()
        return instance

# do I need this?


class PrescriptionSerializer(serializers.ModelSerializer):
    #     product_img = serializers.SerializerMethodField('get_url')

    #     def get_url(self, obj):
    #         preurl = settings.MEDIA_URL + obj['product_img']
    #         return self.context['request'].build_absolute_uri(preurl)

    class Meta:
        model = Prescription
        fields = ['customer_id', 'starting_date',
                  'prescription_id', 'prescription_copy']


class MedicineRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicineRecord
        fields = ['prescription_id', 'name', 'frequency',
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
      #   instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance

# do I need this?


class RequestItemViewSerializer(ProductSerializer):
    #     product_img = serializers.SerializerMethodField('get_url')

    #     def get_url(self, obj):
    #         preurl = settings.MEDIA_URL + obj['product_img']
    #         return self.context['request'].build_absolute_uri(preurl)

    class Meta:
        model = MedicineRecord
        fields = ['prescription_id', 'name', 'frequency',
                  'quantity_to_buy', 'quantity_to_take', 'first_dose']
