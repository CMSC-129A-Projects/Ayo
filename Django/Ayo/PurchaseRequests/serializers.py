
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
        total = 0
        instance = self.Meta.model(**validated_data)
        instance.save()
        for item in RequestItem.objects.filter(Q(user_id=validated_data['customer_id']) & Q(request_id=None)):
            item.request_id_id = str(instance.id)
            prod = Product.objects.filter(id=item.product_id_id).first()
            prod.quantity -= item.quantity
            print("successfully updated")
            prod.save()
            total += item.quantity * item.product_id.price
            item.save()
        instance.total_cost = total
        instance.save()
        return instance


class PurchaseRequestViewSerializer(serializers.ModelSerializer):
    contents = serializers.SerializerMethodField('get_content')

    def get_content(self, obj):
        content = []
        for item in (RequestItem.objects.filter(user_id=obj.customer_id)):
            content.append(OrderedRequestItemViewSerializer(item).data)
        return content

    class Meta:
        model = PurchaseRequest
        fields = ['id', 'customer_id', 'is_confirmed',
                  'is_cancelled', 'is_fulfilled', 'request_date',
                  'request_type', 'total_cost', 'prescription_id', 'note', 'contents']
        # extra_kwargs = {'contents': 11}

    def update(self, instance, validated_data):
        # TODO: what do we need to checl jere?
        print("IN UPDATE")
        print(validated_data)
        print(instance)
        instance.note = validated_data.get('note', instance.note)
        instance.is_fulfilled = validated_data.get(
            'is_fulfilled', instance.is_fulfilled)
        instance.is_cancelled = validated_data.get(
            'is_cancelled', instance.is_cancelled)
        instance.is_confirmed = validated_data.get(
            'is_confirmed', instance.is_confirmed)
        instance.save()
        return instance


class RequestItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestItem
        fields = ['quantity', 'product_id', 'user_id']

    def create(self, validated_data):
        print("Inside damn", validated_data)
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        # TODO: check for non-negative values
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance

# do I need this?


class RequestItemViewSerializer(serializers.ModelSerializer):
    product_id = serializers.SerializerMethodField('get_product')
    user_id = serializers.SerializerMethodField('get_user')

    def get_product(self, obj):
        return {"id": obj.product_id.id, "name": obj.product_id.name}

    def get_user(self, obj):
        return {"id": obj.user_id.id, "name": obj.user_id.name}

    class Meta:
        model = RequestItem
        fields = ['id', 'quantity', 'product_id', 'user_id', 'cost']


class OrderedRequestItemViewSerializer(serializers.ModelSerializer):
    product_id = serializers.SerializerMethodField('get_product')

    def get_product(self, obj):
        return {"id": obj.product_id.id, "name": obj.product_id.name}

    class Meta:
        model = RequestItem
        fields = ['id', 'quantity', 'product_id', 'cost']
