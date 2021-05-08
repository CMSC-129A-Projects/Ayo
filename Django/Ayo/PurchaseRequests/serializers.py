from rest_framework import serializers

from .models import *
from django.conf import settings
import urllib


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['customer_id', 'quantity', 'cost', 'product_id']

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


class OrderItemViewSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    customer_id = serializers.SerializerMethodField()
    product_id = serializers.SerializerMethodField()

    def get_id(self, obj):
        return str(obj['id'])

    def get_customer_id(self, obj):
        return str(obj['customer_id_id'])

    def get_product_id(self, obj):
        return str(obj['product_id_id'])

    class Meta:
        model = OrderItem
        fields = ['id', 'customer_id', 'quantity', 'cost', 'product_id']
