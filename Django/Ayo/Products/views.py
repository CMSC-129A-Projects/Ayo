"""
TODO:
- reconfigure api for possible roles
"""

from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from PIL import Image
from io import BytesIO
from urllib.request import urlretrieve
import sys

from .serializers import ProductSerializer, ProductViewSerializer, GenericNameSerializer, GenericNameViewSerializer, DiseaseSerializer
from .models import Product, Disease, GenericName
from permissionfunctions import IsPharmacyStaffOrReadOnly

# Create your views here.

# helper function to convert uri from RN to django-file for storage


def uri_to_img(name, uri):
    opened_img = urlretrieve(uri)
    img = Image.open(opened_img[0])
    img_io = BytesIO()
    img.save(img_io, format='PNG')
    img_file = InMemoryUploadedFile(
        img_io, None, name.replace(" ", "") + '.png', 'images/png', sys.getsizeof(img_io), None)
    return img_file


def disease_check(data):
    for item in data['disease']:
        disease = Disease.objects.filter(
            disease_name=item).first()
        if disease is None:
            d_serializer = DiseaseSerializer(
                data={'disease_name': item})
            d_serializer.is_valid(raise_exception=True)
            d_serializer.save()

    data['disease'] = [str(Disease.objects.filter(
        disease_name=item).first().id) for item in data['disease']]

    return data


class NewProduct(APIView, IsPharmacyStaffOrReadOnly):
    permission_classes = (AllowAny,)
    # permission_classes = (IsAuthenticated, IsPharmacyStaffOrReadOnly)

    def post(self, request):
        data = request.data

        if data['price'] < 0:
            raise exceptions.APIException('Price is negative')

        if data['quantity'] < 0:
            raise exceptions.APIException('Quantity is negative')

        new_data = data.copy()
        new_data['product_img'] = uri_to_img(data['name'],
                                             data['product_img'])
        serializer = ProductSerializer(data=new_data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class Products(APIView):
    queryset = Product.objects.all()

    def get(self, request):
        serializer = ProductViewSerializer(
            Product.objects.all().values(), many=True, context={'request': request})
        return Response(serializer.data)


class ProductView(APIView, IsPharmacyStaffOrReadOnly):
    permission_classes = (AllowAny,)
    # permission_classes = (IsAuthenticated, IsPharmacyStaffOrReadOnly)

    def patch(self, request, product):
        prod = Product.objects.filter(
            id=product).first()
        finaldata = request.data.copy()

        if prod is None:
            raise exceptions.AuthenticationFailed("User not found")

        if 'price' in finaldata.keys() and finaldata['price'] < 0:
            raise exceptions.APIException('Price is negative')

        if 'quantity' in finaldata.keys() and finaldata['quantity'] < 0:
            raise exceptions.APIException('Quantity is negative')

        serializer = ProductSerializer(
            data=finaldata, instance=prod, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    def delete(self, request, product):
        product_to_delete = Product.objects.filter(
            id=product).first()
        print(product_to_delete)
        if product_to_delete != None:
            product_to_delete.delete()
            return Response("Deleted")
        else:
            return Response("Failed")


class DeletedProductList(APIView, IsPharmacyStaffOrReadOnly):
    permission_classes = (AllowAny, )
    # permission_classes = (IsAuthenticated, IsPharmacyStaffOrReadOnly)

    def post(self, request):
        print("INSIDE DELETE", request.data)
        for req_id in request.data['ids']:
            if len(Product.objects.filter(id=req_id)) == 0:
                return Response("Failed")

        for req_id in request.data['ids']:
            product_to_delete = Product.objects.filter(
                id=req_id).first()
            print(product_to_delete)
            if product_to_delete != None:
                product_to_delete.delete()
            else:
                Response("Failed")

        return Response("Deleted all")


class NewGenericName(APIView, IsPharmacyStaffOrReadOnly):
    permission_classes = (AllowAny, )
    # permission_classes = (IsAuthenticated, IsPharmacyStaffOrReadOnly)

    def post(self, request):
        data = request.data
        new_data = data.copy()

        if len(new_data['generic_name']) == 0:
            raise exceptions.APIException('No generic name provided')

        if new_data['disease'] is None or len(new_data['disease']) == 0:
            raise exceptions.APIException('No disease provided')
        # create disease first if nonexistent
        new_data = disease_check(new_data)

        serializer = GenericNameSerializer(data=new_data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class GenericNames(APIView):
    permission_classes = (AllowAny, )
    queryset = GenericName.objects.all()

    def get(self, request):
        serializer = GenericNameViewSerializer(
            GenericName.objects.all().values(), many=True, context={'request': request})
        return Response(serializer.data)


class GenericNameView(APIView, IsPharmacyStaffOrReadOnly):
    permission_classes = (AllowAny, )
    # permission_classes = (IsAuthenticated, IsPharmacyStaffOrReadOnly)

    def patch(self, request, generic):
        gen = GenericName.objects.filter(
            id=generic).first()
        finaldata = request.data.copy()

        if "generic_name" in finaldata and len(finaldata['generic_name']) == 0:
            raise exceptions.APIException('No generic name provided')

        if "disease" in finaldata.keys():
            if len(finaldata["disease"]) == 0:
                raise exceptions.APIException('No disease provided')
            finaldata = disease_check(finaldata)
        if gen is None:
            raise exceptions.AuthenticationFailed("User not found")

        serializer = GenericNameSerializer(
            data=finaldata, instance=gen, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    def delete(self, request, generic):
        generic_to_delete = GenericName.objects.filter(
            id=generic).first()
        print(generic_to_delete)
        if generic_to_delete != None:
            generic_to_delete.delete()
            return Response("Deleted")
        else:
            return Response("Failed")
