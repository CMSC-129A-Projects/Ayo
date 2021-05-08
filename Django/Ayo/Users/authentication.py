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
from django.contrib.auth import get_user_model

from .models import *


def generate_access_token(user):
    id_json = DjangoJSONEncoder()
    user_id = id_json.encode(user.id)
    payload = {
        'username': user.username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.datetime.utcnow()
    }

    print("PAYLOAD IS ", payload)
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        print(request.data)
        token = request.COOKIES.get('jwt')

        if not token:
            return None

        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithm=['HS256'])
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('unathenticated')

        user = get_user_model().objects.filter(
            username=payload['username']).first()

        if user is None:
            raise exceptions.AuthenticationFailed('User not Found!')

        print("USER IS ", user)
        return (user, None)
