from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.parsers import JSONParser
from rest_framework.response import Response


from datetime import datetime
from diccionarios.models import Diccionarios, Palabras

def getDateTime():
    x = datetime.now()
    day = x.day
    month = x.month
    year = x.year

    hour = x.hour
    minute = x.minute
    second = x.second

    return f'{day}/{month}/{year} {hour}:{minute}:{second}'

class Grupo_views(APIView):
    """ Management for dictionaries with passed words, a.k.a 'group' """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        """ Creates a new group """
        try:
            data = JSONParser().parse(request)
        except:
            return Response({"Error":"Datos necesarios no encontrados"}, status=400)

        try:
            last_datetime = datetime.strptime(str(data["lastPlay"]), "%d/%m/%Y %H:%M:%S")
        except:
            return Response({"Error":"Fecha de ultimo juego erronea"}, status=400)

        try:
            if len(data["words"])<=0:
                pass
        except:    
            return Response({"Error":"Los diccionarios deben tener almenos una palabra"}, status=400)

        try:
            new_dict = Diccionarios.objects.create(user=request.user,
                                                    nombre=data["name"],
                                                    last_play=last_datetime,
                                                    idioma=data["language"])
        except:
            return Response({"Error":"No se pudo crear el diccionario por falta de datos"}, status=400)

        words = data["words"]
        new_words = []
        for word in words:
            create = True
            try:
                create = word["state"]
            except:
                create = ""

            if create != "delete":
                last_datetime = datetime.strptime(str(word["lastPlay"]), "%d/%m/%Y %H:%M:%S")

                new_word = Palabras.objects.create(diccionario=new_dict,
                                                    nombre=word["name"],
                                                    significado=word["meaning"],
                                                    ultima_actualizacion=last_datetime,
                                                    nivel=word["level"])
                new_words.append({"id": str(new_word.id),
                                "name": new_word.nombre,
                                "meaning": new_word.significado,
                                "lastPlay": word["lastPlay"],
                                "level": new_word.nivel
                                })

        data["id"] = str(new_dict.id)
        data["words"] = new_words
        return Response({"Success":"Diccionario creado", "data":data}, status=200)
    
    def put(self, request):
        """ Update a group """
        try:
            data = JSONParser().parse(request)
        except:
            return Response({"Error":"Datos necesarios no encontrados"}, status=400)

        try:
            last_datetime = datetime.strptime(str(data["lastPlay"]), "%d/%m/%Y %H:%M:%S")
        except:
            return Response({"Error":"Fecha de ultimo juego erronea"}, status=400)

        if len(data["words"])<=0:
            return Response({"Error":"Los diccionarios deben tener almenos una palabra"}, status=400)

        try:
            new_dict = Diccionarios.objects.get(id=data["id"])
            new_dict.nombre=data["name"]
            new_dict.last_play=last_datetime
            new_dict.idioma=data["language"]
            new_dict.save()
        except:
            return Response({"Error":"No se pudo actualizar el diccionario porque no existe"}, status=404)


        words = data["words"]

        for word in words:
            state = word.get("state", None)

            if state is not None:

                if state == "post":
                    try:
                        actual_dateTime = datetime.strptime(str(getDateTime()), "%d/%m/%Y %H:%M:%S")

                        Palabras.objects.create(diccionario=new_dict,
                                                nombre=word["name"],
                                                significado=word["meaning"],
                                                ultima_actualizacion=actual_dateTime,
                                                nivel=0)
                    except:
                        pass
            
                if state == "update":
                    try:
                        updated_word = Palabras.objects.get(id=word["id"])

                        updated_word.nombre=word["name"]
                        updated_word.significado=word["meaning"]
                        actual_dateTime = datetime.strptime(str(getDateTime()), "%d/%m/%Y %H:%M:%S")
                        updated_word.ultima_actualizacion=actual_dateTime
                        updated_word.nivel=word["level"]
                        updated_word.save()
                    except:
                        pass
                
                if state == "delete":
                    try:
                        updated_word = Palabras.objects.get(id=word["id"])
                        updated_word.delete()
                    except:
                        pass
        
        all_words = []
        for word in Palabras.objects.filter(diccionario=new_dict):
            all_words.append({
                            "id": str(word.id),
                            "name": word.nombre,
                            "meaning": word.significado,
                            "lastPlay": word.ultima_actualizacion.strftime("%d/%m/%Y %H:%M:%S"),
                            "level": word.nivel
                        })

        data["id"] = str(new_dict.id)
        data["words"] = all_words
        return Response({"Success":"Se actualizado el diccionario con sus palabras", "data":data}, status=200)
    
    def delete(self, request):
        """ Delete an entiry group, dictionary and words related """
        try:
            data = JSONParser().parse(request)
        except:
            return Response({"Error":"Datos necesarios no encontrados"}, status=400)

        try:
            id_diccionario = data.get("id", None)
            if id_diccionario is None:
                return Response({"Error":"Datos necesarios no encontrados"}, status=400)

            diccionario_a_eliminar = Diccionarios.objects.get(id=id_diccionario)
            diccionario_a_eliminar.delete()
        except:
            return Response({"Success":"El diccionario no existe actualmente"}, status=200)

        return Response({"Success":"Se ha eliminado el diccionario con sus palabras"}, status=200)

    def get(self, request):
        """ Gets all of the groups related to an user """
        try:
            all_user_diccionaries = Diccionarios.objects.filter(user=request.user)
        except:
            return Response({"Error":"No se ha encontrado el usuario",
                        "data":[]}, status=404)

        user_diccionaries = []

        for dict in all_user_diccionaries:
            dict_aux = {
                "id" : f'{dict.id}',
                "name" : dict.nombre,
                "lastPlay" : dict.last_play.strftime("%d/%m/%Y %H:%M:%S"),
                "language" : dict.idioma,
                "words":[]
            }

            try:
                dict_words = Palabras.objects.filter(diccionario=dict)
                for word in dict_words:
                    dict_aux["words"].append({
                        "id" : f"{word.id}",
                        "name" : word.nombre,
                        "meaning" : word.significado,
                        "lastPlay" : word.ultima_actualizacion.strftime("%d/%m/%Y %H:%M:%S"),
                        "level" : word.nivel
                    })
            except:
                dict_aux["words"] = []
            
            user_diccionaries.append(dict_aux)

        return Response({"Success":"Se han obtenido todos los diccionarios.",
                        "data":user_diccionaries}, status=200)
