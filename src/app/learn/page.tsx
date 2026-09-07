// File: src/app/learn/page.tsx
// Method: export default function LearnPage()

'use client';

import { useState, useEffect, Suspense, useSyncExternalStore } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import CategoryNav from '@/components/CategoryNav';
import TopicGroupList from '@/components/TopicGroupList';
import { getLastViewedTopic } from '@/lib/progressStore';

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function LearnIndexLoadingSkeleton() {
  return (
    <AppShell>
      <div className="flex-1 w-full animate-pulse">
        <div className="px-6 py-8 lg:px-8">
          {/* Page Header Skeleton */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-surface-2" />
              <div className="h-8 w-32 rounded-lg bg-surface-2" />
            </div>
            <div className="h-4 w-72 rounded bg-surface-2 mt-3" />
          </div>

          {/* Category Tabs Skeleton */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 w-20 rounded-lg bg-surface-2 shrink-0" />
            ))}
          </div>

          {/* Cards Skeleton */}
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-44 rounded-xl bg-surface-1 border border-border-default" />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function LearnContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const isClient = useIsClient();

  const browseRequested = searchParams.get('browse') === '1';
  const lastTopic = isClient && !browseRequested ? getLastViewedTopic() : null;

  useEffect(() => {
    if (!browseRequested && lastTopic) {
      router.replace(`/learn/${lastTopic.category}/${lastTopic.slug}`);
    }
  }, [browseRequested, lastTopic, router]);

  // Show loading skeleton while deciding or redirecting
  if (!browseRequested && (!isClient || lastTopic)) {
    return <LearnIndexLoadingSkeleton />;
  }

  return (
    <AppShell>
      <div className="flex-1 w-full">
        <div className="px-6 py-8 lg:px-8">
          {/* Page Header */}
          <header className="mb-2">
            <div className="flex items-center gap-3">
              <BookOpen className="w-7 h-7 text-violet-500" strokeWidth={2} aria-hidden="true" />
              <h1 className="text-3xl font-bold text-white tracking-tight">Learn</h1>
            </div>
            <p className="text-sm text-neutral-400 mt-2">
              Explore Swift and iOS concepts from fundamentals to advanced engineering.
            </p>
          </header>

          {/* Category Navigation */}
          <CategoryNav
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Topic Group List */}
          <TopicGroupList selectedCategory={selectedCategory} />
        </div>
      </div>
    </AppShell>
  );
}

export default function LearnPage() {
  return (
    <Suspense fallback={<LearnIndexLoadingSkeleton />}>
      <LearnContent />
    </Suspense>
  );
}
