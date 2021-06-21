from django.urls import path
from .views import OneProduct, Products, NewProduct, ProductView, DeletedProductList, NewGenericName, GenericNames, GenericNameView

urlpatterns = [
    path('product/all', Products.as_view(), name="get_products"),
    path('product/add', NewProduct.as_view(), name="add_product"),
    path('product/instance/<str:product>',
         OneProduct.as_view(), name="one_product"),
    path('product/instance/change/<str:product>',
         ProductView.as_view(), name="instance_product"),
    path('product/multidelete', DeletedProductList.as_view(), name="delete_product"),
    path('generic/add', NewGenericName.as_view(), name="add_generic"),
    path('generic/all', GenericNames.as_view(), name="get_generics"),
    path('generic/instance/<str:generic>',
         GenericNameView.as_view(), name="instance_generic"),
]
