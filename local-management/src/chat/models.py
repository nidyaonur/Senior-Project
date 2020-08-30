from django.conf import settings
from django.db import models
from subscribers.models import Subscriber

class Topic(models.Model):
    name            = models.CharField(max_length=100,primary_key=True)
    def __str__(self):
        return self.name
class Message(models.Model):
    #msg_id = models.AutoField(primary_key=False)
    sender          = models.ForeignKey(Subscriber,on_delete=models.PROTECT)
    fullname        = models.CharField(max_length=100,blank=True,null=True)
    topic           = models.ForeignKey(Topic,to_field='name' ,on_delete=models.CASCADE)
    #topic           = models.CharField(max_length=50)
    message         = models.CharField(max_length=500,blank=True, null=True)
    timestamp       = models.DateTimeField(auto_now=False, auto_now_add=True)
#    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.message
    class Meta:
        ordering = ["-timestamp"]
    @staticmethod
    def get_messages(my_user):
        topicList = []
        messageList = []
        subscriberObj = Subscriber.objects.get(user=my_user)
        membershipList = Membership.objects.filter(member=subscriberObj)
        for key in membershipList:
            messageList += Message.objects.filter(topic=key.topic).order_by('timestamp')
        for key in messageList:
            key.fullname = key.sender.fullname
        return messageList
        #return Message.objects.filter(topic__in=topicList__topic).order_by('timestamp')




class Membership(models.Model):
    #topic           = models.CharField(max_length=50)
    member          = models.ForeignKey(Subscriber, on_delete=models.CASCADE)
    topic           = models.ForeignKey(Topic,to_field='name', on_delete=models.CASCADE)
    #def __str__(self):
    #    return self.member + " in " + self.topic

