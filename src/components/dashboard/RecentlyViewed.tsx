// File: src/components/dashboard/RecentlyViewed.tsx
// Method: export default function RecentlyViewed()

'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RecentlyViewedItem {
  id: string;
  title: string;
  category: string;
  categoryStyle: string;
  timeAgo: string;
  progress: number;
  progressBarColor: string;
  href: string;
}

const RECENTLY_VIEWED_ITEMS: RecentlyViewedItem[] = [
  {
    id: 'concurrency-actors',
    title: 'Actors in Swift',
    category: 'Concurrency',
    categoryStyle: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    timeAgo: '1h ago',
    progress: 80,
    progressBarColor: 'bg-emerald-500',
    href: '/learn/concurrency/actors-in-swift',
  },
  {
    id: 'memory-arc',
    title: 'ARC & Memory Management',
    category: 'Memory Management',
    categoryStyle: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    timeAgo: '1h ago',
    progress: 90,
    progressBarColor: 'bg-emerald-500',
    href: '/learn/memory/arc',
  },
  {
    id: 'arch-mvvm',
    title: 'MVVM in SwiftUI',
    category: 'Architecture',
    categoryStyle: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    timeAgo: 'Yesterday',
    progress: 55,
    progressBarColor: 'bg-violet-500',
    href: '/learn/architecture/mvvm',
  },
];

export default function RecentlyViewed() {
  return (
    <section className="bg-[#141414] border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg shadow-black/20 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white tracking-tight">Recently Viewed</h2>
        <Link
          href="/learn"
          className="text-violet-400 hover:text-violet-300 text-sm font-medium flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>See all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* List Items */}
      <div className="space-y-4">
        {RECENTLY_VIEWED_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="block p-3 -mx-3 rounded-xl hover:bg-neutral-900/60 transition-colors group cursor-pointer"
          >
            {/* Top row: Title */}
            <h3 className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">
              {item.title}
            </h3>

            {/* Middle row: Badges, time, and progress % */}
            <div className="flex items-center justify-between mt-1.5 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'px-2 py-0.5 text-[11px] rounded-full border font-medium',
                    item.categoryStyle
                  )}
                >
                  {item.category}
                </span>
                <span className="text-xs text-neutral-500 font-mono">{item.timeAgo}</span>
              </div>
              <span className="text-xs text-neutral-500 font-mono">
                {item.progress}%
              </span>
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full bg-neutral-800 rounded-full h-1 overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-700 ease-out', item.progressBarColor)}
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export { RecentlyViewed };
