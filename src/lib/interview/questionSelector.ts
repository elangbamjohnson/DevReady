import type {
  DifficultyLevel,
  InterviewMode,
  InterviewQuestion,
  InterviewTrack,
  TopicCategory,
} from '@/types/interview';

// ─── Predefined Interview Tracks ─────────────────────────────────────────────

export const INTERVIEW_TRACKS: InterviewTrack[] = [
  {
    id: 'track-junior',
    level: 'foundational',
    title: 'Junior iOS Engineer',
    subtitle: 'Swift Fundamentals & iOS Core',
    description: 'Master value vs reference semantics, optionals, control flow, foundational UIKit/SwiftUI, and basic memory concepts.',
    defaultQuestionCount: 15,
    estimatedMinutes: 25,
    featuredDomains: ['swift', 'uikit', 'swiftui', 'foundation'],
    badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  },
  {
    id: 'track-mid',
    level: 'intermediate',
    title: 'Mid-Level iOS Engineer',
    subtitle: 'Engineering Practices & UI State',
    description: 'Demonstrate proficiency in reactive SwiftUI, auto layout, URLSession networking, closures, and ARC memory management.',
    defaultQuestionCount: 20,
    estimatedMinutes: 35,
    featuredDomains: ['swift', 'swiftui', 'concurrency', 'networking', 'debugging'],
    badgeColor: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  },
  {
    id: 'track-senior',
    level: 'advanced',
    title: 'Senior iOS Engineer',
    subtitle: 'Concurrency, Architecture & Performance',
    description: 'Deep-dive into async/await, actors, Sendable, modular MVVM/Coordinator patterns, Instruments profiling, and CI/CD automation.',
    defaultQuestionCount: 30,
    estimatedMinutes: 45,
    featuredDomains: ['concurrency', 'architecture', 'debugging', 'performance', 'persistence', 'security'],
    badgeColor: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  },
  {
    id: 'track-staff',
    level: 'expert',
    title: 'Staff / Lead iOS Architect',
    subtitle: 'System Design, Scalability & Leadership',
    description: 'Architect offline-first synchronization, dynamic image/media pipelines, multi-module frameworks, and production observability.',
    defaultQuestionCount: 20,
    estimatedMinutes: 45,
    featuredDomains: ['system-design', 'architecture', 'concurrency', 'production', 'coreml'],
    badgeColor: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  },
];

export interface QuestionSelectionCriteria {
  difficulty?: DifficultyLevel;
  categoryIds?: TopicCategory[];
  topicIds?: string[];
  mode?: InterviewMode;
  count?: number;
}

/**
 * Deterministically selects and balances interview questions based on requested criteria.
 */
export function selectInterviewQuestions(
  allQuestions: InterviewQuestion[],
  criteria: QuestionSelectionCriteria
): InterviewQuestion[] {
  let candidates = [...allQuestions];

  // 1. Filter by Difficulty (or map equivalent junior/mid/senior/staff)
  if (criteria.difficulty) {
    const diff = criteria.difficulty;
    candidates = candidates.filter((q) => {
      if (diff === 'foundational' || diff === 'junior') {
        return q.difficulty === 'foundational' || q.difficulty === 'junior';
      }
      if (diff === 'intermediate' || diff === 'mid') {
        return q.difficulty === 'intermediate' || q.difficulty === 'mid';
      }
      if (diff === 'advanced' || diff === 'senior') {
        return q.difficulty === 'advanced' || q.difficulty === 'senior';
      }
      if (diff === 'expert' || diff === 'staff') {
        return q.difficulty === 'expert' || q.difficulty === 'staff';
      }
      return q.difficulty === diff;
    });
  }

  // 2. Filter by Category / Domains (if specified)
  if (criteria.categoryIds && criteria.categoryIds.length > 0) {
    candidates = candidates.filter((q) => criteria.categoryIds!.includes(q.domainId));
  }

  // 3. Filter by Specific Topics (if specified)
  if (criteria.topicIds && criteria.topicIds.length > 0) {
    candidates = candidates.filter((q) => criteria.topicIds!.includes(q.topicId));
  }

  // 4. Fallback if overly filtered: relax to all questions from the selected categories
  if (candidates.length === 0 && criteria.categoryIds && criteria.categoryIds.length > 0) {
    candidates = allQuestions.filter((q) => criteria.categoryIds!.includes(q.domainId));
  }

  // If still empty, return whatever is available
  if (candidates.length === 0) {
    candidates = [...allQuestions];
  }

  // 5. Deterministic shuffle using stable pseudo-random order
  // (prevents duplicate questions while giving diverse topic mix)
  const shuffled = candidates.sort((a, b) => {
    // Group by frequency first: high frequency first
    const freqWeight: Record<string, number> = { high: 3, medium: 2, low: 1 };
    const diff = (freqWeight[b.frequency] || 1) - (freqWeight[a.frequency] || 1);
    if (diff !== 0) return diff;
    return a.id.localeCompare(b.id);
  });

  // 6. Slice to requested count
  const targetCount = criteria.count ?? 10;
  return shuffled.slice(0, targetCount);
}
