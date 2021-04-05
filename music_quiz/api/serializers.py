from rest_framework import serializers
from .models import Room


# We would want id, num_questions(?), playlist(?), code, host, created_at
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'num_questions', 'created_at')


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('num_questions',)
