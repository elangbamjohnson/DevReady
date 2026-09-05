import type { ArticleTopic } from '@/types';

export const swiftTopics: ArticleTopic[] = [
  // ─── Variables, Constants & Type Inference ─────────────────────────────────
  {
    id: 'swift-variables-types',
    slug: 'variables-and-types',
    title: 'Variables, Constants & Type Inference',
    category: 'swift',
    group: 'Swift Fundamentals',
    description: "Type safety, type inference, let vs var, and type aliases — how Swift decides what a value's type is and whether it can change.",
    difficulty: 'foundational',
    estimatedTime: 20,
    language: 'swift',
    version: { language: 'Swift', version: '6', minimumVersion: '1.0', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['variables', 'types', 'type-inference', 'let', 'var'],
    relatedTopics: ['swift-optionals', 'swift-control-flow', 'swift-functions'],
    furtherReading: [
      {
        title: 'The Basics — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics',
        source: 'swift-org',
      },
    ],
    nextTopic: 'swift-optionals',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: "let declares a constant — give it a value once, and that name can never be reassigned. var declares a variable — its value can be reassigned later. Swift also figures out each one's type automatically from the value you give it, and that type is locked in from then on. A typealias just gives an existing type a second name — it doesn't create a new type.",
      },
      {
        type: 'heading',
        id: 'h-what-is-it',
        level: 2,
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        id: 'p-what-intro',
        content: 'Every stored value in Swift needs a name, and you choose one of two ways to declare it.',
      },
      {
        type: 'paragraph',
        id: 'p-what-let',
        content: "**let — a constant.** Once you assign a value to a let, it's permanent for the life of that constant — trying to assign it again is a compile error, not a runtime warning. Use let for anything that shouldn't change after it's set: a person's date of birth, a configuration value loaded at startup, an ID passed into a function, the result of a calculation you're about to use but never modify.",
      },
      {
        type: 'paragraph',
        id: 'p-what-var',
        content: '**var — a variable.** A var can be reassigned as many times as you need. Use it for anything that\'s expected to change over its lifetime: a loop counter, a running total, a piece of UI state like "is this toggle on," or a value you build up step by step before it\'s finished.',
      },
      {
        type: 'paragraph',
        id: 'p-what-why',
        content: '**Why this distinction exists.** Many languages only have one general-purpose way to declare a name, and whether it\'s safe to reassign is left to convention and memory. Swift makes the intent explicit in the code itself — and enforces it. This isn\'t just a style preference: a name declared let is a guarantee the compiler checks for you, which means a whole category of bugs (something changed a value you didn\'t expect to change) simply can\'t happen.',
      },
      {
        type: 'paragraph',
        id: 'p-what-practice',
        content: '**In practice**, Swift developers are encouraged to default to let and only switch to var when a value genuinely needs to change. This is a deliberate habit: it makes code easier to reason about, because seeing let tells you immediately "this value is fixed here," without having to trace the rest of the function to check.',
      },
      {
        type: 'heading',
        id: 'h-let-vs-var',
        level: 2,
        content: 'let vs var',
      },
      {
        type: 'code',
        id: 'code-let-vs-var',
        language: 'swift',
        caption: 'Reassignment vs. mutation',
        content: `let maxRetries = 3
// maxRetries = 4   // ❌ compile error — cannot reassign a let

var attempts = 0
attempts += 1        // ✅ var allows reassignment

// The subtlety: let on a reference type only freezes the *binding*,
// not the object's own mutable state.
class Counter {
    var value = 0
}

let counter = Counter()
counter.value += 1   // ✅ allowed — counter itself wasn't reassigned,
                      //    only a property on the object it points to
// counter = Counter() // ❌ compile error — this WOULD be reassignment`,
      },
      {
        type: 'callout',
        id: 'c-ref-mutability',
        variant: 'warning',
        title: 'Warning',
        content: '`let` on a class instance does not make the instance immutable — it only prevents the constant from being pointed at a different object. If you need the object\'s own properties to be unchangeable, declare those properties `let` inside the class itself, or use a struct instead.',
      },
      {
        type: 'heading',
        id: 'h-type-inference',
        level: 2,
        content: 'Type inference',
      },
      {
        type: 'code',
        id: 'code-type-inference',
        language: 'swift',
        caption: 'Inference and when annotation is required',
        content: `let name = "Johnson"        // inferred: String
let count = 5                // inferred: Int
let ratio = 5 / 2             // inferred: Int → value is 2, not 2.5

let precise: Double = 5 / 2   // still Int division first, then converted — still 2.0!
let correct = 5.0 / 2.0        // Double from the start — 2.5

var total: Int                // no initializer yet — annotation required
total = 10`,
      },
      {
        type: 'callout',
        id: 'c-numeric-literals',
        variant: 'tip',
        title: 'Tip',
        content: 'Numeric literals default to `Int` (whole numbers) or `Double` (decimals) unless the surrounding context suggests otherwise. This is a common interview trap: `5 / 2` performs integer division and evaluates to `2`, regardless of what type you eventually assign the result to — the division happens before any conversion.',
      },
      {
        type: 'heading',
        id: 'h-type-aliases',
        level: 2,
        content: 'Type aliases',
      },
      {
        type: 'code',
        id: 'code-type-aliases',
        language: 'swift',
        caption: 'typealias is not a new type',
        content: `typealias UserID = String

let id: UserID = "abc123"
let raw: String = id   // ✅ fully interchangeable — no type-safety boundary

// If you actually need distinct, non-interchangeable identity:
struct StrongUserID {
    let rawValue: String
}
// StrongUserID and String are now genuinely different types —
// the compiler will reject accidental interchange.`,
      },
      {
        type: 'heading',
        id: 'h-common-mistakes',
        level: 2,
        content: 'Common mistakes',
      },
      {
        type: 'list',
        id: 'l-common-mistakes',
        ordered: false,
        items: [
          'Assuming `let` on a class instance makes the whole object immutable — it only locks the reference, not the object\'s internal `var` properties.',
          'Treating integer division as if it produces a fractional result — `5 / 2` is `2`, not `2.5`, because both operands are inferred as `Int` before any conversion happens.',
          'Using a `typealias` when what\'s actually needed is a distinct type for compile-time safety (e.g. preventing a `UserID` from being passed where a plain `String` is expected) — a typealias won\'t catch that; a wrapper struct will.',
        ],
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          "What's the difference between `let` and `var`, and does `let` ever allow mutation?",
          'Does a class instance stored in a `let` constant become fully immutable?',
          "How does Swift's type inference work, and when do you need an explicit type annotation?",
          'Does a `typealias` create a new, distinct type?',
        ],
      },
      {
        type: 'relatedTopics',
        id: 'related',
        topicIds: ['swift-optionals', 'swift-control-flow', 'swift-functions'],
      },
    ],
  },

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
    furtherReading: [
      {
        title: 'Optional — Swift Standard Library',
        url: 'https://developer.apple.com/documentation/swift/optional',
        source: 'apple-developer',
      },
      {
        title: 'The Basics (Optionals section) — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics',
        source: 'swift-org',
      },
    ],
    nextTopic: 'swift-struct-vs-class',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'An Optional in Swift is a type that can hold either a value or `nil`. It is expressed as `Type?` (e.g., `String?`). Swift forces you to unwrap optionals before using the underlying value, preventing null pointer exceptions at compile time.',
      },
      {
        type: 'heading',
        id: 'h-why',
        level: 2,
        content: 'Why does it matter?',
      },
      {
        type: 'paragraph',
        id: 'p-why-1',
        content: 'In most languages — JavaScript, Python, Objective-C, Java — any variable can secretly be `null` or `nil`, and the compiler has no way to warn you. You might write code that looks completely safe, but when that variable turns out to be null at runtime, your app crashes. Often the crash happens far from where the null actually came from, making it frustrating to debug.',
      },
      {
        type: 'paragraph',
        id: 'p-why-2',
        content: "Swift takes a different philosophy: if a value *might* be absent, its type **says so explicitly**. A regular `String` can never be nil — if you need to represent \"no string,\" you have to declare it as `String?` (an Optional String), and Swift **requires** you to handle that possibility before you can use the value inside.",
      },
      {
        type: 'paragraph',
        id: 'p-why-3',
        content: "This doesn't eliminate the problem of missing values — every program has to deal with absent data sometimes. What it does is move the problem from \"crashes at runtime\" to \"compiler tells you upfront.\" You get a compile-time error instead of a 3am production crash.",
      },
      {
        type: 'heading',
        id: 'h-how',
        level: 2,
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        id: 'p-how-enum',
        content: 'An Optional is really just a generic enum with two cases: `.some(Value)` — the value is present, or `.none` — there is no value (nil). There are several ways to unwrap an optional and access the value inside, and choosing the right one is most of what separates readable code from hard-to-follow code.',
      },
      {
        type: 'paragraph',
        id: 'p-how-iflet-intro',
        content: '**if let** — Scoped binding. Use this when you only need the unwrapped value inside one specific block:',
      },
      {
        type: 'code',
        id: 'code-iflet',
        language: 'swift',
        content: `let name: String? = "Alice"

if let name {
    print("Hello, \\(name)")
    // name is a non-optional String here
}
// name is back to being String? out here`,
      },
      {
        type: 'paragraph',
        id: 'p-how-iflet-note',
        content: "The variable `name` inside the if block is a *different binding* than the original optional — it's shadowing the outer name. This is safe and readable when the unwrapped value is only used in one place.",
      },
      {
        type: 'paragraph',
        id: 'p-how-guardlet-intro',
        content: "**guard let** — Early exit. Use this when you want to unwrap at the start of a function and exit if the value is missing. It's the \"happy path\" pattern:",
      },
      {
        type: 'code',
        id: 'code-guardlet',
        language: 'swift',
        content: `func greet(_ name: String?) {
    guard let name else { return }
    // name is non-optional from here to the end of the function
    print("Hello, \\(name)")
}`,
      },
      {
        type: 'paragraph',
        id: 'p-how-guardlet-note',
        content: '`guard let` enforces an early exit in the else clause, which prevents the pyramid-of-doom problem you get when nesting multiple if lets. Senior Swift developers prefer this pattern.',
      },
      {
        type: 'paragraph',
        id: 'p-how-coalesc-intro',
        content: '**Nil coalescing (??)** — Provide a default. Use this when you have a sensible fallback value:',
      },
      {
        type: 'code',
        id: 'code-coalesc',
        language: 'swift',
        content: `let display = name ?? "Guest"
// If name is nil, display is "Guest". Otherwise, display is the unwrapped value.`,
      },
      {
        type: 'paragraph',
        id: 'p-how-chain-intro',
        content: '**Optional chaining (?.)** — Safe navigation. Use this when accessing a property or method that might not exist:',
      },
      {
        type: 'code',
        id: 'code-chain',
        language: 'swift',
        content: `let count = name?.count  // Int?
// If name is nil, count is nil. If name exists, count is its character count.`,
      },
      {
        type: 'paragraph',
        id: 'p-how-chain-note',
        content: "Optional chaining automatically propagates nil if any link in the chain fails, and wraps the result in an Optional. No crash, no explicit unwrapping.",
      },
      {
        type: 'paragraph',
        id: 'p-how-summary',
        content: "Each of these has a different use case. Knowing which one to reach for is the difference between code that's clear to read and code that's defensive and verbose.",
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
    furtherReading: [
      {
        title: 'Structures and Classes — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/classesandstructures/',
        source: 'swift-org',
      },
    ],
    previousTopic: 'swift-optionals',
    nextTopic: 'swift-closures',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'Structs use **value semantics** — each assignment creates an independent copy. Classes use **reference semantics** — multiple variables can reference the same object. Prefer structs by default in Swift; use classes when you need identity, inheritance, or Objective-C interop.',
      },
      {
        type: 'heading',
        id: 'h-why',
        level: 2,
        content: 'Why does it matter?',
      },
      {
        type: 'paragraph',
        id: 'p-why-1',
        content: 'This choice — struct or class — is one of the first decisions you make when designing a type, and it shapes everything downstream: how mutations work, whether you need locks for thread safety, whether you can use inheritance, and how much memory overhead each instance carries.',
      },
      {
        type: 'paragraph',
        id: 'p-why-2',
        content: 'In older languages like Java or Python, everything is a reference type (objects) or a primitive type (numbers), and that distinction is baked into the language. Swift lets *you* decide per type. That freedom is powerful, but it means you have to understand the trade-offs.',
      },
      {
        type: 'paragraph',
        id: 'p-why-3',
        content: 'The fundamental difference is about **identity**. A struct is defined by its *values* — two structs with identical properties are considered identical, period. A class instance is defined by its *identity* — even if two class instances have identical properties, they are still different objects, and mutations to one don\'t affect the other.',
      },
      {
        type: 'paragraph',
        id: 'p-why-4',
        content: 'That sounds abstract. Here\'s where it matters in real code: if you\'re modeling data that flows through your app (a User, a network response, a configuration), a struct is simpler and safer — copies are automatic and thread-safe. If you\'re modeling an entity with a persistent identity that changes over time (a UIViewController, a database connection, a singleton service), a class is better because identity and mutation go hand-in-hand.',
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
        type: 'heading',
        id: 'h-when-to-use',
        level: 2,
        content: 'When to use struct vs class',
      },
      {
        type: 'paragraph',
        id: 'p-when-struct-intro',
        content: '**Use a struct when:**',
      },
      {
        type: 'list',
        id: 'l-when-struct',
        ordered: false,
        items: [
          'The type represents data (a Point, a User, a network response). Copies are automatic and thread-safe.',
          "You don't need inheritance. Structs don't support inheritance, and that's usually a good thing — it forces you to compose behavior instead.",
          'The instance doesn\'t have a persistent identity that matters. Two Users with the same ID and name are interchangeable; two UIViewControllers are not.',
          'You want mutations to be explicit. Because copies happen automatically, assigning `var a = b` and then mutating `a` won\'t surprise anyone — it\'s obvious that `a` is independent.',
        ],
      },
      {
        type: 'code',
        id: 'code-struct-example',
        language: 'swift',
        caption: 'struct for data',
        content: `struct User {
    let id: Int
    let name: String
    var email: String
}

var alice = User(id: 1, name: "Alice", email: "alice@example.com")
var aliceCopy = alice
aliceCopy.email = "newemail@example.com"

// alice.email is still "alice@example.com"
// Each variable has its own independent copy.`,
      },
      {
        type: 'paragraph',
        id: 'p-when-class-intro',
        content: '**Use a class when:**',
      },
      {
        type: 'list',
        id: 'l-when-class',
        ordered: false,
        items: [
          'The type represents an object with persistent identity. A UIViewController, a network session, a data model that syncs to a server — these are *entities* that exist and change over time, not just data values.',
          'You need inheritance. Classes support subclassing; structs don\'t.',
          'You need reference semantics explicitly. Multiple parts of your code should reference the same object and see each other\'s mutations.',
          'You need Objective-C interoperability. Some Apple APIs and existing frameworks require class instances. (This matters less in modern Swift, but if you\'re maintaining legacy code or bridging to Objective-C, it\'s relevant.)',
        ],
      },
      {
        type: 'code',
        id: 'code-class-example',
        language: 'swift',
        caption: 'class for identity',
        content: `class NetworkSession {
    private var token: String?
    
    func authenticate(username: String, password: String) {
        // Fetch token from server, store it
        self.token = "..."
    }
    
    func request(path: String) -> Data {
        // Use self.token for all requests
    }
}

let session = NetworkSession()
session.authenticate(username: "alice", password: "secret")

let alias = session  // Both refer to the SAME object
alias.authenticate(...) // Affects session too

// There is only one NetworkSession instance here.
// Multiple references to it see each other's changes.`,
      },
      {
        type: 'paragraph',
        id: 'p-when-default',
        content: '**The practical default:** Start with struct. Only switch to class when you discover a reason to — usually because you need inheritance, or because the type represents a persistent entity (not just data), or because you\'re working with an API that requires it.',
      },
      {
        type: 'callout',
        id: 'c-prefer-struct',
        variant: 'tip',
        title: 'Tip: Copy-on-Write optimization',
        content: `Copying a struct is cheap in theory, but copying a large array or string every time you assign it would be wasteful. Swift's stdlib types (String, Array, Dictionary, Set) are structs, but they use **copy-on-write** (CoW) optimization under the hood.

Here's how it works: when you assign an array to another variable, they initially share the same underlying buffer in memory. Only when one of them is *mutated* does Swift make a copy. Until then, they're aliases pointing to the same storage.

\`\`\`swift
var a = [1, 2, 3]
var b = a      // b points to the SAME underlying buffer as a
b.append(4)    // Now CoW kicks in — b's buffer is copied, then mutated
               // a is still [1, 2, 3]; b is [1, 2, 3, 4]
\`\`\`

From the outside, this looks like normal value semantics — \`a\` and \`b\` are independent copies. But under the hood, Swift was smart about avoiding an expensive full copy until it was actually necessary. This is why you can use Array and String freely in Swift without worrying about performance; the language takes care of it for you.

You don't need to implement CoW for simple structs — just use them naturally. Apple's standard library does it for you where it matters.`,
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
    furtherReading: [
      {
        title: 'Closures — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/closures',
        source: 'swift-org',
      },
    ],
    previousTopic: 'swift-struct-vs-class',
    nextTopic: 'swift-control-flow',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'A closure is a block of code you can pass around and execute later. Closures "capture" variables from the surrounding scope — they hold onto references to those variables so they can access them even after the surrounding scope is gone. This is powerful but requires care: a closure that captures `self` can accidentally keep an object alive forever (a retain cycle), unless you use `[weak self]` to break the cycle.',
      },
      {
        type: 'heading',
        id: 'h-why',
        level: 2,
        content: 'Why does it matter?',
      },
      {
        type: 'paragraph',
        id: 'p-why-1',
        content: "Closures are one of Swift's most powerful features — they unlock patterns that are hard or impossible in other languages.",
      },
      {
        type: 'paragraph',
        id: 'p-why-callbacks',
        content: "Callbacks and event handlers: You pass a closure to a button so that when it's tapped, the closure runs. This is how UIKit (and much of iOS) works — you define what should happen, and the system calls you back later when the event occurs.",
      },
      {
        type: 'paragraph',
        id: 'p-why-fp',
        content: 'Functional programming: Methods like `map`, `filter`, and `sorted` take closures as arguments. Instead of writing a loop each time, you describe the transformation and let the method handle iteration.',
      },
      {
        type: 'paragraph',
        id: 'p-why-async',
        content: 'Asynchronous code: Network requests, timers, and other async operations need a way to tell you "I\'m done, here\'s the result" — closures are how that works.',
      },
      {
        type: 'paragraph',
        id: 'p-why-catch',
        content: 'The catch: closures capture references to the variables they use. If a closure captures `self` and `self` also holds onto the closure (directly or indirectly), neither can ever be deallocated. This is a retain cycle, and it\'s a memory leak. Understanding how to avoid it — using `[weak self]` and `[unowned self]` correctly — is essential.',
      },
      {
        type: 'heading',
        id: 'h-how',
        level: 2,
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        id: 'p-how-lifecycle-title',
        content: '**Closure lifecycle**',
      },
      {
        type: 'paragraph',
        id: 'p-how-lifecycle',
        content: 'A closure is created when you write `{ ... }` in code. At that moment, the closure captures references to any variables from the surrounding scope that it references — storing them in a captures list. Then, the closure is either executed immediately (if you call it right away) or stored somewhere (in a property, passed to a function) to be executed later.',
      },
      {
        type: 'paragraph',
        id: 'p-how-capturing-title',
        content: '**What "capturing" means**',
      },
      {
        type: 'paragraph',
        id: 'p-how-capturing-intro',
        content: 'When you write:',
      },
      {
        type: 'code',
        id: 'code-capturing',
        language: 'swift',
        content: `let x = 10
let closure = { print(x) }`,
      },
      {
        type: 'paragraph',
        id: 'p-how-capturing-explain-1',
        content: 'The closure captures `x` — it holds onto a reference to `x`. Even if `x` goes out of scope, the closure still has access to it, because the closure is keeping it alive.',
      },
      {
        type: 'paragraph',
        id: 'p-how-capturing-explain-2',
        content: 'More precisely: the closure captures a *reference* to the variable, not a copy of its value (unless you explicitly capture the value with a capture list). So if `x` is later reassigned, the closure sees the new value.',
      },
      {
        type: 'paragraph',
        id: 'p-how-escaping-title',
        content: '**Escaping vs non-escaping**',
      },
      {
        type: 'paragraph',
        id: 'p-how-escaping-desc',
        content: 'By default, closures passed as function arguments are **non-escaping** — they execute and return within the function call. The closure cannot outlive the function.',
      },
      {
        type: 'code',
        id: 'code-nonescaping',
        language: 'swift',
        content: `func execute(closure: () -> Void) {
    closure()  // Non-escaping by default — closure runs here
}
execute { print("hello") }  // Runs immediately`,
      },
      {
        type: 'paragraph',
        id: 'p-how-escaping-stored',
        content: 'If you want a closure to be stored and executed later, you mark it `@escaping`:',
      },
      {
        type: 'code',
        id: 'code-escaping',
        language: 'swift',
        content: `var savedClosure: (() -> Void)?

func saveForLater(closure: @escaping () -> Void) {
    savedClosure = closure  // This is allowed because @escaping tells the compiler
}

saveForLater { print("hello") }
savedClosure?()  // Runs whenever we call it`,
      },
      {
        type: 'paragraph',
        id: 'p-how-distinction-title',
        content: '**Why this distinction matters:**',
      },
      {
        type: 'list',
        id: 'l-how-distinction',
        ordered: false,
        items: [
          'Non-escaping closures execute immediately on the stack — no memory overhead, no retain cycle risk.',
          'Escaping closures are stored on the heap, which means they keep references to their captured variables alive. If an escaping closure captures `self` and `self` also holds the closure, neither can ever be released.',
        ],
      },
      {
        type: 'heading',
        id: 'h-syntax',
        level: 2,
        content: 'Syntax Shorthand',
      },
      {
        type: 'paragraph',
        id: 'p-syntax-intro',
        content: "Swift gives you multiple ways to write closures, from fully explicit to terse, so you can choose what's most readable for the situation.",
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
        type: 'paragraph',
        id: 'p-syntax-guide',
        content: "Which one should you use? Start with the fullest form that's still readable. If the closure is a one-liner doing something obvious (like sorting or filtering), shorthand names are fine. If it's doing something subtle or has multiple lines, explicit names are better — `numbers.sorted { $0 < $1 }` is clear, but `filter { $0.isActive }` is less clear than `filter { user in user.isActive }` if `isActive` isn't obvious from context.",
      },
      {
        type: 'heading',
        id: 'h-capture',
        level: 2,
        content: 'Capture Lists & Retain Cycles',
      },
      {
        type: 'paragraph',
        id: 'p-cycle-title',
        content: '**What is a retain cycle?**',
      },
      {
        type: 'paragraph',
        id: 'p-cycle-desc-1',
        content: 'In Swift, objects are kept alive by reference counts (ARC — Automatic Reference Counting). Every time a variable holds a reference to an object, its reference count goes up. When the reference goes away, the count goes down. When the count hits zero, the object is deallocated.',
      },
      {
        type: 'paragraph',
        id: 'p-cycle-desc-2',
        content: 'A retain cycle happens when two objects keep references to each other:',
      },
      {
        type: 'list',
        id: 'l-cycle-def',
        ordered: false,
        items: [
          'Object A holds a reference to Object B',
          'Object B holds a reference to Object A',
        ],
      },
      {
        type: 'paragraph',
        id: 'p-cycle-leak',
        content: "Neither can ever be deallocated, because each is keeping the other alive. It's a memory leak. Closures are a common source of retain cycles in Swift:",
      },
      {
        type: 'code',
        id: 'code-cycle-api',
        language: 'swift',
        content: `class APIClient {
    var onSuccess: (() -> Void)?
    
    func fetchData() {
        // This closure captures self (so it can call self.handleResponse)
        // And self holds onto the closure (via self.onSuccess)
        // → retain cycle
        self.onSuccess = {
            self.handleResponse()  // closure captures self
        }
    }
}`,
      },
      {
        type: 'paragraph',
        id: 'p-breaking-title',
        content: '**Breaking the cycle with `[weak self]`**',
      },
      {
        type: 'paragraph',
        id: 'p-breaking-desc-1',
        content: "Mark the captured reference as `weak`, which means the closure doesn't keep the object alive:",
      },
      {
        type: 'code',
        id: 'code-weak-example',
        language: 'swift',
        content: `self.onSuccess = { [weak self] in
    guard let self else { return }
    self.handleResponse()
}`,
      },
      {
        type: 'paragraph',
        id: 'p-breaking-desc-2',
        content: "Now: the closure doesn't keep `APIClient` alive. If no other part of the code holds a reference to it, the client can be deallocated. And when it is, the `[weak self]` reference becomes `nil`, which is why we use `guard let self` to safely unwrap it.",
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
        type: 'paragraph',
        id: 'p-weak-vs-unowned-title',
        content: '**`[weak self]` vs `[unowned self]`**',
      },
      {
        type: 'paragraph',
        id: 'p-weak-vs-unowned-desc',
        content: 'Both break retain cycles, but with different guarantees:',
      },
      {
        type: 'list',
        id: 'l-weak-vs-unowned',
        ordered: false,
        items: [
          '**`[weak self]`:** The reference can become `nil` if the object is deallocated. You must unwrap it with `guard let` or `if let` before using it. Use this in most cases. It\'s safe — if the object goes away, you gracefully handle the `nil` case.',
          '**`[unowned self]`:** You\'re asserting to the compiler that the object will always exist as long as the closure exists. If that assumption is wrong, the closure will try to access a deallocated object and crash. Use this only when you can *prove* the closure will never outlive the captured object (rare; mostly in architectures with strict ownership guarantees).',
        ],
      },
      {
        type: 'paragraph',
        id: 'p-simple-rule',
        content: "**Simple rule:** Use `[weak self]` by default. Only use `[unowned self]` if you've explicitly proven the object lifetime and documented why it's safe.",
      },
      {
        type: 'code',
        id: 'code-async-pattern',
        language: 'swift',
        caption: "The pattern you'll use 99% of the time",
        content: `someAsyncOperation { [weak self] result in
    guard let self else { return }
    self.updateUI(with: result)
}`,
      },
      {
        type: 'callout',
        id: 'c-autoclosure',
        variant: 'info',
        title: 'Note: @autoclosure',
        content: `Sometimes you see functions marked with \`@autoclosure\`. This is a shorthand syntax that lets you pass a closure without the \`{ }\` braces:

\`\`\`swift
func logIfDebug(_ message: @autoclosure () -> String) {
    #if DEBUG
    print(message())
    #endif
}

logIfDebug("expensive computation")  // No braces needed
// Without @autoclosure, you'd write: logIfDebug { "expensive computation" }
\`\`\`

\`@autoclosure\` is mostly used in standard library functions (like \`&&\` and \`||\` operators) to make them feel like language features rather than function calls. You rarely need to write it yourself. Just know it exists if you encounter it.`,
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

  // ─── Control Flow & Pattern Matching ───────────────────────────────────────
  {
    id: 'swift-control-flow',
    slug: 'control-flow',
    title: 'Control Flow & Pattern Matching',
    category: 'swift',
    group: 'Swift Fundamentals',
    description: 'Conditionals, loops, guard statements, switch expressions, and pattern matching — how Swift lets you direct the flow of your code based on conditions and destructure data.',
    difficulty: 'foundational',
    estimatedTime: 25,
    language: 'swift',
    version: { language: 'Swift', version: '6', minimumVersion: '1.0', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['control-flow', 'switch', 'pattern-matching', 'guard', 'conditionals', 'loops'],
    relatedTopics: ['swift-optionals', 'swift-closures', 'swift-enums'],
    furtherReading: [
      {
        title: 'Control Flow — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow',
        source: 'swift-org',
      },
    ],
    previousTopic: 'swift-closures',
    nextTopic: 'swift-functions',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content:
          'Control flow directs which parts of your code run and when. `if` and `guard` handle conditionals, `switch` matches on values, and `for`/`while` loops repeat. **Pattern matching** is where Swift shines — you can destructure optionals, tuples, and enums inline with `if let`, `if case`, and `switch`, turning error-prone checking into readable, type-safe code.',
      },
      {
        type: 'heading',
        id: 'h-why',
        level: 2,
        content: 'Why does it matter?',
      },
      {
        type: 'paragraph',
        id: 'p-why-1',
        content:
          'In most languages, conditionals are just `if/else`, and if you want to check multiple cases, you either nest deeply or write long chains of `if-else-if-else`. Pattern matching lets you do both at the same time: branch on a condition *and* extract values from complex data structures.',
      },
      {
        type: 'paragraph',
        id: 'p-why-2',
        content: 'Example: you have an optional Int. In other languages:',
      },
      {
        type: 'code',
        id: 'code-other-languages',
        language: 'swift',
        content: `if int != nil {
    let value = int!  // Force unwrap, hope it works
    print(value)
}`,
      },
      {
        type: 'paragraph',
        id: 'p-why-3',
        content: 'In Swift with pattern matching:',
      },
      {
        type: 'code',
        id: 'code-swift-pattern-matching',
        language: 'swift',
        content: `if let value = int {
    print(value)  // value is already unwrapped, type-safe
}`,
      },
      {
        type: 'paragraph',
        id: 'p-why-4',
        content:
          "That's not just shorter — it's safer. Swift won't let you forget the nil case, and the unwrapped value is available in scope automatically.",
      },
      {
        type: 'paragraph',
        id: 'p-why-5',
        content:
          'This extends to enums, tuples, and arbitrary data. One `switch` statement can destructure multiple levels of nesting:',
      },
      {
        type: 'code',
        id: 'code-switch-destructuring',
        language: 'swift',
        content: `switch result {
case .success(let data):
    print(data)  // data is automatically unwrapped
case .failure(let error):
    print("Error: \\(error)")
}`,
      },
      {
        type: 'paragraph',
        id: 'p-why-6',
        content:
          "Control flow + pattern matching is how you write Swift that's both safe and readable.",
      },
      {
        type: 'heading',
        id: 'h-how',
        level: 2,
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        id: 'p-how-ifelse-intro',
        content: '**if / else — basic conditional branching**',
      },
      {
        type: 'code',
        id: 'code-ifelse-basic',
        language: 'swift',
        content: `let age = 18

if age >= 18 {
    print("You can vote")
} else {
    print("You're too young to vote")
}`,
      },
      {
        type: 'paragraph',
        id: 'p-how-ifelse-chain-intro',
        content:
          '`if` evaluates a Boolean expression and runs the block if true. `else` runs if false. You can chain multiple conditions:',
      },
      {
        type: 'code',
        id: 'code-ifelse-chain',
        language: 'swift',
        content: `if age < 13 {
    print("Child")
} else if age < 18 {
    print("Teenager")
} else {
    print("Adult")
}`,
      },
      {
        type: 'paragraph',
        id: 'p-how-guard-intro',
        content: '**guard — early exit pattern**',
      },
      {
        type: 'paragraph',
        id: 'p-how-guard-desc',
        content:
          '`guard` is like `if`, but it\'s designed for the "if this condition fails, bail out" pattern. It reads more naturally for that case:',
      },
      {
        type: 'code',
        id: 'code-guard-example',
        language: 'swift',
        content: `func greet(name: String?) {
    guard let name = name else {
        print("No name provided")
        return
    }
    print("Hello, \\(name)")
}`,
      },
      {
        type: 'paragraph',
        id: 'p-how-guard-compare',
        content: 'Compare that to:',
      },
      {
        type: 'code',
        id: 'code-nested-if-compare',
        language: 'swift',
        content: `// Nested if — pyramid of doom
if name != nil {
    let unwrapped = name!
    print("Hello, \\(unwrapped)")
} else {
    print("No name provided")
    return
}`,
      },
      {
        type: 'paragraph',
        id: 'p-how-guard-summary',
        content:
          '`guard let` is clearer: the happy path continues forward, and the error case exits early. This is the "happy path" pattern that senior Swift developers use everywhere.',
      },
      {
        type: 'paragraph',
        id: 'p-how-switch-intro',
        content: '**switch — matching on values**',
      },
      {
        type: 'paragraph',
        id: 'p-how-switch-desc',
        content: 'Unlike `if/else`, `switch` is designed to match on many cases at once:',
      },
      {
        type: 'code',
        id: 'code-switch-example',
        language: 'swift',
        content: `let day = "Monday"

switch day {
case "Monday":
    print("Back to work")
case "Saturday", "Sunday":
    print("Weekend!")
default:
    print("Midweek")
}`,
      },
      {
        type: 'paragraph',
        id: 'p-how-switch-exhaustiveness',
        content:
          'Each case must be exhaustive (you must handle all possibilities) or have a `default` catch-all. Swift won\'t let you forget a case.',
      },
      {
        type: 'paragraph',
        id: 'p-how-switch-expression-intro',
        content: 'In Swift 6, `switch` is an expression, meaning it returns a value:',
      },
      {
        type: 'code',
        id: 'code-switch-expression',
        language: 'swift',
        content: `let status = switch day {
case "Monday":
    "Back to work"
case "Saturday", "Sunday":
    "Weekend!"
default:
    "Midweek"
}`,
      },
      {
        type: 'paragraph',
        id: 'p-how-pattern-matching-intro',
        content: '**Pattern matching — the power move**',
      },
      {
        type: 'paragraph',
        id: 'p-how-pattern-matching-desc',
        content:
          'This is where control flow becomes genuinely powerful. Pattern matching lets you destructure data and branch in one operation.',
      },
      {
        type: 'paragraph',
        id: 'p-how-pattern-matching-opt-intro',
        content: 'Code Example (with optional):',
      },
      {
        type: 'code',
        id: 'code-pattern-matching-optional',
        language: 'swift',
        content: `let email: String? = "alice@example.com"

if let email = email {
    print("Email is: \\(email)")
}`,
      },
      {
        type: 'paragraph',
        id: 'p-how-pattern-matching-enum-intro',
        content: 'Code Example (with enum):',
      },
      {
        type: 'code',
        id: 'code-pattern-matching-enum',
        language: 'swift',
        content: `enum Result {
    case success(String)
    case failure(Error)
}

let result = Result.success("Data loaded")

switch result {
case .success(let data):
    print("Success: \\(data)")
case .failure(let error):
    print("Failed: \\(error)")
}`,
      },
      {
        type: 'paragraph',
        id: 'p-how-pattern-matching-tuple-intro',
        content: 'Code Example (with tuple destructuring):',
      },
      {
        type: 'code',
        id: 'code-pattern-matching-tuple',
        language: 'swift',
        content: `let point = (x: 0, y: 0)

switch point {
case (0, 0):
    print("Origin")
case (let x, 0):
    print("On x-axis at \\(x)")
case (0, let y):
    print("On y-axis at \\(y)")
case (let x, let y):
    print("Point: \\(x), \\(y)")
}`,
      },
      {
        type: 'paragraph',
        id: 'p-how-pattern-matching-where-intro',
        content: 'The `where` clause lets you add additional conditions to a pattern:',
      },
      {
        type: 'code',
        id: 'code-pattern-matching-where',
        language: 'swift',
        content: `let numbers = [1, 2, 3, 4, 5]

for num in numbers {
    switch num {
    case let x where x % 2 == 0:
        print("\\(x) is even")
    case let x where x % 2 == 1:
        print("\\(x) is odd")
    default:
        break
    }
}`,
      },
      {
        type: 'paragraph',
        id: 'p-how-loops-intro',
        content: '**Loops**',
      },
      {
        type: 'paragraph',
        id: 'p-how-forin-intro',
        content: '**for-in loop** — iterate over collections',
      },
      {
        type: 'code',
        id: 'code-forin-loop',
        language: 'swift',
        content: `let fruits = ["Apple", "Banana", "Cherry"]

for fruit in fruits {
    print(fruit)
}

// With index
for (index, fruit) in fruits.enumerated() {
    print("\\(index): \\(fruit)")
}

// Range
for i in 1...5 {
    print(i)  // 1, 2, 3, 4, 5
}

// With stride (skip by 2)
for i in stride(from: 0, to: 10, by: 2) {
    print(i)  // 0, 2, 4, 6, 8
}`,
      },
      {
        type: 'paragraph',
        id: 'p-how-while-intro',
        content: '**while loop** — repeat while condition is true',
      },
      {
        type: 'code',
        id: 'code-while-loop',
        language: 'swift',
        content: `var count = 0
while count < 5 {
    print(count)
    count += 1
}`,
      },
      {
        type: 'paragraph',
        id: 'p-how-repeatwhile-intro',
        content: '**repeat-while** — run at least once, then check condition',
      },
      {
        type: 'code',
        id: 'code-repeatwhile-loop',
        language: 'swift',
        content: `var attempts = 0
repeat {
    print("Trying...")
    attempts += 1
} while attempts < 3`,
      },
      {
        type: 'heading',
        id: 'h-common-mistakes',
        level: 2,
        content: 'Common mistakes',
      },
      {
        type: 'list',
        id: 'l-common-mistakes',
        ordered: false,
        items: [
          'Forgetting that `switch` requires exhaustive matching — the compiler will error if you miss a case. This is intentional; it prevents silent bugs.',
          'Using `if let` when `guard let` would be clearer — if you\'re going to exit early, use `guard`. It reads better.',
          'Forgetting that `else if` chains can become unreadable — if you have 4+ cases, use `switch` instead.',
          'Using `default: break` instead of omitting the case entirely in a switch — if a case does nothing, just don\'t include it (Swift requires exhaustiveness, but `default` with nothing is confusing).',
          'Nesting patterns too deeply without a `where` clause to add readability — pattern matching is powerful, but deeply nested patterns become hard to read.',
        ],
      },
      {
        type: 'heading',
        id: 'h-when-to-use',
        level: 2,
        content: 'When to use what',
      },
      {
        type: 'list',
        id: 'l-when-to-use',
        ordered: false,
        items: [
          'Use `if/else` for simple yes-or-no decisions (one or two conditions).',
          'Use `guard` when you need to exit early or validate preconditions — this is the "happy path" pattern.',
          'Use `switch` when you have many distinct cases to handle.',
          'Use pattern matching whenever you\'re checking optionals, enums, or unpacking tuples — it\'s both safer and more readable than alternatives.',
          'Use `where` clauses in patterns when you need to add additional logic beyond the structure of the data.',
        ],
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          "What is the difference between 'if let' and 'guard let', and when should you use each?",
          'Why does Swift require switch statements to be exhaustive, and what happens if you forget a case?',
          'What is pattern matching, and why is it powerful in Swift?',
          "What is the difference between 'for-in', 'while', and 'repeat-while' loops?",
          "Explain the difference between 'if case let' and 'switch case' for pattern matching on enums.",
          "What does this code print, and why?\\n\\nlet nums = [1, 2, 3, 4, 5]\\nfor num in nums {\\n    if num % 2 == 0 {\\n        continue\\n    }\\n    print(num)\\n}",
          "What is the 'where' clause in a switch or for loop, and when should you use it?",
          'In Swift 6, switch can be an expression that returns a value. How does this differ from switch as a statement, and why is it useful?',
        ],
      },
      {
        type: 'relatedTopics',
        id: 'related',
        topicIds: ['swift-optionals', 'swift-closures', 'swift-enums'],
      },
    ],
  },

  // ─── Functions & Parameter Semantics ───────────────────────────────────────
  {
    id: 'swift-functions',
    slug: 'functions',
    title: 'Functions & Parameter Semantics',
    category: 'swift',
    group: 'Swift Fundamentals',
    description:
      'Function declaration, parameter labels, default values, variadic parameters, and inout semantics — how Swift lets you write flexible, expressive function signatures.',
    difficulty: 'foundational',
    estimatedTime: 25,
    language: 'swift',
    version: { language: 'Swift', version: '6', minimumVersion: '1.0', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['functions', 'inout', 'parameters', 'signatures', 'argument-labels'],
    relatedTopics: ['swift-closures', 'swift-control-flow', 'swift-generics'],
    furtherReading: [
      {
        title: 'Functions — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/functions',
        source: 'swift-org',
      },
    ],
    previousTopic: 'swift-control-flow',
    nextTopic: 'swift-collections',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content:
          'A function is a named block of reusable code that takes parameters and returns a value. Swift functions are flexible: you can give parameters external labels for readability, provide defaults so callers don\'t have to specify everything, use `inout` to modify parameters in place, or accept variable numbers of arguments with `...` (variadic).',
      },
      {
        type: 'heading',
        id: 'h-why',
        level: 2,
        content: 'Why does it matter?',
      },
      {
        type: 'paragraph',
        id: 'p-why-1',
        content:
          'Functions are how you organize code into reusable pieces — no different from other languages. But Swift\'s function syntax is unusually flexible and readable. Most languages have one straightforward way to declare a function; Swift gives you multiple tools to make function calls read like English sentences.',
      },
      {
        type: 'paragraph',
        id: 'p-why-2',
        content: 'Compare this JavaScript call:',
      },
      {
        type: 'code',
        id: 'code-js-call',
        language: 'text',
        content: `makeRequest(url, "GET", {timeout: 5000}, true)`,
      },
      {
        type: 'paragraph',
        id: 'p-why-3',
        content:
          'What do those last two arguments mean? You have to read the function definition to find out.',
      },
      {
        type: 'paragraph',
        id: 'p-why-4',
        content: 'In Swift:',
      },
      {
        type: 'code',
        id: 'code-swift-call',
        language: 'swift',
        content: `makeRequest(url, method: "GET", timeout: 5000, retry: true)`,
      },
      {
        type: 'paragraph',
        id: 'p-why-5',
        content:
          'The **argument labels** make the intent crystal clear without reading the definition.',
      },
      {
        type: 'paragraph',
        id: 'p-why-6',
        content:
          'Or consider a function that needs to modify its argument (like a sort function that rearranges an array in place). In most languages, you pass a reference and hope. In Swift, you use `inout` to make it explicit: "this function will modify this parameter."',
      },
      {
        type: 'paragraph',
        id: 'p-why-7',
        content:
          'These aren\'t cosmetic — they make code safer and more readable.',
      },
      {
        type: 'heading',
        id: 'h-how',
        level: 2,
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        id: 'p-how-basics-intro',
        content: '**Function basics**',
      },
      {
        type: 'paragraph',
        id: 'p-how-basics-example-label',
        content: 'Code Example:',
      },
      {
        type: 'code',
        id: 'code-greet-example',
        language: 'swift',
        content: `func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

let message = greet(name: "Alice")
print(message)  // "Hello, Alice!"`,
      },
      {
        type: 'paragraph',
        id: 'p-how-basics-parts-intro',
        content: 'A function has:',
      },
      {
        type: 'list',
        id: 'l-function-parts',
        ordered: false,
        items: [
          'A name: `greet`',
          'Parameters: `name: String` (parameter name, then type)',
          'A return type: `-> String`',
          'A body: the code that runs',
        ],
      },
      {
        type: 'paragraph',
        id: 'p-how-omit-return',
        content: 'If a function doesn\'t return anything, you omit the `-> Type`:',
      },
      {
        type: 'code',
        id: 'code-void-greeting',
        language: 'swift',
        content: `func printGreeting(name: String) {
    print("Hello, \\(name)!")
}`,
      },
      {
        type: 'paragraph',
        id: 'p-how-labels-intro',
        content: '**Argument labels — external vs internal names**',
      },
      {
        type: 'paragraph',
        id: 'p-how-labels-desc',
        content:
          'Here\'s a powerful Swift feature: a parameter can have two names — an external label (what callers use) and an internal name (what the function body uses).',
      },
      {
        type: 'paragraph',
        id: 'p-how-labels-example-label',
        content: 'Code Example:',
      },
      {
        type: 'code',
        id: 'code-labels-example',
        language: 'swift',
        content: `func move(to destination: String) {
    print("Moving to \\(destination)")
}

move(to: "Paris")  // 'to' is the external label, makes the call read naturally`,
      },
      {
        type: 'paragraph',
        id: 'p-how-labels-underscore-intro',
        content: 'This is equivalent to:',
      },
      {
        type: 'code',
        id: 'code-underscore-label',
        language: 'swift',
        content: `func move(_ destination: String) {
    print("Moving to \\(destination)")
}

move("Paris")  // underscore means no external label — must be positional`,
      },
      {
        type: 'paragraph',
        id: 'p-how-labels-why',
        content:
          'Why does this matter? Consider a function that removes an element:',
      },
      {
        type: 'code',
        id: 'code-remove-example',
        language: 'swift',
        content: `// Bad — what does true mean?
array.remove(at: 5, force: true)

// Good — labels make intent clear
func remove(at index: Int, force shouldForce: Bool) {
    // ...
}
array.remove(at: 5, force: true)`,
      },
      {
        type: 'paragraph',
        id: 'p-how-defaults-intro',
        content: '**Default parameter values**',
      },
      {
        type: 'paragraph',
        id: 'p-how-defaults-desc',
        content:
          'You can provide defaults so callers don\'t have to specify everything:',
      },
      {
        type: 'paragraph',
        id: 'p-how-defaults-example-label',
        content: 'Code Example:',
      },
      {
        type: 'code',
        id: 'code-connect-defaults',
        language: 'swift',
        content: `func connect(to host: String, port: Int = 8080) {
    print("Connecting to \\(host):\\(port)")
}

connect(to: "localhost")           // Uses default port 8080
connect(to: "localhost", port: 3000)  // Overrides default`,
      },
      {
        type: 'paragraph',
        id: 'p-how-defaults-ordering',
        content:
          'Parameters with defaults must come after parameters without defaults (logical — you can\'t require an argument after an optional one).',
      },
      {
        type: 'paragraph',
        id: 'p-how-variadic-intro',
        content: '**Variadic parameters — accepting multiple values**',
      },
      {
        type: 'paragraph',
        id: 'p-how-variadic-desc',
        content: 'Use `...` to accept any number of arguments:',
      },
      {
        type: 'paragraph',
        id: 'p-how-variadic-example-label',
        content: 'Code Example:',
      },
      {
        type: 'code',
        id: 'code-sum-variadic',
        language: 'swift',
        content: `func sum(_ numbers: Int...) -> Int {
    var total = 0
    for num in numbers {
        total += num
    }
    return total
}

print(sum(1, 2, 3))        // 6
print(sum(1, 2, 3, 4, 5))  // 15`,
      },
      {
        type: 'paragraph',
        id: 'p-how-variadic-notes',
        content:
          'Inside the function, `numbers` is an array `[Int]`. Variadic parameters must be the last parameter (or the last before a trailing closure).',
      },
      {
        type: 'paragraph',
        id: 'p-how-inout-intro',
        content: '**inout parameters — modifying arguments**',
      },
      {
        type: 'paragraph',
        id: 'p-how-inout-desc',
        content:
          'By default, function parameters are immutable — you can\'t change them. But sometimes you want to modify an argument and have that change visible to the caller. That\'s what `inout` is for:',
      },
      {
        type: 'paragraph',
        id: 'p-how-inout-example-label',
        content: 'Code Example:',
      },
      {
        type: 'code',
        id: 'code-inout-example',
        language: 'swift',
        content: `func increment(_ value: inout Int) {
    value += 1
}

var x = 5
increment(&x)
print(x)  // 6`,
      },
      {
        type: 'paragraph',
        id: 'p-how-inout-ampersand',
        content:
          'Note the `&` when calling — it signals "I\'m passing this by reference for mutation."',
      },
      {
        type: 'paragraph',
        id: 'p-how-inout-copy-semantics',
        content:
          'Technically, `inout` is copy-in-copy-out: Swift copies the value in, you modify the copy, and Swift copies it back. But the effect is the same as if you\'d modified the original.',
      },
      {
        type: 'paragraph',
        id: 'p-how-tuples-intro',
        content: '**Multiple return values with tuples**',
      },
      {
        type: 'paragraph',
        id: 'p-how-tuples-desc',
        content: 'Swift functions can return multiple values using tuples:',
      },
      {
        type: 'paragraph',
        id: 'p-how-tuples-example-label',
        content: 'Code Example:',
      },
      {
        type: 'code',
        id: 'code-divide-tuples',
        language: 'swift',
        content: `func divideWithRemainder(_ dividend: Int, by divisor: Int) -> (quotient: Int, remainder: Int) {
    return (dividend / divisor, dividend % divisor)
}

let result = divideWithRemainder(17, by: 5)
print(result.quotient)   // 3
print(result.remainder)  // 2

// Or destructure
let (q, r) = divideWithRemainder(17, by: 5)
print(q, r)  // 3 2`,
      },
      {
        type: 'paragraph',
        id: 'p-how-tuples-summary',
        content:
          'This is cleaner than creating a struct for a simple return value, and it\'s more flexible than single-return languages.',
      },
      {
        type: 'heading',
        id: 'h-common-mistakes',
        level: 2,
        content: 'Common mistakes',
      },
      {
        type: 'list',
        id: 'l-common-mistakes',
        ordered: false,
        items: [
          'Forgetting that parameters are immutable by default — if you try to reassign a parameter, you\'ll get a compiler error. Use `inout` if you need to modify it.',
          'Mixing up external labels and internal names — the external label is what callers use, the internal is what the function body uses. If you use `to destination`, callers write `to:` but the body uses `destination`.',
          'Putting a parameter with a default before one without — `func foo(a: Int = 5, b: Int)` is an error. Required parameters come first.',
          'Using `inout` when a return value would be clearer — if a function modifies one parameter and returns nothing, it\'s harder to understand than a function that returns the modified value.',
          'Forgetting the `&` when calling an `inout` parameter — `increment(x)` won\'t compile if `increment` expects `inout`; you must write `increment(&x)`.',
        ],
      },
      {
        type: 'heading',
        id: 'h-when-to-use',
        level: 2,
        content: 'When to use what',
      },
      {
        type: 'list',
        id: 'l-when-to-use',
        ordered: false,
        items: [
          'Use default parameters to make common cases simple without boilerplate.',
          'Use argument labels to make function calls readable — `move(to:)` is better than `move(_:)`.',
          'Use `inout` when you need to modify a collection in place (like sorting), but prefer returning a new value when possible.',
          'Use variadic parameters for functions that naturally accept "one or more" arguments (like `sum` or `print`).',
          'Use tuples for multiple return values, especially when returning different types.',
        ],
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'How do `inout` parameters work in Swift? Are they pass-by-reference?',
          'What is the difference between an argument label and a parameter name in Swift?',
          'What are default parameter values, and why is the order of parameters important when using them?',
          'What are variadic parameters, and how are they represented inside the function?',
          'What is the output of this code? (Default parameter value override)',
          'What is the advantage of returning multiple values using a tuple instead of creating a struct?',
          "When would you prefer to return a value from a function instead of using an 'inout' parameter to modify the caller's argument?",
        ],
      },
      {
        type: 'relatedTopics',
        id: 'related',
        topicIds: ['swift-closures', 'swift-control-flow', 'swift-generics'],
      },
    ],
  },

  // ─── Arrays, Sets & Dictionaries ───────────────────────────────────────────
  {
    id: 'swift-collections',
    slug: 'collections',
    title: 'Arrays, Sets & Dictionaries',
    category: 'swift',
    group: 'Swift Fundamentals',
    description:
      'Array, Set, and Dictionary types — ordered vs unordered, hashable requirements, memory characteristics, and when to use each collection in real code.',
    difficulty: 'foundational',
    estimatedTime: 30,
    language: 'swift',
    version: { language: 'Swift', version: '6', minimumVersion: '1.0', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['collections', 'array', 'set', 'dictionary', 'hashable', 'value-semantics'],
    relatedTopics: ['swift-struct-vs-class', 'swift-generics', 'swift-protocols'],
    furtherReading: [
      {
        title: 'Collection Types — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/collectiontypes',
        source: 'swift-org',
      },
      {
        title: 'Hashable — Swift Standard Library',
        url: 'https://developer.apple.com/documentation/swift/hashable',
        source: 'apple-developer',
      },
    ],
    previousTopic: 'swift-functions',
    nextTopic: 'swift-strings',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content:
          'Swift provides three main collection types. **Array** is ordered, allows duplicates, and is the default for most situations. **Set** is unordered but guarantees uniqueness — useful for membership checking. **Dictionary** stores key-value pairs and provides O(1) lookup by key. All three are value types with copy-on-write optimization. Sets and Dictionaries require their elements to conform to `Hashable`.',
      },
      {
        type: 'heading',
        id: 'h-why',
        level: 2,
        content: 'Why does it matter?',
      },
      {
        type: 'paragraph',
        id: 'p-why-1',
        content:
          'Collections are how you organize and access multiple values. Most languages have arrays and hash maps (dictionaries), but Swift\'s approach stands out: all three collection types are value types, not reference types. This means they\'re thread-safe by default and have predictable copy behavior.',
      },
      {
        type: 'paragraph',
        id: 'p-why-2',
        content:
          'Also, Swift forces you to think about what you\'re actually modeling. Need to store unique usernames? That\'s a Set, not an Array with duplicate-checking code scattered everywhere. Need fast lookups by ID? That\'s a Dictionary, not a loop over an Array. The compiler can\'t force the right choice, but the language design nudges you toward it.',
      },
      {
        type: 'paragraph',
        id: 'p-why-3',
        content:
          'Finally, **Hashable** is a protocol that Collections depend on. Understanding it helps you write collection-friendly types and debug "does not conform to Hashable" errors.',
      },
      {
        type: 'heading',
        id: 'h-how',
        level: 2,
        content: 'How does it work?',
      },
      {
        type: 'heading',
        id: 'h-arrays',
        level: 3,
        content: 'Arrays — ordered, mutable, copy-on-write',
      },
      {
        type: 'paragraph',
        id: 'p-arrays-1',
        content:
          'An Array is an ordered collection of elements of the same type. Elements are accessed by index, starting at 0.',
      },
      {
        type: 'code',
        id: 'code-arrays-basic',
        language: 'swift',
        content: `var fruits = ["Apple", "Banana", "Cherry"]

// Access by index
print(fruits[0])  // "Apple"

// Iterate
for fruit in fruits {
    print(fruit)
}

// Mutate
fruits.append("Date")
fruits[1] = "Blueberry"

// Common operations
fruits.count        // 4
fruits.isEmpty      // false
fruits.contains("Apple")  // true
fruits.remove(at: 0)  // returns "Apple", array is now ["Blueberry", "Cherry", "Date"]`,
      },
      {
        type: 'paragraph',
        id: 'p-cow-explanation',
        content:
          '**Copy-on-Write optimization:** When you assign an Array to another variable, Swift doesn\'t immediately copy all the elements. Instead, they share the same underlying buffer. Only when one of them is mutated does Swift make a copy. This makes Arrays both efficient (no unnecessary copying) and safe (mutations don\'t affect other variables).',
      },
      {
        type: 'code',
        id: 'code-cow-example',
        language: 'swift',
        content: `var a = [1, 2, 3]
var b = a        // b shares the same buffer as a (no copy yet)
b.append(4)      // Now Swift copies the buffer for b, then appends
// a is still [1, 2, 3]; b is [1, 2, 3, 4]`,
      },
      {
        type: 'heading',
        id: 'h-sets',
        level: 3,
        content: 'Sets — unordered, unique elements, Hashable',
      },
      {
        type: 'paragraph',
        id: 'p-sets-1',
        content:
          'A Set is an unordered collection of unique values. Each element must conform to `Hashable`.',
      },
      {
        type: 'code',
        id: 'code-sets-example',
        language: 'swift',
        content: `var colors: Set<String> = ["Red", "Blue", "Green"]

// Order is not guaranteed
for color in colors {
    print(color)  // May print in any order
}

// Membership checking is fast (O(1))
colors.contains("Red")  // true

// Uniqueness is enforced
colors.insert("Blue")  // No effect — "Blue" already exists
colors.insert("Yellow")  // Added

// Set operations (unique to Sets)
let a: Set = [1, 2, 3]
let b: Set = [2, 3, 4]
a.union(b)         // [1, 2, 3, 4]
a.intersection(b)  // [2, 3]
a.symmetricDifference(b)  // [1, 4]
a.subtracting(b)   // [1]`,
      },
      {
        type: 'paragraph',
        id: 'p-sets-hashable-reason',
        content:
          'The reason Sets require `Hashable` is performance: hash tables are O(1) average case for lookup and insertion. Without a hash function, Sets would have to use a different algorithm (like a balanced tree) which is slower.',
      },
      {
        type: 'heading',
        id: 'h-dictionaries',
        level: 3,
        content: 'Dictionaries — key-value pairs, Hashable keys, optional lookup',
      },
      {
        type: 'paragraph',
        id: 'p-dictionaries-1',
        content:
          'A Dictionary stores key-value pairs. Keys must be `Hashable`; values can be any type.',
      },
      {
        type: 'code',
        id: 'code-dictionaries-example',
        language: 'swift',
        content: `var scores: [String: Int] = ["Alice": 95, "Bob": 87]

// Access by key
scores["Alice"]  // Optional<95>

// Safe access — Dictionary returns optional because key might not exist
if let aliceScore = scores["Alice"] {
    print("Alice scored \\(aliceScore)")
}

// Provide a default if key is missing
let bobScore = scores["Bob", default: 0]  // 87
let charlieScore = scores["Charlie", default: 0]  // 0 (not in dict)

// Mutate
scores["Alice"] = 96
scores["Charlie"] = 92

// Iterate
for (name, score) in scores {
    print("\\(name): \\(score)")
}

// Remove
scores.removeValue(forKey: "Bob")  // returns Optional<87>`,
      },
      {
        type: 'paragraph',
        id: 'p-dictionaries-optional-reason',
        content:
          'Dictionary lookup returns an optional because the key might not exist. This forces you to handle the missing case explicitly — no silent bugs from accessing a key that doesn\'t exist.',
      },
      {
        type: 'heading',
        id: 'h-hashable-protocol',
        level: 3,
        content: 'The Hashable protocol',
      },
      {
        type: 'paragraph',
        id: 'p-hashable-1',
        content:
          '`Hashable` is a protocol that allows a type to be used as a Set element or Dictionary key. It requires conformance to `Equatable` (implementing `==`) and provides a `hash(into:)` method.',
      },
      {
        type: 'code',
        id: 'code-hashable-custom',
        language: 'swift',
        content: `struct User: Hashable {
    let id: Int
    let name: String
    
    // Equatable requirement
    static func == (lhs: User, rhs: User) -> Bool {
        lhs.id == rhs.id  // Users are equal if their IDs match
    }
    
    // Hashable requirement
    func hash(into hasher: inout Hasher) {
        hasher.combine(id)  // Hash based on ID
    }
}

var userSet: Set<User> = [
    User(id: 1, name: "Alice"),
    User(id: 2, name: "Bob")
]

userSet.contains(User(id: 1, name: "Alice"))  // true (equal by ID)`,
      },
      {
        type: 'paragraph',
        id: 'p-hashable-synthesized',
        content:
          'For structs with simple value properties, you can just add `Hashable` conformance and Swift synthesizes it for you:',
      },
      {
        type: 'code',
        id: 'code-hashable-synthesized-example',
        language: 'swift',
        content: `struct Point: Hashable {
    let x: Int
    let y: Int
}
// Swift automatically generates == and hash(into:)`,
      },
      {
        type: 'heading',
        id: 'h-common-mistakes',
        level: 2,
        content: 'Common mistakes',
      },
      {
        type: 'list',
        id: 'l-common-mistakes',
        ordered: false,
        items: [
          'Forgetting that Dictionary lookup returns an optional — trying to access a key that doesn\'t exist and not handling the optional is a crash.',
          'Using Array when Set would be more appropriate — if you only need membership checking and don\'t care about order, Set is O(1) instead of O(n).',
          'Thinking Set and Dictionary preserve insertion order — they don\'t. If you need order, use Array.',
          'Mutating a Set or Dictionary element after inserting it — if you insert an element and then modify it (changing its hash value), lookups can fail silently. Never mutate collection elements.',
          'Not understanding copy-on-write — thinking that `var b = a` performs a full copy. It doesn\'t; Swift is lazy and only copies on mutation.',
          'Trying to add non-Hashable types to a Set or Dictionary — the compiler will error. Primitive types (Int, String, Bool) are Hashable; custom types must explicitly conform.',
        ],
      },
      {
        type: 'heading',
        id: 'h-when-to-use',
        level: 2,
        content: 'When to use what',
      },
      {
        type: 'list',
        id: 'l-when-to-use',
        ordered: false,
        items: [
          'Use **Array** by default. It\'s ordered, flexible, and works for most cases.',
          'Use **Set** when you need fast membership checking, uniqueness enforcement, or set operations (union, intersection). If order doesn\'t matter and you\'re asking "is this value in the collection?", Set is the answer.',
          'Use **Dictionary** when you need key-value lookup. Array of tuples is cumbersome and slower.',
          'Use **Array** if you need to preserve insertion order with key-value pairs — Swift doesn\'t have an ordered dictionary in the standard library.',
        ],
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What is the difference between Array, Set, and Dictionary, and when should you use each?',
          'Why does a Dictionary lookup return an optional, and what\'s the safest way to access a value?',
          'What is the Hashable protocol, and why do Set and Dictionary require their elements/keys to be Hashable?',
          'What is printed by this code, and why? (Array copy-on-write mutation)',
          'Explain the performance characteristics of Array, Set, and Dictionary for lookup, insertion, and deletion.',
          'Why can\'t you mutate a Set or Dictionary element after inserting it, and what would go wrong if you did?',
          'What does \'copy-on-write\' mean for Array, and what\'s the performance benefit?',
          'What happens when you try to run this code, and why? (Set.first optional return)',
          'What is the difference between Collection and Sequence protocols, and how do they relate to Array, Set, and Dictionary?',
          'If you need to store a collection of custom objects and check membership frequently, what should you do to make it efficient?',
        ],
      },
      {
        type: 'relatedTopics',
        id: 'related',
        topicIds: ['swift-struct-vs-class', 'swift-generics', 'swift-protocols'],
      },
    ],
  },

  // ─── Strings, Characters & Substrings ──────────────────────────────────────
  {
    id: 'swift-strings',
    slug: 'strings-and-characters',
    title: 'Strings, Characters & Substrings',
    category: 'swift',
    group: 'Swift Fundamentals',
    description:
      'Unicode, grapheme clusters, String indices, Substring memory safety, and why String is more complex than it appears.',
    difficulty: 'intermediate',
    estimatedTime: 25,
    language: 'swift',
    version: { language: 'Swift', version: '6', minimumVersion: '1.0', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'medium',
    tags: ['strings', 'substring', 'unicode', 'grapheme-clusters', 'indices', 'memory'],
    relatedTopics: ['swift-optionals', 'swift-protocols', 'swift-collections'],
    furtherReading: [
      {
        title: 'Strings and Characters — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/stringsandcharacters',
        source: 'swift-org',
      },
      {
        title: 'Substring — Swift Standard Library',
        url: 'https://developer.apple.com/documentation/swift/substring',
        source: 'apple-developer',
      },
    ],
    previousTopic: 'swift-collections',
    nextTopic: 'swift-error-handling',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content:
          'Swift Strings are Unicode-correct but complex. A String is a collection of extended grapheme clusters (visual characters, not code points). String doesn\'t support integer indexing — you use String.Index and methods like `index(_:offsetBy:)`. A Substring shares the parent String\'s buffer to save memory until converted to a String, but retaining a Substring keeps the entire parent String in memory — a hidden memory trap. For most code, treat Strings as opaque — for performance-critical code, understand the underlying complexity.',
      },
      {
        type: 'heading',
        id: 'h-why',
        level: 2,
        content: 'Why does it matter?',
      },
      {
        type: 'paragraph',
        id: 'p-why-1',
        content:
          'Strings seem simple — they\'re just text, right? But Swift\'s String type is deceptively complex because it handles Unicode correctly. Most languages treat strings as sequences of bytes or 16-bit code units, which works fine for English but breaks for emoji, accented characters, or scripts like Arabic or Devanagari.',
      },
      {
        type: 'paragraph',
        id: 'p-why-2',
        content:
          'Swift\'s approach: a String is a collection of extended grapheme clusters — the Unicode term for "a visual character." An emoji might be 1 grapheme cluster but 4+ bytes. An accented character like "é" might be 1 grapheme cluster but 2 Unicode scalars.',
      },
      {
        type: 'paragraph',
        id: 'p-why-3',
        content:
          'This correctness comes at a cost: you can\'t subscript a String by integer. `string[0]` doesn\'t work; you have to use `string.startIndex` and navigate from there. And Substring — a view into part of a String — is a memory trap if you\'re not careful.',
      },
      {
        type: 'paragraph',
        id: 'p-why-4',
        content:
          'Understanding Strings means understanding Unicode, grapheme clusters, and how Substring retains entire parent buffers. It\'s intermediate stuff, but it\'s important once you hit it in production.',
      },
      {
        type: 'heading',
        id: 'h-how',
        level: 2,
        content: 'How does it work?',
      },
      {
        type: 'heading',
        id: 'h-unicode',
        level: 3,
        content: 'Unicode and grapheme clusters',
      },
      {
        type: 'paragraph',
        id: 'p-unicode-1',
        content:
          'A String in Swift is a collection of **extended grapheme clusters**. Here\'s the hierarchy:',
      },
      {
        type: 'list',
        id: 'l-unicode-hierarchy',
        ordered: false,
        items: [
          '**Unicode Scalar**: A single 32-bit Unicode code point (e.g., U+0041 for "A")',
          '**Extended Grapheme Cluster**: One or more Unicode scalars that combine to form a single user-perceived character',
          '**String**: A collection of grapheme clusters',
        ],
      },
      {
        type: 'paragraph',
        id: 'p-unicode-examples',
        content: 'Examples:',
      },
      {
        type: 'code',
        id: 'code-unicode-examples',
        language: 'swift',
        content: `let hello = "Hello"
print(hello.count)  // 5 grapheme clusters

let emoji = "👨‍👩‍👧"  // Family emoji
print(emoji.count)  // 1 grapheme cluster (but composed of 7 Unicode scalars!)

let accented = "café"
print(accented.count)  // 4 grapheme clusters
// The "é" is 1 cluster (though it can be 1 or 2 scalars depending on representation)

// Access Unicode scalars if you really need them
for scalar in "A".unicodeScalars {
    print(scalar)  // U+0041
}`,
      },
      {
        type: 'paragraph',
        id: 'p-unicode-count-cost',
        content:
          'Why does this matter? Because **String.count is O(n)** — it has to walk through the entire string counting grapheme clusters, not just checking the byte length. Never use count in a tight loop for performance-critical code. And when processing text from the web or files, remember that what looks like one character might be multiple scalars.',
      },
      {
        type: 'heading',
        id: 'h-string-indices',
        level: 3,
        content: 'String indices — why you can\'t use integers',
      },
      {
        type: 'paragraph',
        id: 'p-indices-1',
        content:
          'Swift Strings don\'t support integer subscripting because grapheme clusters have variable byte lengths. `string[0]` doesn\'t make sense — the runtime would have to count clusters to find the 0th character, which is inefficient.',
      },
      {
        type: 'paragraph',
        id: 'p-indices-2',
        content: 'Instead, use **String.Index**:',
      },
      {
        type: 'code',
        id: 'code-indices-example',
        language: 'swift',
        content: `let name = "Alice"

// You can't do this
// print(name[0])  // Compile error

// You do this
let firstIndex = name.startIndex
print(name[firstIndex])  // "A"

// Navigate with offsetBy or indices
let secondIndex = name.index(after: firstIndex)
print(name[secondIndex])  // "l"

// Or use offset
let thirdIndex = name.index(firstIndex, offsetBy: 2)
print(name[thirdIndex])  // "i"

// Iterate safely
for (index, char) in name.enumerated() {
    // enumerated() gives you Int indices and Characters
    print("\\(index): \\(char)")
}

// Use range subscripting
let startIdx = name.index(firstIndex, offsetBy: 1)
let endIdx = name.index(startIdx, offsetBy: 2)
let substring = name[startIdx..<endIdx]  // "li"`,
      },
      {
        type: 'paragraph',
        id: 'p-indices-summary',
        content:
          'This design is inconvenient but safe — you can\'t accidentally access out-of-bounds because you have to navigate through valid indices.',
      },
      {
        type: 'heading',
        id: 'h-substring',
        level: 3,
        content: 'Substring — the memory trap',
      },
      {
        type: 'paragraph',
        id: 'p-substring-1',
        content:
          'A **Substring** is a lightweight view into a String\'s buffer, created by slicing:',
      },
      {
        type: 'code',
        id: 'code-substring-basic',
        language: 'swift',
        content: `let message = "Hello, World!"
let greeting = message[..<message.index(message.startIndex, offsetBy: 5)]
// greeting is a Substring ("Hello"), not a String

print(type(of: greeting))  // Substring`,
      },
      {
        type: 'paragraph',
        id: 'p-substring-trap',
        content:
          'Substring shares the parent String\'s buffer — no copy is made. This is memory-efficient... until it becomes a problem:',
      },
      {
        type: 'code',
        id: 'code-substring-trap',
        language: 'swift',
        content: `let largeString = String(repeating: "x", count: 1_000_000)
let tiny = largeString[..<largeString.index(largeString.startIndex, offsetBy: 5)]
// tiny is just "xxxxx" (Substring)
// BUT: tiny retains the entire 1MB largeString in memory!

// Solution: convert to String to release the parent buffer
let owned = String(tiny)  // Now owns its own buffer, largeString can be deallocated`,
      },
      {
        type: 'paragraph',
        id: 'p-substring-leak-summary',
        content:
          'This is a classic memory leak in Swift: you slice a huge string for a small piece, think you\'re being efficient, and accidentally keep the entire parent in memory.',
      },
      {
        type: 'heading',
        id: 'h-interpolation',
        level: 3,
        content: 'String interpolation and CustomStringConvertible',
      },
      {
        type: 'paragraph',
        id: 'p-interpolation-1',
        content: 'String interpolation makes it easy to build strings:',
      },
      {
        type: 'code',
        id: 'code-interpolation-example',
        language: 'swift',
        content: `let name = "Alice"
let age = 30
let message = "My name is \\(name) and I'm \\(age) years old"

// You can customize how types appear in interpolation
struct User {
    let name: String
    let email: String
    
    var description: String {
        "\\(name) <\\(email)>"
    }
}

let user = User(name: "Alice", email: "alice@example.com")
print("User: \\(user)")  // Prints: User: Alice <alice@example.com>`,
      },
      {
        type: 'paragraph',
        id: 'p-interpolation-summary',
        content:
          'If a type conforms to **CustomStringConvertible**, it provides a custom `description` property used in string interpolation and `String(describing:)`.',
      },
      {
        type: 'heading',
        id: 'h-common-mistakes',
        level: 2,
        content: 'Common mistakes',
      },
      {
        type: 'list',
        id: 'l-common-mistakes',
        ordered: false,
        items: [
          'Assuming String supports integer subscripting — it doesn\'t. Always use String.Index.',
          'Using String.count in a loop or performance-critical code — it\'s O(n). Cache it if needed.',
          'Holding onto a Substring thinking you\'re saving memory — you\'re retaining the parent String until the Substring is deallocated or converted to a String.',
          'Comparing String and Substring inconsistently — they conform to different protocols. Convert to String for consistency.',
          'Forgetting that emoji and accented characters are single grapheme clusters — String.count reflects visual characters, not bytes.',
          'Using `unicodeScalars` when you meant `characters` — they\'re different views of the same data.',
        ],
      },
      {
        type: 'heading',
        id: 'h-when-to-use',
        level: 2,
        content: 'When to use what',
      },
      {
        type: 'list',
        id: 'l-when-to-use',
        ordered: false,
        items: [
          'Use **String** for all normal text handling. It\'s correct, safe, and handles Unicode properly.',
          'Use **Substring** temporarily when slicing — but convert to String if you\'re storing it long-term.',
          'Use **String.Index** for navigation — it\'s the only safe way to traverse Strings.',
          'Use **unicodeScalars** only if you genuinely need individual Unicode code points (rare).',
          'Use **CustomStringConvertible** to customize how your types appear in strings and interpolation.',
        ],
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'medium',
        questions: [
          'Why doesn\'t Swift String support integer subscripting like String[0], and what should you use instead?',
          'What is an \'extended grapheme cluster\', and why is String.count O(n)?',
          'What\'s the problem with this code, and why does retaining a Substring keep the parent String in memory?',
          'What does this print, and why? (Emoji count across graphemes, scalars, and UTF-16)',
          'What\'s the difference between String and Substring, and when should you convert Substring to String?',
          'How does String.Index work, and what methods do you use to navigate a String?',
        ],
      },
      {
        type: 'relatedTopics',
        id: 'related',
        topicIds: ['swift-optionals', 'swift-protocols', 'swift-collections'],
      },
    ],
  },

  // ─── Error Handling: throws, Result & Typed Throws ─────────────────────────
  {
    id: 'swift-error-handling',
    slug: 'error-handling',
    title: 'Error Handling: throws, Result & Typed Throws',
    category: 'swift',
    group: 'Swift Fundamentals',
    description:
      'How Swift handles failure — the Error protocol, throw/try/catch mechanics, rethrows, the Result type, Swift 6 typed throws, and guaranteed cleanup with defer.',
    difficulty: 'intermediate',
    estimatedTime: 30,
    language: 'swift',
    version: { language: 'Swift', version: '6', minimumVersion: '2.0', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['errors', 'throws', 'try', 'typed-throws', 'result', 'defer'],
    relatedTopics: ['swift-optionals', 'swift-struct-vs-class', 'swift-generics'],
    furtherReading: [
      {
        title: 'Error Handling — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/errorhandling',
        source: 'swift-org',
      },
      {
        title: 'Result — Swift Standard Library',
        url: 'https://developer.apple.com/documentation/swift/result',
        source: 'apple-developer',
      },
    ],
    previousTopic: 'swift-strings',
    nextTopic: 'swift-enums',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content:
          'Swift handles errors explicitly, not with exceptions that can strike anywhere. A function that can fail is marked `throws`, and callers must acknowledge that with `try`. You catch and handle errors with `do-catch`, or convert them to optionals with `try?`. For cases where you want to model success/failure as a value (not control flow), use `Result<Success, Failure>`. Swift 6 adds **typed throws**, letting you specify exactly which error type a function can throw.',
      },
      {
        type: 'heading',
        id: 'h-why',
        level: 2,
        content: 'Why does it matter?',
      },
      {
        type: 'paragraph',
        id: 'p-why-1',
        content:
          'Many languages use exceptions — you throw an error anywhere, and it propagates up the call stack until something catches it, sometimes crashing the whole program if nothing does. This is powerful but risky: you often can\'t tell just by reading a function signature whether it can fail, or what kinds of failures to expect.',
      },
      {
        type: 'paragraph',
        id: 'p-why-2',
        content:
          'Swift takes a different approach: if a function can fail, its signature says so — `func loadFile() throws -> Data`. The compiler enforces that callers acknowledge this with `try`. You can\'t accidentally call a throwing function and forget that it might fail; the compiler won\'t let you.',
      },
      {
        type: 'paragraph',
        id: 'p-why-3',
        content:
          'This is the same philosophy behind Optionals (make possible failure visible in the type system), applied to a different kind of failure. It doesn\'t eliminate errors — it makes them impossible to silently ignore.',
      },
      {
        type: 'heading',
        id: 'h-how',
        level: 2,
        content: 'How does it work?',
      },
      {
        type: 'heading',
        id: 'h-error-protocol',
        level: 3,
        content: 'The Error protocol and custom error types',
      },
      {
        type: 'paragraph',
        id: 'p-error-protocol-1',
        content:
          'Any type can represent an error by conforming to the `Error` protocol — usually an enum, since errors typically come in a known set of cases:',
      },
      {
        type: 'code',
        id: 'code-network-error',
        language: 'swift',
        content: `enum NetworkError: Error {
    case noConnection
    case timeout
    case invalidResponse(statusCode: Int)
}`,
      },
      {
        type: 'paragraph',
        id: 'p-error-protocol-2',
        content:
          'You can add more detail with `LocalizedError`, which provides user-facing descriptions:',
      },
      {
        type: 'code',
        id: 'code-localized-error',
        language: 'swift',
        content: `enum NetworkError: Error, LocalizedError {
    case noConnection
    case timeout
    case invalidResponse(statusCode: Int)
    
    var errorDescription: String? {
        switch self {
        case .noConnection:
            return "No internet connection."
        case .timeout:
            return "The request timed out."
        case .invalidResponse(let code):
            return "Server returned status code \\(code)."
        }
    }
}`,
      },
      {
        type: 'heading',
        id: 'h-throw-try',
        level: 3,
        content: 'throw, try, try?, and try! — propagating and calling',
      },
      {
        type: 'paragraph',
        id: 'p-throw-try-1',
        content:
          'A function that can fail is marked `throws`, and uses `throw` to signal failure:',
      },
      {
        type: 'code',
        id: 'code-fetch-user',
        language: 'swift',
        content: `func fetchUser(id: String) throws -> User {
    guard !id.isEmpty else {
        throw NetworkError.invalidResponse(statusCode: 400)
    }
    // ... fetch logic
    return User(id: id)
}`,
      },
      {
        type: 'paragraph',
        id: 'p-throw-try-2',
        content:
          'At the call site, you must acknowledge the possibility of failure with `try`:',
      },
      {
        type: 'code',
        id: 'code-try-variants',
        language: 'swift',
        content: `// Option 1: try with do-catch (see below)
// Option 2: try? — converts to an optional, discarding the error details
let user = try? fetchUser(id: "123")  // User? — nil if it threw

// Option 3: try! — force-try, crashes if it throws (use only when you're certain it can't fail)
let user2 = try! fetchUser(id: "123")`,
      },
      {
        type: 'paragraph',
        id: 'p-throw-try-3',
        content:
          '`try?` is useful when you don\'t care *why* something failed, only *whether* it succeeded. `try!` should be rare — it\'s the throwing equivalent of force-unwrapping an optional, with the same risk.',
      },
      {
        type: 'heading',
        id: 'h-do-catch',
        level: 3,
        content: 'do-catch — structured handling with pattern matching',
      },
      {
        type: 'code',
        id: 'code-do-catch',
        language: 'swift',
        content: `do {
    let user = try fetchUser(id: "123")
    print("Loaded: \\(user)")
} catch NetworkError.noConnection {
    print("Please check your internet connection")
} catch NetworkError.invalidResponse(let statusCode) {
    print("Server error: \\(statusCode)")
} catch {
    // Catch-all — 'error' is implicitly available here
    print("Unexpected error: \\(error)")
}`,
      },
      {
        type: 'paragraph',
        id: 'p-do-catch',
        content:
          'Each `catch` clause can match a specific error case (with pattern matching, just like `switch`), and the final catch-all captures anything else. This is the same pattern-matching power you use elsewhere in Swift, applied to error handling.',
      },
      {
        type: 'heading',
        id: 'h-rethrows',
        level: 3,
        content: 'rethrows — functions that only throw if their closure does',
      },
      {
        type: 'paragraph',
        id: 'p-rethrows-1',
        content:
          'Some functions (like `map`, `filter`) take a closure that might throw, and the function itself only throws if that closure does. This is what `rethrows` signals:',
      },
      {
        type: 'code',
        id: 'code-rethrows',
        language: 'swift',
        content: `func processAll<T>(_ items: [T], transform: (T) throws -> T) rethrows -> [T] {
    var results: [T] = []
    for item in items {
        results.append(try transform(item))
    }
    return results
}

// If transform doesn't throw, calling processAll doesn't require try
let doubled = processAll([1, 2, 3]) { $0 * 2 }

// If transform can throw, calling processAll requires try
let risky = try processAll([1, 2, 3]) { value in
    guard value > 0 else { throw NetworkError.timeout }
    return value * 2
}`,
      },
      {
        type: 'paragraph',
        id: 'p-rethrows-2',
        content:
          '`rethrows` is a contract: the function promises it only throws when its closure parameter throws, never on its own.',
      },
      {
        type: 'heading',
        id: 'h-result-type',
        level: 3,
        content: 'The Result type — success/failure as a value',
      },
      {
        type: 'paragraph',
        id: 'p-result-type-1',
        content:
          'Sometimes you want to represent success or failure as a value you can store, pass around, or use in a completion handler — not just as control flow. That\'s what `Result<Success, Failure>` is for:',
      },
      {
        type: 'code',
        id: 'code-result-type',
        language: 'swift',
        content: `func fetchUserResult(id: String, completion: @escaping (Result<User, NetworkError>) -> Void) {
    // async work...
    if id.isEmpty {
        completion(.failure(.invalidResponse(statusCode: 400)))
    } else {
        completion(.success(User(id: id)))
    }
}

fetchUserResult(id: "123") { result in
    switch result {
    case .success(let user):
        print("Got user: \\(user)")
    case .failure(let error):
        print("Failed: \\(error)")
    }
}`,
      },
      {
        type: 'paragraph',
        id: 'p-result-type-2',
        content: 'You can bridge between throwing functions and Result:',
      },
      {
        type: 'code',
        id: 'code-result-bridge',
        language: 'swift',
        content: `// Wrap a throwing call into a Result
let result = Result { try fetchUser(id: "123") }

// Unwrap a Result back into throwing code
let user = try result.get()

// Transform the success value without unwrapping
let userName = result.map { $0.name }`,
      },
      {
        type: 'paragraph',
        id: 'p-result-type-3',
        content:
          'Use `Result` when you need to store or delay handling the outcome (completion handlers, caching a failed/succeeded state). Use `throws`/`try` for immediate, synchronous error propagation.',
      },
      {
        type: 'heading',
        id: 'h-typed-throws',
        level: 3,
        content: 'Swift 6 typed throws',
      },
      {
        type: 'paragraph',
        id: 'p-typed-throws-1',
        content:
          'Normally, `throws` means "this can throw *any* `Error`" — equivalent to `throws(any Error)`. Swift 6 lets you specify exactly which error type:',
      },
      {
        type: 'code',
        id: 'code-typed-throws',
        language: 'swift',
        content: `func loadFile(path: String) throws(FileError) -> Data {
    // ...
}

do {
    let data = try loadFile(path: "config.json")
} catch {
    // 'error' here is statically typed as FileError, not just 'any Error'
    // No downcasting needed
}`,
      },
      {
        type: 'paragraph',
        id: 'p-typed-throws-2',
        content:
          'Why does this matter? With untyped `throws`, catching an error means dealing with `any Error` — you often need to downcast to check the specific type. With typed throws, the compiler knows the exact type, giving you exhaustive, type-safe catch handling without casting. There\'s also a performance benefit: `any Error` requires existential boxing (a small runtime overhead); a typed throw avoids that.',
      },
      {
        type: 'paragraph',
        id: 'p-typed-throws-3',
        content:
          'The trade-off: typed throws tightly couples your function\'s signature to a specific error type. If you\'re building a public API that might need to add new error cases later, untyped `throws` gives you more flexibility. Typed throws is best for closed, well-defined systems — like embedded Swift or performance-critical internal code.',
      },
      {
        type: 'paragraph',
        id: 'p-typed-throws-4',
        content:
          '`throws(Never)` is a special case — it tells the compiler "this function is guaranteed to never throw," which is useful for writing generic code that works uniformly across throwing and non-throwing functions.',
      },
      {
        type: 'heading',
        id: 'h-defer',
        level: 3,
        content: 'defer — guaranteed cleanup',
      },
      {
        type: 'paragraph',
        id: 'p-defer-1',
        content:
          '`defer` schedules code to run when the current scope exits — whether normally, via return, or because an error was thrown:',
      },
      {
        type: 'code',
        id: 'code-defer',
        language: 'swift',
        content: `func processFile(path: String) throws {
    let file = openFile(path)
    defer {
        closeFile(file)  // Always runs, even if an error is thrown below
    }
    
    guard file.isValid else {
        throw NetworkError.invalidResponse(statusCode: 500)
    }
    // ... process file
}  // closeFile runs here, regardless of how the function exits`,
      },
      {
        type: 'paragraph',
        id: 'p-defer-2',
        content:
          'If you have multiple `defer` blocks in the same scope, they execute in reverse order (LIFO — last in, first out), like unwinding a stack:',
      },
      {
        type: 'code',
        id: 'code-defer-lifo',
        language: 'swift',
        content: `func demo() {
    defer { print("First deferred") }
    defer { print("Second deferred") }
    print("Function body")
}
// Prints: "Function body", then "Second deferred", then "First deferred"`,
      },
      {
        type: 'paragraph',
        id: 'p-defer-3',
        content:
          '`defer` is essential for resource cleanup (closing files, releasing locks) where you need a guarantee that cleanup happens no matter which exit path the function takes.',
      },
      {
        type: 'heading',
        id: 'h-common-mistakes',
        level: 2,
        content: 'Common mistakes',
      },
      {
        type: 'list',
        id: 'l-common-mistakes',
        ordered: false,
        items: [
          'Using `try!` in code that can realistically fail — this crashes at runtime, just like force-unwrapping an optional that\'s nil.',
          'Forgetting that `try?` discards the specific error — if you need to know *why* something failed, use `do-catch`, not `try?`.',
          'Overusing untyped `throws` when a `Result` would communicate intent more clearly (especially for async completion handlers).',
          'Not ordering `catch` clauses from most specific to least specific — like `switch`, more specific patterns should come first, with the catch-all last.',
          'Forgetting that `defer` blocks run in reverse order when there are multiple — this can cause confusing cleanup ordering bugs if you\'re not aware of it.',
          'Using typed throws for public APIs that need room to evolve — it locks callers into a specific error type, making it a breaking change to add new error cases later.',
        ],
      },
      {
        type: 'heading',
        id: 'h-when-to-use',
        level: 2,
        content: 'When to use what',
      },
      {
        type: 'list',
        id: 'l-when-to-use',
        ordered: false,
        items: [
          'Use `throws`/`try`/`do-catch` for synchronous operations where failure should propagate immediately.',
          'Use `try?` when you only care about success/failure, not the specific error.',
          'Use `Result` for deferred or asynchronous outcomes (completion handlers, cached results) where you want to pass the success/failure state around as a value.',
          'Use `rethrows` when writing generic functions that take a throwing closure and shouldn\'t introduce failure on their own.',
          'Use typed throws for closed, performance-sensitive systems where you control both sides of the API. Stick with untyped `throws` for public APIs likely to evolve.',
          'Use `defer` any time you acquire a resource that needs guaranteed cleanup, regardless of how the function exits.',
        ],
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What is the difference between try, try?, and try!, and when should you use each?',
          'How does do-catch pattern matching work when you have multiple catch clauses for different error cases?',
          'What does rethrows mean, and how is it different from throws?',
          'When would you use Result<Success, Failure> instead of throws/try?',
          'What is defer used for, and in what order do multiple defer blocks execute?',
          'What does this code print, and why? (defer execution with thrown error)',
          'What are Typed Throws in Swift 6, and when should you prefer them over untyped throws?',
        ],
      },
      {
        type: 'relatedTopics',
        id: 'related',
        topicIds: ['swift-optionals', 'swift-struct-vs-class', 'swift-generics'],
      },
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

  // ─── Enums, Raw Values & Associated Values ────────────────────────────────
  {
    id: 'swift-enums',
    slug: 'enums-and-associated-values',
    title: 'Enums, Raw Values & Associated Values',
    category: 'swift',
    group: 'Core Object-Oriented & Value Types',
    description: 'Algebraic data types, pattern matching, recursive enums with indirect, and CaseIterable — how Swift enums go far beyond a list of named constants.',
    difficulty: 'intermediate',
    estimatedTime: 30,
    language: 'swift',
    version: { language: 'Swift', version: '6', minimumVersion: '1.0', status: 'current', lastReviewed: '2026-09-04' },
    interviewRelevance: 'high',
    tags: ['enums', 'associated-values', 'algebraic-data-types', 'indirect', 'raw-values', 'caseiterable', 'pattern-matching'],
    relatedTopics: ['swift-struct-vs-class', 'swift-error-handling', 'swift-control-flow'],
    furtherReading: [
      {
        title: 'Enumerations — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/enumerations',
        source: 'swift-org',
      },
      {
        title: 'Optional — Swift Standard Library',
        url: 'https://developer.apple.com/documentation/swift/optional',
        source: 'apple-developer',
      },
    ],
    previousTopic: 'swift-error-handling',
    nextTopic: 'swift-properties',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'Swift enums are not just lists of named constants — they are **algebraic data types** that can carry data with each case. A **raw value** is a fixed underlying primitive (like `Int` or `String`) that every case maps to. An **associated value** is dynamic data you attach *at the call site*, so each instance of a case can carry different data. Pattern matching via `switch` is how you extract and respond to that data safely.',
      },
      {
        type: 'heading',
        id: 'h-why',
        level: 2,
        content: 'Why enums in Swift are different',
      },
      {
        type: 'paragraph',
        id: 'p-why-1',
        content: 'If you are coming from C, Java, or Objective-C, you probably think of enums as a thin wrapper around an integer — a way to give names to magic numbers. Swift enums are something fundamentally different. They are **first-class value types** that can have methods, computed properties, and — most powerfully — attach *data* to each case.',
      },
      {
        type: 'paragraph',
        id: 'p-why-2',
        content: 'This makes them **algebraic data types** in the computer science sense: you can model a value that is exactly one of several different shapes, each with its own associated payload. The Optional type you use every day (`Optional<Wrapped>`) is just an enum under the hood — `case none` and `case some(Wrapped)`. `Result<Success, Failure>` is an enum. Every network response model you have ever written is *trying* to be one.',
      },
      {
        type: 'paragraph',
        id: 'p-why-3',
        content: 'The reason this matters: when you model your data as an enum with associated values, the Swift compiler enforces that you handle every possible case — at compile time, not at runtime. You cannot accidentally forget a state. You cannot access the wrong branch. The exhaustive `switch` statement is how Swift turns enums into a correctness guarantee.',
      },
      {
        type: 'heading',
        id: 'h-basics',
        level: 2,
        content: 'Enum basics and exhaustive switching',
      },
      {
        type: 'paragraph',
        id: 'p-basics-1',
        content: 'A basic enum declares a type that can only be one of a fixed set of named cases. The `switch` statement over an enum is **exhaustive** — the compiler rejects code that does not cover every case (unless you add a `default` branch, which is usually a smell).',
      },
      {
        type: 'code',
        id: 'code-basics',
        language: 'swift',
        caption: 'Exhaustive switching — the compiler has your back',
        content: `enum Direction {
    case north, south, east, west
}

let heading = Direction.north

// ✅ Exhaustive — compiler verifies all 4 cases are handled
switch heading {
case .north: print("Go north")
case .south: print("Go south")
case .east:  print("Go east")
case .west:  print("Go west")
}

// ❌ This would be a compile error — missing .west
// switch heading {
// case .north: ...
// case .south: ...
// case .east:  ...
// }   // Error: Switch must be exhaustive`,
      },
      {
        type: 'callout',
        id: 'c-exhaustive',
        variant: 'tip',
        title: 'Avoid default: when you can',
        content: 'If your switch has a `default:` branch, the compiler can no longer warn you when you add a new enum case and forget to handle it. Prefer exhaustive switches — let the compiler catch missing cases for you. Save `default:` for when the enum is not yours (e.g., from an Apple SDK) and has too many cases to enumerate.',
      },
      {
        type: 'heading',
        id: 'h-raw-values',
        level: 2,
        content: 'Raw values',
      },
      {
        type: 'paragraph',
        id: 'p-raw-1',
        content: 'A **raw value** gives each case a fixed underlying primitive value — an `Int`, a `String`, or any other type that conforms to `RawRepresentable`. Raw values are constant and declared at compile time; they do not change per instance. This is useful when you need to serialize an enum to a database column, a JSON field, or a network protocol that uses numbers or strings.',
      },
      {
        type: 'code',
        id: 'code-raw-values',
        language: 'swift',
        caption: 'Int and String raw values, plus failable initializer',
        content: `// Int raw values auto-increment from the starting value
enum StatusCode: Int {
    case ok          = 200
    case notFound    = 404
    case serverError = 500
}

let code = StatusCode.ok
print(code.rawValue)   // 200

// String raw values default to the case name if not specified
enum Planet: String {
    case mercury, venus, earth, mars
}

print(Planet.earth.rawValue)  // "earth"

// Failable initializer from a raw value — returns Optional
let planet = Planet(rawValue: "mars")  // Optional<Planet>.some(.mars)
let unknown = Planet(rawValue: "pluto")  // nil — not in the enum`,
      },
      {
        type: 'callout',
        id: 'c-raw-vs-associated',
        variant: 'important',
        title: 'Raw values vs Associated values — mutually exclusive',
        content: 'An enum can have **raw values** OR **associated values**, but not both at the same time. Raw values are fixed and uniform — every case has the same type of raw value. Associated values are dynamic and per-case — each case carries its own type and shape of data.',
      },
      {
        type: 'heading',
        id: 'h-associated-values',
        level: 2,
        content: 'Associated values — the powerful part',
      },
      {
        type: 'paragraph',
        id: 'p-assoc-1',
        content: 'Associated values let each case carry **different data** alongside it. This is what makes Swift enums algebraic data types. When you create an instance of a case with an associated value, you attach the data then. When you switch over it, you use pattern matching to extract that data safely.',
      },
      {
        type: 'paragraph',
        id: 'p-assoc-2',
        content: 'The classic real-world example is a network result. Without enums, you might have a function that returns an optional response and an optional error — two variables, one of which is always nil. That is error-prone. With an enum, you model it correctly: a response is *either* a success with data *or* a failure with an error. Never both. Never neither.',
      },
      {
        type: 'code',
        id: 'code-associated-values',
        language: 'swift',
        caption: 'Associated values model states that carry different data',
        content: `enum NetworkResult {
    case success(data: Data, statusCode: Int)
    case failure(error: Error)
    case loading
}

func handle(_ result: NetworkResult) {
    switch result {
    case .success(let data, let code):
        print("Got \\(data.count) bytes, status \\(code)")
    case .failure(let error):
        print("Failed: \\(error.localizedDescription)")
    case .loading:
        print("Still loading...")
    }
}

// Each case carries exactly the data it needs — nothing more
let response = NetworkResult.success(data: Data(), statusCode: 200)
handle(response)`,
      },
      {
        type: 'paragraph',
        id: 'p-assoc-3',
        content: 'Associated values also enable the `if case let` pattern — a shorthand for when you only care about one specific case without writing a full switch:',
      },
      {
        type: 'code',
        id: 'code-if-case-let',
        language: 'swift',
        caption: 'if case let — check and unwrap a specific case inline',
        content: `enum AuthState {
    case signedIn(userId: String)
    case signedOut
    case loading
}

let state = AuthState.signedIn(userId: "user-123")

// Only handle .signedIn — ignore other cases
if case .signedIn(let userId) = state {
    print("Welcome back, \\(userId)")
}

// Guard variant — early exit if not signed in
guard case .signedIn(let userId) = state else {
    return  // not signed in, exit early
}
// userId is now available in scope here`,
      },
      {
        type: 'heading',
        id: 'h-caseiterable',
        level: 2,
        content: 'CaseIterable — iterating all cases',
      },
      {
        type: 'paragraph',
        id: 'p-caseiterable-1',
        content: '`CaseIterable` is a protocol that lets Swift automatically synthesize a static `allCases` collection containing every case in the enum. You just add the conformance — no extra implementation needed for enums without associated values. This is useful for building pickers, settings screens, test harnesses, or any place where you need to enumerate all possible values.',
      },
      {
        type: 'code',
        id: 'code-caseiterable',
        language: 'swift',
        caption: 'CaseIterable synthesizes allCases automatically',
        content: `enum Weekday: String, CaseIterable {
    case monday, tuesday, wednesday, thursday, friday, saturday, sunday
}

// Automatically synthesized — no extra code needed
print(Weekday.allCases.count)  // 7

for day in Weekday.allCases {
    print(day.rawValue)  // monday, tuesday, ...
}

// Useful for building UI pickers
let picker = Weekday.allCases.map { $0.rawValue.capitalized }
// ["Monday", "Tuesday", "Wednesday", ...]`,
      },
      {
        type: 'callout',
        id: 'c-caseiterable-limit',
        variant: 'info',
        title: 'CaseIterable limitation',
        content: 'Swift cannot automatically synthesize `CaseIterable` for enums with **associated values**, because there is no way to enumerate all possible payloads. You can still manually implement the `allCases` requirement for such enums if you need to, but you must list the cases yourself.',
      },
      {
        type: 'heading',
        id: 'h-methods-and-properties',
        level: 2,
        content: 'Methods and computed properties on enums',
      },
      {
        type: 'paragraph',
        id: 'p-methods-1',
        content: 'Swift enums are full value types. They can have computed properties, methods, and `mutating` methods — just like structs. This keeps logic grouped with the type it belongs to, rather than scattered across switch statements elsewhere in your codebase.',
      },
      {
        type: 'code',
        id: 'code-methods',
        language: 'swift',
        caption: 'Enums with computed properties and methods',
        content: `enum Suit: String, CaseIterable {
    case clubs, diamonds, hearts, spades

    // Computed property — no stored state allowed in enums
    var isRed: Bool {
        self == .diamonds || self == .hearts
    }

    var symbol: String {
        switch self {
        case .clubs:    return "♣️"
        case .diamonds: return "♦️"
        case .hearts:   return "♥️"
        case .spades:   return "♠️"
        }
    }
}

print(Suit.hearts.isRed)   // true
print(Suit.clubs.symbol)   // ♣️`,
      },
      {
        type: 'heading',
        id: 'h-indirect',
        level: 2,
        content: 'Indirect enums — recursive types',
      },
      {
        type: 'paragraph',
        id: 'p-indirect-1',
        content: 'Normally, enums must have a fixed size at compile time. But a recursive enum — one where a case holds an instance of the same enum — would have an infinite size. Swift solves this with the `indirect` keyword, which tells the compiler to store that case on the heap as a reference (like a class), breaking the recursive size cycle.',
      },
      {
        type: 'code',
        id: 'code-indirect',
        language: 'swift',
        caption: 'indirect enum enables recursive data structures',
        content: `// Modeling a simple expression tree (e.g., a calculator)
indirect enum ArithmeticExpr {
    case number(Double)
    case add(ArithmeticExpr, ArithmeticExpr)
    case multiply(ArithmeticExpr, ArithmeticExpr)
}

// Evaluate the expression recursively
func evaluate(_ expr: ArithmeticExpr) -> Double {
    switch expr {
    case .number(let n):
        return n
    case .add(let left, let right):
        return evaluate(left) + evaluate(right)
    case .multiply(let left, let right):
        return evaluate(left) * evaluate(right)
    }
}

// Represents: (3 + 4) * 2
let expr = ArithmeticExpr.multiply(
    .add(.number(3), .number(4)),
    .number(2)
)

print(evaluate(expr))  // 14.0`,
      },
      {
        type: 'callout',
        id: 'c-indirect-cost',
        variant: 'warning',
        title: 'indirect has a heap allocation cost',
        content: 'Because `indirect` cases are heap-allocated (like class references), they bypass the usual stack-based value semantics. The enum itself is still a value type, but its `indirect` cases carry a reference internally. This is intentional and often acceptable — recursive data structures are inherently not stack-friendly — but it is worth knowing so you are not surprised by the ARC overhead.',
      },
      {
        type: 'heading',
        id: 'h-optional-is-enum',
        level: 2,
        content: 'Optional is just an enum',
      },
      {
        type: 'paragraph',
        id: 'p-optional-1',
        content: 'One of the best ways to internalize Swift enums is to see that `Optional<Wrapped>` — the `?` type you use constantly — is just an enum in the standard library. It has exactly two cases: `none` (no value) and `some(Wrapped)` (a value). All the optional syntax (`if let`, `?`, `??`) is syntax sugar built on top of this simple enum.',
      },
      {
        type: 'code',
        id: 'code-optional-enum',
        language: 'swift',
        caption: 'Optional<T> is defined as an enum in the Swift standard library',
        content: `// This is essentially how Optional is defined in Swift's stdlib:
// enum Optional<Wrapped> {
//     case none
//     case some(Wrapped)
// }

// These two lines are equivalent:
let a: String? = "hello"
let b: Optional<String> = .some("hello")

// switch on Optional — no magic, just pattern matching
let name: String? = "Alice"
switch name {
case .none:
    print("No name provided")
case .some(let value):
    print("Hello, \\(value)")  // "Hello, Alice"
}

// if let is just sugar for switch case .some(let value)
if let value = name {
    print("Hello, \\(value)")
}`,
      },
      {
        type: 'heading',
        id: 'h-common-mistakes',
        level: 2,
        content: 'Common mistakes',
      },
      {
        type: 'list',
        id: 'l-common-mistakes',
        ordered: false,
        items: [
          'Confusing **raw values** (compile-time constants, same type per case) with **associated values** (runtime data, different types per case) — they are fundamentally different features and an enum cannot have both.',
          'Using `default:` in a switch over your own enums — this silently hides missing cases when you add a new one later. Always be exhaustive when you own the enum type.',
          'Forgetting that `CaseIterable` cannot be automatically synthesized for enums with associated values — Swift has no way to enumerate all possible payloads.',
          'Trying to compare two enum cases with associated values using `==` without conforming to `Equatable` — associated value enums are not automatically `Equatable` (unlike raw value enums, which are).',
          'Forgetting `indirect` on recursive enum cases — the compiler will tell you, but understanding *why* is important for interviews.',
        ],
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What is the difference between raw values and associated values in a Swift enum?',
          'How does Swift enforce exhaustiveness in a switch statement over an enum?',
          'Why is Optional<T> considered an enum in Swift? What are its two cases?',
          'When would you use `indirect` on an enum, and what problem does it solve?',
          'Can an enum conform to both CaseIterable and have associated values?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['swift-struct-vs-class', 'swift-error-handling', 'swift-control-flow'] },
    ],
  },

  // ─── Stored, Computed & Lazy Properties with Observers ───────────────────────
  {
    id: 'swift-properties',
    slug: 'properties-and-observers',
    title: 'Stored, Computed \u0026 Lazy Properties with Observers',
    category: 'swift',
    group: 'Core Object-Oriented \u0026 Value Types',
    description: 'Stored, computed, and lazy properties — plus willSet/didSet observers, static/class properties, and when each category applies in real Swift code.',
    difficulty: 'foundational',
    estimatedTime: 28,
    language: 'swift',
    version: { language: 'Swift', version: '6', minimumVersion: '1.0', status: 'current', lastReviewed: '2026-09-05' },
    interviewRelevance: 'high',
    tags: ['properties', 'computed-properties', 'observers', 'lazy', 'willSet', 'didSet', 'static', 'property-wrappers'],
    relatedTopics: ['swift-enums', 'swift-struct-vs-class', 'swift-closures'],
    furtherReading: [
      {
        title: 'Properties — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties',
        source: 'swift-org',
      },
      {
        title: 'propertyWrapper — Swift Standard Library',
        url: 'https://developer.apple.com/documentation/swift/propertywrapper',
        source: 'apple-developer',
      },
    ],
    previousTopic: 'swift-enums',
    nextTopic: 'swift-protocols',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'Swift has three kinds of properties: **stored** (hold a value in memory), **computed** (calculate a value on demand — no storage), and **lazy** (stored, but not initialized until first access). On top of stored properties you can attach **observers** (`willSet` and `didSet`) to react whenever the value changes. Observers do **not** fire during `init`. `static` and `class` properties belong to the type itself, not to any instance.',
      },
      {
        type: 'heading',
        id: 'h-why',
        level: 2,
        content: 'Why properties matter',
      },
      {
        type: 'paragraph',
        id: 'p-why-1',
        content: 'Properties are the building blocks of any Swift type. Every struct, class, and enum you write exposes state and behaviour through properties. Choosing the *right kind* of property — stored vs computed, lazy vs eager, instance vs static — directly affects correctness, performance, and the readability of your code.',
      },
      {
        type: 'paragraph',
        id: 'p-why-2',
        content: 'More importantly, Swift properties come with powerful tools out of the box: observers that react to changes, lazy initialization that defers expensive work, and property wrappers that package recurring patterns (like `@State` in SwiftUI or `@Published` in Combine) into a clean, reusable annotation. Understanding these mechanics is fundamental to writing idiomatic Swift.',
      },
      {
        type: 'heading',
        id: 'h-stored',
        level: 2,
        content: 'Stored properties',
      },
      {
        type: 'paragraph',
        id: 'p-stored-1',
        content: 'A **stored property** allocates actual memory to hold a value. It is the most basic kind. You declare it with `var` (mutable) or `let` (constant after initialization). Stored properties live on the stack for value types (structs, enums) and on the heap for reference types (classes).',
      },
      {
        type: 'code',
        id: 'code-stored',
        language: 'swift',
        caption: 'Stored properties — var is mutable, let is constant',
        content: `struct User {
    let id: UUID          // constant — cannot change after init
    var name: String      // variable — can be mutated
    var age: Int = 0      // stored with a default value
}

var user = User(id: UUID(), name: "Alice", age: 28)
user.name = "Alicia"   // ✅ fine — 'name' is var
// user.id = UUID()    // ❌ compile error — 'id' is let`,
      },
      {
        type: 'callout',
        id: 'c-let-struct',
        variant: 'important',
        title: 'let on a struct instance freezes everything',
        content: 'If you declare a struct instance as `let`, **all** its stored properties become immutable — even the ones declared as `var` inside the struct. This is because structs are value types: the `let` binding protects the entire value, not just a reference.',
      },
      {
        type: 'heading',
        id: 'h-computed',
        level: 2,
        content: 'Computed properties',
      },
      {
        type: 'paragraph',
        id: 'p-computed-1',
        content: 'A **computed property** has no backing storage. Instead it runs a `get` block (and optionally a `set` block) every time it is accessed. Think of it as a property-shaped function — it gives you a clean, readable syntax for values that are always derived from other state.',
      },
      {
        type: 'code',
        id: 'code-computed',
        language: 'swift',
        caption: 'Computed property with get and set',
        content: `struct Circle {
    var radius: Double   // stored — this is the source of truth

    // Computed — derived from radius, no storage of its own
    var diameter: Double {
        get { radius * 2 }
        set { radius = newValue / 2 }  // newValue is the implicit parameter name
    }

    // Read-only computed property — get-only, shorthand syntax
    var area: Double {
        Double.pi * radius * radius
    }
}

var c = Circle(radius: 5)
print(c.diameter)  // 10.0
c.diameter = 20    // calls the setter → radius becomes 10
print(c.area)      // 314.159...`,
      },
      {
        type: 'callout',
        id: 'c-computed-no-storage',
        variant: 'tip',
        title: 'Computed properties run every time you access them',
        content: 'Because a computed property has no backing storage, its `get` block runs fresh on every access. If the calculation is expensive (e.g., parsing a large string), consider caching the result in a stored property and only recalculating when needed. For cheap derivations this is fine — and often preferred over storing derived state that can get out of sync.',
      },
      {
        type: 'paragraph',
        id: 'p-computed-2',
        content: 'Computed properties must always be declared as `var`. Even a read-only computed property is declared `var` — the compiler understands from the absence of a setter that it cannot be set from outside.',
      },
      {
        type: 'heading',
        id: 'h-lazy',
        level: 2,
        content: 'Lazy properties',
      },
      {
        type: 'paragraph',
        id: 'p-lazy-1',
        content: 'A **lazy** stored property is not initialized until the first time it is accessed. This is useful when the initial value is expensive to compute and may never be needed, or when the initial value depends on `self` (which is not yet fully available during normal property initialization).',
      },
      {
        type: 'code',
        id: 'code-lazy',
        language: 'swift',
        caption: 'lazy delays initialization until first access',
        content: `class DataProcessor {
    var inputData: [Int]

    // This closure runs ONLY the first time 'result' is accessed
    lazy var result: [Int] = {
        print("Computing... (expensive)")
        return self.inputData.map { $0 * 2 }
    }()

    init(data: [Int]) {
        self.inputData = data
        // 'result' is NOT computed here — only when first accessed
    }
}

let processor = DataProcessor(data: [1, 2, 3])
// No computation yet...
print(processor.result)  // "Computing..." is printed NOW → [2, 4, 6]
print(processor.result)  // No "Computing..." — already stored, returned directly`,
      },
      {
        type: 'callout',
        id: 'c-lazy-rules',
        variant: 'warning',
        title: 'Two rules for lazy: must be var, not thread-safe',
        content: '**1. `lazy` must be `var`** — because the property starts as nil and is mutated on first access. `let` cannot be mutated after initialization, so `lazy let` is illegal. **2. `lazy` is not thread-safe** — if two threads access the property simultaneously before it is initialized, the closure may execute twice, causing a race condition. Use `lazy` only from a single-threaded context, or add your own synchronization.',
      },
      {
        type: 'heading',
        id: 'h-observers',
        level: 2,
        content: 'Property observers — willSet and didSet',
      },
      {
        type: 'paragraph',
        id: 'p-observers-1',
        content: '**Property observers** let you run code *before* or *after* a stored property changes. `willSet` fires just before the new value is stored — you get `newValue` (the incoming value). `didSet` fires right after — you get `oldValue` (what was there before). You can use both, or just one.',
      },
      {
        type: 'code',
        id: 'code-observers',
        language: 'swift',
        caption: 'willSet and didSet — react to changes on a stored property',
        content: `class TemperatureSensor {
    var temperature: Double = 0 {
        willSet {
            // newValue is implicit — the value about to be stored
            print("About to change from \\(temperature) to \\(newValue)°")
        }
        didSet {
            // oldValue is implicit — the value that was just replaced
            print("Changed from \\(oldValue) to \\(temperature)°")
            if temperature > 100 {
                print("⚠️ Warning: overheating!")
            }
        }
    }
}

var sensor = TemperatureSensor()
sensor.temperature = 37   // willSet → "About to change from 0 to 37°"
                          // didSet  → "Changed from 0 to 37°"
sensor.temperature = 110  // triggers both observers + the warning`,
      },
      {
        type: 'callout',
        id: 'c-observers-init',
        variant: 'important',
        title: 'Observers do NOT fire during initialization',
        content: 'When a stored property is set inside `init`, neither `willSet` nor `didSet` fire. Swift deliberately skips observers during initialization to avoid running side-effect code on a half-constructed object. They also do not fire when you pass a property as an `inout` parameter — the observers fire only on the final write-back when the function returns.',
      },
      {
        type: 'paragraph',
        id: 'p-observers-2',
        content: 'Observers work on both class and struct properties. In subclasses, you can even add observers to inherited stored properties — the subclass observer fires in addition to (not instead of) the parent\'s setter.',
      },
      {
        type: 'code',
        id: 'code-observers-subclass',
        language: 'swift',
        caption: 'Subclass observers augment the parent property without replacing it',
        content: `class Animal {
    var name: String = "" {
        didSet { print("Animal name set to \\(name)") }
    }
}

class Dog: Animal {
    override var name: String {
        didSet { print("Dog name set to \\(name)") }
        // Both this observer AND Animal's observer fire on each change
    }
}

let dog = Dog()
dog.name = "Rex"
// Prints:
//   "Dog name set to Rex"
//   "Animal name set to Rex"`,
      },
      {
        type: 'heading',
        id: 'h-static',
        level: 2,
        content: 'static and class properties',
      },
      {
        type: 'paragraph',
        id: 'p-static-1',
        content: 'Instance properties belong to each individual object — every `User` gets its own `name`. **Type properties** (using `static` or `class`) belong to the type itself and are shared across all instances. There is only ever one copy, regardless of how many instances you create.',
      },
      {
        type: 'code',
        id: 'code-static',
        language: 'swift',
        caption: 'static vs class — type-level properties',
        content: `struct AppConfig {
    // static stored property — one value for the whole type
    static var baseURL: String = "https://api.example.com"

    // static computed property
    static var timeout: TimeInterval { 30.0 }
}

print(AppConfig.baseURL)  // no instance needed — accessed on the type
AppConfig.baseURL = "https://api.staging.example.com"

// In a class, you can use 'class' instead of 'static' for computed properties
// This allows subclasses to override them
class Vehicle {
    class var description: String { "Generic vehicle" }
}

class Car: Vehicle {
    override class var description: String { "Car" }  // ✅ override allowed
}

// 'static' computed properties in a class are final — cannot be overridden
class Truck: Vehicle {
    // override static var ... // ❌ static is implicitly final — compile error
}`,
      },
      {
        type: 'callout',
        id: 'c-static-lazy',
        variant: 'info',
        title: 'static stored properties are lazily initialized by default',
        content: '`static` stored properties in Swift are automatically lazy — they are initialized on first access, not at program startup. They are also thread-safe by default (unlike instance `lazy` properties). This makes `static let` a great way to implement the Singleton pattern safely.',
      },
      {
        type: 'heading',
        id: 'h-property-wrappers',
        level: 2,
        content: 'Property wrappers — the pattern behind @State and @Published',
      },
      {
        type: 'paragraph',
        id: 'p-wrapper-1',
        content: 'A **property wrapper** is a struct (or class, or enum) that wraps a stored property and adds custom read/write behaviour through a required `wrappedValue`. You use them via the `@` annotation syntax. Every time you use `@State` in SwiftUI or `@Published` in Combine, you are using a property wrapper.',
      },
      {
        type: 'code',
        id: 'code-wrapper',
        language: 'swift',
        caption: 'Building a custom property wrapper — @Clamped',
        content: `// A property wrapper that clamps a value between min and max
@propertyWrapper
struct Clamped {
    private var value: Int
    let range: ClosedRange<Int>

    var wrappedValue: Int {
        get { value }
        set { value = min(max(newValue, range.lowerBound), range.upperBound) }
    }

    init(wrappedValue: Int, _ range: ClosedRange<Int>) {
        self.range = range
        self.value = min(max(wrappedValue, range.lowerBound), range.upperBound)
    }
}

struct Player {
    @Clamped(0...100) var health: Int = 100
    @Clamped(0...10)  var lives: Int = 3
}

var player = Player()
player.health = 120   // clamped → remains 100
player.health = -5    // clamped → becomes 0
player.lives = 99     // clamped → becomes 10
print(player.health)  // 0
print(player.lives)   // 10`,
      },
      {
        type: 'paragraph',
        id: 'p-wrapper-2',
        content: 'The `$` prefix gives you access to the **projected value** — an optional secondary value a property wrapper can expose. For example, `$myTextField` in SwiftUI gives you the `Binding<String>` behind a `@State` property, not the `String` itself. The projected value is what `@State`, `@Binding`, and `@Published` expose for two-way data flow.',
      },
      {
        type: 'code',
        id: 'code-projected-value',
        language: 'swift',
        caption: 'projectedValue — the $ prefix in property wrappers',
        content: `@propertyWrapper
struct Logged<T> {
    private var value: T
    private(set) var log: [String] = []

    var wrappedValue: T {
        get { value }
        set {
            log.append("Changed to \\(newValue)")
            value = newValue
        }
    }

    // projectedValue — accessed via $property syntax
    var projectedValue: [String] { log }

    init(wrappedValue: T) { self.value = wrappedValue }
}

struct Settings {
    @Logged var theme: String = "dark"
}

var s = Settings()
s.theme = "light"
s.theme = "system"
print(s.theme)    // "system"
print(s.$theme)   // ["Changed to light", "Changed to system"]`,
      },
      {
        type: 'heading',
        id: 'h-common-mistakes',
        level: 2,
        content: 'Common mistakes',
      },
      {
        type: 'list',
        id: 'l-common-mistakes',
        ordered: false,
        items: [
          'Expecting `didSet` to fire during `init` — it does not. Observers are skipped during initialization to avoid side effects on a partially-constructed object.',
          'Assuming `lazy` is thread-safe — it is not. If two threads race to first-access a `lazy` property, the initializer can run twice. Add your own locking if needed.',
          'Declaring a computed property with `let` — computed properties must be `var`, even read-only ones.',
          'Using a computed property for expensive work without caching — since `get` runs on every access, a costly computation in a computed property will re-run every time you read it.',
          'Confusing `static` and `class` for computed properties in classes — `static` is final (no subclass override), `class` allows overriding. For stored properties in a class, only `static` is valid.',
          'Forgetting that `lazy` must be `var` — the compiler will tell you, but understanding why matters: the property starts nil and is mutated on first access, which requires mutability.',
        ],
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What is the difference between a stored property and a computed property?',
          'When do `willSet` and `didSet` observers NOT fire?',
          'Why must a `lazy` property always be declared as `var`?',
          'What is the difference between `static` and `class` for type-level properties?',
          'What is a property wrapper and what problem does it solve?',
          'What does the `$` prefix give you access to in a property wrapper?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['swift-enums', 'swift-struct-vs-class', 'swift-closures'] },
    ],
  },
];
