from django.contrib.auth.models import User
from django.db import models


class Product(models.Model):
    image = models.ImageField()
    name = models.CharField(max_length=25)
    description = models.TextField()
    rating = models.FloatField()
    price = models.IntegerField()
    category = models.ForeignKey('apps.Category', models.CASCADE, related_name='products')

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name