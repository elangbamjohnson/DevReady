// File: src/components/dashboard/ReadinessCard.tsx
// Method: export default function ReadinessCard()

'use client';

import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export default function ReadinessCard() {
  const percentage = 68;
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-6 flex flex-col h-full justify-between shadow-lg shadow-black/20">
      {/* Header Overline */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400 block">
              Interview Readiness
            </span>
            <span className="text-xs text-neutral-400 mt-0.5 block">
              Senior iOS Engineer
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full shrink-0">
            <TrendingUp className="w-3 h-3" />
            <span>+4% this week</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Progress Ring & Score Details */}
      <div className="flex items-center gap-5 my-4">
        {/* Circular SVG Progress Ring */}
        <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r={radius}
              className="stroke-neutral-800 fill-transparent"
              strokeWidth="7"
            />
            <circle
              cx="40"
              cy="40"
              r={radius}
              className="stroke-violet-500 fill-transparent transition-all duration-700 ease-out"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
        </div>

        {/* Score Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white tracking-tight">68</span>
            <span className="text-base font-medium text-neutral-500">/ 100</span>
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed mt-1">
            Keep improving your interview readiness.
          </p>
          <p className="text-xs text-neutral-500 mt-2 font-mono">
            3 / 15 topics · 47 questions
          </p>
        </div>
      </div>

      {/* Action Button */}
      <Link href="/progress" className="block mt-auto pt-2">
        <button
          type="button"
          className="w-full bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
        >
          View Progress
        </button>
      </Link>
    </div>
  );
}

export { ReadinessCard };
