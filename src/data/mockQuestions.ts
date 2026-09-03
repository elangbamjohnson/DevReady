import type { InterviewQuestion } from '@/types';

export const mockQuestions: InterviewQuestion[] = [
  {
    id: 'q-weak-unowned',
    question: 'What is the difference between weak and unowned in Swift?',
    category: 'memory',
    difficulty: 'senior',
    estimatedTime: '5 min',
    tags: ['Memory Management', 'Swift', 'ARC'],
    thinkPrompt: 'Think about reference counting, optional vs non-optional, and when each should be used.',
    answerSummary:
      'Both `weak` and `unowned` prevent strong reference cycles. `weak` creates an optional reference that becomes nil when the referenced object is deallocated. `unowned` creates a non-optional reference and assumes the referenced object will always exist — accessing an unowned reference after deallocation causes a crash. Use `weak` when the reference can become nil during the object\'s lifetime. Use `unowned` when you are certain the reference will never be nil while the referencing object is alive.',
    codeSnippet: `class Parent {
    var child: Child?
}

class Child {
    weak var parent: Parent?      // weak — parent may be deallocated first
    unowned let owner: Parent     // unowned — owner guaranteed to outlive child

    init(owner: Parent) {
        self.owner = owner
    }
}`,
    keyTakeaways: [
      'weak references are optional and become nil on deallocation',
      'unowned references are non-optional and crash if accessed after deallocation',
      'Use weak for delegates and optional back-references',
      'Use unowned when lifetimes are guaranteed (e.g., child-to-parent)',
    ],
    isBookmarked: false,
  },
  {
    id: 'q-taskgroup',
    question: 'How does TaskGroup handle cancellation and error propagation in Swift Concurrency?',
    category: 'concurrency',
    difficulty: 'senior',
    estimatedTime: '8 min',
    tags: ['Concurrency', 'Swift', 'TaskGroup'],
    thinkPrompt: 'Consider structured concurrency, cooperative cancellation, and how throwing affects sibling tasks.',
    answerSummary:
      'In a ThrowingTaskGroup, if any child task throws an error, the group automatically cancels all remaining child tasks by setting their cancellation flag. However, cancellation is cooperative — child tasks must check Task.isCancelled or call Task.checkCancellation() to respond. The first thrown error propagates out of the withThrowingTaskGroup block. Tasks added after cancellation still run but start in a cancelled state.',
    codeSnippet: `func fetchAll(urls: [URL]) async throws -> [Data] {
    try await withThrowingTaskGroup(of: Data.self) { group in
        for url in urls {
            group.addTask {
                try Task.checkCancellation()
                let (data, _) = try await URLSession.shared.data(from: url)
                return data
            }
        }
        var results: [Data] = []
        for try await data in group {
            results.append(data)
        }
        return results
    }
}`,
    keyTakeaways: [
      'TaskGroup cancels siblings when one child throws',
      'Cancellation is cooperative — tasks must check isCancelled',
      'Use ThrowingTaskGroup for error propagation',
      'withTaskGroup blocks wait for all child tasks to complete',
    ],
    isBookmarked: true,
  },
  {
    id: 'q-frame-bounds',
    question: 'Explain the difference between frame and bounds in UIView.',
    category: 'uikit',
    difficulty: 'mid',
    estimatedTime: '4 min',
    tags: ['UIKit', 'Layout', 'UIView'],
    thinkPrompt: 'Think about coordinate systems — which uses the superview\'s coordinate space and which uses the view\'s own.',
    answerSummary:
      'frame is the view\'s rectangle in its superview\'s coordinate system — it defines position and size relative to the parent. bounds is the view\'s rectangle in its own coordinate system — the origin is typically (0,0) and represents the visible portion of the view\'s content. When you rotate a view, the frame changes (it becomes the axis-aligned bounding box) but bounds stays the same.',
    keyTakeaways: [
      'frame = position + size in superview coordinates',
      'bounds = position + size in own coordinate system',
      'Rotation changes frame but not bounds',
      'Use bounds for drawing, frame for positioning',
    ],
    isBookmarked: false,
  },
  {
    id: 'q-method-swizzling',
    question: 'What is the dynamic dispatch mechanism in Objective-C and how does Method Swizzling work?',
    category: 'objc',
    difficulty: 'senior',
    estimatedTime: '7 min',
    tags: ['Objective-C', 'Runtime', 'Advanced'],
    thinkPrompt: 'Consider objc_msgSend, the method lookup table, and how method implementations can be exchanged at runtime.',
    answerSummary:
      'Objective-C uses dynamic dispatch via objc_msgSend — method calls are resolved at runtime through the class\'s dispatch table. Method Swizzling leverages the runtime API to exchange the implementations of two methods. Using method_exchangeImplementations, you swap the IMP pointers so calling one selector executes the other\'s implementation. This is commonly used for analytics, logging, or modifying framework behavior, but should be used carefully to avoid subtle bugs.',
    codeSnippet: `+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Method original = class_getInstanceMethod(self, @selector(viewDidAppear:));
        Method swizzled = class_getInstanceMethod(self, @selector(sc_viewDidAppear:));
        method_exchangeImplementations(original, swizzled);
    });
}

- (void)sc_viewDidAppear:(BOOL)animated {
    [self sc_viewDidAppear:animated]; // calls original
    NSLog(@"Screen appeared: %@", NSStringFromClass([self class]));
}`,
    keyTakeaways: [
      'ObjC uses dynamic dispatch via objc_msgSend',
      'Method Swizzling exchanges method implementations at runtime',
      'Always swizzle in +load with dispatch_once',
      'Call the swizzled method to invoke the original implementation',
    ],
    isBookmarked: false,
  },
  {
    id: 'q-retain-cycles-debug',
    question: 'How do you diagnose and eliminate retain cycles using Xcode Memory Graph Debugger?',
    category: 'debugging',
    difficulty: 'senior',
    estimatedTime: '6 min',
    tags: ['Debugging', 'Memory', 'Xcode'],
    thinkPrompt: 'Think about the Memory Graph button in Xcode, purple warning indicators, and backtrace navigation.',
    answerSummary:
      'The Memory Graph Debugger captures a snapshot of all live objects and their reference relationships. Click the debug memory graph button during runtime. Objects involved in retain cycles appear with a purple exclamation mark. You can inspect the reference graph to see which objects hold strong references to each other. To fix cycles, convert one reference to weak or unowned, typically the delegate or closure capture.',
    keyTakeaways: [
      'Use the Memory Graph Debugger button during runtime',
      'Purple markers indicate potential leaks or cycles',
      'Inspect reference edges to find strong reference chains',
      'Fix by using weak/unowned on back-references or closure captures',
    ],
    isBookmarked: false,
  },
  {
    id: 'q-observable-macro',
    question: 'How does the @Observable macro work in SwiftUI and how does it differ from ObservableObject?',
    category: 'swiftui',
    difficulty: 'mid',
    estimatedTime: '5 min',
    tags: ['SwiftUI', 'Observation', 'State'],
    thinkPrompt: 'Think about property-level tracking vs object-level tracking and the Observation framework.',
    answerSummary:
      'The @Observable macro (iOS 17+) uses the Observation framework for fine-grained, property-level tracking. Unlike ObservableObject which notifies on any @Published change, @Observable only triggers view updates when the specific properties a view reads actually change. This eliminates unnecessary re-renders. You use it with @State instead of @StateObject, and pass it directly without @ObservedObject wrappers.',
    codeSnippet: `@Observable
class UserViewModel {
    var name: String = ""
    var email: String = ""
    var isLoading: Bool = false
}

struct ProfileView: View {
    @State private var viewModel = UserViewModel()

    var body: some View {
        // Only re-renders when 'name' changes, not when 'email' or 'isLoading' changes
        Text(viewModel.name)
    }
}`,
    keyTakeaways: [
      '@Observable provides property-level change tracking',
      'More efficient than ObservableObject — fewer unnecessary re-renders',
      'Use @State instead of @StateObject with @Observable',
      'Available from iOS 17+ / Swift 5.9+',
    ],
    isBookmarked: true,
  },
  {
    id: 'q-sendable',
    question: 'What is Sendable in Swift 6 and why does it matter for concurrency safety?',
    category: 'concurrency',
    difficulty: 'senior',
    estimatedTime: '6 min',
    tags: ['Concurrency', 'Swift 6', 'Sendable'],
    thinkPrompt: 'Consider data races, actor isolation, and how the compiler enforces thread safety through the type system.',
    answerSummary:
      'Sendable is a protocol that marks types as safe to share across concurrency domains (e.g., between actors or tasks). In Swift 6, strict concurrency checking is enabled by default, and the compiler enforces that only Sendable types cross isolation boundaries. Value types are implicitly Sendable. Classes must be final with immutable stored properties, or marked @unchecked Sendable. This prevents data races at compile time.',
    keyTakeaways: [
      'Sendable marks types safe to share across concurrency domains',
      'Swift 6 enforces strict Sendable checking by default',
      'Value types are implicitly Sendable',
      'Use @Sendable for closure types crossing isolation boundaries',
    ],
    isBookmarked: false,
  },
  {
    id: 'q-compositional-layout',
    question: 'How do you create complex layouts with UICollectionViewCompositionalLayout?',
    category: 'uikit',
    difficulty: 'senior',
    estimatedTime: '8 min',
    tags: ['UIKit', 'CollectionView', 'Layout'],
    thinkPrompt: 'Think about the item → group → section hierarchy and orthogonal scrolling behavior.',
    answerSummary:
      'UICollectionViewCompositionalLayout uses a hierarchy of NSCollectionLayoutItem, NSCollectionLayoutGroup, and NSCollectionLayoutSection. Each section can have its own layout, and groups can be horizontal, vertical, or custom. Orthogonal scrolling enables horizontal sections within a vertical layout. Section providers allow per-section layout definitions.',
    keyTakeaways: [
      'Hierarchy: Item → Group → Section → Layout',
      'Each section can have independent layout configuration',
      'Orthogonal scrolling enables horizontal sections in vertical layouts',
      'Use section providers for per-section customization',
    ],
    isBookmarked: false,
  },
  {
    id: 'q-mvvm-swiftui',
    question: 'What are the pros and cons of MVVM architecture in SwiftUI applications?',
    category: 'architecture',
    difficulty: 'mid',
    estimatedTime: '5 min',
    tags: ['Architecture', 'MVVM', 'SwiftUI'],
    thinkPrompt: 'Consider how SwiftUI\'s built-in state management interacts with the ViewModel layer.',
    answerSummary:
      'MVVM in SwiftUI separates business logic from views through a ViewModel layer. Pros: testability, separation of concerns, and reusable logic. Cons: SwiftUI already provides @State/@Binding for simple cases, making ViewModels unnecessary overhead for simple views. Over-applying MVVM can lead to boilerplate. Best practice is to use ViewModels for complex screens with business logic and lean on SwiftUI state management for simple views.',
    keyTakeaways: [
      'MVVM provides testability and separation of concerns',
      'Not always necessary for simple SwiftUI views',
      'Use @Observable for modern ViewModel implementation',
      'Apply MVVM selectively based on complexity',
    ],
    isBookmarked: false,
  },
  {
    id: 'q-urlsession-async',
    question: 'How do you implement a modern networking layer using URLSession with async/await?',
    category: 'networking',
    difficulty: 'mid',
    estimatedTime: '7 min',
    tags: ['Networking', 'URLSession', 'Async/Await'],
    thinkPrompt: 'Think about typed responses, error handling, and how to make the API client testable.',
    answerSummary:
      'Modern networking with URLSession uses the async data(for:) API introduced in iOS 15. Create a generic request method that accepts a URLRequest, calls URLSession.shared.data(for:), validates the HTTPURLResponse status code, and decodes using JSONDecoder. Make the client protocol-based for testability. Use Swift\'s throws for error propagation and Result type for explicit error handling.',
    codeSnippet: `protocol APIClient {
    func request<T: Decodable>(_ endpoint: Endpoint) async throws -> T
}

struct NetworkClient: APIClient {
    func request<T: Decodable>(_ endpoint: Endpoint) async throws -> T {
        let (data, response) = try await URLSession.shared.data(for: endpoint.urlRequest)
        guard let http = response as? HTTPURLResponse,
              (200...299).contains(http.statusCode) else {
            throw NetworkError.invalidResponse
        }
        return try JSONDecoder().decode(T.self, from: data)
    }
}`,
    keyTakeaways: [
      'Use URLSession.data(for:) for async networking',
      'Validate HTTP status codes before decoding',
      'Make clients protocol-based for testability',
      'Use generics with Decodable for type-safe responses',
    ],
    isBookmarked: false,
  },
];
