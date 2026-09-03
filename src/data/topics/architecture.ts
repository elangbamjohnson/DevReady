import type { ArticleTopic } from '@/types';

export const architectureTopics: ArticleTopic[] = [
  {
    id: 'arch-mvvm',
    slug: 'mvvm',
    title: 'MVVM in SwiftUI',
    category: 'architecture',
    group: 'MVVM',
    description: 'Implement Model-View-ViewModel with @Observable view models and reactive data binding in SwiftUI.',
    difficulty: 'mid',
    estimatedTime: 15,
    language: 'swift',
    version: { platform: 'iOS', version: '17', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['mvvm', 'viewmodel', 'architecture', 'observable'],
    relatedTopics: ['arch-di', 'swiftui-observation', 'swift-protocols'],
    nextTopic: 'arch-di',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'MVVM separates **View** (SwiftUI views, display only), **ViewModel** (business logic, state, @Observable), and **Model** (data structures, persistence). The ViewModel exposes observable state and actions; the View binds to it without knowing about underlying data sources.',
      },
      {
        type: 'code',
        id: 'code-mvvm',
        language: 'swift',
        content: `// Model
struct User: Identifiable, Codable {
    let id: UUID
    var name: String
    var email: String
}

// ViewModel
@Observable
class ProfileViewModel {
    var user: User?
    var isLoading = false
    var errorMessage: String?

    private let userService: UserServiceProtocol

    init(userService: UserServiceProtocol = UserService()) {
        self.userService = userService
    }

    func loadProfile(id: UUID) async {
        isLoading = true
        errorMessage = nil
        do {
            user = try await userService.fetch(id: id)
        } catch {
            errorMessage = error.localizedDescription
        }
        isLoading = false
    }
}

// View
struct ProfileView: View {
    @State private var viewModel = ProfileViewModel()

    var body: some View {
        Group {
            if viewModel.isLoading {
                ProgressView()
            } else if let user = viewModel.user {
                Text(user.name)
            } else if let error = viewModel.errorMessage {
                Text(error).foregroundStyle(.red)
            }
        }
        .task { await viewModel.loadProfile(id: currentUserId) }
    }
}`,
      },
      {
        type: 'callout',
        id: 'c-protocol',
        variant: 'tip',
        title: 'Protocol-backed services enable testability',
        content: 'Notice `UserServiceProtocol` in the example. Injecting the service as a protocol allows replacing it with a mock in tests — a critical pattern for making MVVM actually testable.',
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What is the responsibility of each layer in MVVM?',
          'How do you test a ViewModel without a real network?',
          'Where does navigation logic live in MVVM?',
          'How is MVVM different from MVC in iOS development?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['arch-di', 'swiftui-observation'] },
    ],
  },

  {
    id: 'arch-di',
    slug: 'dependency-injection',
    title: 'Dependency Injection',
    category: 'architecture',
    group: 'Dependency Injection',
    description: 'Apply constructor injection, protocol-based DI, and environment injection to write testable iOS code.',
    difficulty: 'senior',
    estimatedTime: 14,
    language: 'swift',
    version: { language: 'Swift', version: '6', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['di', 'dependency-injection', 'testability', 'protocols'],
    relatedTopics: ['arch-mvvm', 'swift-protocols'],
    previousTopic: 'arch-mvvm',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'Dependency Injection (DI) is the practice of providing dependencies to a type from outside, rather than creating them internally. This makes code testable (inject mocks), flexible (swap implementations), and decoupled (depend on protocols, not concrete types).',
      },
      {
        type: 'code',
        id: 'code-di',
        language: 'swift',
        content: `// Protocol defines the dependency contract
protocol NetworkClientProtocol {
    func fetch<T: Decodable>(_ url: URL) async throws -> T
}

// Production implementation
struct URLSessionNetworkClient: NetworkClientProtocol {
    func fetch<T: Decodable>(_ url: URL) async throws -> T {
        let (data, _) = try await URLSession.shared.data(from: url)
        return try JSONDecoder().decode(T.self, from: data)
    }
}

// Mock for testing
struct MockNetworkClient: NetworkClientProtocol {
    var response: Any?
    var error: Error?
    func fetch<T: Decodable>(_ url: URL) async throws -> T {
        if let error { throw error }
        return response as! T
    }
}

// ViewModel receives protocol — doesn't care about the concrete type
class ArticleViewModel {
    private let client: NetworkClientProtocol

    init(client: NetworkClientProtocol = URLSessionNetworkClient()) {
        self.client = client
    }
}`,
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What is dependency injection and what problems does it solve?',
          'What are the three types of dependency injection?',
          'How do you do DI in SwiftUI without a DI container?',
          'When would you use Environment values for DI in SwiftUI?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['arch-mvvm', 'swift-protocols'] },
    ],
  },
];
