from django.core.files.base import File
from django.shortcuts import render
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.permissions import IsAuthenticated
from PIL import Image
from io import BytesIO
from urllib.request import urlretrieve, urlopen
from dateutil import parser
import requests
import datetime
import sys

from .models import *
from .serializers import *

# Create your views here.


def uri_to_img(uri, idnum, starting_date):
    opened_img = urlretrieve(uri)
    img = Image.open(opened_img[0])
    img_io = BytesIO()
    img.save(img_io, format='PNG')
    img_file = InMemoryUploadedFile(
        img_io, None, idnum + starting_date + 'prescription_photo.png', 'images/png', sys.getsizeof(img_io), None)
    return img_file


def uri_to_file(uri, idnum, starting_date):
    opened_file = requests.get(uri)
    with open("/tmp/"+idnum+starting_date+".pdf", "wb") as f:
        f.write(opened_file.content)
    reopen = open("/tmp/"+idnum+starting_date+".pdf", "rb")
    django_file = File(reopen)
    return django_file


class FreeMedicineRecords(APIView):
    permission_classes = (IsAuthenticated, )

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
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        # DO CHECKS HERE

        serializer = MedicineRecordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


class OneMedicineRecord(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, prescitem):
        meditem = MedicineRecord.objects.filter(id=prescitem).values()[0]
        serializer = MedicineRecordViewSerializer(
            meditem, context={'request': request})
        return Response(serializer.data)


class MedicineRecordView(APIView):
    permission_classes = (IsAuthenticated, )

    def patch(self, request, prescitem):
        med = MedicineRecord.objects.filter(
            id=prescitem).first()

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

    def delete(self, request, prescitem):
        record = MedicineRecord.objects.filter(
            id=prescitem).first()

        if record is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        record.delete()

        return Response(
            "Deleted"
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
    permission_classes = (IsAuthenticated, )
    # needs improvement pa ni

    def post(self, request):
        # do checks here
        new_data = request.data.copy()
        if "prescription_photo" in new_data.keys():
            new_data['prescription_photo'] = uri_to_img(
                new_data['prescription_photo'], new_data['customer_id'], new_data['starting_date'])
            new_data['prescription_copy'] = None
        else:
            new_data['prescription_copy'] = uri_to_file(
                new_data['prescription_copy'], new_data['customer_id'], new_data['starting_date'])
            new_data['prescription_photo'] = None
        new_data['starting_date'] = parser.parse(new_data['starting_date'])
        serializer = PrescriptionSerializer(data=new_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

# go for update only?


class PrescriptionView(APIView):
    permission_classes = (IsAuthenticated, )

    def patch(self, request, prescription):
        med = Prescription.objects.filter(
            id=prescription).first()

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

    def delete(self, request, prescription):
        record = Prescription.objects.filter(
            id=prescription).first()

        if record is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        record.delete()

        return Response(
            status=status.HTTP_200_OK
        )
