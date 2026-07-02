class Roles:
    SUPER_ADMIN = "SUPER_ADMIN"
    SCHOOL_ADMIN = "SCHOOL_ADMIN"
    TEACHER = "TEACHER"
    STUDENT = "STUDENT"
    ACCOUNTANT = "ACCOUNTANT"
    HOD = "HOD"
    RECEPTIONIST = "RECEPTIONIST"


ROLE_CHOICES = [
    (Roles.SUPER_ADMIN, "Super Admin"),
    (Roles.SCHOOL_ADMIN, "School Admin"),
    (Roles.TEACHER, "Teacher"),
    (Roles.STUDENT, "Student"),
    (Roles.ACCOUNTANT, "Accountant"),
    (Roles.HOD, "Head Of Department"),
    (Roles.RECEPTIONIST, "Receptionist"),
]