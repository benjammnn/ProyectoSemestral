from django.shortcuts import render, redirect
from .models import Genero, User, Foto, UsuarioSettings, Match, Mensaje, chat
from django.contrib.auth import authenticate, login

# Create your views here.
def index(request):
    context = {
        "user": "",
    }
    return render(request, 'myapp/Index.html', context)

def login(request):
    return render(request, 'myapp/login.html')





def register(request):
    if request.method == 'POST':
        generos = Genero.objects.all()
        context = {
            "generos": generos,
        }
        return render(request, 'myapp/register.html', context)
    else:
        id_user = request.POST["id_user"]
        nombre = request.POST["nombre"]
        apellidos = request.POST["apellidos"]
        email = request.POST["email"]
        password  = request.POST["password"]
        fecha_nacimiento = request.POST["fecha_nacimiento"]
        genero = request.POST["genero"]
        
        objGenero = Genero.objects.get(id_genero=genero)

        obj = User.objects.create(
            id_user=id_user,
            nombre=nombre,
            apellidos=apellidos,
            email=email,
            password=password,
            fecha_nacimiento=fecha_nacimiento,
            id_genero=objGenero
        )
        obj.save()
        context = {
            "mensaje": "Se ha registrado el usuario correctamente",
        }
        return render(request, 'myapp/login.html', context)


def matcher2 (request):
    return render(request, 'myapp/matcher2.html')

def chat(request):
    return render(request, 'myapp/chat.html')

def perfilUser(request):
    return render(request, 'myapp/perfilUser.html')

def pestañaInfo(request):
    return render(request, 'myapp/pestañaInfo.html')

def recuperaContraseña (request):
    return render(request, 'myapp/recuperaContraseña.html')