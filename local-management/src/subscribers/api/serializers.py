from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField
from django.contrib.auth import get_user_model, authenticate, login, logout
from subscribers.models import Subscriber
from subscribers.models import Location

from rest_framework import serializers

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


class SubscriberCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = Subscriber
        fields = [
            #'id',
            'title',
            'fullname',
            'username'
        ]

class SubscriberCoordUpdateSerializer(ModelSerializer):
    class Meta:
        model = Subscriber
        fields = [
            #'id',
            #'title',
            #'fullname'
            'latitude',
            'longitude',
            'signalpower'
        ]

class SubscriberListSerializer(ModelSerializer):
    url = HyperlinkedIdentityField(
        view_name='subscribers-api:detail',
        lookup_field='username'
        )
    delete_url = HyperlinkedIdentityField(
        view_name='subscribers-api:delete',
        lookup_field='username'
        )
    class Meta:
        model = Subscriber
        fields = [
            'url',
            'user',
            'username',
            'id',
            'title',
            'fullname',
            'latitude',
            'longitude',
            'signalpower',
            'updated',
            'timestamp',
            'delete_url'
        ]

class SubscriberLocationSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = [
            'taskid',  
            'timestamp',
            ]


class SubscriberDetailSerializer(serializers.ModelSerializer):
    url             = serializers.HyperlinkedIdentityField(
                            view_name='subscribers-api:detail',
                            lookup_field='username'
                            )
    user            = UserPublicSerializer(read_only=True)
    owner           = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Subscriber
        fields = [
            'url',
            'user',
            'title',
            'fullname',
            'owner',
            'timestamp',
            'latitude',
            'longitude'
        ]
    def get_owner(self,obj):
        print(self.context)
        request = self.context['request']
        if request.user.is_authenticated:
            if obj.user == request.user:
                return True
        return False

