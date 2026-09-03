import type { ArticleTopic } from '@/types';

export const concurrencyTopics: ArticleTopic[] = [
  // ─── Actors ────────────────────────────────────────────────────────────────
  {
    id: 'concurrency-actors',
    slug: 'actors-in-swift',
    title: 'Actors in Swift',
    category: 'concurrency',
    group: 'Swift Concurrency',
    description: 'Understand actor isolation and how actors protect mutable state from data races in Swift Concurrency.',
    difficulty: 'senior',
    estimatedTime: 12,
    language: 'swift',
    version: { language: 'Swift', version: '6', status: 'current', minimumVersion: '5.5', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['actors', 'concurrency', 'isolation', 'sendable', 'data-races'],
    relatedTopics: ['concurrency-mainactor', 'concurrency-async-await', 'concurrency-sendable', 'concurrency-task'],
    previousTopic: 'concurrency-async-await',
    nextTopic: 'concurrency-mainactor',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'An actor is a reference type that protects its mutable state from concurrent access. Swift guarantees that only one task can execute actor-isolated code at a time, eliminating data races without manual locking.',
      },
      {
        type: 'heading',
        id: 'h-what',
        level: 2,
        content: 'What is an Actor?',
      },
      {
        type: 'paragraph',
        id: 'p-what',
        content: 'Actors are a first-class concurrency primitive introduced in Swift 5.5. They look and behave like classes — they are reference types, support inheritance via protocols, and can have stored properties and methods. The key difference is that actors serialize access to their mutable state. Swift\'s compiler enforces actor isolation at compile time, meaning you cannot accidentally share actor state across threads without going through the actor\'s serialized access mechanism.',
      },
      {
        type: 'heading',
        id: 'h-why',
        level: 2,
        content: 'Why Actors?',
      },
      {
        type: 'paragraph',
        id: 'p-why',
        content: 'Before actors, protecting shared mutable state required manual synchronization: `DispatchQueue`, locks (`NSLock`, `pthread_mutex`), or serial queues. All of these approaches are error-prone — developers can forget to acquire a lock, acquire locks in the wrong order (causing deadlocks), or accidentally access state from the wrong queue. Actors let the compiler enforce safety automatically.',
      },
      {
        type: 'callout',
        id: 'c-key',
        variant: 'info',
        title: 'Key Guarantee',
        content: 'Actors guarantee mutual exclusion on their mutable state. Only one task at a time can run actor-isolated code, even if many tasks try concurrently.',
      },
      {
        type: 'heading',
        id: 'h-basic',
        level: 2,
        content: 'Basic Example',
      },
      {
        type: 'code',
        id: 'code-basic',
        language: 'swift',
        filename: 'BankAccount.swift',
        content: `actor BankAccount {
    private var balance: Int = 0

    func deposit(_ amount: Int) {
        balance += amount
    }

    func withdraw(_ amount: Int) -> Bool {
        guard balance >= amount else { return false }
        balance -= amount
        return true
    }

    func currentBalance() -> Int {
        balance
    }
}`,
        caption: 'A BankAccount actor safely manages balance across concurrent tasks.',
      },
      {
        type: 'paragraph',
        id: 'p-basic-explain',
        content: '`balance` is an actor-isolated property. No external code can read or write it without going through the actor\'s serialized access. Multiple tasks calling `deposit` concurrently will be safely queued — they will never execute simultaneously.',
      },
      {
        type: 'heading',
        id: 'h-isolation',
        level: 2,
        content: 'Actor Isolation',
      },
      {
        type: 'paragraph',
        id: 'p-isolation',
        content: 'When you access an actor\'s property or call its method from outside the actor, you must use `await`. This signals a potential suspension point — your current task may suspend while the actor finishes any in-progress work before granting you access.',
      },
      {
        type: 'code',
        id: 'code-await',
        language: 'swift',
        content: `let account = BankAccount()

// Cross-actor access requires await
await account.deposit(100)
let balance = await account.currentBalance()
print("Balance: \\(balance)")`,
      },
      {
        type: 'callout',
        id: 'c-reentrance',
        variant: 'warning',
        title: 'Actor Reentrancy',
        content: 'Actors are reentrant. When an actor-isolated function suspends at an await point, other tasks can run on the actor. This means state can change between suspension points — always recheck state after awaiting.',
      },
      {
        type: 'heading',
        id: 'h-production',
        level: 2,
        content: 'Production Example — Image Cache',
      },
      {
        type: 'code',
        id: 'code-prod',
        language: 'swift',
        filename: 'ImageCache.swift',
        content: `actor ImageCache {
    private var cache: [URL: UIImage] = [:]
    private var inFlight: [URL: Task<UIImage, Error>] = [:]

    func image(for url: URL) async throws -> UIImage {
        // Return cached image if available
        if let cached = cache[url] {
            return cached
        }

        // Coalesce duplicate requests
        if let existing = inFlight[url] {
            return try await existing.value
        }

        // Start a new download task
        let task = Task<UIImage, Error> {
            let (data, _) = try await URLSession.shared.data(from: url)
            guard let image = UIImage(data: data) else {
                throw ImageCacheError.invalidData
            }
            return image
        }

        inFlight[url] = task

        do {
            let image = try await task.value
            cache[url] = image
            inFlight.removeValue(forKey: url)
            return image
        } catch {
            inFlight.removeValue(forKey: url)
            throw error
        }
    }
}

enum ImageCacheError: Error {
    case invalidData
}`,
        caption: 'A realistic image cache that coalesces duplicate requests and prevents duplicate downloads.',
      },
      {
        type: 'heading',
        id: 'h-mistakes',
        level: 2,
        content: 'Common Mistakes',
      },
      {
        type: 'list',
        id: 'l-mistakes',
        ordered: false,
        items: [
          '**Assuming state doesn\'t change across await**: Actors are reentrant. Always re-read state after an `await` if the logic depends on consistency.',
          '**Storing non-`Sendable` types**: Actor-isolated state must be `Sendable` when crossing actor boundaries. The compiler will warn you.',
          '**Over-isolating**: Not everything needs to be an actor. Actors have overhead. Prefer value types where possible.',
          '**Calling actor methods from synchronous code**: You cannot call `await` in a synchronous context. Structure your concurrency boundaries carefully.',
        ],
      },
      {
        type: 'heading',
        id: 'h-vs-class',
        level: 2,
        content: 'Actor vs Class',
      },
      {
        type: 'table',
        id: 't-comparison',
        headers: ['', 'Class', 'Actor'],
        rows: [
          { cells: ['Reference type', '✓', '✓'] },
          { cells: ['Inheritance', '✓', '✗ (protocols only)'] },
          { cells: ['Mutable shared state safety', '✗ Manual', '✓ Automatic'] },
          { cells: ['External property access', 'Synchronous', 'Requires `await`'] },
          { cells: ['Thread safety', 'Manual locking', 'Compiler-enforced'] },
        ],
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        title: 'Common Interview Questions',
        questions: [
          'What is an actor in Swift, and why was it introduced?',
          'How does actor isolation work under the hood?',
          'What is actor reentrancy, and why does it matter?',
          'How is an actor different from a class?',
          'What is `@MainActor` and when should you use it?',
          'How does `Sendable` relate to actors?',
          'Can actors inherit from other actors?',
        ],
      },
      {
        type: 'relatedTopics',
        id: 'related',
        topicIds: ['concurrency-mainactor', 'concurrency-async-await', 'concurrency-sendable', 'concurrency-task'],
      },
    ],
  },

  // ─── async/await ───────────────────────────────────────────────────────────
  {
    id: 'concurrency-async-await',
    slug: 'async-await',
    title: 'async/await',
    category: 'concurrency',
    group: 'Swift Concurrency',
    description: 'Master structured concurrency fundamentals: async functions, await suspension points, and bridging from completion handlers.',
    difficulty: 'mid',
    estimatedTime: 10,
    language: 'swift',
    version: { language: 'Swift', version: '5.5', status: 'current', minimumVersion: '5.5', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['async', 'await', 'structured-concurrency', 'suspension'],
    relatedTopics: ['concurrency-actors', 'concurrency-task', 'concurrency-task-groups'],
    nextTopic: 'concurrency-actors',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: '`async/await` is Swift\'s syntax for writing asynchronous code that reads like synchronous code. An `async` function may suspend at any `await` point, freeing the thread to do other work until the awaited operation completes.',
      },
      {
        type: 'heading',
        id: 'h-what',
        level: 2,
        content: 'Writing an async function',
      },
      {
        type: 'code',
        id: 'code-basic',
        language: 'swift',
        content: `func fetchUser(id: String) async throws -> User {
    let url = URL(string: "https://api.example.com/users/\\(id)")!
    let (data, response) = try await URLSession.shared.data(from: url)

    guard (response as? HTTPURLResponse)?.statusCode == 200 else {
        throw NetworkError.badStatus
    }

    return try JSONDecoder().decode(User.self, from: data)
}`,
      },
      {
        type: 'heading',
        id: 'h-bridging',
        level: 2,
        content: 'Bridging from Completion Handlers',
      },
      {
        type: 'paragraph',
        id: 'p-bridging',
        content: 'When working with older APIs that use completion handlers, use `withCheckedThrowingContinuation` to bridge into the async world safely.',
      },
      {
        type: 'code',
        id: 'code-bridge',
        language: 'swift',
        content: `func fetchLegacyData() async throws -> Data {
    try await withCheckedThrowingContinuation { continuation in
        legacyAPI.fetchData { result in
            switch result {
            case .success(let data):
                continuation.resume(returning: data)
            case .failure(let error):
                continuation.resume(throwing: error)
            }
        }
    }
}`,
      },
      {
        type: 'callout',
        id: 'c-continuation',
        variant: 'warning',
        title: 'Resume exactly once',
        content: 'A continuation must be resumed exactly once. Resuming zero times leaks the task; resuming more than once crashes. Prefer `withCheckedContinuation` over `withUnsafeContinuation` during development — it will detect misuse.',
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What happens to the thread when a function awaits?',
          'What is the difference between `async throws` and `async`?',
          'How do you call an async function from synchronous code?',
          'What is a continuation and when would you use one?',
        ],
      },
      {
        type: 'relatedTopics',
        id: 'related',
        topicIds: ['concurrency-actors', 'concurrency-task', 'concurrency-task-groups'],
      },
    ],
  },

  // ─── Task ──────────────────────────────────────────────────────────────────
  {
    id: 'concurrency-task',
    slug: 'task',
    title: 'Task',
    category: 'concurrency',
    group: 'Swift Concurrency',
    description: 'Create and manage concurrent work units using Task. Understand task hierarchy, cancellation, and priority.',
    difficulty: 'mid',
    estimatedTime: 10,
    language: 'swift',
    version: { language: 'Swift', version: '5.5', status: 'current', minimumVersion: '5.5', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['task', 'cancellation', 'priority', 'structured-concurrency'],
    relatedTopics: ['concurrency-async-await', 'concurrency-task-groups', 'concurrency-actors'],
    previousTopic: 'concurrency-async-await',
    nextTopic: 'concurrency-task-groups',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'A `Task` creates a new concurrent unit of work that can run asynchronously. Tasks can be awaited for their result, cancelled, and carry priority and local values through the task tree.',
      },
      {
        type: 'code',
        id: 'code-task',
        language: 'swift',
        content: `// Unstructured task — runs independently
let task = Task {
    await loadUserProfile()
}

// Cancel if needed
task.cancel()

// Await result
let result = await task.value`,
      },
      {
        type: 'callout',
        id: 'c-cancel',
        variant: 'tip',
        title: 'Cooperative Cancellation',
        content: 'Cancelling a task doesn\'t stop it immediately. The task must check `Task.isCancelled` or call `try Task.checkCancellation()` at suitable points to cooperate with cancellation.',
      },
      {
        type: 'code',
        id: 'code-cancel',
        language: 'swift',
        content: `func processItems(_ items: [Item]) async throws {
    for item in items {
        try Task.checkCancellation()  // Throws CancellationError if cancelled
        await process(item)
    }
}`,
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What is the difference between structured and unstructured concurrency?',
          'How does task cancellation work in Swift?',
          'What is a detached task and when would you use one?',
          'How do task priorities affect scheduling?',
        ],
      },
      {
        type: 'relatedTopics',
        id: 'related',
        topicIds: ['concurrency-async-await', 'concurrency-task-groups', 'concurrency-actors'],
      },
    ],
  },

  // ─── MainActor ────────────────────────────────────────────────────────────
  {
    id: 'concurrency-mainactor',
    slug: 'mainactor',
    title: '@MainActor',
    category: 'concurrency',
    group: 'Swift Concurrency',
    description: 'Use @MainActor to guarantee UI updates run on the main thread in Swift 6 strict concurrency.',
    difficulty: 'senior',
    estimatedTime: 8,
    language: 'swift',
    version: { language: 'Swift', version: '6', status: 'current', minimumVersion: '5.5', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['mainactor', 'global-actors', 'ui-thread', 'swift6'],
    relatedTopics: ['concurrency-actors', 'concurrency-async-await', 'concurrency-sendable'],
    previousTopic: 'concurrency-actors',
    nextTopic: 'concurrency-sendable',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: '`@MainActor` is a global actor that guarantees code executes on the main thread. Mark types or functions with `@MainActor` to ensure UI updates always happen on the right thread — the compiler enforces this at compile time.',
      },
      {
        type: 'code',
        id: 'code-mainactor',
        language: 'swift',
        content: `@MainActor
class ProfileViewModel: ObservableObject {
    @Published var user: User?
    @Published var isLoading = false

    func loadProfile(id: String) async {
        isLoading = true
        do {
            // This background work runs off the main actor
            let fetchedUser = try await userService.fetch(id: id)
            // Returning to @MainActor context — safe to update UI
            self.user = fetchedUser
        } catch {
            print("Failed: \\(error)")
        }
        isLoading = false
    }
}`,
      },
      {
        type: 'callout',
        id: 'c-overhead',
        variant: 'tip',
        title: 'Only annotate what needs it',
        content: 'Don\'t annotate every class with `@MainActor`. Only types that directly own UI state should be isolated to the main actor. Pure data-layer types should be free of main actor isolation.',
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What is a global actor?',
          'How is @MainActor different from DispatchQueue.main.async?',
          'Can you call a @MainActor function from a background task?',
          'What happens to @MainActor code in Swift 6 strict concurrency?',
        ],
      },
      {
        type: 'relatedTopics',
        id: 'related',
        topicIds: ['concurrency-actors', 'concurrency-sendable'],
      },
    ],
  },

  // ─── Sendable ─────────────────────────────────────────────────────────────
  {
    id: 'concurrency-sendable',
    slug: 'sendable',
    title: 'Sendable',
    category: 'concurrency',
    group: 'Swift Concurrency',
    description: 'Understand the Sendable protocol and how it prevents unsafe data sharing across concurrency boundaries.',
    difficulty: 'senior',
    estimatedTime: 8,
    language: 'swift',
    version: { language: 'Swift', version: '6', status: 'current', minimumVersion: '5.7', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['sendable', 'concurrency', 'data-races', 'swift6'],
    relatedTopics: ['concurrency-actors', 'concurrency-mainactor', 'concurrency-task'],
    previousTopic: 'concurrency-mainactor',
    nextTopic: 'concurrency-task-groups',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: '`Sendable` is a protocol that marks a type as safe to share across concurrency boundaries. Value types like structs and enums are implicitly `Sendable` if all their stored properties are also `Sendable`. Classes require explicit conformance with careful implementation.',
      },
      {
        type: 'code',
        id: 'code-sendable',
        language: 'swift',
        content: `// ✓ Struct with Sendable properties — automatically Sendable
struct User: Sendable {
    let id: UUID
    let name: String
}

// ✓ Final class with only immutable state — can be Sendable
final class Configuration: Sendable {
    let apiKey: String
    let timeout: TimeInterval
    init(apiKey: String, timeout: TimeInterval) {
        self.apiKey = apiKey
        self.timeout = timeout
    }
}

// ✗ Class with mutable state — NOT Sendable
// class Cache: Sendable { ... }  // Compiler error`,
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'medium',
        questions: [
          'What does Sendable mean and why does it matter?',
          'Which types are implicitly Sendable?',
          'What is @unchecked Sendable and when is it appropriate?',
          'How does Sendable relate to actors?',
        ],
      },
      {
        type: 'relatedTopics',
        id: 'related',
        topicIds: ['concurrency-actors', 'concurrency-mainactor'],
      },
    ],
  },

  // ─── TaskGroup ────────────────────────────────────────────────────────────
  {
    id: 'concurrency-task-groups',
    slug: 'task-groups',
    title: 'TaskGroup & Structured Concurrency',
    category: 'concurrency',
    group: 'Swift Concurrency',
    description: 'Run many concurrent tasks and collect results using TaskGroup, with automatic error propagation and cancellation.',
    difficulty: 'senior',
    estimatedTime: 14,
    language: 'swift',
    version: { language: 'Swift', version: '5.5', status: 'current', minimumVersion: '5.5', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['task-group', 'structured-concurrency', 'cancellation', 'parallel'],
    relatedTopics: ['concurrency-task', 'concurrency-async-await', 'concurrency-actors'],
    previousTopic: 'concurrency-sendable',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: '`TaskGroup` lets you run multiple concurrent tasks and collect their results. It provides structured concurrency guarantees: if any child task throws, the group automatically cancels remaining tasks.',
      },
      {
        type: 'code',
        id: 'code-group',
        language: 'swift',
        content: `func fetchAllUsers(ids: [String]) async throws -> [User] {
    try await withThrowingTaskGroup(of: User.self) { group in
        for id in ids {
            group.addTask {
                try await userService.fetch(id: id)
            }
        }

        var users: [User] = []
        for try await user in group {
            users.append(user)
        }
        return users
    }
}`,
        caption: 'Fetching multiple users concurrently, collecting results as they complete.',
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'How does a TaskGroup differ from creating independent Tasks?',
          'What happens when one child task in a group throws an error?',
          'How do you limit concurrency within a TaskGroup?',
          'When would you use withTaskGroup vs withThrowingTaskGroup?',
        ],
      },
      {
        type: 'relatedTopics',
        id: 'related',
        topicIds: ['concurrency-task', 'concurrency-async-await'],
      },
    ],
  },
];
