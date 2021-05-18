# Generated by Django 3.2 on 2021-05-13 07:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Prescriptions', '0003_auto_20210502_0319'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicinerecord',
            name='prescription_id',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='Prescriptions.prescription'),
        ),
    ]
