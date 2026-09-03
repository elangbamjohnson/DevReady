import type { ArticleTopic } from '@/types';

export const swiftuiTopics: ArticleTopic[] = [
  {
    id: 'swiftui-state',
    slug: 'state',
    title: '@State',
    category: 'swiftui',
    group: 'State & Data Flow',
    description: 'Manage private view-local state with @State and understand how SwiftUI rerenders views automatically.',
    difficulty: 'junior',
    estimatedTime: 8,
    language: 'swift',
    version: { platform: 'iOS', version: '13', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['state', 'swiftui', 'view-state', 'rerender'],
    relatedTopics: ['swiftui-binding', 'swiftui-observation', 'swiftui-navigation'],
    nextTopic: 'swiftui-binding',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: '`@State` is a property wrapper for **view-local** mutable state. When a `@State` value changes, SwiftUI invalidates and re-renders the view. `@State` properties should be `private` — they are owned by the view and should never leak outward.',
      },
      {
        type: 'code',
        id: 'code-state',
        language: 'swift',
        content: `struct CounterView: View {
    @State private var count = 0

    var body: some View {
        VStack {
            Text("Count: \\(count)")
                .font(.title)

            Button("Increment") {
                count += 1  // SwiftUI re-renders body
            }
        }
    }
}`,
      },
      {
        type: 'callout',
        id: 'c-private',
        variant: 'tip',
        title: 'Keep @State private',
        content: 'Mark all `@State` properties as `private`. If a child view needs to modify the state, pass a `$binding` instead of making the parent\'s state public.',
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What is the difference between @State, @Binding, and @ObservableObject?',
          'Why must @State be private?',
          'When does SwiftUI call body again?',
          'What happens to @State when a view is destroyed and recreated?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['swiftui-binding', 'swiftui-observation'] },
    ],
  },

  {
    id: 'swiftui-binding',
    slug: 'binding',
    title: '@Binding',
    category: 'swiftui',
    group: 'State & Data Flow',
    description: 'Share state between parent and child views using @Binding for two-way data connections.',
    difficulty: 'junior',
    estimatedTime: 8,
    language: 'swift',
    version: { platform: 'iOS', version: '13', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['binding', 'swiftui', 'two-way', 'data-flow'],
    relatedTopics: ['swiftui-state', 'swiftui-observation'],
    previousTopic: 'swiftui-state',
    nextTopic: 'swiftui-observation',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: '`@Binding` creates a two-way connection between a parent\'s `@State` and a child view. The child can read and write the value, and changes propagate back to the parent automatically.',
      },
      {
        type: 'code',
        id: 'code-binding',
        language: 'swift',
        content: `struct ToggleRow: View {
    let title: String
    @Binding var isOn: Bool   // Two-way connection from parent

    var body: some View {
        Toggle(title, isOn: $isOn)
    }
}

struct SettingsView: View {
    @State private var notificationsEnabled = true

    var body: some View {
        ToggleRow(
            title: "Notifications",
            isOn: $notificationsEnabled  // $ creates the Binding
        )
    }
}`,
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'How is @Binding different from @State?',
          'What does the $ prefix do in SwiftUI?',
          'Can a @Binding exist without a @State?',
          'How do you pass a binding down through multiple view layers?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['swiftui-state', 'swiftui-observation'] },
    ],
  },

  {
    id: 'swiftui-observation',
    slug: 'observation',
    title: '@Observable & Observation',
    category: 'swiftui',
    group: 'State & Data Flow',
    description: 'Use the @Observable macro (iOS 17+) for fine-grained, automatic observation replacing ObservableObject.',
    difficulty: 'mid',
    estimatedTime: 10,
    language: 'swift',
    version: { platform: 'iOS', version: '17', status: 'current', lastReviewed: '2026-09-01', introducedIn: 'iOS 17' },
    interviewRelevance: 'high',
    tags: ['observable', 'observation', 'swiftui', 'viewmodel'],
    relatedTopics: ['swiftui-state', 'swiftui-binding', 'arch-mvvm'],
    previousTopic: 'swiftui-binding',
    nextTopic: 'swiftui-navigation',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: '`@Observable` (iOS 17+) is a macro that replaces the verbose `ObservableObject + @Published` pattern. SwiftUI automatically tracks which properties a view reads and only re-renders when those specific properties change — not every time any property changes.',
      },
      {
        type: 'comparison',
        id: 'comp',
        leftLabel: 'Old: ObservableObject (iOS 13+)',
        rightLabel: 'New: @Observable (iOS 17+)',
        leftLanguage: 'swift',
        rightLanguage: 'swift',
        leftCode: `class ViewModel: ObservableObject {
    @Published var name = ""
    @Published var count = 0
}

struct MyView: View {
    @StateObject var vm = ViewModel()
    // Re-renders on ANY @Published change
    var body: some View { Text(vm.name) }
}`,
        rightCode: `@Observable
class ViewModel {
    var name = ""
    var count = 0
    // No @Published needed
}

struct MyView: View {
    @State var vm = ViewModel()
    // Only re-renders when vm.name changes
    var body: some View { Text(vm.name) }
}`,
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What is the difference between @Observable and ObservableObject?',
          'How does @Observable provide fine-grained observation?',
          'What replaces @StateObject in the new Observation framework?',
          'Can you use @Observable with iOS 16 or earlier?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['swiftui-state', 'arch-mvvm'] },
    ],
  },

  {
    id: 'swiftui-navigation',
    slug: 'navigation-stack',
    title: 'NavigationStack',
    category: 'swiftui',
    group: 'Navigation',
    description: 'Master NavigationStack for type-safe, programmatic navigation and deep linking in SwiftUI.',
    difficulty: 'mid',
    estimatedTime: 12,
    language: 'swift',
    version: { platform: 'iOS', version: '16', status: 'current', lastReviewed: '2026-09-01', introducedIn: 'iOS 16' },
    interviewRelevance: 'medium',
    tags: ['navigation', 'navigationstack', 'deep-linking', 'programmatic'],
    relatedTopics: ['swiftui-state', 'swiftui-observation'],
    previousTopic: 'swiftui-observation',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: '`NavigationStack` (iOS 16+) replaces `NavigationView`. It uses a type-safe `NavigationPath` to support programmatic navigation, deep linking, and state restoration. You define destinations using `.navigationDestination(for:)` modifiers.',
      },
      {
        type: 'code',
        id: 'code-navstack',
        language: 'swift',
        content: `struct ContentView: View {
    @State private var path = NavigationPath()

    var body: some View {
        NavigationStack(path: $path) {
            List(items) { item in
                NavigationLink(item.name, value: item)
            }
            .navigationTitle("Items")
            .navigationDestination(for: Item.self) { item in
                ItemDetailView(item: item)
            }
        }
    }

    // Programmatic navigation
    func openItem(_ item: Item) {
        path.append(item)
    }

    // Deep link to nested destination
    func openDeepLink(itemId: String, detailId: String) {
        guard let item = items.first(where: { $0.id == itemId }) else { return }
        path = NavigationPath([item, detailId])
    }
}`,
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'medium',
        questions: [
          'How is NavigationStack different from NavigationView?',
          'How do you handle deep links with NavigationStack?',
          'How do you programmatically pop to root?',
          'What is NavigationPath?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['swiftui-state', 'swiftui-observation'] },
    ],
  },
];
