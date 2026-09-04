/**
 * Progress Store — client-side localStorage abstraction for reading progress.
 * Components use this instead of touching localStorage directly.
 * Phase 4 can replace the implementation with an API without changing call sites.
 */

import { useSyncExternalStore, useCallback } from 'react';
import type { LocalProgressRecord } from '@/types';

const STORAGE_KEY = 'swiftcraft_progress';

type Listener = () => void;
const listeners = new Set<Listener>();

function notify(): void {
  listeners.forEach((l) => l());
}

export function subscribeProgress(listener: Listener): () => void {
  listeners.add(listener);
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', listener);
  }
  return () => {
    listeners.delete(listener);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', listener);
    }
  };
}

function safeGetAll(): Record<string, LocalProgressRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, LocalProgressRecord>) : {};
  } catch {
    return {};
  }
}

function safeSet(data: Record<string, LocalProgressRecord>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage quota exceeded or private mode — fail silently
  }
}

export function getAllProgress(): Record<string, LocalProgressRecord> {
  return safeGetAll();
}

export function getTopicProgress(topicId: string): LocalProgressRecord | null {
  return safeGetAll()[topicId] ?? null;
}

export function setTopicProgress(topicId: string, progress: number): void {
  const all = safeGetAll();
  const existing = all[topicId];
  all[topicId] = {
    topicId,
    completed: existing?.completed ?? false,
    progress: Math.min(100, Math.max(0, Math.round(progress))),
    lastViewedAt: new Date().toISOString(),
  };
  safeSet(all);
  notify();
}

export function markTopicComplete(topicId: string): void {
  const all = safeGetAll();
  all[topicId] = {
    topicId,
    completed: true,
    progress: 100,
    lastViewedAt: new Date().toISOString(),
  };
  safeSet(all);
  notify();
}

export function isTopicComplete(topicId: string): boolean {
  return safeGetAll()[topicId]?.completed ?? false;
}

let cachedProgressRaw = '';
let cachedCompletedIds: string[] = [];

export function getCompletedTopicIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || '';
    if (raw !== cachedProgressRaw) {
      cachedProgressRaw = raw;
      const all = raw ? (JSON.parse(raw) as Record<string, LocalProgressRecord>) : {};
      cachedCompletedIds = Object.keys(all).filter((id) => all[id]?.completed);
    }
  } catch {
    return [];
  }
  return cachedCompletedIds;
}

const emptyStringArray: string[] = [];
function getServerCompletedTopicIds(): string[] {
  return emptyStringArray;
}

export function useCompletedTopicIds(): string[] {
  return useSyncExternalStore(
    subscribeProgress,
    getCompletedTopicIds,
    getServerCompletedTopicIds
  );
}

function getServerBoolean(): boolean {
  return false;
}

export function useIsTopicComplete(topicId: string): boolean {
  const getSnapshot = useCallback(() => isTopicComplete(topicId), [topicId]);
  return useSyncExternalStore(subscribeProgress, getSnapshot, getServerBoolean);
}
