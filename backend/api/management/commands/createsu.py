from django.contrib.auth.models import User
from django.core.management.base import BaseCommand

import os

class Command(BaseCommand):
    help = 'Creates a superuser.'

    def handle(self, *args, **options):
        if not User.objects.filter(username=os.getenv('ADMIN_USERNAME')).exists():
            User.objects.create_superuser(
                username=os.getenv('ADMIN_USERNAME'),
                password=os.getenv('ADMIN_PASSWORD')
            )
        print('Superuser has been created.')