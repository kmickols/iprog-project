from django.db import models

class SpotifyToken(models.Model):
    user = models.CharField(max_length=300, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=300)
    access_token = models.CharField(max_length=300)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=300)