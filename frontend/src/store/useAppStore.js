import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  // Theme State
  theme: localStorage.getItem('theme_preference') || 'system',
  setTheme: (newTheme) => {
    localStorage.setItem('theme_preference', newTheme);
    set({ theme: newTheme });
    get().applyTheme(newTheme);
  },
  applyTheme: (mode) => {
    const root = document.documentElement;
    const isDark =
      mode === 'dark' ||
      (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    root.classList.toggle('dark', isDark);
  },

  // User & Auth State
  user: {
    name: 'Hamamunashe',
    handle: '@hamamunashetire',
    role: 'admin', // Change to 'student' to test regular views
    streak: 12,
  },
  setUser: (user) => set({ user }),

  // Current Active View ('command-center' | 'admin' | 'settings')
  activeView: 'command-center',
  setActiveView: (view) => set({ activeView: view }),
}));