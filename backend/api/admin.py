from django.contrib import admin
from api.models import PasswordRecover

# Register your models here.

class PasswordTokensAdminModel(admin.ModelAdmin):
    list_display = ("user","token", "fecha_creacion")
    search_fields = ("user","token", "fecha_creacion")

admin.site.register(PasswordRecover, PasswordTokensAdminModel)