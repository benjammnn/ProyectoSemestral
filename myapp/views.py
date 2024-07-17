from django.shortcuts import render, redirect, get_object_or_404
from .models import Usuario, UsuarioSettings, Match, Mensaje, Chat, Like
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .forms import UserForm
from django.utils import timezone
from django.contrib.auth.decorators import login_required, user_passes_test
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.utils.decorators import method_decorator
import json


# Create your views here.
def unauthenticated_user(user):
    return not user.is_authenticated

def index(request):
    context = {
        "user": "",
    }
    return render(request, 'myapp/Index.html', context)


@user_passes_test(unauthenticated_user, login_url='index')
def loginview(request):
    if request.method == "POST":
        username = request.POST.get("user")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Obtener el objeto Usuario asociado al usuario autenticado
            usuario = get_object_or_404(Usuario, user=user)
            context = {
                "usuario": usuario,
            }
            return render(request, "myapp/perfilUser.html", context)
        else:
            context = {
                "mensaje": "Usuario o contraseña incorrecta",
                "design": "alert alert-danger w-50 text-center",
            }
            return render(request, "myapp/login.html", context)
    else:
        context = {}
        return render(request, "myapp/login.html", context)


def logout_view(request):
    logout(request)
    return redirect('login')

@user_passes_test(unauthenticated_user, login_url='index')
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

@login_required

def pestañaInfo(request):
    return render(request, 'myapp/pestañaInfo.html')

def recuperaContraseña (request):
    return render(request, 'myapp/recuperaContraseña.html')

@login_required
def crud(request):
    usuarios = Usuario.objects.all()
    context = {
        "usuarios": usuarios,
    }
    return render(request, "myapp/crud.html", context)

def user_del(request, pk):
    try:
        usuario = Usuario.objects.get(email=pk)
        usuario.delete()

        usuarios = Usuario.objects.all()
        context = {
            "mensaje": "Registro Eliminado",
            "usuarios": usuarios,
        }
        return render(request, "myapp/crud.html", context)
    except:
        usuarios = Usuario.objects.all()
        context = {
            "mensaje": "Error,Usuario no encontrado...",
            "usuarios": usuarios,
        }
        return render(request, "myapp/crud.html", context)



def user_findEdit(request, pk):
    try:
        usuario = Usuario.objects.get(email=pk)
        context = {
            "usuario": usuario,
        }
        return render(request, "myapp/perfilUser.html", context)
    except Usuario.DoesNotExist:
        usuarios = Usuario.objects.all()
        context = {
            "mensaje": "Error, Email no encontrado",
            "usuarios": usuarios
        }
        return render(request, "myapp/crud.html", context)


@login_required  
def perfilUser(request):
    user = request.user

    try:
        usuario = Usuario.objects.get(user=user)
    except ObjectDoesNotExist:
        usuario = Usuario(user=user)

    if request.method == "POST":
        nombre = request.POST.get("nombre")
        apellidos = request.POST.get("apellidos")
        email = request.POST.get("email")
        password = request.POST.get("password")
        fecha_nacimiento = request.POST.get("fecha_nacimiento")
        genero = request.POST.get("genero")
        foto = request.FILES.get("foto")
        activo = True

        print("Datos recibidos del formulario:")
        print(f"Nombre: {nombre}")
        print(f"Apellidos: {apellidos}")
        print(f"Email: {email}")
        print(f"Password: {password}")
        print(f"Fecha de nacimiento: {fecha_nacimiento}")
        print(f"Género: {genero}")


        # Actualizar el usuario de Django
        user.first_name = nombre
        user.last_name = apellidos
        if password:
            user.set_password(password)
        user.save()

         # Actualizar el perfil de Usuario
        usuario.nombre = nombre
        usuario.apellidos = apellidos
        if password:
            usuario.password = password  # Considera si quieres almacenar las contraseñas así
        usuario.fecha_nacimiento = fecha_nacimiento
        usuario.genero = genero
        if foto:
            usuario.foto = foto
        usuario.activo = activo
        usuario.save()

        context = {
            "mensaje": "Modificado con Éxito",
            "usuario": usuario,
        }
        return render(request, "myapp/perfilUser.html", context)

    else:
        context = {
            "usuario": usuario,
        }
        return render(request, "myapp/perfilUser.html", context)

@login_required    
def perfilMatch(request):
    usuario = get_object_or_404(Usuario, email=request.user.email)

    context = {
        'usuario': usuario,
    }

    return render(request, 'myapp/perfilMatch.html', context)

def matcher2(request):
    users= Usuario.objects.exclude(email=request.user.email)
    return render(request, 'myapp/matcher2.html', {'users': users})

@login_required
@require_POST
def like_user(request, user_email):
    liked_user = get_object_or_404(Usuario, email=user_email)
    action = json.loads(request.body).get('action')

    if action == 'like':
        Like.objects.get_or_create(liker=request.user.usuario, liked=liked_user)
    # No es necesario guardar 'dislike' en la base de datos, a menos que lo quieras hacer.

    return JsonResponse({'status': 'ok'})

def chat(request):
    user = request.user.usuario
    matches = Usuario.objects.filter(liked_users=user, liked_by=user)
    return render(request, 'myapp/chat.html', {'matches': matches})

