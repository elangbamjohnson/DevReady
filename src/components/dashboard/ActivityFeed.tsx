// File: src/components/dashboard/ActivityFeed.tsx
// Method: export default function ActivityFeed()

'use client';

import { CheckCircle2, Zap, Bookmark, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ActivityFeedItem {
  id: string;
  action: string;
  topic: string;
  category: string;
  categoryStyle: string;
  timeAgo: string;
  icon: 'completed' | 'practiced' | 'bookmarked' | 'started';
}

const ACTIVITIES: ActivityFeedItem[] = [
  {
    id: 'act-1',
    action: 'Completed',
    topic: 'Actors in Swift',
    category: 'Concurrency',
    categoryStyle: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    timeAgo: '1h ago',
    icon: 'completed',
  },
  {
    id: 'act-2',
    action: 'Practiced',
    topic: 'Concurrency Interview Questions',
    category: 'Concurrency',
    categoryStyle: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    timeAgo: '18h ago',
    icon: 'practiced',
  },
  {
    id: 'act-3',
    action: 'Bookmarked',
    topic: 'MVVM in SwiftUI',
    category: 'Architecture',
    categoryStyle: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    timeAgo: 'Yesterday',
    icon: 'bookmarked',
  },
  {
    id: 'act-4',
    action: 'Completed',
    topic: 'UIKit View Lifecycle',
    category: 'UIKit',
    categoryStyle: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
    timeAgo: '2d ago',
    icon: 'completed',
  },
  {
    id: 'act-5',
    action: 'Started',
    topic: 'Dependency Injection',
    category: 'Architecture',
    categoryStyle: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    timeAgo: '2d ago',
    icon: 'started',
  },
];

const iconMap = {
  completed: {
    icon: CheckCircle2,
    style: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  practiced: {
    icon: Zap,
    style: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  bookmarked: {
    icon: Bookmark,
    style: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  },
  started: {
    icon: Play,
    style: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
} as const;

export default function ActivityFeed() {
  return (
    <section className="bg-[#141414] border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg shadow-black/20 h-full">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white tracking-tight">Recent Activity</h2>
      </div>

      {/* List Items */}
      <div className="divide-y divide-neutral-800/50">
        {ACTIVITIES.map((item) => {
          const IconConfig = iconMap[item.icon];
          const IconComponent = IconConfig.icon;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0 gap-3"
            >
              {/* Left Side: Icon & Activity Text */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                  className={cn(
                    'w-7 h-7 rounded-lg border flex items-center justify-center shrink-0',
                    IconConfig.style
                  )}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm truncate">
                    <span className="text-neutral-400">{item.action} </span>
                    <span className="text-sm font-medium text-neutral-200">{item.topic}</span>
                  </p>
                  <div className="mt-1">
                    <span
                      className={cn(
                        'px-2 py-0.5 text-[11px] rounded-full border font-medium inline-block',
                        item.categoryStyle
                      )}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Timestamp */}
              <span className="text-xs text-neutral-500 font-mono shrink-0">
                {item.timeAgo}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export { ActivityFeed };
