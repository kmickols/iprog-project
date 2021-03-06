from django.urls import path
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('join', index, name='join'),
    path('create', index, name='create'),
    path('login', index, name='login'),
    path('tutorial', index, name='tutorial'),
    path('error', index, name='error'),
    path('room/<str:roomCode>', index, name='room'),
    path('room/<str:roomCode>/quiz', index, name='room/quiz'),
    path('room/<str:roomCode>/result', index, name="room/result"),
    ]
