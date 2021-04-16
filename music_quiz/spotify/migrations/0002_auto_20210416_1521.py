# Generated by Django 3.1.7 on 2021-04-16 13:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='access_token',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='spotifytoken',
            name='refresh_token',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='spotifytoken',
            name='token_type',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='spotifytoken',
            name='user',
            field=models.CharField(max_length=300, unique=True),
        ),
    ]