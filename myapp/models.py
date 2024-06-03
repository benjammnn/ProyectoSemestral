from django.db import models
from django.utils import timezone


class Usuario(models.Model):
    id_username = models.CharField(primary_key=True, max_length=15)
    nombre = models.CharField(blank=False, null=False, max_length=15)
    apellido = models.CharField(blank=False, null=False, max_length=15)
    edad = models.PositiveIntegerField(blank=False, null=False, max_length=2)
    id_genero = models.ForeignKey(
        "Genero", on_delete=models.CASCADE, db_column="id_Genero"
    )
    email = models.EmailField(unique=True, max_length=50, blank=False, null=False)
    ubicacion = models.CharField(blank=False, name=False, max_length=50)
    biografia = models.TextField(blank=True, null=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    ultima_actividad = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.id_username)
    

class Genero(models.Model):
    id_genero = models.AutoField(db_column="idGenero", primary_key=True)
    genero = models.CharField(max_length=20, blank=False, null=False)

    def __str__(self):
        return str(self.genero)
    
class Foto(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to='myapp\static\myapp\img/')
    fecha_subida = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Foto de {self.usuario.id_username}"
    
class Mensaje(models.Model):
    usuario_emisor = models.ForeignKey(Usuario, related_name='mensajes_enviados', on_delete=models.CASCADE)
    usuario_receptor = models.ForeignKey(Usuario, related_name='mensajes_recibidos', on_delete=models.CASCADE)
    contenido = models.TextField(blank=False, null=False)
    fecha_envio = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Mensaje de {self.usuario_emisor.id_username} a {self.usuario_receptor}"
        '''return f"Mensaje de {self.usuario_emisor} a {self.usuario_receptor}"'''


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
    id_genero = models.ForeignKey(
        "Genero", on_delete=models.CASCADE, db_column="id_Genero"
    )
    distancia_maxima = models.PositiveIntegerField(blank=True, null=True)