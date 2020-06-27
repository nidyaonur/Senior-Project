from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    DestroyAPIView,
    CreateAPIView,
    RetrieveUpdateAPIView
)

from django.views import View
from django.contrib.auth.models import User
from celery import current_app
from django.http import JsonResponse
import json
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from subscribers.models import Subscriber
import datetime
from subscribers.models import Location
from ..tasks import calculate

from .permissions import IsOwnerOrReadOnlyOrAdmin
from .serializers import (
    SubscriberDetailSerializer,
    SubscriberListSerializer,
    SubscriberCreateUpdateSerializer,
    SubscriberCoordUpdateSerializer,
    SubscriberLocationSerializer
)
from django.contrib.auth.models import User
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)

class SubscriberCreateAPIView(CreateAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberCreateUpdateSerializer
    permission_classes = [AllowAny]
    def post(self,request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            print(json.dumps(request.data, indent=4, sort_keys=True))
            user = User.objects.create_user(username=request.data['username'],email=request.data['email'],password=request.data['password'])
            serializer.save(user=User.objects.get(username=request.data.get('username')))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SubscriberListAPIView(ListAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberListSerializer
    #TODO: the bellow built_in function can be overloaded if we need query subscribers or in chat
    #def get_queryset():

class SubscriberDetailAPIView(RetrieveAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'username'


class SubscriberOwnDetailAPIView(ListAPIView):
    serializer_class =SubscriberDetailSerializer
    def get_queryset(self, *args, **kwargs):
        #queryset_list = super(PostListAPIView, self).get_queryset(*args, **kwargs)
        print("foundd")
        queryset_list = Subscriber.objects.filter(user=self.request.user)
        query = self.request.GET.get("q")
        if query:
            queryset_list = queryset_list.filter(
                    Q(title__icontains=query)|
                    Q(content__icontains=query)|
                    Q(user__first_name__icontains=query) |
                    Q(user__last_name__icontains=query)
                    ).distinct()
        return queryset_list
        
class SubscriberLocationAPIView(ListAPIView):
    serializer_class = SubscriberLocationSerializer
    def get_queryset(self, *args, **kwargs):
        queryset_list = list(Location.objects.all())
        return queryset_list
        


class SubscriberCoordUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberCoordUpdateSerializer
    lookup_field = 'username'
    permission_classes = [IsAuthenticatedOrReadOnly,IsOwnerOrReadOnlyOrAdmin]
    def perform_update(self, serializer):
        #TODO: task çağır, idi modele ekle
        queryset = Subscriber.objects.all()
        def get_coordinates(queryset):
            i = 0
            result = []
            while i < len(queryset):
                lat = queryset[i].latitude
                lon = queryset[i].longitude
                result.append([lat,lon])
                i = i + 1
            return result

        serializer.save(user=self.request.user,updated=datetime.datetime.now())

class SubscriberUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberCreateUpdateSerializer
    lookup_field = 'username'
    permission_classes = [IsAuthenticatedOrReadOnly,IsOwnerOrReadOnlyOrAdmin]
    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class SubscriberDeleteAPIView(DestroyAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberDetailSerializer
    lookup_field = 'username'


class TaskView(View):
    def get(self, request, task_id):
        task = current_app.AsyncResult(task_id)
        response_data = {'task_status': task.status, 'task_id': task.id}

        if task.status == 'SUCCESS':
            response_data['results'] = task.get()

        return JsonResponse(response_data)
