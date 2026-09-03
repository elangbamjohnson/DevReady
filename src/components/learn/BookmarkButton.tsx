'use client';

import { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { isBookmarked, toggleBookmark } from '@/lib/bookmarkStore';
import { cn } from '@/lib/utils';
import type { ArticleTopic } from '@/types';

interface BookmarkButtonProps {
  topic: ArticleTopic;
  className?: string;
}

export function BookmarkButton({ topic, className }: BookmarkButtonProps) {
  const [saved, setSaved] = useState(() => {
    if (typeof window === 'undefined') return false;
    return isBookmarked(topic.id);
  });

  const handleToggle = () => {
    const nowSaved = toggleBookmark({
      id: topic.id,
      title: topic.title,
      category: topic.category,
      type: 'topic',
      description: topic.description,
      href: `/learn/${topic.category}/${topic.slug}`,
    });
    setSaved(nowSaved);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={saved ? 'Remove bookmark' : 'Bookmark this topic'}
      aria-pressed={saved}
      className={cn(
        'inline-flex items-center justify-center min-w-[36px] min-h-[36px] rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        saved
          ? 'border-accent/40 bg-accent/10 text-accent hover:bg-accent/20'
          : 'border-border-default text-text-tertiary hover:text-text-primary hover:bg-surface-2',
        className
      )}
    >
      {saved ? (
        <BookmarkCheck className="w-4 h-4" aria-hidden="true" />
      ) : (
        <Bookmark className="w-4 h-4" aria-hidden="true" />
      )}
    </button>
  );
}
