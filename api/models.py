from django.db import models

class SourceDocument(models.Model):
    SOURCE_TYPES = (
        ('file', 'PDF/Document'),
        ('youtube', 'YouTube Video'),
        ('text', 'Raw Text'),
    )

    title = models.CharField(max_length=255)
    source_type = models.CharField(max_length=20, choices=SOURCE_TYPES)
    file = models.FileField(upload_to='sources/', null=True, blank=True)
    url = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class DocumentChunk(models.Model):
    source = models.ForeignKey(SourceDocument, on_delete=models.CASCADE, related_name='chunks')
    chunk_index = models.IntegerField()
    content = models.TextField()
    question = models.TextField(blank=True, null=True)
    answer = models.TextField(blank=True, null=True)
    mastery = models.CharField(max_length=20, default='Learning')

    class Meta:
        ordering = ['chunk_index']