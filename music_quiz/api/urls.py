from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, JoinRoomView, UserInRoom, LeaveRoom, PlayersView, PlayersInRoom, LaunchGame, AnswerQuestion, NextQuestion, GetQuestion, EndGame, QuestionRevealed, GetScores, SongsView, CreateSongView, DeleteSongView

urlpatterns = [
    path('rooms', RoomView.as_view()),
    path('players', PlayersView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('end-game', EndGame.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoomView.as_view()),
    path('user-in-room', UserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('players-in-room', PlayersInRoom.as_view()),
    path('launch-game', LaunchGame.as_view()),
    path('answer-question', AnswerQuestion.as_view()),
    path('next-question', NextQuestion.as_view()),
    path('get-question', GetQuestion.as_view()),
    path('reveal-question', QuestionRevealed.as_view()),
    path('get-score', GetScores.as_view()),
    path('songs', SongsView.as_view()),
    path('create-song', CreateSongView.as_view()),
    path('delete-song', DeleteSongView.as_view())
]