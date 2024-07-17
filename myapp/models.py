from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Usuario(models.Model):
    GENERO_CHOICES = [
        ('Masculino', 'Masculino'),
        ('Femenino', 'Femenino'),
        ('Otro', 'Otro'),

    ]
    user = models.OneToOneField(User,on_delete=models.CASCADE,blank=True,null=True)
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=50 )
    fecha_nacimiento = models.DateField()
    genero = models.CharField(max_length=10, choices=GENERO_CHOICES)
    foto = models.ImageField(upload_to='fotos', blank=True, null=True)
    activo = models.BooleanField(default=True)
    liked_users = models.ManyToManyField('self', through='Like', symmetrical=False, related_name='liked_by')

    def __str__(self):
        return f'{self.nombre} {self.apellidos}'
    
    def get_age(self):
        today = timezone.now().date()
        return today.year - self.fecha_nacimiento.year - ((today.month, today.day) < (self.fecha_nacimiento.month, self.fecha_nacimiento.day))

class Like(models.Model):
    liker = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='liker')
    liked = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='liked')
    timestano = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('liker', 'liked')

"""class Foto (models.Model):
    
    usuarioFoto = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    foto = models.ImageField(upload_to='myapp/static/img')

    def __str__(self):
        return f'{self.usuarioFoto.nombre} {self.usuarioFoto.apellidos}'
"""

class UsuarioSettings(models.Model):
    userConfig = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    """fotoConfig = models.ForeignKey(Foto, on_delete=models.CASCADE)"""
    foto_perfil = models.ImageField(upload_to='myapp/static/img')
    descripcion = models.TextField()
    carrera = models.CharField(max_length=100)

    def __str__(self):
        return self.userConfig.email
    
class Match(models.Model):
    
    userMatch_1 = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='userMatch_1')
    userMatch_2 = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='userMatch_2')
    
    def __str__(self):
        return self.UserMatcher_1.nombre + ' - ' + self.UserMatcher_2.nombre
    

class Mensaje(models.Model):
    userMensaje_1 = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='userMensaje_1')
    userMensaje_2 = models.ForeignKey(Usuario, on_delete=models.CASCADE , related_name='userMensaje_2')
    mensaje = models.TextField()
    fecha_mensaje = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.userMensaje_1.nombre + ' - ' + self.userMensaje_2.nombre

class Chat (models.Model):
    userChat_1 = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='userChat_1')
    userChat_2 = models.ForeignKey(Usuario, on_delete=models.CASCADE , related_name='userChat_2')
    chatMensaje = models.ForeignKey(Mensaje, on_delete=models.CASCADE)

    def __str__ (self):
        return self.userChat_1.username + ' - ' + self.userChat_2.nombre