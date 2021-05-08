from django.contrib import admin
from .models import User, Owner, Customer, PharmacyWorker

# Register your models here.
admin.site.register(User)
admin.site.register(Owner)
admin.site.register(Customer)
admin.site.register(PharmacyWorker)
