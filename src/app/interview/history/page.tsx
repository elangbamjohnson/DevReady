// File: src/app/interview/history/page.tsx
// Method: export default function InterviewHistoryPage()

'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  History,
  ArrowLeft,
  ArrowRight,
  Trash2,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import {
  interviewStore,
  subscribeToInterviewStore,
  getServerEmptySessions,
} from '@/lib/interview/interviewStore';
import { cn } from '@/lib/utils';

export default function InterviewHistoryPage() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'abandoned'>('all');

  const sessions = useSyncExternalStore(
    subscribeToInterviewStore,
    () => interviewStore.getHistory(),
    getServerEmptySessions
  );

  const handleDelete = (id: string) => {
    interviewStore.deleteSession(id);
  };

  const filteredSessions = sessions.filter((s) => {
    if (filter === 'completed') return s.status === 'completed';
    if (filter === 'abandoned') return s.status === 'abandoned';
    return true;
  });

  return (
    <AppShell>
      <div className="flex-1 w-full">
        <div className="px-6 py-8 lg:px-8 max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/interview"
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Interview History</h1>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Review your past practice sessions, evaluations, and score trends.
                </p>
              </div>
            </div>

            <Link
              href="/interview/configure"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors"
            >
              New Interview
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
            {(['all', 'completed', 'abandoned'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer',
                  filter === tab
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200'
                )}
              >
                {tab} ({sessions.filter((s) => (tab === 'all' ? true : s.status === tab)).length})
              </button>
            ))}
          </div>

          {/* Sessions List */}
          {filteredSessions.length === 0 ? (
            <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-500 flex items-center justify-center mx-auto">
                <History className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">No Sessions Found</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                You haven&apos;t completed any interview sessions matching this filter yet.
              </p>
              <div className="pt-2">
                <Link
                  href="/interview/configure"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors"
                >
                  Start an Interview
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-5 bg-[#141414] border border-neutral-800/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-neutral-700/80 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-bold text-white">{session.title}</span>
                      <span
                        className={cn(
                          'text-[10px] uppercase font-mono px-2 py-0.5 rounded border',
                          session.status === 'completed'
                            ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-400'
                            : 'bg-neutral-800 border-neutral-700 text-neutral-400'
                        )}
                      >
                        {session.status}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                        {session.mode}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400">
                      {new Date(session.startedAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      • {session.questionIds.length} Questions • Level:{' '}
                      <span className="capitalize text-neutral-300">{session.difficulty}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    {session.result ? (
                      <div className="text-right">
                        <span className="text-lg font-bold font-mono text-emerald-400">
                          {session.result.overallScore}%
                        </span>
                        <span className="block text-[10px] text-neutral-500">Score</span>
                      </div>
                    ) : (
                      <div className="text-right text-xs text-neutral-500">
                        Question {session.currentIndex + 1}/{session.questionIds.length}
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Link
                        href={
                          session.status === 'completed'
                            ? `/interview/results/${session.id}`
                            : `/interview/session/${session.id}`
                        }
                        className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        {session.status === 'completed' ? 'View Results' : 'Resume'}
                        <ArrowRight className="w-3 h-3" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(session.id)}
                        className="p-2 rounded-xl text-neutral-500 hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
                        title="Delete Session"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
