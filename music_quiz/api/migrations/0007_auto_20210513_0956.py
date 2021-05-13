# Generated by Django 3.1.7 on 2021-05-13 07:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_songs'),
    ]

    operations = [
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=300, unique=True)),
                ('song_name', models.CharField(max_length=50)),
                ('album_name', models.CharField(max_length=50)),
                ('artist_name', models.CharField(max_length=50)),
                ('trivia', models.CharField(max_length=300)),
                ('release_year', models.IntegerField(default=-1)),
            ],
        ),
        migrations.DeleteModel(
            name='Songs',
        ),
    ]
