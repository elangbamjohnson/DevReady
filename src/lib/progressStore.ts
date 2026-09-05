/**
 * Progress Store — client-side localStorage abstraction for reading progress.
 * Components use this instead of touching localStorage directly.
 * Phase 4 can replace the implementation with an API without changing call sites.
 */

import { useSyncExternalStore, useCallback } from 'react';
import type { LocalProgressRecord } from '@/types';
import { topicRepository } from '@/data/topics/index';
import { curriculumRepository } from '@/data/curriculum';

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

export function setTopicProgress(
  topicId: string,
  progressOrData: number | Partial<LocalProgressRecord>
): void {
  const all = safeGetAll();
  const existing = all[topicId];
  if (typeof progressOrData === 'number') {
    all[topicId] = {
      topicId,
      completed: existing?.completed ?? false,
      progress: Math.min(100, Math.max(0, Math.round(progressOrData))),
      lastViewedAt: new Date().toISOString(),
    };
  } else {
    all[topicId] = {
      topicId,
      completed: progressOrData.completed ?? existing?.completed ?? false,
      progress:
        progressOrData.progress !== undefined
          ? Math.min(100, Math.max(0, Math.round(progressOrData.progress)))
          : existing?.progress ?? 0,
      lastViewedAt: progressOrData.lastViewedAt ?? new Date().toISOString(),
    };
  }
  safeSet(all);
  notify();
}

export function recordTopicView(topicId: string): void {
  const existing = getTopicProgress(topicId);
  setTopicProgress(topicId, {
    ...existing,
    lastViewedAt: new Date().toISOString(),
  });
}

export function getLastViewedTopic(): { topicId: string; category: string; slug: string } | null {
  const allProgress = safeGetAll();

  const sorted = Object.entries(allProgress)
    .filter(([, data]) => Boolean(data?.lastViewedAt))
    .sort((a, b) => new Date(b[1].lastViewedAt).getTime() - new Date(a[1].lastViewedAt).getTime());

  if (sorted.length === 0) return null;

  const [topicId] = sorted[0];

  const artTopic = topicRepository.getTopicById(topicId);
  if (artTopic) {
    return { topicId, category: artTopic.category, slug: artTopic.slug };
  }

  const currTopic = curriculumRepository.getTopicById(topicId);
  if (currTopic) {
    return { topicId, category: currTopic.domainId, slug: currTopic.slug };
  }

  return null;
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
