from django.conf import settings
from django.db import models

from django.contrib.auth.models import User


class Subscriber(models.Model):
    user            = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    username        = models.CharField(max_length=50,null=True,blank=True)
    title           = models.CharField(max_length=120)
    fullname        = models.TextField()
    timestamp       = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated         = models.DateTimeField(auto_now=False, auto_now_add=True,null=True)
    latitude        = models.FloatField(blank=True,null=True)
    longitude       = models.FloatField(blank=True,null=True)
    signalpower     = models.IntegerField(blank=True, null=True, default=0)
#    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.fullname
    
    class Meta:
        ordering = ["-timestamp"]



class Location(models.Model):
    taskid         = models.CharField(max_length=100,primary_key=True)
    status        = models.CharField(max_length=100,blank=True,null=True)
    timestamp       = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.taskid + " is " + self.status
    class Meta:
        ordering = ["-timestamp"]
