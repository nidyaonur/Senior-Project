from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField
from django.contrib.auth import get_user_model, authenticate, login, logout
from rest_framework import serializers
from ..models import Message
User = get_user_model()

User = get_user_model()


class UserPublicSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False, allow_blank=True, read_only=True)
    class Meta:
        model = User
        fields = [
            'username',  
            ]
class MessageSerializer(ModelSerializer):

    class Meta:
        model = Message
        fields = [
            'id',
            'fullname',
            'sender',
            'topic',
            'message',
            'timestamp',
        ]


class MessageSendSerializer(ModelSerializer):
    class Meta:
        model = Message
        fields = [
            'topic',
            'message',
        ]
