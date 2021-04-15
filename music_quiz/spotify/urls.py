from django.urls import path
from .views import AuthUTL, spotify_callback, IsAuthenticated


urlpatterns = [
    path('get-auth-url', AuthUTL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view())
]