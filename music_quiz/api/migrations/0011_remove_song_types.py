# Generated by Django 3.1.7 on 2021-05-13 09:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_song_types'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='song',
            name='types',
        ),
    ]