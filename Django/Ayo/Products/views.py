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

def uri_to_img(name, uri):
    opened_img = urlretrieve(uri)
    img = Image.open(opened_img[0])
    img_io = BytesIO()
    img.save(img_io, format='PNG')
    img_file = InMemoryUploadedFile(
        img_io, None, name.replace(" ", "") + '.png', 'images/png', sys.getsizeof(img_io), None)
    return img_file


class NewProduct(APIView):

    def post(self, request):
        data = request.data
        new_data = data.copy()
        new_data['product_img'] = uri_to_img(data['name'],
                                             data['product_img'])
        serializer = ProductSerializer(data=new_data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

# TODO: add a password checking in frontend  (new_passowrd in frontend)


@api_view(['GET'])
def products(request):
    serializer = ProductViewSerializer(
        Product.objects.all().values(), many=True, context={'request': request})
    return Response(serializer.data)


class ChangedProduct(APIView):

    def patch(self, request):
        product = Product.objects.filter(
            id=request.data.get('id')).first()
        finaldata = request.data.copy()

        if products is None:
            raise exceptions.AuthenticationFailed("User not found")

        if "name" not in finaldata.keys():
            finaldata['name'] = product.name
        if "description" not in finaldata.keys():
            finaldata['description'] = product.description
        if "price" not in finaldata.keys():
            finaldata['price'] = product.price
        if "in_stock" in finaldata.keys():
            finaldata['in_stock'] = product.in_stock
        if "in_stock" in finaldata.keys():
            finaldata['product_img'] = product.product_img

        serializer = ProductSerializer(data=finaldata, instance=product)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            'data': serializer.data
        })


class DeletedProduct(APIView):

    def delete(self, request):
        product_to_delete = Product.objects.filter(
            id=request.data['id']).first()
        print(product_to_delete)
        if product_to_delete != None:
            product_to_delete.delete()
            return Response("Deleted")
        else:
            return Response("Failed")


class DeletedProductList(APIView):

    def delete(self, request):
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
