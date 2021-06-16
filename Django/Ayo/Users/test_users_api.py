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

    def test_edit_user(self):
        pass

    def test_api_access(self):
        """Api should generate an access token from a refresh token."""
        response = self.client.post(
            reverse('token_refresh'),
            {"refresh": self.jwt_refresh},
            format="json",
        )

        self.assertEqual(list(response.data.keys()), ['access', 'refresh'])

    def test_get_users(self):
        """Api should allow owner to get list of unverified users."""
        response = self.client.get(
            reverse('unverified_customers'),
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # self.assertEqual(list(response.data.keys()), ['access'])

    def test_approve(self):
        """Api should allow owner to approve unverified users."""
        userslist = self.client.get(
            reverse('unverified_customers'),
            format="json",
        )

        response = self.client.patch(
            reverse('approve_application'),
            {"id": userslist.data[0]['id']},
            format="json",
        )

        self.assertEqual("Successful", response.data)

    def test_reject(self):
        """Api should allow owner to reject unverified users."""
        userslist = self.client.get(
            reverse('unverified_customers'),
            format="json",
        )

        response = self.client.patch(
            reverse('reject_application'),
            {"id": userslist.data[0]['id']},
            format="json",
        )

        self.assertEqual("Successful", response.data)


class ExtraChecks(TestCase):
    def setUp(self):
        """Define the test client and other test variables."""
        self.client = APIClient()

    def test_incorrect_entries(self):
        user_data = {
            "username": "test_customer2",
            "name": "",
            "password": "yep",
            "password_confirm": "yep",
            "role": "Owner",
            "contact_number": "234421132",
            "business_permit": "https://i.ytimg.com/vi/7eGKDuJ-E1w/hqdefault.jpg",
            "address": "yep"
        }

        response1 = self.client.post(
            reverse('register'),
            user_data,
            format="json",
        )

        user_data['name'] = "test customer"
        user_data['password'] = "wrongpassword"

        response2 = self.client.post(
            reverse('register'),
            user_data,
            format="json",
        )

        user_data['username'] = ""
        user_data['password'] = "yep"

        response3 = self.client.post(
            reverse('register'),
            user_data,
            format="json",
        )

        user_data['username'] = "test_customer99"
        user_data['contact_number'] = "92"
        response4 = self.client.post(
            reverse('register'),
            user_data,
            format="json",
        )

        self.assertEquals(response1.data['name']
                          [0], "This field may not be blank.")
        self.assertEquals(response2.data['detail'], "Passwords do not match")
        self.assertEquals(response3.data['username']
                          [0], "This field may not be blank.")
        self.assertEquals(
            response4.data['detail'], "Contact number is more/less than 9 numbers")
