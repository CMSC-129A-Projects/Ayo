from Products.models import Product
from django.test import TestCase
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from django.urls import reverse
import subprocess
from django.contrib.auth.models import Group

from Users.models import User, Owner
from Prescriptions.models import Prescription
from .models import Product, GenericName


class GenericTestCases(TestCase):

    fixtures = ['ayofixture.json']

    def setUp(self):
        self.client = APIClient()
        self.worker_values = self.client.post(reverse('login'),
                                              {"username": "test_staff",
                                                  "password": "yep"},
                                              format="json"
                                              )
        self.jwt_access = self.worker_values.data['jwt']['access']
        self.jwt_refresh = self.worker_values.data['jwt']['refresh']
        self.client.credentials(
            HTTP_AUTHORIZATION="Bearer " + self.jwt_access)

    def test_get_generics(self):
        response = self.client.get(reverse("get_generics"))
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_add_generic(self):
        response = self.client.post(reverse("add_generic"),
                                    {
            "generic_name": "new_test_generic",
            "disease": ["new_test_disease1", "new_test_disease2"]
        },
            format="json"
        )
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_edit_generics(self):
        response = self.client.get(reverse("get_generics"))
        response2 = self.client.patch(reverse("instance_generic",
                                              kwargs={
                                                  "generic": response.data[0]['id']}),
                                      {"generic_name": "NEW GENERIC NAME"},
                                      format="json"
                                      )

        self.assertEquals(response2.data['generic_name'], "NEW GENERIC NAME")

        worker_values = self.client.post(reverse('login'),
                                         {"username": "test_customer",
                                          "password": "yep"},
                                         format="json"
                                         )
        jwt_access = worker_values.data['jwt']['access']
        newclient = APIClient()
        newclient.credentials(
            HTTP_AUTHORIZATION="Bearer " + jwt_access)
        response3 = newclient.patch(reverse("instance_generic",
                                            kwargs={
                                                "generic": response.data[0]['id']}),
                                    {"generic_name": "NEW GENERIC NAME 2"},
                                    format="json"
                                    )
        self.assertEquals(response3.status_code, 403)

    def test_delete_generics(self):
        response = self.client.get(reverse("get_generics"))
        response2 = self.client.delete(reverse("instance_generic",
                                               kwargs={
                                                   "generic": response.data[0]['id']}),
                                       )
        self.assertEquals(response2.data, "Deleted")


class ProductTestCase(TestCase):

    fixtures = ['ayofixture.json']

    def setUp(self):
        self.worker_client = APIClient()
        self.worker_values = self.worker_client.post(reverse('login'),
                                                     {"username": "test_staff",
                                                      "password": "yep"},
                                                     format="json"
                                                     )
        self.worker_jwt_access = self.worker_values.data['jwt']['access']
        self.worker_client.credentials(
            HTTP_AUTHORIZATION="Bearer " + self.worker_jwt_access)
        self.generics = self.worker_client.get(reverse('get_generics')).data

    def test_get_products(self):
        """Api should retrieve products"""
        response = self.worker_client.get(reverse("get_products"))
        self.assertEquals(response.status_code, status.HTTP_200_OK)

        customer_values = self.worker_client.post(reverse('login'),
                                                  {"username": "test_customer",
                                                   "password": "yep"},
                                                  format="json"
                                                  )
        jwt_access = customer_values.data['jwt']['access']
        newclient = APIClient()
        newclient.credentials(
            HTTP_AUTHORIZATION="Bearer " + jwt_access)
        response2 = newclient.get(reverse("get_products"))
        self.assertEquals(response2.status_code, 200)

    def test_add_product(self):
        values = {
            "name": "new_test_medicine",
            "description": "test description",
            "price": 12.50,
            "quantity": 500,
            "product_img": "https://i.ytimg.com/vi/7eGKDuJ-E1w/hqdefault.jpg",
            "generic_name": self.generics[0]['id']
        }
        response = self.worker_client.post(
            reverse('add_product'), values, format="json")

        self.assertEquals(response.data['name'], "new_test_medicine")

    def test_edit_products(self):
        response = self.worker_client.get(reverse("get_products"))
        response2 = self.worker_client.patch(reverse("instance_product",
                                                     kwargs={
                                                         "product": response.data[0]['id']}),
                                             {"name": "NEW PRODUCT NAME"},
                                             format="json"
                                             )

        self.assertEquals(response2.data['name'], "NEW PRODUCT NAME")

        client = APIClient()
        customer_values = client.post(reverse('login'),
                                      {"username": "test_customer",
                                          "password": "yep"},
                                      format="json"
                                      )
        jwt_access = customer_values.data['jwt']['access']
        newclient = APIClient()
        newclient.credentials(
            HTTP_AUTHORIZATION="Bearer " + jwt_access)
        response3 = newclient.patch(reverse("instance_product",
                                            kwargs={
                                                "product": response.data[0]['id']}),
                                    {"name": "NEW PRODUCT NAME 2"},
                                    format="json"
                                    )
        self.assertEquals(response3.status_code, 403)

    def test_delete_generics(self):
        response = self.worker_client.get(reverse("get_products"))
        response2 = self.worker_client.delete(reverse("instance_product",
                                                      kwargs={
                                                          "product": response.data[0]['id']}),
                                              )
        self.assertEquals(response2.data, "Deleted")

    def test_get_one_product(self):
        response = self.worker_client.get(reverse("get_products"))
        response2 = self.worker_client.get(reverse("one_product",
                                                   kwargs={
                                                       "product": response.data[0]['id']}),
                                           )
        self.assertEquals(response.data[0]['id'], response2.data['id'])
