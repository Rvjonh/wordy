from verificacion_email.models import EmailVerificado
from django.core.mail import EmailMessage

import os

#generar codigo de seguridad para validar email
import string
import random

URL_FRONTEND = os.getenv('URL_FRONTEND')

def set_email_and_send_validator_code(user=None):
    if user is None:
        raise("Must pass an user, with email")
    codigo = get_codigo_de_email()
    try:
        email_validator = EmailVerificado.objects.get(user=user)
        email_validator.codigo = codigo
        email_validator.verificado = False
        email_validator.save()
    except:
        EmailVerificado.objects.create(user=user, codigo=codigo)
    enviar_codigo_email(user, codigo)

def get_codigo_de_email():
    length_of_string = 7
    return ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(length_of_string))

def enviar_codigo_email(user, codigo):
    html_content = get_html_template(codigo)
    email = EmailMessage("Codigo de verificacion", html_content, to=[user.email])
    email.content_subtype = "html"
    email.send()

def get_html_template(codigo):
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
                                    <h2 style="text-align:center;">
                                        Codigo de verificacion:
                                    </h2>
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
                                    <div style="width: 100%;" >
                                        <span style="font-weight: 700; font-size: 1.5rem; padding: 0.2em 0.5em; border-radius: 0.4em; background-color:rgb(177, 224, 247); border:0.2em solid black">{codigo}</span>
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
                                    <p style='text-align: center;'>
                                        Ingresa este codigo de verificacion en el apartado de verificar correo electronico/cuenta, necesitaras iniciar sesión y dirigirte a ese apartado.
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
                                        <a href="{URL_FRONTEND}/verificar-correo"
                                        target="_blank"
                                        style="text-align: center; text-decoration:none; font-weight: 700; color:rgb(255, 255, 255); background-color:#0288d1; border:0.2em solid black; border-radius:0.2em; padding:0.5em 1em;">
                                            Haciendo click aqui
                                        </a>
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
                                    <section style="text-align: center;">
                                        <p>
                                            Usted ha recibido este correo electronico porque ha utilizado este correo para registrarse en nuestra aplicacion web y necesita verificar tu autenticidad.
                                        </p>
                                        <p>
                                            Por favor agregue Wordy a su lista de marcadores favoritos, y tambien puede descargar la aplicacion totalmente gratis, con esto podra utilizar completamente la applicaciown incluso offline.
                                        </p>
                                        <p style="text-align: left; padding-left: 1em;">
                                            Atentamente. <br/>
                                            El equipo de Wordy. 😊
                                        </p>
                                    </section>
                        
                                    <footer style="padding:1em; text-align: center;">
                                        <a  href="{URL_FRONTEND}"
                                            target="_blank"
                                            style="text-decoration: underline; color:rgb(90, 201, 255)">
                                            Gracias por registrarte en Wordy, esperamos que aprendas nuevo vocabulario con esta aplicacion.
                                        </a>
                                        😀
                                    </footer>
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