from django.urls import path

from .views import *

urlpatterns = [
    path('users', Users.as_view()),
    path('register', RegisterUser.as_view()),
    path('login', LoginUser.as_view()),
    path('unverifiedcustomers', UnverifiedCustomers.as_view()),
    path('approve', ApproveCustomer.as_view()),
    path('reject', RejectCustomer.as_view()),
    path('user', User.as_view()),
]
