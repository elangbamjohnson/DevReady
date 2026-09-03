'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
  sublabel?: string;
  color?: string;
}

export function ProgressRing({
  percentage,
  size = 120,
  strokeWidth = 8,
  className,
  label,
  sublabel,
  color = 'var(--accent)',
}: ProgressRingProps) {
  const [animatedOffset, setAnimatedOffset] = useState<number | null>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(() => {
      setAnimatedOffset(offset);
    });
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [offset]);

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border-default)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animatedOffset ?? circumference}
          className="progress-ring-circle"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label ? (
          <>
            <span className="text-2xl font-semibold text-text-primary">{label}</span>
            {sublabel && (
              <span className="text-xs text-text-tertiary mt-0.5">{sublabel}</span>
            )}
          </>
        ) : (
          <span className="text-2xl font-semibold text-text-primary">{percentage}%</span>
        )}
      </div>
    </div>
  );
}
