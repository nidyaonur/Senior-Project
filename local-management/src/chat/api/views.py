from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
)
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from subscribers.models import Subscriber
from chat.models import Message,Topic,Membership
from .permissions import IsOwnerOrReadOnlyOrAdmin
from .serializers import (
    MessageSerializer,
    MessageSendSerializer
)
from django.contrib.auth.models import User
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)

class MessageCreateAPIView(CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSendSerializer
    permission_classes = [AllowAny] #TODO: bunu degistir test ettikten sonra
    def post(self,request, format=None):
        #TODO: chat kismindan gelen data bize uygun olmayacak onu cevirmek lazim
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(sender=Subscriber.objects.get(user=self.request.user))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)


class SubscriberOwnMessagesAPIView(ListAPIView):
    serializer_class =MessageSerializer
    #queryset = Message.objects.filter(topic__in=Membership.objects.filter(member=Subscriber.objects.get(user=request.user)))
    def get_queryset(self, *args, **kwargs):
        #queryset_list = super(PostListAPIView, self).get_queryset(*args, **kwargs)
        return Message.get_messages(my_user=self.request.user)
