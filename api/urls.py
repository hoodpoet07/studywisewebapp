from django.urls import path
from .views import IngestSourceView

urlpatterns = [
    path('sources/ingest/', IngestSourceView.as_view(), name='ingest-source'),
]