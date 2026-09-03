// File: src/components/layout/AppShell.tsx
// Method: export default function AppShell({ children, showSidebar = true })

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

export default function AppShell({ children, showSidebar = true }: AppShellProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const isLanding = pathname === '/';

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const toggleSidebar = useCallback(
    () => setIsSidebarCollapsed((prev) => !prev),
    []
  );

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

  if (isLanding) {
    return (
      <div className="min-h-screen bg-[#09090b]">
        <AppHeader isLanding onSearchOpen={openSearch} />
        <main className="min-w-0">{children}</main>
        <SearchModal isOpen={searchOpen} onClose={closeSearch} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex">
      {/* Sidebar spanning from y=0 with continuous right border */}
      {showSidebar && (
        <AppSidebar isCollapsed={isSidebarCollapsed} />
      )}

      {/* Main Column: Header on top, followed by main content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#09090b]">
        <AppHeader
          onSearchOpen={openSearch}
          onToggleSidebar={toggleSidebar}
        />
        <main className="flex-1 min-w-0 pb-20 lg:pb-0 bg-[#09090b]">
          {children}
        </main>
      </div>

      <BottomNav />
      <SearchModal isOpen={searchOpen} onClose={closeSearch} />
    </div>
  );
}

export { AppShell };
