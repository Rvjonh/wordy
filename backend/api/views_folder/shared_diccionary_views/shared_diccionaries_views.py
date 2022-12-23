
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.parsers import JSONParser

from diccionarios.models import SharedDiccionarios, SharedPalabras

class Shared_Grupo_views(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, idioma):
        
        if idioma is None:
            return Response({"Error":"No se han suministrado el idioma"}, status=402)

        try:
            all_shared_diccionaries = SharedDiccionarios.objects.filter(idioma=idioma)
        except:
            return Response({"Error":"No se han encontrado diccionarios",
                        "idioma":idioma}, status=404)
        
        user_diccionaries = []
        
        for dict in all_shared_diccionaries:
            dict_aux = {
                "id" : f'{dict.id}',
                "name" : dict.nombre,
                "language" : dict.idioma,
                "description" : dict.description,
                "words":[]
            }

            try:
                dict_words = SharedPalabras.objects.filter(shared_diccionarios=dict)
                for word in dict_words:
                    dict_aux["words"].append({
                        "id" : f"{word.id}",
                        "name" : word.nombre,
                        "meaning" : word.significado,
                    })
            except:
                dict_aux["words"] = []

            user_diccionaries.append(dict_aux)

        return Response({"Success":"Diccionarios",
                    "data":user_diccionaries}, status=200)