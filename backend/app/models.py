from django.db import models

# Create your models here.
class Permissions(models.Model):
    name = models.CharField(max_length=50)

class Roles(models.Model):
    name = models.CharField(max_length=50)
    permissions = models.ManyToManyField(Permissions)
