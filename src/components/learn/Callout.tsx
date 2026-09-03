'use client';

import { cn } from '@/lib/utils';
import { Info, Lightbulb, AlertTriangle, AlertCircle, MessageSquare } from 'lucide-react';
import type { CalloutVariant } from '@/types';

interface CalloutProps {
  variant: CalloutVariant;
  title?: string;
  content: string;
  className?: string;
}

const config: Record<CalloutVariant, {
  icon: typeof Info;
  bg: string;
  border: string;
  iconColor: string;
  labelColor: string;
  defaultTitle: string;
}> = {
  info: {
    icon: Info,
    bg: 'bg-blue-500/8',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
    labelColor: 'text-blue-400',
    defaultTitle: 'Note',
  },
  tip: {
    icon: Lightbulb,
    bg: 'bg-emerald-500/8',
    border: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
    labelColor: 'text-emerald-400',
    defaultTitle: 'Tip',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-500/8',
    border: 'border-amber-500/20',
    iconColor: 'text-amber-400',
    labelColor: 'text-amber-400',
    defaultTitle: 'Warning',
  },
  important: {
    icon: AlertCircle,
    bg: 'bg-rose-500/8',
    border: 'border-rose-500/20',
    iconColor: 'text-rose-400',
    labelColor: 'text-rose-400',
    defaultTitle: 'Important',
  },
  interview: {
    icon: MessageSquare,
    bg: 'bg-violet-500/8',
    border: 'border-violet-500/20',
    iconColor: 'text-violet-400',
    labelColor: 'text-violet-400',
    defaultTitle: 'Interview',
  },
};

// Inline `code` parser for callout content
function FormattedContent({ content }: { content: string }) {
  const parts = content.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="px-1 py-0.5 rounded bg-white/10 font-mono text-xs">
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function Callout({ variant, title, content, className }: CalloutProps) {
  const { icon: Icon, bg, border, iconColor, labelColor, defaultTitle } = config[variant];
  const label = title ?? defaultTitle;

  return (
    <aside
      className={cn('my-6 rounded-xl border px-4 py-3.5', bg, border, className)}
      aria-label={`${label} callout`}
    >
      <div className="flex gap-3">
        <Icon className={cn('w-4 h-4 mt-0.5 shrink-0', iconColor)} aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className={cn('text-xs font-semibold uppercase tracking-wider mb-1', labelColor)}>
            {label}
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            <FormattedContent content={content} />
          </p>
        </div>
      </div>
    </aside>
  );
}
