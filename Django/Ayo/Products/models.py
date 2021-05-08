from django.db import models
import uuid

# Create your models here.


class Disease(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    disease_name = models.CharField(max_length=200, blank=True, null=True)


class GenericName(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    generic_name = models.CharField(max_length=200, blank=True, null=True)
    disease = models.ManyToManyField(Disease)


class Product(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    product_name = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    price = models.FloatField(default=0.0)
    quantity = models.IntegerField(default=0)
    product_img = models.FileField(
        upload_to='products', blank=True, null=True)
<<<<<<< HEAD
    generic_name = models.ForeignKey(
        GenericName, default=None, on_delete=models.CASCADE)
=======

    def __str__(self):
        return self.name
>>>>>>> 7033f8173218a63d9e22ad777f7bf199fce1c1a3
