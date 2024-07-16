from django.contrib import admin
from .models import Usuario, Foto, UsuarioSettings, Match, Mensaje, Chat, Like
# Register your models here.

admin.site.register(Usuario)
admin.site.register(Foto)
admin.site.register(UsuarioSettings)
admin.site.register(Match)
admin.site.register(Mensaje)
admin.site.register(Chat)
admin.site.register(Like)

