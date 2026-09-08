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

  it('enforces bidirectional symmetry between adjacent article topics', () => {
    const articleMap = new Map(allArticleTopics.map((t) => [t.id, t]));

    allArticleTopics.forEach((article) => {
      if (article.nextTopic) {
        const nextArticle = articleMap.get(article.nextTopic);
        if (nextArticle) {
          expect(
            nextArticle.previousTopic,
            `Expected "${nextArticle.id}" previousTopic to be "${article.id}", but got "${nextArticle.previousTopic}"`
          ).toBe(article.id);
        }
      }
      if (article.previousTopic) {
        const prevArticle = articleMap.get(article.previousTopic);
        if (prevArticle) {
          expect(
            prevArticle.nextTopic,
            `Expected "${prevArticle.id}" nextTopic to be "${article.id}", but got "${prevArticle.nextTopic}"`
          ).toBe(article.id);
        }
      }
    });
  });

  it('ensures Swift domain article navigation strictly matches curriculum order', () => {
    const swiftDomain = CURRICULUM_DOMAINS.find((d) => d.id === 'swift')!;
    const swiftCurriculumTopics = swiftDomain.modules.flatMap((m) => m.topics);
    const articleMap = new Map(allArticleTopics.map((t) => [t.id, t]));

    for (let i = 0; i < swiftCurriculumTopics.length; i++) {
      const cur = swiftCurriculumTopics[i];
      const prev = i > 0 ? swiftCurriculumTopics[i - 1] : undefined;
      const next = i < swiftCurriculumTopics.length - 1 ? swiftCurriculumTopics[i + 1] : undefined;

      const article = articleMap.get(cur.id);
      expect(article, `Expected article for "${cur.id}"`).toBeDefined();
      expect(article?.previousTopic).toBe(prev?.id);
      expect(article?.nextTopic).toBe(next?.id);
    }
  });

  it('validates that all interview questions reference existing curriculum topic IDs', () => {
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

  it('validates that furtherReading entries have valid titles, URLs, and source domains', () => {
    allArticleTopics.forEach((article) => {
      if (article.furtherReading) {
        expect(article.furtherReading.length).toBeGreaterThan(0);
        article.furtherReading.forEach((item) => {
          expect(item.title.trim().length).toBeGreaterThan(0);
          expect(item.url).toMatch(/^https:\/\//);
          expect(['apple-developer', 'swift-org']).toContain(item.source);

          if (item.source === 'apple-developer') {
            expect(item.url).toMatch(/^https:\/\/developer\.apple\.com\//);
          } else if (item.source === 'swift-org') {
            expect(item.url).toMatch(/^https:\/\/docs\.swift\.org\//);
          }
        });
      }
    });
  });
});
