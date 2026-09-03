import type { TopicProgress, ActivityItem, OverallReadiness } from '@/types';

export const overallReadiness: OverallReadiness = {
  score: 68,
  targetRole: 'Senior iOS Engineer',
  totalQuestionsPracticed: 142,
  streakDays: 12,
};

export const topicProgress: TopicProgress[] = [
  { category: 'swift', label: 'Swift', percentage: 90, completedCount: 18, totalCount: 20 },
  { category: 'swiftui', label: 'SwiftUI', percentage: 70, completedCount: 14, totalCount: 20 },
  { category: 'uikit', label: 'UIKit', percentage: 80, completedCount: 16, totalCount: 20 },
  { category: 'concurrency', label: 'Concurrency', percentage: 50, completedCount: 10, totalCount: 20 },
  { category: 'architecture', label: 'Architecture', percentage: 40, completedCount: 8, totalCount: 20 },
  { category: 'objc', label: 'Objective-C', percentage: 60, completedCount: 12, totalCount: 20 },
  { category: 'networking', label: 'Networking', percentage: 75, completedCount: 15, totalCount: 20 },
  { category: 'memory', label: 'Memory Mgmt', percentage: 65, completedCount: 13, totalCount: 20 },
  { category: 'system-design', label: 'System Design', percentage: 30, completedCount: 6, totalCount: 20 },
  { category: 'debugging', label: 'Debugging', percentage: 55, completedCount: 11, totalCount: 20 },
];

export const recentActivity: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Completed Actors in Swift',
    type: 'completed',
    timestamp: '2 hours ago',
    category: 'concurrency',
  },
  {
    id: 'act-2',
    title: 'Practiced Concurrency Questions',
    type: 'practiced',
    timestamp: '5 hours ago',
    category: 'concurrency',
  },
  {
    id: 'act-3',
    title: 'Bookmarked MVVM in SwiftUI',
    type: 'bookmarked',
    timestamp: '1 day ago',
    category: 'architecture',
  },
  {
    id: 'act-4',
    title: 'Completed UIKit Lifecycle',
    type: 'completed',
    timestamp: '1 day ago',
    category: 'uikit',
  },
  {
    id: 'act-5',
    title: 'Practiced Memory Management',
    type: 'practiced',
    timestamp: '2 days ago',
    category: 'memory',
  },
  {
    id: 'act-6',
    title: 'Completed Async/Await Fundamentals',
    type: 'completed',
    timestamp: '3 days ago',
    category: 'concurrency',
  },
];
