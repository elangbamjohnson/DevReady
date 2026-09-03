'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  MessageSquare,
  Zap,
  Bookmark,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import { NAV_ITEMS, SIDEBAR_TOPICS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const iconMap = {
  Home,
  BookOpen,
  MessageSquare,
  Zap,
  Bookmark,
  BarChart3,
} as const;

const categoryIcons: Record<string, string> = {
  swift: 'S',
  swiftui: 'SU',
  uikit: 'UK',
  objc: 'OC',
  concurrency: 'Co',
  architecture: 'Ar',
};

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-56 xl:w-60 border-r border-border-default bg-surface-0 h-[calc(100vh-64px)] sticky top-16 shrink-0 overflow-y-auto">
      <nav className="flex-1 py-3 px-3">
        {/* Main nav */}
        <ul className="space-y-0.5" role="navigation" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors',
                    isActive
                      ? 'bg-accent-muted text-accent font-medium'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
                  )}
                >
                  {Icon && <Icon className="w-4 h-4 shrink-0" />}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Divider + Topics */}
        <div className="mt-6 mb-2 px-2.5">
          <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">
            Topics
          </span>
        </div>
        <ul className="space-y-0.5">
          {SIDEBAR_TOPICS.map((topic) => (
            <li key={topic.category}>
              <Link
                href={`/learn/${topic.category}`}
                className={cn(
                  'flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors',
                  'text-text-secondary hover:text-text-primary hover:bg-surface-2'
                )}
              >
                <span className="w-5 h-5 rounded text-[9px] font-bold bg-surface-2 border border-border-default flex items-center justify-center text-text-tertiary shrink-0">
                  {categoryIcons[topic.category]}
                </span>
                {topic.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="border-t border-border-default py-3 px-3 space-y-0.5">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        <button
          className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </div>
    </aside>
  );
}
