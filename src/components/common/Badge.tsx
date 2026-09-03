import { cn, difficultyBg, difficultyLabel, categoryLabel } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md',
        variant === 'default'
          ? 'bg-surface-2 text-text-secondary border border-border-subtle'
          : 'border border-border-default text-text-secondary',
        className
      )}
    >
      {children}
    </span>
  );
}

export function DifficultyBadge({ level, className }: { level: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border',
        difficultyBg(level),
        className
      )}
    >
      {difficultyLabel(level)}
    </span>
  );
}

export function CategoryBadge({ category, className }: { category: string; className?: string }) {
  return (
    <Badge variant="outline" className={className}>
      {categoryLabel(category)}
    </Badge>
  );
}
