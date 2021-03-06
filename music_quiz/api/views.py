from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer, CreatePlayerSerializer, PlayerSerializer, PlayerInfoSerializer, RoomCodeSerializer, SongSerializer, CreateSongSerializer, SongIdSerializer
from .models import Room, Player, Song
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


class SongsView(generics.ListAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer


class CreateSongView(generics.CreateAPIView):

    serializer_class = CreateSongSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():

            song_name = serializer.data.get('song_name')
            album = serializer.data.get('album_name')
            artist = serializer.data.get('artist_name')
            trivia = serializer.data.get('trivia')
            trivia = trivia if trivia else ""
            release = serializer.data.get('release_year')
            release = release if release else ""
            token = serializer.data.get('token')
            types = serializer.data.get('types')
            if not types:
                return Response("Types not specified or malformed.", status=status.HTTP_400_BAD_REQUEST)

            queryset = Song.objects.filter(token=token)
            if queryset.exists():
                # Song already exists - Update song
                song = queryset[0]
                song.song_name = song_name
                song.album_name = album
                song.artist_name = artist
                song.trivia = trivia
                song.release_year = release
                song.types = types
                song.save(update_fields=['song_name', 'album_name', 'artist_name', 'trivia', 'release_year', 'types'])
                return Response(SongSerializer(song).data, status=status.HTTP_200_OK)
            else:
                # No song wit this token - Create new song.
                song = Song(song_name=song_name, album_name=album, artist_name=artist, trivia=trivia,
                            token=token, release_year=release, types=types)
                song.save()
                return Response(SongSerializer(song).data, status=status.HTTP_201_CREATED)
        return Response({'message': 'Bad Request: Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


class DeleteSongView(APIView):

    def get(self, request):
        return Response('Enter song to delete')

    serializer_class = SongIdSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if not serializer.is_valid():
            return Response({'message': "Bad Request: Invalid data"}, status=status.HTTP_400_BAD_REQUEST)

        id = serializer.data.get('id')

        queryset = Song.objects.filter(id=id)
        if queryset.exists():
            # Song exists - Delete
            song = queryset[0]
            song.delete()
            return Response({"message": "Song deleted successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({'message': "Bad Request: Song with id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)


class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        key = self.request.session.session_key

        code = request.GET.get(self.lookup_url_kwarg)
        code = code.upper()
        if code is not None:
            room_query = Room.objects.filter(code=code)
            if len(room_query) > 0:
                room = room_query[0]

                is_host = key == room.host
                if not is_host:
                    player_query = Player.objects.filter(session_key=key)

                    # player doesn't exist or is not part of this room. Return error.
                    if not player_query.exists():
                        return Response({'message': "Not Found: Player doesn't exist",
                                         "user_message": "Unauthorized: You have not joined a room yet"},
                                        status=status.HTTP_404_NOT_FOUND)
                    elif not player_query[0].room_code == code:
                        return Response({'message': "Unauthorized: Player is not part of specified room: " + code,
                                         "user_message": "Unauthorized: You have not joined this room"},
                                        status=status.HTTP_401_UNAUTHORIZED)

                data = RoomSerializer(room).data
                data['is_host'] = is_host
                data['players'] = get_players_in_room(code)
                return Response(data, status=status.HTTP_200_OK)
            return Response({'message': 'Room Not Found: Invalid Room Code: ' + code}, status=status.HTTP_404_NOT_FOUND)
        return Response({"message": "Bad Request: Room code parameter not present in request"}, status=status.HTTP_400_BAD_REQUEST)


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
            type = serializer.data.get('quiz_type')
            host = self.request.session.session_key

            queryset = Room.objects.filter(host=host)

            questions = functions.list_to_json(functions.generate_questions(type, Song.objects.all(), num_questions))

            if queryset.exists():
                # Room already exists - Update current room
                room = queryset[0]
                room.num_questions = num_questions
                room.quiz_type = type
                room.current_question = -1
                room.questions = questions
                room.player_can_join = True
                room.save(update_fields=['num_questions', 'player_can_join', 'quiz_type', 'current_question', 'questions'])
                self.request.session['room_code'] = room.code
                clear_players_in_room(room.code)
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                # No room wit this session ID - Create new room.
                room = Room(host=host, num_questions=num_questions, quiz_type=type, questions=questions, current_question=-1)
                room.save()
                self.request.session['room_code'] = room.code
                clear_players_in_room(room.code)
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        return Response({'message': 'Bad Request: Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


# Players can't join anymore. Takes room code
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
            room.block_answers = False
            room.save(update_fields=['player_can_join', 'current_question', 'questions', 'block_answers'])
            return JsonResponse({"questions": room.questions}, status=status.HTTP_200_OK, )
        else:
            Response({'message': "Bad Request: Room with specified code doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)


# Delete the room
class EndGame(APIView):

    serializer_class = RoomCodeSerializer

    def post(self, request, format=None):

        code = request.data.get('code')
        queryset = Room.objects.filter(code=code)
        if queryset.exists():
            # Room exists - Update current room
            room = queryset[0]
            room.delete()
            clear_players_in_room(code)
            return Response({"message": "Room deleted successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({'message': "Bad Request: Room with specified code doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)


# Client answers question, check if current question and check if answer is correct.
class AnswerQuestion(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get('code')
        answers = request.data.get('answers')
        index = request.data.get('index')

        queryset = Room.objects.filter(code=code)
        if queryset.exists():
            room = queryset[0]

            key = self.request.session.session_key
            player_query = Player.objects.filter(session_key=key)

            # player doesn't exist or is not part of this room. Return error.
            if not player_query.exists():
                return Response({'message': "Not Found: Player doesn't exist",
                                 "user_message": "Unauthorized: You have not joined a room yet"},
                                status=status.HTTP_404_NOT_FOUND)
            elif not player_query[0].room_code == code:
                return Response({'message': "Unauthorized: Player is not part of specified room: " + code,
                                 "user_message": "Unauthorized: You have not joined this room"},
                                status=status.HTTP_401_UNAUTHORIZED)
            player = player_query[0]

            questions_json = room.questions
            if questions_json == "":
                return Response({'message': "Bad Request: No Questions have been generated."},
                                status=status.HTTP_400_BAD_REQUEST)

            if room.block_answers:
                data = {
                    "status": -1,
                    "results": [],
                    "score": 0,
                }
                return JsonResponse(data, status=status.HTTP_200_OK)


            questions = functions.json_to_list(questions_json)

            if len(questions) < index:
                return Response({'message': "Bad Request: Invalid Question index!"},
                                status=status.HTTP_400_BAD_REQUEST)

            question = questions[index]
            score, results = functions.validate_answer(question, answers)
            data = {
                "status": 0,
                "results": results,
                "score": score
            }
            player.score += score
            player.save(update_fields=["score"])
            return JsonResponse(data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No room with specified code"}, status=status.HTTP_404_NOT_FOUND)


# Returns the current question and changes the current question to the next one.
# If there are no more questions -1 will be set to the current question and -1 will be returned.
class NextQuestion(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()


        code = request.data.get('code')
        queryset = Room.objects.filter(code=code)
        if queryset.exists():
            # Room exists - Update current room
            room = queryset[0]
            key = self.request.session.session_key
            is_host = key == room.host
            if not is_host:
                return Response({"message": "Only host may change question."}, status=status.HTTP_401_UNAUTHORIZED)

            if room.current_question == -1:
                return JsonResponse({"message": "No more questions", "question": -1}, status=status.HTTP_200_OK)

            questions_json = room.questions
            if questions_json == "":
                return Response({'message': "Bad Request: No Questions have been generated."},
                                status=status.HTTP_400_BAD_REQUEST)

            next_question = room.current_question + 1
            num_questions = room.num_questions
            if next_question >= num_questions:
                next_question = -1
            else:
                room.block_answers = False
            room.current_question = next_question

            room.save(update_fields=['current_question', 'block_answers'])

            questions = functions.json_to_list(questions_json)
            if len(questions) <= next_question or next_question == -1:
                return JsonResponse({"message": "No more questions", "question": -1}, status=status.HTTP_200_OK)

            question = questions[next_question]

            return JsonResponse({"question": question}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No room with specified code"}, status=status.HTTP_404_NOT_FOUND)


class QuestionRevealed(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get('code')
        queryset = Room.objects.filter(code=code)
        if queryset.exists():
            room = queryset[0]
            key = self.request.session.session_key
            is_host = key == room.host
            if not is_host:
                return Response({"message": "Only host may change question."}, status=status.HTTP_401_UNAUTHORIZED)

            room.block_answers = True
            room.save(update_fields=['block_answers'])
            return JsonResponse({"message": "further answers blocked"}, status=status.HTTP_200_OK)
        return Response({"message": "No room with specified code"}, status=status.HTTP_404_NOT_FOUND)


# Gets the current question in the quiz or the first question, if first == True
class GetQuestion(APIView):
    # Gets the next question and the next question's position
    # Takes the roomCode,
    # If there are no more questions, returns -1
    def get(self, request, format=None):

        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.GET.get('code')
        first = request.GET.get('first')
        room_query = Room.objects.filter(code=code)
        if room_query.exists():
            room = room_query[0]

            key = self.request.session.session_key
            is_host = key == room.host
            if not is_host:
                player_query = Player.objects.filter(session_key=key)

                # player doesn't exist or is not part of this room. Return error.
                if not player_query.exists():
                    return Response({'message': "Not Found: Player doesn't exist",
                                     "user_message": "Unauthorized: You have not joined a room yet"},
                                    status=status.HTTP_404_NOT_FOUND)
                elif not player_query[0].room_code == code:
                    return Response({'message': "Unauthorized: Player is not part of specified room: " + code,
                                     "user_message": "Unauthorized: You have not joined this room"},
                                    status=status.HTTP_401_UNAUTHORIZED)

            questions_json = room.questions
            questions = functions.json_to_list(questions_json)

            if len(questions) == 0:
                return Response({'message': "Server error: No Questions have been generated."},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            if first == "true":
                question = questions[0]
            elif room.current_question < len(questions) and room.current_question != -1:
                question = questions[room.current_question]
            else:
                # No more questions
                return JsonResponse({"question": -1}, status=status.HTTP_200_OK)

            return JsonResponse({"question": question}, status=status.HTTP_200_OK)
        else:
            return Response({'message': "Bad Request: Room with specified code doesn't exist"},
                            status=status.HTTP_400_BAD_REQUEST)


class GetScores(APIView):
    def get(self, request, format=None):
        code = request.GET.get('code')
        room_query = Room.objects.filter(code=code)
        if room_query.exists():
            room = room_query[0]

            player_query = list(Player.objects.filter(room_code=code))
            lst = []
            for i in range(0, len(player_query)):
                player = PlayerSerializer(player_query[i]).data
                lst.append({
                    "name": player["user_name"],
                    "score": player["score"]
                })

            return JsonResponse({"scores": lst}, status=status.HTTP_200_OK)
        else:
            return Response({'message': "Bad Request: Room with specified code doesn't exist"},
                            status=status.HTTP_400_BAD_REQUEST)


class JoinRoomView(APIView):

    serializer_class = CreatePlayerSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get('room_code').upper()
        user_name = request.data.get('user_name')

        if code is not None and user_name is not None and user_name != "":
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]
                if not room.player_can_join:
                    return Response({"message": "Room is closed."},
                                    status=status.HTTP_503_SERVICE_UNAVAILABLE)

                player_query = Player.objects.filter(room_code=code)
                player_name_query = player_query.filter(user_name=user_name)
                if player_name_query.exists():
                    return Response({"message": "Nickname already taken in this room"}, status=status.HTTP_409_CONFLICT)


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

                return Response({"message": "Room Joined.", "code": code, "user_name": user_name}, status=status.HTTP_200_OK)
            return Response({"message": "No Room with code " + code}, status=status.HTTP_404_NOT_FOUND)
        return Response({"message": "Bad request: Invalid Post data.", "code": code, "user_name": user_name},
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

        return Response({"message": "Success"}, status=status.HTTP_200_OK)


class PlayersInRoom(APIView):
    def get(self, request, format=None):
        code = request.query_params['room_code']
        if code is not None:
            lst = get_players_in_room(code)

            data = {"players": lst}
            return JsonResponse(data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Bad Request: no room_code provided"}, status=status.HTTP_400_BAD_REQUEST)


def get_players_in_room(code):
    queryset = list(Player.objects.filter(room_code=code))
    lst = []
    for i in range(0, len(queryset)):
        lst.append(PlayerInfoSerializer(queryset[i]).data)
    return lst


def clear_players_in_room(code):
    player_query = list(Player.objects.filter(room_code=code))
    for plyr in player_query:
        plyr.delete()