# Generated by Django 3.1.7 on 2021-05-13 09:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_room_quiz_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='types',
            field=models.TextField(default='[classics]'),
        ),
    ]
