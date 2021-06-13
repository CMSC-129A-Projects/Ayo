from django.urls import path, re_path

from .views import *

urlpatterns = [
    path('requestitem/free/<str:userid>',
         FreeRequestItems.as_view(), name="get_free_reqitems"),
    path('requestitem/add', NewRequestItem.as_view(), name="add_reqitem"),
    path('requestitem/instance/<str:reqitem>',
         RequestItemView.as_view(), name="instance_reqitems"),
    path('requestitem/multidelete',
         DeleteMultipleItems.as_view(), name="multidel_reqitems"),
    path('orders/user/<str:userid>', UserOrders.as_view(), name="get_user_orders"),
    path('orders/unfulfilled', UnfulfilledOrders.as_view(),
         name="get_unfulfilled_orders"),
    path('orders/all', Orders.as_view(), name="get_orders"),
    path('orders/add', Order.as_view(), name="add_order"),
    path('orders/instance/<str:order>',
         OrderView.as_view(), name="instance_order"),
]
