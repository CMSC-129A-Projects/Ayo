from django.urls import path
from .views import Products, NewProduct, ProductView, DeletedProductList, NewGenericName, GenericNames, GenericNameView

urlpatterns = [
    path('product/all', Products.as_view(), name="get_products"),
    path('product/add', NewProduct.as_view(), name="add_product"),
    path('product/instance/<str:product>',
         ProductView.as_view(), name="instance_product"),
    path('product/multidelete', DeletedProductList.as_view(), name="delete_product"),
    path('generic/add', NewGenericName.as_view(), name="add_generic"),
    path('generic/all', GenericNames.as_view(), name="get_generics"),
    path('generic/instance/<str:generic>',
         GenericNameView.as_view(), name="instance_generic"),
]
