from rest_framework import serializers

from .models import *
from django.conf import settings


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'description', 'price',
                  'quantity', 'product_img', 'generic_name']

    def create(self, validated_data):
        try:
            instance = self.Meta.model(**validated_data)
            instance.save()
            return instance
        except:
            print("Error occured 1")

    def update(self, instance, validated_data):
        # TODO: what do we need to checl jere?
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.quantity = validated_data.get(
            'in_stock', instance.quantity)
        instance.product_img = validated_data.get(
            'product_img', instance.product_img)
        instance.generic_name = validated_data.get(
            'generic_name', instance.generic_name)
        instance.save()
        return instance


class ProductViewSerializer(serializers.ModelSerializer):
    product_img = serializers.SerializerMethodField('get_url')
    generic_name = serializers.SerializerMethodField('get_name')

    def get_name(self, obj):
        gen = GenericName.objects.filter(id=obj['generic_name_id']).first()
        return gen.generic_name

    def get_url(self, obj):
        preurl = settings.MEDIA_URL + obj['product_img']
        return self.context['request'].build_absolute_uri(preurl)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price',
                  'quantity', 'product_img', 'generic_name']


class GenericNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = GenericName
        fields = ['generic_name', 'disease']

    def create(self, validated_data):
        try:
            items = validated_data.pop('disease')
            instance = self.Meta.model(**validated_data)
            instance.save()
            for item in items:
                instance.disease.add(item.id)
                instance.save()
            return instance
        except:
            print("Error occured 1")

    def update(self, instance, validated_data):
        # TODO: what do we need to checl jere?
        instance.generic_name = validated_data.get(
            'generic_name', instance.generic_name)
        instance.save()
        if 'disease' in validated_data.keys():
            diseases = validated_data.pop('disease')
            for item in diseases:
                instance.disease.add(item.id)
                instance.save()
        return instance


class GenericNameViewSerializer(serializers.ModelSerializer):
    disease = serializers.SerializerMethodField('get_generic')

    def get_generic(self, obj):
        gen = GenericName.objects.filter(id=obj['id']).first()
        return [str(item) for item in gen.disease.all()]

    class Meta:
        model = GenericName
        fields = ['id', 'generic_name', 'disease']


class DiseaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disease
        fields = ['id', 'disease_name']

    def create(self, validated_data):
        try:
            instance = self.Meta.model(**validated_data)
            instance.save()
            return instance
        except:
            print("Error occured 1")

    def update(self, instance, validated_data):
        # TODO: what do we need to checl jere?
        instance.disease_name = validated_data.get(
            'disease_name', instance.disease_name)
        instance.save()
        return instance
