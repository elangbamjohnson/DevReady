import type {
  DifficultyLevel,
  InterviewQuestion,
  TopicCategory,
} from '@/types/interview';

import { swiftQuestions } from './questions/swift';
import { concurrencyQuestions } from './questions/concurrency';
import { swiftuiQuestions } from './questions/swiftui';
import { uikitQuestions } from './questions/uikit';
import { memoryQuestions } from './questions/memory';
import { architectureQuestions } from './questions/architecture';
import { networkingQuestions } from './questions/networking';
import { testingDebuggingQuestions } from './questions/testing-debugging';
import { objcQuestions } from './questions/objc';

// ─── Complete Central Question Bank ──────────────────────────────────────────

export const ALL_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  ...swiftQuestions,
  ...concurrencyQuestions,
  ...swiftuiQuestions,
  ...uikitQuestions,
  ...memoryQuestions,
  ...architectureQuestions,
  ...networkingQuestions,
  ...testingDebuggingQuestions,
  ...objcQuestions,
];

// ─── Central Interview Repository Interface ───────────────────────────────────

export const interviewRepository = {
  /**
   * Returns all questions in the bank.
   */
  getAllQuestions(): InterviewQuestion[] {
    return ALL_INTERVIEW_QUESTIONS;
  },

  /**
   * Retrieves a question by its unique stable ID.
   */
  getQuestionById(id: string): InterviewQuestion | undefined {
    return ALL_INTERVIEW_QUESTIONS.find((q) => q.id === id);
  },

  /**
   * Retrieves all questions associated with a specific curriculum domain.
   */
  getQuestionsByCategory(domainId: TopicCategory): InterviewQuestion[] {
    // Handle 'memory' alias pointing to debugging
    if (domainId === 'memory') {
      return ALL_INTERVIEW_QUESTIONS.filter(
        (q) => q.domainId === 'debugging' || q.domainId === 'persistence'
      );
    }
    return ALL_INTERVIEW_QUESTIONS.filter((q) => q.domainId === domainId);
  },

  /**
   * Retrieves all questions mapped to a specific Learn topic ID.
   */
  getQuestionsByTopic(topicId: string): InterviewQuestion[] {
    return ALL_INTERVIEW_QUESTIONS.filter((q) => q.topicId === topicId);
  },

  /**
   * Retrieves all questions matching a difficulty level.
   */
  getQuestionsByDifficulty(level: DifficultyLevel): InterviewQuestion[] {
    return ALL_INTERVIEW_QUESTIONS.filter((q) => {
      if (level === 'foundational' || level === 'junior') {
        return q.difficulty === 'foundational' || q.difficulty === 'junior';
      }
      if (level === 'intermediate' || level === 'mid') {
        return q.difficulty === 'intermediate' || q.difficulty === 'mid';
      }
      if (level === 'advanced' || level === 'senior') {
        return q.difficulty === 'advanced' || q.difficulty === 'senior';
      }
      if (level === 'expert' || level === 'staff') {
        return q.difficulty === 'expert' || q.difficulty === 'staff';
      }
      return q.difficulty === level;
    });
  },

  /**
   * Searches questions by query text, tags, or topic.
   */
  search(query: string): InterviewQuestion[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return ALL_INTERVIEW_QUESTIONS.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.modelAnswer.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        item.topicId.toLowerCase().includes(q)
    );
  },
};
