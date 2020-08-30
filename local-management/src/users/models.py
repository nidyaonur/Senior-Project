from django.db import models
from django.contrib.auth.signals import user_logged_in, user_logged_out, user_login_failed
from django.dispatch import receiver
import datetime


class AuditEntry(models.Model):
    action = models.CharField(max_length=64)
    ip = models.GenericIPAddressField(null=True)
    username = models.CharField(max_length=256, null=True)
    login = models.DateTimeField(blank=True, null=True)
    logout = models.DateTimeField(blank=True, null=True)

    def __unicode__(self):
        return '{0} - {1} - {2} - {3} - {4}'.format(self.action, self.username, self.ip, self.login, self.logout)

    def __str__(self):
        return '{0} - {1} - {2} - {3} - {4}'.format(self.action, self.username, self.ip, self.login, self.logout)


@receiver(user_logged_in)
def user_logged_in_callback(sender, request, user, **kwargs):
    ip = request.META.get('REMOTE_ADDR')
    b = AuditEntry(action='user_logged_in', ip=ip, username=user.username, login=datetime.datetime.now())
    b.save()


@receiver(user_logged_out)
def user_logged_out_callback(sender, request, user, **kwargs):  
    ip = request.META.get('REMOTE_ADDR')
    b = AuditEntry(action='user_logged_out', ip=ip, username=user.username, logout=datetime.datetime.now())
    b.save()

@receiver(user_login_failed)
def user_login_failed_callback(sender, credentials, **kwargs):
    b = AuditEntry(action='user_login_failed', username=credentials.get('username', None))
    b.save()