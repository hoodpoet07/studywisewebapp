import React, { useState } from 'react';
import AdaptiveReader from '../components/AdaptiveReader';
import SourceUploadModal from '../components/SourceUploadModal';
import { useSourceStore } from '../store/useSourceStore';
import { 
  BookOpen, PlayCircle, Headphones, Sparkles, FileText, 
  Plus, CheckCircle2, GitFork, ArrowUpRight, Volume2, Search, Video, HardDrive, Layers
} from 'lucide-react';

export default function CommandCenter() {
  const [activeTab, setActiveTab] = useState('reader');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Zustand Store binding
  const { sources, activeSource, setActiveSource } = useSourceStore();

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      
      {/* 1. LEFT SIDEBAR: Source Tree & Modules */}
      <aside className="w-80 border-r border-zinc-800/80 bg-zinc-950/50 flex flex-col justify-between p-4 hidden md:flex">
        <div className="flex flex-col gap-4 overflow-y-auto">
          
          {/* Add Source CTA */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center justify-center gap-2 transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Syllabus / PDF / YouTube
          </button>

          {/* Active Course Sources Tree */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase">
                Ingested Sources
              </span>
              <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">
                {sources.length}
              </span>
            </div>

            <div className="flex flex-col gap-1 text-xs">
              {sources.length === 0 ? (
                <div className="p-3 text-center border border-dashed border-zinc-800 rounded-xl text-zinc-500 text-[11px]">
                  No sources added yet. Click above to ingest a PDF or YouTube video.
                </div>
              ) : (
                sources.map((src) => {
                  const isSelected = activeSource?.id === src.id;
                  return (
                    <div
                      key={src.id}
                      onClick={() => setActiveSource(src)}
                      className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition ${
                        isSelected
                          ? 'bg-zinc-900 border-emerald-500/50 text-emerald-400 font-medium'
                          : 'hover:bg-zinc-900/50 text-zinc-400 border-transparent hover:text-zinc-200'
                      }`}
                    >
                      {src.source_type === 'youtube' ? (
                        <Video className="w-4 h-4 text-red-400 shrink-0" />
                      ) : src.source_type === 'file' ? (
                        <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <HardDrive className="w-4 h-4 text-blue-400 shrink-0" />
                      )}
                      <span className="truncate">{src.title}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Peer Clones / Social Section */}
          <div className="flex flex-col gap-2 pt-3 border-t border-zinc-900">
            <span className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase px-1 flex items-center justify-between">
              <span>Peer Clones</span>
              <span className="text-emerald-400 font-mono">14 Forks</span>
            </span>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-zinc-300">@Sarah_M's Prep</span>
                <span className="text-emerald-400 font-mono">98% Match</span>
              </div>
              <p className="text-xs text-zinc-400 line-clamp-2">
                Includes 15 active recall cards and NLP keyphrase definitions.
              </p>
              <button className="w-full py-1.5 text-xs font-medium rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition flex items-center justify-center gap-1.5">
                <GitFork className="w-3.5 h-3.5" />
                Fork to Workspace
              </button>
            </div>
          </div>
        </div>

        {/* Diagnostic Telemetry Heartbeat Widget */}
        <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-300 font-medium">Retention Decay</span>
          </div>
          <span className="font-mono text-emerald-400 font-bold">88% Optimal</span>
        </div>
      </aside>

      {/* 2. CENTER WORKSPACE: Interactive Content & AI Reader */}
      <main className="flex-1 flex flex-col border-r border-zinc-800/80 bg-zinc-950 overflow-y-auto">
        
        {/* Navigation Tabs */}
        <div className="h-12 border-b border-zinc-800/80 px-6 flex items-center gap-6 text-xs font-medium text-zinc-400 bg-zinc-950/80 backdrop-blur sticky top-0 z-10">
          <button 
            onClick={() => setActiveTab('reader')}
            className={`h-full flex items-center gap-2 border-b-2 transition ${
              activeTab === 'reader' ? 'border-emerald-500 text-emerald-400 font-semibold' : 'border-transparent hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Adaptive AI Chunk Canvas
          </button>
          
          <button 
            onClick={() => setActiveTab('youtube')}
            className={`h-full flex items-center gap-2 border-b-2 transition ${
              activeTab === 'youtube' ? 'border-emerald-500 text-emerald-400 font-semibold' : 'border-transparent hover:text-zinc-200'
            }`}
          >
            <Video className="w-4 h-4" />
            YouTube Transcript Sync
          </button>
        </div>

        {/* Tab 1: AI Adaptive Reader Canvas */}
        {activeTab === 'reader' && (
          <div className="p-6 max-w-3xl w-full mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-zinc-100">
                  {activeSource ? activeSource.title : 'CS101: Dynamic Programming'}
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  {activeSource ? `Type: ${activeSource.source_type}` : 'Ingested via Course_Syllabus_2026.pdf'}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                NLP Indexed
              </span>
            </div>

            {/* Micro-Bit Active Recall Component */}
            <AdaptiveReader />
          </div>
        )}

        {/* Tab 2: Embedded YouTube Timestamp Sync */}
        {activeTab === 'youtube' && (
          <div className="p-6 max-w-4xl w-full mx-auto flex flex-col gap-4">
            <div className="aspect-video w-full rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden group">
              <PlayCircle className="w-16 h-16 text-emerald-500 group-hover:scale-110 transition cursor-pointer" />
              <span className="absolute bottom-4 left-4 text-xs font-mono bg-black/80 px-2.5 py-1 rounded text-zinc-300">
                Timestamp: 04:15 - DP Memoization Overview
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs flex flex-col gap-1 cursor-pointer hover:border-emerald-500/50 transition">
                <span className="font-mono text-emerald-400 text-[10px]">@ 02:10</span>
                <span className="font-bold text-zinc-200">Overlapping Subproblems</span>
                <p className="text-zinc-400 text-[11px]">Why recursive Fibonacci re-computes sub-trees without caching.</p>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs flex flex-col gap-1 cursor-pointer hover:border-emerald-500/50 transition">
                <span className="font-mono text-emerald-400 text-[10px]">@ 08:45</span>
                <span className="font-bold text-zinc-200">Call-Stack Recursion Limits</span>
                <p className="text-zinc-400 text-[11px]">Top-Down memory overhead compared to Bottom-Up Tabulation.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. RIGHT SIDEBAR: Studio Tools & Audio Briefings */}
      <aside className="w-80 border-l border-zinc-800/80 bg-zinc-950/50 p-4 hidden lg:flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Studio Generator</h2>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>

          {/* Quick AI Action Cards */}
          <div className="grid grid-cols-2 gap-2">
            <button className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 text-left transition flex flex-col gap-2 group">
              <Headphones className="w-4 h-4 text-purple-400 group-hover:scale-110 transition" />
              <div>
                <div className="text-xs font-bold text-zinc-200">Audio Overview</div>
                <div className="text-[10px] text-zinc-500">Dual-speaker podcast</div>
              </div>
            </button>

            <button className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 text-left transition flex flex-col gap-2 group">
              <FileText className="w-4 h-4 text-blue-400 group-hover:scale-110 transition" />
              <div>
                <div className="text-xs font-bold text-zinc-200">Mock Exam</div>
                <div className="text-[10px] text-zinc-500">10 AI Exam Questions</div>
              </div>
            </button>
          </div>

          {/* Embedded Audio Briefing Player */}
          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col gap-3 shadow-lg mt-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-purple-400 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5" />
                Audio Summary
              </span>
              <span className="text-[10px] font-mono text-zinc-500">03:42</span>
            </div>
            
            <p className="text-xs text-zinc-300 font-medium leading-snug">
              "In this briefing, we break down why Memoization avoids redundant tree processing..."
            </p>

            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full w-1/3" />
            </div>
          </div>
        </div>

        {/* Vector Store Query Input */}
        <div className="relative">
          <input 
            type="text"
            placeholder="Ask module vector store..."
            className="w-full pl-3 pr-8 py-2.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition"
          />
          <ArrowUpRight className="w-4 h-4 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer hover:text-emerald-400 transition" />
        </div>
      </aside>

      {/* Ingestion Upload Modal */}
      <SourceUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}