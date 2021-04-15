from django.urls import path
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index),
    path('join', index),
    path('create', index),
    path('login', index),
    path('tutorial', index),
    path('room/<str:roomCode>', index),
    path('room/<str:roomCode>/quiz', index),
]