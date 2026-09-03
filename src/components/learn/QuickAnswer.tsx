import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';

interface QuickAnswerProps {
  content: string;
  className?: string;
}

export function QuickAnswer({ content, className }: QuickAnswerProps) {
  return (
    <aside
      aria-label="Quick Answer"
      className={cn(
        'my-6 rounded-xl border border-accent/25 bg-accent/6 p-5',
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <Zap className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
        <span className="text-xs font-semibold text-accent uppercase tracking-wider">
          Quick Answer
        </span>
      </div>
      <p className="text-sm sm:text-base text-text-primary leading-relaxed font-medium">
        {content}
      </p>
    </aside>
  );
}
