import React, { useState } from 'react';
import { useSourceStore } from '../store/useSourceStore';

export default function SourceUploadModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('file');
  const [file, setFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  
  const { uploadSource, isLoading, error } = useSourceStore();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === 'file' && file) {
        const formData = new FormData();
        formData.append('type', 'file');
        formData.append('file', file);
        await uploadSource(formData);
      } else if (activeTab === 'youtube' && youtubeUrl) {
        await uploadSource({ type: 'youtube', url: youtubeUrl });
      }
      onClose();
    } catch (err) {
      console.error('Upload Error:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6">
        <h2 className="text-sm font-bold text-zinc-100 mb-4">Ingest Study Material</h2>
        
        {error && <div className="text-red-400 text-xs mb-3 font-mono">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-2 border-b border-zinc-800 pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('file')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${activeTab === 'file' ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-400'}`}
            >
              File (PDF)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('youtube')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${activeTab === 'youtube' ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-400'}`}
            >
              YouTube URL
            </button>
          </div>

          {activeTab === 'file' ? (
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20"
            />
          ) : (
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
            />
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-zinc-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition disabled:opacity-50"
            >
              {isLoading ? 'Processing Ingestion...' : 'Ingest Content'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}