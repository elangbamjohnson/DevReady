'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { setTopicProgress } from '@/lib/progressStore';

interface ReadingProgressProps {
  /** The element whose scroll triggers progress. Defaults to window. */
  targetId?: string;
  className?: string;
  topicId?: string;
}

export function ReadingProgress({ targetId, className, topicId }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const target = targetId ? document.getElementById(targetId) : null;

    const calculate = (shouldSave: boolean) => {
      let pct = 0;
      if (target) {
        const { scrollTop, scrollHeight, clientHeight } = target;
        const max = scrollHeight - clientHeight;
        pct = max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0;
      } else {
        const { scrollTop, scrollHeight } = document.documentElement;
        const clientHeight = window.innerHeight;
        const max = scrollHeight - clientHeight;
        pct = max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0;
      }
      setProgress(pct);

      if (shouldSave && topicId) {
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
          setTopicProgress(topicId, pct);
        }, 150);
      }
    };

    const handleScroll = () => {
      calculate(true);
    };

    const el = target ?? window;
    el.addEventListener('scroll', handleScroll, { passive: true });

    // Initial calculation for visual state only, do not save to store on mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const initialScroll = target ? target.scrollTop : (window.scrollY || document.documentElement.scrollTop);
      if (initialScroll > 0) {
        calculate(false);
      }
    }

    return () => {
      el.removeEventListener('scroll', handleScroll);
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [targetId, topicId]);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      suppressHydrationWarning
      className={cn('fixed top-0 left-0 right-0 h-[2px] z-50', className)}
    >
      <div
        className="h-full bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
