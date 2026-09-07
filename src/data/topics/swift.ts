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
    group: 'Core Object-Oriented & Value Types',
    description: 'Protocol-oriented programming, method and property requirements, mutating contracts, default implementations, static vs dynamic dispatch, AnyObject delegates, and associated types.',
    difficulty: 'intermediate',
    estimatedTime: 30,
    language: 'swift',
    version: { language: 'Swift', version: '6', minimumVersion: '1.0', status: 'current', lastReviewed: '2026-09-05' },
    interviewRelevance: 'high',
    tags: ['protocols', 'protocol-extensions', 'pop', 'associated-types', 'anyobject', 'some-vs-any', 'dispatch', 'delegates'],
    relatedTopics: ['swift-properties', 'swift-struct-vs-class', 'swift-generics', 'swift-opaque-types', 'arch-di'],
    furtherReading: [
      {
        title: 'Protocols — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols',
        source: 'swift-org',
      },
      {
        title: 'Protocol-Oriented Programming in Swift — Apple Developer',
        url: 'https://developer.apple.com/videos/play/wwdc2015/408/',
        source: 'apple-developer',
      },
    ],
    previousTopic: 'swift-properties',
    nextTopic: 'swift-access-control',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'A **protocol** in Swift is a contract (a blueprint) defining methods, properties, and other requirements. Any `struct`, `class`, or `enum` can conform to it. Swift is a **Protocol-Oriented Programming (POP)** language: instead of building massive class inheritance trees, you compose small protocols and use **protocol extensions** to provide default implementations. A critical interview distinction is **dynamic dispatch** (via protocol witness tables for declared requirements) versus **static dispatch** (direct call for extension-only methods).',
      },
      {
        type: 'heading',
        id: 'h-why',
        level: 2,
        content: 'Why protocols matter: Protocol-Oriented Programming',
      },
      {
        type: 'paragraph',
        id: 'p-why-1',
        content: 'In traditional Object-Oriented Programming (OOP), code reuse relies heavily on **class inheritance**. While inheritance works, it carries well-known architectural drawbacks: you can only inherit from a single superclass, you inherit unwanted properties and methods ("fragile base class problem"), and you are forced to use reference types (classes) even when value types (structs) would be safer and faster.',
      },
      {
        type: 'paragraph',
        id: 'p-why-2',
        content: 'At WWDC 2015, Apple introduced Swift 2 with the rallying cry: *"Swift is the world\'s first protocol-oriented programming language."* In Swift, protocols allow structs, enums, and classes to share capabilities without a shared ancestor class. The Swift Standard Library itself is built on protocols: `Equatable`, `Comparable`, `Hashable`, `Sequence`, and `Collection` are all protocols that power everyday types like `Array`, `String`, and `Dictionary`.',
      },
      {
        type: 'heading',
        id: 'h-basics',
        level: 2,
        content: 'Declaring protocols: Property and method requirements',
      },
      {
        type: 'paragraph',
        id: 'p-basics-1',
        content: 'A protocol defines what a conforming type must provide. Protocols never allocate storage — they only declare requirements. When declaring a property requirement, you must explicitly specify whether it is **get-only** (`{ get }`) or **gettable and settable** (`{ get set }`).',
      },
      {
        type: 'code',
        id: 'code-basics',
        language: 'swift',
        caption: 'Property and method requirements in a protocol',
        content: `protocol IdentifiableEntity {
    // Requirements cannot have default values or stored property backings
    var id: String { get }            // Must be at least readable
    var displayName: String { get set } // Must be readable AND writable
    
    // Method requirement: signature only, no body
    func summary() -> String
}

// Struct conforming to IdentifiableEntity
struct UserAccount: IdentifiableEntity {
    let id: String                    // 'let' satisfies { get }!
    var displayName: String           // 'var' satisfies { get set }
    
    func summary() -> String {
        "User \\(displayName) [#\\(id)]"
    }
}

// Class conforming to IdentifiableEntity
class DeviceAsset: IdentifiableEntity {
    var id: String                    // Stored 'var' satisfies { get }
    var displayName: String
    
    init(id: String, displayName: String) {
        self.id = id
        self.displayName = displayName
    }
    
    func summary() -> String {
        "Device: \\(displayName)"
    }
}`,
      },
      {
        type: 'callout',
        id: 'c-get-rule',
        variant: 'tip',
        title: '{ get } does NOT mean read-only',
        content: 'A common beginner misconception is thinking `{ get }` forces the conforming property to be constant or read-only. It actually means **at least readable**. A conforming type can satisfy `{ get }` with a constant `let`, a mutable stored `var`, or a computed property (read-only or read-write). In contrast, `{ get set }` strictly requires a mutable `var`.',
      },
      {
        type: 'heading',
        id: 'h-mutating',
        level: 2,
        content: 'Mutating method requirements for value types',
      },
      {
        type: 'paragraph',
        id: 'p-mutating-1',
        content: 'Because structs and enums are value types, their instance methods cannot modify their own stored properties unless marked with the `mutating` keyword. If a protocol method is meant to modify the instance, the protocol declaration **must** mark the method as `mutating func`.',
      },
      {
        type: 'code',
        id: 'code-mutating',
        language: 'swift',
        caption: 'mutating requirements in protocols',
        content: `protocol Togglable {
    mutating func toggle()
}

// Enum conforms — needs mutating keyword
enum SwitchState: Togglable {
    case on, off
    
    mutating func toggle() {
        self = (self == .on) ? .off : .on
    }
}

// Struct conforms — needs mutating keyword
struct Flashlight: Togglable {
    private(set) var isOn: Bool = false
    
    mutating func toggle() {
        isOn.toggle()
    }
}

// Class conforms — does NOT need mutating keyword!
class SmartBulb: Togglable {
    var isOn: Bool = false
    
    // Classes are reference types; mutating is omitted
    func toggle() {
        isOn.toggle()
    }
}`,
      },
      {
        type: 'callout',
        id: 'c-mutating-trap',
        variant: 'important',
        title: 'Classes ignore mutating, but value types require it',
        content: 'If you omit `mutating` from the protocol definition, a struct or enum that conforms **cannot** modify any of its own properties inside that method. However, when a class conforms to a protocol with a `mutating func`, it simply omits the `mutating` keyword because reference types are inherently mutable across references.',
      },
      {
        type: 'heading',
        id: 'h-extensions',
        level: 2,
        content: 'Protocol extensions: Default implementations & retroactive modeling',
      },
      {
        type: 'paragraph',
        id: 'p-extensions-1',
        content: 'Prior to protocol extensions, defining a protocol meant every conforming type had to implement every single method from scratch. With **protocol extensions**, you can provide a **default implementation**. Conforming types get this functionality for free and only override it if they need custom behavior.',
      },
      {
        type: 'code',
        id: 'code-extensions',
        language: 'swift',
        caption: 'Default implementations and retroactive modeling via extensions',
        content: `protocol Greetable {
    var name: String { get }
    func sayHello() -> String
}

// Provide a default implementation for sayHello()
extension Greetable {
    func sayHello() -> String {
        "Hello, my name is \\(name)!"
    }
}

// Customer gets sayHello() automatically without writing any code!
struct Customer: Greetable {
    let name: String
}

let customer = Customer(name: "Maya")
print(customer.sayHello()) // "Hello, my name is Maya!"

// Conforming types can still override the default when needed
struct Robot: Greetable {
    let name: String
    func sayHello() -> String {
        "BEEP BOOP: I am unit \\(name)."
    }
}

let bot = Robot(name: "R2-D2")
print(bot.sayHello()) // "BEEP BOOP: I am unit R2-D2."`,
      },
      {
        type: 'paragraph',
        id: 'p-extensions-2',
        content: 'You can also extend protocols conditionally using `where` clauses, or extend existing types to conform to protocols retroactively (**retroactive modeling**):',
      },
      {
        type: 'code',
        id: 'code-conditional-ext',
        language: 'swift',
        caption: 'Conditional protocol extensions',
        content: `// Add a helper method ONLY to Collections whose elements are Ints
extension Collection where Element == Int {
    func sum() -> Int {
        reduce(0, +)
    }
}

let scores = [10, 25, 40]
print(scores.sum()) // 75

let words = ["hello", "world"]
// words.sum() // ❌ Compile error: Element is String, not Int`,
      },
      {
        type: 'heading',
        id: 'h-dispatch',
        level: 2,
        content: 'The dispatch trap: Declared requirements vs extension-only methods',
      },
      {
        type: 'paragraph',
        id: 'p-dispatch-1',
        content: 'This is one of the most famous and tricky questions asked in Swift iOS interviews. How a method is dispatched depends entirely on whether it is **declared in the protocol blueprint** or **only exists in the protocol extension**.',
      },
      {
        type: 'list',
        id: 'l-dispatch-rules',
        ordered: false,
        items: [
          '**Declared in protocol + default in extension**: Dispatched **dynamically** via the Protocol Witness Table (PWT). If a conforming type overrides it, the conforming type\'s method is ALWAYS called, even when accessed through a protocol existential (`any Protocol`).',
          '**ONLY in extension (not declared in protocol)**: Dispatched **statically** (direct compile-time call). If a variable is typed as the protocol, the extension implementation executes — even if the concrete type implemented its own version with the exact same name!',
        ],
      },
      {
        type: 'code',
        id: 'code-dispatch-trap',
        language: 'swift',
        caption: 'Static vs Dynamic dispatch demonstration',
        content: `protocol Speaker {
    func speak() // Declared in protocol blueprint -> DYNAMIC dispatch
}

extension Speaker {
    func speak() {
        print("Default speaker sound")
    }
    
    // NOT declared in the protocol definition -> STATIC dispatch!
    func introduce() {
        print("Speaker introduction")
    }
}

struct Dog: Speaker {
    func speak() {
        print("Woof!")
    }
    
    func introduce() {
        print("I am a friendly golden retriever")
    }
}

let dog: Dog = Dog()
dog.speak()     // "Woof!" (concrete type calls concrete method)
dog.introduce() // "I am a friendly golden retriever"

// Now view the dog through the protocol lens:
let speaker: any Speaker = dog
speaker.speak()     // "Woof!" -> Dynamic dispatch via witness table
speaker.introduce() // "Speaker introduction" -> STATIC dispatch calls extension!`,
      },
      {
        type: 'callout',
        id: 'c-dispatch-warning',
        variant: 'warning',
        title: 'Why static dispatch surprises developers',
        content: 'Notice `speaker.introduce()` printed `"Speaker introduction"`, completely ignoring `Dog.introduce()`! Because `introduce()` was not part of `Speaker`\'s requirements, the compiler generated a direct static call to `Speaker.introduce()` at compile time based on the variable\'s static type (`any Speaker`). If you want polymorphic behavior, ALWAYS declare the method signature inside the protocol definition.',
      },
      {
        type: 'heading',
        id: 'h-class-only',
        level: 2,
        content: 'Class-only protocols: AnyObject and weak delegates',
      },
      {
        type: 'paragraph',
        id: 'p-class-only-1',
        content: 'In iOS and macOS development, the **Delegate pattern** is everywhere (e.g., `UITableViewDelegate`, `CLLocationManagerDelegate`). To avoid strong reference cycles (memory leaks), delegate properties must be marked `weak`.',
      },
      {
        type: 'paragraph',
        id: 'p-class-only-2',
        content: 'However, in Swift, `weak` can only be applied to reference types (classes). Value types like structs cannot be held weakly because they do not have reference counting. Therefore, any protocol intended to be held as a `weak` delegate must inherit from `AnyObject`.',
      },
      {
        type: 'code',
        id: 'code-class-only',
        language: 'swift',
        caption: 'AnyObject delegate protocol to allow weak references',
        content: `// AnyObject restricts conformance strictly to classes
protocol AudioPlayerDelegate: AnyObject {
    func audioPlayerDidFinishPlaying(_ player: AudioPlayer)
    func audioPlayer(_ player: AudioPlayer, didEncounterError error: Error)
}

class AudioPlayer {
    // Must be 'weak' to prevent a retain cycle with the delegate owner
    weak var delegate: (any AudioPlayerDelegate)?
    
    func playbackEnded() {
        delegate?.audioPlayerDidFinishPlaying(self)
    }
}

// ❌ If you try to conform a struct, the compiler rejects it:
// struct MusicTracker: AudioPlayerDelegate { ... }
// Error: Non-class type 'MusicTracker' cannot conform to class protocol 'AudioPlayerDelegate'`,
      },
      {
        type: 'callout',
        id: 'c-class-keyword',
        variant: 'info',
        title: 'class vs AnyObject keyword',
        content: 'In older Swift versions, developers wrote `protocol AudioPlayerDelegate: class`. Swift 5 deprecated `: class` in favor of `: AnyObject` to make it clear that the constraint refers to the `AnyObject` protocol (the protocol that all classes implicitly conform to).',
      },
      {
        type: 'heading',
        id: 'h-composition',
        level: 2,
        content: 'Protocol composition: Combining smaller protocols',
      },
      {
        type: 'paragraph',
        id: 'p-composition-1',
        content: 'Instead of designing a massive protocol with dozens of requirements, idiomatic Swift encourages designing small, focused protocols (Interface Segregation Principle). You can then combine multiple protocols together at call sites using the ampersand (`&`) operator.',
      },
      {
        type: 'code',
        id: 'code-composition',
        language: 'swift',
        caption: 'Protocol composition with the & operator',
        content: `protocol Named {
    var name: String { get }
}

protocol Aged {
    var age: Int { get }
}

protocol Contactable {
    var email: String { get }
}

// Function requires a type that satisfies BOTH Named AND Aged
func printBirthdayCard(for person: any Named & Aged) {
    print("Happy Birthday, \\(person.name)! You are \\(person.age) today.")
}

// Typealiases can make common compositions readable:
// (Just like standard library: typealias Codable = Encodable & Decodable)
typealias PersonProfile = Named & Aged & Contactable

struct Employee: PersonProfile {
    let name: String
    let age: Int
    let email: String
}

let dev = Employee(name: "Liam", age: 29, email: "liam@example.com")
printBirthdayCard(for: dev) // "Happy Birthday, Liam! You are 29 today."`,
      },
      {
        type: 'heading',
        id: 'h-associated-types',
        level: 2,
        content: 'Associated types: Protocols with generics',
      },
      {
        type: 'paragraph',
        id: 'p-associated-types-1',
        content: 'Normal structs and classes can use angle brackets for generics (e.g. `struct Stack<Element>`). Protocols cannot use angle brackets for type parameters. Instead, protocols define generic requirements using the `associatedtype` keyword.',
      },
      {
        type: 'paragraph',
        id: 'p-associated-types-2',
        content: 'An **associated type** acts as a placeholder name for a type used as part of the protocol. Conforming types provide the actual type either implicitly (via type inference from method arguments/return types) or explicitly using `typealias`.',
      },
      {
        type: 'code',
        id: 'code-associated-types',
        language: 'swift',
        caption: 'associatedtype in a Container protocol',
        content: `protocol Cache {
    associatedtype Key: Hashable  // Type constraint on the associatedtype
    associatedtype Value
    
    mutating func set(_ value: Value, for key: Key)
    func get(key: Key) -> Value?
}

struct MemoryCache<K: Hashable, V>: Cache {
    // The compiler infers 'typealias Key = K' and 'typealias Value = V'
    // from the dictionary and method signatures:
    private var storage: [K: V] = [:]
    
    mutating func set(_ value: V, for key: K) {
        storage[key] = value
    }
    
    func get(key: K) -> V? {
        storage[key]
    }
}

var tokenCache = MemoryCache<String, String>()
tokenCache.set("bearer_abc123", for: "auth_token")
print(tokenCache.get(key: "auth_token") ?? "none") // "bearer_abc123"`,
      },
      {
        type: 'callout',
        id: 'c-primary-associated',
        variant: 'tip',
        title: 'Primary Associated Types (Swift 5.7+ / Swift 6)',
        content: 'Swift 5.7 introduced **Primary Associated Types**, letting you write `protocol Cache<Key, Value>` similar to standard generics. This allows you to write clean type constraints like `some Cache<String, User>` without painful type erasure.',
      },
      {
        type: 'heading',
        id: 'h-some-vs-any',
        level: 2,
        content: 'Modern Swift: some Protocol vs any Protocol',
      },
      {
        type: 'paragraph',
        id: 'p-some-vs-any-1',
        content: 'Starting in Swift 5.7 and enforced strictly in Swift 6, you must use either `some Protocol` (an **opaque type**) or `any Protocol` (an **existential type**). Understanding the difference is vital for writing performant Swift and answering senior-level interview questions.',
      },
      {
        type: 'table',
        id: 'table-some-vs-any',
        caption: 'Comparison: some Protocol vs any Protocol',
        headers: ['Feature', 'some Protocol (Opaque Type)', 'any Protocol (Existential Box)'],
        rows: [
          { cells: ['Underlying Type', 'One specific concrete type known at compile time', 'Can hold any conforming type at runtime'] },
          { cells: ['Dispatch', 'Static dispatch (inlinable, zero overhead)', 'Dynamic dispatch via witness tables'] },
          { cells: ['Memory Cost', 'Stored inline, zero allocation overhead', 'Existential container (3-word buffer + heap allocation if large)'] },
          { cells: ['Heterogeneous Arrays', '❌ No (all elements must be the same concrete type)', '✅ Yes (e.g. [any Drawable] can mix Circle, Square)'] },
          { cells: ['Primary Use Case', 'Function return types (SwiftUI body), parameters', 'Mixed collections, dynamic plugin systems'] },
        ],
      },
      {
        type: 'code',
        id: 'code-some-vs-any',
        language: 'swift',
        caption: 'some vs any in practice',
        content: `protocol Shape {
    func draw()
}

struct Circle: Shape {
    func draw() { print("⚪️") }
}

struct Square: Shape {
    func draw() { print("⬛️") }
}

// 'some Shape' — compiler knows the exact type; fast, inlinable
func makeDefaultShape() -> some Shape {
    Circle() // Must return ONE concrete type consistently
}

// 'any Shape' — existential box that can hold mixed shapes
let mixedShapes: [any Shape] = [Circle(), Square(), Circle()]
for shape in mixedShapes {
    shape.draw() // Dynamically dispatched
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
          'Attempting to declare a stored property inside a protocol — protocols only define `{ get }` or `{ get set }` requirements; storage belongs to the conforming types.',
          'Missing `AnyObject` on delegate protocols — attempting to use `weak var delegate: MyDelegate?` causes a compiler error because `weak` requires reference types.',
          'Assuming methods in protocol extensions are always dynamically dispatched — if a method is not declared in the protocol definition, calling it on an existential variable will statically call the extension implementation, ignoring any concrete override.',
          'Forgetting `mutating` on protocol method requirements — structs and enums cannot modify internal state in a protocol method unless the protocol declared it as `mutating func`.',
          'Using `any Protocol` by default everywhere — existentials incur box allocation and dynamic dispatch costs; use `some Protocol` unless you genuinely need runtime polymorphism or heterogeneous collections.',
          'Omitting `required` on an initializer implemented by a non-final class — classes conforming to a protocol with an `init` requirement must mark it `required init` so all future subclasses also satisfy the protocol.',
        ],
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What is Protocol-Oriented Programming (POP) and how does it compare to OOP class inheritance?',
          'What is the difference between a method declared in a protocol vs a method only defined in a protocol extension?',
          'Why do delegate protocols in iOS need to inherit from AnyObject?',
          'What is an associated type in Swift, and how do Primary Associated Types work?',
          'Explain the difference between some Protocol and any Protocol in modern Swift.',
          'Why must value types mark protocol methods with mutating, and what happens when a class conforms?',
          'Why does a non-final class require the `required` keyword when implementing a protocol initializer?',
        ],
      },
      {
        type: 'relatedTopics',
        id: 'related',
        topicIds: ['swift-properties', 'swift-struct-vs-class', 'swift-generics', 'swift-opaque-types', 'arch-di'],
      },
    ],
  },

  // ─── Access Control ───────────────────────────────────────────────────────
  {
    id: 'swift-access-control',
    slug: 'access-control',
    title: 'Access Control: private, fileprivate, internal, package, public, open',
    category: 'swift',
    group: 'Core Object-Oriented & Value Types',
    description:
      'The visibility keywords that control what parts of your code can see and use a given type, property, or method — from the narrowest (private) to the widest (open).',
    difficulty: 'intermediate',
    estimatedTime: 20,
    language: 'swift',
    version: {
      language: 'Swift',
      version: '6',
      status: 'current',
      lastReviewed: '2026-09-01',
    },
    interviewRelevance: 'high',
    tags: [
      'access-control',
      'private',
      'fileprivate',
      'internal',
      'package',
      'public',
      'open',
      'encapsulation',
      'modules',
    ],
    furtherReading: [
      {
        title: 'Access Control — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/accesscontrol',
        source: 'swift-org',
      },
    ],
    previousTopic: 'swift-protocols',
    nextTopic: 'swift-generics',
    relatedTopics: ['swift-struct-vs-class', 'swift-protocols', 'swift-generics'],
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content:
          'Access control keywords determine which parts of your code can see and use a type, property, method, or initializer. From most restrictive to least: `private`, `fileprivate`, `internal` (the default), `package`, `public`, and `open`. Getting this right matters more as your codebase grows — it\'s how you hide implementation details and only expose what\'s actually meant to be used from outside.',
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
          'In a small script, nobody thinks about access control — everything is visible to everything else, and that\'s fine at that scale. But as soon as your codebase has multiple files, multiple developers, or is packaged as a framework/library that other code depends on, visibility becomes a real design decision.',
      },
      {
        type: 'paragraph',
        id: 'p-why-2',
        content: 'Two big reasons this matters:',
      },
      {
        type: 'paragraph',
        id: 'p-why-encapsulation',
        content:
          '**Encapsulation.** If a type\'s internal implementation details are all `private`, you can freely refactor how it works internally without breaking anything that uses it — because nothing outside could see those details in the first place. If everything is exposed, any internal change risks breaking something else that (perhaps accidentally) depended on it.',
      },
      {
        type: 'paragraph',
        id: 'p-why-frameworks',
        content:
          '**API surface for frameworks.** If you\'re building a Swift Package that other projects will import, every `public` or `open` declaration becomes a promise — a contract that external code might depend on. The more you expose, the harder it becomes to change later without breaking your consumers. This is why professional framework design defaults toward the *most restrictive* access level that still works, and only widens it when there\'s a real reason to.',
      },
      {
        type: 'heading',
        id: 'h-how',
        level: 2,
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        id: 'p-how-intro',
        content:
          'Swift has six access levels. Here they are from most restrictive to least, each with what it actually means:',
      },
      {
        type: 'heading',
        id: 'h-private',
        level: 3,
        content: 'private — visible only within the enclosing declaration',
      },
      {
        type: 'code',
        id: 'code-private',
        language: 'swift',
        content: `class BankAccount {
    private var balance: Double = 0
    
    func deposit(_ amount: Double) {
        balance += amount  // OK — same type
    }
}

let account = BankAccount()
// account.balance  // ❌ Compile error — balance is private`,
      },
      {
        type: 'paragraph',
        id: 'p-private-nuance',
        content:
          'Important nuance: since Swift 4, `private` also allows access from **extensions of the same type in the same file**:',
      },
      {
        type: 'code',
        id: 'code-private-ext',
        language: 'swift',
        content: `class BankAccount {
    private var balance: Double = 0
}

extension BankAccount {
    func printBalance() {
        print(balance)  // ✅ OK — same file, same type, even though it's a different extension block
    }
}`,
      },
      {
        type: 'heading',
        id: 'h-fileprivate',
        level: 3,
        content: 'fileprivate — visible anywhere in the same file',
      },
      {
        type: 'paragraph',
        id: 'p-fileprivate-desc',
        content:
          'Unlike `private` (scoped to the declaration and its same-file extensions), `fileprivate` is scoped to the entire file, across *different* types:',
      },
      {
        type: 'code',
        id: 'code-fileprivate',
        language: 'swift',
        content: `class BankAccount {
    fileprivate var balance: Double = 0
}

class AccountAuditor {
    func audit(_ account: BankAccount) {
        print(account.balance)  // ✅ OK — different type, but same file
    }
}
// If AccountAuditor were in a different file, this would fail to compile`,
      },
      {
        type: 'heading',
        id: 'h-internal',
        level: 3,
        content: 'internal — the default, visible throughout the module',
      },
      {
        type: 'paragraph',
        id: 'p-internal-desc',
        content:
          'If you don\'t write an access modifier at all, `internal` is what you get. It means "visible anywhere in this module (your app target, or this specific framework target), but not visible to anyone importing this module from outside."',
      },
      {
        type: 'code',
        id: 'code-internal',
        language: 'swift',
        content: `class BankAccount {  // implicitly internal
    var balance: Double = 0  // implicitly internal
}
// Any file within the same app/module can use BankAccount and balance freely.
// A different module that imports this one cannot see BankAccount at all.`,
      },
      {
        type: 'paragraph',
        id: 'p-internal-usage',
        content:
          'Most of your everyday app code never needs to think about access control beyond this default — `internal` is exactly right for code that\'s used across your app but isn\'t meant for outside consumers.',
      },
      {
        type: 'heading',
        id: 'h-package',
        level: 3,
        content: 'package — visible across modules within the same package (Swift 5.9+)',
      },
      {
        type: 'paragraph',
        id: 'p-package-desc',
        content:
          'This is a more recent addition, aimed at multi-module Swift packages. `package` access lets code be visible across *different modules that are part of the same package*, without exposing it to external consumers who import the package:',
      },
      {
        type: 'code',
        id: 'code-package',
        language: 'swift',
        content: `// In module A (part of MyPackage)
package struct InternalConfig {
    package var debugMode: Bool
}

// In module B (also part of MyPackage) — can see InternalConfig
// A separate project that imports MyPackage cannot see it at all`,
      },
      {
        type: 'paragraph',
        id: 'p-package-gap',
        content:
          'This solves a real gap: before `package` existed, you either had to make something `public` (exposing it to every external consumer too) or duplicate code across modules to keep it `internal`-only per-module. `package` gives you a middle ground: shared internally across your package\'s modules, hidden from everyone else.',
      },
      {
        type: 'heading',
        id: 'h-public',
        level: 3,
        content: 'public — visible to any module that imports this one',
      },
      {
        type: 'code',
        id: 'code-public',
        language: 'swift',
        content: `public class NetworkClient {
    public var baseURL: URL
    
    public init(baseURL: URL) {
        self.baseURL = baseURL
    }
    
    public func fetch() { /* ... */ }
}`,
      },
      {
        type: 'paragraph',
        id: 'p-public-desc',
        content:
          'External code that imports your framework can create `NetworkClient` instances and call `fetch()`. But — important — external code **cannot subclass `NetworkClient` or override its methods**, even though it\'s public. For that, you need `open`.',
      },
      {
        type: 'heading',
        id: 'h-open',
        level: 3,
        content: 'open — visible AND subclassable/overridable from outside',
      },
      {
        type: 'code',
        id: 'code-open',
        language: 'swift',
        content: `open class NetworkClient {
    open func fetch() { /* ... */ }
}

// In an external module that imports this framework:
class CustomClient: NetworkClient {
    override func fetch() {
        // ✅ Only possible because NetworkClient and fetch() are 'open', not just 'public'
    }
}`,
      },
      {
        type: 'paragraph',
        id: 'p-open-desc',
        content:
          '`open` only applies to classes and their overridable members — it doesn\'t make sense for structs, enums, or final classes, since they can\'t be subclassed regardless.',
      },
      {
        type: 'heading',
        id: 'h-asymmetric',
        level: 3,
        content: 'Asymmetric access: private(set) and similar patterns',
      },
      {
        type: 'paragraph',
        id: 'p-asymmetric-desc',
        content:
          'Sometimes you want a property to be readable from a wider scope than it\'s writable from — very common for exposing state that outside code should observe but not mutate directly:',
      },
      {
        type: 'code',
        id: 'code-asymmetric',
        language: 'swift',
        content: `class ScoreTracker {
    private(set) var score: Int = 0
    
    func addPoint() {
        score += 1  // Can modify from inside
    }
}

let tracker = ScoreTracker()
print(tracker.score)  // ✅ Readable from outside (internal by default)
// tracker.score = 100  // ❌ Compile error — settable only from within ScoreTracker`,
      },
      {
        type: 'paragraph',
        id: 'p-asymmetric-usage',
        content:
          'This pattern (`private(set)`, or `internal(set)` on a `public` property) is one of the most useful access control tools in everyday Swift — it lets you expose read access widely while keeping write access tightly controlled, without needing a separate getter method.',
      },
      {
        type: 'heading',
        id: 'h-common-mistakes',
        level: 2,
        content: 'Common mistakes',
      },
      {
        type: 'list',
        id: 'list-common-mistakes',
        ordered: false,
        items: [
          'Assuming `public` allows subclassing or overriding from other modules — it doesn\'t. Only `open` does. This trips people up constantly when designing frameworks.',
          'Confusing `private` and `fileprivate` — remember: `private` is scoped to the declaration (plus same-file extensions of that type); `fileprivate` is scoped to the whole file, across different types.',
          'Overusing `public`/`open` "just in case" — every public declaration is a promise to your framework\'s consumers. Default to the most restrictive level that works, and widen only when there\'s a real need.',
          'Not knowing about `package` access and reaching for `public` unnecessarily in a multi-module package, exposing internal-only code to external consumers.',
          'Forgetting that a property\'s setter can have a different (more restrictive) access level than its getter, via `private(set)` — leading to unnecessarily verbose custom getter/setter code when this would do the job.',
          'Marking something `open` by default without a specific reason — `open` should be a deliberate design decision for extensibility, not a default habit.',
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
        id: 'list-when-to-use',
        ordered: false,
        items: [
          'Use `private` for implementation details that only the type itself (and its same-file extensions) should touch.',
          'Use `fileprivate` when a small group of closely related types in the same file need to collaborate on shared state.',
          'Use `internal` (the default) for the vast majority of your app code — anything shared across your app but not meant for outside consumers.',
          'Use `package` when building a multi-module Swift package and you need visibility across your own modules without exposing it externally.',
          'Use `public` for framework API you want external consumers to use directly, but don\'t want them extending via subclassing.',
          'Use `open` only when you specifically want external code to be able to subclass or override — a deliberate extensibility decision, not a default.',
          'Use `private(set)` (or similar) whenever you want to expose a value for reading more widely than you want to allow writing.',
        ],
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What are Swift\'s six access control levels, from most to least restrictive?',
          'What is the difference between private and fileprivate?',
          'What is the difference between public and open, and why does this distinction exist?',
          'What problem does the \'package\' access level solve, and when would you use it?',
          'What does this code do, and why might you design a property this way?',
          'Why does good framework design generally favor the most restrictive access level that still works, rather than making everything public?',
          'Detail the 6 access levels in modern Swift, including open vs public and the package access level.',
        ],
      },
      {
        type: 'relatedTopics',
        id: 'related',
        topicIds: ['swift-struct-vs-class', 'swift-protocols', 'swift-generics'],
      },
    ],
  },

  // ─── Generics ─────────────────────────────────────────────────────────────
  {
  "id": "swift-generics",
  "slug": "generics",
  "title": "Generics & Type Constraints",
  "category": "swift",
  "group": "Core Object-Oriented & Value Types",
  "description": "Write flexible, reusable code with type parameters, protocol constraints, generic types with mutation, associated types, generic where clauses, and compiler monomorphization.",
  "difficulty": "advanced",
  "estimatedTime": 40,
  "language": "swift",
  "version": {
    "language": "Swift",
    "version": "6",
    "minimumVersion": "5.0",
    "status": "current",
    "lastReviewed": "2026-09-06"
  },
  "interviewRelevance": "high",
  "tags": [
    "generics",
    "type-constraints",
    "where-clauses",
    "associated-types",
    "monomorphization",
    "conditional-conformance"
  ],
  "relatedTopics": [
    "swift-protocols",
    "swift-opaque-types",
    "swift-type-erasure",
    "swift-method-dispatch",
    "arch-di"
  ],
  "previousTopic": "swift-access-control",
  "nextTopic": "swift-property-wrappers-keypaths",
    "furtherReading": [
    {
      "title": "Generics — The Swift Programming Language",
      "url": "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/generics",
      "source": "swift-org"
    },
    {
      "title": "Swift Standard Library Documentation",
      "url": "https://developer.apple.com/documentation/swift/swift_standard_library",
      "source": "apple-developer"
    }
  ],
  "content": [
    {
      "type": "quickAnswer",
      "id": "qa",
      "content": "Generics let you write type-safe code that works with multiple types. Type constraints restrict which types satisfy the generic — for example, a function might accept any type conforming to Equatable."
    },
    {
      "type": "heading",
      "id": "h-why-generics",
      "level": 2,
      "content": "Why Generics Matter: Parametric Polymorphism & Type Safety"
    },
    {
      "type": "paragraph",
      "id": "p-why-1",
      "content": "Before generics, software engineers faced an unavoidable dilemma when writing reusable code: either write duplicate functions for every single type (`swapInt`, `swapDouble`, `swapString`), or throw away type safety by using untyped placeholders like `Any` or Objective-C's `id` / `NSObject`."
    },
    {
      "type": "paragraph",
      "id": "p-why-2",
      "content": "Writing duplicates leads to massive code bloat and maintenance drift. Using `Any` forces dangerous runtime casts (`as!`), disables compiler checks, and incurs heap allocation boxing overhead. Generics provide **parametric polymorphism**: you write an algorithm once against an abstract type parameter `T`, and the Swift compiler validates that all operations are legal at compile time while preserving full type identity."
    },
    {
      "type": "heading",
      "id": "h-functions",
      "level": 2,
      "content": "Generic Functions & Type Inference"
    },
    {
      "type": "paragraph",
      "id": "p-functions-1",
      "content": "A generic function introduces one or more placeholder type parameters inside angle brackets (`<T>`) immediately following the function name. Callers rarely need to specify `<Type>` explicitly because Swift's powerful bidirectional type checker infers `T` from the arguments passed at the call site."
    },
    {
      "type": "code",
      "id": "code-generic-functions",
      "language": "swift",
      "caption": "Generic functions, inout swaps, and call-site type inference",
      "content": "// Type parameter T acts as a placeholder for any concrete type\nfunc swapTwoValues<T>(_ a: inout T, _ b: inout T) {\n    let temporary = a\n    a = b\n    b = temporary\n}\n\nvar firstScore = 42\nvar secondScore = 99\nswapTwoValues(&firstScore, &secondScore) // Compiler infers T is Int\nprint(\"Scores: \\(firstScore), \\(secondScore)\")\n// prints: Scores: 99, 42\n\nvar playerOne = \"Alice\"\nvar playerTwo = \"Bob\"\nswapTwoValues(&playerOne, &playerTwo)   // Compiler infers T is String\nprint(\"Players: \\(playerOne), \\(playerTwo)\")\n// prints: Players: Bob, Alice\n\n// ❌ Compile error: Arguments must be the same concrete type!\n// swapTwoValues(&firstScore, &playerOne)\n\n// Generic utility function with multiple type parameters\nfunc pair<First, Second>(_ a: First, _ b: Second) -> (First, Second) {\n    (a, b)\n}\nlet profile = pair(\"User_402\", 100)\nprint(profile)\n// prints: (\"User_402\", 100)"
    },
    {
      "type": "heading",
      "id": "h-constraints",
      "level": 2,
      "content": "Type Constraints: Protocol Conformance and Class Bounds"
    },
    {
      "type": "paragraph",
      "id": "p-constraints-1",
      "content": "Unconstrained generics (`<T>`) only allow operations universal to every value in Swift (such as assigning, copying, or passing parameters). To compare values, format strings, serialize to JSON, or call domain methods, you apply **Type Constraints**."
    },
    {
      "type": "list",
      "id": "l-constraints-types",
      "ordered": false,
      "items": [
        "**Protocol Constraints (`<T: Protocol>`):** Mandates that `T` conforms to a protocol (e.g. `Comparable`, `Hashable`, `Codable`). Satisfied by structs, enums, or classes.",
        "**Class Inheritance Bounds (`<T: SomeClass>`):** Restricts `T` to a specific class or any of its subclasses. Enforces reference semantics and unlocks superclass properties and methods.",
        "**Composition Constraints (`<T: ProtocolA & ProtocolB>`):** Combines multiple protocols and class requirements using the `&` operator."
      ]
    },
    {
      "type": "code",
      "id": "code-constraints",
      "language": "swift",
      "caption": "Type constraints using protocol conformance and class bounds",
      "content": "// T must conform to Comparable to allow the '>' operator\nfunc findMax<T: Comparable>(in array: [T]) -> T? {\n    guard var currentMax = array.first else { return nil }\n    for item in array.dropFirst() {\n        if item > currentMax {\n            currentMax = item\n        }\n    }\n    return currentMax\n}\n\nlet result1 = findMax(in: [3, 1, 4])\nprint(result1 ?? 0)\n// prints: 4\n\nlet result2 = findMax(in: [\"apple\", \"zebra\", \"banana\"])\nprint(result2 ?? \"\")\n// prints: zebra\n\n// Class constraint: T must be a UIViewController subclass conforming to Themeable\nprotocol Themeable {\n    func applyBrandTheme()\n}\n\nclass BaseViewController {}\nclass ProfileViewController: BaseViewController, Themeable {\n    func applyBrandTheme() { print(\"Applied theme\") }\n}\n\nfunc configureScreen<T: BaseViewController & Themeable>(_ controller: T) {\n    controller.applyBrandTheme()\n}\n\nlet profileVC = ProfileViewController()\nconfigureScreen(profileVC)\n// prints: Applied theme"
    },
    {
      "type": "callout",
      "id": "c-constraint-vs-existential",
      "variant": "tip",
      "title": "Generic Constraint (<T: Shape>) vs Existential Box (any Shape)",
      "content": "A generic function `func draw<T: Shape>(_ s: T)` preserves concrete type identity, uses fast direct dispatch via monomorphization, and avoids heap boxing. In contrast, `func draw(_ s: any Shape)` wraps the value into an existential container with dynamic witness table dispatch. Always default to generic type constraints (`<T: Shape>`) or opaque parameters (`some Shape`) unless you strictly need runtime heterogeneous storage."
    },
    {
      "type": "heading",
      "id": "h-generic-types",
      "level": 2,
      "content": "Generic Types: Building Reusable Data Structures"
    },
    {
      "type": "paragraph",
      "id": "p-generic-types-1",
      "content": "Just like the standard library provides generic types like `Array<Element>`, `Dictionary<Key, Value>`, and `Optional<Wrapped>`, you can create custom generic `struct`s, `class`es, and `enum`s. Methods on generic types inherit the type parameters without repeating `<T>` on every method signature."
    },
    {
      "type": "code",
      "id": "code-generic-type",
      "language": "swift",
      "caption": "Generic Stack with value semantics and Sequence conformance",
      "content": "struct Stack<Element>: Sequence {\n    private var elements: [Element] = []\n    \n    var isEmpty: Bool { elements.isEmpty }\n    var count: Int { elements.count }\n    \n    // mutating required because structs are value types\n    mutating func push(_ element: Element) {\n        elements.append(element)\n    }\n    \n    mutating func pop() -> Element? {\n        elements.popLast()\n    }\n    \n    func peek() -> Element? {\n        elements.last\n    }\n    \n    // Sequence conformance allows for-in loops and map/filter/reduce\n    func makeIterator() -> IndexingIterator<[Element]> {\n        elements.makeIterator()\n    }\n}\n\nvar numbers = Stack<Int>()\nnumbers.push(10)\nnumbers.push(20)\nprint(numbers.pop() ?? 0)\n// prints: 20\n\nvar breadcrumbs = Stack<String>()\nbreadcrumbs.push(\"Home\")\nbreadcrumbs.push(\"Settings\")\nprint(breadcrumbs.peek() ?? \"\")\n// prints: Settings"
    },
    {
      "type": "heading",
      "id": "h-associated-types",
      "level": 2,
      "content": "Associated Types & Primary Associated Types in Protocols"
    },
    {
      "type": "paragraph",
      "id": "p-assoc-1",
      "content": "Protocols cannot use angle bracket type parameters (e.g. you cannot declare `protocol Container<T>`). If protocols used angle brackets, a single type like `Array` could conform to `Container<Int>` and `Container<String>` at the same time, leading to ambiguous member lookup. Instead, protocols define generic requirements using **`associatedtype`**."
    },
    {
      "type": "paragraph",
      "id": "p-assoc-2",
      "content": "An associated type establishes a 1-to-1 relationship: every conforming type specifies its own concrete associated type, either explicitly with `typealias` or implicitly via method argument and return types."
    },
    {
      "type": "code",
      "id": "code-associated-types",
      "language": "swift",
      "caption": "associatedtype and Primary Associated Types in protocols",
      "content": "// Swift 5.7+ Primary Associated Type: <Item> in angle brackets!\nprotocol Container<Item> {\n    associatedtype Item\n    \n    var count: Int { get }\n    mutating func append(_ item: Item)\n    subscript(index: Int) -> Item { get }\n}\n\n// Conforming Stack automatically satisfies 'Item = Element'\nextension Stack: Container {\n    typealias Item = Element\n    \n    mutating func append(_ item: Element) {\n        push(item)\n    }\n    \n    subscript(index: Int) -> Element {\n        elements[index]\n    }\n}\n\n// Swift 5.7+ Primary Associated Type constraint in function signature:\nfunc printContainerItems(container: some Container<String>) {\n    print(\"Container with \\(container.count) strings:\")\n    for i in 0..<container.count {\n        print(\" - \\(container[i])\")\n    }\n}\n\nvar names = Stack<String>()\nnames.append(\"Alice\")\nnames.append(\"Bob\")\nprintContainerItems(container: names)\n// prints: Container with 2 strings:\n// prints:  - Alice\n// prints:  - Bob"
    },
    {
      "type": "callout",
      "id": "c-primary-associated-types",
      "variant": "info",
      "title": "Primary Associated Types (Swift 5.7+ / Swift 6)",
      "content": "Before Swift 5.7, constraining an associated type required verbose where clauses: `func process<C: Collection>(items: C) where C.Element == String`. With Primary Associated Types, you can write `func process(items: some Collection<String>)` or `let pub: any Publisher<Data, Error>`, dramatically simplifying protocol ergonomics."
    },
    {
      "type": "heading",
      "id": "h-where-clauses",
      "level": 2,
      "content": "Generic Where Clauses & Conditional Conformance"
    },
    {
      "type": "paragraph",
      "id": "p-where-1",
      "content": "A generic `where` clause lets you define nuanced constraints on generic parameters or associated types. You can require that an associated type conforms to a protocol, or that two associated types refer to the exact same concrete type."
    },
    {
      "type": "paragraph",
      "id": "p-where-2",
      "content": "Furthermore, Swift supports **Conditional Conformance** (SE-0143): a generic type can conform to a protocol ONLY when its generic arguments meet specific constraints."
    },
    {
      "type": "code",
      "id": "code-where-clauses",
      "language": "swift",
      "caption": "Generic where clauses, conditional conformance, and contextual extensions",
      "content": "// 1. Where clause matching associated types across two containers\nfunc allItemsMatch<C1: Container, C2: Container>(\n    _ left: C1, \n    _ right: C2\n) -> Bool where C1.Item == C2.Item, C1.Item: Equatable {\n    guard left.count == right.count else { return false }\n    for i in 0..<left.count {\n        if left[i] != right[i] { return false }\n    }\n    return true\n}\n\n// 2. Conditional Conformance: Stack is Equatable ONLY if Element is Equatable!\nextension Stack: Equatable where Element: Equatable {\n    static func == (lhs: Stack<Element>, rhs: Stack<Element>) -> Bool {\n        lhs.elements == rhs.elements\n    }\n}\n\nvar stackA = Stack<Int>()\nstackA.push(1)\nstackA.push(2)\n\nvar stackB = Stack<Int>()\nstackB.push(1)\nstackB.push(2)\n\nprint(stackA == stackB)\n// prints: true\n\nprint(allItemsMatch(stackA, stackB))\n// prints: true\n\n// 3. Contextual Extension: sum() ONLY exists when Element is Numeric\nextension Stack where Element: Numeric {\n    func sum() -> Element {\n        elements.reduce(0, +)\n    }\n}\n\nprint(stackA.sum())\n// prints: 3\n\n// 4. Protocol conformance utility with Codable\nfunc printAsJSON<T: Encodable>(_ value: T) {\n    let encoder = JSONEncoder()\n    if let data = try? encoder.encode(value),\n       let json = String(data: data, encoding: .utf8) {\n        print(json)\n    }\n}\n\nstruct Person: Codable {\n    let name: String\n    let age: Int\n}\n\nlet person = Person(name: \"Alice\", age: 30)\nprintAsJSON(person)\n// prints: {\"name\":\"Alice\",\"age\":30}"
    },
    {
      "type": "heading",
      "id": "h-monomorphization",
      "level": 2,
      "content": "Monomorphization, Specialization & Performance"
    },
    {
      "type": "paragraph",
      "id": "p-mono-1",
      "content": "A major fear among iOS developers transitioning from other languages is runtime generic overhead. In Swift, generics have **zero runtime overhead** when compiled under Whole Module Optimization (WMO)."
    },
    {
      "type": "paragraph",
      "id": "p-mono-2",
      "content": "During compilation, the Swift compiler performs **Monomorphization (Generic Specialization)**. When it encounters `Stack<Int>` or `findMax(in: [Int])`, it generates a dedicated, specialized copy of the instructions substituting `Int` directly into the CPU registers. Protocol requirements turn into direct function jumps or get completely inlined, eliminating witness table indirection."
    },
    {
      "type": "callout",
      "id": "c-code-bloat",
      "variant": "warning",
      "title": "The Binary Size Tradeoff (Code Bloat)",
      "content": "While monomorphization maximizes raw CPU execution speed, specializing a complex generic struct for 25 different concrete types will generate 25 distinct blocks of machine code in your final app binary. In massive production apps, overusing deeply nested generics can noticeably inflate binary download size."
    },
    {
      "type": "heading",
      "id": "h-comparison",
      "level": 2,
      "content": "Comparison: Generics vs Opaque Types vs Existentials vs Overloading"
    },
    {
      "type": "table",
      "id": "table-generics-comparison",
      "caption": "Swift Polymorphism & Code Reuse Mechanics",
      "headers": [
        "Feature",
        "Generics (<T: P>)",
        "Opaque (some P)",
        "Existential (any P)",
        "Overloading"
      ],
      "rows": [
        {
          "cells": [
            "Type Chooser",
            "Caller chooses concrete type",
            "Function implementation chooses",
            "Dynamic at runtime",
            "Caller implicitly via argument types"
          ]
        },
        {
          "cells": [
            "Dispatch Mode",
            "Direct / Static (Specialized)",
            "Direct / Static (Specialized)",
            "Dynamic via Protocol Witness Table",
            "Direct / Static call"
          ]
        },
        {
          "cells": [
            "Allocation",
            "Inline on Stack (Zero boxing)",
            "Inline on Stack (Zero boxing)",
            "Existential box (spills to heap if > 24 bytes)",
            "Inline on Stack"
          ]
        },
        {
          "cells": [
            "Heterogeneous Collections",
            "❌ No (all items must be T)",
            "❌ No (fixed concrete type)",
            "✅ Yes ([any Shape] mixes types)",
            "❌ No (requires common wrapper)"
          ]
        },
        {
          "cells": [
            "Code Duplication",
            "Zero in source; specialized in binary",
            "Zero in source; specialized in binary",
            "Zero in binary (shared witness calls)",
            "Duplicated source and binary"
          ]
        }
      ]
    },
    {
      "type": "heading",
      "id": "h-common-mistakes",
      "level": 2,
      "content": "Common Mistakes"
    },
    {
      "type": "list",
      "id": "l-common-mistakes",
      "ordered": false,
      "items": [
        "**Using Any instead of Generics:** Using `[Any]` or `(item: Any)` throws away all compiler type guarantees and requires brittle forced downcasts (`as!`). Always use `<T>` with protocol constraints.",
        "**Attempting angle brackets on Protocols:** Writing `protocol DataSource<T>` instead of using `associatedtype Item` or Swift 5.7+ Primary Associated Types (`protocol DataSource<Item>`).",
        "**Defaulting to `any Protocol` over `<T: Protocol>`:** Existential containers incur 3-word inline buffer overhead and dynamic witness table dispatch. Use `<T: Protocol>` or `some Protocol` unless heterogeneous storage is mandatory.",
        "**Forgetting `mutating` on generic structs:** Storing generic items in a struct and trying to reassign or modify storage in instance methods without marking them `mutating`.",
        "**Over-constraining where clauses:** Adding unnecessary constraints to the primary type definition (e.g. `struct Stack<Element: Equatable>`) instead of using contextual extensions (`extension Stack where Element: Equatable`), which unnecessarily prevents `Stack` from holding non-equatable types.",
        "**Missing `@inlinable` on public generic framework code:** Cross-module generic calls cannot be specialized unless the library exports the implementation via `@inlinable`, falling back to unspecialized runtime witness tables."
      ]
    },
    {
      "type": "interview",
      "id": "interview",
      "relevance": "high",
      "questions": [
        "What is parametric polymorphism, and how do Swift generics differ from Java type erasure and C++ templates?",
        "What is the difference between a protocol constraint (T: Comparable) and a class bound (T: UIViewController)?",
        "How does compiler monomorphization and specialization optimize Swift generics?",
        "What is Conditional Conformance in Swift, and how does it work with Equatable and Codable?",
        "Why do Swift protocols use associatedtype instead of angle-bracket generic type parameters?",
        "How do Primary Associated Types in Swift 5.7+ simplify generic code and existentials?",
        "How do contextual extensions using where clauses allow specialized member APIs?",
        "What are the performance tradeoffs between generic specialization and binary code size?",
        "When should you use a generic function versus function overloading?",
        "How does Whole Module Optimization (WMO) affect cross-file generic specialization?"
      ]
    },
    {
      "type": "relatedTopics",
      "id": "related",
      "topicIds": [
        "swift-protocols",
        "swift-opaque-types",
        "swift-type-erasure",
        "swift-method-dispatch",
        "arch-di"
      ]
    }
  ]
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
  // ─── Initialization & Deinitialization Rules ───────────────────────────────
    {
  "id": "swift-property-wrappers-keypaths",
  "slug": "property-wrappers-keypaths",
  "title": "Property Wrappers & KeyPaths",
  "category": "swift",
  "group": "Advanced Swift",
  "description": "How @propertyWrapper encapsulates property access logic, and how KeyPaths provide type-safe dynamic member lookup and property references.",
  "difficulty": "advanced",
  "estimatedTime": 30,
  "language": "swift",
  "version": {
    "language": "Swift",
    "version": "6",
    "minimumVersion": "5.1",
    "status": "current",
    "lastReviewed": "2026-09-06"
  },
  "interviewRelevance": "high",
  "tags": [
    "property-wrapper",
    "keypath",
    "dynamic-member-lookup",
    "reflection",
    "swiftui"
  ],
  "furtherReading": [
    {
      "title": "Property Wrappers — The Swift Programming Language",
      "url": "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties/#Property-Wrappers",
      "source": "swift-org"
    },
    {
      "title": "Key-Path Expressions — The Swift Programming Language",
      "url": "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/expressions/#Key-Path-Expression",
      "source": "swift-org"
    },
    {
      "title": "Managing State and Data Flow — SwiftUI Documentation",
      "url": "https://developer.apple.com/documentation/swiftui/managing-model-data-in-your-app",
      "source": "apple-developer"
    }
  ],
  "previousTopic": "swift-generics",
  "nextTopic": "swift-initialization-deinitialization",
  "relatedTopics": [
    "swift-properties",
    "swift-generics",
    "swift-closures",
    "swift-struct-vs-class",
    "swift-protocols"
  ],
  "content": [
    {
      "type": "quickAnswer",
      "id": "qa",
      "content": "Property Wrappers (`@propertyWrapper`) encapsulate repetitive getter/setter logic (like validation, thread safety, or persistence) into reusable structs. The compiler synthesizes private backing storage (`_propertyName`) and exposes the wrapped value, with an optional projected value (`$propertyName`). KeyPaths (`\\Type.property`) provide strongly typed, uninvoked property references across a 5-level type hierarchy, enabling declarative data flow in SwiftUI and compile-time safe dynamic member lookup."
    },
    {
      "type": "heading",
      "id": "h-why",
      "level": 2,
      "content": "Why do Property Wrappers matter?"
    },
    {
      "type": "paragraph",
      "id": "p-why",
      "content": "Before Property Wrappers (Swift 5.1), implementing common property behavior like clamping a value, persisting to `UserDefaults`, or observing changes required verbose computed properties or explicit getter/setter boilerplate for every single property. Property Wrappers allow you to define this logic once in a dedicated type and apply it declaratively via an `@Attribute`. The compiler automatically manages the underlying storage, drastically reducing boilerplate and keeping models clean."
    },
    {
      "type": "heading",
      "id": "h-wrapper-mechanics",
      "level": 2,
      "content": "Anatomy of a @propertyWrapper & Backing Storage"
    },
    {
      "type": "paragraph",
      "id": "p-mechanics",
      "content": "A Property Wrapper is a struct, class, or enum annotated with `@propertyWrapper` that defines a required `wrappedValue` property. When you declare `@Clamped(0...100) var health: Int = 100`, the Swift compiler desugars the property into three parts: (1) private backing storage named `_health` of type `Clamped<Int>`, (2) a computed property `health` whose getter and setter route through `_health.wrappedValue`, and (3) an optional projection `$health`. Within the declaring type's internal methods, you can inspect the backing storage directly via `_health` using a leading underscore."
    },
    {
      "type": "code",
      "id": "code-wrapper",
      "language": "swift",
      "caption": "Clamped property wrapper with compiler-synthesized backing storage",
      "content": "@propertyWrapper\nstruct Clamped<Value: Comparable> {\n    private var value: Value\n    let range: ClosedRange<Value>\n    \n    init(wrappedValue: Value, _ range: ClosedRange<Value>) {\n        self.range = range\n        self.value = min(max(wrappedValue, range.lowerBound), range.upperBound)\n    }\n    \n    var wrappedValue: Value {\n        get { value }\n        set { value = min(max(newValue, range.lowerBound), range.upperBound) }\n    }\n}\n\nstruct Player {\n    // Compiler synthesizes: private var _health: Clamped<Int> = Clamped(wrappedValue: 100, 0...100)\n    @Clamped(0...100) var health: Int = 100\n    @Clamped(0...50) var shield: Int = 50\n    \n    func inspectBackingStorage() {\n        // Direct access to backing wrapper via leading underscore within enclosing type:\n        print(\"Backing range: \\(_health.range)\")\n    }\n}\n\nvar player = Player()\nprint(player.health) // prints: 100\n\nplayer.health = 160 // Clamped to upper bound\nprint(player.health) // prints: 100\n\nplayer.health = -30 // Clamped to lower bound\nprint(player.health) // prints: 0\n\nplayer.inspectBackingStorage() // prints: Backing range: 0...100"
    },
    {
      "type": "heading",
      "id": "h-projected",
      "level": 2,
      "content": "The Projected Value ($) & SwiftUI State Pattern"
    },
    {
      "type": "paragraph",
      "id": "p-projected",
      "content": "Wrappers can optionally provide a `projectedValue`, accessed by prefixing the property name with `$`. This allows the wrapper to expose supplementary capabilities, metadata, or an alternate API. In SwiftUI, `@State` and `@Published` use `projectedValue` to expose a two-way `Binding` or a Combine publisher, allowing child components to mutate or subscribe to state without owning the source of truth."
    },
    {
      "type": "code",
      "id": "code-projected",
      "language": "swift",
      "caption": "Projected values for validation state and SwiftUI Binding pattern",
      "content": "@propertyWrapper\nstruct ValidatedUsername {\n    private var value: String = \"\"\n    var projectedValue: Bool = false // Exposes validation state via $\n    \n    init(wrappedValue: String) {\n        self.wrappedValue = wrappedValue\n    }\n    \n    var wrappedValue: String {\n        get { value }\n        set {\n            value = newValue\n            projectedValue = newValue.count >= 4\n        }\n    }\n}\n\nstruct RegistrationForm {\n    @ValidatedUsername var username: String = \"guest\"\n}\n\nvar form = RegistrationForm()\nprint(form.username)  // prints: guest\nprint(form.$username) // prints: true (projected value)\n\nform.username = \"sam\"\nprint(form.username)  // prints: sam\nprint(form.$username) // prints: false (failed validation: < 4 chars)\n\n// SwiftUI uses this exact mechanism for two-way state binding:\n// struct CounterView: View {\n//     @State private var volume: Double = 50.0\n//     var body: some View {\n//         // $volume accesses projectedValue: Binding<Double>\n//         Slider(value: $volume, in: 0...100)\n//     }\n// }"
    },
    {
      "type": "heading",
      "id": "h-keypaths",
      "level": 2,
      "content": "KeyPaths: First-Class Property References"
    },
    {
      "type": "paragraph",
      "id": "p-keypaths",
      "content": "A KeyPath (`\\Type.property`) is a statically typed reference to a specific property of a type, decoupled from any specific instance. While a closure captures executable code, a KeyPath is pure data representing a route to a property. Swift 5.2 extended KeyPaths so they can be passed anywhere a function of type `(Root) -> Value` is expected (such as `users.map(\\.name)`)."
    },
    {
      "type": "comparison",
      "id": "comp-keypaths",
      "leftLabel": "Direct Access",
      "rightLabel": "KeyPath Access",
      "rows": [
        {
          "label": "Concept",
          "left": "Value evaluated immediately",
          "right": "Reference to the property evaluated later"
        },
        {
          "label": "Syntax",
          "left": "let name = user.name",
          "right": "let path = \\User.name"
        },
        {
          "label": "Execution",
          "left": "Direct memory read",
          "right": "user[keyPath: path]"
        }
      ]
    },
    {
      "type": "heading",
      "id": "h-keypath-hierarchy",
      "level": 2,
      "content": "The Swift KeyPath Type Hierarchy"
    },
    {
      "type": "paragraph",
      "id": "p-keypath-hierarchy",
      "content": "Swift organizes KeyPaths into a 5-level class hierarchy based on type safety and mutability capabilities:\n1. **AnyKeyPath**: Fully type-erased base class. Neither Root nor Value is statically known at compile time.\n2. **PartialKeyPath<Root>**: Root type is statically known, but Value is type-erased (returns `Any`).\n3. **KeyPath<Root, Value>**: Statically typed read-only access to a property of type `Value` on type `Root`.\n4. **WritableKeyPath<Root, Value>**: Read-write access with value semantics. Mutating the property requires the root instance to be a mutable variable (`var`).\n5. **ReferenceWritableKeyPath<Root, Value>**: Read-write access with reference semantics (classes or actors). Modifies heap storage without mutating the root reference, allowing property modification on a constant `let` class instance."
    },
    {
      "type": "code",
      "id": "code-keypath-hierarchy",
      "language": "swift",
      "caption": "The 5-level KeyPath type hierarchy in practice",
      "content": "struct Person {\n    var name: String\n    let birthYear: Int\n}\n\nfinal class BankAccount {\n    var balance: Double\n    init(balance: Double) { self.balance = balance }\n}\n\n// 1. KeyPath (Read-only reference)\nlet birthYearPath: KeyPath<Person, Int> = \\Person.birthYear\nlet person = Person(name: \"Taylor\", birthYear: 1989)\nprint(person[keyPath: birthYearPath]) // prints: 1989\n\n// 2. WritableKeyPath (Read-write for value semantics)\nlet namePath: WritableKeyPath<Person, String> = \\Person.name\nvar mutablePerson = person\nmutablePerson[keyPath: namePath] = \"Alison\"\nprint(mutablePerson.name) // prints: Alison\n\n// 3. ReferenceWritableKeyPath (Mutating reference types via constant reference)\nlet balancePath: ReferenceWritableKeyPath<BankAccount, Double> = \\BankAccount.balance\nlet account = BankAccount(balance: 1000.0)\naccount[keyPath: balancePath] = 1250.0 // Allowed on constant \\'let\\' account!\nprint(account.balance) // prints: 1250.0\n\n// 4. PartialKeyPath (Root known, Value erased)\nlet partialPath: PartialKeyPath<Person> = \\Person.name\nprint(person[keyPath: partialPath]!) // prints: Taylor\n\n// 5. Functional KeyPath Expressions (Swift 5.2+)\nlet people = [Person(name: \"Alex\", birthYear: 1995), Person(name: \"Sam\", birthYear: 2000)]\nlet names = people.map(\\.name)\nprint(names) // prints: [\"Alex\", \"Sam\"]"
    },
    {
      "type": "heading",
      "id": "h-dynamic-member",
      "level": 2,
      "content": "@dynamicMemberLookup and KeyPath Bridging"
    },
    {
      "type": "paragraph",
      "id": "p-dynamic-member",
      "content": "The `@dynamicMemberLookup` attribute allows a type to intercept dot-syntax property access at runtime. When paired with `KeyPath` subscripts, dynamic member lookup achieves full compile-time type safety: typos produce immediate compiler errors because the compiler validates that the requested property exists on the proxied target type. This pattern powers SwiftUI's `Binding` projections and data encapsulation layers."
    },
    {
      "type": "code",
      "id": "code-dynamic",
      "language": "swift",
      "caption": "Compile-time safe proxy forwarding with @dynamicMemberLookup and KeyPaths",
      "content": "struct AppSettings {\n    var theme: String = \"Dark\"\n    var volume: Int = 80\n    var isHapticEnabled: Bool = true\n}\n\n@dynamicMemberLookup\nstruct SettingsProxy {\n    private var settings = AppSettings()\n    \n    // Intercepts dot notation (proxy.theme) and routes it safely via typed KeyPaths\n    subscript<T>(dynamicMember keyPath: WritableKeyPath<AppSettings, T>) -> T {\n        get { settings[keyPath: keyPath] }\n        set { settings[keyPath: keyPath] = newValue }\n    }\n}\n\nvar proxy = SettingsProxy()\nproxy.volume = 95 // Resolved at compile-time via KeyPath!\nproxy.theme = \"Solarized Dark\"\n\nprint(proxy.volume) // prints: 95\nprint(proxy.theme)  // prints: Solarized Dark\n// proxy.unknownField // Compile error: Value of type \\'AppSettings\\' has no member \\'unknownField\\'"
    },
    {
      "type": "heading",
      "id": "h-mistakes",
      "level": 2,
      "content": "Common Property Wrapper & KeyPath Mistakes"
    },
    {
      "type": "list",
      "id": "list-propwrap-mistakes",
      "ordered": false,
      "items": [
        "**Attempting wrappers on local variables in older Swift versions:** Property wrappers were introduced in Swift 5.1 for type-level declarations, but local variable wrapper support arrived in Swift 5.5. Using `@Wrapper var x = 1` inside a function body on older compiler toolchains causes a compile error. Ensure deployment targets and compiler toolchains use Swift 5.5+ for local wrappers.",
        "**Mutating wrappedValue on value types and expecting shared persistence:** If a property wrapper struct is applied inside a `struct`, the wrapper has value semantics. Copying the outer struct duplicates the wrapper's backing storage. Mutations made on one copy will not reflect on other copies. If shared mutable state across copies is required, the wrapper must hold reference-type backing storage (such as a class) or use SwiftUI's `@State` mechanism.",
        "**Directly accessing backing _propertyName from client code:** The compiler synthesizes private backing storage prefixed with an underscore (`_propertyName`), but this is an internal implementation detail. Directly accessing `_propertyName` outside the declaring type breaks encapsulation. Always interface through public `wrappedValue` or the projected `$` value.",
        "**Forgetting that projected values require explicit projectedValue declaration:** Applying a property wrapper does not automatically provide the `$` projection syntax. The compiler will reject `$property` calls with a compilation error unless the wrapper struct explicitly implements a `var projectedValue: ProjectedType` property.",
        "**Performance overhead of allocations in reference-type wrappers:** Wrapping properties in classes or reference wrappers inside tight loops causes continuous ARC retain/release traffic and potential heap allocation overhead. For high-throughput mathematical or rendering pipelines, benchmark value-type wrappers vs inline variables to ensure reference indirection does not degrade cache performance.",
        "**Re-entrancy bugs from modifying wrappedValue inside property observers:** Triggering `wrappedValue` mutations inside the wrapper's internal `didSet` observer or an outer property observer can inadvertently trigger infinite recursion or re-entrant setter cascades. Keep wrapper mutation handlers free of nested wrapper mutations and use atomic updates or distinct state-transition events."
      ]
    },
    {
      "type": "interview",
      "id": "interview",
      "relevance": "high",
      "questions": [
        "What is a Property Wrapper in Swift, and why was it introduced in Swift 5.1?",
        "What is the difference between wrappedValue and projectedValue in a Swift Property Wrapper?",
        "How does the Swift compiler synthesize backing storage and property accessors under the hood?",
        "How do SwiftUI's @State and @Binding use property wrappers and dynamic member lookup under the hood?",
        "Explain the Swift KeyPath type hierarchy from AnyKeyPath down to ReferenceWritableKeyPath.",
        "Analyze this code: What happens when a property wrapper setter causes re-entrancy via property observers?",
        "What happens when a mutating Property Wrapper is applied to a Struct vs a Class?",
        "How do you implement a thread-safe property wrapper or memoization wrapper using @dynamicMemberLookup and KeyPaths?"
      ]
    },
    {
      "type": "relatedTopics",
      "id": "related",
      "topicIds": [
        "swift-properties",
        "swift-generics",
        "swift-closures",
        "swift-struct-vs-class",
        "swift-protocols"
      ]
    }
  ]
},
{
  "id": "swift-initialization-deinitialization",
  "slug": "initialization-and-deinitialization",
  "title": "Initialization & Deinitialization Rules",
  "category": "swift",
  "group": "Advanced Swift",
  "description": "How Swift guarantees all properties are initialized before use, designated vs convenience initializers, failable initializers, deinitializers, and two-phase initialization.",
  "difficulty": "intermediate",
  "estimatedTime": 28,
  "language": "swift",
  "version": {
    "language": "Swift",
    "version": "6",
    "minimumVersion": "1.0",
    "status": "current",
    "lastReviewed": "2026-09-06"
  },
  "interviewRelevance": "high",
  "tags": [
    "initialization",
    "deinit",
    "designated-init",
    "convenience-init",
    "failable-init",
    "two-phase-init"
  ],
  "relatedTopics": [
    "swift-struct-vs-class",
    "swift-optionals",
    "swift-access-control",
    "swift-generics"
  ],
  "previousTopic": "swift-property-wrappers-keypaths",
  "nextTopic": "swift-opaque-types",
  "furtherReading": [
    {
      "title": "Initialization — The Swift Programming Language",
      "url": "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/initialization",
      "source": "swift-org"
    },
    {
      "title": "Deinitialization — The Swift Programming Language",
      "url": "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/deinitialization",
      "source": "swift-org"
    }
  ],
  "content": [
    {
      "type": "quickAnswer",
      "id": "qa",
      "content": "Swift guarantees all properties are initialized before use via two-phase initialization. Designated initializers do the work; convenience initializers delegate to them. Failable initializers return optionals. Deinitializers run exactly once at deallocation, guaranteeing cleanup."
    },
    {
      "type": "heading",
      "id": "h-why",
      "level": 2,
      "content": "Why Initialization Safety Matters: Definite Assignment Analysis"
    },
    {
      "type": "paragraph",
      "id": "p-why",
      "content": "In legacy systems (C / Objective-C), allocating memory without initializing it leaves \"garbage\" bits in place, causing mysterious memory corruption, nondeterministic crashes, and security vulnerabilities. Swift eliminates this entire class of bugs through **definite initialization analysis**.\n\nThe compiler guarantees that every stored property of a struct, class, or enum holds a valid, typed value before any code can read from it or invoke methods on `self`."
    },
    {
      "type": "heading",
      "id": "h-two-phase",
      "level": 2,
      "content": "Two-Phase Initialization Mechanics"
    },
    {
      "type": "paragraph",
      "id": "p-two-phase-intro",
      "content": "To prevent subclasses from reading uninitialized superclass state (and vice-versa), class initialization proceeds in two strictly enforced phases:"
    },
    {
      "type": "list",
      "id": "list-two-phase",
      "ordered": false,
      "items": [
        "**Phase 1 (Bottom-Up):** The subclass designated initializer assigns values to all stored properties introduced in that subclass. Once its own stored properties are initialized, it calls `super.init(...)`. This chain continues upward until the root class is reached. When the root class completes property initialization, memory is fully allocated.",
        "**Phase 2 (Top-Down):** Working back down the chain from root to subclass, initializers can now safely customize stored properties, access `self`, and call instance methods."
      ]
    },
    {
      "type": "code",
      "id": "code-two-phase",
      "language": "swift",
      "caption": "Two-phase initialization in subclass and superclass hierarchies",
      "content": "class Vehicle {\n    var brand: String\n    \n    init(brand: String) {\n        self.brand = brand\n        // Root class completes Phase 1\n    }\n}\n\nclass Car: Vehicle {\n    var numberOfDoors: Int\n    \n    init(brand: String, numberOfDoors: Int) {\n        // 1. Phase 1: Initialize subclass stored properties FIRST\n        self.numberOfDoors = numberOfDoors\n        \n        // 2. Phase 1: Delegate UP to superclass designated initializer\n        super.init(brand: brand)\n        \n        // 3. Phase 2: Now self is fully initialized! Safe to call instance methods\n        self.configureAlarmSystem()\n    }\n    \n    func configureAlarmSystem() {\n        print(\"Alarm enabled for \\(brand) with \\(numberOfDoors) doors.\")\n    }\n}\n\nlet car = Car(brand: \"Tesla\", numberOfDoors: 4)\nprint(\"\\(car.brand) has \\(car.numberOfDoors) doors\")\n// prints: Alarm enabled for Tesla with 4 doors.\n// prints: Tesla has 4 doors"
    },
    {
      "type": "callout",
      "id": "callout-phase1-rule",
      "variant": "warning",
      "title": "Phase 1 Compiler Trap",
      "content": "Attempting to access `self.brand` or call `self.configureAlarmSystem()` before `super.init()` completes Phase 1 will trigger a compile-time error: *\"'self' used in method call before 'super.init' call\"*."
    },
    {
      "type": "heading",
      "id": "h-designated-convenience",
      "level": 2,
      "content": "Designated vs Convenience Initializers"
    },
    {
      "type": "paragraph",
      "id": "p-delegation-rules",
      "content": "Swift classes define two kinds of initializers governed by three strict delegation rules:"
    },
    {
      "type": "list",
      "id": "list-rules",
      "ordered": false,
      "items": [
        "**Rule 1 (Designated):** A designated initializer must call a designated initializer from its immediate superclass (`super.init`). It delegates *up*.",
        "**Rule 2 (Convenience):** A convenience initializer must call another initializer from the *same* class (`self.init`). It delegates *across*.",
        "**Rule 3 (Convenience):** A convenience initializer must ultimately call a designated initializer."
      ]
    },
    {
      "type": "code",
      "id": "code-convenience",
      "language": "swift",
      "caption": "Designated and convenience initializer delegation chains",
      "content": "class Rectangle {\n    var width: Double\n    var height: Double\n    \n    var area: Double { width * height }\n    \n    // Designated Initializer: Fully initializes all stored properties\n    init(width: Double, height: Double) {\n        self.width = width\n        self.height = height\n    }\n    \n    // Convenience Initializer: Delegates across (self.init) providing defaults\n    convenience init(sideLength: Double) {\n        self.init(width: sideLength, height: sideLength)\n    }\n}\n\nlet rect = Rectangle(width: 10, height: 20)\nprint(rect.area)\n// prints: 200.0\n\nlet square = Rectangle(sideLength: 5)\nprint(square.area)\n// prints: 25.0"
    },
    {
      "type": "table",
      "id": "table-init-comparison",
      "caption": "Initializer Types Comparison in Swift",
      "headers": [
        "Initializer Kind",
        "Keyword",
        "Delegation Direction",
        "Supported In",
        "Primary Purpose"
      ],
      "rows": [
        {
          "cells": [
            "Designated",
            "init(...)",
            "Delegates UP to superclass designated init",
            "Classes, Structs",
            "Primary funnel ensuring complete property initialization"
          ]
        },
        {
          "cells": [
            "Convenience",
            "convenience init(...)",
            "Delegates ACROSS to same class (self.init)",
            "Classes only",
            "Secondary convenience helper providing defaults"
          ]
        },
        {
          "cells": [
            "Failable",
            "init?(...)",
            "Delegates up or across; returns nil on error",
            "Classes, Structs, Enums",
            "Safely rejects invalid construction parameters"
          ]
        },
        {
          "cells": [
            "Memberwise",
            "Synthesized",
            "None (direct field assignment)",
            "Structs only",
            "Auto-generated initializer for all stored struct properties"
          ]
        },
        {
          "cells": [
            "Required",
            "required init(...)",
            "Must be implemented by every subclass",
            "Classes conforming to protocols",
            "Ensures polymorphic dynamic instantiation"
          ]
        }
      ]
    },
    {
      "type": "callout",
      "id": "c-preserve-memberwise",
      "variant": "tip",
      "title": "Preserving Struct Memberwise Initializers",
      "content": "If you define a custom `init` inside a struct's main definition, the compiler suppresses the automatic memberwise initializer. To retain the synthesized memberwise initializer while adding custom initializers, declare your custom initializers in an `extension` of the struct!"
    },
    {
      "type": "heading",
      "id": "h-failable",
      "level": 2,
      "content": "Failable Initializers (`init?`)"
    },
    {
      "type": "paragraph",
      "id": "p-failable",
      "content": "When instance creation can fail due to invalid inputs, missing resources, or unparseable data, define a failable initializer using `init?`. It creates an optional instance (`T?`). Trigger failure by executing `return nil`:"
    },
    {
      "type": "code",
      "id": "code-failable",
      "language": "swift",
      "caption": "Failable initializer returning nil upon boundary violation",
      "content": "struct NetworkPort {\n    let rawValue: Int\n    \n    init?(rawValue: Int) {\n        guard (1...65535).contains(rawValue) else {\n            return nil // Initialization aborted; returns nil\n        }\n        self.rawValue = rawValue\n    }\n}\n\nif let validPort = NetworkPort(rawValue: 8080) {\n    print(\"Valid port configured: \\(validPort.rawValue)\")\n}\n// prints: Valid port configured: 8080\n\nlet invalidPort = NetworkPort(rawValue: 99999)\nprint(invalidPort == nil)\n// prints: true"
    },
    {
      "type": "heading",
      "id": "h-deinit",
      "level": 2,
      "content": "Deinitializers (`deinit`) & Cleanup Guarantees"
    },
    {
      "type": "paragraph",
      "id": "p-deinit",
      "content": "A deinitializer (`deinit`) is called automatically by ARC immediately before a class instance is deallocated. It accepts no parameters and is written without parentheses.\n\nGuarantees:\n- Runs exactly once when retain count drops to zero.\n- All stored properties remain fully valid and accessible inside `deinit` for cleanup (e.g. invalidating timers, closing file handles, or posting notifications).\n- Superclass deinitializers are called automatically by the runtime at the end of subclass deinitialization. You never call `super.deinit()` manually."
    },
    {
      "type": "code",
      "id": "code-deinit",
      "language": "swift",
      "caption": "Guaranteed resource release inside class deinitializer",
      "content": "class FileLogger {\n    private var fileDescriptor: Int32?\n    let path: String\n    \n    init(path: String) {\n        self.path = path\n        self.fileDescriptor = 3 // Simulated file descriptor\n        print(\"Opened file at \\(path)\")\n    }\n    \n    deinit {\n        // Guaranteed cleanup when reference count reaches 0\n        if let fd = fileDescriptor {\n            print(\"Closing file descriptor \\(fd) for \\(path)\")\n            fileDescriptor = nil\n        }\n    }\n}\n\n// Scoping demonstration showing exact deinit execution\nprint(\"--- Entering scope ---\")\ndo {\n    let logger = FileLogger(path: \"/var/log/app.log\")\n    print(\"Logging to \\(logger.path)...\")\n    // Exiting do-block causes logger ARC retain count to hit zero\n}\nprint(\"--- Exited scope ---\")\n\n// prints: --- Entering scope ---\n// prints: Opened file at /var/log/app.log\n// prints: Logging to /var/log/app.log...\n// prints: Closing file descriptor 3 for /var/log/app.log\n// prints: --- Exited scope ---"
    },
    {
      "type": "heading",
      "id": "h-mistakes",
      "level": 2,
      "content": "Common Initialization Mistakes"
    },
    {
      "type": "list",
      "id": "list-mistakes",
      "ordered": false,
      "items": [
        "**Accessing self in Phase 1:** Attempting to pass `self` as a delegate or calling instance methods before `super.init()` completes Phase 1.",
        "**Convenience calling super:** Trying to call `super.init()` inside a convenience initializer (convenience initializers must delegate across with `self.init`).",
        "**Retaining self in deinit:** Storing strong references to `self` or escaping closures inside `deinit`, which causes dangerous object resurrection or runtime crashes.",
        "**Expecting deinit on Structs:** Forgetting that structs and enums are value types managed without ARC retain counting and do not support `deinit`.",
        "**Losing the Memberwise Initializer:** Defining custom initializers inside the primary struct body instead of in an extension, unintentionally suppressing the synthesized memberwise initializer.",
        "**Omitting required on Subclass Initializers:** Forgetting that when a class conforms to a protocol with an `init` requirement, all non-final classes must mark that initializer `required init` so subclasses also fulfill the protocol."
      ]
    },
    {
      "type": "interview",
      "id": "interview",
      "relevance": "high",
      "questions": [
        "How does Swift guarantee all stored properties are initialized before use?",
        "What is Two-Phase Initialization in Swift, and why does the compiler enforce it?",
        "What are the exact rules for designated vs convenience initializers?",
        "How does failure propagation work in failable initializers (init?)?",
        "Under what conditions does a subclass automatically inherit its superclass initializers?",
        "Why do protocol initializer requirements require the `required` keyword on classes?",
        "What are the guarantees and constraints of `deinit` in Swift?",
        "How do memberwise initializers work in structs, and when are they suppressed?"
      ]
    },
    {
      "type": "relatedTopics",
      "id": "related",
      "topicIds": [
        "swift-struct-vs-class",
        "swift-optionals",
        "swift-access-control",
        "swift-generics"
      ]
    }
  ]
},
  {
  "id": "swift-opaque-types",
  "slug": "opaque-types-vs-existential",
  "title": "Opaque Types & Existential Containers: some vs any",
  "category": "swift",
  "group": "Advanced Swift",
  "description": "The difference between 'some' (opaque types, concrete but hidden) and 'any' (existential, unknown at compile time) — when each is appropriate, performance implications, and type erasure.",
  "difficulty": "intermediate",
  "estimatedTime": 25,
  "language": "swift",
  "version": {
    "language": "Swift",
    "version": "6",
    "minimumVersion": "5.1",
    "status": "current",
    "lastReviewed": "2026-09-06"
  },
  "interviewRelevance": "high",
  "tags": [
    "opaque-types",
    "existential",
    "some",
    "any",
    "type-erasure",
    "protocol"
  ],
  "relatedTopics": [
    "swift-protocols",
    "swift-generics",
    "swift-method-dispatch"
  ],
  "previousTopic": "swift-initialization-deinitialization",
  "nextTopic": "swift-type-erasure",
  "furtherReading": [
    {
      "title": "Opaque Types — The Swift Programming Language",
      "url": "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/opaquetypes",
      "source": "swift-org"
    },
    {
      "title": "Embrace Swift generics — WWDC22",
      "url": "https://developer.apple.com/videos/play/wwdc2022/110352/",
      "source": "apple-developer"
    }
  ],
  "content": [
    {
      "type": "quickAnswer",
      "id": "qa",
      "content": "`some` represents an **opaque type** where the concrete type is fixed and known to the compiler, enabling direct dispatch and zero boxing overhead. In contrast, `any` creates a dynamic **existential container** for unknown types at compile time, requiring Protocol Witness Table indirection and potential heap allocation, making it strictly for heterogeneous collections."
    },
    {
      "type": "heading",
      "id": "h-why",
      "level": 2,
      "content": "Why does the distinction matter?"
    },
    {
      "type": "paragraph",
      "id": "p-why",
      "content": "Before Swift 5.6, writing `func draw(shape: Shape)` silently created an existential container with dynamic dispatch overhead. In Swift 5.6+, the compiler introduced the explicit `any` keyword (SE-0335) to make the performance cost of dynamic protocol types transparent. Understanding when to use `some` vs `any` directly dictates whether your code uses blazing-fast direct dispatch or indirect heap allocations."
    },
    {
      "type": "callout",
      "id": "c-reverse-generics",
      "variant": "tip",
      "title": "The \"Reverse Generics\" Mental Model",
      "content": "In standard generics (`func process<T: Shape>(shape: T)`), the CALLER decides the concrete type. In opaque return types (`func makeShape() -> some Shape`), the FUNCTION IMPLEMENTATION decides the concrete type, while the caller only knows the protocol contract. Both preserve concrete type identity and avoid existential overhead."
    },
    {
      "type": "heading",
      "id": "h-some",
      "level": 2,
      "content": "Opaque Types with 'some' (Compile-Time Concrete)"
    },
    {
      "type": "paragraph",
      "id": "p-some",
      "content": "When a function returns `some Protocol`, it returns **one specific concrete type**. The caller only knows the protocol contract, but the compiler retains full knowledge of the concrete type under the hood. This preserves type identity and allows the compiler to specialize and inline code via monomorphization."
    },
    {
      "type": "code",
      "id": "code-some",
      "language": "swift",
      "caption": "Opaque return types preserving concrete type identity",
      "content": "protocol Shape {\n    func draw() -> String\n}\n\nstruct Circle: Shape {\n    func draw() -> String { \"○\" }\n}\n\nstruct Square: Shape {\n    func draw() -> String { \"□\" }\n}\n\n// Opaque Return: The compiler knows this returns Circle, but callers only see Shape\nfunc makeDefaultShape() -> some Shape {\n    return Circle() \n}\n\nlet shape1 = makeDefaultShape()\nprint(shape1.draw())\n// prints: ○\n\nlet shape2 = makeDefaultShape()\n// Compiler knows shape1 and shape2 have identical underlying concrete types!"
    },
    {
      "type": "heading",
      "id": "h-any",
      "level": 2,
      "content": "Existential Types with 'any' (Runtime Polymorphic Box)"
    },
    {
      "type": "paragraph",
      "id": "p-any",
      "content": "When you use `any Protocol`, you are creating an **existential container**—a dynamic box that can hold ANY conforming type, changing dynamically at runtime. This box is necessary when you need a heterogeneous collection of different types."
    },
    {
      "type": "code",
      "id": "code-any",
      "language": "swift",
      "caption": "Heterogeneous collections requiring existential any boxes",
      "content": "// Heterogeneous Collection: CANNOT use 'some Shape' here!\n// Elements are different concrete types (Circle and Square)\nvar shapes: [any Shape] = [Circle(), Square(), Circle()]\n\nfor shape in shapes {\n    // Dynamic dispatch through Protocol Witness Table\n    print(shape.draw())\n}\n// prints: ○\n// prints: □\n// prints: ○"
    },
    {
      "type": "code",
      "id": "code-comparison",
      "language": "swift",
      "caption": "Side-by-side comparison: some View vs [any View]",
      "content": "import SwiftUI\n\n// 1. some View (Opaque Type)\n// Returns exactly ONE specific concrete view type\nvar body: some View {\n    VStack {\n        Text(\"Hello\")\n        Button(\"Click\") { }\n    }\n} // ✅ Fast, direct dispatch, zero boxing\n\n// 2. [any View] (Existential Type)\n// Collection holding DIFFERENT concrete view types\nlet mixedViews: [any View] = [\n    Text(\"Title\"),\n    Image(systemName: \"star\")\n] // ✅ Required for heterogeneous collections, incurs boxing overhead"
    },
    {
      "type": "table",
      "id": "table-some-vs-any",
      "caption": "Technical Comparison: some Protocol vs any Protocol",
      "headers": [
        "Feature",
        "some Protocol (Opaque Type)",
        "any Protocol (Existential Box)"
      ],
      "rows": [
        {
          "cells": [
            "Underlying Type",
            "One specific concrete type known at compile time",
            "Can hold any conforming type dynamically at runtime"
          ]
        },
        {
          "cells": [
            "Dispatch Strategy",
            "Static / Direct dispatch (inlinable, zero overhead)",
            "Dynamic dispatch via Protocol Witness Table (PWT)"
          ]
        },
        {
          "cells": [
            "Memory Cost",
            "Stack allocated, zero boxing overhead",
            "Existential container (3-word buffer + heap allocation if > 24 bytes)"
          ]
        },
        {
          "cells": [
            "Heterogeneous Arrays",
            "❌ No (all elements must be identical concrete type)",
            "✅ Yes ([any Shape] mixes Circle, Square, Triangle)"
          ]
        },
        {
          "cells": [
            "Primary Use Case",
            "Function return types (SwiftUI body), parameters",
            "Mixed collections, dynamic plugin systems"
          ]
        }
      ]
    },
    {
      "type": "heading",
      "id": "h-swiftui",
      "level": 2,
      "content": "SwiftUI Case Study: Why 'some View' is Essential"
    },
    {
      "type": "paragraph",
      "id": "p-swiftui",
      "content": "SwiftUI view bodies are evaluated constantly on every animation frame. If `var body` returned `any View`, SwiftUI would allocate existential containers and heap buffers thousands of times per second. By returning `some View`, the concrete type (e.g. `VStack<TupleView<(Text, Button)>>`) is known at compile time, enabling zero-allocation rendering and fine-grained view diffing."
    },
    {
      "type": "heading",
      "id": "h-opened-existentials",
      "level": 2,
      "content": "Opened Existentials in Swift 5.7+"
    },
    {
      "type": "paragraph",
      "id": "p-opened",
      "content": "In modern Swift, you can pass an `any Protocol` box into a function expecting `some Protocol` or a generic `T: Protocol`. The compiler automatically \"opens\" the existential box and passes the underlying concrete value directly to the generic function with zero manual unwrapping boilerplate."
    },
    {
      "type": "heading",
      "id": "h-common-mistakes",
      "level": 2,
      "content": "Common Mistakes"
    },
    {
      "type": "list",
      "id": "l-common-mistakes",
      "ordered": false,
      "items": [
        "**Returning different concrete types from a `some` function:** An `if/else` returning `Circle()` in the `if` branch and `Square()` in the `else` branch triggers a compile error because `some` requires a single, consistent concrete type.",
        "**Using `any` by default everywhere:** Writing `func render(view: any View)` incurs unnecessary existential boxing and disables compiler optimizations. Use `func render(view: some View)` by default.",
        "**Assuming `some` creates runtime polymorphism:** Expecting `[some Shape]` to hold mixed shapes; `some` only works for homogeneous elements where all values share the exact same concrete type.",
        "**Overlooking heap allocation in existential containers:** Structs larger than 3 words (24 bytes on 64-bit) stored in `any Protocol` spill to heap memory, creating hidden ARC allocation pressure in performance loops.",
        "**Confusing `any` with Java interfaces:** In Java, all object types are references on the heap. In Swift, `any` wraps value types into existential containers with distinct value-copying semantics.",
        "**Forgetting Primary Associated Types when using `any`:** In Swift 5.7+, you should write `any Collection<String>` rather than the old unconstrained `any Collection`, which loses item type information."
      ]
    },
    {
      "type": "interview",
      "id": "interview",
      "relevance": "high",
      "questions": [
        "What is an opaque return type (some Protocol), and what problem does it solve?",
        "Compare some Protocol and any Protocol in terms of type identity and dispatch.",
        "Explain the internal memory layout of an existential container in Swift.",
        "Why does SwiftUI mandate var body: some View instead of any View?",
        "When is using an existential container (any) strictly necessary over some?",
        "What are Primary Associated Types in Swift 5.7+, and how do they improve existentials?",
        "How does the compiler optimize some Protocol using monomorphization?",
        "Why does returning different concrete types from an if/else in a some function fail to compile?"
      ]
    },
    {
      "type": "relatedTopics",
      "id": "related",
      "topicIds": [
        "swift-protocols",
        "swift-generics",
        "swift-method-dispatch"
      ]
    }
  ]
},
  {
  "id": "swift-type-erasure",
  "slug": "type-erasure-patterns",
  "title": "Type Erasure Patterns in Swift",
  "category": "swift",
  "group": "Advanced Swift",
  "description": "Patterns for hiding concrete types behind protocols when 'any' isn't enough or doesn't exist — wrappers, boxes, and the tradeoffs vs using 'any' directly.",
  "difficulty": "intermediate",
  "estimatedTime": 22,
  "language": "swift",
  "version": {
    "language": "Swift",
    "version": "6",
    "minimumVersion": "5.0",
    "status": "current",
    "lastReviewed": "2026-09-06"
  },
  "interviewRelevance": "high",
  "tags": [
    "type-erasure",
    "wrapper",
    "box",
    "protocol",
    "any",
    "generics"
  ],
  "relatedTopics": [
    "swift-opaque-types",
    "swift-protocols",
    "swift-generics"
  ],
  "previousTopic": "swift-opaque-types",
  "nextTopic": "swift-result-builders",
  "furtherReading": [
    {
      "title": "Protocols — The Swift Programming Language",
      "url": "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols",
      "source": "swift-org"
    },
    {
      "title": "Combine: AnyPublisher Documentation",
      "url": "https://developer.apple.com/documentation/combine/anypublisher",
      "source": "apple-developer"
    },
    {
      "title": "Combine: AnyCancellable Documentation",
      "url": "https://developer.apple.com/documentation/combine/anycancellable",
      "source": "apple-developer"
    }
  ],
  "content": [
    {
      "type": "quickAnswer",
      "id": "qa",
      "content": "Type erasure hides a concrete type behind a generic wrapper struct conforming to the same protocol (such as `AnySequence`, `AnyPublisher`, or `AnyCancellable`). It historically solved the fundamental limitation preventing protocols with `associatedtype` or `Self` requirements from being used as types. While Swift 5.7's `any Protocol<T>` handles many cases today, custom type erasure wrappers remain vital for complex reactive pipelines, value-semantic wrappers around reference types, and SwiftUI internals (`AnyView`)."
    },
    {
      "type": "heading",
      "id": "h-why",
      "level": 2,
      "content": "Why did Type Erasure become a cornerstone pattern?"
    },
    {
      "type": "paragraph",
      "id": "p-why",
      "content": "Prior to Swift 5.7, protocols with `associatedtype` could only be used as generic type constraints (`<T: Sequence>`), never as standalone type annotations (`let s: Sequence` was a compile error: *\"Protocol can only be used as a generic constraint because it has Self or associated type requirements\"*).\n\nTo store different sequences in a collection or return a publisher without exposing a 100-character nested generic type, engineers developed the **Type Erasure Pattern**—encapsulating the concrete type inside an `Any*` wrapper struct."
    },
    {
      "type": "heading",
      "id": "h-building-wrapper",
      "level": 2,
      "content": "Building a Type Eraser Step-by-Step"
    },
    {
      "type": "paragraph",
      "id": "p-building",
      "content": "There are two common ways to build a custom type eraser: closure-based forwarding and class-based box hierarchies. Here is the closure-based approach for an `AnySpeaker` wrapper:"
    },
    {
      "type": "code",
      "id": "code-eraser",
      "language": "swift",
      "caption": "Closure-based custom type eraser wrapper struct",
      "content": "protocol Speaker {\n    associatedtype Message\n    func speak() -> Message\n}\n\n// 1. Generic wrapper over only the associated type, NOT the concrete type T\nstruct AnySpeaker<Message>: Speaker {\n    // 2. Closure capturing the protocol method\n    private let _speak: () -> Message\n    \n    // 3. Generic initializer accepts any conforming type and erases T\n    init<T: Speaker>(_ speaker: T) where T.Message == Message {\n        self._speak = speaker.speak\n    }\n    \n    // 4. Forward protocol calls directly to stored closure\n    func speak() -> Message {\n        return _speak()\n    }\n}\n\nstruct Human: Speaker {\n    func speak() -> String { \"Hello world!\" }\n}\n\nstruct Robot: Speaker {\n    func speak() -> String { \"Beep boop!\" }\n}\n\n// Heterogeneous collection of speakers sharing the same Message type\nlet speakers: [AnySpeaker<String>] = [AnySpeaker(Human()), AnySpeaker(Robot())]\n\nfor speaker in speakers {\n    print(speaker.speak())\n}\n// prints: Hello world!\n// prints: Beep boop!"
    },
    {
      "type": "heading",
      "id": "h-class-box",
      "level": 2,
      "content": "Class-Box Hierarchy Pattern"
    },
    {
      "type": "paragraph",
      "id": "p-class-box",
      "content": "Before Swift 5.7, the standard library implemented type erasers like `AnyIterator` and `AnySequence` using a class-box hierarchy. An abstract private base class defines the protocol interface, while a generic private subclass wraps the concrete type. A public value struct holds a reference to the base class, forwarding calls and preserving value semantics:"
    },
    {
      "type": "code",
      "id": "code-box-eraser",
      "language": "swift",
      "caption": "Class-box hierarchy type erasure pattern (as used in AnySequence and AnyIterator)",
      "content": "protocol Repository {\n    associatedtype Item\n    func fetchAll() -> [Item]\n}\n\n// 1. Abstract base class (defines interface, erases the concrete type)\nprivate class _AnyRepositoryBase<Item>: Repository {\n    func fetchAll() -> [Item] {\n        fatalError(\"Must be overridden by subclass\")\n    }\n}\n\n// 2. Concrete subclass holding the specific conforming instance\nprivate final class _AnyRepositoryBox<Concrete: Repository>: _AnyRepositoryBase<Concrete.Item> {\n    private let _concrete: Concrete\n    \n    init(_ concrete: Concrete) {\n        self._concrete = concrete\n    }\n    \n    override func fetchAll() -> [Concrete.Item] {\n        return _concrete.fetchAll()\n    }\n}\n\n// 3. Public value wrapper maintaining value semantics and clean API\npublic struct AnyRepository<Item>: Repository {\n    private let _box: _AnyRepositoryBase<Item>\n    \n    public init<R: Repository>(_ repository: R) where R.Item == Item {\n        self._box = _AnyRepositoryBox(repository)\n    }\n    \n    public func fetchAll() -> [Item] {\n        return _box.fetchAll()\n    }\n}\n\n// Conforming concrete types\nstruct DatabaseRepo: Repository {\n    func fetchAll() -> [String] { [\"User_1\", \"User_2\"] }\n}\n\nstruct MockRepo: Repository {\n    func fetchAll() -> [String] { [\"Mock_Admin\"] }\n}\n\n// Heterogeneous collection using class-box type erasure\nlet repositories: [AnyRepository<String>] = [\n    AnyRepository(DatabaseRepo()),\n    AnyRepository(MockRepo())\n]\n\nfor repo in repositories {\n    print(repo.fetchAll())\n}\n// prints: [\"User_1\", \"User_2\"]\n// prints: [\"Mock_Admin\"]"
    },
    {
      "type": "callout",
      "id": "c-erasure-strategies",
      "variant": "tip",
      "title": "Choosing Between Type Erasure Strategies",
      "content": "• **Closure-based erasure:** Flexible and lightweight for protocols with 1–2 methods, but incurs a closure allocation per method and requires care to avoid retain cycles.\n• **Class-box erasure:** Classic Apple stdlib pattern (used in AnySequence and AnyIterator). Better for protocols with many requirements and enables virtual dispatch with a single heap allocation.\n• **any existential (Swift 5.7+):** Preferred in modern Swift codebases (e.g. `any Sequence<Item>`). Zero boilerplate, compiler-managed existential containers, and built-in existential opening."
    },
    {
      "type": "table",
      "id": "table-erasure-comparison",
      "caption": "Type Abstraction Techniques in Swift",
      "headers": [
        "Technique",
        "Type Representation",
        "Performance",
        "Associated Type Support",
        "Typical Use Case"
      ],
      "rows": [
        {
          "cells": [
            "Custom Erasure (AnyX)",
            "Generic struct wrapping closures/box",
            "Heap allocation for closure or box",
            "Fully supported across all Swift versions",
            "Public API hiding (AnyPublisher, AnySequence)"
          ]
        },
        {
          "cells": [
            "Existential (any P<T>)",
            "Compiler-generated existential box",
            "Inline buffer or heap allocation + PWT",
            "Swift 5.7+ Primary Associated Types",
            "Heterogeneous collections with minimal boilerplate"
          ]
        },
        {
          "cells": [
            "Opaque (some P<T>)",
            "Compiler-preserved concrete type",
            "Zero overhead (Direct dispatch, inlinable)",
            "Swift 5.7+ Primary Associated Types",
            "Return types where concrete type is implementation detail"
          ]
        }
      ]
    },
    {
      "type": "callout",
      "id": "c-anyview-hazard",
      "variant": "warning",
      "title": "The Performance Hazard of AnyView in SwiftUI",
      "content": "Erasing SwiftUI views with `AnyView` destroys SwiftUI's compile-time view hierarchy graph. SwiftUI must discard existing render trees, breaking animation transitions, losing state, and re-instantiating all child views on state changes. Use `@ViewBuilder` or `Group` instead of `AnyView`."
    },
    {
      "type": "heading",
      "id": "h-stdlib-examples",
      "level": 2,
      "content": "The 'AnyX' Standard Library Patterns"
    },
    {
      "type": "list",
      "id": "list-stdlib",
      "ordered": false,
      "items": [
        "**AnySequence & AnyIterator:** Erase complex iterator generators (`LazyMapSequence`, `Zip2Sequence`) into simple iterable streams.",
        "**AnyHashable:** Erases any `Hashable` type into a type-safe key for dictionaries (`[AnyHashable: Any]`), with built-in numeric equivalence bridging.",
        "**AnyPublisher (Combine):** Erases sprawling reactive pipeline types (`Publishers.Map<Publishers.Filter<...>>`) into clean public API contracts (`eraseToAnyPublisher()`).",
        "**AnyCancellable (Combine):** An autoreleasing subscription token that cancels on `deinit` and can be stored in a `Set<AnyCancellable>`."
      ]
    },
    {
      "type": "paragraph",
      "id": "p-combine-eraser",
      "content": "Combine's `AnyPublisher` and `AnyCancellable` represent the most prominent real-world applications of type erasure in modern Apple frameworks. Calling `eraseToAnyPublisher()` abstracts deeply nested generic publisher operator chains into clean API contracts:"
    },
    {
      "type": "code",
      "id": "code-combine-eraser",
      "language": "swift",
      "caption": "Combine's AnyPublisher & AnyCancellable: Erasing nested publisher operator chains",
      "content": "import Combine\n\n// Service protocol returning erased Publisher\nprotocol DataService {\n    func fetchCount() -> AnyPublisher<Int, Never>\n}\n\nfinal class CounterService: DataService {\n    // Pipeline creates complex type: Publishers.Map<Just<Int>, Int>\n    // eraseToAnyPublisher() hides internal pipeline operators from callers\n    func fetchCount() -> AnyPublisher<Int, Never> {\n        Just(42)\n            .map { $0 * 2 }\n            .eraseToAnyPublisher()\n    }\n}\n\nvar cancellables = Set<AnyCancellable>()\nlet service: DataService = CounterService()\n\n// AnyCancellable erases subscription tokens and cancels on deinit\nservice.fetchCount()\n    .sink { value in\n        print(\"Received: \\(value)\")\n    }\n    .store(in: &cancellables)\n\n// prints: Received: 84\n\n// Contrast with Swift 5.7+:\n// With primary associated types, you can also write:\n// func fetchCount() -> any Publisher<Int, Never>\n// but AnyPublisher remains standard in Combine for ABI stability."
    },
    {
      "type": "heading",
      "id": "h-common-mistakes",
      "level": 2,
      "content": "Common Mistakes"
    },
    {
      "type": "list",
      "id": "l-common-mistakes",
      "ordered": false,
      "items": [
        "**Overusing AnyView in SwiftUI:** Using `AnyView` to resolve return type mismatches in view bodies, degrading render performance and breaking animations.",
        "**Writing manual Any* structs when `any Protocol<T>` suffices:** Rebuilding manual type erasers in modern Swift 5.7+ codebases when standard language existentials already handle the requirement.",
        "**Creating strong retain cycles in closure-based erasers:** Capturing `self` strongly inside forwarding closures stored in type-erased wrapper structs.",
        "**Erasing types too early:** Calling `eraseToAnyPublisher()` or wrapping into `AnySequence` in internal module algorithms, preventing the compiler from inlining operations.",
        "**Assuming AnyHashable preserves exact concrete type equality:** `AnyHashable(1)` and `AnyHashable(1.0)` compare as equal due to standard library numeric bridging rules.",
        "**Forgetting value semantics in box hierarchies:** Failing to implement copy-on-write when using class-based boxes (`_AnyBoxBase`) inside type-erased value structs."
      ]
    },
    {
      "type": "interview",
      "id": "interview",
      "relevance": "high",
      "questions": [
        "What problem does Type Erasure solve in Swift?",
        "How do you build a custom type-erased wrapper struct from scratch?",
        "How does AnyHashable work, and why is it essential for heterogeneous dictionaries?",
        "Why is manual type erasure needed much less often in Swift 5.7+ and Swift 6?",
        "What are the performance tradeoffs between Generics and Type Erasure wrappers?",
        "Why does SwiftUI provide AnyView, and why is its frequent use discouraged?",
        "How does AnyCancellable use type erasure to manage subscription lifecycles?",
        "How can closures and callAsFunction be used for lightweight type erasure?"
      ]
    },
    {
      "type": "relatedTopics",
      "id": "related",
      "topicIds": [
        "swift-opaque-types",
        "swift-protocols",
        "swift-generics"
      ]
    }
  ]
},
  {
  "id": "swift-result-builders",
  "slug": "result-builders-and-dsls",
  "title": "Result Builders & Domain-Specific Languages",
  "category": "swift",
  "group": "Advanced Swift",
  "description": "How @resultBuilder transforms nested closures into readable declarative syntax — SwiftUI's @ViewBuilder, array builders, and designing your own DSLs.",
  "difficulty": "intermediate",
  "estimatedTime": 26,
  "language": "swift",
  "version": {
    "language": "Swift",
    "version": "6",
    "minimumVersion": "5.1",
    "status": "current",
    "lastReviewed": "2026-09-06"
  },
  "interviewRelevance": "medium",
  "tags": [
    "result-builder",
    "dsl",
    "viewbuilder",
    "@resultBuilder",
    "declarative"
  ],
  "relatedTopics": [
    "swift-closures",
    "swift-protocols",
    "swift-generics"
  ],
  "previousTopic": "swift-type-erasure",
  "nextTopic": "swift-macros",
  "furtherReading": [
    {
      "title": "Result Builders — The Swift Programming Language",
      "url": "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/advancedoperators/#Result-Builders",
      "source": "swift-org"
    },
    {
      "title": "SwiftUI ViewBuilder Documentation",
      "url": "https://developer.apple.com/documentation/swiftui/viewbuilder",
      "source": "apple-developer"
    }
  ],
  "content": [
    {
      "type": "quickAnswer",
      "id": "qa",
      "content": "`@resultBuilder` is a compiler feature that transforms sequential statements inside a closure into a single accumulated result via static methods (`buildBlock`, `buildEither`, `buildOptional`, `buildArray`). It enables declarative Domain-Specific Languages (DSLs) like SwiftUI's `@ViewBuilder`, turning comma-less statement lists into nested function calls at compile time with zero runtime parsing overhead."
    },
    {
      "type": "heading",
      "id": "h-why",
      "level": 2,
      "content": "Why do Result Builders matter?"
    },
    {
      "type": "paragraph",
      "id": "p-why",
      "content": "Without result builders, constructing tree-structured data like UI hierarchies, attributed strings, or HTML trees requires verbose array literals, explicit return statements, and messy commas.\n\nWith `@resultBuilder`, the code reads like a clean, declarative configuration file where child statements are collected naturally by the compiler into an Abstract Syntax Tree rewrite."
    },
    {
      "type": "heading",
      "id": "h-custom-builder",
      "level": 2,
      "content": "Building a Custom Result Builder: HTMLBuilder"
    },
    {
      "type": "code",
      "id": "code-html-builder",
      "language": "swift",
      "caption": "Custom HTMLBuilder implementing result builder static translation methods",
      "content": "@resultBuilder\nstruct HTMLBuilder {\n    // Required: Combines multiple statements into one\n    static func buildBlock(_ components: String...) -> String {\n        components.joined(separator: \"\\n\")\n    }\n    \n    // Supports single 'if' statements without else\n    static func buildOptional(_ component: String?) -> String {\n        component ?? \"\"\n    }\n    \n    // Supports 'if' branch\n    static func buildEither(first component: String) -> String {\n        component\n    }\n    \n    // Supports 'else' branch\n    static func buildEither(second component: String) -> String {\n        component\n    }\n}\n\n// Applying the builder to a function closure parameter\nfunc htmlPage(@HTMLBuilder content: () -> String) -> String {\n    \"<!DOCTYPE html>\\n<html>\\n\" + content() + \"\\n</html>\"\n}\n\nlet isLoggedIn = true\nlet page = htmlPage {\n    \"<h1>Welcome to SwiftCraft</h1>\"\n    if isLoggedIn {\n        \"<p>Hello, authenticated user!</p>\"\n    } else {\n        \"<a href='/login'>Please log in</a>\"\n    }\n}\nprint(page)\n// prints: <!DOCTYPE html>\n// prints: <html>\n// prints: <h1>Welcome to SwiftCraft</h1>\n// prints: <p>Hello, authenticated user!</p>\n// prints: </html>"
    },
    {
      "type": "table",
      "id": "table-builder-methods",
      "caption": "Result Builder Static Methods & AST Translation",
      "headers": [
        "Static Method",
        "Syntactic Construct Handled",
        "Description"
      ],
      "rows": [
        {
          "cells": [
            "buildBlock(...)",
            "Sequential statements",
            "Required. Combines child statements into a single composite type"
          ]
        },
        {
          "cells": [
            "buildOptional(_:)",
            "if statements without else",
            "Transforms optional component when condition evaluates to false"
          ]
        },
        {
          "cells": [
            "buildEither(first:/second:)",
            "if/else and switch statements",
            "Encapsulates binary branching paths into a conditional type"
          ]
        },
        {
          "cells": [
            "buildArray(_:)",
            "for-in loops",
            "Flattens dynamic loop iterations into a single accumulated value"
          ]
        },
        {
          "cells": [
            "buildExpression(_:)",
            "Raw expression statements",
            "Preprocesses individual input expressions before buildBlock"
          ]
        },
        {
          "cells": [
            "buildFinalResult(_:)",
            "Return value of closure",
            "Optional post-processor converting internal representation to public output"
          ]
        }
      ]
    },
    {
      "type": "callout",
      "id": "c-builder-timeout",
      "variant": "warning",
      "title": "Compiler Type-Check Timeouts in Complex DSLs",
      "content": "Deeply nested result builder closures with ambiguous inference can cause the Swift compiler to fail with: *\"The compiler is unable to type-check this expression in reasonable time\"*. Break complex result builder trees into smaller helper functions or computed subviews to keep compile times fast."
    },
    {
      "type": "code",
      "id": "code-array-builder",
      "language": "swift",
      "caption": "ArrayBuilder demonstrating buildArray for for-in loop support",
      "content": "@resultBuilder\nstruct ArrayBuilder<Element> {\n    static func buildBlock(_ components: [Element]...) -> [Element] {\n        components.flatMap { $0 }\n    }\n    static func buildExpression(_ expression: Element) -> [Element] {\n        [expression]\n    }\n    static func buildArray(_ components: [[Element]]) -> [Element] {\n        components.flatMap { $0 }\n    }\n}\n\nfunc makeArray(@ArrayBuilder<Int> build: () -> [Int]) -> [Int] {\n    build()\n}\n\nlet generatedArray = makeArray {\n    1\n    2\n    for i in 3...5 {\n        i\n    }\n}\nprint(generatedArray)\n// prints: [1, 2, 3, 4, 5]"
    },
    {
      "type": "heading",
      "id": "h-viewbuilder",
      "level": 2,
      "content": "SwiftUI's @ViewBuilder Explained"
    },
    {
      "type": "paragraph",
      "id": "p-viewbuilder",
      "content": "`@ViewBuilder` is the most famous result builder in the Swift ecosystem. It transforms view hierarchies into nested `TupleView` and `_ConditionalContent` types. Because `@ViewBuilder` intentionally omits `buildArray`, developers cannot write raw `for-in` loops inside view bodies; they must use `ForEach` to ensure SwiftUI can track identity across dynamic items."
    },
    {
      "type": "heading",
      "id": "h-common-mistakes",
      "level": 2,
      "content": "Common Mistakes"
    },
    {
      "type": "list",
      "id": "l-common-mistakes",
      "ordered": false,
      "items": [
        "**Writing for-in loops inside @ViewBuilder:** Trying to loop directly inside a SwiftUI body without `ForEach` (SwiftUI omits `buildArray` to preserve identity diffing).",
        "**Missing buildEither(first:/second:):** Forgetting to implement both branches, which causes compile errors when consumers write `if/else` or `switch` statements.",
        "**Exceeding type-checker complexity limits:** Building massive 500-line declarative trees inside a single builder closure, causing compiler slowdowns or timeouts.",
        "**Performing imperative side-effects inside builder closures:** Executing network requests or modifying external state directly inside a declarative builder block.",
        "**Omitting buildOptional:** Failing to support single `if` statements without `else`.",
        "**Confusing buildBlock overloads with Parameter Packs:** Pre-Swift 5.9 builders required overloading `buildBlock` with 1 to 10 arguments; Swift 5.9+ Parameter Packs eliminate this arity limit."
      ]
    },
    {
      "type": "interview",
      "id": "interview",
      "relevance": "medium",
      "questions": [
        "What is @resultBuilder, and how does the compiler transform declarative closures?",
        "What are the core static methods in a @resultBuilder type (buildBlock, buildEither, buildArray)?",
        "How do buildEither(first:) and buildEither(second:) translate conditionals?",
        "How does buildArray enable for-in loops, and why does SwiftUI omit it?",
        "How do you write a custom Result Builder for a domain-specific language?",
        "What is the purpose of buildExpression in preprocessing DSL inputs?",
        "Why do deeply nested result builders sometimes cause slow compiler type-checking?",
        "How do Parameter Packs in Swift 5.9 improve Result Builders?"
      ]
    },
    {
      "type": "relatedTopics",
      "id": "related",
      "topicIds": [
        "swift-closures",
        "swift-protocols",
        "swift-generics"
      ]
    }
  ]
},
  {
  "id": "swift-macros",
  "slug": "swift-macros",
  "title": "Swift Macros: Freestanding & Attached",
  "category": "swift",
  "group": "Advanced Swift",
  "description": "How Swift 5.9 macros rewrite code at compile time — freestanding macros as expressions, attached macros decorating declarations, the macro expansion model, and real-world use cases.",
  "difficulty": "advanced",
  "estimatedTime": 30,
  "language": "swift",
  "version": {
    "language": "Swift",
    "version": "6",
    "minimumVersion": "5.9",
    "status": "current",
    "lastReviewed": "2026-09-06"
  },
  "interviewRelevance": "medium",
  "tags": [
    "macros",
    "metaprogramming",
    "freestanding-macro",
    "attached-macro",
    "#macro",
    "@macro"
  ],
  "relatedTopics": [
    "swift-protocols",
    "swift-generics",
    "swift-result-builders"
  ],
  "previousTopic": "swift-result-builders",
  "nextTopic": "swift-method-dispatch",
  "furtherReading": [
    {
      "title": "Macros — The Swift Programming Language",
      "url": "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/macros",
      "source": "swift-org"
    },
    {
      "title": "Expand on Swift macros — WWDC23",
      "url": "https://developer.apple.com/videos/play/wwdc2023/10166/",
      "source": "apple-developer"
    }
  ],
  "content": [
    {
      "type": "quickAnswer",
      "id": "qa",
      "content": "Swift Macros (Swift 5.9+) are compile-time code generation plugins operating on the Swift Abstract Syntax Tree (AST) via SwiftSyntax. Freestanding macros (`#`) appear as expressions or statements; Attached macros (`@`) decorate declarations to inject members, accessors, peer declarations, attributes, or extensions. Unlike C preprocessor macros, Swift macros are fully type-checked, run in an isolated compiler sandbox without filesystem or network access, and can be inspected directly in Xcode."
    },
    {
      "type": "heading",
      "id": "h-why",
      "level": 2,
      "content": "Why Swift Macros represent a paradigm shift"
    },
    {
      "type": "paragraph",
      "id": "p-why",
      "content": "Historically, reducing boilerplate in iOS required external code generators like Sourcery, custom Xcode run-script phases, or Objective-C runtime magic. Swift Macros integrate directly into the compiler:\n- **No out-of-sync files:** Code is generated in-memory during compilation.\n- **Type-safe diagnostics:** Macros emit native compiler warnings and errors at exact source code locations.\n- **Full IDE integration:** Developers can right-click any macro in Xcode and choose **Expand Macro** to inspect generated code and set active breakpoints."
    },
    {
      "type": "heading",
      "id": "h-table-roles",
      "level": 2,
      "content": "Swift Macro Kinds and Roles"
    },
    {
      "type": "table",
      "id": "table-macro-roles",
      "caption": "Swift Macro Classification and Capabilities",
      "headers": [
        "Macro Kind",
        "Syntax",
        "Role Attribute",
        "Capabilities & Code Injected"
      ],
      "rows": [
        {
          "cells": [
            "Freestanding",
            "#expression(...)",
            "expression",
            "Generates a piece of code that returns a value (e.g. #URL(\"...\"), #stringify(x))"
          ]
        },
        {
          "cells": [
            "Freestanding",
            "#declaration(...)",
            "declaration",
            "Generates one or more standalone declarations (structs, functions, variables)"
          ]
        },
        {
          "cells": [
            "Attached",
            "@attached(member)",
            "member",
            "Injects new stored/computed properties, initializers, or methods inside a type"
          ]
        },
        {
          "cells": [
            "Attached",
            "@attached(peer)",
            "peer",
            "Injects sibling declarations alongside the target (e.g. async wrappers for callback APIs)"
          ]
        },
        {
          "cells": [
            "Attached",
            "@attached(accessor)",
            "accessor",
            "Transforms stored properties into computed accessors (get/set/willSet/didSet)"
          ]
        },
        {
          "cells": [
            "Attached",
            "@attached(memberAttribute)",
            "memberAttribute",
            "Decorates all member declarations of a type with specified attributes"
          ]
        },
        {
          "cells": [
            "Attached",
            "@attached(extension)",
            "extension",
            "Injects protocol conformances and helper methods via synthesized extensions"
          ]
        }
      ]
    },
    {
      "type": "callout",
      "id": "c-macro-syntactic",
      "variant": "important",
      "title": "Pure Syntactic Transformation: No Type Resolution",
      "content": "A fundamental rule of Swift macros is that they operate purely on the SwiftSyntax AST before type-checking completes. A macro CANNOT query the type of an expression (e.g. it cannot ask \"does property X conform to Codable?\"). All expansion logic must be derived solely from visible syntax tokens and macro arguments."
    },
    {
      "type": "heading",
      "id": "h-freestanding",
      "level": 2,
      "content": "Freestanding Macros in Action"
    },
    {
      "type": "paragraph",
      "id": "p-freestanding",
      "content": "Freestanding macros are invoked with a `#` symbol and generate code that produces a value (like `#URL`) or standalone declarations. They provide compile-time validation of their arguments, completely eliminating runtime crashes for invalid data formats."
    },
    {
      "type": "code",
      "id": "code-freestanding-macro",
      "language": "swift",
      "caption": "A freestanding macro providing compile-time string validation",
      "content": "import Foundation\n\n// 1. Without macro (Runtime Crash potential!)\nlet url = URL(string: \"https://apple.com\")!\n\n// 2. With #URL macro (Compile-Time validation!)\nlet safeUrl = #URL(\"https://apple.com\")\nprint(safeUrl.host!) \n// prints: apple.com\n\n// 🚨 If you type an invalid URL:\n// let badUrl = #URL(\"https:// apple.com\")\n// Xcode displays a COMPILE ERROR: \"Malformed url: https:// apple.com\"\n// The macro analyzes the string literal during compilation and blocks the build!"
    },
    {
      "type": "heading",
      "id": "h-observable",
      "level": 2,
      "content": "Real-World Case Study: How @Observable Works"
    },
    {
      "type": "paragraph",
      "id": "p-observable",
      "content": "Swift 5.9's `@Observable` replaces Combine's `ObservableObject` by combining multiple attached roles:\n1. Adds an internal `ObservationRegistrar` stored property (`@attached(member)`).\n2. Converts stored properties into computed accessors that register reads and mutations (`@attached(accessor)`).\n3. Adds `Observable` protocol conformance via an extension (`@attached(extension)`).\n\nResult: Views only re-render when properties they actively read change, avoiding global view invalidation."
    },
    {
      "type": "code",
      "id": "code-macro-observable",
      "language": "swift",
      "caption": "@Observable macro declaration and synthesized observation members",
      "content": "@Observable\nclass UserProfile {\n    var name: String = \"Taylor\"\n    var score: Int = 100\n}\n\n// Xcode \"Expand Macro\" reveals the generated code:\n// class UserProfile: Observable {\n//     @ObservationIgnored private let _$observationRegistrar = ObservationRegistrar()\n//     internal nonisolated func access<Member>(keyPath: KeyPath<UserProfile, Member>) { ... }\n//     var name: String {\n//         get { _$observationRegistrar.access(self, keyPath: \\.name); return _name }\n//         set { _$observationRegistrar.withMutation(of: self, keyPath: \\.name) { _name = newValue } }\n//     }\n// }\n\n// Usage:\nlet profile = UserProfile()\nprofile.name = \"Alison\" \n// The generated setter automatically tracks the mutation and notifies observers."
    },
    {
      "type": "heading",
      "id": "h-sandbox",
      "level": 2,
      "content": "Sandbox Security & Determinism"
    },
    {
      "type": "paragraph",
      "id": "p-sandbox",
      "content": "Swift macros run as separate executables in an isolated compiler sandbox. They have **no filesystem access**, **no network connectivity**, and **no system clock/RNG access**. This guarantees that macro expansions are pure, deterministic functions of their AST inputs and prevents malicious build-time scripts."
    },
    {
      "type": "heading",
      "id": "h-common-mistakes",
      "level": 2,
      "content": "Common Mistakes"
    },
    {
      "type": "list",
      "id": "l-common-mistakes",
      "ordered": false,
      "items": [
        "**Attempting network/disk I/O in macro implementations:** The compiler sandboxes macro execution; accessing `FileManager`, network sockets, or external files causes a fatal sandbox violation.",
        "**Expecting macros to query semantic types:** Assuming a macro can inspect whether a generic argument conforms to a protocol; macros only have access to AST syntax tokens.",
        "**Modifying existing declarations:** Swift macros are strictly additive. A macro cannot delete, rename, or mutate existing code; it can only inject new declarations or accessors.",
        "**Not testing macro expansions with SwiftSyntaxTestSuite:** Failing to write unit tests with `assertMacroExpansion` to verify emitted code and diagnostic error positions.",
        "**Slow compilation from bloated macro dependencies:** Linking heavy external libraries into the macro implementation plugin, inflating compile times for all client targets.",
        "**Using C-style string concatenation instead of SwiftSyntax nodes:** Generating source code via naive string manipulation instead of typed SwiftSyntax builders, leading to invalid syntax emissions."
      ]
    },
    {
      "type": "interview",
      "id": "interview",
      "relevance": "medium",
      "questions": [
        "What are Swift Macros, and how do they differ from C/C++ preprocessor macros?",
        "What is the difference between Freestanding (#) and Attached (@) macros?",
        "Explain the 5 attached macro roles (member, peer, accessor, memberAttribute, extension).",
        "How does the compiler sandbox macro execution for security and determinism?",
        "How do you inspect and debug macro expansions in Xcode?",
        "How does the @Observable macro work under the hood to replace Combine?",
        "What are the fundamental limitations of Swift macros (purely additive, no semantic type queries)?",
        "How are macro packages structured across SPM targets (definition, implementation, client)?"
      ]
    },
    {
      "type": "relatedTopics",
      "id": "related",
      "topicIds": [
        "swift-protocols",
        "swift-generics",
        "swift-result-builders"
      ]
    }
  ]
},
  {
  "id": "swift-method-dispatch",
  "slug": "method-dispatch",
  "title": "Method Dispatch: Static, Dynamic, V-Tables & Witness Tables",
  "category": "swift",
  "group": "Advanced Swift",
  "description": "How the compiler decides which method implementation runs — static dispatch (inlined, no overhead), dynamic dispatch via class v-tables or protocol witness tables, and the performance implications of each.",
  "difficulty": "advanced",
  "estimatedTime": 28,
  "language": "swift",
  "version": {
    "language": "Swift",
    "version": "6",
    "minimumVersion": "1.0",
    "status": "current",
    "lastReviewed": "2026-09-06"
  },
  "interviewRelevance": "high",
  "tags": [
    "method-dispatch",
    "static-dispatch",
    "dynamic-dispatch",
    "vtable",
    "witness-table",
    "performance"
  ],
  "relatedTopics": [
    "swift-struct-vs-class",
    "swift-protocols",
    "swift-generics"
  ],
  "previousTopic": "swift-macros",
  "furtherReading": [
    {
      "title": "Optimization Tips — Apple Developer Documentation",
      "url": "https://developer.apple.com/documentation/swift",
      "source": "apple-developer"
    },
    {
      "title": "Increasing Performance by Reducing Dynamic Dispatch",
      "url": "https://developer.apple.com/swift/blog/?id=27",
      "source": "apple-developer"
    }
  ],
  "content": [
    {
      "type": "quickAnswer",
      "id": "qa",
      "content": "Swift chooses between three primary dispatch mechanisms: **Static / Direct Dispatch** (known at compile time, direct jump, fully inlinable, zero overhead), **Table Dispatch via Virtual Tables (V-Tables)** (class inheritance, single pointer indirection), and **Protocol Witness Tables (PWT)** (protocol polymorphism on value or reference types). In addition, Objective-C dynamic message dispatch (`objc_msgSend`) powers `@objc dynamic` and KVO."
    },
    {
      "type": "heading",
      "id": "h-why",
      "level": 2,
      "content": "Why Method Dispatch Strategy Dictates Performance"
    },
    {
      "type": "paragraph",
      "id": "p-why",
      "content": "Method dispatch is the algorithm a language runtime uses to determine which memory instructions to execute when a function is called. Direct dispatch takes ~1-2 nanoseconds and enables compiler inlining. Dynamic table dispatch requires memory dereferences that can cause CPU pipeline stalls and cache misses. In high-frequency code paths (e.g. graphics loops, audio engines, or data parsing), choosing the right dispatch model is the difference between smooth 120 FPS and frame drops."
    },
    {
      "type": "heading",
      "id": "h-matrix",
      "level": 2,
      "content": "The Swift Method Dispatch Matrix"
    },
    {
      "type": "table",
      "id": "table-dispatch-matrix",
      "caption": "Comprehensive Swift Method Dispatch Matrix",
      "headers": [
        "Declaration Location",
        "Type Kind",
        "Default Dispatch",
        "Optimization with final / private",
        "Dispatch in Extensions"
      ],
      "rows": [
        {
          "cells": [
            "Value Types",
            "Struct / Enum",
            "Static / Direct Dispatch",
            "N/A (already static)",
            "Static / Direct Dispatch"
          ]
        },
        {
          "cells": [
            "Class Initial Declaration",
            "Non-final Class",
            "Table Dispatch (V-Table)",
            "Static / Direct Dispatch (Devirtualized)",
            "Static / Direct Dispatch (Cannot be overridden)"
          ]
        },
        {
          "cells": [
            "Protocol Blueprint Requirement",
            "Protocol Requirement",
            "Witness Table (PWT)",
            "Devirtualized to Static if type is concrete/some",
            "Dynamic via PWT if declared in protocol"
          ]
        },
        {
          "cells": [
            "Protocol Extension Only",
            "Extension Method",
            "Static / Direct Dispatch",
            "N/A (always static direct call)",
            "Static / Direct Dispatch"
          ]
        },
        {
          "cells": [
            "@objc dynamic",
            "NSObject Subclass",
            "Message Dispatch (objc_msgSend)",
            "N/A (dynamic dispatch required)",
            "Message Dispatch (objc_msgSend)"
          ]
        }
      ]
    },
    {
      "type": "callout",
      "id": "c-wmo-devirtualization",
      "variant": "tip",
      "title": "Whole Module Optimization (WMO) & Automatic Devirtualization",
      "content": "When Whole Module Optimization is enabled, the Swift compiler analyzes the entire module at once. If it observes that a class is never subclassed, or that a method is never overridden anywhere in the module, it automatically devirtualizes V-Table calls into direct static calls even if you forgot to add the `final` keyword!"
    },
    {
      "type": "heading",
      "id": "h-vtable",
      "level": 2,
      "content": "Class Table (V-Table) Dispatch Demonstration"
    },
    {
      "type": "code",
      "id": "code-dispatch",
      "language": "swift",
      "caption": "V-Table vs Static dispatch across classes and extensions",
      "content": "class Animal {\n    func speak() { print(\"Generic sound\") } // V-Table Dispatch\n    final func sleep() { print(\"Sleeping\") } // Static Dispatch (devirtualized)\n}\n\nextension Animal {\n    func eat() { print(\"Eating\") } // Static Dispatch (extensions cannot be overridden)\n}\n\nclass Dog: Animal {\n    override func speak() { print(\"Woof!\") } // Overrides slot in Dog's V-Table\n}\n\nlet dog = Dog()\ndog.speak() // prints: Woof!\ndog.sleep() // prints: Sleeping\ndog.eat()   // prints: Eating"
    },
    {
      "type": "heading",
      "id": "h-dispatch-trap",
      "level": 2,
      "content": "The Protocol Extension Dispatch Trap"
    },
    {
      "type": "paragraph",
      "id": "p-dispatch-trap",
      "content": "A classic senior iOS interview trap:\n- If a method is declared in the protocol definition AND implemented in an extension: It is a requirement, stored in the PWT, and uses **Dynamic Dispatch**.\n- If a method is declared ONLY in the extension: It has no PWT slot and uses **Static Dispatch**. If a conforming type writes a custom implementation, it will be ignored when called on an existential `any Protocol`!"
    },
    {
      "type": "code",
      "id": "code-dispatch-trap",
      "language": "swift",
      "caption": "The Protocol Extension Dispatch Trap in action",
      "content": "protocol Drawable {\n    func draw() // Declared in blueprint -> Dynamic Dispatch (PWT)\n}\n\nextension Drawable {\n    func draw() { print(\"Default Draw\") }\n    \n    // ONLY in extension -> Static Dispatch!\n    func fill() { print(\"Default Fill\") }\n}\n\nstruct Circle: Drawable {\n    func draw() { print(\"Circle Draw\") }\n    func fill() { print(\"Circle Fill\") } // Shadowing, not overriding!\n}\n\nlet myCircle = Circle()\nmyCircle.draw() // prints: Circle Draw\nmyCircle.fill() // prints: Circle Fill\n\n// 🚨 THE TRAP: View the circle through the protocol lens\nlet drawable: any Drawable = myCircle\ndrawable.draw() // prints: Circle Draw (Dynamic via PWT)\ndrawable.fill() // prints: Default Fill (Static direct call, Circle.fill ignored!)"
    },
    {
      "type": "heading",
      "id": "h-message-dispatch",
      "level": 2,
      "content": "Message Dispatch (@objc dynamic)"
    },
    {
      "type": "paragraph",
      "id": "p-message-dispatch",
      "content": "The most dynamic (and slowest) dispatch method relies on the Objective-C runtime (`objc_msgSend`). By marking a method with `@objc dynamic`, you force Swift to use message dispatch. This enables powerful runtime features like Key-Value Observing (KVO) and method swizzling, at the cost of losing all compiler optimizations."
    },
    {
      "type": "code",
      "id": "code-message-dispatch",
      "language": "swift",
      "caption": "Enabling KVO with @objc dynamic message dispatch",
      "content": "import Foundation\n\nclass DownloadManager: NSObject {\n    // @objc dynamic forces Objective-C message dispatch\n    // This makes the property eligible for Key-Value Observing (KVO)\n    @objc dynamic var progress: Double = 0.0\n}\n\nlet manager = DownloadManager()\n\n// KVO relies entirely on message dispatch to intercept the setter\nlet observation = manager.observe(\\.progress, options: [.new]) { object, change in\n    print(\"Progress updated to: \\(change.newValue ?? 0.0)\")\n}\n\nmanager.progress = 0.5\n// prints: Progress updated to: 0.5"
    },
    {
      "type": "heading",
      "id": "h-common-mistakes",
      "level": 2,
      "content": "Common Mistakes"
    },
    {
      "type": "list",
      "id": "l-common-mistakes",
      "ordered": false,
      "items": [
        "**Assuming extension methods on non-final classes use V-Tables:** Class extensions cannot be overridden in Swift because the class v-table has a fixed size; extension methods are always statically dispatched.",
        "**Falling into the Protocol Extension Dispatch Trap:** Expecting a custom method implementation on a struct to be called through an existential (`any Protocol`) when the method was only declared in a protocol extension.",
        "**Leaving classes non-final unnecessarily:** Omitting `final` on classes and methods that are never subclassed, adding unnecessary V-Table lookup overhead.",
        "**Using `@objc dynamic` without needing Objective-C runtime features:** Incurring slow `objc_msgSend` selector dispatch when standard Swift table or direct dispatch was sufficient.",
        "**Assuming generics always use dynamic dispatch:** Generics use static dispatch whenever specialized by the compiler through monomorphization.",
        "**Confusing the Protocol Witness Table (PWT) with the Value Witness Table (VWT):** The PWT maps protocol method requirements; the VWT handles memory allocation, copying, moving, and deallocating values of unknown size."
      ]
    },
    {
      "type": "interview",
      "id": "interview",
      "relevance": "high",
      "questions": [
        "What is Static Dispatch in Swift, and why is it the fastest dispatch mechanism?",
        "How does Table (V-Table) Dispatch work for Swift classes?",
        "What is a Protocol Witness Table (PWT), and how does dispatch differ for some vs any?",
        "Explain the Protocol Extension Dispatch Trap.",
        "How does the final keyword optimize method dispatch, and what is devirtualization?",
        "What is @inlinable, and how does it affect cross-module method dispatch?",
        "What is Message Dispatch (objc_msgSend) in Swift, and when is it triggered?",
        "Summarize the method dispatch matrix across Swift language constructs."
      ]
    },
    {
      "type": "relatedTopics",
      "id": "related",
      "topicIds": [
        "swift-struct-vs-class",
        "swift-protocols",
        "swift-generics"
      ]
    }
  ]
}
];
