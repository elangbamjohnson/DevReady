import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ArticleTopic } from '@/types';

interface PreviousNextProps {
  previous?: ArticleTopic;
  next?: ArticleTopic;
  className?: string;
}

export function PreviousNext({ previous, next, className }: PreviousNextProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Topic navigation"
      className={cn(
        'mt-12 pt-6 border-t border-border-default grid grid-cols-2 gap-4',
        className
      )}
    >
      {previous ? (
        <Link
          href={`/learn/${previous.category}/${previous.slug}`}
          className="flex items-start gap-3 p-4 rounded-xl border border-border-default hover:bg-surface-1 hover:border-border-subtle transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ChevronLeft className="w-4 h-4 mt-0.5 text-text-tertiary group-hover:text-accent transition-colors shrink-0" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-xs text-text-tertiary mb-0.5">Previous</p>
            <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors truncate">
              {previous.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/learn/${next.category}/${next.slug}`}
          className="flex items-start gap-3 p-4 rounded-xl border border-border-default hover:bg-surface-1 hover:border-border-subtle transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent col-start-2 text-right"
        >
          <div className="flex-1 min-w-0">
            <p className="text-xs text-text-tertiary mb-0.5">Next</p>
            <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors truncate">
              {next.title}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 mt-0.5 text-text-tertiary group-hover:text-accent transition-colors shrink-0" aria-hidden="true" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
