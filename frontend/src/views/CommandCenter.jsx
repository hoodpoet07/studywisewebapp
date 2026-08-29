import React from 'react';
import Navbar from './components/Navbar';
import AdaptiveReader from '../components/AdaptiveReader';
import { Users, GitFork, Sparkles, BookOpen, Send, CheckCircle2 } from 'lucide-react';

export default function CommandCenter() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 transition-colors">
      <Navbar />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-7xl w-full mx-auto">
        
        {/* Left Column: Social Feed */}
        <section className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Community Workings
            </h2>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
              High-yield study modules published by top students.
            </p>
          </div>

          {/* Social Module Card */}
          <div className="p-5 rounded-xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Bio 201 - Cell Respiration
              </span>
              <span className="text-xs text-gray-400">@Sarah_M</span>
            </div>
            
            <h3 className="font-bold text-md">Krebs Cycle Master Cheat Sheet & Recall Quizzes</h3>
            <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
              Complete breakdown of ATP Synthase with 15 verified flashcards and YouTube timestamp notes.
            </p>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-zinc-900">
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Verified Content
              </div>
              <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition flex items-center gap-1.5 shadow-sm">
                <GitFork className="w-3.5 h-3.5" />
                Clone Module
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Active Module Workspace */}
        <section className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">CS101 Algorithms</h1>
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  Dynamic Programming
                </span>
              </div>

              {/* Adaptive Reader Micro-Bit */}
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Adaptive AI Chunk #3
                </div>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-zinc-300">
                  Memoization stores the results of expensive function calls and returns the cached result when the same inputs occur again, avoiding redundant subproblems.
                </p>
              </div>
            </div>

            {/* AI Vector Prompt Bar */}
            <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 relative">
              <input
                type="text"
                placeholder="Ask your module vector store a question..."
                className="w-full pl-4 pr-12 py-3 text-sm rounded-lg bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 border border-transparent focus:border-emerald-500 focus:outline-none transition"
              />
              <button 
                aria-label="Send Query"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}