from django.db import models
from apps.schools.models import School

# Create your models here.

class AcademicSession(models.Model):
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name="academic_sessions")
    name = models.CharField(max_length=20)
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "academic_sessions"
        ordering = ["-start_date"]
        unique_together = ("school", "name")

    def __str__(self):
        return f"{self.school.name} - {self.name}"
    