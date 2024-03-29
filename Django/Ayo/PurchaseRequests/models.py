"""
   TODO:
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
    is_cancelled = models.BooleanField(blank=True, null=True, default=False)
    is_fulfilled = models.BooleanField(default=False)
    request_date = models.DateTimeField(
        auto_now_add=True, blank=True, null=True)
    request_type = models.CharField(max_length=20, blank=True, null=True)
    total_cost = models.FloatField(default=0.0)
    prescription_id = models.ForeignKey(
        Prescription, null=True, blank=True, default=None, on_delete=models.CASCADE)
    note = models.TextField(max_length=500, null=True)

    def save(self, *args, **kwargs):
        prev = PurchaseRequest.objects.filter(id=self.id).first()
        if prev is not None:
            # return stock quantity upon calcellation
            if not prev.is_cancelled and self.is_cancelled:
                total = 0
                for item in RequestItem.objects.filter(request_id_id=self.id):
                    prod = Product.objects.filter(
                        id=item.product_id_id).first()
                    prod.quantity += item.quantity
                    prod.save()

        super(PurchaseRequest, self).save(*args, **kwargs)


class RequestItem(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    quantity = models.IntegerField(default=0)
    product_id = models.ForeignKey(
        Product, default=None, on_delete=models.CASCADE)
    request_id = models.ForeignKey(
        PurchaseRequest, null=True, blank=True, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    cost = models.FloatField(default=0.0)
