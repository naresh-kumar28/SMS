from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from apps.accounts.models import User
from apps.accounts.constants import Roles


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={"input_type": "password"})
    password2 = serializers.CharField(write_only=True, style={"input_type": "password"})

    class Meta:
        model = User
        fields = ("id", "email", "phone", "password", "password2", "role", "school")

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")
        role = attrs.get("role")
        school = attrs.get("school")

        if password != password2:
            raise serializers.ValidationError(
                {"password": "Password and Confirm Password do not match."}
            )

        validate_password(password)

        # Public API se SUPER_ADMIN create nahi hoga
        if role == Roles.SUPER_ADMIN:
            raise serializers.ValidationError(
                {"role": "You cannot create a Super Admin."}
            )

        # Super Admin ke alawa school required
        if role != Roles.SUPER_ADMIN and school is None:
            raise serializers.ValidationError(
                {"school": "School is required."}
            )

        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")

        return User.objects.create_user(**validated_data)