from rest_framework import generics, permissions


from .models import Subscriber
from .permissions import IsOwnerOrReadOnly
from .serializers import SubscriberSerializer



class SubscriberDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset            = Subscriber.objects.all()
    serializer_class    = SubscriberSerializer
    lookup_field        = 'slug'
    permission_classes  = [IsOwnerOrReadOnly]


class SubscriberListCreateAPIView(generics.ListCreateAPIView):
    queryset            = Subscriber.objects.all()
    serializer_class    =  SubscriberSerializer
    permission_classes  = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)