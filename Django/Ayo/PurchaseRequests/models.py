"""
   TODO
   continue this
   check if needed pa ba gyud ang separate labels
   check if needed ba nga vector ang cost_pairs a la class diag
"""

from django.db import models
import uuid

from Users.models import User, Customer
from Products.models import Product
from Prescriptions.models import MedicineRecord, Prescription
from Products.models import Product

# Create your models here.


class PurchaseRequest(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    customer_id = models.ForeignKey(
        User, default=None, on_delete=models.CASCADE)
    is_confirmed = models.BooleanField(default=False)
    is_cancelled = models.BooleanField(default=False)
    is_fulfilled = models.BooleanField(default=False)
    request_date = models.DateTimeField(
        auto_now_add=True, blank=True, null=True)
    request_type = models.CharField(max_length=20, blank=True, null=True)
    total_cost = models.FloatField(default=0.0)
    prescription_id = models.ForeignKey(
        Prescription, default=None, on_delete=models.CASCADE)
    note = models.TextField(max_length=500, null=True)

    # TODO: update this
    def save(self, *args, **kwargs):
        super(PurchaseRequest, self).save(*args, **kwargs)


class RequestItem(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    quantity = models.IntegerField(default=0)
    product_id = models.ForeignKey(
        Product, default=None, on_delete=models.CASCADE)
    request_id = models.ForeignKey(
        PurchaseRequest, default=None, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    cost = models.FloatField(default=0.0)
