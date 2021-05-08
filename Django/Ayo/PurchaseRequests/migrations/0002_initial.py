# Generated by Django 3.2 on 2021-04-28 07:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('PurchaseRequests', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Prescriptions', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchaserequest',
            name='customer_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='purchaserequest',
            name='prescription_id',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='Prescriptions.prescription'),
        ),
        migrations.AddField(
            model_name='paymentslip',
            name='prescription_request_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='PurchaseRequests.purchaserequest'),
        ),
    ]
