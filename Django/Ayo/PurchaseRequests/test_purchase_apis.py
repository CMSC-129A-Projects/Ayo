from django.test import TestCase
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from django.urls import reverse
import subprocess
from django.contrib.auth.models import Group

from Users.models import User, Owner
from .models import PurchaseRequest
from Prescriptions.models import Prescription


class OrderTestCases(TestCase):

    fixtures = ['ayofixture.json']

    def setUp(self):
        self.customer_client = APIClient()
        self.customervals = self.customer_client.post(
            reverse('login'), {"username": "test_customer", "password": "yep"}, format="json")
        self.customer_jwt_access = self.customervals.data['jwt']['access']
        self.customer_client.credentials(
            HTTP_AUTHORIZATION="Bearer " + self.customer_jwt_access)

        self.worker_client = APIClient()
        self.workervals = self.customer_client.post(
            reverse('login'), {"username": "test_staff", "password": "yep"}, format="json")
        self.worker_jwt_access = self.workervals.data['jwt']['access']
        self.worker_client.credentials(
            HTTP_AUTHORIZATION="Bearer " + self.worker_jwt_access)

        self.products = self.customer_client.get(reverse('get_products')).data

    def test_add_reqitem(self):
        response = self.customer_client.post(reverse('add_reqitem'), {
            "quantity": 5,
            "product_id": self.products[0]['id'],
            "user_id": self.customervals.data['id']
        })

        self.assertEquals(response.data['quantity'], 5)

    def test_get_free_reqitems(self):
        response2 = self.customer_client.get(
            reverse('get_free_reqitems', kwargs={"userid": self.customervals.data['id']}))
        self.assertEquals(response2.status_code, 200)

    def test_edit_free_reqitems(self):
        response2 = self.customer_client.get(
            reverse('get_free_reqitems', kwargs={"userid": self.customervals.data['id']})).data
        response3 = self.customer_client.patch(reverse('instance_reqitems', kwargs={"reqitem": response2[0]['id']}),
                                               {"quantity": 25},
                                               format="json"
                                               )
        self.assertEquals(response3.data['quantity'], 25)

    def test_delete_free_reqitems(self):
        response2 = self.customer_client.get(
            reverse('get_free_reqitems', kwargs={"userid": self.customervals.data['id']})).data
        response3 = self.customer_client.delete(
            reverse('instance_reqitems', kwargs={"reqitem": response2[0]['id']}))
        self.assertEquals(response3.data, "Deleted")

    def test_all_orders(self):
        response2 = self.worker_client.get(
            reverse('get_orders'))

        self.assertEquals(response2.status_code, 200)

        response3 = self.customer_client.get(
            reverse('get_orders'))

        self.assertEquals(response3.status_code, 403)

    def test_user_orders(self):
        response2 = self.customer_client.get(
            reverse('get_user_orders', kwargs={"userid": self.customervals.data['id']}))
        self.assertEquals(response2.status_code, 200)

    def test_add_ordinary_order(self):
        response2 = self.customer_client.post(reverse('add_order'), {
            "customer_id": self.customervals.data['id'],
            "request_type": "Order"
        })
        self.assertEquals(response2.data['request_type'], "Order")

    # TODO: add checks sa code pud
    def test_add_prescription_order(self):
        response2 = self.customer_client.post(reverse('add_order'), {
            "customer_id": self.customervals.data['id'],
            "request_type": "Prescription"
        })
        self.assertEquals(response2.status_code, 500)

    def test_edit_order(self):
        response = self.customer_client.get(reverse("get_user_orders", kwargs={
            "userid": self.customervals.data['id']
        }))

        response2 = self.customer_client.patch(reverse('instance_order', kwargs={
            "order": response.data[0]['id']
        }), {
            "is_cancelled": False
        })
        self.assertEquals(response2.status_code, 200)

        response3 = self.worker_client.patch(reverse('instance_order', kwargs={
            "order": response.data[0]['id']
        }), {
            "note": "test note here",
            "is_cancelled": True
        })
        self.assertEquals(response3.status_code, 200)
