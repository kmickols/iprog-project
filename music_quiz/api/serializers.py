from rest_framework import serializers
from .models import Room, Player, Song


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'num_questions', 'current_question', 'questions', 'block_answers',
                  'quiz_type', 'player_can_join', 'created_at',)


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ('id', 'song_name', 'album_name', 'artist_name', 'trivia', 'release_year', 'token', 'types')


class SongIdSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Song
        fields = ('id',)


class CreateSongSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=300)

    class Meta:
        model = Song
        fields = ('song_name', 'album_name', 'artist_name', 'release_year', 'trivia', 'token', 'types')


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('num_questions', 'quiz_type')


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