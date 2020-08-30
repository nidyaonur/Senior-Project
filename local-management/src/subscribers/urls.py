from django.urls import path, re_path

from .views import (
        SubscriberDetailAPIView,
        SubscriberListCreateAPIView,
        HomeView
    )


app_name = 'subscribers-api'
urlpatterns = [
    path('', SubscriberListCreateAPIView.as_view(), name='list-create'),
    re_path(r'^(?P<slug>[\w-]+)/$', SubscriberDetailAPIView.as_view(), name='detail'),

]
