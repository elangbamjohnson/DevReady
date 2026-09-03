// File: src/components/dashboard/PracticeSessionCard.tsx
// Method: export default function PracticeSessionCard()

'use client';

import Link from 'next/link';
import { Bookmark, BarChart2, Shield, Clock } from 'lucide-react';

export default function PracticeSessionCard() {
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
          Senior iOS Session
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Mixed topics — Architecture, Concurrency, Memory
        </p>
      </div>

      {/* 3-Column Stats Sub-grid */}
      <div className="grid grid-cols-3 gap-2 py-3 px-2 my-4 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center">
        {/* Stat 1: Questions */}
        <div className="flex flex-col items-center justify-center">
          <BarChart2 className="w-4 h-4 text-neutral-400 mb-1" strokeWidth={1.75} aria-hidden="true" />
          <span className="text-sm font-bold text-neutral-200">20</span>
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">Questions</span>
        </div>

        {/* Stat 2: Level */}
        <div className="flex flex-col items-center justify-center border-x border-neutral-800">
          <Shield className="w-4 h-4 text-neutral-400 mb-1" strokeWidth={1.75} aria-hidden="true" />
          <span className="text-sm font-bold text-neutral-200">Senior</span>
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
      <Link href="/interview" className="block mt-auto pt-2">
        <button
          type="button"
          className="w-full bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors cursor-pointer shadow-sm shadow-violet-950/30"
        >
          Start Practice
        </button>
      </Link>
    </div>
  );
}

export { PracticeSessionCard, PracticeSessionCard as PracticeCard };
