from django.contrib import admin
from django.urls import path, include

#media file configuration
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    #schools urls
    path('', include('apps.schools.urls')),
    
    #academics urls
    path('', include('apps.academics.urls')),

] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
