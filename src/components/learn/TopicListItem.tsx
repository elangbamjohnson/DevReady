'use client';

import Link from 'next/link';
import { ChevronRight, Clock, CheckCircle2 } from 'lucide-react';
import { DifficultyBadge } from '@/components/common/Badge';
import { useIsTopicComplete } from '@/lib/progressStore';
import { cn } from '@/lib/utils';
import type { ArticleTopic, TopicCategory, InterviewRelevance } from '@/types';

const interviewRelevanceConfig: Record<InterviewRelevance, { label: string; color: string; bg: string; border: string }> = {
  high: { label: 'High', color: 'text-rose-400', bg: 'bg-rose-500/8', border: 'border-rose-500/20' },
  medium: { label: 'Med', color: 'text-amber-400', bg: 'bg-amber-500/8', border: 'border-amber-500/20' },
  low: { label: 'Low', color: 'text-text-tertiary', bg: 'bg-surface-2', border: 'border-border-default' },
};

interface TopicListItemProps {
  topic: ArticleTopic;
  category: TopicCategory;
  className?: string;
}

export function TopicListItem({ topic, category, className }: TopicListItemProps) {
  const completed = useIsTopicComplete(topic.id);

  const relevance = topic.interviewRelevance
    ? interviewRelevanceConfig[topic.interviewRelevance]
    : null;

  return (
    <Link
      href={`/learn/${category}/${topic.slug}`}
      className={cn(
        'flex items-center gap-3.5 px-4 py-3.5 hover:bg-surface-1 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset',
        className
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
            {topic.title}
          </span>
          <DifficultyBadge level={topic.difficulty} />
          {topic.version && (
            <span className="text-[10px] text-emerald-400 bg-emerald-500/8 border border-emerald-500/20 px-1.5 py-0.5 rounded-full font-medium">
              {topic.version.language ?? topic.version.platform} {topic.version.version}
            </span>
          )}
        </div>
        <p className="text-xs text-text-tertiary line-clamp-1 leading-relaxed">{topic.description}</p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {/* Completion status */}
        {completed ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/8 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
            <span className="hidden sm:inline">Completed</span>
          </span>
        ) : (
          <span className="text-[11px] text-text-tertiary hidden sm:inline">
            Not started
          </span>
        )}

        {/* Interview Relevance */}
        {relevance && (
          <span className={cn('text-[10px] px-2 py-0.5 rounded-full border font-medium hidden md:inline-flex', relevance.color, relevance.bg, relevance.border)}>
            Interview: {relevance.label}
          </span>
        )}

        {/* Estimated reading time */}
        <span className="text-xs text-text-tertiary tabular-nums hidden sm:flex items-center gap-1">
          <Clock className="w-3 h-3" aria-hidden="true" />
          {topic.estimatedTime}m
        </span>

        <ChevronRight className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
      </div>
    </Link>
  );
}
