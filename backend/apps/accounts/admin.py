from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    list_display = ("email", "phone", "role", "school", "is_staff", "is_active")
    list_display_links = ( "email","phone","role",)
    ordering = ("id",)
    search_fields = ("email","phone",)

    fieldsets = (("Login Credentials", {"fields": ("email", "password")}), 
                 ("Personal Info", {"fields": ("school", "phone", "role")}), 
                 ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")})
                )

    add_fieldsets = (
        (
            "Add User",
            {
                "classes": ("wide",),
                "fields": (
                    "email","school","phone","role","password1","password2","is_staff","is_active",
                ),
            },
        ),
    )

    filter_horizontal = ("groups", "user_permissions",)