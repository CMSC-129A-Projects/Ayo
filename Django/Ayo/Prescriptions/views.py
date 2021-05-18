from django.shortcuts import render
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAdminUser, AllowAny

from .models import *
from .serializers import *

# Create your views here.


class FreeMedicineRecords(APIView):
    permission_classes = (AllowAny, )

    # check on this!
    def get(self, request, userid):
        items = MedicineRecord.objects.filter(
            Q(prescription_id=None) & Q(customer_id=userid))
        serializer = MedicineRecordViewSerializer(items, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class NewMedicineRecord(APIView):
    permission_classes = (AllowAny, )

    def post(self, request):
        # DO CHECKS HERE

        serializer = MedicineRecordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


class MedicineRecordView(APIView):
    permission_classes = (AllowAny, )

    def patch(self, request, medid):
        med = MedicineRecord.objects.filter(
            id=medid).first()

        if med is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # DO CHECKS HERE!

        serializer = MedicineRecordSerializer(
            data=request.data, instance=med, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_202_ACCEPTED
        )

    def delete(self, request, medid):
        record = MedicineRecord.objects.filter(
            id=medid).first()

        if record is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        record.delete()

        return Response(
            status=status.HTTP_200_OK
        )


class DeleteMultipleRecords(APIView):
    permission_classes = (AllowAny, )

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
    permission_classes = (AllowAny, )

    def get(self, request, userid):
        user = get_user_model().objects.filter(id=userid).first()

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

        serializer = PrescriptionViewSerializer(orders, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class NewPrescription(APIView):
    permission_classes = (AllowAny, )
    # needs improvement pa ni

    def post(self, request):
        # do checks here
        print(request.data)
        serializer = PrescriptionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

# go for update only?


class PrescriptionView(APIView):
    permission_classes = (AllowAny, )

    def patch(self, request, presid):
        med = Prescription.objects.filter(
            id=presid).first()

        if med is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # DO CHECKS HERE!

        serializer = PrescriptionViewSerializer(
            data=request.data, instance=med, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_202_ACCEPTED
        )

    def delete(self, request, presid):
        record = Prescription.objects.filter(
            id=presid).first()

        if record is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        record.delete()

        return Response(
            status=status.HTTP_200_OK
        )
