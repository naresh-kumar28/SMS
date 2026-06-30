from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class School(models.Model):
    name = models.CharField(max_length=300)
    slug = models.SlugField(max_length=400, unique=True)
    email = models.EmailField(unique=True)
    phone = PhoneNumberField(unique=True)
    address = models.CharField(max_length=500)
    logo = models.ImageField(upload_to='logo/%Y-%m-%d', blank=True, null=True)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name