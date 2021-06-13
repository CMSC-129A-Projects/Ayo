from django.test import TestCase
import unittest
from .models import Customer, User
import django.core.exceptions

# Create your tests here.


class UserModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(
            username="cust",
            name="own",
            password="yep",
            role="Customer",
            contact_number="yep",
        )
        cls.customer = Customer.objects.create(
            customer_user=cls.user,
            valid_id1="http://127.0.0.1:8000/media/business_permit/p6.png"
        )

    def test_string(self):
        """Test if Model string is name"""
        self.assertEquals(str(self.user), "own")

    def register_same(self):
        try:
            a = User.objects.create(
                username="cust",
                name="own",
                password="yep",
                role="Customer",
                contact_number="yep",
            )
        except Exception as e:
            return type(e)

    def test_same_username(self):
        self.assertEquals(
            self.register_same(), django.core.exceptions.ValidationError)

    def test_approve(self):
        self.customer.approve()
        self.assertEquals(
            self.customer.is_verified, True)

    def test_reject(self):
        self.customer.reject()
        self.assertEquals(
            self.customer.is_rejected, True)
