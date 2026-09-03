import type { SearchResult, Bookmark } from '@/types';

export const mockSearchResults: SearchResult[] = [
  { id: 'sr-1', title: 'ARC & Reference Counting', category: 'memory', type: 'topic', snippet: 'Automatic Reference Counting, strong/weak/unowned references...', href: '/learn?category=memory' },
  { id: 'sr-2', title: 'weak vs unowned', category: 'memory', type: 'question', snippet: 'What is the difference between weak and unowned in Swift?', href: '/interview' },
  { id: 'sr-3', title: 'Retain Cycles & Memory Leaks', category: 'memory', type: 'topic', snippet: 'Identifying retain cycles, closure capture lists, delegate patterns...', href: '/learn?category=memory' },
  { id: 'sr-4', title: 'Memory Management Interview Questions', category: 'memory', type: 'question', snippet: 'How do you diagnose and eliminate retain cycles using Xcode?', href: '/interview' },
  { id: 'sr-5', title: 'Closure Capture Lists', category: 'swift', type: 'code', snippet: '{ [weak self] in ... } — preventing retain cycles in closures', href: '/learn?category=swift' },
  { id: 'sr-6', title: 'Actors in Swift', category: 'concurrency', type: 'topic', snippet: 'Actor isolation, reentrancy, @MainActor, global actors...', href: '/learn?category=concurrency' },
  { id: 'sr-7', title: 'Task Groups', category: 'concurrency', type: 'topic', snippet: 'TaskGroup, ThrowingTaskGroup, task cancellation...', href: '/learn?category=concurrency' },
  { id: 'sr-8', title: 'MVVM in SwiftUI', category: 'architecture', type: 'topic', snippet: 'Model-View-ViewModel pattern with @Observable...', href: '/learn?category=architecture' },
];

export const mockBookmarks: Bookmark[] = [
  { id: 'bm-1', title: 'Actors in Swift', category: 'concurrency', type: 'topic', description: 'Actor isolation, reentrancy, @MainActor, global actors, and Sendable conformance.', savedAt: '2 days ago' },
  { id: 'bm-2', title: 'MainActor & Global Actors', category: 'concurrency', type: 'topic', description: '@MainActor annotation, global actor isolation, and UI thread safety in Swift 6.', savedAt: '3 days ago' },
  { id: 'bm-3', title: 'Retain Cycles & Memory Leaks', category: 'memory', type: 'topic', description: 'Identifying retain cycles, closure capture lists, delegate patterns, and Memory Graph Debugger.', savedAt: '4 days ago' },
  { id: 'bm-4', title: 'Dependency Injection', category: 'architecture', type: 'topic', description: 'Constructor injection, environment injection, protocol-based DI, and DI containers.', savedAt: '5 days ago' },
  { id: 'bm-5', title: 'MVVM in SwiftUI', category: 'architecture', type: 'topic', description: 'Model-View-ViewModel pattern, @Observable view models, and reactive data binding.', savedAt: '1 week ago' },
  { id: 'bm-6', title: 'weak vs unowned in Swift', category: 'memory', type: 'question', description: 'What is the difference between weak and unowned in Swift?', savedAt: '1 week ago' },
  { id: 'bm-7', title: 'TaskGroup Cancellation', category: 'concurrency', type: 'question', description: 'How does TaskGroup handle cancellation and error propagation?', savedAt: '2 weeks ago' },
];
