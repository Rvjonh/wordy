# Generated by Django 4.0.4 on 2022-06-30 20:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diccionarios', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='diccionarios',
            name='creacion',
            field=models.DateTimeField(auto_created=True, default='2022-11-03'),
        ),
        migrations.AddField(
            model_name='diccionarios',
            name='idioma',
            field=models.CharField(default='', max_length=10),
        ),
    ]