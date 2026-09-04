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
    previousTopic: 'swift-struct-vs-class',
    nextTopic: 'swift-protocols',
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
