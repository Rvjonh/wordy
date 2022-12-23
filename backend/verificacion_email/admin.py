from django.contrib import admin

from .models import EmailVerificado
# Register your models here.

class ClassEmailVerificado(admin.ModelAdmin):
    list_display = ("user", "verificado", "codigo")
    search_fields = ("user",)

admin.site.register(EmailVerificado, ClassEmailVerificado)