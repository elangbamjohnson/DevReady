import type { ArticleTopic } from '@/types';

export const memoryTopics: ArticleTopic[] = [
  {
    id: 'memory-arc',
    slug: 'arc',
    title: 'ARC & Reference Counting',
    category: 'memory',
    group: 'Memory Management',
    description: 'How Automatic Reference Counting tracks object lifetimes and when objects are deallocated.',
    difficulty: 'mid',
    estimatedTime: 12,
    language: 'swift',
    version: { language: 'Swift', version: '6', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['arc', 'reference-counting', 'deinit', 'memory'],
    relatedTopics: ['memory-weak-unowned', 'memory-retain-cycles', 'swift-struct-vs-class'],
    nextTopic: 'memory-weak-unowned',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'Automatic Reference Counting (ARC) tracks how many strong references point to each class instance. When the count drops to zero, ARC deallocates the instance. ARC operates at compile time — it inserts `retain` and `release` calls automatically.',
      },
      {
        type: 'code',
        id: 'code-arc',
        language: 'swift',
        content: `class Dog {
    let name: String
    init(name: String) {
        self.name = name
        print("\\(name) created")
    }
    deinit {
        print("\\(name) deallocated")
    }
}

var dog1: Dog? = Dog(name: "Rex")  // refCount = 1
var dog2 = dog1                    // refCount = 2
dog1 = nil                         // refCount = 1
dog2 = nil                         // refCount = 0 → deallocated`,
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'How does ARC differ from garbage collection?',
          'When does ARC not protect against memory leaks?',
          'What is a `deinit` and when is it called?',
          'Does ARC apply to structs?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['memory-weak-unowned', 'memory-retain-cycles'] },
    ],
  },

  {
    id: 'memory-weak-unowned',
    slug: 'weak-vs-unowned',
    title: 'weak vs unowned',
    category: 'memory',
    group: 'Memory Management',
    description: 'Choose correctly between weak and unowned references to break retain cycles without compromising safety.',
    difficulty: 'mid',
    estimatedTime: 10,
    language: 'swift',
    version: { language: 'Swift', version: '6', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['weak', 'unowned', 'retain-cycles', 'memory'],
    relatedTopics: ['memory-arc', 'memory-retain-cycles', 'swift-closures'],
    previousTopic: 'memory-arc',
    nextTopic: 'memory-retain-cycles',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'Both `weak` and `unowned` are non-retaining references that prevent retain cycles. `weak` becomes `nil` when the object is deallocated (safe, optional). `unowned` assumes the object is always alive — crashes if it has been deallocated (faster, but risky).',
      },
      {
        type: 'table',
        id: 't-comparison',
        headers: ['', 'weak', 'unowned'],
        rows: [
          { cells: ['Optional', 'Yes (`T?`)', 'No (`T`)'] },
          { cells: ['When object deallocates', 'Set to nil', 'Crash if accessed'] },
          { cells: ['Safety', 'Safe', 'Risky'] },
          { cells: ['Use when', 'Object can outlive reference holder', 'Reference holder can\'t outlive object'] },
          { cells: ['Performance', 'Slightly slower (nil-check)', 'Slightly faster'] },
        ],
      },
      {
        type: 'code',
        id: 'code-weak-unowned',
        language: 'swift',
        content: `class Owner {
    var pet: Pet?
}

class Pet {
    weak var owner: Owner?   // weak: owner can be nil (safe)
}

class CreditCard {
    unowned let customer: Customer  // unowned: card can't exist without customer
    init(customer: Customer) { self.customer = customer }
}`,
      },
      {
        type: 'callout',
        id: 'c-prefer-weak',
        variant: 'tip',
        title: 'When in doubt, use weak',
        content: 'Unless you have a clear, documented guarantee that the referenced object will always outlive the reference holder, prefer `weak`. A crash from `unowned` is much harder to debug than an optional-unwrap nil check.',
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What is the difference between weak and unowned?',
          'When would you choose unowned over weak?',
          'Can you use unowned with value types?',
          'What happens to a weak reference when the object is deallocated?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['memory-arc', 'memory-retain-cycles'] },
    ],
  },

  {
    id: 'memory-retain-cycles',
    slug: 'retain-cycles',
    title: 'Retain Cycles & Memory Leaks',
    category: 'memory',
    group: 'Memory Management',
    description: 'Identify and eliminate retain cycles using capture lists, weak references, and Xcode\'s Memory Graph Debugger.',
    difficulty: 'senior',
    estimatedTime: 14,
    language: 'swift',
    version: { language: 'Swift', version: '6', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['retain-cycles', 'memory-leaks', 'memory-graph', 'weak-self'],
    relatedTopics: ['memory-arc', 'memory-weak-unowned', 'swift-closures'],
    previousTopic: 'memory-weak-unowned',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'A retain cycle occurs when two or more objects hold strong references to each other, preventing ARC from ever reaching a reference count of zero. The objects leak — they are never deallocated even when no external code holds a reference to them.',
      },
      {
        type: 'code',
        id: 'code-cycle',
        language: 'swift',
        content: `// ✗ Classic retain cycle: A → B, B → A
class Parent {
    var child: Child?
    deinit { print("Parent deallocated") }
}

class Child {
    var parent: Parent?  // Strong reference back to Parent
    deinit { print("Child deallocated") }
}

var p: Parent? = Parent()
var c: Child? = Child()
p?.child = c
c?.parent = p   // Cycle created

p = nil
c = nil
// Neither deinit is ever called — memory leaked!`,
      },
      {
        type: 'code',
        id: 'code-fix',
        language: 'swift',
        content: `class Child {
    weak var parent: Parent?  // ✓ Break cycle with weak
    deinit { print("Child deallocated") }
}`,
      },
      {
        type: 'callout',
        id: 'c-instruments',
        variant: 'interview',
        title: 'Tools for Detection',
        content: 'Use Xcode\'s Memory Graph Debugger (Debug > Memory Graph) to visualize object graphs and find leaked objects. Instruments\' Leaks instrument can detect cycles at runtime.',
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'How do you detect a retain cycle in production?',
          'What is the most common retain cycle pattern in iOS development?',
          'How does [weak self] in a closure break a retain cycle?',
          'Can delegates cause retain cycles? How do you prevent them?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['memory-arc', 'memory-weak-unowned', 'swift-closures'] },
    ],
  },
];
