from rest_framework import serializers

from apps.accounts.models import User


class UserUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("phone", "school", "role")