import type { TopicCategory } from '@/types';

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { label: 'Home', href: '/dashboard', icon: 'Home' as const },
  { label: 'Learn', href: '/learn', icon: 'BookOpen' as const },
  { label: 'Playground', href: '/playground', icon: 'Terminal' as const },
  { label: 'Interview', href: '/interview', icon: 'MessageSquare' as const },
  { label: 'Challenges', href: '/interview', icon: 'Zap' as const },
  { label: 'Bookmarks', href: '/bookmarks', icon: 'Bookmark' as const },
  { label: 'Progress', href: '/progress', icon: 'BarChart3' as const },
] as const;

export const MOBILE_NAV_ITEMS = [
  { label: 'Home', href: '/dashboard', icon: 'Home' as const },
  { label: 'Learn', href: '/learn', icon: 'BookOpen' as const },
  { label: 'Interview', href: '/interview', icon: 'MessageSquare' as const },
  { label: 'Progress', href: '/progress', icon: 'BarChart3' as const },
  { label: 'Search', href: '/search', icon: 'Search' as const },
] as const;

export const SIDEBAR_TOPICS: { label: string; category: TopicCategory }[] = [
  { label: 'Swift', category: 'swift' },
  { label: 'SwiftUI', category: 'swiftui' },
  { label: 'UIKit', category: 'uikit' },
  { label: 'Objective-C', category: 'objc' },
  { label: 'Concurrency', category: 'concurrency' },
  { label: 'Architecture', category: 'architecture' },
];

// ─── Categories ───────────────────────────────────────────────────────────────

export const ALL_CATEGORIES: { label: string; value: TopicCategory }[] = [
  { label: 'Swift', value: 'swift' },
  { label: 'SwiftUI', value: 'swiftui' },
  { label: 'UIKit', value: 'uikit' },
  { label: 'Objective-C', value: 'objc' },
  { label: 'Concurrency', value: 'concurrency' },
  { label: 'Architecture', value: 'architecture' },
  { label: 'Networking', value: 'networking' },
  { label: 'Memory Management', value: 'memory' },
  { label: 'System Design', value: 'system-design' },
  { label: 'Debugging', value: 'debugging' },
];

// ─── Difficulty Levels ────────────────────────────────────────────────────────

export const DIFFICULTY_LEVELS = [
  { label: 'Junior', value: 'junior' },
  { label: 'Mid-Level', value: 'mid' },
  { label: 'Senior', value: 'senior' },
  { label: 'Staff', value: 'staff' },
] as const;

// ─── Breakpoints ──────────────────────────────────────────────────────────────

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ─── Product ──────────────────────────────────────────────────────────────────

export const PRODUCT_NAME = 'SwiftCraft';
export const PRODUCT_TAGLINE = 'iOS Engineering & Interview Platform';
