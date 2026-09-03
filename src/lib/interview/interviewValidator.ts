import { ALL_INTERVIEW_QUESTIONS } from '@/data/interview';
import { CURRICULUM_TOPICS } from '@/data/curriculum';

export interface QuestionValidationIssue {
  severity: 'error' | 'warning';
  questionId: string;
  message: string;
}

export interface QuestionValidationResult {
  valid: boolean;
  errors: QuestionValidationIssue[];
  warnings: QuestionValidationIssue[];
  totalQuestions: number;
}

/**
 * Validates the entire interview question dataset against the curriculum taxonomy.
 */
export function validateInterviewQuestions(): QuestionValidationResult {
  const errors: QuestionValidationIssue[] = [];
  const warnings: QuestionValidationIssue[] = [];

  const seenQuestionIds = new Set<string>();
  const seenFollowUpIds = new Set<string>();
  const validCurriculumTopicIds = new Set(CURRICULUM_TOPICS.map((t) => t.id));

  ALL_INTERVIEW_QUESTIONS.forEach((q) => {
    // 1. Unique Question ID check
    if (seenQuestionIds.has(q.id)) {
      errors.push({
        severity: 'error',
        questionId: q.id,
        message: `Duplicate Question ID: "${q.id}"`,
      });
    }
    seenQuestionIds.add(q.id);

    // 2. Validate Topic ID exists in Curriculum
    if (!validCurriculumTopicIds.has(q.topicId)) {
      errors.push({
        severity: 'error',
        questionId: q.id,
        message: `Question references non-existent curriculum topicId: "${q.topicId}"`,
      });
    }

    // 3. Completeness check
    if (!q.question || q.question.trim().length === 0) {
      errors.push({
        severity: 'error',
        questionId: q.id,
        message: 'Question text is empty.',
      });
    }

    if (!q.modelAnswer || q.modelAnswer.trim().length === 0) {
      errors.push({
        severity: 'error',
        questionId: q.id,
        message: 'Model answer is missing or empty.',
      });
    }

    if (!q.keyPoints || q.keyPoints.length === 0) {
      warnings.push({
        severity: 'warning',
        questionId: q.id,
        message: 'Question has no key points checklist.',
      });
    }

    // 4. Follow-up validation
    q.followUps.forEach((fu) => {
      if (seenFollowUpIds.has(fu.id)) {
        errors.push({
          severity: 'error',
          questionId: q.id,
          message: `Duplicate Follow-Up ID: "${fu.id}"`,
        });
      }
      seenFollowUpIds.add(fu.id);

      if (fu.parentQuestionId !== q.id) {
        errors.push({
          severity: 'error',
          questionId: q.id,
          message: `Follow-Up "${fu.id}" has mismatched parentQuestionId ("${fu.parentQuestionId}" vs "${q.id}").`,
        });
      }

      if (!fu.modelAnswer || fu.modelAnswer.trim().length === 0) {
        errors.push({
          severity: 'error',
          questionId: q.id,
          message: `Follow-Up "${fu.id}" is missing modelAnswer.`,
        });
      }
    });
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    totalQuestions: ALL_INTERVIEW_QUESTIONS.length,
  };
}

// Dev-time validation check
if (process.env.NODE_ENV !== 'production') {
  const result = validateInterviewQuestions();
  if (!result.valid) {
    console.error(`[InterviewValidator] ❌ Validation failed with ${result.errors.length} errors:`);
    result.errors.forEach((e) => console.error(`  • [${e.questionId}] ${e.message}`));
  }
}
