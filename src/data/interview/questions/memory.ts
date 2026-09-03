import type { InterviewQuestion } from '@/types/interview';

export const memoryQuestions: InterviewQuestion[] = [
  {
    id: 'interview.memory.weak_vs_unowned.001',
    question: 'What is the precise difference between `weak` and `unowned` in Swift, and when should you choose each?',
    domainId: 'debugging',
    moduleId: 'debugging-memory-mod',
    topicId: 'memory-weak-unowned',
    difficulty: 'intermediate',
    type: 'comparison',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Memory', 'ARC', 'weak', 'unowned', 'Safety'],
    modelAnswer: 'Both `weak` and `unowned` allow referencing an object without incrementing its strong reference count. `weak` creates an optional reference tracked by the ARC runtime’s side table (weak table); when the referenced object deallocates, the pointer is automatically zeroed (mutated to `nil`). `unowned` creates a non-optional reference that assumes the referenced object will always outlive the reference. If accessed after the object deallocates, `unowned(safe)` triggers a deterministic runtime crash, while `unowned(unsafe)` accesses dangling pointers (undefined memory corruption). Choose `weak` whenever the target can become nil; choose `unowned` only when lifetimes are strictly coupled (e.g. parent-child where child cannot outlive parent).',
    keyPoints: [
      '`weak` is always optional (`var`) and automatically zeroed on deallocation.',
      '`unowned` is non-optional and crashes if accessed after deallocation.',
      '`weak` incurs runtime overhead via side tables / weak reference tables.',
      '`unowned` avoids optional unwrapping boilerplate but requires lifetime invariants.',
    ],
    commonMistakes: [
      'Using `unowned` in asynchronous network completion closures where the caller (e.g. ViewController) can dismiss before the request finishes, causing immediate crashes.',
    ],
    followUps: [
      {
        id: 'interview.memory.weak_vs_unowned.001.f1',
        parentQuestionId: 'interview.memory.weak_vs_unowned.001',
        question: 'Why does Swift introduce Side Tables for weak references?',
        modelAnswer: 'To save memory. Storing weak reference counts directly inside every object header would bloat all objects. Instead, an object header only points to an external side table if it actually has weak references or reference count overflows.',
        keyPoints: ['Side table external allocation', 'Saves 8-16 bytes on every plain Swift object'],
        difficulty: 'expert',
      },
    ],
    relatedTopics: ['memory-weak-unowned', 'memory-arc'],
  },
  {
    id: 'interview.memory.retain_cycle_closure.002',
    question: 'Identify the memory leak in this code and explain how to resolve it.',
    domainId: 'debugging',
    moduleId: 'debugging-memory-mod',
    topicId: 'memory-retain-cycles',
    difficulty: 'intermediate',
    type: 'code-analysis',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Memory', 'Retain Cycles', 'Closures', 'Capture Lists'],
    codeSnippet: {
      language: 'swift',
      code: `final class ProfileViewModel {
    var onDataLoaded: (() -> Void)?
    private let service: NetworkService

    init(service: NetworkService) {
        self.service = service
    }

    func loadProfile() {
        service.fetchUserData { data in
            self.process(data)
            self.onDataLoaded?()
        }
    }

    private func process(_ data: Data) { /* ... */ }
}`,
      caption: 'ProfileViewModel with escaping completion closure',
    },
    modelAnswer: 'If `NetworkService` stores the completion handler as an escaping property or is strongly retained by the ViewModel, and the closure strongly captures `self`, a retain cycle occurs: ViewModel -> NetworkService -> Closure -> ViewModel. Even if the network service releases the closure upon completion, if the request hangs or takes long, `self` is kept alive unnecessarily. Fix by adding a capture list: `service.fetchUserData { [weak self] data in guard let self else { return }; self.process(data); self.onDataLoaded?() }`.',
    keyPoints: [
      'Closure strongly captures `self` by default in escaping closures.',
      'Add `[weak self]` in capture list to break cycle.',
      'Use `guard let self else { return }` or optional chaining `self?.process(data)`.',
      'Non-escaping closures do not require `[weak self]` because they cannot outlive the function stack.',
    ],
    commonMistakes: [
      'Adding `[weak self]` blindly to synchronous non-escaping closures like `array.map { self.transform($0) }`.',
    ],
    followUps: [
      {
        id: 'interview.memory.retain_cycle_closure.002.f1',
        parentQuestionId: 'interview.memory.retain_cycle_closure.002',
        question: 'Does `[weak self]` in a Task closure prevent retain cycles?',
        modelAnswer: 'Yes! `Task { [weak self] in ... }` captures self weakly, preventing the Task from keeping self alive if the enclosing view controller dismisses before the task finishes.',
        keyPoints: ['Task capture lists', 'Weak self inside async tasks'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['memory-retain-cycles', 'swift-closures'],
  },
  {
    id: 'interview.memory.autoreleasepool.003',
    question: 'When and why would you use `autoreleasepool` in modern Swift, given that ARC handles reference counting?',
    domainId: 'debugging',
    moduleId: 'debugging-memory-mod',
    topicId: 'memory-arc',
    difficulty: 'intermediate',
    type: 'practical',
    estimatedMinutes: 4,
    frequency: 'medium',
    tags: ['Memory', 'autoreleasepool', 'ARC', 'Memory Spikes'],
    modelAnswer: 'While pure Swift objects are freed immediately when reference counts hit zero, many Apple APIs (UIKit, Core Graphics, Foundation, Objective-C bridges) return autoreleased objects that are placed into the runloop’s current autorelease pool. In tight loops processing large datasets (e.g. processing 10,000 images or parsing heavy JSON files), autoreleased objects accumulate in memory until the runloop turn ends, causing massive memory spikes and Jetsam OOM crashes. Wrapping the loop body in `autoreleasepool { ... }` drains the pool on every iteration, keeping memory flat.',
    keyPoints: [
      'Autoreleased objects are only released at the end of the current runloop turn.',
      'Tight loops creating thousands of Cocoa/Obj-C objects cause severe memory spikes.',
      '`autoreleasepool { ... }` drains and deallocates transient objects on every iteration.',
      'Prevents Jetsam (out-of-memory) terminations during heavy batch processing.',
    ],
    commonMistakes: [
      'Assuming Swift never creates autoreleased objects (any Obj-C framework bridge like UIImage or NSData uses autorelease).',
    ],
    followUps: [
      {
        id: 'interview.memory.autoreleasepool.003.f1',
        parentQuestionId: 'interview.memory.autoreleasepool.003',
        question: 'Does `autoreleasepool` work inside asynchronous Swift Concurrency tasks?',
        modelAnswer: 'Yes, but the `autoreleasepool` block itself must be synchronous; you cannot `await` inside an `autoreleasepool` closure.',
        keyPoints: ['Synchronous closure only', 'Cannot await inside autoreleasepool'],
        difficulty: 'advanced',
      },
    ],
    relatedTopics: ['memory-arc', 'performance-profiling-mod'],
  },
  {
    id: 'interview.memory.memory_graph_debugger.004',
    question: 'How do you diagnose retain cycles and abandoned memory using the Xcode Memory Graph Debugger and Malloc Stack Logging?',
    domainId: 'debugging',
    moduleId: 'debugging-memory-mod',
    topicId: 'memory-retain-cycles',
    difficulty: 'advanced',
    type: 'practical',
    estimatedMinutes: 5,
    frequency: 'high',
    tags: ['Memory', 'Memory Graph Debugger', 'Malloc Stack', 'Diagnostics'],
    modelAnswer: '1) Enable "Malloc Stack Logging (Live Allocations Only)" in the Xcode Scheme Run Diagnostics. 2) Reproduce the flow (e.g. push and pop a ViewController 3 times). 3) Pause execution and click the Memory Graph Debugger button. 4) Filter for leaked objects (indicated by purple exclamation marks) or search for your dismissed ViewController. If still in memory, it is leaked. 5) Inspect incoming reference edges: bold arrows indicate strong references, dashed arrows indicate weak/unowned references. 6) The Malloc Stack backtrace in the inspector identifies the exact line of code where the leaking closure or object was allocated.',
    keyPoints: [
      'Malloc Stack Logging records call stack where every allocation occurred.',
      'Memory Graph pauses app and inspects object heap topology.',
      'Bold arrows = strong references; dashed arrows = weak/unowned.',
      'Differentiate between true retain cycles and abandoned memory (objects stored in a global cache).',
    ],
    commonMistakes: [
      'Looking only for purple leak icons (abandoned memory without cyclic graphs won\'t show a purple icon).',
    ],
    followUps: [
      {
        id: 'interview.memory.memory_graph_debugger.004.f1',
        parentQuestionId: 'interview.memory.memory_graph_debugger.004',
        question: 'What is the difference between a Memory Leak and Abandoned Memory?',
        modelAnswer: 'A memory leak is unreachable memory (e.g. a strong reference cycle where no outside pointer can ever reach it again). Abandoned memory is reachable memory that is never used again (e.g. an unbounded static dictionary or cache that grows forever).',
        keyPoints: ['Unreachable memory (leak) vs Reachable but useless memory (abandoned)'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['memory-retain-cycles', 'debugging-tools-mod'],
  },
  {
    id: 'interview.memory.timer_retain_cycles.005',
    question: 'Why does `Timer.scheduledTimer` frequently cause retain cycles in ViewControllers, and how do you fix it?',
    domainId: 'debugging',
    moduleId: 'debugging-memory-mod',
    topicId: 'memory-retain-cycles',
    difficulty: 'intermediate',
    type: 'debugging',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Memory', 'Timer', 'Retain Cycles', 'RunLoop'],
    modelAnswer: '`Timer.scheduledTimer(target:selector:...)` passes `self` as the target, and `RunLoop.current` strongly retains the timer, which strongly retains its target (`self`). Even if the view controller is popped from the navigation stack, the RunLoop continues running the timer and holding the view controller in memory indefinitely. Fix: 1) Call `timer.invalidate()` in `viewDidDisappear` or before dismissal. 2) Use modern block-based API with `[weak self]`: `Timer.scheduledTimer(withTimeInterval:repeats:block: { [weak self] _ in self?.tick() })`. 3) Or use an intermediate weak proxy wrapper.',
    keyPoints: [
      'RunLoop strongly retains repeating Timers.',
      'Target-action timer strongly retains target until `invalidate()` is called.',
      '`deinit` of the view controller will NEVER be called while a repeating target timer is active.',
      'Block-based timer with `[weak self]` or GCD `DispatchSourceTimer` solves the issue.',
    ],
    commonMistakes: [
      'Placing `timer.invalidate()` inside `deinit` (deinit is never called because the timer retains self!).',
    ],
    followUps: [
      {
        id: 'interview.memory.timer_retain_cycles.005.f1',
        parentQuestionId: 'interview.memory.timer_retain_cycles.005',
        question: 'Why is `DispatchSourceTimer` often preferred over `Timer` in background workers?',
        modelAnswer: '`DispatchSourceTimer` is tied to a specific `DispatchQueue` rather than requiring a running `RunLoop`, provides nanosecond precision, and does not retain targets implicitly.',
        keyPoints: ['No RunLoop dependency', 'Queue-based execution', 'Configurable leeway for battery conservation'],
        difficulty: 'advanced',
      },
    ],
    relatedTopics: ['memory-retain-cycles', 'uikit-lifecycle'],
  },
  {
    id: 'interview.memory.jetsam_oom.006',
    question: 'What is Jetsam in iOS, and what causes Out-of-Memory (OOM) crash termination without a crash stack trace?',
    domainId: 'debugging',
    moduleId: 'debugging-tools-mod',
    topicId: 'debugging-crash-symbolication',
    difficulty: 'advanced',
    type: 'conceptual',
    estimatedMinutes: 4,
    frequency: 'medium',
    tags: ['Memory', 'Jetsam', 'OOM', 'Crash Reports'],
    modelAnswer: 'Jetsam is the kernel mechanism in iOS responsible for reclaiming memory under system pressure. Because iOS has no disk swap file, when physical RAM is exhausted, Jetsam terminates processes using a high-watermark threshold (processes with higher memory footprint and background apps are killed first). When an app is killed by Jetsam, it does NOT produce an `EXC_BAD_ACCESS` or SIGSEGV crash report; instead, an `.ips` Jetsam log is created with reason `per-process-limit` or `vnode-limit`. Memory spikes during image decoding or massive array allocations are the top culprits.',
    keyPoints: [
      'iOS has no disk swap space; memory pressure kills apps via Jetsam.',
      'Produces no standard crash stack trace (often categorized as "FOOM" — Foreground OOM).',
      'Identified via `.ips` log with `per-process-limit` indicator.',
      'Fix via image downsampling, pagination, and memory purging on `didReceiveMemoryWarning`.',
    ],
    commonMistakes: [
      'Looking for unhandled exception stack traces for OOM kills in crash analytics tools.',
    ],
    followUps: [
      {
        id: 'interview.memory.jetsam_oom.006.f1',
        parentQuestionId: 'interview.memory.jetsam_oom.006',
        question: 'How do you test Jetsam memory limits on a physical device in development?',
        modelAnswer: 'In Xcode, configure the scheme memory limit, use the Allocations instrument to monitor dirty memory footprint, or allocate large contiguous buffers in a debug test until the kernel terminates the app.',
        keyPoints: ['Dirty memory vs compressed memory', 'Allocations instrument tracking'],
        difficulty: 'advanced',
      },
    ],
    relatedTopics: ['debugging-crash-symbolication', 'performance-profiling-mod'],
  },
  {
    id: 'interview.memory.zombie_objects.007',
    question: 'What are Zombie Objects (`NSZombieEnabled`), and how do they help debug memory corruption?',
    domainId: 'debugging',
    moduleId: 'debugging-tools-mod',
    topicId: 'debugging-crash-symbolication',
    difficulty: 'intermediate',
    type: 'debugging',
    estimatedMinutes: 4,
    frequency: 'medium',
    tags: ['Memory', 'NSZombieEnabled', 'EXC_BAD_ACCESS', 'Debugging'],
    modelAnswer: 'When an object is deallocated normally in Objective-C or bridged Swift code, its memory is returned to the heap. If code later messages this dangling pointer, the app crashes with `EXC_BAD_ACCESS` or corrupts random memory silently. When Zombie Objects are enabled in Xcode scheme diagnostics, deallocated objects are NOT freed; instead, their `isa` pointer is swizzled to an `_NSZombie_` class. When a message is sent to a zombie, the runtime logs the exact message sent and class name before halting execution cleanly.',
    keyPoints: [
      'Replaces deallocated object memory with `_NSZombie_` class placeholder.',
      'Logs exact selector sent to deallocated object before terminating.',
      'Turns nondeterministic `EXC_BAD_ACCESS` into reproducible debug assertions.',
      'Must NEVER be enabled in production builds because memory is never freed.',
    ],
    commonMistakes: [
      'Leaving Zombie Objects turned on in performance or release testing (memory footprint will continually grow).',
    ],
    followUps: [
      {
        id: 'interview.memory.zombie_objects.007.f1',
        parentQuestionId: 'interview.memory.zombie_objects.007',
        question: 'Why does accessing an unowned reference crash without zombies enabled in Swift?',
        modelAnswer: 'Swift unowned references are tracked by the runtime header. When the strong count is 0 but unowned count > 0, the object memory is deinitialized but the header remains allocated until unowned references clear, allowing Swift to trigger a clean trap instead of a segfault.',
        keyPoints: ['Deinitialized state vs Deallocated state', 'Unowned count tracking'],
        difficulty: 'expert',
      },
    ],
    relatedTopics: ['debugging-crash-symbolication', 'memory-weak-unowned'],
  },
  {
    id: 'interview.memory.delegates_weak.008',
    question: 'Why must delegate protocols in Swift inherit from `AnyObject`, and what happens if they do not?',
    domainId: 'debugging',
    moduleId: 'debugging-memory-mod',
    topicId: 'memory-weak-unowned',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Memory', 'Delegates', 'AnyObject', 'Protocols'],
    modelAnswer: 'In Swift, delegates must be declared with `weak` to prevent retain cycles between the delegating object (e.g. a view) and the delegate owner (e.g. a ViewController). However, `weak` can only be applied to reference types (classes). If a protocol does not inherit from `AnyObject` (or `class`), the protocol could theoretically be adopted by a value type (struct or enum). Since value types cannot have weak references, the compiler emits an error: "\'weak\' must not be applied to non-class-bound protocol".',
    keyPoints: [
      'Delegates must be `weak` to break strong reference cycles.',
      '`weak` requires reference types (classes).',
      'Protocol must inherit from `AnyObject` to allow `weak var delegate: MyDelegate?`.',
      'Without `AnyObject`, compiler rejects `weak` modifier on the variable.',
    ],
    commonMistakes: [
      'Using the deprecated `class` keyword instead of `AnyObject` on protocol definitions in modern Swift.',
    ],
    followUps: [
      {
        id: 'interview.memory.delegates_weak.008.f1',
        parentQuestionId: 'interview.memory.delegates_weak.008',
        question: 'Can a struct conform to an `AnyObject` protocol?',
        modelAnswer: 'No, the compiler will error. Only classes can conform to protocols inheriting from AnyObject.',
        keyPoints: ['Class-only conformance constraint'],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['memory-weak-unowned', 'swift-protocols'],
  },
  {
    id: 'interview.memory.deinit_debugging.009',
    question: 'How can you automate memory leak detection in XCTest unit tests without launching the Memory Graph?',
    domainId: 'debugging',
    moduleId: 'debugging-memory-mod',
    topicId: 'memory-retain-cycles',
    difficulty: 'advanced',
    type: 'practical',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Memory', 'Unit Testing', 'XCTest', 'Memory Leaks'],
    modelAnswer: 'Create an `XCTestCase` helper method `trackForMemoryLeaks(_ instance: AnyObject, file: StaticString = #filePath, line: UInt = #line)`. In the helper, create a weak reference to the instance (`weak var weakInstance = instance`). Register a teardown block using `addTeardownBlock { XCTAssertNil(weakInstance, "Instance should have been deallocated. Potential memory leak!", file: file, line: line) }`. When the test function finishes and scope ends, the teardown block executes. If the object leaked, `weakInstance` is non-nil and the unit test fails automatically.',
    keyPoints: [
      'Use `addTeardownBlock` to assert deallocation after test finishes.',
      'Weak pointer reference to test object.',
      '`XCTAssertNil(weakRef)` flags retain cycles automatically on CI.',
      'Zero manual Memory Graph interaction required.',
    ],
    commonMistakes: [
      'Asserting immediately within the test body before the autoreleasepool has drained or before asynchronous operations complete.',
    ],
    followUps: [
      {
        id: 'interview.memory.deinit_debugging.009.f1',
        parentQuestionId: 'interview.memory.deinit_debugging.009',
        question: 'What if the object deallocation occurs on a background queue?',
        modelAnswer: 'In the teardown block, you can wait briefly with an expectation or run the main thread runloop before evaluating `XCTAssertNil(weakInstance)`.',
        keyPoints: ['Asynchronous deallocation teardown expectation'],
        difficulty: 'advanced',
      },
    ],
    relatedTopics: ['memory-retain-cycles', 'testing-swift-testing-framework'],
  },
  {
    id: 'interview.memory.nscache_vs_dictionary.010',
    question: 'Why should you use `NSCache` instead of `Dictionary` for in-memory image or data caching?',
    domainId: 'persistence',
    moduleId: 'persistence-lightweight-mod',
    topicId: 'persistence-userdefaults',
    difficulty: 'intermediate',
    type: 'comparison',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Memory', 'NSCache', 'Caching', 'Thread Safety'],
    modelAnswer: '1) Thread Safety: `NSCache` is thread-safe by default and can be read/written concurrently from multiple threads without locks, whereas `Dictionary` is not thread-safe and will crash on simultaneous access. 2) Auto-Purging: `NSCache` automatically evicts objects when the system experiences low memory pressure, preventing Jetsam crashes. 3) Cost & Count Limits: `NSCache` allows configuring `totalCostLimit` and `countLimit` with LRU eviction. 4) Key Semantics: `NSCache` does not copy keys (unlike Dictionary which requires `NSCopying` / `Hashable`).',
    keyPoints: [
      'Thread-safe concurrent access without manual mutex locks.',
      'Automatic eviction under system memory pressure.',
      '`totalCostLimit` (e.g. byte size) and `countLimit` boundaries.',
      'Does not copy key objects.',
    ],
    commonMistakes: [
      'Using a static Swift `Dictionary` for caching images, leading to inevitable OOM crashes when memory fills.',
    ],
    followUps: [
      {
        id: 'interview.memory.nscache_vs_dictionary.010.f1',
        parentQuestionId: 'interview.memory.nscache_vs_dictionary.010',
        question: 'Can you store Swift value types (structs) directly in `NSCache`?',
        modelAnswer: 'No, `NSCache` requires keys and values to be `AnyObject` (reference types). To store a struct, wrap it inside an object box (e.g. `class Box<T>`).',
        keyPoints: ['AnyObject requirement', 'Class Box wrapper for structs'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['persistence-userdefaults', 'system-design-image-pipeline'],
  },
];
