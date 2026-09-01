import { create } from 'zustand';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const useSourceStore = create((set, get) => ({
  sources: [],
  activeSource: null,
  activeChunks: [],
  isLoading: false,
  error: null,

  // Select a document source to load into the active reader
  setActiveSource: (source) => {
    set({
      activeSource: source,
      activeChunks: source?.chunks || [],
    });
  },

  // Upload file, YouTube URL, or raw text to Django backend
  uploadSource: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      let response;

      // Handle FormData uploads (Files/PDFs) vs JSON payloads (YouTube/Text)
      if (payload instanceof FormData) {
        response = await fetch(`${API_BASE_URL}/sources/ingest/`, {
          method: 'POST',
          body: payload,
        });
      } else {
        response = await fetch(`${API_BASE_URL}/sources/ingest/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const contentType = response.headers.get('Content-Type');
      if(!response.ok) {
        if (contentType && contentType.includes('application/json')){
          const errorData = await response.json();
          throw new Error(errorData.error || 'Ingestion failed');
        } else {
          const rawText = await response.text();
          throw new Error('Server returned ${response.status} Check Djangon console logs.')
        }
      }

      /*if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ingestion failed');
      }*/

      const newSource = await response.json();

      // Update state: add to list and automatically select as active
      set((state) => ({
        sources: [newSource, ...state.sources],
        activeSource: newSource,
        activeChunks: newSource.chunks || [],
        isLoading: false,
      }));

      return newSource;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  // Update mastery status for spaced repetition active recall chunks
  updateChunkMastery: (chunkId, newMastery) => {
    set((state) => ({
      activeChunks: state.activeChunks.map((chunk) =>
        chunk.id === chunkId ? { ...chunk, mastery: newMastery } : chunk
      ),
    }));
  },
}));