from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.accounts.models import User
from apps.accounts.serializers import UserSerializer, UserUpdateSerializer


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):

        if self.action in ["update", "partial_update"]:
            return UserUpdateSerializer

        return UserSerializer