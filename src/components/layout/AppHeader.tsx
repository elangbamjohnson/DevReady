// File: src/components/layout/AppHeader.tsx
// Method: AppHeader()

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, Sun, User } from 'lucide-react';

interface AppHeaderProps {
  onSearchOpen: () => void;
}

export function AppHeader({ onSearchOpen }: AppHeaderProps) {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A] border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo & Brand */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center font-bold text-white text-xs shadow-sm">
            SP
          </div>
          <span className="text-base font-bold text-white tracking-tight">
            SwiftPrep
          </span>
        </Link>

        {/* Center: Search Bar */}
        <button
          type="button"
          onClick={onSearchOpen}
          className="hidden sm:flex items-center justify-between w-72 md:w-84 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 text-sm transition-colors cursor-pointer group"
          aria-label="Search"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-neutral-400 group-hover:text-neutral-300 transition-colors" />
            <span className="text-xs text-neutral-400 group-hover:text-neutral-300">
              Search topics, questions...
            </span>
          </div>
          <span className="bg-neutral-800 text-neutral-400 text-xs px-1.5 py-0.5 rounded font-mono">
            ⌘K
          </span>
        </button>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Mobile search button */}
          <button
            type="button"
            onClick={onSearchOpen}
            className="sm:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Sun icon (theme) */}
          <button
            type="button"
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            <Sun className="w-4 h-4" />
          </button>

          {/* Outline Bell icon (notifications) */}
          <button
            type="button"
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" strokeWidth={1.75} />
          </button>

          {isLanding ? (
            <>
              {/* Sign in text */}
              <Link
                href="/dashboard"
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors hidden sm:block"
              >
                Sign in
              </Link>

              {/* Solid violet Start Learning button */}
              <Link href="/learn">
                <button className="bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-medium text-sm rounded-lg px-4 py-2 transition-colors cursor-pointer shadow-sm">
                  Start Learning
                </button>
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors"
              aria-label="Profile"
            >
              <User className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
