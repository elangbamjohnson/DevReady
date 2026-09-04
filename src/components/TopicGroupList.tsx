// File: src/components/TopicGroupList.tsx
// Method: export default function TopicGroupList()

'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, Clock } from 'lucide-react';
import TopicGroupSection from '@/components/TopicGroupSection';
import { useCompletedTopicIds, useIsTopicComplete } from '@/lib/progressStore';
import { cn } from '@/lib/utils';
import type { DifficultyLevel, CurriculumStatus, CurriculumPriority } from '@/types';
import { CURRICULUM_DOMAINS } from '@/data/curriculum';

export interface TopicItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: DifficultyLevel;
  status: CurriculumStatus;
  priority: CurriculumPriority;
  description: string;
  defaultProgress: number;
  questionCount: number;
  estimatedTime: string;
}

export interface TopicGroupData {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  categoryBadgeClass: string;
  description: string;
  topics: TopicItem[];
}

// Dynamically generate TopicGroupData from the 27-domain curriculum hierarchy
const TOPIC_GROUPS: TopicGroupData[] = CURRICULUM_DOMAINS.flatMap((domain) =>
  domain.modules.map((module) => ({
    id: module.id,
    title: `${domain.shortTitle}: ${module.title}`,
    category: domain.id,
    categoryLabel: domain.shortTitle,
    categoryBadgeClass: domain.colorBadgeClass,
    description: module.description,
    topics: module.topics.map((t) => ({
      id: t.id,
      slug: t.slug,
      title: t.title,
      category: t.domainId,
      difficulty: t.difficulty,
      status: t.status,
      priority: t.priority,
      description: t.description,
      defaultProgress: t.defaultProgress ?? 0,
      questionCount: t.questionCount ?? 8,
      estimatedTime: `~${t.estimatedMinutes}m`,
    })),
  }))
);

function DifficultyBadge({ difficulty }: { difficulty: DifficultyLevel }) {
  const styles: Record<string, { label: string; className: string }> = {
    junior: {
      label: 'Junior',
      className: 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20',
    },
    foundational: {
      label: 'Foundational',
      className: 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20',
    },
    mid: {
      label: 'Mid',
      className: 'text-orange-400 bg-orange-400/10 border border-orange-400/20',
    },
    intermediate: {
      label: 'Intermediate',
      className: 'text-orange-400 bg-orange-400/10 border border-orange-400/20',
    },
    senior: {
      label: 'Senior',
      className: 'text-rose-400 bg-rose-400/10 border border-rose-400/20',
    },
    advanced: {
      label: 'Advanced',
      className: 'text-rose-400 bg-rose-400/10 border border-rose-400/20',
    },
    staff: {
      label: 'Staff',
      className: 'text-violet-400 bg-violet-400/10 border border-violet-400/20',
    },
    expert: {
      label: 'Expert',
      className: 'text-violet-400 bg-violet-400/10 border border-violet-400/20',
    },
  };

  const style = styles[difficulty] ?? styles.foundational;

  return (
    <span
      className={cn(
        'text-xs px-2 py-0.5 rounded-md font-medium shrink-0',
        style.className
      )}
    >
      {style.label}
    </span>
  );
}

interface TopicRowItemProps {
  topic: TopicItem;
}

