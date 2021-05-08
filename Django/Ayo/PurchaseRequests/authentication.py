"""
TODO:
- settle UUID to json
- verify is access token needs to have expirations
"""

import jwt
import datetime
from django.conf import settings
from django.core.serializers.json import DjangoJSONEncoder
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication

from .models import *

def generate_access_token(user):
      id_json = DjangoJSONEncoder()
      user_id = id_json.encode(user.id)
      payload = {
            'username': user.username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
      }

      return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256').decode('utf-8')

class JWTAuthentication(BaseAuthentication):
      def authenticate(self, request):
            print(request.data)
            token = request.COOKIES.get('jwt')

            if not token:
                  return None

            try:
                  payload = jwt.decode(token, settings.SECRET_KEY, algorithm=['HS256'])
            except jwt.ExpiredSignatureError:
                  raise exceptions.AuthenticationFailed('unathenticated')

            user = User.objects.filter(username=payload['username']).first()

            if user is None:
                  raise exceptions.AuthenticationFailed('User not Found!')

            if user.role == "Owner":
                  user = Owner.objects.filter(id=user.id).first()
            if user.role == "Customer":
                  user = Customer.objects.filter(id=user.id).first()
            if user.role == "Pharmacy Worker":
                  user = PharmacyWorker.objects.filter(id=user.id).first()
            
            return (user, None)