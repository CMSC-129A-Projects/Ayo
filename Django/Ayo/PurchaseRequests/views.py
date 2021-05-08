"""
TODO:
- reconfigure api for possible roles
"""


from django.shortcuts import render
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from PIL import Image
from io import BytesIO
from urllib.request import urlretrieve
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys
from django.db.models import Q

from .serializers import *
from .models import *
from .authentication import generate_access_token, JWTAuthentication


# Create your views here.

# helper function to convert uri from RN to django-file for storage

class NewOrderItem(APIView):

    def post(self, request):
        data = request.data
        serializer = OrderItemSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


@api_view(['GET'])
def OrderItems(request):
    print(OrderItem.objects.all().values())
    serializer = OrderItemViewSerializer(
        OrderItem.objects.all().values(), many=True)
    return Response(serializer.data)


@api_view(['POST'])
def CustomerOrderItems(request):
    id = request.data.get('customer_id')
    serializer = OrderItemViewSerializer(
        OrderItem.objects.filter(customer_id=id).values(), many=True)
    return Response(serializer.data)


# TODO: recalculate cost?
class ChangedOrderItem(APIView):

    def patch(self, request):
        order_item = OrderItem.objects.filter(
            id=request.data.get('id')).first()

        if order_item is None:
            raise exceptions.AuthenticationFailed("User not found")

        # determine what kind of error
        if request.data.get('quantity') < 0:
            raise exceptions.AuthenticationFailed("Value less than 0")

        serializer = OrderItemSerializer(
            data=request.data, instance=order_item)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            'data': serializer.data
        })


class DeletedOrderItem (APIView):

    def post(self, request):
        order_item_to_delete = OrderItem.objects.filter(
            id=request.data['id']).first()
        print(order_item_to_delete)
        if order_item_to_delete != None:
            order_item_to_delete.delete()
            return Response("Deleted")
        else:
            return Response("Failed")


class DeletedOrderItemList(APIView):

    def post(self, request):
        for req_id in request.data['ids']:
            if len(OrderItem.objects.filter(id=req_id)) == 0:
                return Response("Failed")

        for req_id in request.data['ids']:
            order_item_to_delete = OrderItem.objects.filter(
                id=request.data['id']).first()
            print(order_item_to_delete)
            if order_item_to_delete != None:
                order_item_to_delete.delete()
                return Response("Deleted")
            else:
                return Response("Failed")

        return Response("Deleted all")
