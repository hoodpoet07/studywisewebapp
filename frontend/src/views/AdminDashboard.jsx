import React from 'react';
import { Users, DollarSign, Activity, ShieldAlert, Cpu } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin System Control</h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Monitor real-time user activity, financial transactions, and AI compute metrics.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          System Operational
        </span>
      </div>

      {/* High-Level Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 dark:text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase">Active Students</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold">1,420</div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400">+12% this week</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 dark:text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase">Monthly Revenue</span>
            <DollarSign className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">$4,890</div>
          <span className="text-xs text-blue-600 dark:text-blue-400">Pro & Tokens</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 dark:text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase">AI Token Spend</span>
            <Cpu className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold">$312.40</div>
          <span className="text-xs text-gray-400">OpenAI & Whisper</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 dark:text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase">Flagged Content</span>
            <ShieldAlert className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold">3</div>
          <span className="text-xs text-amber-600 dark:text-amber-400">Requires Review</span>
        </div>
      </div>

      {/* User Actions & Financial Stream Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Activity Audit Log */}
        <div className="p-5 rounded-xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
          <h2 className="font-bold text-md mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            Live User Action Audit
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-zinc-900">
              <div>
                <p className="font-medium">@Sarah_M created module</p>
                <p className="text-xs text-gray-500">Bio 201 - Cell Respiration</p>
              </div>
              <span className="text-xs text-gray-400">2 mins ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-zinc-900">
              <div>
                <p className="font-medium">@Alex_K reached 40-Day Streak</p>
                <p className="text-xs text-gray-500">Earned Streak Shield</p>
              </div>
              <span className="text-xs text-gray-400">14 mins ago</span>
            </div>
          </div>
        </div>

        {/* Financial Transactions Log */}
        <div className="p-5 rounded-xl bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
          <h2 className="font-bold text-md mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-blue-500" />
            Recent Financial Transactions
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-zinc-900">
              <div>
                <p className="font-medium">StudyWise Pro Annual ($79.00)</p>
                <p className="text-xs text-gray-500">User ID: #usr_8921</p>
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Completed</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-zinc-900">
              <div>
                <p className="font-medium">Creator Payout ($24.50)</p>
                <p className="text-xs text-gray-500">Paid to @Sarah_M for cloned module</p>
              </div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Processed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}