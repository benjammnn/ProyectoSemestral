from django.contrib import admin
from .models import Genero, User, Foto, UsuarioSettings, Match, Mensaje, chat
# Register your models here.

admin.site.register(Genero)
admin.site.register(User)
admin.site.register(Foto)
admin.site.register(UsuarioSettings)
admin.site.register(Match)
admin.site.register(Mensaje)
admin.site.register(chat)

