from django.urls import path, re_path

from .views import *

urlpatterns = [
    path('requestitem/free/<str:userid>', FreeRequestItems.as_view()),
    path('requestitem/add', NewRequestItem.as_view()),
    path('requestitem/instance/<str:reqitem>', RequestItemView.as_view()),
    path('requestitem/multidelete', DeleteMultipleItems.as_view()),
    path('orders/user/<str:userid>', UserOrders.as_view()),
    path('orders/unfulfilled', UnfulfilledOrders.as_view()),
    path('orders/all', Orders.as_view()),
    path('orders/add', Order.as_view()),
    path('orders/instance/<str:order>', OrderView.as_view()),
]
