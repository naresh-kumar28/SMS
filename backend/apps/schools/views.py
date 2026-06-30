from django.shortcuts import render
from .models import School
from .serializers import SchoolSerializer
from rest_framework import viewsets

# Create your views here.

class schoolView(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer