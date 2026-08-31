import React, { useEffect } from 'react';
import CommandCenter from './views/CommandCenter';
import AdminDashboard from './views/AdminDashboard';
import SettingsView from './views/SettingsView';
import Navbar from './components/Navbar';
import { useAppStore } from './store/useAppStore';

export default function App() {
  const { activeView, theme, applyTheme } = useAppStore();

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 transition-colors">
      <Navbar />
      {activeView === 'command-center' && <CommandCenter />}
      {activeView === 'admin' && <AdminDashboard />}
      {activeView === 'settings' && <SettingsView />}
    </div>
  );
}