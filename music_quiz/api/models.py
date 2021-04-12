from django.db import models
import string
import random

# Create your models here.
def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code


# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    num_questions = models.IntegerField(default=5)
    current_question = models.IntegerField(default=0)
    questions = models.TextField(default="[]")
    player_can_join = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Player(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    room_code = models.CharField(max_length=8)
    user_name = models.CharField(max_length=15)
    session_key = models.CharField(max_length=50, unique=True)
    score = models.IntegerField(default=0)
