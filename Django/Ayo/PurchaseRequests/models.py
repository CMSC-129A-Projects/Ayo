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

# Create your models here.


class PurchaseRequest(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    customer_id = models.ForeignKey(User, on_delete=models.CASCADE)
    is_confirmed = models.BooleanField(default=False)
    is_cancelled = models.BooleanField(default=False)
    is_fulfilled = models.BooleanField(default=False)
    request_date = models.DateTimeField(
        auto_now_add=True, blank=True, null=True)
    request_type = models.CharField(max_length=20, blank=True, null=True)
    total_cost = models.FloatField(default=0.0)


class OrderRequest(PurchaseRequest):
    class Meta:
        verbose_name = "Order Request"

    def save(self, *args, **kwargs):
        self.request_type = "Order"
        super(Owner, self).save(*args, **kwargs)


class PrescriptionRequest(PurchaseRequest):
    prescription_id = models.ForeignKey(Prescription, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Prescription Request"

    def save(self, *args, **kwargs):
        self.request_type = "Prescription"
        super(Owner, self).save(*args, **kwargs)


class RequestItem(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    quantity = models.IntegerField(default=0)
    cost = models.FloatField(default=0.0, null=True, blank=True)
    customer_id = models.ForeignKey(
        Customer, null=True, on_delete=models.CASCADE)

    def add(self):
        self.quantity = self.quantity + 1
        self.save()

    def decrement(self):
        self.quantity = self.quantity - 1
        self.save()


class PrescriptionItem(RequestItem):
    item_type = models.CharField(max_length=20, blank=True, null=True)
    prescription_request_id = models.ForeignKey(
        PrescriptionRequest, on_delete=models.CASCADE)
    medicine_recordMedicineRecord_id = models.ForeignKey(
        MedicineRecord, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Presription Item"


class OrderItem(RequestItem):
    order_request_id = models.ForeignKey(
        OrderRequest, on_delete=models.CASCADE, null=True, blank=True)
    product_id = models.ForeignKey(
        Product, null=True, blank=True, on_delete=models.CASCADE)


class PaymentSlip(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    # add total cost here?
    payment_date = models.DateTimeField(
        auto_now_add=True, blank=True, null=True)
    prescription_request_id = models.ForeignKey(
        PrescriptionRequest, on_delete=models.CASCADE)

    cost_pairs = []  # vector of UUID, float pairs
