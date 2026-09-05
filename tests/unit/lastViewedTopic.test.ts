import { describe, it, expect, beforeEach } from 'vitest';
import {
  getLastViewedTopic,
  recordTopicView,
  setTopicProgress,
  getTopicProgress,
  markTopicComplete,
} from '@/lib/progressStore';

describe('getLastViewedTopic', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns null when no progress data exists', () => {
    expect(getLastViewedTopic()).toBeNull();
  });

  it('returns the topic for a single viewed entry', () => {
    recordTopicView('swift-optionals');

    const result = getLastViewedTopic();
    expect(result).not.toBeNull();
    expect(result).toEqual({
      topicId: 'swift-optionals',
      category: 'swift',
      slug: 'optionals',
    });
  });

  it('returns the most recent topic by lastViewedAt when multiple topics exist', () => {
    // Save first topic with earlier timestamp
    setTopicProgress('swift-optionals', {
      progress: 30,
      completed: false,
      lastViewedAt: '2026-09-01T10:00:00.000Z',
    });

    // Save second topic with later timestamp
    setTopicProgress('concurrency-actors', {
      progress: 50,
      completed: false,
      lastViewedAt: '2026-09-05T12:00:00.000Z',
    });

    // Save third topic with intermediate timestamp
    setTopicProgress('swift-access-control', {
      progress: 10,
      completed: false,
      lastViewedAt: '2026-09-03T10:00:00.000Z',
    });

    const result = getLastViewedTopic();
    expect(result).not.toBeNull();
    expect(result?.topicId).toBe('concurrency-actors');
    expect(result?.category).toBe('concurrency');
    expect(result?.slug).toBe('actors-in-swift');
  });

  it('returns null when the stored topic ID no longer exists in repository', () => {
    setTopicProgress('deleted-old-topic-id', {
      progress: 50,
      completed: true,
      lastViewedAt: new Date().toISOString(),
    });

    expect(getLastViewedTopic()).toBeNull();
  });

  it('resolves curriculum taxonomy topic if not in article topics', () => {
    // Topic that exists in curriculum but not in full article topics
    recordTopicView('combine-pub-sub');

    const result = getLastViewedTopic();
    expect(result).not.toBeNull();
    expect(result?.topicId).toBe('combine-pub-sub');
    expect(result?.slug).toBe('publishers-and-subscribers-lifecycle');
    expect(result?.category).toBe('combine');
  });

  it('recordTopicView preserves completed status and progress percentage', () => {
    setTopicProgress('swift-optionals', 75);
    markTopicComplete('swift-optionals');

    const before = getTopicProgress('swift-optionals');
    expect(before?.completed).toBe(true);
    expect(before?.progress).toBe(100);

    // Call recordTopicView later
    recordTopicView('swift-optionals');

    const after = getTopicProgress('swift-optionals');
    expect(after?.completed).toBe(true);
    expect(after?.progress).toBe(100);
    expect(after?.lastViewedAt).toBeDefined();
  });
});
