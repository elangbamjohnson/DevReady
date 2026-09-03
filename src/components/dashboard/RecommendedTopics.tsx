// File: src/components/dashboard/RecommendedTopics.tsx
// Method: export default function RecommendedTopics()

'use client';

import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RecommendedTopicItem {
  id: string;
  title: string;
  category: string;
  categoryStyle: string;
  level: string;
  levelStyle: string;
  progress: number;
  statusText?: string;
  questionsMeta: string;
  href: string;
}

const RECOMMENDED_TOPICS: RecommendedTopicItem[] = [
  {
    id: 'concurrency-mainactor',
    title: 'MainActor & UI Updates',
    category: 'Concurrency',
    categoryStyle: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    level: 'Senior',
    levelStyle: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    progress: 30,
    questionsMeta: '9 questions · ~30m',
    href: '/learn/concurrency/mainactor',
  },
  {
    id: 'concurrency-task-groups',
    title: 'Task Groups & Parallelism',
    category: 'Concurrency',
    categoryStyle: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    level: 'Senior',
    levelStyle: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    progress: 0,
    statusText: 'Not started',
    questionsMeta: '11 questions · ~45m',
    href: '/learn/concurrency/task-groups',
  },
  {
    id: 'arch-mvvm',
    title: 'MVVM in SwiftUI',
    category: 'Architecture',
    categoryStyle: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    level: 'Mid',
    levelStyle: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    progress: 55,
    questionsMeta: '13 questions · ~45m',
    href: '/learn/architecture/mvvm',
  },
  {
    id: 'arch-di',
    title: 'Dependency Injection',
    category: 'Architecture',
    categoryStyle: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    level: 'Senior',
    levelStyle: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    progress: 20,
    questionsMeta: '10 questions · ~40m',
    href: '/learn/architecture/dependency-injection',
  },
  {
    id: 'memory-retain-cycles',
    title: 'Retain Cycles in Swift',
    category: 'Memory Management',
    categoryStyle: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    level: 'Senior',
    levelStyle: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    progress: 70,
    questionsMeta: '12 questions · ~40m',
    href: '/learn/memory/retain-cycles',
  },
  {
    id: 'uikit-tableview',
    title: 'Diffable Data Sources',
    category: 'UIKit',
    categoryStyle: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
    level: 'Senior',
    levelStyle: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    progress: 0,
    statusText: 'Not started',
    questionsMeta: '9 questions · ~35m',
    href: '/learn/uikit/uitableview',
  },
];

export default function RecommendedTopics() {
  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white tracking-tight">Recommended Topics</h2>
        <Link
          href="/learn"
          className="text-sm font-medium text-violet-500 hover:text-violet-400 transition-colors cursor-pointer"
        >
          View all
        </Link>
      </div>

      {/* 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {RECOMMENDED_TOPICS.map((topic) => (
          <div
            key={topic.id}
            className="bg-[#141414] border border-neutral-800 hover:border-neutral-700 rounded-xl p-5 relative flex flex-col justify-between transition-all duration-200 group"
          >
            {/* Top Right Bookmark Icon */}
            <button
              type="button"
              className="absolute top-5 right-5 text-neutral-500 hover:text-white transition-colors cursor-pointer p-1 -m-1 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500"
              aria-label={`Bookmark ${topic.title}`}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {/* Title & Badges */}
            <Link href={topic.href} className="block pr-6">
              <h3 className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors leading-snug mb-2">
                {topic.title}
              </h3>
              <div className="flex items-center gap-2 mt-2 mb-5">
                <span
                  className={cn(
                    'px-2 py-0.5 text-[11px] rounded-full border font-medium',
                    topic.categoryStyle
                  )}
                >
                  {topic.category}
                </span>
                <span
                  className={cn(
                    'px-2 py-0.5 text-[11px] rounded-full border font-medium',
                    topic.levelStyle
                  )}
                >
                  {topic.level}
                </span>
              </div>
            </Link>

            {/* Bottom: Progress Bar & Meta */}
            <div className="mt-auto pt-2 border-t border-transparent">
              <div className="w-full bg-neutral-800 rounded-full h-1 overflow-hidden">
                {topic.progress > 0 && (
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      topic.progress >= 60 ? 'bg-violet-500' : 'bg-emerald-500'
                    )}
                    style={{ width: `${topic.progress}%` }}
                  />
                )}
              </div>

              <div className="flex items-center justify-between text-xs mt-2 font-mono">
                <span className="text-neutral-400">
                  {topic.progress > 0 ? `${topic.progress}% complete` : topic.statusText ?? 'Not started'}
                </span>
                <span className="text-neutral-500">{topic.questionsMeta}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export { RecommendedTopics };
