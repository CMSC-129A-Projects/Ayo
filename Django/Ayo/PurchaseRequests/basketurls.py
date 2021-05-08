from django.urls import path

from .views import *

urlpatterns = [
    path('orderitems', OrderItems),
    path('customerorderitems', CustomerOrderItems),
    path('addorderitem', NewOrderItem.as_view()),
    path('deleteorderitem', DeletedOrderItem.as_view()),
    path('editorderitem', ChangedOrderItem.as_view()),
    path('deleteorderitemlist', DeletedOrderItemList.as_view())
]
