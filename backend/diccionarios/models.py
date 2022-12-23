from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Diccionarios(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    nombre = models.CharField(max_length=100)
    creacion = models.DateTimeField(auto_now_add=True)
    idioma = models.CharField(max_length=10, default="")
    last_play = models.DateTimeField()

    def __str__(self) -> str:
        return f'{self.user} - {self.nombre}'

class Palabras(models.Model):
    diccionario = models.ForeignKey(Diccionarios, on_delete=models.CASCADE)

    nombre = models.CharField(max_length=50)
    significado = models.CharField(max_length=50)
    ultima_actualizacion = models.DateTimeField()
    nivel = models.IntegerField(blank=True, null=True, default=0, verbose_name="Progreso")



class SharedDiccionarios(models.Model):

    nombre = models.CharField(max_length=100)
    idioma = models.CharField(max_length=10, default="")
    description = models.CharField(max_length=100)
    
    def __str__(self) -> str:
        return f'{self.nombre}'

class SharedPalabras(models.Model):
    shared_diccionarios = models.ForeignKey(SharedDiccionarios, on_delete=models.CASCADE)

    nombre = models.CharField(max_length=50)
    significado = models.CharField(max_length=50)