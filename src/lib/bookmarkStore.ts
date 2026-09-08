import { useSyncExternalStore, useCallback } from 'react';
import type { Bookmark } from '@/types';

const STORAGE_KEY = 'swiftcraft_bookmarks';

type Listener = () => void;
const listeners = new Set<Listener>();

function notify(): void {
  listeners.forEach((fn) => fn());
}

export function subscribeBookmarks(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

let isClientMounted = false;
const subscribeMounted = (onStoreChange: () => void) => {
  if (!isClientMounted) {
    isClientMounted = true;
    queueMicrotask(onStoreChange);
  }
  return () => {};
};

export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribeMounted,
    () => isClientMounted,
    () => false
  );
}

function safeGetAll(): Record<string, Bookmark> {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
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

let cachedBookmarksRaw = '';
let cachedBookmarksList: Bookmark[] = [];

export function getBookmarks(): Bookmark[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || '';
    if (raw !== cachedBookmarksRaw) {
      cachedBookmarksRaw = raw;
      const all = raw ? (JSON.parse(raw) as Record<string, Bookmark>) : {};
      cachedBookmarksList = Object.values(all).sort(
        (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
      );
    }
  } catch {
    return [];
  }
  return cachedBookmarksList;
}

export function isBookmarked(id: string): boolean {
  return id in safeGetAll();
}

export function addBookmark(bookmark: Omit<Bookmark, 'savedAt'>): void {
  const all = safeGetAll();
  all[bookmark.id] = { ...bookmark, savedAt: new Date().toISOString() };
  safeSet(all);
  notify();
}

export function removeBookmark(id: string): void {
  const all = safeGetAll();
  delete all[id];
  safeSet(all);
  notify();
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

const emptyBookmarks: Bookmark[] = [];
function getServerBookmarks(): Bookmark[] {
  return emptyBookmarks;
}

export function useBookmarks(): Bookmark[] {
  return useSyncExternalStore(subscribeBookmarks, getBookmarks, getServerBookmarks);
}

function getServerBoolean(): boolean {
  return false;
}

export function useIsBookmarked(id: string): boolean {
  const getSnapshot = useCallback(() => isBookmarked(id), [id]);
  return useSyncExternalStore(subscribeBookmarks, getSnapshot, getServerBoolean);
}
