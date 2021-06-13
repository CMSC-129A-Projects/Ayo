from django.urls import path, re_path

from .views import *

urlpatterns = [
    path('items/free/<str:userid>', FreeMedicineRecords.as_view(),
         name="get_free_prescitems"),
    path('items/add', NewMedicineRecord.as_view(), name="add_prescitem"),
    path('items/instance/<str:prescitem>',
         MedicineRecordView.as_view(), name="instance_prescitems"),
    path('items/multidelete', DeleteMultipleRecords.as_view(),
         name="multidel_prescitems"),
    path('prescription/all/<str:userid>',
         UserPrescriptions.as_view(), name="get_user_prescriptions"),
    path('prescription/add', NewPrescription.as_view(), name="add_prescription"),
    path('prescription/instance/<str:prescription>',
         PrescriptionView.as_view(), name="instance_prescription"),
]
