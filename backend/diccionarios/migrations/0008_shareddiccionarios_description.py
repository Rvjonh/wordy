# Generated by Django 4.0.4 on 2022-08-07 07:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diccionarios', '0007_shareddiccionarios_sharedpalabras'),
    ]

    operations = [
        migrations.AddField(
            model_name='shareddiccionarios',
            name='description',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]