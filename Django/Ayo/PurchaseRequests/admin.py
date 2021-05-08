from django.contrib import admin

from .models import RequestItem, PurchaseRequest
# Register your models here.

admin.site.register(PurchaseRequest)
admin.site.register(RequestItem)