function TopicRowItem({ topic }: TopicRowItemProps) {
  const isComplete = useIsTopicComplete(topic.id);

  const isAvailable = topic.status === 'available';
  const progress = isComplete ? 100 : topic.defaultProgress;

  // Status dot color based on availability and completion
  const dotColor = !isAvailable
    ? 'bg-neutral-600'
    : progress >= 80
    ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50'
    : 'bg-violet-500';

  // Progress fill color based on tier
  const progressFillColor =
    progress >= 80
      ? 'bg-emerald-500'
      : progress >= 60
      ? 'bg-violet-500'
      : 'bg-orange-400';

  const rowContent = (
    <>
      {/* Row Left Side: Indicator Dot, Title, Difficulty Badge, Priority & Description */}
      <div className="flex flex-row items-start gap-4 min-w-0 flex-1 pr-4">
        {/* Indicator Dot */}
        <span className={cn('w-2 h-2 rounded-full mt-2 shrink-0', dotColor)} aria-hidden="true" />

        {/* Text Column */}
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className={cn(
              'text-base font-semibold transition-colors leading-snug',
              isAvailable ? 'text-neutral-200 group-hover:text-white' : 'text-neutral-300'
            )}>
              {topic.title}
            </h3>
            <DifficultyBadge difficulty={topic.difficulty} />

            {/* Status or Priority Tag */}
            {!isAvailable && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-neutral-800/80 border border-neutral-700/60 text-neutral-400">
                <Clock className="w-3 h-3 text-neutral-500" />
                {topic.status === 'coming-soon' ? 'Coming soon' : 'Planned'}
              </span>
            )}

            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-500">
              {topic.priority}
            </span>
          </div>
          <p className="text-sm text-neutral-500 mt-1 line-clamp-1 leading-relaxed">
            {topic.description}
          </p>
        </div>
      </div>

      {/* Row Right Side: Stats & Progress */}
      <div className="flex flex-row items-center gap-6 mt-4 md:mt-0 shrink-0">
        {isAvailable ? (
          <>
            {/* Progress Section */}
            <div className="flex flex-col items-end">
              <div className="w-24 h-1 bg-neutral-800 rounded-full overflow-hidden">
                {progress > 0 && (
                  <div
                    className={cn('h-full rounded-full transition-all duration-500', progressFillColor)}
                    style={{ width: `${progress}%` }}
                  />
                )}
              </div>
              <span className="text-xs text-neutral-400 mt-1 font-mono tabular-nums">
                {progress}%
              </span>
            </div>

            {/* Meta Section */}
            <div className="flex flex-col items-end min-w-[70px]">
              <span className="text-xs text-neutral-400 whitespace-nowrap">
                {topic.questionCount} questions
              </span>
              <span className="text-xs text-neutral-500 mt-1 font-mono whitespace-nowrap">
                {topic.estimatedTime}
              </span>
            </div>

            {/* Chevron Icon */}
            <ChevronRight
              className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors shrink-0"
              aria-hidden="true"
            />
          </>
        ) : (
          <div className="flex flex-col items-end min-w-[70px]">
            <span className="text-xs text-neutral-500 font-mono whitespace-nowrap">
              {topic.estimatedTime}
            </span>
            <span className="text-[11px] text-neutral-600 mt-0.5 whitespace-nowrap">
              {topic.questionCount} questions planned
            </span>
          </div>
        )}
      </div>
    </>
  );

  if (!isAvailable) {
    return (
      <div className="flex flex-col md:flex-row md:items-center justify-between p-5 border-b border-neutral-800/60 last:border-0 opacity-75">
        {rowContent}
      </div>
    );
  }

  return (
    <Link
      href={`/learn/${topic.category}/${topic.slug}`}
      className="flex flex-col md:flex-row md:items-center justify-between p-5 border-b border-neutral-800/60 last:border-0 hover:bg-[#1A1A1A] transition-colors cursor-pointer group"
    >
      {rowContent}
    </Link>
  );
}

export interface TopicGroupListProps {
  selectedCategory?: string;
  className?: string;
}

export default function TopicGroupList({
  selectedCategory = 'All',
  className,
}: TopicGroupListProps) {
  const completedTopicIds = useCompletedTopicIds();
  const completedSet = useMemo(() => new Set(completedTopicIds), [completedTopicIds]);

  const filteredGroups = TOPIC_GROUPS.filter((group) => {
    if (selectedCategory === 'All') return true;
    const catLower = selectedCategory.toLowerCase();
    return (
      group.category.toLowerCase() === catLower ||
      group.categoryLabel.toLowerCase() === catLower
    );
  });

  return (
    <div className={cn('space-y-4', className)}>
      {filteredGroups.map((group) => {
        const completedCount = group.topics.filter(
          (t) => completedSet.has(t.id) || t.defaultProgress === 100
        ).length;

        return (
          <TopicGroupSection
            key={group.id}
            title={group.title}
            category={group.category}
            categoryLabel={group.categoryLabel}
            categoryBadgeClass={group.categoryBadgeClass}
            completedCount={completedCount}
            totalCount={group.topics.length}
            description={group.description}
          >
            {/* List Container Wrapper */}
            <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl flex flex-col overflow-hidden">
              {group.topics.map((topic) => (
                <TopicRowItem key={topic.id} topic={topic} />
              ))}
            </div>
          </TopicGroupSection>
        );
      })}

      {filteredGroups.length === 0 && (
        <div className="text-center py-20 bg-[#141414] border border-neutral-800/80 rounded-2xl">
          <p className="text-sm text-neutral-400">
            No topics found for &ldquo;{selectedCategory}&rdquo;.
          </p>
        </div>
      )}
    </div>
  );
}
