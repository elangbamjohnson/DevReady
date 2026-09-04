import { ExternalLink, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FurtherReadingItem } from '@/types';

interface FurtherReadingProps {
  items?: FurtherReadingItem[];
  className?: string;
}

export function FurtherReading({ items, className }: FurtherReadingProps) {
  if (!items || items.length === 0) return null;

  return (
    <section
      aria-label="Further Reading"
      className={cn('mt-10 pt-8 border-t border-border-default', className)}
    >
      <div className="flex flex-col gap-1 mb-4">
        <h2 className="text-xs font-bold tracking-wider text-text-tertiary uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Further Reading
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary flex items-center gap-1.5 font-medium">
          <BookOpen className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
          Official Apple/Swift.org documentation for deeper reference
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, index) => {
          const isApple = item.source === 'apple-developer';
          const domainLabel = isApple ? 'developer.apple.com' : 'docs.swift.org';

          return (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group relative flex flex-col justify-between p-4 rounded-xl border transition-all duration-200',
                'bg-surface-1/60 hover:bg-surface-1 border-border-default hover:border-accent/40 shadow-xs hover:shadow-sm',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
              )}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span
                  className={cn(
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-medium border',
                    isApple
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                  )}
                >
                  {domainLabel}
                </span>
                <ExternalLink
                  className="w-3.5 h-3.5 text-text-tertiary group-hover:text-accent transition-colors shrink-0 mt-0.5"
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
