from django import forms
from .models import Usuario

class UserForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ['nombre', 'apellidos', 'email', 'password', 'fecha_nacimiento', 'genero', 'foto', 'activo']