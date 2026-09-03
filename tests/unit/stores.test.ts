import { describe, it, expect, beforeEach } from 'vitest';
import {
  getAllProgress,
  getTopicProgress,
  setTopicProgress,
  markTopicComplete,
  isTopicComplete,
} from '@/lib/progressStore';
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
  isBookmarked,
  toggleBookmark,
} from '@/lib/bookmarkStore';

describe('Progress Store', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns empty progress initially', () => {
    expect(getAllProgress()).toEqual({});
    expect(getTopicProgress('concurrency-actors')).toBeNull();
    expect(isTopicComplete('concurrency-actors')).toBe(false);
  });

  it('sets and updates topic progress clamped between 0 and 100', () => {
    setTopicProgress('concurrency-actors', 45.6);
    let record = getTopicProgress('concurrency-actors');
    expect(record).not.toBeNull();
    expect(record?.progress).toBe(46);
    expect(record?.completed).toBe(false);

    // Clamp over 100
    setTopicProgress('concurrency-actors', 150);
    record = getTopicProgress('concurrency-actors');
    expect(record?.progress).toBe(100);

    // Clamp below 0
    setTopicProgress('concurrency-actors', -20);
    record = getTopicProgress('concurrency-actors');
    expect(record?.progress).toBe(0);
  });

  it('marks topic as complete and sets progress to 100', () => {
    markTopicComplete('swift-optionals');
    expect(isTopicComplete('swift-optionals')).toBe(true);

    const record = getTopicProgress('swift-optionals');
    expect(record?.completed).toBe(true);
    expect(record?.progress).toBe(100);
  });
});

describe('Bookmark Store', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  const sampleBookmark = {
    id: 'swift-optionals',
    title: 'Optionals in Swift',
    category: 'swift' as const,
    type: 'topic' as const,
    description: 'Learn optionals in Swift',
    href: '/learn/swift/optionals',
  };

  it('adds and retrieves bookmarks', () => {
    expect(getBookmarks()).toEqual([]);
    expect(isBookmarked('swift-optionals')).toBe(false);

    addBookmark(sampleBookmark);
    expect(isBookmarked('swift-optionals')).toBe(true);

    const all = getBookmarks();
    expect(all).toHaveLength(1);
    expect(all[0].id).toBe('swift-optionals');
    expect(all[0].savedAt).toBeDefined();
  });

  it('removes bookmark correctly', () => {
    addBookmark(sampleBookmark);
    expect(isBookmarked('swift-optionals')).toBe(true);

    removeBookmark('swift-optionals');
    expect(isBookmarked('swift-optionals')).toBe(false);
    expect(getBookmarks()).toHaveLength(0);
  });

  it('toggles bookmarks reliably', () => {
    const isNowBookmarked = toggleBookmark(sampleBookmark);
    expect(isNowBookmarked).toBe(true);
    expect(isBookmarked('swift-optionals')).toBe(true);

    const isNowRemoved = toggleBookmark(sampleBookmark);
    expect(isNowRemoved).toBe(false);
    expect(isBookmarked('swift-optionals')).toBe(false);
  });
});
