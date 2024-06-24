from django.contrib import admin
from .models import User, Foto, UsuarioSettings, Match, Mensaje, Chat
# Register your models here.

admin.site.register(User)
admin.site.register(Foto)
admin.site.register(UsuarioSettings)
admin.site.register(Match)
admin.site.register(Mensaje)
admin.site.register(Chat)

