// File: src/components/TopicGroupList.tsx
// Method: export default function TopicGroupList()

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import TopicGroupSection from '@/components/TopicGroupSection';
import { isTopicComplete } from '@/lib/progressStore';
import { cn } from '@/lib/utils';
import type { DifficultyLevel } from '@/types';

export interface TopicItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: DifficultyLevel;
  description: string;
  defaultProgress: number;
  questionCount: number;
  estimatedTime: string;
}

export interface TopicGroupData {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  categoryBadgeClass: string;
  description: string;
  topics: TopicItem[];
}

const TOPIC_GROUPS: TopicGroupData[] = [
  {
    id: 'swift-fundamentals',
    title: 'Swift Fundamentals',
    category: 'swift',
    categoryLabel: 'Swift',
    categoryBadgeClass: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    description: 'Core language features every iOS developer must master.',
    topics: [
      {
        id: 'swift-optionals',
        slug: 'optionals',
        title: 'Optionals & Optional Chaining',
        category: 'swift',
        difficulty: 'junior',
        description: 'Understanding nil safety, optional binding, and the optional chaining operator.',
        defaultProgress: 100,
        questionCount: 8,
        estimatedTime: '~25m',
      },
      {
        id: 'swift-closures',
        slug: 'closures',
        title: 'Closures & Capture Lists',
        category: 'swift',
        difficulty: 'mid',
        description: 'Closure syntax, trailing closures, escaping closures, and capture semantics.',
        defaultProgress: 85,
        questionCount: 12,
        estimatedTime: '~35m',
      },
      {
        id: 'swift-protocols',
        slug: 'protocols',
        title: 'Protocols & Protocol Extensions',
        category: 'swift',
        difficulty: 'mid',
        description: 'Protocol composition, default implementations, and protocol-oriented design.',
        defaultProgress: 60,
        questionCount: 15,
        estimatedTime: '~45m',
      },
      {
        id: 'swift-generics',
        slug: 'generics',
        title: 'Generics & Type Constraints',
        category: 'swift',
        difficulty: 'senior',
        description: 'Generic functions, types, associated types, and where clauses.',
        defaultProgress: 40,
        questionCount: 10,
        estimatedTime: '~40m',
      },
    ],
  },
  {
    id: 'swift-concurrency',
    title: 'Swift Concurrency',
    category: 'concurrency',
    categoryLabel: 'Concurrency',
    categoryBadgeClass: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    description: 'Modern async/await, actors, and structured concurrency patterns.',
    topics: [
      {
        id: 'concurrency-actors',
        slug: 'actors-in-swift',
        title: 'Actors in Swift',
        category: 'concurrency',
        difficulty: 'senior',
        description: 'Actor isolation, actor reentrancy, and data race prevention using Swift actors.',
        defaultProgress: 80,
        questionCount: 14,
        estimatedTime: '~50m',
      },
      {
        id: 'concurrency-async-await',
        slug: 'async-await',
        title: 'async/await & Structured Concurrency',
        category: 'concurrency',
        difficulty: 'mid',
        description: 'async/await syntax, structured concurrency, Task hierarchy, and cancellation.',
        defaultProgress: 65,
        questionCount: 18,
        estimatedTime: '~60m',
      },
      {
        id: 'concurrency-task',
        slug: 'task',
        title: 'Task & Structured Concurrency',
        category: 'concurrency',
        difficulty: 'mid',
        description: 'Creating concurrent work, cooperative cancellation, and task priority hierarchy.',
        defaultProgress: 30,
        questionCount: 12,
        estimatedTime: '~40m',
      },
      {
        id: 'concurrency-mainactor',
        slug: 'mainactor',
        title: 'MainActor & Sendable',
        category: 'concurrency',
        difficulty: 'senior',
        description: 'Ensuring UI safety with @MainActor and thread-safe data transfer in Swift 6.',
        defaultProgress: 20,
        questionCount: 10,
        estimatedTime: '~35m',
      },
    ],
  },
  {
    id: 'swiftui-framework',
    title: 'SwiftUI & State Management',
    category: 'swiftui',
    categoryLabel: 'SwiftUI',
    categoryBadgeClass: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
    description: 'Declarative view lifecycle, reactive state flow, and modern observation.',
    topics: [
      {
        id: 'swiftui-state',
        slug: 'state',
        title: '@State & Local View State',
        category: 'swiftui',
        difficulty: 'junior',
        description: 'Private mutable state management and automatic SwiftUI view invalidation.',
        defaultProgress: 90,
        questionCount: 8,
        estimatedTime: '~20m',
      },
      {
        id: 'swiftui-binding',
        slug: 'binding',
        title: '@Binding & Two-Way Flow',
        category: 'swiftui',
        difficulty: 'junior',
        description: 'Connecting child view inputs to parent state without tight coupling.',
        defaultProgress: 75,
        questionCount: 6,
        estimatedTime: '~25m',
      },
      {
        id: 'swiftui-observation',
        slug: 'observation',
        title: '@Observable & Observation Framework',
        category: 'swiftui',
        difficulty: 'mid',
        description: 'Fine-grained observation replacing ObservableObject in iOS 17+.',
        defaultProgress: 45,
        questionCount: 12,
        estimatedTime: '~35m',
      },
      {
        id: 'swiftui-navigation',
        slug: 'navigation-stack',
        title: 'NavigationStack & Deep Linking',
        category: 'swiftui',
        difficulty: 'mid',
        description: 'Programmatic navigation, state restoration, and deep linking.',
        defaultProgress: 50,
        questionCount: 10,
        estimatedTime: '~30m',
      },
    ],
  },
  {
    id: 'uikit-framework',
    title: 'UIKit & Core Frameworks',
    category: 'uikit',
    categoryLabel: 'UIKit',
    categoryBadgeClass: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    description: 'View controller lifecycle, collection layouts, and diffable data sources.',
    topics: [
      {
        id: 'uikit-lifecycle',
        slug: 'viewcontroller-lifecycle',
        title: 'UIViewController Lifecycle',
        category: 'uikit',
        difficulty: 'junior',
        description: 'viewDidLoad, viewWillAppear, layout cycles, and proper cleanup.',
        defaultProgress: 95,
        questionCount: 10,
        estimatedTime: '~30m',
      },
      {
        id: 'uikit-tableview',
        slug: 'uitableview',
        title: 'UITableView & Diffable Data Source',
        category: 'uikit',
        difficulty: 'mid',
        description: 'Declarative snapshot updates, smooth animations, and cell registration.',
        defaultProgress: 70,
        questionCount: 12,
        estimatedTime: '~40m',
      },
      {
        id: 'uikit-collectionview',
        slug: 'uicollectionview',
        title: 'UICollectionView Compositional Layout',
        category: 'uikit',
        difficulty: 'senior',
        description: 'Item, Group, and Section hierarchies with orthogonal scrolling.',
        defaultProgress: 40,
        questionCount: 14,
        estimatedTime: '~45m',
      },
    ],
  },
  {
    id: 'memory-management',
    title: 'Memory Management & ARC',
    category: 'memory',
    categoryLabel: 'Memory',
    categoryBadgeClass: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    description: 'Object lifetime tracking, memory graph debugging, and leak prevention.',
    topics: [
      {
        id: 'memory-arc',
        slug: 'arc',
        title: 'ARC & Reference Counting',
        category: 'memory',
        difficulty: 'mid',
        description: 'Compile-time retain and release tracking and object deallocation.',
        defaultProgress: 85,
        questionCount: 10,
        estimatedTime: '~30m',
      },
      {
        id: 'memory-weak-unowned',
        slug: 'weak-vs-unowned',
        title: 'weak vs unowned References',
        category: 'memory',
        difficulty: 'mid',
        description: 'Breaking reference cycles while maintaining memory safety.',
        defaultProgress: 90,
        questionCount: 8,
        estimatedTime: '~25m',
      },
      {
        id: 'memory-retain-cycles',
        slug: 'retain-cycles',
        title: 'Retain Cycles & Memory Leaks',
        category: 'memory',
        difficulty: 'senior',
        description: 'Closure capture lists and Xcode Memory Graph Debugger diagnostics.',
        defaultProgress: 60,
        questionCount: 12,
        estimatedTime: '~40m',
      },
    ],
  },
  {
    id: 'architecture-patterns',
    title: 'Architecture & Design Patterns',
    category: 'architecture',
    categoryLabel: 'Architecture',
    categoryBadgeClass: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    description: 'Scalable mobile architecture, decoupled layers, and testability.',
    topics: [
      {
        id: 'arch-mvvm',
        slug: 'mvvm',
        title: 'MVVM in Modern SwiftUI',
        category: 'architecture',
        difficulty: 'mid',
        description: 'Model-View-ViewModel separation with protocol-backed services.',
        defaultProgress: 70,
        questionCount: 14,
        estimatedTime: '~45m',
      },
      {
        id: 'arch-di',
        slug: 'dependency-injection',
        title: 'Dependency Injection Patterns',
        category: 'architecture',
        difficulty: 'senior',
        description: 'Constructor injection, mock services, and modular test setup.',
        defaultProgress: 55,
        questionCount: 12,
        estimatedTime: '~40m',
      },
    ],
  },
];

