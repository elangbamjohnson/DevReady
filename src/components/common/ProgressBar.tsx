'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  color?: string;
}

export function ProgressBar({
  percentage,
  label,
  showPercentage = true,
  size = 'md',
  className,
  color,
}: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(() => {
      setWidth(percentage);
    });
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [percentage]);

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-sm font-medium text-text-primary">{label}</span>
          )}
          {showPercentage && (
            <span className="text-xs text-text-tertiary tabular-nums">{percentage}%</span>
          )}
        </div>
      )}
      <div
        className={cn(
          'w-full rounded-full bg-surface-3 overflow-hidden',
          size === 'sm' ? 'h-1.5' : 'h-2'
        )}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${width}%`,
            backgroundColor: color || 'var(--accent)',
          }}
        />
      </div>
    </div>
  );
}
