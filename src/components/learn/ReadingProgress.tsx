'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ReadingProgressProps {
  /** The element whose scroll triggers progress. Defaults to window. */
  targetId?: string;
  className?: string;
}

export function ReadingProgress({ targetId, className }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = targetId ? document.getElementById(targetId) : null;

    const calculate = () => {
      if (target) {
        const { scrollTop, scrollHeight, clientHeight } = target;
        const max = scrollHeight - clientHeight;
        setProgress(max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0);
      } else {
        const { scrollTop, scrollHeight } = document.documentElement;
        const clientHeight = window.innerHeight;
        const max = scrollHeight - clientHeight;
        setProgress(max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0);
      }
    };

    const el = target ?? window;
    el.addEventListener('scroll', calculate, { passive: true });
    calculate();
    return () => el.removeEventListener('scroll', calculate);
  }, [targetId]);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('fixed top-0 left-0 right-0 h-[2px] z-50', className)}
    >
      <div
        className="h-full bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
