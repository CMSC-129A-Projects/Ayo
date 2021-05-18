from django.urls import path, re_path

from .views import *

urlpatterns = [
    path('items/free/<str:userid>', FreeMedicineRecords.as_view()),
    path('items/add', NewMedicineRecord.as_view()),
    path('items/instance/<str:medid>', MedicineRecordView.as_view()),
    path('items/multidelete', DeleteMultipleRecords.as_view()),
    path('prescription/all/<str:userid>', UserPrescriptions.as_view()),
    path('prescription/add', NewPrescription.as_view()),
    path('prescription/instance/<str:presid>', PrescriptionView.as_view()),
]
