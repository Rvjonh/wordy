from api.models import PasswordRecover
from datetime import datetime, timedelta

#Delete all registers older than 5 hours to prevent security for codes ...
def clean_register():
    time_threshold = datetime.now() - timedelta(hours=1)
    try:
        results = PasswordRecover.objects.filter(fecha_creacion__lt=time_threshold)
        results.delete()
    except:
        ##print("No se ha podido eleiminar los objetos ...")
        pass