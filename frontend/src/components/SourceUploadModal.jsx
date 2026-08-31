import React, { useState } from 'react';
import { Upload, Video, FileText, X, Sparkles, Link } from 'lucide-react';

export default function SourceUploadModal({ isOpen, onClose, onUploadSuccess }) {
  const [activeTab, setActiveTab] = useState('file'); // 'file' | 'youtube' | 'text'
  const [file, setFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('type', activeTab);
    
    if (activeTab === 'file' && file) formData.append('file', file);
    if (activeTab === 'youtube') formData.append('url', youtubeUrl);
    if (activeTab === 'text') formData.append('content', rawText);

    try {
      // Connects to Django backend API
      const res = await fetch('http://localhost:8000/api/sources/ingest/', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onUploadSuccess(data);
        onClose();
      }
    } catch (err) {
      console.error('Failed to ingest source:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-100 font-semibold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Add Source to StudyWise Engine
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-200 transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-zinc-800 bg-zinc-950/50 text-xs text-zinc-400 font-medium">
          <button
            onClick={() => setActiveTab('file')}
            className={`flex-1 py-3 flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === 'file' ? 'border-emerald-500 text-emerald-400 font-semibold' : 'border-transparent hover:text-zinc-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            PDF / Doc
          </button>
          <button
            onClick={() => setActiveTab('youtube')}
            className={`flex-1 py-3 flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === 'youtube' ? 'border-emerald-500 text-emerald-400 font-semibold' : 'border-transparent hover:text-zinc-200'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            YouTube Link
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-3 flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === 'text' ? 'border-emerald-500 text-emerald-400 font-semibold' : 'border-transparent hover:text-zinc-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Raw Text
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 text-xs">
          {activeTab === 'file' && (
            <div className="border-2 border-dashed border-zinc-700 hover:border-emerald-500/50 bg-zinc-950/50 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition">
              <Upload className="w-8 h-8 text-zinc-500" />
              <span className="text-zinc-300 font-medium">
                {file ? file.name : 'Click or drop PDF textbook/notes here'}
              </span>
              <input
                type="file"
                accept=".pdf,.txt,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="text-[11px] text-emerald-400 cursor-pointer hover:underline">
                Browse Files
              </label>
            </div>
          )}

          {activeTab === 'youtube' && (
            <div className="flex flex-col gap-2">
              <label className="text-zinc-400 font-medium">YouTube Lecture URL</label>
              <div className="relative">
                <Link className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'text' && (
            <div className="flex flex-col gap-2">
              <label className="text-zinc-400 font-medium">Paste Lecture Notes or Syllabus</label>
              <textarea
                rows={5}
                placeholder="Paste content here for NLP active recall extraction..."
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t border-zinc-800/80">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition disabled:opacity-50 flex items-center gap-1.5"
            >
              {loading ? 'Processing NLP...' : 'Extract & Index Source'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}