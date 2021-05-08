# Generated by Django 3.2 on 2021-05-02 03:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Prescriptions', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicinerecord',
            name='prescription_id',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='Prescriptions.prescription'),
        ),
        migrations.AlterField(
            model_name='prescription',
            name='customer_id',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
