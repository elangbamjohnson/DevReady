'use client';

import { use, useState, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, BookOpen } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { TopicListItem } from '@/components/learn/TopicListItem';
import { topicRepository, categoryMeta } from '@/data/topics/index';
import { cn } from '@/lib/utils';
import type { DifficultyLevel } from '@/types';

type FilterValue = 'all' | DifficultyLevel;

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: 'All', value: 'all' },
  { label: 'Foundational', value: 'junior' },
  { label: 'Intermediate', value: 'mid' },
  { label: 'Advanced', value: 'senior' },
  { label: 'Expert', value: 'staff' },
];

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all');
  const meta = categoryMeta.find(c => c.slug === category);

  if (!meta) notFound();

  const allCategoryTopics = topicRepository.getTopicsByCategory(meta.category);

  if (allCategoryTopics.length === 0) notFound();

  // Filter groups and topics based on activeFilter
  const filteredGroups = useMemo(() => {
    const rawGroups = topicRepository.getGroupsByCategory(meta.category);
    if (activeFilter === 'all') return rawGroups;

    return rawGroups
      .map(g => ({
        group: g.group,
        topics: g.topics.filter(t => t.difficulty === activeFilter),
      }))
      .filter(g => g.topics.length > 0);
  }, [meta.category, activeFilter]);


  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-text-tertiary mb-6">
          <Link href="/learn" className="hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded">Learn</Link>
          <ChevronRight className="w-3 h-3" aria-hidden="true" />
          <span className="text-text-secondary font-medium">{meta.label}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-xs font-bold text-accent">
              {meta.icon}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">{meta.label}</h1>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">{meta.description}</p>
          <p className="text-xs text-text-tertiary mt-2">
            {allCategoryTopics.length} total {allCategoryTopics.length === 1 ? 'topic' : 'topics'} in {meta.label}
          </p>
        </header>

        {/* Difficulty Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8 border-b border-border-subtle" role="tablist" aria-label="Filter topics by difficulty">
          {FILTERS.map(f => {
            const isActive = activeFilter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(f.value)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer',
                  isActive
                    ? 'bg-accent-muted text-accent font-semibold'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Topic Groups */}
        {filteredGroups.length > 0 ? (
          <div className="space-y-8">
            {filteredGroups.map(({ group, topics }) => (
              <section key={group} aria-labelledby={`group-${group}`}>
                <div className="flex items-center gap-2 mb-3">
                  <h2 id={`group-${group}`} className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                    {group}
                  </h2>
                  <span className="text-[10px] text-text-tertiary bg-surface-2 px-1.5 py-0.5 rounded tabular-nums">
                    {topics.length}
                  </span>
                </div>
                <div className="border border-border-default rounded-xl overflow-hidden divide-y divide-border-subtle bg-surface-0">
                  {topics.map(topic => (
                    <TopicListItem key={topic.id} topic={topic} category={meta.category} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-border-default rounded-xl bg-surface-1">
            <BookOpen className="w-8 h-8 text-text-tertiary mx-auto mb-3" aria-hidden="true" />
            <p className="text-sm text-text-secondary font-medium">No topics found for this filter level.</p>
            <p className="text-xs text-text-tertiary mt-1">Try selecting &ldquo;All&rdquo; to view all available topics.</p>
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className="mt-3 px-3 py-1.5 text-xs text-accent hover:underline cursor-pointer"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
