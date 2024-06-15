from django.db import models
from django.utils import timezone


class Genero(models.Model):
    id_genero = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50, blank=False, null=False)

    def __str__(self):
        return str(self.nombre)
    
class User(models.Model):
    id_user = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=50 )
    fecha_nacimiento = models.DateField()
    id_genero = models.ForeignKey(Genero, on_delete=models.CASCADE, related_name='id_user_genero')

    def __str__(self):
        return self.email
    
class Foto (models.Model):
    id_foto = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='id_user_foto')
    foto = models.ImageField(upload_to='myapp/static/img')

    def __str__(self):
        return self.id_user.email

class UsuarioSettings(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='id_user_settings')
    id_genero = models.ForeignKey(Genero, on_delete=models.CASCADE, related_name='id_settings_genero')
    id_foto = models.ForeignKey(Foto, on_delete=models.CASCADE, related_name='id_settings_foto')
    foto_perfil = models.ImageField(upload_to='myapp/static/img')
    descripcion = models.TextField()
    carrera = models.CharField(max_length=100)

    def __str__(self):
        return self.id_user.email
    
class Match(models.Model):
    id_match = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='id_match_user')
    id_user_matched = models.ForeignKey(User, on_delete=models.CASCADE, related_name='id_user_matched')
    
    def __str__(self):
        return self.id_user.nombre + ' - ' + self.id_user_matched.nombre
    

class Mensaje(models.Model):
    id_mensaje = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='id_user_mensaje')
    id_user_matched = models.ForeignKey(User, on_delete=models.CASCADE, related_name='id_user_matched_mensaje')
    mensaje = models.TextField()
    fecha_mensaje = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.id_user.nombre + ' - ' + self.id_user_matched.nombre

class chat (models.Model):
    id_chat = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='id_user_chat')
    id_user_matched = models.ForeignKey(User, on_delete=models.CASCADE, related_name='id_user_matched_chat')
    id_mensaje = models.ForeignKey(Mensaje, on_delete=models.CASCADE, related_name='id_mensaje_chat')