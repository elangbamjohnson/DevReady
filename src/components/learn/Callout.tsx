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

// Inline formatter for callout content (handles inline code and bold)
function FormattedInline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
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
        const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
        return (
          <span key={i}>
            {boldParts.map((bp, j) => {
              if (bp.startsWith('**') && bp.endsWith('**')) {
                return (
                  <strong key={j} className="font-semibold text-text-primary">
                    {bp.slice(2, -2)}
                  </strong>
                );
              }
              return bp;
            })}
          </span>
        );
      })}
    </>
  );
}

function FormattedContent({ content }: { content: string }) {
  const sections = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2.5">
      {sections.map((section, sIdx) => {
        if (section.startsWith('```') && section.endsWith('```')) {
          const lines = section.slice(3, -3).trim().split('\n');
          const codeLines = (lines[0] === 'swift' || lines[0] === 'objc') ? lines.slice(1) : lines;
          return (
            <pre
              key={sIdx}
              className="p-3 my-2 rounded-lg bg-surface-2/80 border border-border-subtle font-mono text-xs text-text-primary overflow-x-auto"
            >
              <code>{codeLines.join('\n')}</code>
            </pre>
          );
        }

        const paragraphs = section.split('\n\n').filter((p) => p.trim().length > 0);
        return (
          <div key={sIdx} className="space-y-2">
            {paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-sm text-text-secondary leading-relaxed">
                <FormattedInline text={p} />
              </p>
            ))}
          </div>
        );
      })}
    </div>
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
          <p className={cn('text-xs font-semibold uppercase tracking-wider mb-1.5', labelColor)}>
            {label}
          </p>
          <FormattedContent content={content} />
        </div>
      </div>
    </aside>
  );
}
