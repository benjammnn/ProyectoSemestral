from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('matcher2/', views.matcher2, name='matcher2'),
    path('chat/', views.chat, name='chat'),
    path('perfilUser/', views.perfilUser, name='perfilUser'),
    path('pestañaInfo/', views.pestañaInfo, name='pestañaInfo'),
    path('recuperaContraseña/', views.recuperaContraseña, name='recuperaContraseña'),
]