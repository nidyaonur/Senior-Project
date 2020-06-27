from django.contrib.auth import get_user_model, authenticate, login, logout
from django.db.models import Q
from django.urls import reverse
from django.utils import timezone

from rest_framework import serializers

from .models import Subscriber

User = get_user_model()


class UserPublicSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False, allow_blank=True, read_only=True)
    class Meta:
        model = User
        fields = [
            'username',  
            'first_name',
            'last_name',
            ]
    

class SubscriberSerializer(serializers.ModelSerializer):
    url             = serializers.HyperlinkedIdentityField(
                            view_name='subscribers-api:detail',
                            lookup_field='slug'
                            )
    user            = UserPublicSerializer(read_only=True)
    class Meta:
        model = Subscriber
        fields = [
            'url',
            'slug',
            'user',
            'title',
            'fullname',
            'timestamp',
        ]