# Generated by Django 3.2 on 2021-05-13 07:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Prescriptions', '0004_alter_medicinerecord_prescription_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='medicinerecord',
            name='customer_id',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]