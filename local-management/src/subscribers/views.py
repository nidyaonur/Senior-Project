from rest_framework import generics, permissions


from .models import Subscriber
from .permissions import IsOwnerOrReadOnly
from .serializers import SubscriberSerializer



class SubscriberDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset            = Subscriber.objects.all()
    serializer_class    = SubscriberSerializer
    lookup_field        = 'slug'
    permission_classes  = [IsOwnerOrReadOnly]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class SubscriberListCreateAPIView(generics.ListCreateAPIView):
    queryset            = Subscriber.objects.all()
    serializer_class    =  SubscriberSerializer
    permission_classes  = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        print("selam")
        serializer.save(user=self.request.user)
