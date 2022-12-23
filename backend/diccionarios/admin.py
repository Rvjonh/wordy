from django.contrib import admin

from . import models

# Register your models here.

class DiccionariosAdminModel(admin.ModelAdmin):
    list_display = ("user","nombre","creacion","idioma","last_play")
    search_fields = ("user","nombre","creacion","idioma","last_play")

class PalabrasAdminModel(admin.ModelAdmin):
    list_display = ("diccionario", "nombre", "significado", "ultima_actualizacion", "nivel")
    search_fields = ("diccionario", "nombre", "significado", "ultima_actualizacion", "nivel")


class SharedDiccionariosAdminModel(admin.ModelAdmin):
    list_display = ("nombre","idioma", "description")
    search_fields = ("nombre","idioma", "description")

class SharedPalabrasAdminModel(admin.ModelAdmin):
    list_display = ("shared_diccionarios","nombre","significado")
    search_fields = ("shared_diccionarios","nombre","significado")

admin.site.register(models.Diccionarios, DiccionariosAdminModel)
admin.site.register(models.Palabras, PalabrasAdminModel)

admin.site.register(models.SharedDiccionarios, SharedDiccionariosAdminModel)
admin.site.register(models.SharedPalabras, SharedPalabrasAdminModel)