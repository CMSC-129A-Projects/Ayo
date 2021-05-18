"""
TODO:
- reconfigure api for possible roles
"""


from urllib.request import Request
from .serializers import *
from .models import *
from rest_framework.permissions import AllowAny, IsAdminUser, AllowAny
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework import status, exceptions
from rest_framework.response import Response
from django.db.models import Q
from django.shortcuts import render

# Create your views here.


class FreeRequestItems(APIView):
    permission_classes = (AllowAny, )

    def get(self, request, userid):
        items = RequestItem.objects.filter(
            Q(user_id=userid) & Q(request_id=None))
        serializer = RequestItemViewSerializer(items, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class NewRequestItem(APIView):
    permission_classes = (AllowAny, )

    def post(self, request):
        # DO CHECKS HERE
        serializer = RequestItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
        # call serializer


class RequestItemView(APIView):
    permission_classes = (AllowAny, )

    def patch(self, request, reqitem):
        requestitem = RequestItem.objects.filter(id=reqitem).first()

        if requestitem is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if request.data.get('quantity') < 0:
            raise exceptions.AuthenticationFailed("Value less than 0")

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
            status=status.HTTP_200_OK
        )


class DeleteMultipleItems(APIView):
    permission_classes = (AllowAny, )

    def post(self, request):
        for req_id in request.data['ids']:
            if len(RequestItem.objects.filter(id=req_id)) == 0:
                return Response(
                    status=status.HTTP_400_BAD_REQUEST
                )

        for req_id in request.data['ids']:
            product_to_delete = RequestItem.objects.filter(
                id=req_id).first()
            print(product_to_delete)
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
    permission_classes = (AllowAny, )

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
    permission_classes = (AllowAny, )

    def get(self, request):
        requests = PurchaseRequest.objects.filter(
            Q(is_confirmed=False) & Q(is_cancelled=False) & Q(is_fulfilled=False))
        serializer = PurchaseRequestViewSerializer(requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class Orders(APIView):
    permission_classes = (AllowAny, )

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
    permission_classes = (AllowAny, )
    # needs improvement pa ni

    def post(self, request):
        # DO CHECKS HERE
        serializer = PurchaseRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

# handles cancel, approve, and add order note, as well as deletion


class OrderView(APIView):
    permission_classes = (AllowAny, )

    def patch(self, request, order):
        orderval = PurchaseRequest.objects.filter(id=order).first()

        if orderval is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # checks here!

        data = request.data.copy()
        print("Order type is", orderval)
        print("Passing", data)
        serializer = PurchaseRequestViewSerializer(
            data=request.data, instance=orderval, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_202_ACCEPTED
        )

    def delete(self, request, order):
        orderval = PurchaseRequest.objects.filter(id=order).first()

        if orderval is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        orderval.delete()

        return Response(
            status=status.HTTP_200_OK
        )
