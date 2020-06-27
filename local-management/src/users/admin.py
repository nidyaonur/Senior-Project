from django.contrib import admin
from users.models import AuditEntry

@admin.register(AuditEntry)
class AuditEntryAdmin(admin.ModelAdmin):
    list_display = ['action', 'username', 'ip', 'login', 'logout']
    list_filter = ['action',]