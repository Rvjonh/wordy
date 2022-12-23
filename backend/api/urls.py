
from django.urls import path

from . import views
from api.views_folder.email_verificator import email_views
from api.views_folder.diccionarios_views import group_views
from api.views_folder.shared_diccionary_views import shared_diccionaries_views

urlpatterns = [
    path('signup/', views.signup),
    path('login/', views.login),
    path('profile/', views.profile),
    path('password/', views.password_config),
    path('email/', email_views.EmailProcessView.as_view()),
    path('group/', group_views.Grupo_views.as_view()),
    path('shared-group/<str:idioma>/', shared_diccionaries_views.Shared_Grupo_views.as_view()),
]