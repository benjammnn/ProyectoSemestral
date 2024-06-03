# Generated by Django 5.0.6 on 2024-06-03 02:20

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Genero',
            fields=[
                ('id_genero', models.AutoField(db_column='idGenero', primary_key=True, serialize=False)),
                ('genero', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id_username', models.CharField(max_length=15, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=15)),
                ('apellido', models.CharField(max_length=15)),
                ('edad', models.PositiveIntegerField(max_length=2)),
                ('email', models.EmailField(max_length=50, unique=True)),
                ('ubicacion', models.CharField(max_length=50)),
                ('biografia', models.TextField(blank=True, null=True)),
                ('fecha_registro', models.DateTimeField(auto_now_add=True)),
                ('ultima_actividad', models.DateTimeField(default=django.utils.timezone.now)),
                ('id_genero', models.ForeignKey(db_column='id_Genero', on_delete=django.db.models.deletion.CASCADE, to='myapp.genero')),
            ],
        ),
        migrations.CreateModel(
            name='Preferencia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('edad_minima', models.PositiveIntegerField(blank=True, null=True)),
                ('edad_maxima', models.PositiveIntegerField(blank=True, null=True)),
                ('distancia_maxima', models.PositiveIntegerField(blank=True, null=True)),
                ('id_genero', models.ForeignKey(db_column='id_Genero', on_delete=django.db.models.deletion.CASCADE, to='myapp.genero')),
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='preferencia', to='myapp.usuario')),
            ],
        ),
        migrations.CreateModel(
            name='Mensaje',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contenido', models.TextField()),
                ('fecha_envio', models.DateTimeField(auto_now_add=True)),
                ('usuario_emisor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mensajes_enviados', to='myapp.usuario')),
                ('usuario_receptor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mensajes_recibidos', to='myapp.usuario')),
            ],
        ),
        migrations.CreateModel(
            name='Foto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imagen', models.ImageField(upload_to='myapp\\static\\myapp\\img/')),
                ('fecha_subida', models.DateTimeField(auto_now_add=True)),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.usuario')),
            ],
        ),
        migrations.CreateModel(
            name='Match',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_match', models.DateTimeField(auto_now_add=True)),
                ('usuario_1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='matches_1', to='myapp.usuario')),
                ('usuario_2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='matches_2', to='myapp.usuario')),
            ],
            options={
                'unique_together': {('usuario_1', 'usuario_2')},
            },
        ),
    ]
