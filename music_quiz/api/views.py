from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer, CreatePlayerSerializer, PlayerSerializer, PlayerInfoSerializer, RoomCodeSerializer
from .models import Room, Player
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from . import functions

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
                data['players'] = get_players_in_room(code)
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        return Response({"Bad Request": "Room code parameter not preesent in request"}, status=status.HTTP_400_BAD_REQUEST)


# Create Room and generate questions
# Thought: Host shouldn't be able to recreate room after it has been launched - or it will interrupt current game.
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
                room.player_can_join = True
                room.save(update_fields=['num_questions', 'player_can_join'])
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                # No room wit this session ID - Create new room.
                room = Room(host=host, num_questions=num_questions)
                room.save()
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


# Players can't join anymore. Takes room code TODO: take spotify playlist, generate Questions.
class LaunchGame(APIView):

    serializer_class = RoomCodeSerializer

    def post(self, request, format=None):

        code = request.data.get('code')
        queryset = Room.objects.filter(code=code)
        if queryset.exists():
            # Room exists - Update current room
            room = queryset[0]
            room.player_can_join = False
            room.current_question = 0
            room.questions = functions.generate_questions([])
            room.save(update_fields=['player_can_join', 'current_question', 'questions'])
            return Response({"message": "Game Launched successfully."}, status=status.HTTP_200_OK)
        else:
            print("room doesn't exist :(")
            Response({'Bad Request': "Room with specified code doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)


# Delete the room
class EndGame(APIView):
    pass


# Client answers question, check if current question and check if answer is correct.
class AnswerQuestions(APIView):
    def post(self, request, format=None):
        pass


class GetQuestion(APIView):
    # Gets the next question/Gets all questions
    def get(self, request, format=None):
        pass


class JoinRoomView(APIView):

    serializer_class = CreatePlayerSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get('room_code')
        user_name = request.data.get('user_name')
        print(code)
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
            lst = get_players_in_room(code)

            data = {"players": lst}
            return JsonResponse(data, status=status.HTTP_200_OK)
        else:
            return Response({"Bad Requeset": "no room_code provided"}, status=status.HTTP_400_BAD_REQUEST)


def get_players_in_room(code):
    queryset = list(Player.objects.filter(room_code=code))
    lst = []
    for i in range(0, len(queryset)):
        lst.append(PlayerInfoSerializer(queryset[i]).data)
    return lst

