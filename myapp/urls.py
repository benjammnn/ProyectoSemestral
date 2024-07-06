from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.loginview, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('register/', views.register, name='register'),
    path('matcher2/', views.matcher2, name='matcher2'),
    path('chat/', views.chat, name='chat'),
    path("user_findEdit/<str:pk>", views.user_findEdit, name="user_findEdit"),
    path('perfilUser/', views.perfilUser, name='perfilUser'),
    path('pestañaInfo/', views.pestañaInfo, name='pestañaInfo'),
    path('recuperaContraseña/', views.recuperaContraseña, name='recuperaContraseña'),
    path("crud/", views.crud, name="crud"),
    path("user_del/<str:pk>", views.user_del, name="user_del"),
    path("perfilMatch/", views.perfilMatch, name='perfilMatch')
]