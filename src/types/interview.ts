import type { DifficultyLevel, TopicCategory } from './index';
export type { DifficultyLevel, TopicCategory };

// ─── Question Classification ──────────────────────────────────────────────────

export type InterviewQuestionType =
  | 'conceptual'
  | 'comparison'
  | 'code-analysis'
  | 'debugging'
  | 'architecture'
  | 'practical'
  | 'scenario'
  | 'system-design';

export type InterviewMode = 'practice' | 'interview' | 'rapid-fire';

export type SelfRating = 'unknown' | 'partial' | 'good' | 'excellent';

export type InterviewFrequency = 'low' | 'medium' | 'high';

// ─── Code Snippet Model ───────────────────────────────────────────────────────

export interface CodeExample {
  language: 'swift' | 'objc';
  code: string;
  caption?: string;
  highlightLines?: number[];
}

// ─── Follow-Up Question Model ─────────────────────────────────────────────────

export interface FollowUpQuestion {
  id: string;
  parentQuestionId: string;
  question: string;
  modelAnswer: string;
  keyPoints: string[];
  difficulty: DifficultyLevel;
}

// ─── Interview Question Model ─────────────────────────────────────────────────

export interface InterviewQuestion {
  id: string; // Globally unique stable ID e.g. "interview.concurrency.actors.001"
  question: string;
  domainId: TopicCategory;
  moduleId: string;
  topicId: string; // References valid topic in curriculum
  difficulty: DifficultyLevel;
  type: InterviewQuestionType;
  estimatedMinutes?: number;
  tags: string[];
  modelAnswer: string;
  keyPoints: string[];
  commonMistakes: string[];
  followUps: FollowUpQuestion[];
  relatedTopics: string[]; // Topic IDs in Learn curriculum
  codeSnippet?: CodeExample;
  frequency: InterviewFrequency;
}

// ─── Active Session & Response Model ──────────────────────────────────────────

export interface InterviewResponse {
  questionId: string;
  selfRating?: SelfRating;
  timeSpent?: number; // seconds
  answerRevealed: boolean;
  followUpsViewed: string[]; // followUp IDs
  completed: boolean;
}

export type SessionStatus = 'not-started' | 'active' | 'completed' | 'abandoned';

export interface InterviewResult {
  overallScore: number; // 0-100
  categoryScores: Record<string, number>; // domainId -> 0-100
  answeredCount: number;
  questionCount: number;
  strengths: string[]; // domain IDs or topic titles
  weaknesses: string[]; // domain IDs or topic titles (< 60%)
  recommendedTopicIds: string[]; // Learn topic IDs to review
}

export interface InterviewSession {
  id: string;
  title: string;
  mode: InterviewMode;
  difficulty: DifficultyLevel;
  categoryIds: TopicCategory[];
  topicIds: string[];
  questionIds: string[];
  currentIndex: number;
  startedAt: string;
  completedAt?: string;
  status: SessionStatus;
  responses: Record<string, InterviewResponse>; // questionId -> response
  result?: InterviewResult;
}

// ─── Track Preset Model ───────────────────────────────────────────────────────

export interface InterviewTrack {
  id: string;
  level: DifficultyLevel;
  title: string;
  subtitle: string;
  description: string;
  defaultQuestionCount: number;
  estimatedMinutes: number;
  featuredDomains: TopicCategory[];
  badgeColor: string;
}
