import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Sun, Moon, Laptop, Shield, User } from 'lucide-react';

export default function SettingsView() {
  const { theme, setTheme, user, setUser } = useAppStore();

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          Manage your account preferences, system appearance, and access roles.
        </p>
      </div>

      {/* Theme Settings Section */}
      <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col gap-4">
        <div>
          <h2 className="font-bold text-lg">Appearance & Theme</h2>
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            System theme follows your OS setting automatically unless overridden here.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setTheme('system')}
            className={`p-4 rounded-lg border flex flex-col items-center gap-2 transition ${
              theme === 'system'
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                : 'border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-900'
            }`}
          >
            <Laptop className="w-5 h-5" />
            <span className="text-xs">System Default</span>
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-lg border flex flex-col items-center gap-2 transition ${
              theme === 'dark'
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                : 'border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-900'
            }`}
          >
            <Moon className="w-5 h-5" />
            <span className="text-xs">Pure Black (Dark)</span>
          </button>

          <button
            onClick={() => setTheme('light')}
            className={`p-4 rounded-lg border flex flex-col items-center gap-2 transition ${
              theme === 'light'
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                : 'border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-900'
            }`}
          >
            <Sun className="w-5 h-5" />
            <span className="text-xs">Clean White (Light)</span>
          </button>
        </div>
      </div>

      {/* Role Management (Dev Toggle for Admin Mode) */}
      <div className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col gap-4">
        <div>
          <h2 className="font-bold text-lg">Account Access Role</h2>
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            Switch your role to test how the UI adapts between standard Student features and Admin Portal telemetry.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setUser({ ...user, role: 'student' })}
            className={`flex-1 p-4 rounded-lg border flex items-center justify-center gap-2 text-sm font-medium transition ${
              user.role === 'student'
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-900'
            }`}
          >
            <User className="w-4 h-4" />
            Student View
          </button>

          <button
            onClick={() => setUser({ ...user, role: 'admin' })}
            className={`flex-1 p-4 rounded-lg border flex items-center justify-center gap-2 text-sm font-medium transition ${
              user.role === 'admin'
                ? 'border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400'
                : 'border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            Admin Mode
          </button>
        </div>
      </div>
    </div>
  );
}