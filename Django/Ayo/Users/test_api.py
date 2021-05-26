from django.test import TestCase
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from django.urls import reverse
import subprocess
from django.contrib.auth.models import Group
from Users.models import User

# Define this after the ModelTestCase


class CreateUserTestCase(TestCase):
    """Test suite for the api views."""

    def setUp(self):
        """Define the test client and other test variables."""
        Group.objects.get_or_create(name="Customer")
        Group.objects.get_or_create(name="Worker")
        Group.objects.get_or_create(name="Owner")
        print(Group.objects.all())
        self.client = APIClient()
        self.customer_data = {
            "username": "customer",
            "name": "cust",
            "password": "yep",
            "password_confirm": "yep",
            "role": "Customer",
            "contact_number": "234421132",
            "valid_id1": "https://i.ytimg.com/vi/7eGKDuJ-E1w/hqdefault.jpg",
            "address": "yep"
        }
        self.owner_data = {
            "username": "owner",
            "name": "own",
            "password": "yep",
            "password_confirm": "yep",
            "role": "Owner",
            "contact_number": "234421132",
            "business_permit": "https://i.ytimg.com/vi/7eGKDuJ-E1w/hqdefault.jpg",
            "address": "yep"
        }
        self.response = self.client.post(
            reverse('register'),
            self.owner_data,
            format="json",
        )

    def test_api_can_create_a_user(self):
        """Test the api has user creation capability."""
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_api_login(self):
        """Test the api has user creation capability."""
        self.response2 = self.client.post(
            reverse('register'),
            self.customer_data,
            format="json",
        )

        response = self.client.post(
            reverse('login'),
            self.customer_data,
            format="json",
        )

        response2 = self.client.post(
            reverse('login'),
            self.owner_data,
            format="json",
        )
        print(response2.data)

        self.assertEquals(list(response.data['jwt'].keys()), [
                          'refresh', 'access'])
        self.assertEquals(list(response2.data['jwt'].keys()), [
                          'refresh', 'access'])

        self.customer_refresh = response.data['jwt']['refresh']
        self.customer_access = response.data['jwt']['access']
        self.owner_refresh = response2.data['jwt']['refresh']
        self.owner_access = response2.data['jwt']['access']

    # def test_api_can_get_all_users(self):
    #     response = self.client.get(
    #         reverse('get_users'),
    #     )
    #     self.assertIsInstance(response.data, type([]))
