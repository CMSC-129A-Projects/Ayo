"""
TODO:
- check if string ba gyud ang frequency
"""
from django.db import models
from Users.models import User
import uuid

# Create your models here.


class Prescription(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    customer_id = models.ForeignKey(
        User, default=None, on_delete=models.CASCADE)
    starting_date = models.DateTimeField(
        auto_now_add=True, blank=True, null=True)
    prescription_photo = models.FileField(
        upload_to='prescription_photos', blank=True, null=True)
    prescription_copy = models.FileField(
        upload_to='prescription_copy', blank=True, null=True)  # e-prescriptions
    is_finished = models.BooleanField(default=False)


class MedicineRecord(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    prescription_id = models.ForeignKey(
        Prescription, default=None, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, blank=True, null=True)
    frequency = models.CharField(max_length=200, blank=True, null=True)
    quantity_to_buy = models.IntegerField(default=0, blank=True, null=True)
    quantity_to_take = models.IntegerField(default=0, blank=True, null=True)
    first_dose = models.DateTimeField(blank=True, null=True)
    is_ongoing = models.BooleanField(default=True, blank=True, null=True)
