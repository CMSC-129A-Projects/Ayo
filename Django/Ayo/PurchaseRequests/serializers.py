
from rest_framework import serializers
from django.conf import settings
from django.db.models import Q
import urllib

from .models import *


class PurchaseRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseRequest
        fields = ['customer_id', 'request_type']

    def create(self, validated_data):
        try:
            instance = self.Meta.model(**validated_data)
            for item in RequestItem.objects.filter(Q(user_id=instance.customer_id) & Q(request_id=None)):
                item.request_id = instance.id
                item.save()

            instance.save()
            return instance
        except:
            print("Error occured 1")

    def update(self, instance, validated_data):
        # TODO: what do we need to checl jere?
        instance.note = validated_data.get('note', instance.note)
        instance.total_cost = validated_data.get(
            'total_cost', instance.total_cost)
        instance.save()
        return instance

# do I need this?


class PurchaseRequestViewSerializer(serializers.ModelSerializer):
    #     product_img = serializers.SerializerMethodField('get_url')

    #     def get_url(self, obj):
    #         preurl = settings.MEDIA_URL + obj['product_img']
    #         return self.context['request'].build_absolute_uri(preurl)

    class Meta:
        model = PurchaseRequest
        fields = ['id', 'customer_id', 'is_confirmed',
                  'is_cancelled', 'is_fulfilled', 'request_date',
                  'request_type', 'total_cost', 'prescription_id', 'note']


class RequestItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestItem
        fields = ['quantity', 'product_id', 'request_id', 'user_id']

    def create(self, validated_data):
        try:
            instance = self.Meta.model(**validated_data)
            instance.save()
            return instance
        except:
            print("Error occured 1")

    def update(self, instance, validated_data):
        # TODO: check for non-negative values
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance

# do I need this?


class RequestItemViewSerializer(serializers.ModelSerializer):

    class Meta:
        model = PurchaseRequest
        fields = ['id', 'quantity', 'product_id', 'user_id', 'cost']
