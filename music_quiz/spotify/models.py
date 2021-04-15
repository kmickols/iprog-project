from django.db import models

class SpotifyToken(models.Model):
    user = models.CharField(max_length=60, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=167)
    access_token = models.CharField(max_length=167)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)