import { cn } from '@/lib/utils';
import type { VersionMetadata } from '@/types';

interface VersionBadgeProps {
  version: VersionMetadata;
  className?: string;
}

const statusStyles: Record<string, { text: string; bg: string; border: string; dot: string }> = {
  current: {
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/8',
    border: 'border-emerald-500/20',
    dot: 'bg-emerald-400',
  },
  updated: {
    text: 'text-blue-400',
    bg: 'bg-blue-500/8',
    border: 'border-blue-500/20',
    dot: 'bg-blue-400',
  },
  beta: {
    text: 'text-amber-400',
    bg: 'bg-amber-500/8',
    border: 'border-amber-500/20',
    dot: 'bg-amber-400',
  },
  deprecated: {
    text: 'text-rose-400',
    bg: 'bg-rose-500/8',
    border: 'border-rose-500/20',
    dot: 'bg-rose-400',
  },
  introduced: {
    text: 'text-violet-400',
    bg: 'bg-violet-500/8',
    border: 'border-violet-500/20',
    dot: 'bg-violet-400',
  },
};

export function VersionBadge({ version, className }: VersionBadgeProps) {
  const style = statusStyles[version.status] ?? statusStyles.current;
  const label = version.language
    ? `${version.language} ${version.version}`
    : `${version.platform ?? 'iOS'} ${version.version}`;

  const statusLabel = version.status === 'introduced'
    ? `Introduced in ${version.introducedIn ?? label}`
    : version.status.charAt(0).toUpperCase() + version.status.slice(1);

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <span
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium',
          style.bg,
          style.border,
          style.text
        )}
      >
        <span className={cn('w-1.5 h-1.5 rounded-full', style.dot)} aria-hidden="true" />
        {label}
      </span>
      {version.status !== 'current' && (
        <span className={cn('text-xs', style.text)}>{statusLabel}</span>
      )}
    </div>
  );
}
