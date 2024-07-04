from django.shortcuts import render, redirect, get_object_or_404
from .models import Usuario, Foto, UsuarioSettings, Match, Mensaje, Chat
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .forms import UserForm
from django.utils import timezone

# Create your views here.
def index(request):
    context = {
        "user": "",
    }
    return render(request, 'myapp/Index.html', context)

def loginview(request):
    if request.method=="POST":
        username= request.POST.get("user")
        password = request.POST.get("password")
        user = authenticate(request,username=username,password=password)
        if user is not None:
            login(request,user)
            usuarios = User.objects.all()
            context = {
                "usuarios":usuarios,
            }
            return render(request,"myapp/Index.html",context)
        else:
            context = {
                "mensaje":"Usuario o contraseña incorrecta",
                "design":"alert alert-danger w-50 mx-auto text-center",
            }
            return render(request,"myapp/login.html",context)
    else:
        context = {

        }
        return render(request,"myapp/login.html",context)


def logout_view(request):
    logout(request)
    return redirect('login')

def register(request):
    if request.method != 'POST':
        return render(request, 'myapp/register.html')
    else:
        nombre = request.POST["nombre"]
        apellidos = request.POST["apellidos"]
        email = request.POST.get("email")
        password  = request.POST.get("password")
        fecha_nacimiento = request.POST.get("fecha_nacimiento")
        genero = request.POST.get("genero")
        activo = request.POST.get("activo") == "on"

        #User create
        
        user = User.objects.create_user(email,email,password)
        user.date_joined=timezone.now()
        user.first_name=nombre
        user.last_name=apellidos
        obj = Usuario.objects.create(
            user=user,
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