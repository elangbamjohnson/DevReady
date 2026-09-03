'use client';

import Link from 'next/link';
import { Search, Bell, Sun } from 'lucide-react';

interface PublicHeaderProps {
  onSearchOpen?: () => void;
}

export function PublicHeader({ onSearchOpen }: PublicHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo & Brand */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-violet-500">
            <path d="M5 4L13 12L5 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 4L19 12L11 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-base font-bold text-white tracking-tight">
            SwiftPrep
          </span>
        </Link>

        {/* Center: Search Bar */}
        <button
          type="button"
          onClick={onSearchOpen}
          className="hidden sm:flex items-center justify-between w-72 md:w-96 px-4 py-1.5 rounded-lg bg-[#141414] border border-neutral-800 hover:border-neutral-700 text-neutral-400 text-sm transition-colors cursor-pointer group"
          aria-label="Search"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-neutral-500 group-hover:text-neutral-400 transition-colors" />
            <span className="text-sm text-neutral-500 group-hover:text-neutral-400">
              Search topics, questions...
            </span>
          </div>
          <span className="bg-neutral-800/80 text-neutral-400 text-[10px] px-1.5 py-0.5 rounded font-medium">
            ⌘K
          </span>
        </button>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
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
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            <Sun className="w-4 h-4" />
          </button>

          {/* Outline Bell icon (notifications) */}
          <button
            type="button"
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>

          {/* Sign in text */}
          <Link
            href="/dashboard"
            className="text-sm font-medium text-neutral-300 hover:text-white transition-colors hidden sm:block"
          >
            Sign in
          </Link>

          {/* Solid violet Start Learning button */}
          <Link href="/learn">
            <button className="bg-violet-500 hover:bg-violet-400 active:bg-violet-600 text-white font-medium text-sm rounded-lg px-4 py-2 transition-colors cursor-pointer">
              Start Learning
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
