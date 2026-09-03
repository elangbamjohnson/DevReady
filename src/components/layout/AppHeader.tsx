// File: src/components/layout/AppHeader.tsx
// Method: export default function AppHeader({ onSearchOpen, onToggleSidebar, isLanding = false })

'use client';

import Link from 'next/link';
import { Search, Bell, Sun, Menu } from 'lucide-react';

interface AppHeaderProps {
  onSearchOpen: () => void;
  onToggleSidebar?: () => void;
  isLanding?: boolean;
}

export default function AppHeader({
  onSearchOpen,
  onToggleSidebar,
  isLanding = false,
}: AppHeaderProps) {
  if (isLanding) {
    return (
      <header className="sticky top-0 z-40 bg-black border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <svg
              className="w-5 h-5 text-violet-500 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4.5 3.5L14.5 12L4.5 20.5H9.5L19.5 12L9.5 3.5H4.5Z" />
            </svg>
            <span className="text-base font-bold text-white tracking-tight">
              SwiftPrep
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link href="/learn">
              <button className="bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-medium text-sm rounded-lg px-4 py-2 transition-colors cursor-pointer shadow-sm">
                Start Learning
              </button>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 bg-[#18181b] border-b border-neutral-800/80 h-14">
      <div className="h-full px-4 sm:px-5 flex items-center justify-between gap-4">
        {/* Left: Burger Menu + Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          {/* Hamburger menu button placed directly adjacent to sidebar */}
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer shrink-0 -ml-1"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" strokeWidth={1.75} />
          </button>

          {/* Search bar with rounded-lg shape, recessed #09090b bg, and ⌘K badge */}
          <button
            type="button"
            onClick={onSearchOpen}
            className="flex items-center justify-between w-72 sm:w-80 md:w-96 px-3 py-1.5 rounded-lg bg-[#09090b] border border-neutral-800 hover:border-neutral-700 text-neutral-400 text-xs transition-colors cursor-pointer group"
            aria-label="Search"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-300 shrink-0" />
              <span className="text-xs text-neutral-400 group-hover:text-neutral-300 truncate">
                Search topics, questions...
              </span>
            </div>
            <span className="bg-neutral-800/90 text-neutral-400 text-[10px] px-1.5 py-0.5 rounded border border-neutral-700/60 font-mono shrink-0 ml-2">
              ⌘K
            </span>
          </button>
        </div>

        {/* Right: Sun Toggle, Bell with purple dot, AC Avatar */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Sun icon (theme toggle) */}
          <button
            type="button"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            <Sun className="w-4 h-4" strokeWidth={1.75} />
          </button>

          {/* Bell icon with purple notification dot badge */}
          <button
            type="button"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" strokeWidth={1.75} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-violet-400 rounded-full" />
          </button>

          {/* AC text avatar */}
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors tracking-wide px-1 py-1"
            aria-label="Profile"
          >
            AC
          </Link>
        </div>
      </div>
    </header>
  );
}

export { AppHeader };
