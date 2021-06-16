from django.contrib.auth.models import AnonymousUser
from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """Allow unsafe methods for admin users only."""

    def has_permission(self, request, view):
        if not request.user or isinstance(request.user, AnonymousUser):
            print("ANONYMOUS KASI")
            return False
        if request.user.is_superuser:
            print("SUPERUSER HERE")
            return True
            # return bool(request.user.role == "Owner" or request.user.role == "Worker")

        return bool(request.user.role == "Owner")


class IsPharmacyStaffOrReadOnly(permissions.BasePermission):
    """Allow unsafe methods for admin users only."""

    def has_permission(self, request, view):
        print("REQUEST USER IS ", request.user)
        if not request.user:
            return False
        if request.user.is_superuser:
            return True

        return bool(request.user.role == "Owner" or request.user.role == "Worker")

# TODO: edit this to add viewing capabiliies for other users
