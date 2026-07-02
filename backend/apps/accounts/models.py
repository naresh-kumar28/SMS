from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

from phonenumber_field.modelfields import PhoneNumberField

from apps.schools.models import School
from apps.accounts.constants import ROLE_CHOICES, Roles


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):

        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):

        extra_fields.setdefault("role", Roles.SUPER_ADMIN)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True")

        return self.create_user(
            email=email,
            password=password,
            **extra_fields
        )


class User(AbstractBaseUser, PermissionsMixin):

    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name="users", null=True, blank=True)
    email = models.EmailField(unique=True)
    phone = PhoneNumberField(unique=True)
    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default=Roles.STUDENT)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    class Meta:
        db_table = "users"
        ordering = ["-date_joined"]