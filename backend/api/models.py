from pyexpat import model
from statistics import mode
from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class PasswordRecover(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=11)
    fecha_creacion = models.DateField(auto_now_add=True)
