from django.urls import path
from .views import *

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('get-user-token', GetUserToken.as_view()),
    path('set-device', SetDevice.as_view()),
    path('play-song', PlaySong.as_view()),
    path('stop-playing', StopPlaying.as_view())
]
