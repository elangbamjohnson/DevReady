// File: src/components/dashboard/ContinueLearningCard.tsx
// Method: export default function ContinueLearningCard()

'use client';

import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function ContinueLearningCard() {
  return (
    <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-6 flex flex-col h-full justify-between shadow-lg shadow-black/20">
      {/* Header Overline */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
            Continue Learning
          </span>
          <BookOpen className="w-4 h-4 text-neutral-500" strokeWidth={1.75} aria-hidden="true" />
        </div>

        {/* Card Title & Description */}
        <h3 className="text-base font-semibold text-white mb-1">
          Actors in Swift
        </h3>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Actor isolation, actor reentrancy, and data race prevention using Swift actors.
        </p>

        {/* Pill Badge */}
        <div className="mt-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
            Concurrency
          </span>
        </div>
      </div>

      {/* Progress Section */}
      <div className="my-4">
        <div className="flex items-center justify-between text-xs font-medium mb-2">
          <span className="text-neutral-400">Progress</span>
          <span className="text-neutral-300 font-mono">80%</span>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: '80%' }}
          />
        </div>

        {/* Remaining info / Stats */}
        <p className="text-xs text-neutral-500 mt-2 font-mono">
          ~50 min remaining · 14 questions
        </p>
      </div>

      {/* Bottom Action Button */}
      <Link href="/learn/concurrency/actors-in-swift" className="block mt-auto pt-2">
        <button
          type="button"
          className="w-full bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-violet-950/30"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </Link>
    </div>
  );
}

export { ContinueLearningCard };
