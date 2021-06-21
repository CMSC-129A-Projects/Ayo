from rest_framework import serializers

from .models import User, PharmacyWorker, Owner, Customer
from django.conf import settings
from django.contrib.auth.models import Group


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'contact_number',
                  'address', 'password', 'role']

        extra_kwargs = {
            # does not show password on read operations
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # try:
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        if validated_data['role'] == 'Customer':
            assigned_group = Group.objects.get(name='Customer')
            assigned_group.user_set.add(instance)
        elif validated_data['role'] == 'Owner':
            assigned_group = Group.objects.get(name='Owner')
            assigned_group.user_set.add(instance)
        elif validated_data['role'] == 'Worker':
            assigned_group = Group.objects.get(name='PharmacyWorker')
            assigned_group.user_set.add(instance)
        return instance
        # except:
        #     raise(AttributeError)

    def update(self, instance, validated_data):
        # TODO: what do we need to checl jere?
        try:
            instance.name = validated_data.get('name', instance.name)
            if validated_data.get('password') and validated_data.get('password') != instance.password:
                instance.set_password(validated_data.get(
                    'password'))
            instance.address = validated_data.get('address', instance.address)
            instance.contact_number = validated_data.get(
                'contact_number', instance.contact_number)
            instance.save()
            return instance
        except e:
            print(e)


class UserViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'name', 'contact_number',
                  'address', 'id', 'role']


class PharmacyWorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PharmacyWorker
        fields = ['worker_user', 'medical_license']

    def create(self, validated_data):
        try:
            instance = self.Meta.model(**validated_data)
            instance.save()
            return instance
        except e:
            print(e)


class PharmacyWorkerViewSerializer(PharmacyWorkerSerializer):
    medical_license = serializers.SerializerMethodField('get_image_url')

    def get_image_url(self, obj):
        preurl = settings.MEDIA_URL + obj['medical_license']
        return self.context['request'].build_absolute_uri(preurl)

    class Meta:
        model = PharmacyWorker
        fields = ['worker_user', 'medical_license', 'is_available']


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['customer_user', 'valid_id1']

    def create(self, validated_data):
        try:
            instance = self.Meta.model(**validated_data)
            instance.save()
            return instance
        except e:
            print(e)


class CustomerViewSerializer(CustomerSerializer):
    valid_id1 = serializers.SerializerMethodField('get_valid_id1_url')

    def get_valid_id1_url(self, obj):
        preurl = settings.MEDIA_URL + obj['valid_id1']
        return self.context['request'].build_absolute_uri(preurl)

    class Meta:
        model = Customer
        fields = ['customer_id',
                  'valid_id1', 'is_verified', 'is_rejected']


class OwnerSerializer(UserSerializer):
    class Meta:
        model = Owner
        fields = ['owner_user', 'business_permit']

    def create(self, validated_data):
        try:
            instance = self.Meta.model(**validated_data)
            instance.save()
            return instance
        except e:
            print(e)


class OwnerViewSerializer(UserSerializer):
    business_permit = serializers.SerializerMethodField('get_image_url')

    def get_image_url(self, obj):
        preurl = settings.MEDIA_URL + obj['business_permit']
        return self.context['request'].build_absolute_uri(preurl)

    class Meta:
        model = Owner
        fields = ['owner_user', 'business_permit']
