import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  as?: 'div' | 'article' | 'section';
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4 sm:p-5',
  lg: 'p-5 sm:p-6',
};

export function Card({
  children,
  className,
  hover = false,
  padding = 'md',
  as: Component = 'div',
}: CardProps) {
  return (
    <Component
      className={cn(
        'rounded-xl border border-border-default bg-surface-1 transition-all duration-200',
        hover && 'hover:border-border-default/80 hover:bg-surface-2/50 cursor-pointer',
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </Component>
  );
}
