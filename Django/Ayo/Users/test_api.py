from django.test import TestCase
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from django.urls import reverse
import subprocess
from django.contrib.auth.models import Group
from Users.models import User, Owner

# Define this after the ModelTestCase


class CreateUserTestCase(TestCase):
    """Test suite for the api views."""
    fixtures = ['ayofixture.json']

    def setUp(self):
        """Define the test client and other test variables."""
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
        self.pharmacist_data = {
            "username": "pharma",
            "name": "own",
            "password": "yep",
            "password_confirm": "yep",
            "role": "Worker",
            "contact_number": "234421132",
            "medical_license": "https://i.ytimg.com/vi/7eGKDuJ-E1w/hqdefault.jpg",
            "address": "yep"
        }

    def test_api_can_create_users(self):
        """Database does not accept more than one owner"""
        owner_data2 = {
            "username": "owner2",
            "name": "own",
            "password": "yep",
            "password_confirm": "yep",
            "role": "Owner",
            "contact_number": "234421132",
            "business_permit": "https://i.ytimg.com/vi/7eGKDuJ-E1w/hqdefault.jpg",
            "address": "yep"
        }
        response2 = self.client.post(
            reverse('register'),
            owner_data2,
            format="json",
        )

        self.assertEqual(response2.data['status_code'], 400)

        """Test the api can create an customer account."""
        response3 = self.client.post(reverse('register'),
                                     self.customer_data,
                                     format="json",
                                     )
        self.assertEqual(response3.status_code, status.HTTP_201_CREATED)

        """Test the api can create a worker account."""
        response4 = self.client.post(
            reverse('register'),
            self.pharmacist_data,
            format="json",
        )
        self.assertEqual(response4.status_code, status.HTTP_201_CREATED)

    def test_api_login(self):
        """Test the api has user creation capability."""
        response = self.client.post(
            reverse('login'),
            {"username": "test_customer", "password": "yep"},
            format="json",
        )

        self.assertEquals(list(response.data['jwt'].keys()), [
                          'refresh', 'access'])


class CreateUserTestCase(TestCase):
    """Test suite for the api views."""
    fixtures = ['ayofixture.json']

    def setUp(self):
        """Define the test client and other test variables."""
        self.client = APIClient()
        self.logindetails = self.client.post(reverse('login'),
                                             {"username": "test_owner",
                                                 "password": "yep"},
                                             format="json",
                                             )
        self.jwt_access = self.logindetails.data['jwt']['access']
        self.jwt_refresh = self.logindetails.data['jwt']['refresh']
        self.client.credentials(
            HTTP_AUTHORIZATION="Bearer " + self.jwt_access)

    def test_api_access(self):
        """Api should generate an access token from a refresh token."""
        response = self.client.post(
            reverse('token_refresh'),
            {"refresh": self.jwt_refresh},
            format="json",
        )

        self.assertEqual(list(response.data.keys()), ['access'])

    def test_get_users(self):
        response = self.client.get(
            reverse('unverified_customers'),
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # self.assertEqual(list(response.data.keys()), ['access'])
