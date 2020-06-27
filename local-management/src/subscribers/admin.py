from django.contrib import admin

# Register your models here.
from .models import Subscriber
from .models import Location

class SubscriberModelAdmin(admin.ModelAdmin):
    list_display = ["fullname", "username", "user", "timestamp"]
    list_display_links = ["fullname"]
    list_filter = ["username"]

    search_fields = ["username"]
    class Meta:
        model = Subscriber

class LocationModelAdmin(admin.ModelAdmin):
    list_display = ["taskid", "status", "timestamp"]
    list_display_links = ["taskid"]
    list_filter = ["taskid"]

    search_fields = ["taskid"]
    class Meta:
        model = Location

admin.site.register(Subscriber, SubscriberModelAdmin)
admin.site.register(Location, LocationModelAdmin)
