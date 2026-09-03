// File: src/components/CategoryNav.tsx
// Method: export default function CategoryNav()

'use client';

import { cn } from '@/lib/utils';
import { CURRICULUM_DOMAINS } from '@/data/curriculum';

export interface CategoryNavProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
  className?: string;
}

const CATEGORIES = [
  'All',
  ...CURRICULUM_DOMAINS.map((d) => d.shortTitle),
];

export default function CategoryNav({
  activeCategory = 'All',
  onSelectCategory,
  className,
}: CategoryNavProps) {
  return (
    <nav
      aria-label="Filter topics by category"
      className={cn('flex flex-row gap-2.5 overflow-x-auto py-5 mb-4 no-scrollbar scroll-smooth', className)}
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
              'cursor-pointer whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-all shrink-0',
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
