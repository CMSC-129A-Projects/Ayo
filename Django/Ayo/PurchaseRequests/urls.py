from django.urls import path

from .views import *

urlpatterns = [
    path('basketitems', FreeRequestItems.as_view()),
    path('addtobasket', RequestItems.as_view()),
    path('changebasketitem', ChangeRequestItems.as_view())
]
