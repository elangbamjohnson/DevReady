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
    description: 'Master structured concurrency fundamentals: async/await execution semantics, suspension points, heap-allocated coroutines, continuation bridging, and thread safety.',
    difficulty: 'senior',
    estimatedTime: 15,
    language: 'swift',
    version: { language: 'Swift', version: '6', status: 'current', minimumVersion: '5.5', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['async', 'await', 'structured-concurrency', 'suspension', 'continuations', 'cooperative-pool'],
    furtherReading: [
      {
        title: 'Concurrency — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency',
        source: 'swift-org',
      },
      {
        title: 'Swift Standard Library — Concurrency',
        url: 'https://developer.apple.com/documentation/swift/concurrency',
        source: 'apple-developer',
      },
    ],
    relatedTopics: ['concurrency-actors', 'concurrency-task', 'concurrency-task-groups'],
    previousTopic: 'concurrency-actors',
    nextTopic: 'concurrency-task',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: '`async/await` allows you to write asynchronous code that reads linearly from top to bottom without blocking operating system threads. When an `async` function reaches an `await` suspension point, it yields its underlying thread back to the cooperative thread pool while keeping its state alive in a heap-allocated coroutine frame. Once the awaited work finishes, the runtime schedules the continuation onto an available thread to resume execution.',
      },
      {
        type: 'heading',
        id: 'h-why',
        level: 2,
        content: 'Why does it matter?',
        },
      {
        type: 'paragraph',
        id: 'p-why-intro',
        content: "Asynchronous programming is at the core of iOS engineering — from network requests and database transactions to disk I/O and image decoding. Prior to Swift 5.5, asynchronous code relied almost exclusively on Grand Central Dispatch (GCD) and completion handlers. While functional, that legacy model suffered from deep structural flaws that modern Swift Concurrency was specifically designed to eliminate.",
      },
      {
        type: 'paragraph',
        id: 'p-why-pyramid',
        content: '**The Pyramid of Doom & Inverted Control:** When chaining multiple asynchronous operations (such as authenticating a user, fetching their profile, and downloading their avatar), completion handlers required nesting closures 3 to 5 levels deep. The code drifted rapidly to the right, and standard Swift control flow constructs like `guard`, `for` loops, `defer`, and `try/catch` became nearly impossible to use cleanly.',
      },
      {
        type: 'paragraph',
        id: 'p-why-errors',
        content: '**The Silent Error-Handling Trap:** Escaping completion handlers must be invoked manually on *every possible code path*. If a developer missed invoking the completion handler in a single early `guard let ... else { return }` exit, the calling task would hang silently forever — leaving UI activity spinners spinning indefinitely and leaking memory.',
      },
      {
        type: 'paragraph',
        id: 'p-why-thread-explosion',
        content: '**Thread Explosion & Cache Thrashing:** Grand Central Dispatch queues spawn a new kernel thread whenever existing threads block on locks or I/O. In concurrent queues under load, GCD can easily create 100+ operating system threads. Each thread incurs a 512KB to 1MB stack memory penalty, and the CPU spends more time context-switching between threads than executing application logic.',
      },
      {
        type: 'paragraph',
        id: 'p-why-solution',
        content: '**The Structured Concurrency Revolution:** `async/await` replaces callbacks with linear, compiler-verified execution. Functions either return their value or throw an error. The compiler guarantees that execution cannot simply "disappear" without returning, and execution is managed over a cooperative thread pool bounded to the physical CPU core count.',
      },
      {
        type: 'heading',
        id: 'h-how',
        level: 2,
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        id: 'p-how-suspension-title',
        content: '**The Suspension Point (`await`)**',
      },
      {
        type: 'paragraph',
        id: 'p-how-suspension-desc',
        content: 'An `await` keyword designates a **potential suspension point**. Crucially, suspending is not blocking: while a traditional synchronous call like `Thread.sleep` or `DispatchSemaphore.wait` keeps an OS thread hostage (idle and consuming resources), `await` tells the Swift runtime: *"Pause this function here, free up the thread to run other work, and resume this function when my result is ready."*',
      },
      {
        type: 'paragraph',
        id: 'p-how-frames-title',
        content: '**Stack Frames vs. Heap-Allocated Async Frames**',
      },
      {
        type: 'paragraph',
        id: 'p-how-frames-desc-1',
        content: 'To understand how suspension is possible without a thread, look at where memory lives. In synchronous code, local variables live on the thread\'s call stack. If the thread were to return or switch contexts, that stack frame would be destroyed.',
      },
      {
        type: 'paragraph',
        id: 'p-how-frames-desc-2',
        content: 'Swift `async` functions are compiled as **coroutines**. Instead of storing local variables exclusively on the thread stack, the Swift compiler allocates an **async frame on the heap**. When an async function suspends at `await`, its local state, parameters, and current instruction pointer remain safely preserved in the heap frame, allowing the physical OS thread to immediately service other tasks.',
      },
      {
        type: 'paragraph',
        id: 'p-how-statemachine-title',
        content: '**Continuations as State Machines**',
      },
      {
        type: 'paragraph',
        id: 'p-how-statemachine-desc',
        content: 'Under the hood, the Swift compiler splits an `async` function at every `await` into discrete code segments, compiling the function into a state machine. When an asynchronous operation finishes, the runtime invokes the saved continuation, matching the next state and resuming execution with the returned value.',
      },
      {
        type: 'paragraph',
        id: 'p-how-coop-title',
        content: '**The Cooperative Thread Pool**',
      },
      {
        type: 'paragraph',
        id: 'p-how-coop-desc',
        content: "Swift Concurrency is designed so the system-wide cooperative thread pool targets **no more worker threads than there are CPU cores** (e.g., roughly 6 threads on a 6-core iPhone A-series chip). This isn't an absolute hard ceiling — the runtime can add threads in rare edge cases to avoid deadlock when blocking is detected — but as long as async code avoids blocking calls (see the Golden Rules below), this design keeps the thread count fixed, eliminates thread explosion, prevents excessive kernel context switches, and keeps CPU L1/L2 caches hot.",
      },
      {
        type: 'heading',
        id: 'h-execution-timeline',
        level: 2,
        content: 'Execution Timeline & Non-Blocking Suspension',
      },
      {
        type: 'paragraph',
        id: 'p-timeline-intro',
        content: 'Observe how a synchronous UI caller bridges into an async function and how execution yielding occurs in practice:',
      },
      {
        type: 'code',
        id: 'code-timeline-example',
        language: 'swift',
        filename: 'WeatherService.swift',
        content: `func fetchForecast() async throws -> String {
    print("  [2] fetchForecast started on worker thread")
    
    // Task.sleep yields the thread cooperatively — no blocking occurs
    try await Task.sleep(for: .milliseconds(500)) // 0.5s suspension
    
    print("  [4] fetchForecast resumed after suspension")
    return "Sunny, 74°F"
}

@MainActor
func onRefreshButtonTapped() {
    print("[1] Button tapped on Main Thread")
    
    // Bridge from synchronous context into an unstructured Task
    Task {
        do {
            let weather = try await fetchForecast()
            print("[5] UI updated with: \\(weather)")
        } catch {
            print("[5] Fetch failed: \\(error)")
        }
    }
    
    print("[3] Synchronous handler finished immediately — UI never froze!")
}

// Console Output Order:
// [1] Button tapped on Main Thread
// [3] Synchronous handler finished immediately — UI never froze!
//   [2] fetchForecast started on worker thread
//   (0.5s pause: worker thread is freed to run other tasks)
//   [4] fetchForecast resumed after suspension
// [5] UI updated with: Sunny, 74°F`,
        caption: 'Notice that step [3] runs BEFORE step [4]. The synchronous caller returns instantly, while the Task runs concurrently on the cooperative pool.',
      },
      {
        type: 'heading',
        id: 'h-syntax',
        level: 2,
        content: 'Sequential vs. Concurrent Execution (`async let`)',
      },
      {
        type: 'paragraph',
        id: 'p-syntax-intro',
        content: "By default, consecutive `await` statements execute **sequentially**. If you have independent operations that do not depend on one another, sequential `await` introduces artificial latency. Swift provides `async let` to initiate child tasks that run concurrently in parallel:",
      },
      {
        type: 'code',
        id: 'code-sequential-vs-concurrent',
        language: 'swift',
        filename: 'DashboardLoader.swift',
        content: `struct Dashboard {
    let profile: Profile
    let notifications: [Notification]
}

// ✗ Sequential: Takes Total Time = Time(Profile) + Time(Notifications)
func loadSequential() async throws -> Dashboard {
    let profile = try await fetchProfile()              // Waits ~200ms
    let notifications = try await fetchNotifications()  // Waits ~300ms
    return Dashboard(profile: profile, notifications: notifications) // Total: ~500ms
}

// ✓ Concurrent: Takes Total Time = max(Time(Profile), Time(Notifications))
func loadConcurrent() async throws -> Dashboard {
    async let profileTask = fetchProfile()              // Starts in background
    async let notificationsTask = fetchNotifications()  // Starts in parallel
    
    // Await both results together when ready
    let (profile, notifications) = try await (profileTask, notificationsTask)
    return Dashboard(profile: profile, notifications: notifications) // Total: ~300ms
}`,
        caption: 'async let initiates concurrent child tasks, cutting overall latency to the duration of the slowest request.',
      },
      {
        type: 'paragraph',
        id: 'p-syntax-guide',
        content: "**Rule of thumb:** Use sequential `await` when the second request requires an argument computed by the first (e.g., fetch authentication token, then fetch user profile). Use `async let` when requests are independent and known in advance. For dynamic collections of unknown size, use `TaskGroup` instead.",
      },
      {
        type: 'heading',
        id: 'h-bridging',
        level: 2,
        content: 'Bridging Legacy Code with Continuations',
      },
      {
        type: 'paragraph',
        id: 'p-bridging-intro',
        content: 'Existing iOS codebases and Apple framework APIs (like `CoreLocation`, `AVFoundation`, or third-party SDKs) often rely on completion handlers. Swift Concurrency provides `withCheckedContinuation` and `withCheckedThrowingContinuation` to bridge callback-based APIs into clean, modern `async` interfaces.',
      },
      {
        type: 'paragraph',
        id: 'p-bridging-rule-title',
        content: '**The Cardinal Invariant: Resume Exactly Once**',
      },
      {
        type: 'list',
        id: 'l-bridging-invariants',
        ordered: false,
        items: [
          '**Resume Zero Times:** If your callback logic fails to call `continuation.resume(...)`, the calling `Task` remains suspended in memory forever, leaking its coroutine frame and associated resources.',
          '**Resume More Than Once:** Calling `continuation.resume(...)` multiple times causes memory corruption and an immediate fatal runtime crash.',
        ],
      },
      {
        type: 'code',
        id: 'code-continuation-bridge',
        language: 'swift',
        filename: 'LocationManagerBridge.swift',
        caption: 'Wrapping a legacy callback-based location request into an async throwing function',
        content: `import CoreLocation

enum LocationError: Error {
    case permissionDenied
    case failedToLocate
}

// Legacy API with completion handler
func legacyGetCoordinates(completion: @escaping (Result<CLLocationCoordinate2D, LocationError>) -> Void) {
    // ... triggers location manager delegates ...
}

// Modern async wrapper using checked continuation
func fetchCoordinates() async throws -> CLLocationCoordinate2D {
    try await withCheckedThrowingContinuation { continuation in
        legacyGetCoordinates { result in
            switch result {
            case .success(let coordinates):
                continuation.resume(returning: coordinates)
            case .failure(let error):
                continuation.resume(throwing: error)
            }
        }
    }
}

// Clean caller syntax:
Task {
    do {
        let coord = try await fetchCoordinates()
        print("User location: \\(coord.latitude), \\(coord.longitude)")
    } catch {
        print("Failed to acquire location: \\(error)")
    }
}`,
      },
      {
        type: 'paragraph',
        id: 'p-checked-vs-unsafe',
        content: '**`withCheckedContinuation` vs. `withUnsafeContinuation`:** `CheckedContinuation` performs runtime checks to ensure the continuation is resumed exactly once, logging an actionable diagnostic message if breached. `UnsafeContinuation` omits these checks for zero-overhead performance in hot loops, but undefined behavior will result if misused.',
      },
      {
        type: 'heading',
        id: 'h-comparison',
        level: 2,
        content: 'Grand Central Dispatch vs. Swift Concurrency',
      },
      {
        type: 'table',
        id: 't-gcd-vs-async',
        caption: 'Architectural comparison between legacy GCD and modern Swift Concurrency',
        headers: ['Dimension', 'Grand Central Dispatch (GCD)', 'Swift Concurrency (async/await)'],
        rows: [
          { cells: ['Execution Flow', 'Nested escaping closures & DispatchGroup', 'Linear, top-to-bottom coroutines'] },
          { cells: ['Threading Model', 'Unbounded worker threads (Thread explosion risk)', 'Cooperative pool strictly bounded to CPU core count'] },
          { cells: ['Suspension Mechanism', 'Thread blocks and sleeps (e.g. semaphore wait)', 'Thread yields to pool; function state saved to heap'] },
          { cells: ['Memory Footprint', '512KB - 1MB OS stack allocated per thread', 'Lightweight heap async frames (kilobytes)'] },
          { cells: ['Error Handling', 'Manual Result<Success, Failure> dispatching', 'Native try / catch since Swift 5.5; typed throws (`throws(SpecificError)`) added in Swift 6'] },
          { cells: ['Cancellation', 'Manual boolean flags or custom cancel tokens', 'Hierarchical, cooperative cancellation propagation'] },
          { cells: ['Thread Safety', 'Manual synchronization (serial queues, locks)', 'Compiler-enforced Actor isolation & Sendable (Swift 6)'] },
        ],
      },
      {
        type: 'heading',
        id: 'h-pitfalls',
        level: 2,
        content: 'Common Pitfalls & Golden Rules',
      },
      {
        type: 'list',
        id: 'l-pitfalls',
        ordered: false,
        items: [
          '**Blocking the Cooperative Thread Pool:** Never call synchronous blocking functions (e.g., `Thread.sleep()`, `DispatchSemaphore.wait()`, or synchronous database reads) inside an async context. Doing so starves one of the precious core worker threads. If all $N$ threads block, the entire app freezes in a cooperative deadlock.',
          '**Assuming Thread Consistency Across `await`:** Swift tasks are not bound to specific threads. Code before an `await` might run on Thread 3, and code after the `await` might resume on Thread 5. Never rely on thread-local storage or assume locks persist across suspension points.',
          '**Retain Cycles Inside Unstructured Tasks:** When launching an unstructured `Task { [weak self] in ... }`, capturing `self` strongly inside an async closure can keep a view controller alive longer than intended. Use `[weak self]` when the Task should not outlive the view.',
          '**Ignoring Task Cancellation:** Cancellation in Swift is strictly cooperative. Long-running asynchronous loops or heavy computations must regularly call `try Task.checkCancellation()` or evaluate `Task.isCancelled` to abort unnecessary work.',
        ],
      },
      {
        type: 'paragraph',
        id: 'p-pattern-title',
        content: "**The pattern you'll use 99% of the time:**",
      },
      {
        type: 'code',
        id: 'code-production-pattern',
        language: 'swift',
        filename: 'UserProfileViewModel.swift',
        caption: 'A production ViewModel coordinating async fetching, cancellation, and MainActor UI updates',
        content: `@MainActor
final class UserProfileViewModel: ObservableObject {
    @Published private(set) var user: User?
    @Published private(set) var isLoading = false
    @Published private(set) var errorMessage: String?
    
    private let service: UserServiceProtocol
    private var loadTask: Task<Void, Never>?
    
    init(service: UserServiceProtocol = UserService()) {
        self.service = service
    }
    
    func refreshProfile() {
        // Cancel any pending in-flight request before starting a new one
        loadTask?.cancel()
        
        loadTask = Task { [weak self] in
            guard let self else { return }
            self.isLoading = true
            self.errorMessage = nil
            
            do {
                // Cooperative suspension point on background thread pool
                let profile = try await self.service.fetchProfile()
                
                // Check cancellation before committing state
                try Task.checkCancellation()
                
                // Updates safely modify @MainActor published properties
                self.user = profile
            } catch is CancellationError {
                // Task was cancelled cleanly — no error state needed
            } catch {
                self.errorMessage = error.localizedDescription
            }
            
            self.isLoading = false
        }
    }
    
    deinit {
        loadTask?.cancel()
    }
}`,
      },
      {
        type: 'callout',
        id: 'c-thread-blocking',
        variant: 'warning',
        title: 'Critical Warning: Never Block Cooperative Threads',
        content: `Swift\'s concurrency runtime allocates a fixed pool of threads matching your device\'s CPU cores (typically 6 threads on modern iPhones). If you call blocking APIs such as \`DispatchSemaphore.wait()\`, \`pthread_mutex_lock()\`, or synchronous I/O inside an \`async\` function, you permanently tie up a worker thread. If multiple tasks do this simultaneously, the pool becomes completely exhausted — leading to complete application hang and watchdog crashes.

Always use asynchronous primitives: \`await Task.sleep()\` instead of \`Thread.sleep()\`, and \`actor\` isolation instead of semaphores or mutexes.`,
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        title: 'Senior & Staff Interview Questions',
        questions: [
          'What happens to the operating system thread when an async function encounters an await suspension point?',
          'How does Swift Concurrency prevent the thread explosion problem that frequently affected Grand Central Dispatch?',
          'What is an async frame, and how does its allocation differ from a conventional synchronous call stack frame?',
          'Can code before and after an await statement execute on different threads? Explain why and under what conditions.',
          'What is the cardinal invariant of CheckedContinuation, and what happens at runtime if it is violated?',
          'How does async let differ from sequential await calls in terms of scheduling, concurrency, and error handling?',
          'Why is calling Thread.sleep() or DispatchSemaphore.wait() considered a catastrophic error inside an async function?',
          'How does Swift 6 strict concurrency enforce data race safety across await suspension points?',
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
    estimatedTime: 16,
    language: 'swift',
    version: { language: 'Swift', version: '6', status: 'current', minimumVersion: '5.5', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['task', 'cancellation', 'priority', 'structured-concurrency', 'detached', 'task-local', 'sendable'],
    furtherReading: [
      {
        title: 'Task — Swift Standard Library',
        url: 'https://developer.apple.com/documentation/swift/task',
        source: 'apple-developer',
      },
      {
        title: 'TaskPriority — Swift Standard Library',
        url: 'https://developer.apple.com/documentation/swift/taskpriority',
        source: 'apple-developer',
      },
      {
        title: 'Concurrency — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency',
        source: 'swift-org',
      },
    ],
    relatedTopics: ['concurrency-async-await', 'concurrency-task-groups', 'concurrency-actors'],
    previousTopic: 'concurrency-async-await',
    nextTopic: 'concurrency-task-groups',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'A `Task` creates a new, independently-scheduled unit of asynchronous work. Every task belongs to one of two families: **structured** (created with `async let` or a `TaskGroup`, and bound to the lifetime of its parent) or **unstructured** (created with `Task { }` or `Task.detached { }`, and free to outlive the scope that created it). Tasks carry a priority, participate in cooperative cancellation, and can share task-local values down the task tree.',
      },
      {
        type: 'heading',
        id: 'h-structured',
        level: 2,
        content: 'Structured vs. Unstructured Concurrency',
      },
      {
        type: 'paragraph',
        id: 'p-structured-intro',
        content: "\"Structured concurrency\" means a child task's lifetime is tied to the scope that created it. With `async let` or a `TaskGroup`, the compiler guarantees the parent can't return until all its children finish, cancelling the parent automatically cancels every child, and an error thrown by a child automatically propagates to the parent. `Task { }` and `Task.detached { }` opt **out** of all of this — they're 'unstructured' because nothing ties their lifetime, cancellation, or errors back to the code that created them unless you do it yourself.",
      },
      {
        type: 'table',
        id: 't-task-comparison',
        caption: 'How the three ways of starting work differ',
        headers: ['Dimension', 'Structured (async let / TaskGroup)', 'Unstructured (Task { })', 'Detached (Task.detached { })'],
        rows: [
          { cells: ['Lifetime', "Bound to the enclosing scope — can't outlive it", 'Independent — can outlive the creating scope', 'Independent — can outlive the creating scope'] },
          { cells: ['Cancellation', 'Propagates automatically when the parent is cancelled', 'Must call `.cancel()` manually', 'Must call `.cancel()` manually'] },
          { cells: ['Waiting', 'Parent implicitly awaits all children before returning', 'Not awaited unless you explicitly `await task.value`', 'Not awaited unless you explicitly `await task.value`'] },
          { cells: ['Inherits from creator', 'Actor isolation, priority, task-local values', 'Actor isolation, priority, task-local values', 'Nothing — runs with default priority, no actor isolation, no task locals'] },
        ],
      },
      {
        type: 'heading',
        id: 'h-creating',
        level: 2,
        content: 'Creating Work: Task vs. Task.detached',
      },
      {
        type: 'paragraph',
        id: 'p-creating-intro',
        content: "`Task { }` is what you reach for almost every time you bridge from synchronous code into `async` code — a button tap, `viewDidLoad`, a delegate callback. Because it inherits the priority, actor context, and task-local values of whoever created it, work started this way behaves predictably inside your app. `Task.detached { }` throws all of that inheritance away, which is why it should be rare in application code — reach for it only when the work must be provably independent of where it was started, such as a low-priority analytics flush that must not run on the Main Actor and must not inherit a caller's elevated priority.",
      },
      {
        type: 'code',
        id: 'code-task',
        language: 'swift',
        content: `// Unstructured task — its lifetime is independent of this function.
// It keeps running even after this function returns.
let task = Task {
    await loadUserProfile()
}

// Somewhere later, in response to an event (e.g. the user navigating away):
// task.cancel()

// Await its result whenever you actually need it:
let profile = await task.value`,
      },
      {
        type: 'code',
        id: 'code-detached',
        language: 'swift',
        content: `// Task.detached inherits NOTHING from the calling context:
// no actor isolation, no priority, no task-local values.
Task.detached(priority: .background) {
    // Runs fully independently — safe for work that must not
    // inherit a caller's Main Actor isolation or elevated priority.
    await flushAnalyticsBuffer()
}`,
      },
      {
        type: 'heading',
        id: 'h-cancellation',
        level: 2,
        content: 'Cooperative Cancellation',
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
        type: 'paragraph',
        id: 'p-cancel-followup',
        content: "This is exactly why the comparison table above matters in practice: cancelling a `TaskGroup` automatically cancels every child inside it, but cancelling or dismissing the view that created a `Task { }` does **not** automatically cancel that task — it's unstructured. That's why production code (see the `UserProfileViewModel` pattern in the async/await topic) stores the `Task` handle and calls `.cancel()` on it explicitly, in `deinit` or before starting a new request.",
      },
      {
        type: 'paragraph',
        id: 'p-swiftui-task-modifier',
        content: "Don't confuse this with SwiftUI's `.task { }` **view modifier** — despite the similar name, that one *is* automatically cancelled when the view it's attached to disappears. `Task { }` the initializer and `.task { }` the view modifier look alike but behave differently; interviewers use this exact mix-up as a quick way to check real understanding.",
      },
      {
        type: 'heading',
        id: 'h-priority',
        level: 2,
        content: 'Task Priority & Priority Escalation',
      },
      {
        type: 'paragraph',
        id: 'p-priority-framing',
        content: "Everything above this point — Task vs. Task.detached, cancellation — is what you'll use day to day. This section and the Sendable section that follows go deeper into Swift 6 concurrency internals and come up more in senior/staff interviews specifically. If you're still getting comfortable with the fundamentals, it's fine to skim these on a first pass and come back once Task creation and cancellation feel natural.",
      },
      {
        type: 'paragraph',
        id: 'p-priority-intro',
        content: "Every task has a `TaskPriority`: `.high` (an alias for `.userInitiated`), `.medium` (the default), `.low` (an alias for `.utility`), or `.background`. A `Task { }` inherits its priority from the context that created it unless you specify one explicitly. The runtime also performs **priority escalation**: if a high-priority task ends up `await`-ing the result of a lower-priority task, the lower task's priority is temporarily boosted for as long as it's being waited on. This prevents priority inversion — a low-priority task holding up a high-priority one indefinitely.",
      },
      {
        type: 'code',
        id: 'code-priority',
        language: 'swift',
        content: `// TaskPriority reflects whichever task is currently running —
// read it from inside a task, not from an unrelated call site.
Task(priority: .utility) {
    print(Task.currentPriority) // .utility — this task's own priority
}

Task(priority: .background) {
    print(Task.currentPriority) // .background — a different task, different priority
}`,
      },
      {
        type: 'heading',
        id: 'h-task-locals',
        level: 2,
        content: 'Task-Local Values',
      },
      {
        type: 'paragraph',
        id: 'p-task-locals-intro',
        content: "`@TaskLocal` lets you bind a value that flows implicitly down the task tree — into structured children automatically, and into `Task { }` because it inherits its creator's task locals — without threading it through every function signature. It's commonly used for things like a request ID that every log line inside a network call should include.",
      },
      {
        type: 'code',
        id: 'code-task-locals',
        language: 'swift',
        content: `enum RequestContext {
    @TaskLocal static var requestID: String?
}

func handleRequest() async {
    await RequestContext.$requestID.withValue(UUID().uuidString) {
        await performWork()
    }
}

func performWork() async {
    // Reads the value bound by whichever caller set it — no parameter needed.
    print("Handling request: \\(RequestContext.requestID ?? "unknown")")
}`,
      },
      {
        type: 'heading',
        id: 'h-sendable',
        level: 2,
        content: 'Swift 6: Sendable Closures',
      },
      {
        type: 'callout',
        id: 'c-sendable',
        variant: 'warning',
        title: 'Captured Values Must Be Sendable',
        content: "Under Swift 6's strict concurrency checking, the closure you pass to `Task { }` or `Task.detached { }` is implicitly `@Sendable`. Any value it captures — including `self` — must conform to `Sendable`, or the compiler raises a data-race error at compile time. This is why `Task { [weak self] in ... }` matters for a class-based `ObservableObject`: capturing a non-Sendable reference type safely requires either `@MainActor` isolation on the whole class or explicit synchronization.",
      },
      {
        type: 'heading',
        id: 'h-task-pitfalls',
        level: 2,
        content: 'Common Pitfalls & Golden Rules',
      },
      {
        type: 'list',
        id: 'l-task-pitfalls',
        ordered: false,
        items: [
          "**Assuming a Task outlives nothing:** a `Task { }` can and does outlive the code that created it. Dismissing a view doesn't cancel it — you have to call `.cancel()` yourself.",
          "**Confusing Task { } with SwiftUI's .task { } modifier:** only the view modifier auto-cancels when its view disappears. The initializer never does.",
          "**Reaching for Task.detached by default:** it drops actor isolation, priority, and task-local values. Use plain `Task { }` unless the work must be provably independent of its creator.",
          "**Treating priority as a hard guarantee:** priority affects scheduling order on the cooperative pool, and the runtime can escalate it — it's not a real-time guarantee of when work runs.",
          "**Forgetting Task.checkCancellation() inside loops:** cancellation is cooperative. A task that never checks `isCancelled` or calls `checkCancellation()` never actually stops.",
        ],
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What is the difference between structured and unstructured concurrency?',
          'How does task cancellation work in Swift?',
          'What is a detached task and when would you use one?',
          'How do task priorities affect scheduling, and what is priority escalation?',
          "If you cancel a TaskGroup's parent task, what happens to its children? Does the same thing happen to a Task { } created inside that parent?",
          'What are task-local values, and how do they differ from passing a value as a regular function parameter?',
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
    version: { language: 'Swift', version: '6', status: 'current', minimumVersion: '5.5', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['task-group', 'structured-concurrency', 'cancellation', 'parallel'],
    furtherReading: [
      {
        title: 'TaskGroup — Swift Standard Library',
        url: 'https://developer.apple.com/documentation/swift/taskgroup',
        source: 'apple-developer',
      },
      {
        title: 'ThrowingTaskGroup — Swift Standard Library',
        url: 'https://developer.apple.com/documentation/swift/throwingtaskgroup',
        source: 'apple-developer',
      },
      {
        title: 'Concurrency — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency',
        source: 'swift-org',
      },
    ],
    relatedTopics: ['concurrency-task', 'concurrency-async-await', 'concurrency-actors'],
    previousTopic: 'concurrency-task',
    nextTopic: 'concurrency-actors',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: '`TaskGroup` lets you run many tasks at the same time and collect their results. If a child task throws, and you let that error escape the group (instead of catching it yourself), Swift cancels every task that hasn\'t finished yet. But if you catch the error inside your own code, nothing is cancelled automatically — you\'d need to call `group.cancelAll()` yourself.',
      },
      {
        type: 'heading',
        id: 'h-two-versions',
        level: 2,
        content: 'Two Versions: withTaskGroup and withThrowingTaskGroup',
      },
      {
        type: 'paragraph',
        id: 'p-two-versions',
        content: "There are two versions of this. Use `withTaskGroup` when none of your tasks can throw an error. Use `withThrowingTaskGroup` when they can. Both work the same way: add tasks with `group.addTask { }`, then read results with `for await` (no errors) or `for try await` (can throw).",
      },
      {
        type: 'code',
        id: 'code-group-nonthrowing',
        language: 'swift',
        caption: 'Non-throwing example: fetching a score for each player',
        content: `func fetchAllScores(for players: [Player]) async -> [Int] {
    await withTaskGroup(of: Int.self) { group in
        for player in players {
            group.addTask {
                await fetchScore(for: player)
            }
        }

        var scores: [Int] = []
        for await score in group {
            scores.append(score)
        }
        return scores
    }
}`,
      },
      {
        type: 'paragraph',
        id: 'p-throwing-intro',
        content: "Here's the same idea, but each task can throw an error:",
      },
      {
        type: 'code',
        id: 'code-group',
        language: 'swift',
        caption: 'Throwing example: fetching a user for each id',
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
      },
      {
        type: 'heading',
        id: 'h-what-happens-on-throw',
        level: 2,
        content: 'What Happens When a Task Throws?',
      },
      {
        type: 'paragraph',
        id: 'p-what-happens-on-throw',
        content: "When a task throws and you read results with `for try await`, that error comes out of the loop the moment you reach it. If you don't catch it, it keeps going and exits `withThrowingTaskGroup` entirely. The moment that happens, Swift automatically cancels every task in the group that hasn't finished yet. If you'd rather keep the other tasks running, catch the error inside the loop instead of letting it escape — in that case nothing is cancelled unless you call `group.cancelAll()` yourself.",
      },
      {
        type: 'callout',
        id: 'c-cancelall',
        variant: 'tip',
        title: 'group.cancelAll()',
        content: 'Call this whenever you want to stop the rest of the group early yourself — for example, as soon as you find the one result you were looking for.',
      },
      {
        type: 'heading',
        id: 'h-limiting-concurrency',
        level: 2,
        content: 'Limiting Concurrency',
      },
      {
        type: 'paragraph',
        id: 'p-limiting-concurrency',
        content: "If you have thousands of items, adding a task for every single one at once can use too much memory. The fix: only keep a fixed number of tasks running. Start a few, and every time one finishes, start the next one.",
      },
      {
        type: 'code',
        id: 'code-limiting-concurrency',
        language: 'swift',
        caption: 'Only 5 tasks run at once, no matter how many items there are',
        content: `func processAll(_ items: [Item], maxConcurrent: Int = 5) async throws {
    try await withThrowingTaskGroup(of: Void.self) { group in
        var index = 0

        // Start the first batch
        while index < items.count && index < maxConcurrent {
            let item = items[index]
            group.addTask { try await process(item) }
            index += 1
        }

        // Every time one finishes, start the next one
        while try await group.next() != nil {
            if index < items.count {
                let item = items[index]
                group.addTask { try await process(item) }
                index += 1
            }
        }
    }
}`,
      },
      {
        type: 'callout',
        id: 'c-sendable-reminder',
        variant: 'info',
        title: 'Sendable, Same as Task { }',
        content: "Just like `Task { }`, the closure you pass to `group.addTask { }` must be `@Sendable` under Swift 6. See the Sendable section in the Task topic if you need a refresher.",
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
        topicIds: ['concurrency-task', 'concurrency-async-await', 'concurrency-actors'],
      },
    ],
  },
];
