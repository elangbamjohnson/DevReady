import type { PlatformStats, VersionInfo, LearningPath } from '@/types';

// ─── Platform Statistics ──────────────────────────────────────────────────────

export const platformStats: PlatformStats = {
  interviewQuestions: 500,
  coreTopics: 30,
  codeExamples: 200,
  technologies: ['Swift', 'SwiftUI', 'UIKit', 'Objective-C'],
};

// ─── Version Awareness ───────────────────────────────────────────────────────

export const versionInfo: VersionInfo[] = [
  { name: 'Swift 6', version: '6.0', status: 'current' },
  { name: 'iOS 26', version: '26', status: 'current' },
  { name: 'SwiftUI', version: '6.0', status: 'updated' },
  { name: 'Xcode', version: '26', status: 'current' },
];

// ─── Learning Paths ──────────────────────────────────────────────────────────

export const learningPaths: LearningPath[] = [
  {
    id: 'junior',
    level: 'junior',
    title: 'Junior iOS Developer',
    subtitle: 'Build strong fundamentals',
    description:
      'Start your iOS development journey with Swift fundamentals, UIKit basics, and core concepts every junior developer needs.',
    targetAudience: 'New to iOS or transitioning from another platform',
    estimatedHours: 40,
    topicCount: 25,
    highlights: [
      'Swift language fundamentals',
      'UIKit view lifecycle',
      'Auto Layout basics',
      'Networking with URLSession',
    ],
  },
  {
    id: 'mid',
    level: 'mid',
    title: 'Mid-Level iOS Developer',
    subtitle: 'Strengthen your engineering skills',
    description:
      'Deepen your understanding of Swift patterns, SwiftUI, concurrency, and modern iOS architecture.',
    targetAudience: '1–3 years of iOS experience',
    estimatedHours: 60,
    topicCount: 35,
    highlights: [
      'Protocol-oriented programming',
      'SwiftUI data flow',
      'Combine framework',
      'Unit testing strategies',
    ],
  },
  {
    id: 'senior',
    level: 'senior',
    title: 'Senior iOS Developer',
    subtitle: 'Architecture and systems thinking',
    description:
      'Master advanced concurrency, system design, performance optimization, and production-grade architecture patterns.',
    targetAudience: '3–6 years of iOS experience',
    estimatedHours: 80,
    topicCount: 40,
    highlights: [
      'Swift Concurrency deep dive',
      'Modular architecture',
      'Performance profiling',
      'Advanced debugging',
    ],
  },
  {
    id: 'staff',
    level: 'staff',
    title: 'Staff / Lead Engineer',
    subtitle: 'Scaling, architecture and technical leadership',
    description:
      'Tackle cross-team architecture decisions, scalable module design, build systems, and technical leadership for large-scale iOS applications.',
    targetAudience: '6+ years and leadership responsibilities',
    estimatedHours: 100,
    topicCount: 30,
    highlights: [
      'Large-scale app architecture',
      'Build system optimization',
      'Technical decision-making',
      'Cross-platform strategy',
    ],
  },
];
