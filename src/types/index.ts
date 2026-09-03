// ─── Category & Difficulty ────────────────────────────────────────────────────

export type TopicCategory =
  | 'swift'
  | 'swiftui'
  | 'uikit'
  | 'concurrency'
  | 'architecture'
  | 'networking'
  | 'memory'
  | 'objc'
  | 'system-design'
  | 'debugging';

export type DifficultyLevel = 'junior' | 'mid' | 'senior' | 'staff';
export type CompletionStatus = 'not-started' | 'in-progress' | 'completed';
export type InterviewRelevance = 'low' | 'medium' | 'high';
export type VersionStatus = 'current' | 'beta' | 'updated' | 'deprecated' | 'introduced';

// ─── Version Metadata ─────────────────────────────────────────────────────────

export interface VersionMetadata {
  language?: string;      // "Swift", "Objective-C"
  platform?: string;      // "iOS", "macOS"
  version: string;        // "6", "26"
  status: VersionStatus;
  minimumVersion?: string;  // "5.5"
  lastReviewed?: string;    // "2026-09-01"
  introducedIn?: string;    // "Swift 5.5"
}

// ─── Content Blocks (discriminated union) ─────────────────────────────────────

export interface HeadingBlock {
  type: 'heading';
  id: string;
  level: 1 | 2 | 3;
  content: string;
}

export interface ParagraphBlock {
  type: 'paragraph';
  id: string;
  content: string;  // supports inline `code` via backtick syntax
}

export interface CodeBlock {
  type: 'code';
  id: string;
  language: 'swift' | 'objc' | 'json' | 'bash' | 'text';
  content: string;
  filename?: string;
  caption?: string;
  highlightLines?: number[];
}

export type CalloutVariant = 'info' | 'tip' | 'warning' | 'important' | 'interview';

export interface CalloutBlock {
  type: 'callout';
  id: string;
  variant: CalloutVariant;
  title?: string;
  content: string;
}

export interface ListBlock {
  type: 'list';
  id: string;
  ordered: boolean;
  items: string[];  // supports inline `code` via backtick syntax
}

export interface TableRow {
  cells: string[];
}

export interface TableBlock {
  type: 'table';
  id: string;
  caption?: string;
  headers: string[];
  rows: TableRow[];
}

export interface ComparisonItem {
  label: string;
  left: string;
  right: string;
}

export interface ComparisonBlock {
  type: 'comparison';
  id: string;
  leftLabel: string;
  rightLabel: string;
  leftLanguage?: 'swift' | 'objc';
  rightLanguage?: 'swift' | 'objc';
  leftCode?: string;
  rightCode?: string;
  rows?: ComparisonItem[];
}

export interface QuickAnswerBlock {
  type: 'quickAnswer';
  id: string;
  content: string;
}

export interface InterviewBlock {
  type: 'interview';
  id: string;
  title?: string;
  questions: string[];
  relevance: InterviewRelevance;
}

export interface RelatedTopicsBlock {
  type: 'relatedTopics';
  id: string;
  topicIds: string[];
}

export interface DividerBlock {
  type: 'divider';
  id: string;
}

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | CodeBlock
  | CalloutBlock
  | ListBlock
  | TableBlock
  | ComparisonBlock
  | QuickAnswerBlock
  | InterviewBlock
  | RelatedTopicsBlock
  | DividerBlock;

// ─── Article Topic (Phase 2 full topic) ──────────────────────────────────────

export interface ArticleTopic {
  id: string;
  slug: string;           // URL slug e.g. "actors-in-swift"
  title: string;
  category: TopicCategory;
  group: string;          // e.g. "Swift Concurrency"
  description: string;
  difficulty: DifficultyLevel;
  estimatedTime: number;  // minutes
  language?: 'swift' | 'objective-c' | 'mixed';
  version?: VersionMetadata;
  interviewRelevance?: InterviewRelevance;
  tags: string[];
  content: ContentBlock[];
  relatedTopics: string[];    // topic IDs
  previousTopic?: string;     // topic ID
  nextTopic?: string;         // topic ID
}

// ─── Legacy Topic (Phase 1 – retained for compatibility) ─────────────────────

export interface Topic {
  id: string;
  title: string;
  category: TopicCategory;
  difficulty: DifficultyLevel;
  description: string;
  progress: number; // 0–100
  readTimeMinutes: number;
  completionStatus: CompletionStatus;
  tags: string[];
  updatedVersion?: string;
}

export interface TopicGroup {
  id: string;
  title: string;
  category: TopicCategory;
  description: string;
  topics: Topic[];
}

// Legacy lesson blocks (retained for existing learn/[topicId] page)
export type LessonBlockType = 'paragraph' | 'code' | 'alert' | 'heading';

export interface LessonBlock {
  id: string;
  type: LessonBlockType;
  content: string;
  language?: string;
  alertType?: 'info' | 'warning' | 'tip';
}

export interface LessonContent {
  topicId: string;
  blocks: LessonBlock[];
}

// ─── Local Progress ───────────────────────────────────────────────────────────

export interface LocalProgressRecord {
  topicId: string;
  completed: boolean;
  progress: number;  // 0–100 (scroll percentage)
  lastViewedAt: string;  // ISO string
}

// ─── Interview Question ───────────────────────────────────────────────────────

export interface InterviewQuestion {
  id: string;
  question: string;
  category: TopicCategory;
  difficulty: DifficultyLevel;
  estimatedTime: string;
  tags: string[];
  thinkPrompt: string;
  answerSummary: string;
  codeSnippet?: string;
  keyTakeaways: string[];
  isBookmarked: boolean;
}

// ─── Learning Path ────────────────────────────────────────────────────────────

export interface LearningPath {
  id: string;
  level: DifficultyLevel;
  title: string;
  subtitle: string;
  description: string;
  targetAudience: string;
  estimatedHours: number;
  topicCount: number;
  highlights: string[];
}

// ─── Progress ─────────────────────────────────────────────────────────────────

export interface TopicProgress {
  category: TopicCategory;
  label: string;
  percentage: number;
  completedCount: number;
  totalCount: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  type: 'completed' | 'practiced' | 'bookmarked';
  timestamp: string;
  category: TopicCategory;
}

export interface OverallReadiness {
  score: number;
  targetRole: string;
  totalQuestionsPracticed: number;
  streakDays: number;
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface UserProfile {
  name: string;
  handle: string;
  role: string;
  avatarUrl?: string;
  targetLevel: DifficultyLevel;
  memberSince: string;
}

// ─── Search ───────────────────────────────────────────────────────────────────

export interface SearchResult {
  id: string;
  title: string;
  category: TopicCategory;
  type: 'topic' | 'question' | 'code';
  snippet: string;
  href: string;
}

// ─── Bookmark ─────────────────────────────────────────────────────────────────

export interface Bookmark {
  id: string;
  title: string;
  category: TopicCategory;
  type: 'topic' | 'question';
  description: string;
  savedAt: string;
  href?: string;
}

// ─── Platform Stats (for landing page) ────────────────────────────────────────

export interface PlatformStats {
  interviewQuestions: number;
  coreTopics: number;
  codeExamples: number;
  technologies: string[];
}

// ─── Version Info ─────────────────────────────────────────────────────────────

export interface VersionInfo {
  name: string;
  version: string;
  status: VersionStatus;
}
