import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, RefreshCw, ChevronRight, Bookmark, Sparkles } from 'lucide-react';

const mockChunks = [
  {
    id: 1,
    title: '1. Overlapping Subproblems & Optimal Substructure',
    summary: 'Dynamic Programming applies when a problem has optimal substructure and overlapping subproblems.',
    question: 'What is the primary difference between Divide & Conquer and Dynamic Programming?',
    answer: 'Divide & Conquer solves independent subproblems, whereas Dynamic Programming solves overlapping subproblems by caching and reusing previous results.',
    keyphrase: 'Overlapping Subproblems',
    mastery: 'Learning'
  },
  {
    id: 2,
    title: '2. Top-Down Memoization vs Bottom-Up Tabulation',
    summary: 'Memoization uses recursion + dictionary lookup, while Tabulation fills an iterative table.',
    question: 'Why does Bottom-Up Tabulation usually save call-stack memory over Memoization?',
    answer: 'Tabulation uses iterative loops which avoids the call-stack overhead and risk of stack overflow inherent to recursive calls.',
    keyphrase: 'Memoization vs Tabulation',
    mastery: 'Review'
  }
];

export default function AdaptiveReader() {
  const [activeChunkIndex, setActiveChunkIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentChunk = mockChunks[activeChunkIndex];

  const handleRating = (rating) => {
    setShowAnswer(false);
    if (activeChunkIndex < mockChunks.length - 1) {
      setActiveChunkIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setActiveChunkIndex(0);
    setShowAnswer(false);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-base font-bold text-zinc-100">Chunk Recall Session Complete</h2>
          <p className="text-xs text-zinc-400 mt-1">Retention scores calculated and logged to vector memory store.</p>
        </div>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Review Session Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      
      {/* Chunk Metadata Bar */}
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span className="font-mono text-[11px] text-emerald-400">
          Chunk {activeChunkIndex + 1} of {mockChunks.length}
        </span>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] font-mono">
            {currentChunk.mastery}
          </span>
          <button className="hover:text-zinc-200 transition">
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Structured Core Note Chunk */}
      <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col gap-3">
        <h3 className="text-sm font-bold text-zinc-100">{currentChunk.title}</h3>
        <p className="text-xs text-zinc-300 leading-relaxed">{currentChunk.summary}</p>
      </div>

      {/* Active Recall Prompt Box */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-emerald-500/20 shadow-lg flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Active Recall Probe
        </div>
        
        <p className="text-sm font-semibold text-zinc-100">{currentChunk.question}</p>

        {showAnswer && (
          <div className="pt-4 border-t border-zinc-800 text-xs text-zinc-300 bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50 leading-relaxed">
            <span className="font-bold text-emerald-400 block mb-1">Answer Key:</span>
            {currentChunk.answer}
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-2 flex flex-col gap-3">
          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="w-full py-2.5 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Reveal Active Recall Answer
            </button>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleRating('hard')}
                className="py-2 text-xs font-medium rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition"
              >
                Hard (1d)
              </button>
              <button
                onClick={() => handleRating('good')}
                className="py-2 text-xs font-medium rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 transition"
              >
                Good (3d)
              </button>
              <button
                onClick={() => handleRating('easy')}
                className="py-2 text-xs font-medium rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition"
              >
                Easy (7d)
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}