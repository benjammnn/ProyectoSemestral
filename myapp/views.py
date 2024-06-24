from django.shortcuts import render, redirect, get_object_or_404
from .models import User, Foto, UsuarioSettings, Match, Mensaje, Chat
from django.contrib.auth import authenticate, login
from .forms import UserForm

# Create your views here.
def index(request):
    context = {
        "user": "",
    }
    return render(request, 'myapp/Index.html', context)

def login(request):
    return render(request, 'myapp/login.html')



def register(request):
    if request.method != 'POST':
        return render(request, 'myapp/register.html')
    else:
        nombre = request.POST.get("nombre")
        apellidos = request.POST.get("apellidos")
        email = request.POST.get("email")
        password  = request.POST.get("password")
        fecha_nacimiento = request.POST.get("fecha_nacimiento")
        genero = request.POST.get("genero")
        activo = request.POST.get("activo") == "on"

        obj = User.objects.create(
            nombre=nombre,
            apellidos=apellidos,
            email=email,
            password=password,
            fecha_nacimiento=fecha_nacimiento,
            genero=genero,
            activo=activo
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