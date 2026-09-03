'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { BottomNav } from './BottomNav';
import { SearchModal } from './SearchModal';

interface AppShellProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function AppShell({ children, showSidebar = true }: AppShellProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const isLanding = pathname === '/';

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  // ⌘K global shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-surface-0">
      <AppHeader onSearchOpen={openSearch} />

      <div className="flex">
        {showSidebar && !isLanding && <AppSidebar />}
        <main className="flex-1 min-w-0 pb-20 lg:pb-0">
          {children}
        </main>
      </div>

      {!isLanding && <BottomNav />}
      <SearchModal isOpen={searchOpen} onClose={closeSearch} />
    </div>
  );
}
