
from django.contrib import admin

# Register your models here.
from .models import Message,Topic, Membership

class MessageModelAdmin(admin.ModelAdmin):
    list_display = ["sender","topic", "timestamp"]
    list_display_links = ["timestamp"]
    list_editable = ["sender"]
    list_filter = ["timestamp"]

    search_fields = ["sender"]
    class Meta:
        model = Message


class TopicModelAdmin(admin.ModelAdmin):
    list_display = ["name"]
    list_display_links = ["name"]
    list_filter = ["name"]

    search_fields = ["name"]
    class Meta:
        model = Topic


class MembershipModelAdmin(admin.ModelAdmin):
    list_display = ["member", "topic"]
    list_display_links = ["member"]
    list_editable = ["topic"]
    list_filter = ["member"]

    search_fields = ["member"]
    class Meta:
        model = Membership

admin.site.register(Message, MessageModelAdmin)
admin.site.register(Topic, TopicModelAdmin)
admin.site.register(Membership, MembershipModelAdmin)
