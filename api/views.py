from django.shortcuts import render
import re
from pypdf import PdfReader
from youtube_transcript_api import YouTubeTranscriptApi
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SourceDocument, DocumentChunk

class IngestSourceView(APIView):
    def post(self, request):
        source_type = request.data.get('type')
        extracted_text = ""
        title = "Untitled Source"

        try:
            # 1. Process PDF Uploads
            if source_type == 'file' and 'file' in request.FILES:
                uploaded_file = request.FILES['file']
                title = uploaded_file.name
                reader = PdfReader(uploaded_file)
                for page in reader.pages:
                    text = page.extract_text()
                    if text:
                        extracted_text += text + "\n"

                source_doc = SourceDocument.objects.create(
                    title=title,
                    source_type='file',
                    file=uploaded_file
                )

            # 2. Process YouTube Transcripts
            elif source_type == 'youtube':
                url = request.data.get('url', '')
                video_id_match = re.search(r'(?:v=|\/)([0-9A-Za-z_-]{11})', url)
                if not video_id_match:
                    return Response({'error': 'Invalid YouTube URL'}, status=status.HTTP_400_BAD_REQUEST)
                
                video_id = video_id_match.group(1)
                title = f"YouTube Video ({video_id})"
                
                transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
                extracted_text = " ".join([item['text'] for item in transcript_list])

                source_doc = SourceDocument.objects.create(
                    title=title,
                    source_type='youtube',
                    url=url
                )

            # 3. Process Raw Text
            elif source_type == 'text':
                extracted_text = request.data.get('content', '')
                title = f"Note Entry ({extracted_text[:20]}...)"
                source_doc = SourceDocument.objects.create(
                    title=title,
                    source_type='text'
                )
            else:
                return Response({'error': 'Unsupported ingestion payload'}, status=status.HTTP_400_BAD_REQUEST)

            # 4. Text Chunking & Active Recall Probe Extraction
            chunks = self._chunk_text(extracted_text, chunk_size=400)
            created_chunks = []

            for idx, chunk_str in enumerate(chunks):
                # Placeholder for fine-tuned NLP / LLM extraction model call
                question, answer = self._generate_active_recall_pair(chunk_str)

                doc_chunk = DocumentChunk.objects.create(
                    source=source_doc,
                    chunk_index=idx,
                    content=chunk_str,
                    question=question,
                    answer=answer
                )
                created_chunks.append({
                    'id': doc_chunk.id,
                    'chunk_index': idx,
                    'content': doc_chunk.content,
                    'question': doc_chunk.question,
                    'answer': doc_chunk.answer
                })

            return Response({
                'id': source_doc.id,
                'title': source_doc.title,
                'source_type': source_doc.source_type,
                'total_chunks': len(created_chunks),
                'chunks': created_chunks
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def _chunk_text(self, text, chunk_size=400):
        words = text.split()
        chunks = []
        current_chunk = []
        current_length = 0

        for word in words:
            current_chunk.append(word)
            current_length += len(word) + 1
            if current_length >= chunk_size:
                chunks.append(" ".join(current_chunk))
                current_chunk = []
                current_length = 0

        if current_chunk:
            chunks.append(" ".join(current_chunk))
        return chunks if chunks else [text]

    def _generate_active_recall_pair(self, text_chunk):
        # Generates basic structural active recall probes prior to LLM model hookup
        first_sentence = text_chunk.split('.')[0] if '.' in text_chunk else text_chunk
        question = f"What is the key insight regarding: '{first_sentence[:50]}...'?"
        answer = text_chunk
        return question, answer