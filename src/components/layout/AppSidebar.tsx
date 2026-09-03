// File: src/components/layout/AppSidebar.tsx
// Method: export default function AppSidebar({ isCollapsed })

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
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const iconMap = {
  Home,
  BookOpen,
  MessageSquare,
  Zap,
  Bookmark,
  BarChart3,
} as const;

// Custom badges and topic indicators matching screenshot exactly
const navBadges: Record<string, string> = {
  Interview: '3',
  Bookmarks: '5',
};

const TOPICS = [
  {
    label: 'Swift',
    category: 'swift',
    dot: <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />,
  },
  {
    label: 'SwiftUI',
    category: 'swiftui',
    dot: <span className="w-1.5 h-1.5 rounded-full ring-1 ring-sky-400 shrink-0" />,
  },
  {
    label: 'UIKit',
    category: 'uikit',
    dot: <span className="w-1.5 h-1.5 rounded-[1px] bg-violet-400 shrink-0" />,
  },
  {
    label: 'Objective-C',
    category: 'objc',
    dot: <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />,
  },
  {
    label: 'Concurrency',
    category: 'concurrency',
    dot: <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />,
  },
  {
    label: 'Architecture',
    category: 'architecture',
    dot: <span className="w-2 h-1 rounded-xs bg-neutral-500 shrink-0" />,
  },
];

interface AppSidebarProps {
  isCollapsed?: boolean;
}

export default function AppSidebar({ isCollapsed = false }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col border-r border-neutral-800/80 bg-[#18181b] h-screen sticky top-0 shrink-0 overflow-hidden transition-all duration-300 ease-in-out select-none',
        isCollapsed ? 'w-[68px]' : 'w-60'
      )}
    >
      {/* Top: SwiftPrep Logo Area (Inside Sidebar) */}
      <div
        className={cn(
          'h-14 flex items-center shrink-0 transition-all duration-300',
          isCollapsed ? 'justify-center px-2' : 'px-5'
        )}
      >
        <Link href="/dashboard" className="flex items-center gap-2.5">
          {/* Stylized Purple Chevron Logo */}
          <svg
            className="w-5 h-5 text-violet-500 shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4.5 3.5L14.5 12L4.5 20.5H9.5L19.5 12L9.5 3.5H4.5Z" />
          </svg>
          <span
            className={cn(
              'text-base font-bold text-white tracking-tight transition-all duration-300 whitespace-nowrap',
              isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 w-auto block'
            )}
          >
            SwiftPrep
          </span>
        </Link>
      </div>

      {/* Navigation items list */}
      <nav className="flex-1 py-2 overflow-y-auto overflow-x-hidden no-scrollbar">
        {/* Main nav items */}
        <ul
          className={cn('space-y-0.5', isCollapsed ? 'px-2' : 'px-3')}
          role="navigation"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            const badge = navBadges[item.label];

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  title={isCollapsed ? item.label : undefined}
                  className={cn(
                    'flex items-center py-2 rounded-lg text-sm transition-colors group',
                    isCollapsed
                      ? 'justify-center px-2'
                      : 'justify-start px-3 gap-3',
                    isActive
                      ? 'bg-violet-950/40 text-violet-400 font-medium'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
                  )}
                >
                  {Icon && (
                    <Icon
                      className={cn(
                        'w-4 h-4 shrink-0 transition-colors',
                        isActive ? 'text-violet-400' : 'text-neutral-400 group-hover:text-neutral-200'
                      )}
                      strokeWidth={1.75}
                    />
                  )}
                  <span
                    className={cn(
                      'transition-all duration-300 whitespace-nowrap',
                      isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 w-auto block'
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Notification count badge if present */}
                  {!isCollapsed && badge && (
                    <span className="ml-auto text-xs font-semibold text-violet-400 font-mono">
                      {badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* TOPICS Section */}
        <div className="mt-6 mb-2">
          {!isCollapsed ? (
            <div className="px-5 mb-1.5">
              <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                Topics
              </span>
            </div>
          ) : (
            <div className="w-6 mx-auto border-t border-neutral-800/80 mb-2" />
          )}

          <ul className={cn('space-y-0.5', isCollapsed ? 'px-2' : 'px-3')}>
            {TOPICS.map((topic) => {
              const isActive = pathname.startsWith(`/learn/${topic.category}`);
              return (
                <li key={topic.category}>
                  <Link
                    href={`/learn/${topic.category}`}
                    title={isCollapsed ? topic.label : undefined}
                    className={cn(
                      'flex items-center py-1.5 rounded-lg text-sm transition-colors group',
                      isCollapsed
                        ? 'justify-center px-2'
                        : 'justify-start px-3 gap-3',
                      isActive
                        ? 'text-white font-medium bg-neutral-900/70'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
                    )}
                  >
                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                      {topic.dot}
                    </div>
                    <span
                      className={cn(
                        'transition-all duration-300 whitespace-nowrap text-xs',
                        isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 w-auto block'
                      )}
                    >
                      {topic.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Bottom actions: Settings & Log out */}
      <div
        className={cn(
          'border-t border-neutral-800/80 py-3 space-y-0.5 shrink-0',
          isCollapsed ? 'px-2' : 'px-3'
        )}
      >
        <Link
          href="/dashboard"
          title={isCollapsed ? 'Settings' : undefined}
          className={cn(
            'flex items-center py-2 rounded-lg text-sm text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60 transition-colors',
            isCollapsed ? 'justify-center px-2' : 'justify-start px-3 gap-3'
          )}
        >
          <Settings className="w-4 h-4 shrink-0" strokeWidth={1.75} />
          <span
            className={cn(
              'transition-all duration-300 whitespace-nowrap',
              isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 w-auto block'
            )}
          >
            Settings
          </span>
        </Link>

        <Link
          href="/"
          title={isCollapsed ? 'Log out' : undefined}
          className={cn(
            'w-full flex items-center py-2 rounded-lg text-sm text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60 transition-colors cursor-pointer',
            isCollapsed ? 'justify-center px-2' : 'justify-start px-3 gap-3'
          )}
        >
          <LogOut className="w-4 h-4 shrink-0" strokeWidth={1.75} />
          <span
            className={cn(
              'transition-all duration-300 whitespace-nowrap',
              isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 w-auto block'
            )}
          >
            Log out
          </span>
        </Link>
      </div>
    </aside>
  );
}

export { AppSidebar };
