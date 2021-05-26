"""
TODO:
Recheck if needed valid ids per user
- update django roles
- if there are special roles for pharmacist
"""

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

import uuid

# nullable for now

# AbstractUser so that we can use Django Authorization functions


class UserManager(BaseUserManager):

    def create_user(self, username, name, contact_number, address, role, password=None):

        if not username:
            raise ValueError("User must have a username")
        if not name:
            raise ValueError("User must have a name")
        if not contact_number:
            raise ValueError("User must have a contact number")
        if not address:
            raise ValueError("User must have an address")
        if not password:
            raise ValueError("User must have a password")
        if not role:
            raise ValueError("User must have a role")

        user = self.model(username=username,
                          name=name, contact_number=contact_number, address=address, role=role)
        user.set_password(password)
        user.save(self._db)

        return user

    def create_staffuser(self, name, contact_number, address, role, password=None):
        user = self.create_user(name, contact_number, address, password, role)
        user.is_staff = True

        user.save(using=self._db)

        return user

    def create_superuser(self, username, name, contact_number, address, role, password=None):
        user = self.create_user(
            username, name, contact_number, address, password, role)
        user.is_superuser = True
        user.is_staff = True

        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Represents a User inside the system"""
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, unique=True)
    name = models.CharField(max_length=200)
    contact_number = models.CharField(max_length=15)
    address = models.CharField(max_length=200)
    registration = models.DateTimeField(
        auto_now_add=True, null=True, blank=True)
    password = models.CharField(max_length=200, blank=True)
    role = models.CharField(max_length=10, null=True, blank=True)
    username = models.CharField(max_length=15, unique=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['name', 'contact_number', 'address', 'role']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.validate_unique()
        super(User, self).save(*args, **kwargs)


class Owner(models.Model):
    owner_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    owner_user = models.OneToOneField(
        User, null=True, related_name="owner_user_id", on_delete=models.CASCADE)
    business_permit = models.FileField(
        upload_to='business_permit', blank=True, null=True)

    class Meta:
        verbose_name = "Pharmacy Owner"


class Customer(models.Model):
    customer_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    customer_user = models.OneToOneField(
        User, null=True, related_name="customer_user_id", on_delete=models.CASCADE)
    valid_id1 = models.FileField(
        upload_to='customer_ids', blank=True, null=True)
    # valid_id2 = models.FileField()
    medical_record = models.FileField(
        upload_to='customer_medical_records', null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    is_rejected = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Customer"

    def approve(self):
        self.is_verified = True
        self.save()

    def reject(self):
        self.is_rejected = True
        self.save()


class PharmacyWorker(models.Model):
    worker_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    worker_user = models.OneToOneField(
        User, null=True, related_name="workers_user_id", on_delete=models.CASCADE)
    medical_license = models.FileField(
        upload_to='medical_licences', blank=True, null=True)
    is_available = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Pharmacy Worker"
