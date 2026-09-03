'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bookmark as BookmarkIcon, BookmarkCheck, X, BookOpen } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/common/Card';
import { Tabs } from '@/components/common/Tabs';
import { CategoryBadge } from '@/components/common/Badge';
import { EmptyState } from '@/components/common/EmptyState';
import { getBookmarks, removeBookmark as removeBM } from '@/lib/bookmarkStore';
import type { Bookmark } from '@/types';

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Topics', value: 'topic' },
  { label: 'Questions', value: 'question' },
];

function formatSavedAt(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  } catch {
    return isoString;
  }
}

export default function BookmarksPage() {
  const [activeTab, setActiveTab] = useState('all');
  // Lazy init from localStorage — avoids useEffect setState cascade
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    if (typeof window === 'undefined') return [];
    return getBookmarks();
  });

  const filtered = bookmarks.filter(b => activeTab === 'all' || b.type === activeTab);

  const handleRemove = (id: string) => {
    removeBM(id);
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-text-primary flex items-center gap-2">
            <BookmarkIcon className="w-5 h-5 text-accent" aria-hidden="true" />
            Bookmarks
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Your saved topics and interview questions.
          </p>
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

        {filtered.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No bookmarks yet."
            description="Open any topic and click the bookmark icon to save it here."
          />
        ) : (
          <div className="space-y-2">
            {filtered.map((bm) => {
              const href = bm.href ?? `/learn/${bm.category}`;
              return (
                <Card key={bm.id} padding="sm" hover>
                  <div className="flex items-start gap-3">
                    <BookmarkCheck className="w-4 h-4 text-accent mt-0.5 shrink-0" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <Link
                        href={href}
                        className="text-sm font-medium text-text-primary hover:text-accent transition-colors line-clamp-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                      >
                        {bm.title}
                      </Link>
                      <p className="text-xs text-text-tertiary mt-0.5 line-clamp-1">{bm.description}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <CategoryBadge category={bm.category} />
                        <span className="text-[10px] text-text-tertiary capitalize">{bm.type}</span>
                        <span className="text-[10px] text-text-tertiary">{formatSavedAt(bm.savedAt)}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemove(bm.id)}
                      className="min-w-[36px] min-h-[36px] flex items-center justify-center text-text-tertiary hover:text-rose-400 transition-colors cursor-pointer shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      aria-label={`Remove ${bm.title} from bookmarks`}
                    >
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
