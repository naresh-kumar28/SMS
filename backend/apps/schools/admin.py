from django.contrib import admin
from .models import School

# Register your models here.

@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'phone', 'email', 'is_active')
    search_fields = ('name', 'address', 'phone', 'email')
    list_editable = ('is_active',)
    prepopulated_fields = {'slug': ('name',)}
