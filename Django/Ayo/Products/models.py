from django.db import models
import uuid

# Create your models here.


class Product(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    price = models.FloatField(default=0.0)
    in_stock = models.BooleanField(default=False, blank=True)
    product_img = models.FileField(
        upload_to='products', blank=True, null=True)

    def __str__(self):
        return self.name
