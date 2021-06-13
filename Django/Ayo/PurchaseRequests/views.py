"""
TODO:
- reconfigure api for possible roles
"""


from Users.permissions import IsPharmacyStaffOrReadOnly
from urllib.request import Request

from django.contrib.auth import get_user_model
from django.db.models import Q
from django.shortcuts import render
from Prescriptions.models import Prescription
from rest_framework import exceptions, status
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from Users.models import User

from .models import *
from .serializers import *

# Create your views here.


class FreeRequestItems(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, userid):
        items = RequestItem.objects.filter(
            Q(user_id=userid) & Q(request_id=None))
        serializer = RequestItemViewSerializer(items, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class NewRequestItem(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        # DO CHECKS HERE
        data = request.data.copy()
        data['quantity'] = int(data['quantity'])

        if data['quantity'] < 0:
            raise exceptions.APIException('Negative quantity')

        if not User.objects.filter(id=data['user_id']).exists():
            raise exceptions.APIException('User does not exist')

        if not Product.objects.filter(id=data['product_id']).exists():
            raise exceptions.APIException('Product does not exist')

        serializer = RequestItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
        # call serializer


class RequestItemView(APIView):
    permission_classes = (IsAuthenticated, )

    def patch(self, request, reqitem):
        requestitem = RequestItem.objects.filter(id=reqitem).first()

        if requestitem is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if request.data.get('quantity') < 0:
            raise exceptions.APIException("Value less than 0")

        serializer = RequestItemSerializer(
            data=request.data, instance=requestitem, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_202_ACCEPTED
        )

    def delete(self, request, reqitem):
        request = RequestItem.objects.filter(id=reqitem).first()

        if request is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        request.delete()

        return Response(
            "Deleted"
        )


class DeleteMultipleItems(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        for req_id in request.data['ids']:
            if len(RequestItem.objects.filter(id=req_id)) == 0:
                return Response(
                    status=status.HTTP_400_BAD_REQUEST
                )

        for req_id in request.data['ids']:
            product_to_delete = RequestItem.objects.filter(
                id=req_id).first()
            if product_to_delete is not None:
                product_to_delete.delete()
            else:
                return Response(
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(
            status=status.HTTP_200_OK
        )


class UserOrders(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, userid):
        user = get_user_model().objects.filter(id=userid).first()

        if user is None:
            return Response(
                status=status.HTTP_400_BAD_REQUEST
            )

        orders = PurchaseRequest.objects.filter(customer_id=user.id)

        if orders is None:
            return Response(
                None,
                status=status.HTTP_200_OK
            )

        serializer = PurchaseRequestViewSerializer(orders, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class UnfulfilledOrders(APIView):
    permission_classes = (IsAuthenticated, IsPharmacyStaffOrReadOnly)

    def get(self, request):
        requests = PurchaseRequest.objects.filter(
            Q(is_confirmed=False) & Q(is_cancelled=False) & Q(is_fulfilled=False))
        serializer = PurchaseRequestViewSerializer(requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class Orders(APIView):
    permission_classes = (IsPharmacyStaffOrReadOnly, )

    def get(self, request):
        orders = PurchaseRequest.objects.all()

        if orders is None:
            return Response(
                None,
                status=status.HTTP_200_OK
            )

        serializer = PurchaseRequestViewSerializer(orders, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class Order(APIView):
    permission_classes = (IsAuthenticated, )
    # needs improvement pa ni

    def post(self, request):
        # DO CHECKS HERE
        # TODO: handle non-image files
        data = request.data

        if not User.objects.filter(id=data['customer_id']).exists():
            raise exceptions.APIException('User does not exist')

        if not RequestItem.objects.filter(Q(user_id=data['customer_id']) & Q(request_id=None)).exists():
            raise exceptions.APIException('No items to order')

        if data['request_type'] == "Prescription":
            if "prescription_id" not in data.keys() or data['prescription_id'] is None:
                raise exceptions.APIException(
                    'Prescription-type Order without Prescription')
            if not Prescription.objects.filter(id=data['prescription_id']).exists():
                raise exceptions.APIException(
                    'Prescription submitted not in database')

        serializer = PurchaseRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

# handles cancel, approve, and add order note, as well as deletion


class OrderView(APIView):
    permission_classes = (IsAuthenticated, )

    def patch(self, request, order):
        orderval = PurchaseRequest.objects.filter(id=order).first()

        if orderval is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # TODO: checks here! or add something to check for

        data = request.data.copy()
        serializer = PurchaseRequestViewSerializer(
            data=request.data, instance=orderval, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            serializer.data,
        )

    def delete(self, request, order):
        orderval = PurchaseRequest.objects.filter(id=order).first()

        if orderval is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        orderval.delete()

        return Response(
            status=status.HTTP_200_OK
        )
