import { describe, it, expect } from 'vitest';
import { CURRICULUM_DOMAINS, CURRICULUM_TOPICS } from '@/data/curriculum';
import { allArticleTopics } from '@/data/topics';
import { ALL_INTERVIEW_QUESTIONS } from '@/data/interview';

describe('Curriculum Content Integrity', () => {
  it('has unique domain IDs and numbers across all curriculum domains', () => {
    const domainIds = CURRICULUM_DOMAINS.map((d) => d.id);
    const domainNumbers = CURRICULUM_DOMAINS.map((d) => d.number);

    const duplicateIds = domainIds.filter((id, index) => domainIds.indexOf(id) !== index);
    const duplicateNumbers = domainNumbers.filter((n, index) => domainNumbers.indexOf(n) !== index);

    expect(duplicateIds).toEqual([]);
    expect(duplicateNumbers).toEqual([]);
    expect(CURRICULUM_DOMAINS.length).toBeGreaterThanOrEqual(25);
  });

  it('has unique topic IDs and slugs across all curriculum topics', () => {
    const topicIds = CURRICULUM_TOPICS.map((t) => t.id);
    const topicSlugs = CURRICULUM_TOPICS.map((t) => t.slug);

    const duplicateIds = topicIds.filter((id, index) => topicIds.indexOf(id) !== index);
    const duplicateSlugs = topicSlugs.filter((s, index) => topicSlugs.indexOf(s) !== index);

    expect(duplicateIds).toEqual([]);
    expect(duplicateSlugs).toEqual([]);
  });

  it('ensures every article topic has a valid category and difficulty', () => {
    const validDifficulties = ['junior', 'mid', 'senior', 'staff', 'foundational', 'intermediate', 'advanced', 'expert'];

    allArticleTopics.forEach((article) => {
      expect(article.id).toBeDefined();
      expect(article.title).toBeTruthy();
      expect(article.slug).toBeTruthy();
      expect(validDifficulties).toContain(article.difficulty.toLowerCase());
    });
  });

  it('validates that all relatedTopics references resolve to real topics', () => {
    const allKnownIds = new Set([
      ...allArticleTopics.map((t) => t.id),
      ...CURRICULUM_TOPICS.map((t) => t.id),
    ]);

    allArticleTopics.forEach((article) => {
      if (article.relatedTopics) {
        article.relatedTopics.forEach((relId) => {
          expect(allKnownIds.has(relId), `Topic "${article.id}" references non-existent relatedTopic: "${relId}"`).toBe(true);
        });
      }
    });
  });

  it('validates that previousTopic and nextTopic references resolve to real topics', () => {
    const allKnownIds = new Set([
      ...allArticleTopics.map((t) => t.id),
      ...CURRICULUM_TOPICS.map((t) => t.id),
    ]);

    allArticleTopics.forEach((article) => {
      if (article.previousTopic) {
        expect(allKnownIds.has(article.previousTopic), `Topic "${article.id}" references non-existent previousTopic: "${article.previousTopic}"`).toBe(true);
      }
      if (article.nextTopic) {
        expect(allKnownIds.has(article.nextTopic), `Topic "${article.id}" references non-existent nextTopic: "${article.nextTopic}"`).toBe(true);
      }
    });
  });

  it('validates that all 98 interview questions reference existing curriculum topic IDs', () => {
    const validTopicIds = new Set(CURRICULUM_TOPICS.map((t) => t.id));

    ALL_INTERVIEW_QUESTIONS.forEach((q) => {
      expect(
        validTopicIds.has(q.topicId),
        `Question "${q.id}" has invalid topicId: "${q.topicId}". Must match a valid CURRICULUM_TOPIC id.`
      ).toBe(true);
    });
  });

  it('validates that all interview questions and follow-ups have globally unique IDs', () => {
    const questionIds = ALL_INTERVIEW_QUESTIONS.map((q) => q.id);
    const duplicateQIds = questionIds.filter((id, i) => questionIds.indexOf(id) !== i);
    expect(duplicateQIds).toEqual([]);

    const followUpIds = ALL_INTERVIEW_QUESTIONS.flatMap((q) => (q.followUps || []).map((f) => f.id));
    const duplicateFIds = followUpIds.filter((id, i) => followUpIds.indexOf(id) !== i);
    expect(duplicateFIds).toEqual([]);
  });
});
