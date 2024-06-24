from django import forms
from .models import User

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['nombre', 'apellidos', 'email', 'password', 'fecha_nacimiento', 'genero', 'activo']
