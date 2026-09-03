'use client';

import { cn } from '@/lib/utils';

interface TabsProps {
  tabs: { label: string; value: string }[];
  activeTab: string;
  onTabChange: (value: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <div
      className={cn('flex items-center gap-1 border-b border-border-default', className)}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={activeTab === tab.value}
          onClick={() => onTabChange(tab.value)}
          className={cn(
            'px-3 py-2 text-sm font-medium transition-colors relative cursor-pointer',
            activeTab === tab.value
              ? 'text-text-primary'
              : 'text-text-tertiary hover:text-text-secondary'
          )}
        >
          {tab.label}
          {activeTab === tab.value && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
