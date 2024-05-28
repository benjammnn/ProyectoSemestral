from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login

# Create your views here.
def index(request):
    return render(request, 'myapp/Index.html')

def login(request):
    return render(request, 'myapp/login.html')





def register(request):
    return render(request, 'myapp/register.html')

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