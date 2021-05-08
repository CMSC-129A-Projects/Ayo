# backend/management/commands/initgroups.py
from django.core.management import BaseCommand
from django.contrib.auth.models import Group, Permission

from Users import models as umodels
from Products import models as pdmodels
from PurchaseRequests import models as pcmodels
from Prescriptions import models as psmodels
# from Users import models
# from Users import models

GROUPS_PERMISSIONS = {
    'Owner': {
        umodels.User: ['add', 'change', 'delete', 'view'],
        umodels.Owner: ['add', 'change', 'delete', 'view'],
        umodels.PharmacyWorker: ['add', 'change', 'delete', 'view'],
        umodels.Customer: ['change', 'view'],
        pdmodels.Product: ['add', 'change', 'delete', 'view'],
        pcmodels.PurchaseRequest: ['change', 'view'],
        pcmodels.RequestItem: ['change', 'view'],
        psmodels.MedicineRecord: ['view'],
        psmodels.Prescription: ['view'],
    },
    'PharmacyWorker': {
        umodels.User: ['add', 'change', 'view'],
        umodels.PharmacyWorker: ['add', 'change', 'view'],
        umodels.Customer: ['view'],
        pdmodels.Product: ['add', 'change', 'delete', 'view'],
        pcmodels.PurchaseRequest: ['change', 'view'],
        pcmodels.RequestItem: ['change', 'view'],
        psmodels.MedicineRecord: ['view'],
        psmodels.Prescription: ['view'],
    },
    'Customer': {
        umodels.User: ['add', 'change', 'view'],
        umodels.Customer: ['view'],
        pdmodels.Product: ['add', 'change', 'delete', 'view'],
        pcmodels.PurchaseRequest: ['add', 'change', 'delete', 'view'],
        pcmodels.RequestItem: ['add', 'change', 'view'],
        psmodels.MedicineRecord: ['add', 'change', 'view'],
        psmodels.Prescription: ['add', 'change', 'view'],
    },
}


class Command(BaseCommand):
    def __init__(self, *args, **kwargs):
        super(Command, self).__init__(*args, **kwargs)

    help = "Create default groups"

    def handle(self, *args, **options):
        # Loop groups
        for group_name in GROUPS_PERMISSIONS:

            # Get or create group
            group, created = Group.objects.get_or_create(name=group_name)

            # Loop models in group
            for model_cls in GROUPS_PERMISSIONS[group_name]:

                # Loop permissions in group/model
                for perm_index, perm_name in \
                        enumerate(GROUPS_PERMISSIONS[group_name][model_cls]):

                    # Generate permission name as Django would generate it
                    codename = perm_name + "_" + model_cls._meta.model_name

                    try:
                        # Find permission object and add to group
                        perm = Permission.objects.get(codename=codename)
                        group.permissions.add(perm)
                        self.stdout.write("Adding "
                                          + codename
                                          + " to group "
                                          + group.__str__())
                    except Permission.DoesNotExist:
                        self.stdout.write(codename + " not found")
