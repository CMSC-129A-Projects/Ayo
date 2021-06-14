from django.test import TestCase
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from django.urls import reverse
import subprocess
from django.contrib.auth.models import Group


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

    def test_add_prescitem(self):
        response = self.customer_client.post(reverse('add_prescitem'), {
            "name": "test medicine",
            "fprescuency": "Once a day",
            "quantity_to_buy": 10,
            "quantity_to_take": 10,
            "first_dose": "2021-05-13T07:37:18Z",
            "customer_id": self.customervals.data['id']
        })

        self.assertEquals(response.data['quantity_to_take'], 10)

    def test_get_free_prescitems(self):
        response2 = self.customer_client.get(
            reverse('get_free_prescitems', kwargs={"userid": self.customervals.data['id']}))
        self.assertEquals(response2.status_code, 200)

    def test_edit_free_prescitems(self):
        response2 = self.customer_client.get(
            reverse('get_free_prescitems', kwargs={"userid": self.customervals.data['id']})).data
        response3 = self.customer_client.patch(reverse('instance_prescitems', kwargs={"prescitem": response2[0]['id']}),
                                               {"quantity_to_take": 25},
                                               format="json"
                                               )
        self.assertEquals(response3.data['quantity_to_take'], 25)

    def test_delete_free_prescitems(self):
        response2 = self.customer_client.get(
            reverse('get_free_prescitems', kwargs={"userid": self.customervals.data['id']})).data
        response3 = self.customer_client.delete(
            reverse('instance_prescitems', kwargs={"prescitem": response2[0]['id']}))
        self.assertEquals(response3.data, "Deleted")

    def test_user_prescriptions(self):
        response2 = self.customer_client.get(
            reverse('get_user_prescriptions', kwargs={"userid": self.customervals.data['id']}))
        self.assertEquals(response2.status_code, 200)

    def test_add_photo_prescription(self):
        response2 = self.customer_client.post(reverse('add_prescription'), {
            "customer_id": self.customervals.data['id'],
            "starting_date": "2021-05-13T07:37:18Z",
            "prescription_photo": "https://i.ytimg.com/vi/7eGKDuJ-E1w/hqdefault.jpg",
        })
        self.assertEquals(response2.status_code, 200)

    def test_add_copy_prescription(self):
        response2 = self.customer_client.post(reverse('add_prescription'), {
            "customer_id": self.customervals.data['id'],
            "starting_date": "2021-05-13T07:37:18Z",
            "prescription_copy": "http://africau.edu/images/default/sample.pdf"
        })
        self.assertEquals(response2.status_code, 200)

    def test_edit_prescription(self):
        response = self.customer_client.get(reverse("get_user_prescriptions", kwargs={
            "userid": self.customervals.data['id']
        }))

        response2 = self.customer_client.patch(reverse('instance_prescription', kwargs={
            "prescription": response.data[0]['id']
        }), {
            "starting_date": "2021-06-13T07:37:18Z",
        })
        self.assertEquals(response2.status_code, 202)
