'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, MessageSquare, BarChart3, Search } from 'lucide-react';
import { MOBILE_NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const iconMap = { Home, BookOpen, MessageSquare, BarChart3, Search } as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border-default bg-surface-0/90 backdrop-blur-md"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-center justify-around h-14 px-2">
        {MOBILE_NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors',
                  isActive
                    ? 'text-accent'
                    : 'text-text-tertiary hover:text-text-secondary'
                )}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
