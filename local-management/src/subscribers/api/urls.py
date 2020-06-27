from django.conf.urls import url
from django.contrib import admin
from django.urls import path

from .views import (
    SubscriberListAPIView,
    SubscriberDetailAPIView,
    SubscriberDeleteAPIView,
    SubscriberUpdateAPIView,
    SubscriberCreateAPIView,
    SubscriberCoordUpdateAPIView,
    SubscriberOwnDetailAPIView,
    SubscriberLocationAPIView,
    TaskView
    )
urlpatterns = (
    url(r'^$', SubscriberListAPIView.as_view(), name='list'),
    url(r'^create/$', SubscriberCreateAPIView.as_view(), name='create'),
    url(r'^own/$', SubscriberOwnDetailAPIView.as_view(), name='own'),
    url(r'^location/$', SubscriberLocationAPIView.as_view(), name='location'),
    path('task/<str:task_id>/', TaskView.as_view(), name='task'),
    url(r'^(?P<username>[\w-]+)/$',SubscriberDetailAPIView.as_view(), name='detail'),
    url(r'^(?P<username>[\w-]+)/delete/$',SubscriberDeleteAPIView.as_view(),name='delete'),
    url(r'^(?P<username>[\w-]+)/edit/$',SubscriberUpdateAPIView.as_view(),name='update'),
    url(r'^(?P<username>[\w-]+)/coord/$',SubscriberCoordUpdateAPIView.as_view(),name='coord'),
)
