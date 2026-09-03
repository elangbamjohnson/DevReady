// File: src/components/dashboard/PracticeSessionCard.tsx
// Method: export default function PracticeSessionCard()

'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Bookmark, BarChart2, Shield, Clock, ArrowRight, Play } from 'lucide-react';
import {
  interviewStore,
  subscribeToInterviewStore,
  getServerNull,
  getServerEmptySessions,
} from '@/lib/interview/interviewStore';

export default function PracticeSessionCard() {
  const activeSession = useSyncExternalStore(
    subscribeToInterviewStore,
    () => interviewStore.getActiveSession(),
    getServerNull
  );

  const history = useSyncExternalStore(
    subscribeToInterviewStore,
    () => interviewStore.getHistory(),
    getServerEmptySessions
  );

  const lastCompletedSession = history.find((s) => s.status === 'completed') || null;

  return (
    <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-6 flex flex-col h-full justify-between shadow-lg shadow-black/20">
      {/* Header Overline */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
            Practice Interview
          </span>
          <Bookmark className="w-4 h-4 text-neutral-500" strokeWidth={1.75} aria-hidden="true" />
        </div>

        {/* Card Title & Description */}
        <h3 className="text-base font-semibold text-white mb-1">
          {activeSession ? 'In-Progress Interview' : 'Senior iOS Practice Track'}
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed">
          {activeSession
            ? `Resume question ${activeSession.currentIndex + 1} of ${activeSession.questionIds.length}`
            : lastCompletedSession?.result
            ? `Last evaluated score: ${lastCompletedSession.result.overallScore}% (${lastCompletedSession.difficulty})`
            : 'Curated topics — Concurrency, Architecture, Memory & System Design'}
        </p>
      </div>

      {/* 3-Column Stats Sub-grid */}
      <div className="grid grid-cols-3 gap-2 py-3 px-2 my-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center">
        {/* Stat 1: Questions */}
        <div className="flex flex-col items-center justify-center">
          <BarChart2 className="w-4 h-4 text-neutral-400 mb-1" strokeWidth={1.75} aria-hidden="true" />
          <span className="text-sm font-bold text-neutral-200">
            {activeSession ? activeSession.questionIds.length : 20}
          </span>
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">Questions</span>
        </div>

        {/* Stat 2: Level */}
        <div className="flex flex-col items-center justify-center border-x border-neutral-800">
          <Shield className="w-4 h-4 text-neutral-400 mb-1" strokeWidth={1.75} aria-hidden="true" />
          <span className="text-sm font-bold text-neutral-200 capitalize">
            {activeSession ? activeSession.difficulty : 'Senior'}
          </span>
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">Level</span>
        </div>

        {/* Stat 3: Est. Time */}
        <div className="flex flex-col items-center justify-center">
          <Clock className="w-4 h-4 text-neutral-400 mb-1" strokeWidth={1.75} aria-hidden="true" />
          <span className="text-sm font-bold text-neutral-200">~30m</span>
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">Est. time</span>
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="pt-2 mt-auto">
        {activeSession ? (
          <Link
            href={`/interview/session/${activeSession.id}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors cursor-pointer shadow-sm shadow-violet-950/30"
          >
            <Play className="w-4 h-4 fill-current" />
            Resume Session
          </Link>
        ) : (
          <Link
            href="/interview"
            className="w-full inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors cursor-pointer shadow-sm shadow-violet-950/30"
          >
            Start Practice
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

export { PracticeSessionCard, PracticeSessionCard as PracticeCard };
