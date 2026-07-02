from rest_framework.permissions import BasePermission


class IsSuperAdmin(BasePermission):
    pass


class IsSchoolAdmin(BasePermission):
    pass


class IsTeacher(BasePermission):
    pass


class IsStudent(BasePermission):
    pass


class IsAccountant(BasePermission):
    pass


class IsHOD(BasePermission):
    pass


class IsReceptionist(BasePermission):
    pass