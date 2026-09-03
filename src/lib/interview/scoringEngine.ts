import type {
  InterviewQuestion,
  InterviewResponse,
  InterviewResult,
  SelfRating,
} from '@/types/interview';

// ─── Scoring Weights (Centralized) ───────────────────────────────────────────

export const SELF_RATING_WEIGHTS: Record<SelfRating, number> = {
  unknown: 0.0,
  partial: 0.5,
  good: 0.8,
  excellent: 1.0,
};

// ─── Performance Thresholds (Centralized) ────────────────────────────────────

export const PERFORMANCE_THRESHOLDS = {
  NEEDS_ATTENTION: 60, // < 60%
  DEVELOPING: 75,       // 60% - 74%
  STRONG: 90,           // 75% - 89%
  EXCELLENT: 100,       // 90% - 100%
} as const;

export type PerformanceTier = 'needs-attention' | 'developing' | 'strong' | 'excellent';

export function getPerformanceTier(score: number): PerformanceTier {
  if (score < PERFORMANCE_THRESHOLDS.NEEDS_ATTENTION) return 'needs-attention';
  if (score < PERFORMANCE_THRESHOLDS.DEVELOPING) return 'developing';
  if (score < PERFORMANCE_THRESHOLDS.STRONG) return 'strong';
  return 'excellent';
}

export function getPerformanceLabel(score: number): string {
  const tier = getPerformanceTier(score);
  switch (tier) {
    case 'needs-attention':
      return 'Needs Attention';
    case 'developing':
      return 'Developing';
    case 'strong':
      return 'Strong';
    case 'excellent':
      return 'Excellent';
  }
}

/**
 * Calculates deterministic interview results from user self-assessment responses.
 */
export function calculateInterviewResult(
  questions: InterviewQuestion[],
  responses: Record<string, InterviewResponse>
): InterviewResult {
  const questionCount = questions.length;
  if (questionCount === 0) {
    return {
      overallScore: 0,
      categoryScores: {},
      answeredCount: 0,
      questionCount: 0,
      strengths: [],
      weaknesses: [],
      recommendedTopicIds: [],
    };
  }

  let totalScorePoints = 0;
  let answeredCount = 0;

  // Group questions by category / domain
  const categoryStats: Record<string, { totalPoints: number; count: number; weakTopicIds: string[] }> = {};

  questions.forEach((q) => {
    if (!categoryStats[q.domainId]) {
      categoryStats[q.domainId] = { totalPoints: 0, count: 0, weakTopicIds: [] };
    }

    const resp = responses[q.id];
    if (resp && resp.selfRating) {
      answeredCount += 1;
      const weight = SELF_RATING_WEIGHTS[resp.selfRating] ?? 0;
      totalScorePoints += weight;
      categoryStats[q.domainId].totalPoints += weight;
      categoryStats[q.domainId].count += 1;

      // Track weak topic if self-rating is unknown or partial
      if (resp.selfRating === 'unknown' || resp.selfRating === 'partial') {
        if (!categoryStats[q.domainId].weakTopicIds.includes(q.topicId)) {
          categoryStats[q.domainId].weakTopicIds.push(q.topicId);
        }
      }
    } else {
      categoryStats[q.domainId].count += 1;
      // Unanswered defaults to weak topic
      if (!categoryStats[q.domainId].weakTopicIds.includes(q.topicId)) {
        categoryStats[q.domainId].weakTopicIds.push(q.topicId);
      }
    }
  });

  const overallScore = answeredCount > 0
    ? Math.round((totalScorePoints / questionCount) * 100)
    : 0;

  const categoryScores: Record<string, number> = {};
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendedTopicIds: string[] = [];

  Object.entries(categoryStats).forEach(([catId, stats]) => {
    const catScore = stats.count > 0 ? Math.round((stats.totalPoints / stats.count) * 100) : 0;
    categoryScores[catId] = catScore;

    if (catScore >= PERFORMANCE_THRESHOLDS.DEVELOPING) {
      strengths.push(catId);
    } else {
      weaknesses.push(catId);
      stats.weakTopicIds.forEach((tId) => {
        if (!recommendedTopicIds.includes(tId)) {
          recommendedTopicIds.push(tId);
        }
      });
    }
  });

  return {
    overallScore,
    categoryScores,
    answeredCount,
    questionCount,
    strengths,
    weaknesses,
    recommendedTopicIds,
  };
}
