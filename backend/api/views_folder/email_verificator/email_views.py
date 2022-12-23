from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from verificacion_email.models import EmailVerificado
from verificacion_email.functions.email_verificator import set_email_and_send_validator_code

from django.contrib.auth.models import User

class EmailProcessView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        codigo = JSONParser().parse(request).get("code", None)
        if codigo is None:
            return Response({"Error":"Codigo no suministrado"}, status=400)

        try:
            usuario = request.user
        except:
            return Response({"Error":"Usuario incorrecto"}, status=400)

        email_verificado = EmailVerificado.objects.get(user=usuario)
        if codigo == email_verificado.codigo:
            email_verificado.codigo = "-"
            email_verificado.verificado = True
            email_verificado.save()
        else:
            return Response({"Error":"Codigo erroneo"}, status=400)

        return Response({"Ok":"Verificacion de correo correcta"}, status=200)
    
    def put(self, request):
        try:
            email = JSONParser().parse(request).get("email", None)

            if email is None or email=="":
                return Response({"Error":"No hay correo sumistrado"}, status=404)
        except:
            return Response({"Error":"No hay correo sumistrado"}, status=404)
        
        user = request.user
        correo = "Se mantiene tu correo"

        if user.email != email:
            try:
                exist_user  = User.objects.get(username=email)
                return Response({"Error":"Correo utilizado por otro usuario"}, status=402)
            except:
                user.email = email
                user.username = email
                user.save()
                correo = "Se ha actualizado tu correo"

        try:
            set_email_and_send_validator_code(user=user)
            
            return Response({"Exito":"Se ha enviado un nuevo codigo",
                            "Actualizado":correo,
                            "email":email}, status=200)
        except:
            return Response({"Error":"No se ha podido enviar el correo"}, status=500)
