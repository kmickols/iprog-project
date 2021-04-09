from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer, CreatePlayerSerializer, PlayerSerializer, PlayerInfoSerializer
from .models import Room, Player
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response


class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class PlayersView(generics.ListAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        return Response({"Bad Request": "Room code parameter not preesent in request"}, status=status.HTTP_400_BAD_REQUEST)


class CreateRoomView(generics.CreateAPIView):

    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            num_questions = serializer.data.get('num_questions')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                # Room already exists - Update current room
                room = queryset[0]
                room.num_questions = num_questions
                room.save(update_fields=['num_questions'])
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                # No room wit this session ID - Create new room.
                room = Room(host=host, num_questions=num_questions)
                room.save()
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


# Players cant join anymore.
class LaunchGame(APIView):
    pass


# Delete the room
class EndGame(APIView):
    pass


class JoinRoomView(APIView):

    serializer_class = CreatePlayerSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get('room_code')
        user_name = request.data.get('user_name')
        if code != None:
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]
                if not room.player_can_join:
                    return Response({"message": "Room is closed.", "err_code": 1},
                                    status=status.HTTP_503_SERVICE_UNAVAILABLE)

                self.request.session['room_code'] = code

                session_key = self.request.session.session_key
                queryset = Player.objects.filter(session_key=session_key)
                if queryset.exists():
                    # Player exists
                    player = queryset[0]
                    player.room = room
                    player.user_name = user_name
                    player.room_code = code
                    player.score = 0
                    player.save(update_fields=['room', 'user_name', 'room_code', 'score'])

                else:
                    player = Player(room=room, session_key=session_key, room_code=code, user_name=user_name, score=0)
                    player.save()

                return Response({"message": "Room Joined."}, status=status.HTTP_200_OK)
            return Response({"Bad request": "Invalid Room Code", "err_code": 2}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"Bad request": "Invalid Post data.", "err_code": 0, "code": code, "user_name": user_name},
                        status=status.HTTP_400_BAD_REQUEST)


class UserInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data = {
            'code': self.request.session.get('room_code')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)


class LeaveRoom(APIView):
    def post(self, request, format=None):
        if "room_code" in self.request.session:
            self.request.session.pop("room_code")
            id = self.request.session.session_key
            room_results = Room.objects.filter(host=id)
            if len(room_results) > 0:
                room = room_results[0]
                room.delete()

            player_results = Player.objects.filter(session_key=id)


        return Response({"Message": "Success"}, status=status.HTTP_200_OK)


class PlayersInRoom(APIView):
    def get(self, request, format=None):
        code = request.query_params['room_code']
        if code is not None:
            queryset = list(Player.objects.filter(room_code=code))
            lst = []
            for i in range(0, len(queryset)):
                lst.append(PlayerInfoSerializer(queryset[i]).data)

            data = {"players": lst}
            return JsonResponse(data, status=status.HTTP_200_OK)
        else:
            return Response({"Bad Requeset": "no room_code provided"}, status=status.HTTP_400_BAD_REQUEST)


# Player sends an answer to a question
class AnswerQuestion(APIView):
    pass
