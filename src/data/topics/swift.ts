import type { ArticleTopic } from '@/types';

export const swiftTopics: ArticleTopic[] = [
  // ─── Optionals ─────────────────────────────────────────────────────────────
  {
    id: 'swift-optionals',
    slug: 'optionals',
    title: 'Optionals',
    category: 'swift',
    group: 'Swift Fundamentals',
    description: 'Understand optional types, safe unwrapping techniques, guard let, if let, and nil coalescing.',
    difficulty: 'junior',
    estimatedTime: 8,
    language: 'swift',
    version: { language: 'Swift', version: '6', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'medium',
    tags: ['optionals', 'safety', 'nil', 'guard', 'if-let'],
    relatedTopics: ['swift-closures', 'swift-protocols'],
    nextTopic: 'swift-struct-vs-class',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'An Optional in Swift is a type that can hold either a value or `nil`. It is expressed as `Type?` (e.g., `String?`). Swift forces you to unwrap optionals before using the underlying value, preventing null pointer exceptions at compile time.',
      },
      {
        type: 'heading',
        id: 'h-unwrap',
        level: 2,
        content: 'Safe Unwrapping',
      },
      {
        type: 'code',
        id: 'code-unwrap',
        language: 'swift',
        content: `let name: String? = "Alice"

// if let (scoped binding)
if let name {
    print("Hello, \\(name)")
}

// guard let (early exit)
func greet(_ name: String?) {
    guard let name else { return }
    print("Hello, \\(name)")
}

// Nil coalescing (provide a default)
let display = name ?? "Guest"

// Optional chaining (propagates nil)
let count = name?.count  // Int?`,
      },
      {
        type: 'callout',
        id: 'c-force',
        variant: 'warning',
        title: 'Force Unwrapping is Dangerous',
        content: 'Using `!` to force-unwrap an optional will crash at runtime if the value is nil. Only force-unwrap when you have an absolute guarantee the value exists — and prefer safer alternatives in production code.',
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'medium',
        questions: [
          'What is the difference between `if let` and `guard let`?',
          'When is force-unwrapping acceptable?',
          'What is optional chaining and what does it return?',
          'How does nil coalescing work?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['swift-closures', 'swift-protocols'] },
    ],
  },

  // ─── Struct vs Class ───────────────────────────────────────────────────────
  {
    id: 'swift-struct-vs-class',
    slug: 'struct-vs-class',
    title: 'Struct vs Class',
    category: 'swift',
    group: 'Swift Fundamentals',
    description: 'Understand value semantics, reference semantics, and when to choose struct over class in Swift.',
    difficulty: 'junior',
    estimatedTime: 10,
    language: 'swift',
    version: { language: 'Swift', version: '6', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['struct', 'class', 'value-semantics', 'reference-semantics', 'copy-on-write'],
    relatedTopics: ['swift-optionals', 'swift-protocols', 'memory-arc'],
    previousTopic: 'swift-optionals',
    nextTopic: 'swift-closures',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'Structs use **value semantics** — each assignment creates an independent copy. Classes use **reference semantics** — multiple variables can reference the same object. Prefer structs by default in Swift; use classes when you need identity, inheritance, or Objective-C interop.',
      },
      {
        type: 'comparison',
        id: 'comp-1',
        leftLabel: 'Struct (Value Semantics)',
        rightLabel: 'Class (Reference Semantics)',
        leftLanguage: 'swift',
        rightLanguage: 'swift',
        leftCode: `struct Point {
    var x: Int
    var y: Int
}

var a = Point(x: 0, y: 0)
var b = a   // Independent copy
b.x = 10
// a.x is still 0`,
        rightCode: `class Point {
    var x: Int
    var y: Int
    init(x: Int, y: Int) {
        self.x = x; self.y = y
    }
}

let a = Point(x: 0, y: 0)
let b = a   // Same reference
b.x = 10
// a.x is now 10`,
      },
      {
        type: 'table',
        id: 't-diff',
        headers: ['Feature', 'Struct', 'Class'],
        rows: [
          { cells: ['Type', 'Value', 'Reference'] },
          { cells: ['Memory', 'Stack (usually)', 'Heap'] },
          { cells: ['Inheritance', 'No', 'Yes'] },
          { cells: ['ARC', 'No', 'Yes'] },
          { cells: ['Mutability control', 'Via `let`/`var`', 'Independent of `let`/`var`'] },
          { cells: ['Thread safety', 'Copies are safe', 'Requires synchronization'] },
        ],
      },
      {
        type: 'callout',
        id: 'c-prefer-struct',
        variant: 'tip',
        title: 'Swift standard library uses structs heavily',
        content: 'String, Array, Dictionary, and Set are all structs in Swift. They use copy-on-write optimization to avoid unnecessary copies while maintaining value semantics.',
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What is the difference between value semantics and reference semantics?',
          'When would you choose a class over a struct?',
          'What is copy-on-write optimization?',
          'Are structs always stored on the stack?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['swift-protocols', 'memory-arc'] },
    ],
  },

  // ─── Closures ─────────────────────────────────────────────────────────────
  {
    id: 'swift-closures',
    slug: 'closures',
    title: 'Closures & Capture Lists',
    category: 'swift',
    group: 'Swift Fundamentals',
    description: 'Master closure syntax, value capturing, escaping vs non-escaping closures, and memory-safe capture lists.',
    difficulty: 'mid',
    estimatedTime: 12,
    language: 'swift',
    version: { language: 'Swift', version: '6', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['closures', 'capture-list', 'weak-self', 'escaping', 'trailing-closure'],
    relatedTopics: ['swift-struct-vs-class', 'memory-retain-cycles', 'memory-arc'],
    previousTopic: 'swift-struct-vs-class',
    nextTopic: 'swift-protocols',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'A closure is a self-contained block of code that captures and stores references to variables from its surrounding context. In Swift, closures that outlive their creation scope are called **escaping** (`@escaping`) and require explicit capture lists to manage memory safely.',
      },
      {
        type: 'heading',
        id: 'h-syntax',
        level: 2,
        content: 'Syntax Shorthand',
      },
      {
        type: 'code',
        id: 'code-syntax',
        language: 'swift',
        content: `let numbers = [3, 1, 4, 1, 5]

// Full form
let sorted = numbers.sorted(by: { (a: Int, b: Int) -> Bool in a < b })

// Type inference
let sorted2 = numbers.sorted(by: { a, b in a < b })

// Shorthand argument names
let sorted3 = numbers.sorted(by: { $0 < $1 })

// Trailing closure (when last argument is a closure)
let sorted4 = numbers.sorted { $0 < $1 }`,
      },
      {
        type: 'heading',
        id: 'h-capture',
        level: 2,
        content: 'Capture Lists & Retain Cycles',
      },
      {
        type: 'code',
        id: 'code-capture',
        language: 'swift',
        content: `class ViewController: UIViewController {
    var name = "Alice"

    // ✗ Retain cycle — closure captures self strongly
    func badExample() {
        someAsync { [self] in
            print(self.name)  // Cycle: self → closure → self
        }
    }

    // ✓ Weak capture — no retain cycle
    func goodExample() {
        someAsync { [weak self] in
            guard let self else { return }
            print(self.name)
        }
    }
}`,
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What is the difference between escaping and non-escaping closures?',
          'How does [weak self] prevent retain cycles?',
          'When would you use [unowned self] instead of [weak self]?',
          'What does @autoclosure do?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['memory-retain-cycles', 'swift-protocols'] },
    ],
  },

  // ─── Protocols ────────────────────────────────────────────────────────────
  {
    id: 'swift-protocols',
    slug: 'protocols',
    title: 'Protocols & Protocol Extensions',
    category: 'swift',
    group: 'Advanced Swift',
    description: 'Protocol-oriented programming, default implementations, associated types, and protocol composition.',
    difficulty: 'mid',
    estimatedTime: 15,
    language: 'swift',
    version: { language: 'Swift', version: '6', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['protocols', 'POP', 'associated-types', 'protocol-composition'],
    relatedTopics: ['swift-generics', 'swift-closures', 'arch-di'],
    previousTopic: 'swift-closures',
    nextTopic: 'swift-generics',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'A protocol defines a blueprint of methods, properties, and other requirements. Protocols enable **protocol-oriented programming** — Swift\'s preferred composition model over class inheritance. Protocol extensions provide default implementations that work across all conforming types.',
      },
      {
        type: 'code',
        id: 'code-protocol',
        language: 'swift',
        content: `protocol Describable {
    var description: String { get }
    func describe() -> String
}

// Protocol extension provides default implementation
extension Describable {
    func describe() -> String {
        "Object: \\(description)"
    }
}

struct User: Describable {
    var description: String { "User(name: Alice)" }
    // describe() is inherited from extension
}`,
      },
      {
        type: 'callout',
        id: 'c-assoc',
        variant: 'info',
        title: 'Associated Types',
        content: 'Protocols with associated types (PATs) define generic protocols — they declare a placeholder type that conforming types must specify. Example: `protocol Container { associatedtype Item; var items: [Item] { get } }`.',
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'How does protocol-oriented programming differ from OOP?',
          'What is a protocol with an associated type?',
          'What is type erasure and when do you need it?',
          'What is the difference between a protocol constraint and a protocol conformance?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['swift-generics', 'arch-di'] },
    ],
  },

  // ─── Generics ─────────────────────────────────────────────────────────────
  {
    id: 'swift-generics',
    slug: 'generics',
    title: 'Generics & Type Constraints',
    category: 'swift',
    group: 'Advanced Swift',
    description: 'Write flexible, reusable code with generics, where clauses, opaque types, and type erasure patterns.',
    difficulty: 'senior',
    estimatedTime: 18,
    language: 'swift',
    version: { language: 'Swift', version: '6', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['generics', 'type-constraints', 'opaque-types', 'some', 'any'],
    relatedTopics: ['swift-protocols', 'arch-di'],
    previousTopic: 'swift-protocols',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'Generics let you write flexible functions and types that work with any type satisfying given constraints, without sacrificing type safety. Swift resolves generic types at compile time, allowing full optimization.',
      },
      {
        type: 'code',
        id: 'code-generic',
        language: 'swift',
        content: `// Generic function with constraint
func max<T: Comparable>(_ a: T, _ b: T) -> T {
    a > b ? a : b
}

// Generic type
struct Stack<Element> {
    private var storage: [Element] = []
    mutating func push(_ element: Element) { storage.append(element) }
    mutating func pop() -> Element? { storage.popLast() }
}

// Opaque type (Swift 5.1+)
func makeAnimal() -> some Animal {
    Dog()  // Caller knows it's "some Animal" — not the concrete type
}

// any (existential, Swift 5.7+)
func process(_ animal: any Animal) { ... }`,
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What is the difference between `some` and `any` in Swift?',
          'When would you use a generic function vs an overloaded function?',
          'What is type erasure and how do you implement it?',
          'What are where clauses used for?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['swift-protocols'] },
    ],
  },
];
