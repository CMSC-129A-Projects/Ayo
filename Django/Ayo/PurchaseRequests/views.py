from django.shortcuts import render
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from .models import *
from .serializers import *
# Create your views here.


class FreeRequestItems(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        items = RequestItem.objects.filter(request_id=None)
        serializer = PurchaseRequestViewSerializer(items, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class RequestItems(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        serializer = RequestItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
        # call serializer


class ChangeRequestItems(APIView):
    permission_classes = (IsAuthenticated, )

    def patch(self, request):
        request = RequestItem.objects.filter(id=request.data.get('id')).first()

        if request is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = RequestItemSerializer(
            data=request.data, instance=request, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_202_ACCEPTED
        )

    def delete_request_item():
        request = RequestItem.objects.filter(id=request.data.get('id')).first()

        if request is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        request.delete()

        return Response(
            status=status.HTTP_200_OK
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
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = get_user_model().objects.filter(id=request.user.id).first()

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


class UnfulfilledRequests(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        requests = PurchaseRequest.objects.filter(
            Q(is_confirmed=False) & Q(is_cancelled=False) & Q(is_fulfilled-False))
        serializer = PurchaseRequestViewSerializer(request, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class AllOrders(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        orders = PurchaseRequest.objects.all()

        if orders is None:
            return Response(
                None,
                status=status.HTTP_200_OK
            )

        serializer = PurchaseRequestViewSerializer(orders, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateOrder(APIView):
    permission_classes = (IsAuthenticated, )
    # needs improvement pa ni

    def post(self, request):
        new_data = request.data.copy()
        new_data['customer_id'] = request.user.id
        serializer = PurchaseRequestSerializer(data=new_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

# go for update only?


def cancel_order():
    pass


def approve_order():
    pass


def add_order_note():
    pass
