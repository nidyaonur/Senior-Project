from django.conf.urls import url
from django.contrib import admin

from .views import (
    MessageCreateAPIView,
    SubscriberOwnMessagesAPIView,
    )
urlpatterns = (
    url(r'^sendmsg/$', MessageCreateAPIView.as_view(), name='sendmsg'),
    url(r'^getmsgs/$', SubscriberOwnMessagesAPIView.as_view(), name='getmsgs'),
)
