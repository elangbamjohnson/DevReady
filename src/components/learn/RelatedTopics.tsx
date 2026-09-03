import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { difficultyBg, difficultyLabel } from '@/lib/utils';
import type { ArticleTopic } from '@/types';

interface RelatedTopicsProps {
  topics: ArticleTopic[];
  className?: string;
}

export function RelatedTopics({ topics, className }: RelatedTopicsProps) {
  if (topics.length === 0) return null;

  return (
    <section aria-label="Related topics" className={cn('mt-10', className)}>
      <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
        Related Topics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {topics.map(topic => (
          <Link
            key={topic.id}
            href={`/learn/${topic.category}/${topic.slug}`}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-border-default hover:bg-surface-1 hover:border-border-subtle transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors truncate">
                {topic.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn(
                  'inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded border',
                  difficultyBg(topic.difficulty)
                )}>
                  {difficultyLabel(topic.difficulty)}
                </span>
                <span className="text-xs text-text-tertiary">{topic.estimatedTime} min</span>
              </div>
            </div>
            <ArrowRight
              className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
