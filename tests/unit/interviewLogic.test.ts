import { describe, it, expect, beforeEach } from 'vitest';
import {
  calculateInterviewResult,
  getPerformanceLabel,
  getPerformanceTier,
  SELF_RATING_WEIGHTS,
} from '@/lib/interview/scoringEngine';
import { interviewStore } from '@/lib/interview/interviewStore';
import type { InterviewQuestion, InterviewResponse } from '@/types/interview';

describe('Interview Scoring Engine', () => {
  const mockQuestions: InterviewQuestion[] = [
    {
      id: 'q1',
      question: 'Q1',
      domainId: 'concurrency',
      moduleId: 'concurrency-core',
      topicId: 'concurrency-actors',
      difficulty: 'intermediate',
      type: 'conceptual',
      estimatedMinutes: 3,
      frequency: 'high',
      tags: ['concurrency'],
      relatedTopics: ['concurrency-actors'],
      followUps: [],
      modelAnswer: 'A1',
      keyPoints: ['P1'],
      commonMistakes: [],
    },
    {
      id: 'q2',
      question: 'Q2',
      domainId: 'concurrency',
      moduleId: 'concurrency-core',
      topicId: 'concurrency-task',
      difficulty: 'intermediate',
      type: 'conceptual',
      estimatedMinutes: 3,
      frequency: 'high',
      tags: ['concurrency'],
      relatedTopics: ['concurrency-task'],
      followUps: [],
      modelAnswer: 'A2',
      keyPoints: ['P2'],
      commonMistakes: [],
    },
    {
      id: 'q3',
      question: 'Q3',
      domainId: 'swift',
      moduleId: 'swift-fundamentals',
      topicId: 'swift-optionals',
      difficulty: 'foundational',
      type: 'conceptual',
      estimatedMinutes: 3,
      frequency: 'high',
      tags: ['swift'],
      relatedTopics: ['swift-optionals'],
      followUps: [],
      modelAnswer: 'A3',
      keyPoints: ['P3'],
      commonMistakes: [],
    },
  ];

  it('correctly weighs self-assessments', () => {
    expect(SELF_RATING_WEIGHTS.unknown).toBe(0.0);
    expect(SELF_RATING_WEIGHTS.partial).toBe(0.5);
    expect(SELF_RATING_WEIGHTS.good).toBe(0.8);
    expect(SELF_RATING_WEIGHTS.excellent).toBe(1.0);
  });

  it('calculates deterministic score and identifies weak areas below 60%', () => {
    const responses: Record<string, InterviewResponse> = {
      q1: {
        questionId: 'q1',
        selfRating: 'unknown', // 0.0
        timeSpent: 10,
        completed: true,
        answerRevealed: true,
        followUpsViewed: [],
      },
      q2: {
        questionId: 'q2',
        selfRating: 'partial', // 0.5
        timeSpent: 15,
        completed: true,
        answerRevealed: true,
        followUpsViewed: [],
      },
      q3: {
        questionId: 'q3',
        selfRating: 'excellent', // 1.0
        timeSpent: 20,
        completed: true,
        answerRevealed: true,
        followUpsViewed: [],
      },
    };

    const result = calculateInterviewResult(mockQuestions, responses);

    // Total possible: 3.0. Earned: 0 + 0.5 + 1.0 = 1.5. Overall: 50%
    expect(result.overallScore).toBe(50);
    expect(result.questionCount).toBe(3);
    expect(result.answeredCount).toBe(3);

    // Concurrency has 2 questions: (0 + 0.5) / 2 = 25% -> Weak area (< 60%)
    // Swift has 1 question: 1.0 / 1 = 100% -> Strength (>= 60%)
    expect(result.weaknesses).toContain('concurrency');
    expect(result.strengths).toContain('swift');

    // Recommended topics should include the weak question topics
    expect(result.recommendedTopicIds).toContain('concurrency-actors');
    expect(result.recommendedTopicIds).toContain('concurrency-task');
  });

  it('maps scores to correct performance tiers', () => {
    expect(getPerformanceLabel(95)).toBe('Excellent');
    expect(getPerformanceTier(95)).toBe('excellent');

    expect(getPerformanceLabel(80)).toBe('Strong');
    expect(getPerformanceTier(80)).toBe('strong');

    expect(getPerformanceLabel(65)).toBe('Developing');
    expect(getPerformanceTier(65)).toBe('developing');

    expect(getPerformanceLabel(40)).toBe('Needs Attention');
    expect(getPerformanceTier(40)).toBe('needs-attention');
  });
});

describe('Interview Session Store', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('creates and manages session lifecycle correctly', () => {
    const session = interviewStore.createSession({
      title: 'Test Session',
      mode: 'interview',
      difficulty: 'intermediate',
      categoryIds: ['swift', 'concurrency'],
      questionIds: ['q1', 'q2'],
    });

    expect(session.id).toBeDefined();
    expect(session.currentIndex).toBe(0);
    expect(session.status).toBe('active');

    // Active session lookup
    const active = interviewStore.getActiveSession();
    expect(active?.id).toBe(session.id);

    // Record response
    interviewStore.updateResponse(session.id, {
      questionId: 'q1',
      selfRating: 'good',
      completed: true,
      answerRevealed: true,
      followUpsViewed: [],
    });

    const updated = interviewStore.getSession(session.id);
    expect(updated?.responses['q1']?.selfRating).toBe('good');

    // Advance question
    interviewStore.advanceQuestion(session.id);
    expect(interviewStore.getSession(session.id)?.currentIndex).toBe(1);

    // Previous question
    interviewStore.previousQuestion(session.id);
    expect(interviewStore.getSession(session.id)?.currentIndex).toBe(0);

    // Complete session
    interviewStore.completeSession(session.id, {
      overallScore: 80,
      questionCount: 2,
      answeredCount: 1,
      categoryScores: { swift: 80 },
      weaknesses: [],
      strengths: ['swift'],
      recommendedTopicIds: [],
    });

    expect(interviewStore.getActiveSession()).toBeNull();
    const history = interviewStore.getHistory();
    expect(history.length).toBe(1);
    expect(history[0].status).toBe('completed');
  });
});
