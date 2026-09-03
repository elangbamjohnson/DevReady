import Link from 'next/link';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { InterviewBlock } from '@/types';

const relevanceConfig = {
  high: { color: 'text-rose-400', bg: 'bg-rose-500/8', border: 'border-rose-500/20', label: 'High' },
  medium: { color: 'text-amber-400', bg: 'bg-amber-500/8', border: 'border-amber-500/20', label: 'Medium' },
  low: { color: 'text-text-tertiary', bg: 'bg-surface-2', border: 'border-border-default', label: 'Low' },
};

interface InterviewSectionProps {
  block: InterviewBlock;
  className?: string;
}

export function InterviewSection({ block, className }: InterviewSectionProps) {
  const { color, bg, border, label } = relevanceConfig[block.relevance];

  return (
    <section
      aria-label="Interview relevance"
      className={cn('mt-10 rounded-xl border p-5', bg, border, className)}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <MessageSquare className={cn('w-4 h-4 shrink-0', color)} aria-hidden="true" />
          <h2 className={cn('text-sm font-semibold', color)}>
            {block.title ?? 'Interview Questions'}
          </h2>
        </div>
        <span className={cn('text-xs px-2 py-0.5 rounded-full border font-medium', color, bg, border)}>
          {label} Relevance
        </span>
      </div>

      <ol className="space-y-2">
        {block.questions.map((q, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-xs text-text-tertiary tabular-nums mt-0.5 w-4 shrink-0">
              {i + 1}.
            </span>
            <p className="text-sm text-text-secondary leading-relaxed">{q}</p>
          </li>
        ))}
      </ol>

      <div className="mt-4 pt-4 border-t border-current/10">
        <Link
          href="/interview"
          className={cn(
            'inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded',
            color
          )}
        >
          Practice in Interview Mode
          <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

// ─── Compact Preview Card (for topic lists) ───────────────────────────────────

interface InterviewPreviewCardProps {
  question: string;
  category: string;
  difficulty: string;
  className?: string;
}

export function InterviewPreviewCard({ question, category, difficulty, className }: InterviewPreviewCardProps) {
  return (
    <div className={cn('p-4 rounded-xl border border-border-default bg-surface-1', className)}>
      <div className="flex items-center gap-1.5 mb-2">
        <MessageSquare className="w-3 h-3 text-text-tertiary" aria-hidden="true" />
        <span className="text-[10px] font-medium text-text-tertiary uppercase tracking-wider">
          Interview Question
        </span>
      </div>
      <p className="text-sm text-text-primary mb-3 leading-relaxed">{question}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-tertiary">{category}</span>
          <span className="text-xs text-text-tertiary">·</span>
          <span className="text-xs text-text-tertiary">{difficulty}</span>
        </div>
        <Link
          href="/interview"
          className="text-xs font-medium text-accent hover:text-accent-hover flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          Practice
          <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
