"""
TODO:
- reconfigure api for possible roles
"""


from django.shortcuts import render
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import exceptions, status, permissions
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from PIL import Image
from io import BytesIO
from urllib.request import urlretrieve
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys
from django.db.models import Q
import uuid

from .serializers import PharmacyWorkerSerializer, UserSerializer, UserViewSerializer, OwnerSerializer, CustomerSerializer, CustomerViewSerializer, PharmacyWorkerViewSerializer, OwnerViewSerializer
from .models import User, PharmacyWorker, Customer, Owner
from .authentication import generate_access_token, JWTAuthentication


# Create your views here.

# helper function to convert uri from RN to django-file for storage

def uri_to_img(role, uri, username):
    opened_img = urlretrieve(uri)
    img = Image.open(opened_img[0])
    img_io = BytesIO()
    img.save(img_io, format='PNG')
    imgtype = "id1" if role == "Customer" else "permit" if role == "Owner" else "license"
    img_file = InMemoryUploadedFile(
        img_io, None, username + imgtype + '.png', 'images/png', sys.getsizeof(img_io), None)
    return img_file


class IsOwnerOrReadOnly(permissions.BasePermission):
    """Allow unsafe methods for admin users only."""

    def has_permission(self, request, view):
        if not request.user or isinstance(request.user, AnonymousUser):
            return False
        if request.user.is_superuser:
            return True
            # return bool(request.user.role == "Owner" or request.user.role == "Worker")

        return bool(request.user.role == "Owner")


class IsPharmacyStaffOrReadOnly(permissions.BasePermission):
    """Allow unsafe methods for admin users only."""

    def has_permission(self, request, view):
        if not request.user:
            return False
        if request.user.is_superuser:
            return True
        return bool(request.user.role == "Owner" or request.user.role == "Worker")

# TODO: edit this to add viewing capabiliies for other users


class User(APIView):
    # authentication_classes = []
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = get_user_model().objects.filter(id=request.user.id).values()[0]
        serializer = UserViewSerializer(user)
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
    # authentication_classes = []
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly, )
    queryset = get_user_model().objects.all()

    def get(self, request):
        serializer = UserSerializer(get_user_model().objects.all(), many=True)
        print(type(serializer))
        return Response({
            "data": serializer.data
        })


class RegisterUser(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        new_data = data.copy()
        new_data['id'] = uuid.uuid4()

        if(data['password'] != data['password_confirm']):
            raise exceptions.APIException('Passwords do not match')

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
        print(serializer_img.validated_data)
        serializer_img.save()

        print("MANA TA VRO")
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

# TODO: add a password checking in frontend  (new_passowrd in frontend)


class LoginUser(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
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
        token = generate_access_token(user)
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response


class UnverifiedCustomers(APIView, IsOwnerOrReadOnly):
    # authentication_classes = [JWTAuthentication]
    permission_classes = [IsOwnerOrReadOnly]

    def get(self, request):
        unverified = Customer.objects.filter(
            Q(is_verified=False) & Q(is_rejected=False)).values()
        print(unverified)
        serializer = CustomerViewSerializer(
            unverified, many=True, context={'request': request})
        return Response(serializer.data)


class ApproveCustomer(APIView, IsOwnerOrReadOnly):
    # authentication_classes = [JWTAuthentication]
    permission_classes = (IsOwnerOrReadOnly, )

    def patch(self, request):
        customer = Customer.objects.get(customer_user=request.data['id'])
        customer.approve()
        return Response("Successful")


class RejectCustomer(APIView, IsOwnerOrReadOnly):
    # authentication_classes = [JWTAuthentication]
    permission_classes = (IsOwnerOrReadOnly, )

    def patch(self, request):
        customer = Customer.objects.get(customer_user=request.data['id'])
        customer.reject()
        return Response("Successful")
