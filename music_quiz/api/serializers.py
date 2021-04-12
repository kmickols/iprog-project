from rest_framework import serializers
from .models import Room, Player


# We would want id, num_questions(?), playlist(?), players(?), code, host, created_at
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'num_questions', 'current_question', 'questions', 'player_can_join', 'created_at',)


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('num_questions',)

class RoomCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('code', )

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('room', 'room_code', 'user_name', 'session_key', 'score')

class PlayerInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('user_name', 'room_code',  'session_key', 'score')

class CreatePlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('room_code', 'user_name')