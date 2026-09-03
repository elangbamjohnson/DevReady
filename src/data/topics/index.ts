/**
 * Central topic registry — combines all topic files, validates uniqueness,
 * and provides the topicRepository interface for the UI layer.
 *
 * Phase 5 will replace `staticRepository` with an API-backed implementation
 * without changing any call sites in UI components.
 */

import type { ArticleTopic, TopicCategory } from '@/types';
import { swiftTopics } from './swift';
import { concurrencyTopics } from './concurrency';
import { swiftuiTopics } from './swiftui';
import { uikitTopics } from './uikit';
import { memoryTopics } from './memory';
import { architectureTopics } from './architecture';

// ─── All Topics ───────────────────────────────────────────────────────────────

export const allArticleTopics: ArticleTopic[] = [
  ...swiftTopics,
  ...concurrencyTopics,
  ...swiftuiTopics,
  ...uikitTopics,
  ...memoryTopics,
  ...architectureTopics,
];

// ─── Dev-time validation ──────────────────────────────────────────────────────

if (process.env.NODE_ENV === 'development') {
  const ids = allArticleTopics.map(t => t.id);
  const slugs = allArticleTopics.map(t => t.slug);
  const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
  const dupSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i);

  if (dupIds.length > 0) {
    console.error('[topicRepository] Duplicate topic IDs:', dupIds);
  }
  if (dupSlugs.length > 0) {
    console.error('[topicRepository] Duplicate topic slugs:', dupSlugs);
  }

  // Validate relatedTopics references exist
  allArticleTopics.forEach(topic => {
    topic.relatedTopics.forEach(relId => {
      if (!ids.includes(relId)) {
        console.warn(`[topicRepository] Topic "${topic.id}" references unknown relatedTopic: "${relId}"`);
      }
    });
    if (topic.previousTopic && !ids.includes(topic.previousTopic)) {
      console.warn(`[topicRepository] Topic "${topic.id}" has unknown previousTopic: "${topic.previousTopic}"`);
    }
    if (topic.nextTopic && !ids.includes(topic.nextTopic)) {
      console.warn(`[topicRepository] Topic "${topic.id}" has unknown nextTopic: "${topic.nextTopic}"`);
    }
  });
}

import { CURRICULUM_DOMAINS } from '@/data/curriculum';

export interface CategoryMeta {
  slug: string;
  category: TopicCategory;
  label: string;
  description: string;
  icon: string;
}

export const categoryMeta: CategoryMeta[] = [
  ...CURRICULUM_DOMAINS.map((d) => ({
    slug: d.id,
    category: d.id,
    label: d.shortTitle,
    description: d.description,
    icon: d.icon,
  })),
  // Legacy category alias retained for backward compatibility
  {
    slug: 'memory',
    category: 'memory',
    label: 'Memory Management',
    description: 'Understand ARC, strong/weak/unowned references, retain cycles, and memory debugging tools.',
    icon: 'MM',
  },
];

// ─── Topic Repository Interface ───────────────────────────────────────────────

export const topicRepository = {
  /** Get all topics */
  getTopics(): ArticleTopic[] {
    return allArticleTopics;
  },

  /** Get topics for a specific category */
  getTopicsByCategory(category: TopicCategory): ArticleTopic[] {
    return allArticleTopics.filter(t => t.category === category);
  },

  /** Get a topic by its slug (URL-safe identifier) */
  getTopicBySlug(slug: string): ArticleTopic | undefined {
    return allArticleTopics.find(t => t.slug === slug);
  },

  /** Get a topic by its ID */
  getTopicById(id: string): ArticleTopic | undefined {
    return allArticleTopics.find(t => t.id === id);
  },

  /** Get related topics for a given topic */
  getRelatedTopics(topicId: string): ArticleTopic[] {
    const topic = allArticleTopics.find(t => t.id === topicId);
    if (!topic) return [];
    return topic.relatedTopics
      .map(id => allArticleTopics.find(t => t.id === id))
      .filter((t): t is ArticleTopic => t !== undefined);
  },

  /** Get previous/next topics for navigation */
  getAdjacentTopics(topicId: string): { previous?: ArticleTopic; next?: ArticleTopic } {
    const topic = allArticleTopics.find(t => t.id === topicId);
    if (!topic) return {};
    return {
      previous: topic.previousTopic ? allArticleTopics.find(t => t.id === topic.previousTopic) : undefined,
      next: topic.nextTopic ? allArticleTopics.find(t => t.id === topic.nextTopic) : undefined,
    };
  },

  /** Get topic groups for a category (for category page listing) */
  getGroupsByCategory(category: TopicCategory): { group: string; topics: ArticleTopic[] }[] {
    const topics = allArticleTopics.filter(t => t.category === category);
    const groups = new Map<string, ArticleTopic[]>();
    topics.forEach(t => {
      const existing = groups.get(t.group) ?? [];
      groups.set(t.group, [...existing, t]);
    });
    return Array.from(groups.entries()).map(([group, topics]) => ({ group, topics }));
  },

  /** Search topics by query string */
  search(query: string): ArticleTopic[] {
    const q = query.toLowerCase();
    return allArticleTopics.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q)) ||
      t.group.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  },

  /** Get category metadata */
  getCategoryMeta(category: TopicCategory): CategoryMeta | undefined {
    return categoryMeta.find(c => c.category === category);
  },
};
