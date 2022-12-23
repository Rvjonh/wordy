from django.http import JsonResponse

#to sign up
from django.db import IntegrityError
from django.contrib.auth.models import User
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

#to login
from django.contrib import auth

#verificacion de correo
from verificacion_email.functions.email_verificator import set_email_and_send_validator_code
from verificacion_email.models import EmailVerificado

from .functions.password_email import send_email_setting_password
from api.models import PasswordRecover
from api.functions.clean_passwordRecover_tokens import clean_register

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        """ Creates and Returns data to make operations in frontend """
        try:
            data = JSONParser().parse(request) #data is a dictionary
        except:
            return JsonResponse({'Error':'Datos necesarios insuficientes.'}, status=500)

        try:
            if User.objects.get(email=data['email']):
                return JsonResponse({"Error: Correo Electronico ya registrado"}, status=400)
        except:
            pass

        try:
            user = User.objects.create(
                first_name = data['username'],
                username = data['email'],
                email = data['email'],
                password = data['password']
            )
            user.set_password(data['password'])
            user.save()

            set_email_and_send_validator_code(user=user)

            token = Token.objects.create(user=user)

            return JsonResponse({'Token':str(token),
                                 'name':str(user.first_name),
                                 "emailverification":"false"},
                                 status=201)
        except IntegrityError:
            return JsonResponse({'Error':'Correo Electronico ya registrado'}, status=401)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        """ Return data to make operations in frontend """
        data = JSONParser().parse(request)
        user = auth.authenticate(request, username=data['email'], password=data['password'])
        emailcheck = "false"

        if user is None:
            return JsonResponse({'Error':'Datos suministrados erroneos'},status=404)
        else: # return user token
            try:
                token = Token.objects.get(user=user)
            except: # if token not in db, create a new one
                token = Token.objects.create(user=user)

            try:
                if EmailVerificado.objects.get(user=user).verificado:
                    emailcheck = "true"
                else:
                    emailcheck = "false"
            except:
                    emailcheck = "false"
        
        return JsonResponse({'Token':str(token),
                            'name':str(user.first_name),
                            "emailverification": emailcheck}
                            , status=201)

@csrf_exempt
def profile(request):
    if request.method == "PATCH":
        """ Update data's user """
        data = JSONParser().parse(request)
        user = auth.authenticate(request, username=data['email'], password=data['password'])

        if user is None:
            return JsonResponse({'Error':'Datos suministrados erroneos'},status=400)
        
        email_verificado = EmailVerificado.objects.get(user=user)

        if not email_verificado.verificado:
            return JsonResponse({'Error':'Usuario no ha verificado email'},status=401)

        user.first_name = data["newname"]

        emailverification = "true"
        if user.email != data["newemail"]:
            try:
                exist_user  = User.objects.get(username=data["newemail"])
                return JsonResponse({"Error":"Correo utilizado por otro usuario"}, status=402)
            except:
                user.email = data["newemail"]
                user.username = data['newemail']
                emailverification = "false"
        
        if data['newpassword'] != '':
            try:
                user.set_password(data['newpassword'])
            except:
                return JsonResponse({"Error":"Contraseña no cumple con un formato seguro"}, status=402)

        user.save()
        
        if emailverification == "false":
            set_email_and_send_validator_code(user)

        response = {
            "name" : user.first_name,
            "email" : user.email,
            "emailverification": emailverification
        }

        return JsonResponse({"Exito":"Actualizacion de datos hecha.", "data": response}, status=201)

@csrf_exempt
def password_config(request):
    if request.method == "POST":
        email = JSONParser().parse(request).get("email", None)
        if email is None:
            JsonResponse({"Error":"Se necesita un correo electronico"}, status=400)
        
        try:
            user = User.objects.get(username=email)
        except:
            return JsonResponse({"Error":"No se ha encontrado correo vinculado."},status=404)

        try:
            send_email_setting_password(user=user)
        except:
            return JsonResponse({"Error":"No se ha podido enviar el correo."},status=404)
        
        return JsonResponse({"Exito":f"Correo enviado con informacion a {email}",
                             "user": str(user)}, status=201)
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        token = data.get("token", None)
        new_password = data.get("newpassword", None)

        if token is None:
            return JsonResponse({"Error":"Se necesita el codigo de validacion"}, status=400)

        if new_password is None:
            return JsonResponse({"Error":"Se necesita la nueva contraseña"}, status=404)
        
        if len(new_password)<8:
            return JsonResponse({"Error":"Se necesita una contraseña valida"}, status=400)

        try:
            clean_register()
            code_token = PasswordRecover.objects.get(token=token)
            user = code_token.user
            user.set_password(new_password)
            user.save()
            code_token.delete()
        except:
            return JsonResponse({"Error":"Codigo de validacion incorrecto"}, status=401)
        
        return JsonResponse({"Exito":"Se ha actualizado la contraseña exitosamente"}, status=200)