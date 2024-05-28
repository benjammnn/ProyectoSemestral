from django.db import models
from django.contrib.auth.models import AbstractUser


""" class Usuario ():
    username = models.AutoField(primary_key=True)
    nombre = models.TextField(blank=True, null=True)
    edad = models.PositiveIntegerField(blank = True, null = True)
    genero = models.CharField(max_length=20, blank=True, null=True)
    biografia = models.TextField(blank=True, null=True)
    ubicacion = models.CharField(max_length=100, blank=True, null=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    ultima_actividad = models.DateTimeField(auto_now=True)

    email = models.EmailField(unique = True)

    def __str__(self):
        return self.username

class Foto(models.Model):
    usuario = models. ForeignKey(Usuario, on_delete=models.CASCADE, related_name='fotos')
    ruta = models.ImageField(upload_to='fotos/')
    fecha_subida = models.DateField(auto_now_add=True)

class Mensaje(models.Model):
    usuario_emisor = models.ForeignKey(Usuario, related_name='mensajes_enviados', on_delete=models.CASCADE)
    usuario_receptor = models.ForeignKey(Usuario, related_name='mensajes_recibidos', on_delete=models.CASCADE)
    contenido = models.TextField()
    fecha_envio = models.DateTimeField(auto_now_add=True)

class Match(models.Model):
    usuario_1 = models.ForeignKey(Usuario, related_name='matches_1', on_delete=models.CASCADE)
    usuario_2 = models.ForeignKey(Usuario, related_name='matches_2', on_delete=models.CASCADE)
    fecha_match = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('usuario_1', 'usuario_2')

class Preferencia(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='preferencia')
    edad_minima = models.PositiveIntegerField(blank=True, null=True)
    edad_maxima = models.PositiveIntegerField(blank=True, null=True)
    genero_preferido = models.CharField(max_length=20, blank=True, null=True)
    distancia_maxima = models.PositiveIntegerField(blank=True, null=True)

 """