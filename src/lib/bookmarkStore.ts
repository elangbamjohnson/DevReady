/**
 * Bookmark Store — client-side localStorage abstraction for bookmarks.
 * Phase 4 can replace implementation with API without changing call sites.
 */

import type { Bookmark } from '@/types';

const STORAGE_KEY = 'swiftcraft_bookmarks';

function safeGetAll(): Record<string, Bookmark> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, Bookmark>) : {};
  } catch {
    return {};
  }
}

function safeSet(data: Record<string, Bookmark>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Quota or private mode — fail silently
  }
}

export function getBookmarks(): Bookmark[] {
  return Object.values(safeGetAll()).sort(
    (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
  );
}

export function isBookmarked(id: string): boolean {
  return id in safeGetAll();
}

export function addBookmark(bookmark: Omit<Bookmark, 'savedAt'>): void {
  const all = safeGetAll();
  all[bookmark.id] = { ...bookmark, savedAt: new Date().toISOString() };
  safeSet(all);
}

export function removeBookmark(id: string): void {
  const all = safeGetAll();
  delete all[id];
  safeSet(all);
}

export function toggleBookmark(bookmark: Omit<Bookmark, 'savedAt'>): boolean {
  if (isBookmarked(bookmark.id)) {
    removeBookmark(bookmark.id);
    return false;
  } else {
    addBookmark(bookmark);
    return true;
  }
}