function DifficultyBadge({ difficulty }: { difficulty: DifficultyLevel }) {
  const styles: Record<DifficultyLevel, { label: string; className: string }> = {
    junior: {
      label: 'Junior',
      className: 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20',
    },
    mid: {
      label: 'Mid',
      className: 'text-orange-400 bg-orange-400/10 border border-orange-400/20',
    },
    senior: {
      label: 'Senior',
      className: 'text-rose-400 bg-rose-400/10 border border-rose-400/20',
    },
    staff: {
      label: 'Staff',
      className: 'text-violet-400 bg-violet-400/10 border border-violet-400/20',
    },
  };

  const style = styles[difficulty] ?? styles.junior;

  return (
    <span
      className={cn(
        'text-xs px-2 py-0.5 rounded-md font-medium shrink-0',
        style.className
      )}
    >
      {style.label}
    </span>
  );
}

interface TopicRowItemProps {
  topic: TopicItem;
}

function TopicRowItem({ topic }: TopicRowItemProps) {
  const [isComplete] = useState(() => {
    if (typeof window === 'undefined') return false;
    return isTopicComplete(topic.id);
  });

  const progress = isComplete ? 100 : topic.defaultProgress;

  // Status dot color based on completion
  const dotColor =
    progress >= 80
      ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50'
      : 'bg-violet-500';

  // Progress fill color based on tier
  const progressFillColor =
    progress >= 80
      ? 'bg-emerald-500'
      : progress >= 60
      ? 'bg-violet-500'
      : 'bg-orange-400';

  return (
    <Link
      href={`/learn/${topic.category}/${topic.slug}`}
      className="flex flex-col md:flex-row md:items-center justify-between p-5 border-b border-neutral-800/60 last:border-0 hover:bg-[#1A1A1A] transition-colors cursor-pointer group"
    >
      {/* Row Left Side: Indicator Dot, Title, Difficulty Badge, Description */}
      <div className="flex flex-row items-start gap-4 min-w-0 flex-1 pr-4">
        {/* Indicator Dot */}
        <span className={cn('w-2 h-2 rounded-full mt-2 shrink-0', dotColor)} aria-hidden="true" />

        {/* Text Column */}
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-base font-semibold text-neutral-200 group-hover:text-white transition-colors leading-snug">
              {topic.title}
            </h3>
            <DifficultyBadge difficulty={topic.difficulty} />
          </div>
          <p className="text-sm text-neutral-500 mt-1 line-clamp-1 leading-relaxed">
            {topic.description}
          </p>
        </div>
      </div>

      {/* Row Right Side: Stats & Progress */}
      <div className="flex flex-row items-center gap-6 mt-4 md:mt-0 shrink-0">
        {/* Progress Section */}
        <div className="flex flex-col items-end">
          <div className="w-24 h-1 bg-neutral-800 rounded-full overflow-hidden">
            {progress > 0 && (
              <div
                className={cn('h-full rounded-full transition-all duration-500', progressFillColor)}
                style={{ width: `${progress}%` }}
              />
            )}
          </div>
          <span className="text-xs text-neutral-400 mt-1 font-mono tabular-nums">
            {progress}%
          </span>
        </div>

        {/* Meta Section */}
        <div className="flex flex-col items-end min-w-[70px]">
          <span className="text-xs text-neutral-400 whitespace-nowrap">
            {topic.questionCount} questions
          </span>
          <span className="text-xs text-neutral-500 mt-1 font-mono whitespace-nowrap">
            {topic.estimatedTime}
          </span>
        </div>

        {/* Chevron Icon */}
        <ChevronRight
          className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors shrink-0"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

export interface TopicGroupListProps {
  selectedCategory?: string;
  className?: string;
}

export default function TopicGroupList({
  selectedCategory = 'All',
  className,
}: TopicGroupListProps) {
  const filteredGroups = TOPIC_GROUPS.filter((group) => {
    if (selectedCategory === 'All') return true;
    const catLower = selectedCategory.toLowerCase();
    if (catLower === 'objective-c') {
      return group.category === 'objc' || group.category === 'memory';
    }
    return group.category.toLowerCase() === catLower;
  });

  return (
    <div className={cn('space-y-4', className)}>
      {filteredGroups.map((group) => {
        const completedCount = group.topics.filter((t) => {
          if (typeof window === 'undefined') return t.defaultProgress === 100;
          return isTopicComplete(t.id) || t.defaultProgress === 100;
        }).length;

        return (
          <TopicGroupSection
            key={group.id}
            title={group.title}
            category={group.category}
            categoryLabel={group.categoryLabel}
            categoryBadgeClass={group.categoryBadgeClass}
            completedCount={completedCount}
            totalCount={group.topics.length}
            description={group.description}
          >
            {/* List Container Wrapper */}
            <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl flex flex-col overflow-hidden">
              {group.topics.map((topic) => (
                <TopicRowItem key={topic.id} topic={topic} />
              ))}
            </div>
          </TopicGroupSection>
        );
      })}

      {filteredGroups.length === 0 && (
        <div className="text-center py-20 bg-[#141414] border border-neutral-800/80 rounded-2xl">
          <p className="text-sm text-neutral-400">
            No topics found for &ldquo;{selectedCategory}&rdquo;.
          </p>
        </div>
      )}
    </div>
  );
}
