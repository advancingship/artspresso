from django.db import models
from django.utils import timezone

class NodeFrame(models.Model):
    name = models.CharField(max_length=72)
    content = models.TextField()
    creation_datetime = models.DateTimeField(auto_now_add=True)
    modification_datetime = models.DateTimeField(auto_now=True)
