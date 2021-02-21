from django.db import models
from django.utils import timezone
from django.urls import reverse

class NodeFrame(models.Model):
    name = models.CharField(max_length=72)
    content = models.TextField()
    creation_datetime = models.DateTimeField(auto_now_add=True, editable=False)
    modification_datetime = models.DateTimeField(auto_now=True)

    def get_absolute_url(self):
        return reverse("detail", kwargs={"pk", self.pk})

    def __str__(self):
        return self.name
    
    
