import React from 'react';
import { Search, Flame, Settings, Shield, LayoutDashboard } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function Navbar() {
  const { user, activeView, setActiveView } = useAppStore();

  return (
    <header className="h-16 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 flex items-center justify-between transition-colors sticky top-0 z-50">
      {/* Left: Brand Logo (Navigates Home) */}
      <button 
        onClick={() => setActiveView('command-center')}
        className="flex items-center gap-3 focus:outline-none"
      >
        <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-lg shadow-sm">
          S
        </div>
        <span className="font-bold text-xl text-gray-900 dark:text-zinc-100 tracking-tight">
          StudyWise
        </span>
      </button>

      {/* Middle: Global Search Bar */}
      <div className="w-1/3 max-w-md relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />
        <input
          type="text"
          placeholder="Search modules, topics, or public workings..."
          className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 border border-transparent focus:border-emerald-500 focus:outline-none transition"
        />
      </div>

      {/* Right: Controls & Dynamic Admin Badge */}
      <div className="flex items-center gap-3">
        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold text-sm">
          <Flame className="w-4 h-4 stroke-orange-500 fill-orange-500/20" />
          <span>{user.streak} Days</span>
        </div>

        {/* View Switcher: Command Center vs Admin */}
        <button
          onClick={() => setActiveView('command-center')}
          className={`p-2 rounded-lg transition ${
            activeView === 'command-center'
              ? 'bg-gray-100 dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400'
              : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-900'
          }`}
          title="Command Center"
        >
          <LayoutDashboard className="w-5 h-5" />
        </button>

        {/* Admin Navigation Button (Visible only to Admin Role) */}
        {user.role === 'admin' && (
          <button
            onClick={() => setActiveView('admin')}
            className={`p-2 rounded-lg transition ${
              activeView === 'admin'
                ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-900'
            }`}
            title="Admin Dashboard"
          >
            <Shield className="w-5 h-5" />
          </button>
        )}

        {/* Settings Button */}
        <button
          onClick={() => setActiveView('settings')}
          className={`p-2 rounded-lg transition ${
            activeView === 'settings'
              ? 'bg-gray-100 dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400'
              : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-900'
          }`}
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}