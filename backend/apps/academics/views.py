from django.shortcuts import render
from rest_framework import viewsets
from .models import AcademicSession
from .serializers import AcademicSessionSerializer

# Create your views here.

class AcademicSessionViewSet(viewsets.ModelViewSet):
    queryset = AcademicSession.objects.all()
    serializer_class = AcademicSessionSerializer

