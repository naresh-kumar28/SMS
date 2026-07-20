from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.accounts.views.auth import RegisterView, ChangePasswordView
from apps.accounts.views.profile import ProfileView
from apps.accounts.views.user import UserViewSet

router = DefaultRouter()

router.register("users", UserViewSet, basename="users")

urlpatterns = [

    path("register/",RegisterView.as_view(),name="register"),
    path("change-password/",ChangePasswordView.as_view(),name="change-password"),
    path("profile/",ProfileView.as_view(),name="profile"),
    path("",include(router.urls)),

]