from django.urls import path

from .views import *

urlpatterns = [
    path('product/all', Products.as_view()),
    path('product/add', NewProduct.as_view()),
    path('product/instance/<str:product>', ProductView.as_view()),
    path('product/multidelete', DeletedProductList.as_view()),
    path('generic/add', NewGenericName.as_view()),
    path('generic/all', GenericNames.as_view()),
    path('generic/instance/<str:generic>', GenericNameView.as_view()),
]
