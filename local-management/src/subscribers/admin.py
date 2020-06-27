from django.contrib import admin

# Register your models here.
from .models import Subscriber

class SubscriberModelAdmin(admin.ModelAdmin):
    list_display = ["title", "timestamp"]
    list_display_links = ["timestamp"]
    list_editable = ["title"]
    list_filter = ["timestamp"]

    search_fields = ["title"]
    class Meta:
        model = Subscriber


admin.site.register(Subscriber, SubscriberModelAdmin)