from ast import Pass
from django.core.mail import EmailMessage

from verificacion_email.models import EmailVerificado
from api.models import PasswordRecover
from .clean_passwordRecover_tokens import clean_register

import os
import random
import string


URL_FRONTEND = os.getenv('URL_FRONTEND')

def send_email_setting_password(user=None):
    if user is None:
        raise("Usuario no sumistrado")

    correo_verificado = EmailVerificado.objects.get(user=user)
    code = get_code_token()

    clean_register()
    try:
        flag_token = PasswordRecover.objects.get(user=user)
        flag_token.token = code
        flag_token.save()
    except:
        flag_token = PasswordRecover.objects.create(user=user, token=code)

    try:
        body = get_email(correo_verificado=correo_verificado.verificado, token=code, username=user)

        email = EmailMessage("Recuperar Contraseña", body, to=[user.email])
        email.content_subtype = "html"
        email.send()
    except:
        flag_token.delete()
        raise("No se ha podido enviar el correo")

def get_code_token():
    length_of_string = 10
    return ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(length_of_string))

def get_email(correo_verificado=False, token=None, username=""):
    email_message = ""
    if not correo_verificado:
        email_message = "Te aconsejamos que confirmes tu correo electronico tambien 😃"

    body = f""" 
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:rgb(255, 255, 255);background-image:none;background-repeat:repeat;background-position:top left">
            <tbody>
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" height="0" width="100%" style="background-color:#fff;background-image:none;background-repeat:repeat;background-position:top left">
                            <tbody>
                                <tr>
                                    <td align="center" valign="middle">
                                        <h1 style="display: inline;
                                                padding: 0.1em;
                                                border: 0.12em solid black;
                                                border-radius:0.1em;
                                                font-size: 2.5em;
                                                background-color: rgb(90, 201, 255);">
                                            Wordy
                                        </h1>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" height="0" width="100%" style="background-color:#fff;background-image:none;background-repeat:repeat;background-position:top left">
                            <tbody>
                                <tr>
                                    <td align="center" valign="middle">
                                        <p>Hola {username}, ¿querías restablecer la contraseña?</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" height="0" width="100%" style="background-color:#fff;background-image:none;background-repeat:repeat;background-position:top left">
                            <tbody>
                                <tr>
                                    <td align="center" valign="middle">
                                        {email_message}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" height="0" width="100%" style="background-color:#fff;background-image:none;background-repeat:repeat;background-position:top left">
                            <tbody>
                                <tr>
                                    <td align="center" valign="middle">
                                        <p>
                                            Alguien (esperemos que tú) nos ha solicitado restablecer la contraseña de tu cuenta de Wordy.
                                            Haz clic en el botón siguiente para hacerlo.
                                            Si no solicitaste restablecer la contraseña,
                                            puedes ignorar este mensaje.
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" height="0" width="100%" style="background-color:#fff;background-image:none;background-repeat:repeat;background-position:top left">
                            <tbody>
                                <tr>
                                    <td align="center" valign="middle">
                                        <div style="margin: 1em 0;">
                                            <a href="{URL_FRONTEND}/recuperar-contrasena/user/{token}"
                                            target="_blank"
                                            style="text-align: center; text-decoration:none; font-weight: 700; color:rgb(255, 255, 255); background-color:#0288d1; border:0.2em solid black; border-radius:0.2em; padding:0.5em 1em;">
                                                Haciendo click aqui
                                            </a>
                                        </div>
                                        <div style="margin: 1em 0;">
                                            O haz clic en este enlace:{URL_FRONTEND}/recuperar-contrasena/user/{token}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" height="0" width="100%" style="background-color:#fff;background-image:none;background-repeat:repeat;background-position:top left">
                            <tbody>
                                <tr>
                                    <td align="center" valign="middle">
                                        © 2022 Wordy. Todos los derechos reservados
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    """
    return body