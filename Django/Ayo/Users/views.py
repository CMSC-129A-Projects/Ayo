"""
TODO:
- reconfigure api for possible roles
"""


from django.core.files.uploadedfile import InMemoryUploadedFile
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import exceptions, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from PIL import Image
from io import BytesIO
from urllib.request import urlretrieve
import sys
from django.db.models import Q
import uuid

from .serializers import PharmacyWorkerSerializer, UserSerializer, UserViewSerializer, OwnerSerializer, CustomerSerializer, CustomerViewSerializer, PharmacyWorkerViewSerializer, OwnerViewSerializer
from .models import PharmacyWorker, Customer, Owner
from permissionfunctions import *


# Create your views here.

# helper function to convert uri from RN to django-file for storage
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


def uri_to_img(role, uri, username):
    opened_img = urlretrieve(uri)
    img = Image.open(opened_img[0])
    img_io = BytesIO()
    img.save(img_io, format='PNG')
    imgtype = "id1" if role == "Customer" else "permit" if role == "Owner" else "license"
    img_file = InMemoryUploadedFile(
        img_io, None, username + imgtype + '.png', 'images/png', sys.getsizeof(img_io), None)
    return img_file


class User(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = get_user_model().objects.filter(id=request.user.id).values()[0]
        serializer = UserViewSerializer(user)
        serializer2 = None
        if request.user.role == "Customer":
            val = Customer.objects.filter(
                customer_user_id=user['id']).values()[0]
            serializer2 = CustomerViewSerializer(
                val, context={'request': request})
        elif request.user.role == "Owner":
            val = Owner.objects.filter(owner_user=user['id']).values()[0]
            serializer2 = OwnerViewSerializer(
                val, context={'request': request})
        elif request.user.role == "Worker":
            val = PharmacyWorker.objects.filter(
                worker_user=user['id']).values()[0]
            serializer2 = PharmacyWorkerViewSerializer(
                val, context={'request': request})

        def merge(a, b): return {**a, **b}
        return Response({
            'data': merge(serializer.data, serializer2.data)
        })

    def patch(self, request):
        data = request.data

        if 'contact_number' in data.keys():
            if not data['contact_number'].isnumeric():
                raise exceptions.APIException(
                    'Contact number contains letters')

            if len(data['contact_number']) > 10:
                raise exceptions.APIException(
                    'Contact number exceeds 10 numbers')

        if 'role' in data.keys() and data['role'] not in ('Customer', 'Owner', 'Worker'):
            raise exceptions.APIException('Incorrect Role')

        if 'valid_id1' in data.keys() and data['valid_id1'] is None:
            raise exceptions.APIException('No valid ID')

        user = get_user_model().objects.filter(
            id=request.user.id).first()

        if user is None:
            raise exceptions.AuthenticationFailed("User not found")

        serializer = UserSerializer(
            data=request.data, instance=user, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            'data': serializer.data
        })


class Users(APIView, IsOwnerOrReadOnly):
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly, )
    queryset = get_user_model().objects.all()

    def get(self, request):
        serializer = UserSerializer(get_user_model().objects.all(), many=True)
        print(type(serializer))
        return Response({
            "data": serializer.data
        })


class RegisterUser(APIView):
    """
    THINGS TO CHECK:
    - password matches
    - username contains starts with only alphanumeric and then 19 characters can follow (alphanum or underscore)
    - contact number is numeric and only has 10/9 chars
    """
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        new_data = data.copy()
        new_data['id'] = uuid.uuid4()

        if(data['password'] != data['password_confirm']):
            raise exceptions.APIException('Passwords do not match')

        if not data['contact_number'].isnumeric():
            raise exceptions.APIException('Contact number contains letters')

        if len(data['contact_number']) > 10:
            raise exceptions.APIException('Contact number exceeds 10 numbers')

        if data['role'] not in ('Customer', 'Owner', 'Worker'):
            raise exceptions.APIException('Incorrect Role')

        if data['role'] == 'Customer' and data['valid_id1'] is None:
            raise exceptions.APIException('No valid ID')

        if data['role'] == 'Owner' and data['business_permit'] is None:
            raise exceptions.APIException('No valid ID')

        if data['role'] == 'Worker' and data['medical_license'] is None:
            raise exceptions.APIException('No valid ID')

        serializer = UserSerializer(data=new_data)
        if not serializer.is_valid():
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
        serializer.save()

        if data['role'] == 'Worker':
            new_data['medical_license'] = uri_to_img(data['role'],
                                                     data['medical_license'], data['username'])
            new_data['worker_user'] = new_data['id']
            serializer_img = PharmacyWorkerSerializer(data=new_data)

        elif data['role'] == 'Owner':
            new_data['business_permit'] = uri_to_img(data['role'],
                                                     data['business_permit'], data['username'])
            new_data['owner_user'] = new_data['id']
            serializer_img = OwnerSerializer(data=new_data)

        elif data['role'] == 'Customer':
            new_data['valid_id1'] = uri_to_img(data['role'],
                                               data['valid_id1'], data['username'])
            new_data['customer_user'] = new_data['id']
            serializer_img = CustomerSerializer(data=new_data)

        serializer_img.is_valid(raise_exception=True)
        serializer_img.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

# TODO: add a password checking in frontend  (new_passowrd in frontend)


class LoginUser(APIView):
    permission_classes = (AllowAny, )

    def post(self, request):
        print("USER TIME", request.user)
        username = request.data.get('username')
        password = request.data.get('password')

        # used filter as to check if user exists
        user = get_user_model().objects.filter(username=username).first()
        print("PRE USER IS ", user)

        if user is None:
            raise exceptions.AuthenticationFailed("User not found")

        if not user.check_password(password):
            raise exceptions.AuthenticationFailed("Password is incorrect")

        response = Response()
        token = get_tokens_for_user(user)

        response.data = {
            'jwt': token
        }
        if user.role == "Customer":
            customer = Customer.objects.filter(customer_user=user.id).first()

            if customer is None:
                raise exceptions.AuthenticationFailed("User not found")

            response.data['is_verified'] = customer.is_verified
            response.data['is_rejected'] = customer.is_verified
        else:
            response.data['is_staff'] = True

        return response


class UnverifiedCustomers(APIView, IsOwnerOrReadOnly):
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly, )

    def get(self, request):
        unverified = Customer.objects.filter(
            Q(is_verified=False) & Q(is_rejected=False)).values()
        print(unverified)
        serializer = CustomerViewSerializer(
            unverified, many=True, context={'request': request})
        return Response(serializer.data)


class ApproveCustomer(APIView, IsOwnerOrReadOnly):
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly, )

    def patch(self, request):
        customer = Customer.objects.get(customer_user=request.data['id'])
        customer.approve()
        return Response("Successful")


class RejectCustomer(APIView, IsOwnerOrReadOnly):
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly, )

    def patch(self, request):
        customer = Customer.objects.get(customer_user=request.data['id'])
        customer.reject()
        return Response("Successful")
