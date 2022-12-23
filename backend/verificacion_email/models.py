from pyexpat import model
from django.db import models

from django.contrib.auth.models import User

# Create your models here.
class EmailVerificado(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    verificado = models.BooleanField(default=False)
    codigo = models.CharField(max_length=10, default="", blank=True, null=True)