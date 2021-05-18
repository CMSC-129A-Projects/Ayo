from django.urls import path

from .views import *

urlpatterns = [
    path('users', Users.as_view(), name='get_users'),
    path('register', RegisterUser.as_view(), name='register'),
    path('login', LoginUser.as_view(), name='login'),
    path('unverifiedcustomers', UnverifiedCustomers.as_view(),
         name='unverified_customers'),
    path('approve', ApproveCustomer.as_view(), name='approve_application'),
    path('reject', RejectCustomer.as_view(), name='reject_application'),
    path('user', User.as_view(), name='account'),
]
