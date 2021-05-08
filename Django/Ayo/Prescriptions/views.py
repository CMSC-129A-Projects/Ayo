from django.shortcuts import render
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from .models import *
from .serializers import *


def update_medicine_record():
    pass
    # calll serializer


def delete_medicine_record():
    pass
    # calll serializer


def delete_multiple_medicine_record():
    pass
    # calll serializer

# Create your views here.


class MedicineRecords(APIView):
    permission_classes = (IsAuthenticated, )

    # check on this!
    def get(self, request):
        items = MedicineRecord.objects.filter(prescription_id=None)
        serializer = MedicineRecordSerializer(items, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class CreateMedicineRecord(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        serializer = MedicineRecordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
        # call serializer


class ChangeMedicineRecord(APIView):
    permission_classes = (IsAuthenticated, )

    def patch(self, request):
        request = MedicineRecord.objects.filter(
            id=request.data.get('id')).first()

        if request is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = MedicineRecordSerializer(
            data=request.data, instance=request, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_202_ACCEPTED
        )

    def delete(self, request):
        record = MedicineRecord.objects.filter(
            id=request.data.get('id')).first()

        if record is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        record.delete()

        return Response(
            status=status.HTTP_200_OK
        )


class DeleteMultipleRecords(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        for req_id in request.data['ids']:
            if len(MedicineRecord.objects.filter(id=req_id)) == 0:
                return Response(
                    status=status.HTTP_400_BAD_REQUEST
                )

        for req_id in request.data['ids']:
            product_to_delete = MedicineRecord.objects.filter(
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


class UserPrescriptions(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = get_user_model().objects.filter(id=request.user.id).first()

        if user is None:
            return Response(
                status=status.HTTP_400_BAD_REQUEST
            )

        orders = Prescription.objects.filter(customer_id=user.id)

        if orders is None:
            return Response(
                None,
                status=status.HTTP_200_OK
            )

        serializer = PrescriptionSerializer(orders, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class CreatePrescription(APIView):
    permission_classes = (IsAuthenticated, )
    # needs improvement pa ni

    def post(self, request):
        new_data = request.data.copy()
        new_data['customer_id'] = request.user.id
        serializer = PrescriptionSerializer(data=new_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

# go for update only?
