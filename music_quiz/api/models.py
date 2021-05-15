from django.db import models
import string
import random


def generate_unique_code():
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=6))
        if not Room.objects.filter(code=code).exists():
            break

    return code


class Room(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    num_questions = models.IntegerField(default=5)
    quiz_type = models.CharField(max_length=20, default="classics")
    current_question = models.IntegerField(default=-1)
    block_answers = models.BooleanField(default=False)
    questions = models.TextField(default="[]")
    player_can_join = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Player(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    room_code = models.CharField(max_length=8)
    user_name = models.CharField(max_length=15)
    session_key = models.CharField(max_length=50, unique=True)
    score = models.IntegerField(default=0)


class Song(models.Model):
    token = models.CharField(max_length=300, unique=True)
    song_name = models.CharField(max_length=50)
    album_name = models.CharField(max_length=50)
    artist_name = models.CharField(max_length=50)
    trivia = models.CharField(max_length=300, default="")
    release_year = models.IntegerField(default=-1)
    types = models.TextField(default="{classics}")
