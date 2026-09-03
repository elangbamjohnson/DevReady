// File: src/components/TopicGroupSection.tsx
// Method: export default function TopicGroupSection()

'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TopicGroupSectionProps {
  title: string;
  category: string;
  categoryLabel: string;
  categoryBadgeClass?: string;
  completedCount: number;
  totalCount: number;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

export default function TopicGroupSection({
  title,
  category,
  categoryLabel,
  categoryBadgeClass = 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  completedCount,
  totalCount,
  description,
  children,
  className,
}: TopicGroupSectionProps) {
  return (
    <section className={cn('mb-10', className)}>
      {/* Header Container */}
      <div className="flex flex-col mb-6 mt-8 pb-4 border-b border-neutral-800">
        {/* Top Row: Title, Badge, Progress & View All */}
        <div className="flex flex-row justify-between items-end gap-3 flex-wrap">
          {/* Left Side: Title, Category Badge, Progress Text */}
          <div className="flex flex-row items-center gap-3 flex-wrap">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {title}
            </h2>
            <span
              className={cn(
                'px-2 py-0.5 rounded-full text-[11px] font-medium border',
                categoryBadgeClass
              )}
            >
              {categoryLabel}
            </span>
            <span className="text-sm text-neutral-500 font-mono">
              {completedCount}/{totalCount} completed
            </span>
          </div>

          {/* Right Side: View All Link */}
          <Link
            href={`/learn/${category}`}
            className="text-sm text-violet-500 hover:text-violet-400 font-medium flex items-center gap-1 transition-colors group shrink-0"
          >
            <span>View all</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Bottom Row: Description */}
        <p className="text-sm text-neutral-400 mt-2">{description}</p>
      </div>

      {/* Children list container */}
      {children}
    </section>
  );
}

export { TopicGroupSection };
