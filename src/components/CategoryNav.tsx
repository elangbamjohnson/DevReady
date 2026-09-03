// File: src/components/CategoryNav.tsx
// Method: export default function CategoryNav()

'use client';

import { cn } from '@/lib/utils';

export interface CategoryNavProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
  className?: string;
}

const CATEGORIES = [
  'All',
  'Swift',
  'SwiftUI',
  'UIKit',
  'Objective-C',
  'Concurrency',
  'Architecture',
] as const;

export default function CategoryNav({
  activeCategory = 'All',
  onSelectCategory,
  className,
}: CategoryNavProps) {
  return (
    <nav
      aria-label="Filter topics by category"
      className={cn('flex flex-row gap-3 overflow-x-auto py-6 mb-4 no-scrollbar', className)}
    >
      {CATEGORIES.map((category) => {
        const isActive = activeCategory.toLowerCase() === category.toLowerCase();
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory?.(category)}
            className={cn(
              'cursor-pointer whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all',
              isActive
                ? 'bg-violet-900/20 text-violet-400 border border-violet-800/50'
                : 'bg-neutral-800/40 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/50 border border-transparent'
            )}
          >
            {category}
          </button>
        );
      })}
    </nav>
  );
}
