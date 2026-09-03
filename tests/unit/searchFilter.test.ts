import { describe, it, expect } from 'vitest';
import { selectInterviewQuestions, INTERVIEW_TRACKS } from '@/lib/interview/questionSelector';
import { ALL_INTERVIEW_QUESTIONS } from '@/data/interview';

describe('Interview Question Selection & Filtering', () => {
  it('selects questions matching requested difficulty', () => {
    const foundational = selectInterviewQuestions(ALL_INTERVIEW_QUESTIONS, {
      difficulty: 'foundational',
      count: 10,
    });

    expect(foundational.length).toBeGreaterThan(0);
    foundational.forEach((q) => {
      expect(['foundational', 'junior']).toContain(q.difficulty);
    });
  });

  it('filters questions by categories/domains', () => {
    const concurrencyOnly = selectInterviewQuestions(ALL_INTERVIEW_QUESTIONS, {
      categoryIds: ['concurrency'],
      count: 10,
    });

    expect(concurrencyOnly.length).toBeGreaterThan(0);
    concurrencyOnly.forEach((q) => {
      expect(q.domainId).toBe('concurrency');
    });
  });

  it('filters questions by specific topicId', () => {
    const actorQuestions = selectInterviewQuestions(ALL_INTERVIEW_QUESTIONS, {
      categoryIds: ['concurrency'],
      topicIds: ['concurrency-actors'],
      count: 5,
    });

    expect(actorQuestions.length).toBeGreaterThan(0);
    actorQuestions.forEach((q) => {
      expect(q.topicId).toBe('concurrency-actors');
    });
  });

  it('limits result set to requested count', () => {
    const fiveQuestions = selectInterviewQuestions(ALL_INTERVIEW_QUESTIONS, {
      count: 5,
    });
    expect(fiveQuestions.length).toBe(5);

    const twentyQuestions = selectInterviewQuestions(ALL_INTERVIEW_QUESTIONS, {
      count: 20,
    });
    expect(twentyQuestions.length).toBe(20);
  });

  it('validates pre-configured interview tracks', () => {
    expect(INTERVIEW_TRACKS).toHaveLength(4);

    INTERVIEW_TRACKS.forEach((track) => {
      expect(track.id).toBeTruthy();
      expect(track.title).toBeTruthy();
      expect(track.defaultQuestionCount).toBeGreaterThan(0);
      expect(track.featuredDomains.length).toBeGreaterThan(0);

      // Verify that running selection for the track returns valid questions
      const questions = selectInterviewQuestions(ALL_INTERVIEW_QUESTIONS, {
        difficulty: track.level,
        categoryIds: track.featuredDomains,
        count: track.defaultQuestionCount,
      });

      expect(questions.length).toBeGreaterThan(0);
      expect(questions.length).toBeLessThanOrEqual(track.defaultQuestionCount);
    });
  });
});
