import type { InterviewQuestion } from '@/types/interview';

export const swiftQuestions: InterviewQuestion[] = [
  {
    id: 'interview.swift.structs_classes.001',
    question: 'Explain the fundamental differences between Structs and Classes in Swift, and how Copy-on-Write (CoW) works under the hood.',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-struct-vs-class',
    difficulty: 'intermediate',
    type: 'comparison',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Swift', 'Value Types', 'Copy-on-Write', 'Memory'],
    modelAnswer: 'Structs are value types copied upon assignment or parameter passing, stored directly on the stack (or inline inside enclosing reference types). Classes are reference types where variables hold a pointer to heap-allocated memory with ARC overhead. Copy-on-Write (CoW) is an optimization used in standard collections (Array, Dictionary, String) where buffers are shared until a mutation occurs. Upon mutation, if `isKnownUniquelyReferenced` returns false, a fresh copy is allocated.',
    keyPoints: [
      'Value semantics vs Reference semantics (stack allocation vs heap allocation).',
      'ARC tracking cost on classes vs deterministic cleanup on value types.',
      'Copy-on-Write mechanism: shared storage buffer until mutation.',
      '`isKnownUniquelyReferenced(&ref)` determines whether to clone or mutate in place.',
      'Value types containing reference types inherit partial reference semantics.',
    ],
    commonMistakes: [
      'Believing all structs are strictly allocated on the stack (structs boxed in existentials or inside class properties reside on the heap).',
      'Assuming custom structs automatically have Copy-on-Write behavior (CoW must be implemented manually via a private reference wrapper).',
    ],
    followUps: [
      {
        id: 'interview.swift.structs_classes.001.f1',
        parentQuestionId: 'interview.swift.structs_classes.001',
        question: 'How would you implement Copy-on-Write for a custom struct in Swift?',
        modelAnswer: 'Encapsulate the underlying data inside a private reference type (class Box<T>). In the struct mutating functions or setters, call `isKnownUniquelyReferenced(&box)`. If false, allocate a new Box instance with cloned data before performing the mutation.',
        keyPoints: ['Use private class Box container', 'Check isKnownUniquelyReferenced', 'Reallocate only when reference count > 1'],
        difficulty: 'advanced',
      },
    ],
    relatedTopics: ['swift-struct-vs-class', 'swift-optionals'],
  },
  {
    id: 'interview.swift.optionals.002',
    question: 'How are Optionals implemented under the hood in Swift, and what is the difference between if let, guard let, and nil-coalescing?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-optionals',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Optionals', 'Enums', 'Safety'],
    modelAnswer: 'An Optional in Swift is an enum with two cases: `enum Optional<Wrapped> { case none, case some(Wrapped) }`. `if let` creates a scoped unwrapped variable inside the conditional block. `guard let` unwraps variables into the enclosing scope and requires an early exit (return/throw/break/continue) in the else block. The nil-coalescing operator (`??`) provides a fallback default value without nesting.',
    keyPoints: [
      'Optional is an algebraic enum with `none` and `some(Wrapped)` cases.',
      'guard let enforces the Happy Path and avoids nested pyramid-of-doom conditionals.',
      'Optional pattern matching (`if case .some(let value) = opt`).',
      'Nil-coalescing short-circuits evaluation of the default expression.',
    ],
    commonMistakes: [
      'Force unwrapping (`!`) without compiler-level invariant guarantees.',
      'Using `if let` with deeply nested logic when `guard let` would improve readability.',
    ],
    followUps: [
      {
        id: 'interview.swift.optionals.002.f1',
        parentQuestionId: 'interview.swift.optionals.002',
        question: 'Why does optional chaining return an optional even if the accessed property is non-optional?',
        modelAnswer: 'Because if any link in the chain is nil, the entire expression must immediately evaluate to nil. To represent both the successful value and the failure-to-resolve case, the return type is wrapped in an Optional.',
        keyPoints: ['Failure propagation', 'Automatic wrapping of return type in Optional'],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-optionals'],
  },
  {
    id: 'interview.swift.closures_escaping.003',
    question: 'What does the @escaping attribute signify on a closure parameter, and why does the Swift compiler require it?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-closures',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Closures', '@escaping', 'Memory'],
    modelAnswer: 'By default, Swift closures passed into functions are non-escaping, meaning they execute synchronously within the function body and cannot outlive the function call. Marking a closure `@escaping` informs the compiler that the closure may be stored in a property, dispatched asynchronously, or executed after the function returns. The compiler requires `@escaping` to enforce heap allocation for the closure and remind developers to explicitly write `self` in capture lists to prevent retain cycles.',
    keyPoints: [
      'Non-escaping closures execute synchronously within the function call stack.',
      '@escaping closures outlive the function scope and are allocated on the heap.',
      'Non-escaping closures cannot cause retain cycles because they do not retain references past return.',
      '@escaping requires explicit self references in capture lists.',
    ],
    commonMistakes: [
      'Marking synchronous completion handlers as @escaping unnecessarily.',
      'Thinking non-escaping closures can cause retain cycles.',
    ],
    followUps: [
      {
        id: 'interview.swift.closures_escaping.003.f1',
        parentQuestionId: 'interview.swift.closures_escaping.003',
        question: 'Can a non-escaping closure mutate a local variable in the enclosing function without inout?',
        modelAnswer: 'Yes! Because a non-escaping closure runs synchronously before the function returns, it can directly read and mutate local stack variables safely.',
        keyPoints: ['Synchronous stack access', 'Direct local mutation without inout'],
        difficulty: 'advanced',
      },
    ],
    relatedTopics: ['swift-closures', 'memory-retain-cycles'],
  },
  {
    id: 'interview.swift.protocols_pop.004',
    question: 'What is Protocol-Oriented Programming (POP) in Swift, and how does it compare to traditional Object-Oriented inheritance?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-protocols',
    difficulty: 'intermediate',
    type: 'comparison',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Swift', 'Protocols', 'POP', 'Composition'],
    modelAnswer: 'Protocol-Oriented Programming emphasizes protocol composition, default implementations via protocol extensions, and value types over monolithic class inheritance hierarchies. In OOP, subclasses inherit all behavior and stored state from a single parent (single inheritance). In POP, structs and classes can conform to multiple composable protocols, allowing horizontal feature reuse without fragile base class problems or diamond inheritance issues.',
    keyPoints: [
      'Composition over inheritance (retroactive modeling with extensions).',
      'Value types (structs/enums) can gain polymorphic capabilities without class overhead.',
      'Default method implementations via protocol extensions.',
      'Avoids the fragile base class problem and tight coupling.',
    ],
    commonMistakes: [
      'Adding stored properties directly to protocols (protocols can only specify computed properties in requirements).',
      'Confusing static protocol extension dispatch with dynamic witness table dispatch.',
    ],
    followUps: [
      {
        id: 'interview.swift.protocols_pop.004.f1',
        parentQuestionId: 'interview.swift.protocols_pop.004',
        question: 'What happens when a protocol extension provides a method that is NOT declared in the protocol requirements?',
        modelAnswer: 'Static dispatch applies! If called on an existential typed as the protocol, the extension implementation executes. If called on a concrete type that shadows it, the concrete implementation executes. Polymorphic dynamic dispatch only occurs when the method is declared in the protocol definition.',
        keyPoints: ['Static vs Dynamic dispatch', 'Protocol witness table inclusion requirement'],
        difficulty: 'advanced',
      },
    ],
    relatedTopics: ['swift-protocols', 'swift-generics'],
  },
  {
    id: 'interview.swift.some_vs_any.005',
    question: 'Compare opaque return types (`some Protocol`) with existential containers (`any Protocol`) in modern Swift.',
    domainId: 'swift',
    moduleId: 'swift-advanced-mod',
    topicId: 'swift-opaque-types',
    difficulty: 'advanced',
    type: 'comparison',
    estimatedMinutes: 5,
    frequency: 'high',
    tags: ['Swift', 'some vs any', 'Existentials', 'Generics'],
    modelAnswer: '`some Protocol` represents an opaque type where the exact concrete type is fixed at compile time by the implementation, preserving type identity and enabling static dispatch with zero runtime overhead. `any Protocol` represents an existential box that can hold any arbitrary conforming type at runtime. It incurs dynamic dispatch through Protocol Witness Tables and may require dynamic heap allocation if the payload exceeds the 3-word inline buffer.',
    keyPoints: [
      '`some` preserves type identity at compile time; caller knows it conforms to Protocol but not the exact type.',
      '`any` is an existential box allowing heterogeneous collections at the cost of dynamic dispatch and boxing overhead.',
      'SwiftUI `var body: some View` prevents boxing thousands of view tree allocations on every frame.',
      'Swift 5.7+ introduced primary associated types (e.g. `any Collection<String>`).',
    ],
    commonMistakes: [
      'Using `any Protocol` everywhere by default, causing unnecessary existential box allocation overhead.',
      'Trying to return different concrete types conditionally from a function returning `some Protocol`.',
    ],
    followUps: [
      {
        id: 'interview.swift.some_vs_any.005.f1',
        parentQuestionId: 'interview.swift.some_vs_any.005',
        question: 'What is the internal memory layout of an existential container in Swift?',
        modelAnswer: 'An existential container consists of a 3-word buffer for inline value storage, a value witness table (VWT) pointer for lifecycle management (copy/destroy), and protocol witness table (PWT) pointers for method dispatch. Values larger than 3 words are allocated on the heap.',
        keyPoints: ['3-word inline buffer', 'Value Witness Table pointer', 'Protocol Witness Table pointer', 'Heap spillover'],
        difficulty: 'expert',
      },
    ],
    relatedTopics: ['swift-opaque-types', 'swift-generics'],
  },
  {
    id: 'interview.swift.generics_where.006',
    question: 'How do associated types and `where` clauses enable type constraints in Swift generics?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-generics',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 4,
    frequency: 'medium',
    tags: ['Swift', 'Generics', 'Associated Types', 'Type Constraints'],
    modelAnswer: 'In protocols, `associatedtype` acts as a placeholder for a type used within the protocol contract. `where` clauses allow developers to enforce constraints on generic parameters or associated types, such as requiring conformance to `Equatable`, `Hashable`, or type equality (e.g. `Element == String`). This allows specialized implementations in extensions.',
    keyPoints: [
      '`associatedtype` provides parameterized type contracts in protocols.',
      '`where` clauses refine generic functions and conditional extensions.',
      'Compile-time type verification ensures zero runtime type-checking overhead.',
    ],
    commonMistakes: [
      'Thinking associated type protocols can be used as simple types in pre-Swift 5.7 without `any`.',
    ],
    followUps: [
      {
        id: 'interview.swift.generics_where.006.f1',
        parentQuestionId: 'interview.swift.generics_where.006',
        question: 'What are primary associated types introduced in Swift 5.7?',
        modelAnswer: 'Primary associated types allow protocols with associated types to be constrained at call sites using generic-like syntax, such as `some Sequence<Int>` or `any Publisher<Data, Error>`.',
        keyPoints: ['Syntax `<T>` on protocols', 'Simplifies existentials with associated types'],
        difficulty: 'advanced',
      },
    ],
    relatedTopics: ['swift-generics'],
  },
  {
    id: 'interview.swift.method_dispatch.007',
    question: 'Explain the 4 types of method dispatch in Swift and how they affect runtime performance.',
    domainId: 'swift',
    moduleId: 'swift-advanced-mod',
    topicId: 'swift-method-dispatch',
    difficulty: 'expert',
    type: 'conceptual',
    estimatedMinutes: 5,
    frequency: 'high',
    tags: ['Swift', 'Method Dispatch', 'V-Table', 'Witness Tables'],
    modelAnswer: 'The 4 types are: 1) Inline / Direct Dispatch: function calls jump directly to memory address, enables compiler optimizations (fastest, used on final classes, structs, and extension methods). 2) Table / V-Table Dispatch: class v-table lookup used for class inheritance polymorphism. 3) Protocol Witness Table (PWT) Dispatch: lookup table for protocol conformance dispatch on value or reference types. 4) Message Dispatch: dynamic Objective-C `objc_msgSend` used for `@objc dynamic` and KVO (slowest, highly dynamic).',
    keyPoints: [
      'Direct dispatch is the fastest and allows inlining.',
      'V-Table dispatch enables class inheritance polymorphism.',
      'Protocol Witness Tables enable polymorphism for structs and enums.',
      'Message dispatch (`objc_msgSend`) enables swizzling and runtime reflection.',
      'Marking classes `final` shifts dispatch from V-table to direct dispatch.',
    ],
    commonMistakes: [
      'Believing protocol extensions use dynamic table dispatch (unspecified extension methods use direct dispatch).',
    ],
    followUps: [
      {
        id: 'interview.swift.method_dispatch.007.f1',
        parentQuestionId: 'interview.swift.method_dispatch.007',
        question: 'Why does marking a method `final` improve performance?',
        modelAnswer: 'It eliminates the need for dynamic V-table lookup, allowing the compiler to use direct dispatch and potentially inline the entire method body into the caller, removing call overhead.',
        keyPoints: ['Direct dispatch', 'Compiler inlining', 'Zero V-table lookup'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-method-dispatch'],
  },
  {
    id: 'interview.swift.inout_parameters.008',
    question: 'How do `inout` parameters work in Swift? Are they pass-by-reference?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-functions',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'medium',
    tags: ['Swift', 'inout', 'Memory', 'Parameters'],
    modelAnswer: 'No, `inout` parameters in Swift are officially copy-in copy-out (also called value-result pass-by-value). When the function is called, the argument value is copied in. During function execution, mutations affect the local copy. When the function returns, the mutated value is copied back to the original storage. The compiler may optimize this to direct pointer reference if memory safety permits, but language semantics guarantee copy-in copy-out.',
    keyPoints: [
      'Semantics are copy-in copy-out, not true pass-by-reference.',
      'Property observers (`didSet`/`willSet`) fire when the function returns.',
      'Enforces exclusivity of memory access (Law of Exclusivity: simultaneous access error if passed twice).',
    ],
    commonMistakes: [
      'Assuming `didSet` triggers continuously during function execution (it only triggers once upon function return).',
      'Passing the same variable as two different `inout` arguments, triggering runtime exclusivity violations.',
    ],
    followUps: [
      {
        id: 'interview.swift.inout_parameters.008.f1',
        parentQuestionId: 'interview.swift.inout_parameters.008',
        question: 'What is the Swift Law of Exclusivity?',
        modelAnswer: 'It requires that two accesses to the same memory location cannot overlap in time if at least one is a write. `inout` requires write access for the entire duration of the call.',
        keyPoints: ['Overlapping memory access', 'Exclusivity violation crashes'],
        difficulty: 'advanced',
      },
    ],
    relatedTopics: ['swift-functions'],
  },
  {
    id: 'interview.swift.result_builders.009',
    question: 'How do Result Builders (@resultBuilder) work in Swift, and how does @ViewBuilder utilize them?',
    domainId: 'swift',
    moduleId: 'swift-advanced-mod',
    topicId: 'swift-result-builders',
    difficulty: 'advanced',
    type: 'code-analysis',
    estimatedMinutes: 4,
    frequency: 'medium',
    tags: ['Swift', 'Result Builders', 'SwiftUI', 'DSL'],
    modelAnswer: 'A Result Builder is an embedded DSL compiler feature marked with `@resultBuilder`. It translates statement blocks into expressions by generating calls to static methods like `buildBlock`, `buildOptional`, `buildEither`, and `buildArray`. `@ViewBuilder` in SwiftUI uses this to convert sequences of view definitions inside a closure into a single `TupleView` without explicit return statements.',
    keyPoints: [
      'Transforms statements into expressions at compile time.',
      '`buildBlock` combines multiple subviews into TupleView.',
      '`buildEither(first:/second:)` handles if-else branches.',
      '`buildOptional` handles optional if statements.',
    ],
    commonMistakes: [
      'Thinking result builders evaluate dynamically at runtime (they are strictly compile-time transformations).',
    ],
    followUps: [
      {
        id: 'interview.swift.result_builders.009.f1',
        parentQuestionId: 'interview.swift.result_builders.009',
        question: 'Why did early SwiftUI views have a 10-child limit in a single container?',
        modelAnswer: 'Because `ViewBuilder.buildBlock` was implemented with overloaded functions taking up to 10 generic arguments (`c0, c1, ... c9`). In later Swift versions, parameter packs solved this limitation.',
        keyPoints: ['Overloaded buildBlock definitions', 'Parameter packs solution'],
        difficulty: 'advanced',
      },
    ],
    relatedTopics: ['swift-result-builders', 'swiftui-state'],
  },
  {
    id: 'interview.swift.macros_swift6.010',
    question: 'What are Swift Macros, and what is the difference between Freestanding and Attached macros?',
    domainId: 'swift',
    moduleId: 'swift-advanced-mod',
    topicId: 'swift-macros',
    difficulty: 'expert',
    type: 'conceptual',
    estimatedMinutes: 4,
    frequency: 'medium',
    tags: ['Swift', 'Macros', 'Swift 6', 'SwiftSyntax'],
    modelAnswer: 'Swift Macros (introduced in Swift 5.9) perform compile-time AST code transformation via SwiftSyntax in an isolated, sandboxed subprocess. Freestanding macros are invoked with `#` (e.g. `#predicate`, `#warning`) and either produce expressions (`#freestanding(expression)`) or declarations. Attached macros are attached to declarations with `@` (e.g. `@Observable`, `@Model`) and can add members, peer declarations, accessors, or conformances.',
    keyPoints: [
      'Compile-time AST transformations, executed in an out-of-process sandbox.',
      'Freestanding (#) vs Attached (@).',
      'Attached roles: member, peer, accessor, extension, memberAttribute.',
      'Guaranteed transparency: Xcode can expand macro output inline.',
    ],
    commonMistakes: [
      'Believing macros can access network or filesystem during build (they run in a hermetic sandbox).',
    ],
    followUps: [
      {
        id: 'interview.swift.macros_swift6.010.f1',
        parentQuestionId: 'interview.swift.macros_swift6.010',
        question: 'How does the @Observable macro replace Combine-based ObservableObject?',
        modelAnswer: '`@Observable` generates a private `ObservationRegistrar` member, replaces stored properties with computed accessors that register reads (`access`) and mutations (`withMutation`), allowing SwiftUI to observe individual property reads instead of whole-object invalidations.',
        keyPoints: ['ObservationRegistrar', 'Fine-grained property accessors', 'Eliminates object-level invalidation'],
        difficulty: 'expert',
      },
    ],
    relatedTopics: ['swift-macros', 'swiftui-observation'],
  },
  {
    id: 'interview.swift.enums_algebraic.011',
    question: 'Why are Swift enums considered Algebraic Data Types (Sum Types), and how do associated values differ from raw values?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-enums',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'medium',
    tags: ['Swift', 'Enums', 'Sum Types', 'Pattern Matching'],
    modelAnswer: 'Swift enums are sum types because an instance represents exactly one of several possible distinct variants at any given time. Associated values allow custom heterogeneous data payloads to be stored with each specific enum case, decided at runtime upon instantiation. Raw values are compile-time constants (strings, characters, integers) shared across all instances of that case for serialization/deserialization.',
    keyPoints: [
      'Sum types represent exclusive choice between variants.',
      'Associated values hold arbitrary per-instance data payloads.',
      'Raw values are uniform compile-time constants conforming to RawRepresentable.',
      'Recursive enums require the `indirect` keyword for heap pointer boxing.',
    ],
    commonMistakes: [
      'Attempting to give an enum both raw values and associated values simultaneously.',
      'Forgetting `indirect` on recursive data structures like linked lists or binary trees.',
    ],
    followUps: [
      {
        id: 'interview.swift.enums_algebraic.011.f1',
        parentQuestionId: 'interview.swift.enums_algebraic.011',
        question: 'Why does a recursive enum require the `indirect` keyword?',
        modelAnswer: 'Enums are value types whose memory footprint must be known at compile time. A recursive enum without a pointer indirection would have infinite size. `indirect` tells the compiler to insert a reference pointer layer (box) on the heap.',
        keyPoints: ['Memory size calculation', 'Heap indirection pointer'],
        difficulty: 'advanced',
      },
    ],
    relatedTopics: ['swift-enums'],
  },
  {
    id: 'interview.swift.typed_throws.012',
    question: 'What are Typed Throws in Swift 6, and when should you prefer them over untyped `throws`?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-error-handling',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Swift 6', 'Error Handling', 'Typed Throws'],
    modelAnswer: 'In Swift 6, functions can declare exact error types using `throws(CustomError)`. In the `catch` block, the error is statically typed as `CustomError` without requiring manual downcasting. Standard `throws` is equivalent to `throws(any Error)`. Typed throws are recommended in performance-critical code, embedded Swift, or closed subsystems where exhaustive error handling is strictly enforced. In general application code with evolving API boundaries, untyped `throws` is still preferred to avoid breaking public API contracts when new error cases are introduced.',
    keyPoints: [
      '`throws(SpecificError)` provides compile-time guarantee of error types.',
      'Eliminates existential `any Error` boxing overhead in error propagation.',
      'Exhaustive catch blocks without requiring a catch-all block.',
      'Should be used cautiously in public library APIs to preserve evolution flexibility.',
    ],
    commonMistakes: [
      'Overusing typed throws in high-level application code where error types frequently change.',
    ],
    followUps: [
      {
        id: 'interview.swift.typed_throws.012.f1',
        parentQuestionId: 'interview.swift.typed_throws.012',
        question: 'How does typed throws interact with `Never`?',
        modelAnswer: 'A function declared `throws(Never)` is recognized by the compiler as a non-throwing function, allowing generic code like `Result` and `rethrows` to unify throwing and non-throwing paths.',
        keyPoints: ['throws(Never) is non-throwing', 'Unifies generic error handling'],
        difficulty: 'advanced',
      },
    ],
    relatedTopics: ['swift-error-handling'],
  },
  {
    id: 'interview.swift.properties_observers.013',
    question: 'How do stored, computed, and lazy properties differ, and when do property observers (`willSet`/`didSet`) fail to trigger?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-properties',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'medium',
    tags: ['Swift', 'Properties', 'Lazy', 'Observers'],
    modelAnswer: 'Stored properties allocate memory for value storage; computed properties calculate a value on demand via getters/setters without dedicated storage. Lazy properties delay initialization until first access and must be mutable (`var`). Property observers `willSet` and `didSet` trigger on mutation, EXCEPT during object initialization in `init` or when modified directly through `inout` parameter pass before return.',
    keyPoints: [
      'Stored properties hold values in memory; computed properties act as functions.',
      '`lazy` properties are not thread-safe and must be `var`.',
      '`willSet`/`didSet` do NOT trigger inside initializers.',
      '`oldValue` and `newValue` default variable names in observers.',
    ],
    commonMistakes: [
      'Assuming `lazy` properties are thread-safe (concurrent first access can cause race condition initialization).',
      'Expecting `didSet` to run during `init`.',
    ],
    followUps: [
      {
        id: 'interview.swift.properties_observers.013.f1',
        parentQuestionId: 'interview.swift.properties_observers.013',
        question: 'Why can a `lazy` property never be declared as `let`?',
        modelAnswer: 'Because a constant (`let`) property must hold its finalized value before initialization finishes. A `lazy` property is nil initially and mutated to its calculated value upon first access.',
        keyPoints: ['Mutation on first access', 'Initialization invariants'],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-properties'],
  },
  {
    id: 'interview.swift.access_control.014',
    question: 'Detail the 6 access levels in modern Swift, including `open` vs `public` and the `package` access level.',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-access-control',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 4,
    frequency: 'medium',
    tags: ['Swift', 'Access Control', 'Modules', 'Package'],
    modelAnswer: 'From most to least restrictive: 1) `private`: visible only within the enclosing declaration and extensions in the same file. 2) `fileprivate`: visible across the entire source file. 3) `internal`: default level, visible anywhere within the defining module. 4) `package` (Swift 5.9+): visible across all modules in the same Swift Package, but hidden from external consumers. 5) `public`: accessible outside the module, but cannot be subclassed or overridden outside the module. 6) `open`: accessible, subclassable, and overridable outside the defining module (classes and class methods only).',
    keyPoints: [
      '`open` permits subclassing/overriding outside the module; `public` prohibits it.',
      '`package` access enables clean multi-target SPM modularization.',
      '`fileprivate` scope is strictly the file.',
      '`private(set)` enables public read with private write encapsulation.',
    ],
    commonMistakes: [
      'Confusing `open` with `public` for structs (structs cannot be `open` since they do not support inheritance).',
    ],
    followUps: [
      {
        id: 'interview.swift.access_control.014.f1',
        parentQuestionId: 'interview.swift.access_control.014',
        question: 'What is the utility of `private(set)`?',
        modelAnswer: 'It allows read-only visibility to external consumers while restricting mutations strictly to the defining type, eliminating boilerplate getter methods.',
        keyPoints: ['Encapsulation', 'Read-only external interface'],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-access-control', 'arch-modular-spm'],
  },
  {
    id: 'interview.swift.two_phase_init.015',
    question: 'Explain Swift Two-Phase Initialization and why the compiler enforces it.',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-initialization-deinitialization',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Swift', 'Initialization', 'Two-Phase', 'Safety'],
    modelAnswer: 'Swift enforces Two-Phase Initialization for classes to prevent memory corruption and uninitialized property access. Phase 1: All stored properties in the current class are initialized, then `super.init()` is called up the inheritance chain until the root class is reached. At this point, memory is fully allocated. Phase 2: Each class can customize stored properties, access `self`, and call instance methods down the chain.',
    keyPoints: [
      'Phase 1 initializes all stored properties upwards before super.init().',
      'Phase 2 allows self access, instance method calls, and property customization downwards.',
      'Designated initializers must call super.init; convenience initializers must delegate across (`self.init`).',
      'Prevents accessing uninitialized state before memory is valid.',
    ],
    commonMistakes: [
      'Attempting to call instance methods or pass `self` before `super.init()` completes Phase 1.',
    ],
    followUps: [
      {
        id: 'interview.swift.two_phase_init.015.f1',
        parentQuestionId: 'interview.swift.two_phase_init.015',
        question: 'What are the rules governing convenience initializers?',
        modelAnswer: 'A convenience initializer must delegate to another initializer in the same class (`self.init`), and ultimately must resolve to a designated initializer.',
        keyPoints: ['Delegate across', 'Must ultimately call designated initializer'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-initialization-deinitialization'],
  },
  {
    id: 'interview.swift.variables_types.016',
    question: 'What is the difference between let and var in Swift, and can a value declared with let ever be mutated?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-variables-types',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Variables', 'Constants', 'let vs var', 'Mutability'],
    modelAnswer: "let creates a compile-time immutable binding — you cannot reassign what it points to. But if the value is a reference type (a class instance), the object's own var properties can still be mutated through that same reference, because it's the binding that's immutable, not necessarily the object's internal state. For value types (structs, enums), let effectively freezes everything, because mutating any property would require reassigning the whole value via copy-on-write.",
    keyPoints: [
      "let/var control reassignment of the binding, not necessarily the referenced object's mutability",
      'With value types (structs/enums), let effectively freezes all properties',
      'With reference types (classes), let only prevents reassigning which object the constant points to',
    ],
    commonMistakes: [
      'Assuming let on a class instance makes the whole object immutable',
    ],
    followUps: [
      {
        id: 'interview.swift.variables_types.016.f1',
        parentQuestionId: 'interview.swift.variables_types.016',
        question: "How would you make a class instance's properties truly immutable regardless of let/var?",
        modelAnswer: 'Declare the properties themselves as let inside the class definition, or use a struct instead.',
        keyPoints: [
          'Declare the properties themselves as let inside the class definition, or use a struct instead.',
        ],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-variables-types', 'swift-optionals'],
  },
  {
    id: 'interview.swift.variables_types.017',
    question: "How does Swift's type inference system work, and when do you need to provide an explicit type annotation?",
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-variables-types',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Type Inference', 'Static Typing', 'Numerics'],
    modelAnswer: "The compiler infers a variable's static type from its initializer expression at the point of declaration — this happens entirely at compile time, not at runtime. Once inferred, the type is fixed for the variable's lifetime. Explicit annotations become necessary when there's no initializer yet, when you want a numeric type other than the literal default (Double instead of the inferred Int), or when the inferred type would be ambiguous given overloaded APIs.",
    keyPoints: [
      'Static type inference happens at compile time, not runtime',
      "Once inferred, a variable's type is fixed for its lifetime",
      'Numeric literals default to Int or Double based on syntax, not intended use',
    ],
    commonMistakes: [
      'Assuming type inference means Swift is dynamically typed',
      'Not realizing numeric literal defaults can silently produce the wrong type for the intended use',
    ],
    followUps: [
      {
        id: 'interview.swift.variables_types.017.f1',
        parentQuestionId: 'interview.swift.variables_types.017',
        question: "If you write let x = 5 / 2, what's the value and type of x, and why?",
        modelAnswer: '2, and Int — both literals default to Int given no other context, so the division is integer division and truncates before any later conversion could apply.',
        keyPoints: [
          '2, and Int — both literals default to Int given no other context, so the division is integer division and truncates before any later conversion could apply.',
        ],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-variables-types'],
  },
  {
    id: 'interview.swift.variables_types.018',
    question: 'Does a Swift typealias create a new distinct type? What is it actually for?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-variables-types',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'typealias', 'Type Safety', 'Domain Modeling'],
    modelAnswer: "No — a typealias is purely a compile-time name substitution. It does not create a new type and provides no type-safety separation from the underlying type. typealias UserID = String means UserID and String remain fully interchangeable everywhere. It's used for readability, domain modeling, and simplifying complex generic signatures — not for enforcing distinct identity. If genuine type-safety separation is needed, a wrapper struct is required instead.",
    keyPoints: [
      'typealias is pure name substitution, resolved at compile time',
      'No runtime or type-safety distinction from the underlying type',
      'Used for readability and simplifying generics, not for type-safety boundaries',
    ],
    commonMistakes: [
      'Assuming typealias enforces type safety the way a distinct nominal type would',
      'Using typealias as a substitute for a wrapper type when uniqueness actually matters',
    ],
    followUps: [
      {
        id: 'interview.swift.variables_types.018.f1',
        parentQuestionId: 'interview.swift.variables_types.018',
        question: 'How would you redesign UserID to prevent it from being accidentally interchanged with a plain String parameter?',
        modelAnswer: 'Wrap it in a struct: struct UserID { let rawValue: String } — this creates a genuinely distinct nominal type that the compiler will enforce.',
        keyPoints: [
          'Wrap it in a struct: struct UserID { let rawValue: String } — this creates a genuinely distinct nominal type that the compiler will enforce.',
        ],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-variables-types'],
  },
  {
    id: 'interview.swift.control_flow.019',
    question: "What is the difference between 'if let' and 'guard let', and when should you use each?",
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-control-flow',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Control Flow', 'if let', 'guard let', 'Optional Binding'],
    modelAnswer: 'if let is scoped binding — the unwrapped value is available only inside the if block and is the standard choice for conditional unwrapping. guard let is early exit — it unwraps at the start of a function/scope and requires an else clause with a return or throw; the unwrapped value is available for the rest of the scope. Use if let for simple optional checks, guard let for validating preconditions at the top of a function (the happy-path pattern).',
    keyPoints: [
      'if let scopes the unwrapped variable to the if block',
      'guard let unwraps in the enclosing scope and requires early exit',
      "guard let prevents the 'pyramid of doom' from nested if lets",
      'guard let is preferred at function start for precondition validation',
    ],
    commonMistakes: [
      'Using if let when guard let would be clearer — leading to unnecessary nesting',
      'Forgetting that guard let requires an exit (return/throw/break/continue)',
    ],
    followUps: [
      {
        id: 'interview.swift.control_flow.019.f1',
        parentQuestionId: 'interview.swift.control_flow.019',
        question: "What happens if you use guard without let, like 'guard condition else { return }'?",
        modelAnswer: "It works — guard can be used for any Boolean condition, not just optionals. It's a way to assert a condition upfront and exit if it fails, useful for precondition checking.",
        keyPoints: [
          'guard can be used for any Boolean condition, not just optionals',
          'Asserts a condition upfront and exits on failure for precondition checking',
        ],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-control-flow'],
  },
  {
    id: 'interview.swift.control_flow.020',
    question: 'Why does Swift require switch statements to be exhaustive, and what happens if you forget a case?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-control-flow',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Control Flow', 'switch', 'Exhaustiveness', 'Compiler Safety'],
    modelAnswer: "Swift requires exhaustiveness to prevent silent bugs where a case is unintentionally missed. The compiler will produce an error if a switch doesn't handle all possible values. For enums, this means you must handle every case or use default. For integers or strings without an obvious complete set, default is required. This is intentional — it's a safety feature that forces you to think about all possibilities.",
    keyPoints: [
      'Exhaustiveness is a compiler requirement, not optional',
      'Missing a case is a compile error, not a runtime surprise',
      'For enums, compiler knows all cases and requires them',
      'default is a catch-all but should only be used when truly needed',
    ],
    commonMistakes: [
      "Adding default unnecessarily — if the compiler doesn't require it, you can handle cases explicitly",
      'Assuming default will catch all cases — if you later add a new enum case, default still runs but silently skips the new logic',
    ],
    followUps: [
      {
        id: 'interview.swift.control_flow.020.f1',
        parentQuestionId: 'interview.swift.control_flow.020',
        question: 'If you add a new case to an enum that has a switch statement elsewhere, what happens?',
        modelAnswer: "The switch becomes non-exhaustive and fails to compile (if there's no default). This is intentional — it forces you to handle the new case everywhere. This is why default should be avoided when you want exhaustive matching.",
        keyPoints: [
          'The switch becomes non-exhaustive and fails to compile if there is no default',
          'Forces you to handle the new case everywhere, preventing silent bugs',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-control-flow'],
  },
  {
    id: 'interview.swift.control_flow.021',
    question: 'What is pattern matching, and why is it powerful in Swift?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-control-flow',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Pattern Matching', 'Destructuring', 'Enums', 'Tuples'],
    modelAnswer: "Pattern matching is the ability to destructure data and branch on it simultaneously — extracting values from optionals, enums, or tuples while checking conditions. Instead of first checking if a value exists, then unwrapping it separately, you do both in one operation: 'if let value = optional' or 'switch result { case .success(let data): }'. This is powerful because it's type-safe (the compiler forces you to handle nil), readable (intent is clear), and concise.",
    keyPoints: [
      'Pattern matching destructures and checks in one step',
      'Works with optionals, enums, tuples, and arbitrary nested structures',
      "Compiler enforces exhaustiveness — you can't forget the failure case",
      'where clauses add additional conditions to patterns',
    ],
    commonMistakes: [
      "Thinking pattern matching is just an if statement — it's more powerful because it extracts values",
      'Overcomplicating patterns with too much nesting instead of using multiple where clauses or intermediate variables',
    ],
    followUps: [
      {
        id: 'interview.swift.control_flow.021.f1',
        parentQuestionId: 'interview.swift.control_flow.021',
        question: 'How would you match on a tuple with pattern matching to extract only certain fields?',
        modelAnswer: "Use underscore (_) for fields you don't care about: 'switch point { case (let x, 0): ... }' matches any point where y is 0 and extracts x. Or use 'case (_, let y) where y > 10' to ignore x but check y.",
        keyPoints: [
          'Use underscore (_) for fields you do not care about',
          'Use let bindings with where clauses to conditionally extract elements',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-control-flow'],
  },
  {
    id: 'interview.swift.control_flow.022',
    question: "What is the difference between 'for-in', 'while', and 'repeat-while' loops?",
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-control-flow',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Loops', 'for-in', 'while', 'repeat-while'],
    modelAnswer: "for-in loops iterate over collections (arrays, ranges, strings) — the number of iterations is known upfront. while loops repeat as long as a condition is true — the number of iterations is not known upfront. repeat-while is like while, but the body runs at least once before checking the condition. Use for-in when iterating a collection, while when the loop condition depends on changing state, and repeat-while when you need to run the body at least once (rare, but useful for user input validation).",
    keyPoints: [
      'for-in is for collections with a known iteration count',
      'while is condition-driven, checked before each iteration',
      'repeat-while guarantees at least one execution',
      "In Swift, for-in is preferred when possible (it's the 'fast path')",
    ],
    commonMistakes: [
      'Using while when for-in would be clearer — prefer for-in for collections',
      'Forgetting to update the loop variable in a while loop, leading to infinite loops',
    ],
    followUps: [
      {
        id: 'interview.swift.control_flow.022.f1',
        parentQuestionId: 'interview.swift.control_flow.022',
        question: 'When would you use repeat-while in a real app?',
        modelAnswer: "Validation loops, like 'ask the user for input, repeat until they enter something valid'. Also menu systems where you want to show the menu at least once.",
        keyPoints: [
          'Validation loops (repeat until valid input is received)',
          'UI/menu systems that must display at least once',
        ],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-control-flow'],
  },
  {
    id: 'interview.swift.control_flow.023',
    question: "Explain the difference between 'if case let' and 'switch case' for pattern matching on enums.",
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-control-flow',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Pattern Matching', 'if case let', 'switch', 'Enums'],
    modelAnswer: "Both if case let and switch case can match enum values and destructure them. if case let checks a single case inline and is useful for quick checks. switch case handles multiple cases exhaustively. Use if case let when you're only interested in one specific case (e.g., 'if case .success(let value)' ignores failures). Use switch when you need to handle all cases or multiple different outcomes.",
    keyPoints: [
      'if case let is a shorthand for matching one specific pattern',
      'switch case is exhaustive and handles multiple patterns',
      'Both extract values using the same syntax (let x)',
      'if case let returns true/false; switch case branches',
    ],
    commonMistakes: [
      "Using switch when if case let is simpler — if you only care about one case, if case let is clearer",
      "Forgetting that if case let doesn't require exhaustiveness — it's just a Boolean check",
    ],
    followUps: [
      {
        id: 'interview.swift.control_flow.023.f1',
        parentQuestionId: 'interview.swift.control_flow.023',
        question: "If you use 'if case let' on an enum and the case doesn't match, what happens?",
        modelAnswer: 'The condition evaluates to false and the else block runs (if present). Unlike switch, if case let does not require exhaustiveness.',
        keyPoints: [
          'Condition evaluates to false',
          'Else block executes if present; execution continues without error',
        ],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-control-flow'],
  },
  {
    id: 'interview.swift.control_flow.024',
    question: "What does this code print, and why?\n\nlet nums = [1, 2, 3, 4, 5]\nfor num in nums {\n    if num % 2 == 0 {\n        continue\n    }\n    print(num)\n}",
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-control-flow',
    difficulty: 'intermediate',
    type: 'code-analysis',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Control Flow', 'continue', 'break', 'Loops'],
    modelAnswer: 'It prints: 1, 3, 5. The continue statement skips the current iteration and moves to the next one. When num is 2 or 4 (even), continue skips the print statement. Odd numbers (1, 3, 5) execute print.',
    keyPoints: [
      'continue skips the rest of the loop body and goes to the next iteration',
      'break exits the loop entirely',
      'Both are control flow keywords that modify loop behavior',
    ],
    commonMistakes: [
      'Confusing continue and break — continue goes to next iteration, break exits the loop',
      'Using break when you should use continue or vice versa',
    ],
    followUps: [
      {
        id: 'interview.swift.control_flow.024.f1',
        parentQuestionId: 'interview.swift.control_flow.024',
        question: "What would change if you used 'break' instead of 'continue'?",
        modelAnswer: 'It would print only 1, then exit the loop. break terminates the entire loop, not just the current iteration.',
        keyPoints: [
          'break terminates the entire loop immediately',
          'Only 1 is printed because the loop exits on reaching 2',
        ],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-control-flow'],
  },
  {
    id: 'interview.swift.control_flow.025',
    question: "What is the 'where' clause in a switch or for loop, and when should you use it?",
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-control-flow',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Pattern Matching', 'where clause', 'switch', 'for-in'],
    modelAnswer: "The where clause adds an additional condition to a pattern — it filters cases or loop iterations. In a switch, 'case let x where x > 0' matches any case where x is positive. In a for loop, 'for item in collection where item.isActive' iterates only over active items. Use where when you need to combine pattern matching with additional logic, instead of nesting multiple levels of if statements.",
    keyPoints: [
      'where adds Boolean conditions to pattern matches',
      'Prevents the need for nested if statements inside switch/for bodies',
      'Improves readability of complex conditions',
      'Works with optionals, tuples, and enums',
    ],
    commonMistakes: [
      'Overusing where when a simple if inside the case body is clearer',
      'Nesting multiple where clauses instead of combining conditions with &&',
    ],
    followUps: [
      {
        id: 'interview.swift.control_flow.025.f1',
        parentQuestionId: 'interview.swift.control_flow.025',
        question: "Would 'for item in collection where item.isActive' be faster or slower than looping and checking inside?",
        modelAnswer: 'No difference in performance — it is purely a readability preference. The compiler generates the same code. Use where for cleaner intent.',
        keyPoints: [
          'Identical compiler-generated performance',
          'Syntactic and readability preference expressing clearer intent',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-control-flow'],
  },
  {
    id: 'interview.swift.control_flow.026',
    question: 'In Swift 6, switch can be an expression that returns a value. How does this differ from switch as a statement, and why is it useful?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-control-flow',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Swift 6', 'switch expressions', 'Control Flow', 'Functional'],
    modelAnswer: 'As a statement, switch just executes code branches without returning anything. As an expression (Swift 6+), switch returns a value directly, which you can assign to a variable or return from a function. This eliminates the need for a separate variable to hold different values per branch. Example: \'let description = switch color { case .red: "hot" case .blue: "cool" }\' is cleaner than setting description in each case separately.',
    keyPoints: [
      'switch expressions return a value directly',
      'Eliminates the need for pre-declaring a variable and assigning it in each case',
      'Makes code more functional and concise',
      'Still requires exhaustiveness — all branches must return a value of the same type',
    ],
    commonMistakes: [
      'Forgetting that all branches must return the same type when using switch as an expression',
      'Mixing statement and expression syntax — pick one pattern and stick with it',
    ],
    followUps: [
      {
        id: 'interview.swift.control_flow.026.f1',
        parentQuestionId: 'interview.swift.control_flow.026',
        question: 'If your switch expression branches return different types, what happens?',
        modelAnswer: 'Compiler error — all branches of an expression must return the same type. If you need to return different types, you either use a statement or wrap different types in an enum/protocol.',
        keyPoints: [
          'Compile-time error requiring unified type',
          'Use an enum or protocol if heterogeneous return values are required',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-control-flow'],
  },
  {
    id: 'interview.swift.functions.027',
    question: 'What is the difference between an argument label and a parameter name in Swift?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-functions',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Functions', 'Argument Labels', 'Parameters'],
    modelAnswer: "The parameter name is what the function body uses to refer to the value. The argument label is what the caller uses when invoking the function. A parameter can have both: func move(to destination: String) — 'to' is the external label (caller uses move(to:)), and 'destination' is the parameter name (function body uses destination). You can omit the external label with underscore: func move(_ destination: String) makes the call positional instead of labeled.",
    keyPoints: [
      'External label (argument label) is for callers',
      'Parameter name is for the function body',
      'They can be the same or different',
      'Underscore (_) omits the external label for positional arguments',
    ],
    commonMistakes: [
      'Confusing which is which — the external label comes first in the declaration',
      'Forgetting that good argument labels make function calls self-documenting',
    ],
    followUps: [
      {
        id: 'interview.swift.functions.027.f1',
        parentQuestionId: 'interview.swift.functions.027',
        question: "Why would you use different external and internal names, like 'to destination'?",
        modelAnswer: "The external label makes the call readable (move(to:)), while the internal name is meaningful in context (destination is clear what it is). Sometimes they're the same for brevity.",
        keyPoints: [
          'External label creates human-readable call sites (e.g. move(to:))',
          'Internal parameter name maintains clear context within the function implementation',
        ],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-functions'],
  },
  {
    id: 'interview.swift.functions.028',
    question: 'What are default parameter values, and why is the order of parameters important when using them?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-functions',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Functions', 'Default Parameters', 'Signatures'],
    modelAnswer: 'Default parameters let you omit arguments that callers don\'t need to override. A parameter with a default is optional — callers can pass it or skip it. The order matters because required parameters (without defaults) must come before optional parameters (with defaults). If a required parameter came after an optional one, callers couldn\'t provide it without confusion. Swift enforces this at compile time.',
    keyPoints: [
      'Default parameters make common cases simple',
      'Required parameters must come before optional (with defaults)',
      'Compiler enforces the ordering',
      'Defaults improve API usability',
    ],
    commonMistakes: [
      'Putting a required parameter after a default — this is a compile error',
      'Assuming defaults make all arguments optional — only those with defaults are optional',
    ],
    followUps: [
      {
        id: 'interview.swift.functions.028.f1',
        parentQuestionId: 'interview.swift.functions.028',
        question: 'Can you have multiple parameters with defaults?',
        modelAnswer: 'Yes, any number of them, as long as they all come after required parameters. For example: func connect(to host: String, port: Int = 8080, timeout: Int = 30) — host is required, port and timeout are optional.',
        keyPoints: [
          'Any number of defaulted parameters can follow required parameters',
          'Callers can selectively override defaults by name',
        ],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-functions'],
  },
  {
    id: 'interview.swift.functions.029',
    question: 'What are variadic parameters, and how are they represented inside the function?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-functions',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Functions', 'Variadic Parameters', 'Arrays'],
    modelAnswer: "A variadic parameter accepts any number of arguments of the same type, declared with three dots (...). Inside the function, it's automatically converted to an array. For example, func sum(_ numbers: Int...) converts variadic Int arguments into an array [Int]. Variadic parameters must be the last parameter (or the last before a trailing closure). This is useful for functions that naturally accept 'one or more' of something.",
    keyPoints: [
      'Declared with ... (ellipsis)',
      "Inside the function, it's an array",
      'Variadic parameters must be last',
      "Useful for 'one or more' patterns",
    ],
    commonMistakes: [
      'Trying to use variadic parameters before other parameters — they must be last',
      'Forgetting that inside the function, the variadic parameter is an array',
    ],
    followUps: [
      {
        id: 'interview.swift.functions.029.f1',
        parentQuestionId: 'interview.swift.functions.029',
        question: 'Can you have multiple variadic parameters in one function?',
        modelAnswer: 'No, only one. If you need multiple variable-length argument groups, use arrays or separate function overloads.',
        keyPoints: [
          'Swift permits at most one variadic parameter per function signature',
          'Use explicit arrays or overloads when multiple variable-length inputs are needed',
        ],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-functions'],
  },
  {
    id: 'interview.swift.functions.030',
    question: 'What is the output of this code?\n\nfunc describe(_ value: Int = 10) {\n    print("Value: \\(value)")\n}\n\ndescribe()\ndescribe(20)',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-functions',
    difficulty: 'foundational',
    type: 'code-analysis',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Functions', 'Code Analysis', 'Default Parameters'],
    modelAnswer: "First call prints 'Value: 10' (uses the default). Second call prints 'Value: 20' (overrides the default). Default parameters are used when the caller doesn't provide an argument.",
    keyPoints: [
      'Default parameters are used when no argument is passed',
      'Passing an argument overrides the default',
      'Defaults make function calls optional for that parameter',
    ],
    commonMistakes: [
      'Assuming a default is always used — the caller can override it',
      'Not understanding that defaults make arguments truly optional',
    ],
    followUps: [
      {
        id: 'interview.swift.functions.030.f1',
        parentQuestionId: 'interview.swift.functions.030',
        question: 'If you have func describe(_ value: Int = 10, label: String), will this compile?',
        modelAnswer: "No — label doesn't have a default, and required parameters must come before optional ones. This is a compile error.",
        keyPoints: [
          'Compile-time error when required parameters follow defaulted parameters',
          'All required parameters must precede optional defaulted ones',
        ],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-functions'],
  },
  {
    id: 'interview.swift.functions.031',
    question: 'What is the advantage of returning multiple values using a tuple instead of creating a struct?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-functions',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Tuples', 'Functions', 'Return Types', 'Structs'],
    modelAnswer: 'Tuples are lightweight and don\'t require defining a new type — useful for temporary groupings of values returned from a function. A struct is better when the grouping is meaningful in the domain and will be used across multiple functions. Use tuples for ad-hoc returns, structs for first-class domain concepts. Example: a function that divides numbers might return (quotient, remainder) as a tuple. A function representing a User should return a User struct.',
    keyPoints: [
      'Tuples are lightweight, no new type needed',
      'Tuples are good for ad-hoc return values',
      'Structs are better for domain-meaningful groupings',
      'Tuples can have named fields for clarity',
    ],
    commonMistakes: [
      'Using a struct when a tuple would be simpler and more appropriate',
      'Overusing tuples for complex returns that really should be a named type',
    ],
    followUps: [
      {
        id: 'interview.swift.functions.031.f1',
        parentQuestionId: 'interview.swift.functions.031',
        question: 'Can you destructure a tuple return value?',
        modelAnswer: 'Yes, using the destructuring syntax: let (q, r) = divideWithRemainder(17, by: 5). Or use dot notation: result.quotient.',
        keyPoints: [
          'Tuple return values can be destructured directly via (a, b) syntax',
          'Named tuple members can also be accessed using dot notation',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-functions'],
  },
  {
    id: 'interview.swift.functions.032',
    question: "When would you prefer to return a value from a function instead of using an 'inout' parameter to modify the caller's argument?",
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-functions',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Swift', 'inout', 'Functions', 'Value Semantics', 'Immutability'],
    modelAnswer: "Returning a value is usually clearer and safer — it makes the mutation explicit and doesn't require the caller to pass a reference. inout is useful for efficiency when you're modifying large data structures in place (like sorting an array), or when the mutation is the primary purpose of the function (like increment(&x)). In general, prefer returning a value unless you have a specific reason to use inout. Functions that modify arguments and also return values (like sorted with a closure) are often confusing — pick one pattern.",
    keyPoints: [
      'Returning a value is explicit and clear',
      'inout is useful for efficiency with large data',
      'inout makes intent obvious (function modifies argument)',
      'Avoid mixing both inout and return values for clarity',
    ],
    commonMistakes: [
      'Using inout when a return value would be simpler',
      'Forgetting that inout makes the modification visible to the caller',
    ],
    followUps: [
      {
        id: 'interview.swift.functions.032.f1',
        parentQuestionId: 'interview.swift.functions.032',
        question: 'Why does Swift require & when calling an inout parameter?',
        modelAnswer: "It's a signal to the caller: 'This function will modify your argument.' It makes the mutation explicit and prevents surprises. Without it, callers might not realize their variable is being changed.",
        keyPoints: [
          'The & ampersand makes mutation at call sites explicit and visible',
          'Prevents unintended side effects and surprises for API consumers',
        ],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-functions'],
  },
  {
    id: 'interview.swift.collections.033',
    question: 'What is the difference between Array, Set, and Dictionary, and when should you use each?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-collections',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Collections', 'Array', 'Set', 'Dictionary', 'Value Semantics'],
    modelAnswer: "Array is ordered and allows duplicates — use it by default. Set is unordered, enforces uniqueness, and provides O(1) membership checking — use it when you care about 'does this exist' not 'what position is it'. Dictionary stores key-value pairs with O(1) lookup by key — use it when you need to associate values with unique keys. All three are value types with copy-on-write optimization.",
    keyPoints: [
      'Array: ordered, allows duplicates, indexed access',
      'Set: unordered, unique, fast membership checks',
      'Dictionary: key-value pairs, fast lookup by key',
      'All three are value types, not reference types',
    ],
    commonMistakes: [
      'Using Array when Set would be more appropriate — Array membership is O(n), Set is O(1)',
      "Assuming Set and Dictionary preserve insertion order — they don't",
    ],
    followUps: [
      {
        id: 'interview.swift.collections.033.f1',
        parentQuestionId: 'interview.swift.collections.033',
        question: 'If you need to store unique values but also preserve insertion order, what would you use?',
        modelAnswer: "Swift's standard library doesn't have an ordered set. You'd use an Array and manually check for duplicates, or use a third-party library. For key-value with order, you'd use Array of tuples.",
        keyPoints: [
          'Swift standard library lacks built-in OrderedSet',
          'Use an Array with duplicate checking or OrderedCollections package',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-collections'],
  },
  {
    id: 'interview.swift.collections.034',
    question: "Why does a Dictionary lookup return an optional, and what's the safest way to access a value?",
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-collections',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Collections', 'Dictionary', 'Optionals'],
    modelAnswer: "Dictionary lookup returns an optional because the key might not exist in the dictionary. Returning nil instead of crashing forces the caller to handle the missing case explicitly. The safest ways are: use if let (if let value = dict[key]), use nil-coalescing with a default (dict[key, default: defaultValue]), or use the null-coalescing operator (dict[key] ?? defaultValue). Never force-unwrap a Dictionary lookup.",
    keyPoints: [
      'Dictionary[key] returns Optional<Value>, not Value',
      'The key might not exist — optional makes this safe',
      'Use if let, nil-coalescing, or default parameter to safely unwrap',
      'Force-unwrapping Dictionary lookups is a crash risk',
    ],
    commonMistakes: [
      'Forgetting that Dictionary lookup returns optional',
      'Force-unwrapping with ! without checking the key exists',
      'Assuming a key exists and crashing at runtime',
    ],
    followUps: [
      {
        id: 'interview.swift.collections.034.f1',
        parentQuestionId: 'interview.swift.collections.034',
        question: "What's the difference between dict[key] = nil and removeValue(forKey:)?",
        modelAnswer: 'Both remove the key, but dict[key] = nil is the idiomatic Swift way. removeValue(forKey:) returns the removed value as an optional, which is useful if you need to know what was there.',
        keyPoints: [
          'dict[key] = nil is idiomatic for deletion',
          'removeValue(forKey:) returns the deleted value as an optional',
        ],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-collections'],
  },
  {
    id: 'interview.swift.collections.035',
    question: 'What is the Hashable protocol, and why do Set and Dictionary require their elements/keys to be Hashable?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-collections',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Collections', 'Hashable', 'Set', 'Dictionary'],
    modelAnswer: 'Hashable is a protocol that allows a type to produce a hash value, enabling O(1) average-case lookups in hash tables. Sets and Dictionaries use hash tables under the hood — they hash the element/key to determine where to store it in memory, then use that hash to find it later. Without hashing, Sets and Dictionaries would have to use slower data structures (like balanced trees). Hashable requires conformance to Equatable, so two equal values must produce the same hash.',
    keyPoints: [
      'Hashable enables hash-table-based collections',
      'Hash tables provide O(1) average lookup, which is why Sets/Dicts are fast',
      'Hashable requires Equatable — equal values must hash identically',
      'Primitive types (Int, String, Bool) are Hashable; custom types must conform',
    ],
    commonMistakes: [
      "Thinking Hashable is just about speed — it's essential for correctness in hash tables",
      'Mutating a Hashable value after inserting it — changes its hash, breaks lookups',
    ],
    followUps: [
      {
        id: 'interview.swift.collections.035.f1',
        parentQuestionId: 'interview.swift.collections.035',
        question: 'If you implement a custom Equatable type, do you have to implement Hashable?',
        modelAnswer: 'Only if you want to use it in a Set or as a Dictionary key. Equatable alone lets you compare values; Hashable adds the hash function needed for collections.',
        keyPoints: [
          'Equatable enables equality comparisons without requiring Hashable',
          'Hashable is only required when used in sets or dictionary keys',
        ],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-collections'],
  },
  {
    id: 'interview.swift.collections.036',
    question: 'What is printed by this code, and why?\n\nvar a = [1, 2, 3]\nvar b = a\nb.append(4)\nprint(a)\nprint(b)',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-collections',
    difficulty: 'foundational',
    type: 'code-analysis',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Collections', 'Array', 'Copy-on-Write', 'Value Semantics'],
    modelAnswer: "Prints [1, 2, 3] then [1, 2, 3, 4]. Because Array uses copy-on-write, when b is assigned from a, they initially share the same buffer. When b is mutated (append), Swift makes a copy of the buffer for b, then appends. Array a remains unchanged because it's a separate value type — the mutation of b doesn't affect it.",
    keyPoints: [
      'Arrays are value types, not reference types',
      "Copy-on-write means assignment doesn't copy upfront",
      'Copy happens only when mutation occurs',
      'Mutations are isolated to the variable being mutated',
    ],
    commonMistakes: [
      "Thinking Array assignment performs a full copy immediately — it's lazy",
      "Expecting b's mutation to affect a — it doesn't, they're independent values",
    ],
    followUps: [
      {
        id: 'interview.swift.collections.036.f1',
        parentQuestionId: 'interview.swift.collections.036',
        question: 'If both a and b are mutated, does that cost extra copies?',
        modelAnswer: 'Each mutation triggers a copy (if needed). Technically, if isKnownUniquelyReferenced returns true, no copy is needed. But usually, yes — mutations trigger copies.',
        keyPoints: [
          'Mutations trigger buffer duplication when reference count > 1',
          'Unique buffers mutate in place via isKnownUniquelyReferenced optimization',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-collections'],
  },
  {
    id: 'interview.swift.collections.037',
    question: 'Explain the performance characteristics of Array, Set, and Dictionary for lookup, insertion, and deletion.',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-collections',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Swift', 'Collections', 'Big O', 'Performance', 'Data Structures'],
    modelAnswer: 'Array: lookup and access are O(1) by index, but searching for a value is O(n). Insertion/deletion at end is O(1) amortized, but in the middle is O(n) because elements must be shifted. Set: lookup, insertion, and deletion are all O(1) average case (worse case O(n) if there are hash collisions). Dictionary: same as Set — O(1) average for all operations. Use Array if you access by index frequently, Set/Dictionary if you need fast membership or lookups.',
    keyPoints: [
      'Array: O(1) index access, O(n) search by value',
      'Array append: O(1) amortized, middle insertion/deletion: O(n)',
      'Set/Dictionary: O(1) average for all operations',
      'Performance matters when choosing collection type for large data',
    ],
    commonMistakes: [
      "Assuming Array search is fast — it's O(n), use Set if you care about membership",
      'Not considering that middle insertions in Arrays are expensive',
    ],
    followUps: [
      {
        id: 'interview.swift.collections.037.f1',
        parentQuestionId: 'interview.swift.collections.037',
        question: 'When would you use Array over Set if Set has O(1) lookup?',
        modelAnswer: "When you need to preserve order, iterate in a specific sequence, or access by index. Also, Set elements must be Hashable; Array elements don't need to be.",
        keyPoints: [
          'Array maintains strict element ordering and indexed access',
          'Array elements do not require Hashable conformance',
        ],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-collections'],
  },
  {
    id: 'interview.swift.collections.038',
    question: "Why can't you mutate a Set or Dictionary element after inserting it, and what would go wrong if you did?",
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-collections',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Swift', 'Collections', 'Hashable', 'Immutability', 'Bugs'],
    modelAnswer: "Set and Dictionary use the hash value to determine where to store an element and how to find it later. If you mutate an element after insertion, its hash value changes, but the collection doesn't know about it — it's still stored at the old hash location. Later lookups won't find it (the collection looks at the new hash location) — the element becomes 'lost'. This is why you should never mutate Hashable types after inserting them into collections.",
    keyPoints: [
      'Hash value must remain stable after insertion',
      'Mutating an element changes its hash, breaks collection integrity',
      'Lookups fail silently — corrupted state, hard to debug',
      "This is why Hashable types should be immutable (use 'let' properties)",
    ],
    commonMistakes: [
      'Mutating a mutable struct after putting it in a Set — hash value changes, lookups fail',
      "Thinking the collection will handle hash changes — it won't",
    ],
    followUps: [
      {
        id: 'interview.swift.collections.038.f1',
        parentQuestionId: 'interview.swift.collections.038',
        question: 'How would you design a Hashable type to prevent this?',
        modelAnswer: 'Make hash-contributing properties immutable (let, not var). Or document that the type must not be mutated after being used as a Set element or Dictionary key.',
        keyPoints: [
          'Declare properties that contribute to hashing as let constants',
          'Enforce value immutability to guarantee stable hash values',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-collections'],
  },
  {
    id: 'interview.swift.collections.039',
    question: "What does 'copy-on-write' mean for Array, and what's the performance benefit?",
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-collections',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Collections', 'Copy-on-Write', 'Memory', 'Performance'],
    modelAnswer: "Copy-on-write (CoW) means when you assign an Array to another variable, Swift doesn't immediately copy the elements — both variables share the underlying buffer. Only when one variable mutates does Swift make a copy. This provides two benefits: assignment is O(1) instead of O(n), and if the second variable is never mutated, no copy ever happens (saving memory). This makes Arrays efficient and safe — assignment feels cheap, mutations don't surprise other references.",
    keyPoints: [
      "Assignment doesn't trigger a copy immediately",
      'Copy is deferred until mutation (lazy copying)',
      'Saves time and memory if copy never happens',
      'Makes value types practical for large data',
    ],
    commonMistakes: [
      'Thinking assignment always performs a full copy',
      "Being surprised when mutations don't affect other variables — that's the point",
    ],
    followUps: [
      {
        id: 'interview.swift.collections.039.f1',
        parentQuestionId: 'interview.swift.collections.039',
        question: 'Is copy-on-write guaranteed to work this way?',
        modelAnswer: "It's an implementation detail, not a language guarantee, but Swift's standard library uses CoW for Array, Dictionary, String, and Set. It's reliable.",
        keyPoints: [
          'CoW is an implementation detail of standard library collections',
          'Array, Dictionary, String, and Set all reliably utilize CoW buffers',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-collections'],
  },
  {
    id: 'interview.swift.collections.040',
    question: "What happens when you try to run this code, and why?\n\nvar set: Set<Int> = [1, 2, 3]\nlet firstElement = set.first  // What's the type?",
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-collections',
    difficulty: 'intermediate',
    type: 'code-analysis',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Collections', 'Set', 'Code Analysis', 'Optionals'],
    modelAnswer: "The type of firstElement is Optional<Int>, not Int. Sets are unordered, so there's no 'first' element in a logical sense — any element could be 'first' depending on hash values. Swift's Set.first is a computed property that returns an arbitrary element, hence optional (in case the Set is empty). If you need ordering, use an Array instead.",
    keyPoints: [
      'Set has no guaranteed order',
      "Set.first is arbitrary, not the 'first inserted'",
      'Returns optional because Set might be empty',
      'Use Array if you need position-based access',
    ],
    commonMistakes: [
      "Assuming Set preserves insertion order — it doesn't",
      'Expecting Set.first to be stable — it can change if the Set is mutated',
    ],
    followUps: [
      {
        id: 'interview.swift.collections.040.f1',
        parentQuestionId: 'interview.swift.collections.040',
        question: 'If you iterate a Set twice, will the elements come out in the same order?',
        modelAnswer: "Probably, but not guaranteed. The order depends on hash values, which are stable within a program run, but shouldn't be relied on. If order matters, use Array.",
        keyPoints: [
          'Iteration order is determined by internal hash layout',
          'Never rely on iteration order for Set collections; use Array when sequence matters',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-collections'],
  },
  {
    id: 'interview.swift.collections.041',
    question: 'What is the difference between Collection and Sequence protocols, and how do they relate to Array, Set, and Dictionary?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-collections',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Protocols', 'Collections', 'Sequence', 'Collection'],
    modelAnswer: 'Sequence is a protocol for anything you can iterate over once (using for-in). Collection extends Sequence and adds random access by index (subscript) — Collection types are reusable and can be iterated multiple times. Array conforms to Collection (random access). Set conforms to Collection (no guaranteed index order, but still collection semantics). Dictionary conforms to Collection (key-value tuples). Most functions accept Sequence for flexibility; Collection is more powerful but restricts you to types that support indexed access.',
    keyPoints: [
      'Sequence: iterable, one pass, no indexing requirement',
      'Collection: Sequence + indexed access (subscript)',
      'Array is a full Collection (O(1) indexed access)',
      'Set/Dictionary are Collections but with different access semantics',
    ],
    commonMistakes: [
      'Confusing Sequence and Collection — Collection is more powerful',
      "Assuming all Collections have integer indices — Set/Dictionary don't",
    ],
    followUps: [
      {
        id: 'interview.swift.collections.041.f1',
        parentQuestionId: 'interview.swift.collections.041',
        question: 'Why would a function accept Sequence instead of Collection?',
        modelAnswer: 'Flexibility — it works with any iterable type, even generators that can only be traversed once. Array/String are Collections, but iterators and lazy sequences are just Sequences.',
        keyPoints: [
          'Sequence accommodates single-pass streams and generators',
          'Collection requires multi-pass non-destructive iteration',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-collections'],
  },
  {
    id: 'interview.swift.collections.042',
    question: 'If you need to store a collection of custom objects and check membership frequently, what should you do to make it efficient?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-collections',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Collections', 'Hashable', 'Performance', 'Set'],
    modelAnswer: 'Make the custom object conform to Hashable and use a Set. This gives O(1) membership checking (contains, insert) instead of O(n) for an Array. To conform to Hashable, implement Equatable (==) and hash(into:). For value types (structs), Swift can synthesize both automatically if properties are Hashable. This is the standard pattern for fast membership checking in Swift.',
    keyPoints: [
      'Array membership checking is O(n) — slow for large collections',
      'Set membership checking is O(1) — much faster',
      'Require the type to conform to Hashable',
      'Use synthesized Equatable and Hashable for structs when possible',
    ],
    commonMistakes: [
      'Using Array for frequent membership checks',
      'Not implementing Hashable properly — incorrect hash breaks Set invariants',
    ],
    followUps: [
      {
        id: 'interview.swift.collections.042.f1',
        parentQuestionId: 'interview.swift.collections.042',
        question: "What if your custom object can't conform to Hashable?",
        modelAnswer: "Then you can't use Set or Dictionary keys. Use an Array and manually search, or refactor so the type can conform to Hashable (make properties immutable, remove circular references).",
        keyPoints: [
          'Without Hashable conformance, Set and Dictionary keys are impossible',
          'Fallback to Array linear search or refactor models into immutable value types',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-collections'],
  },
  {
    id: 'interview.swift.strings.043',
    question: "Why doesn't Swift String support integer subscripting like String[0], and what should you use instead?",
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-strings',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Strings', 'String.Index', 'Unicode', 'Subscripting'],
    modelAnswer: "Swift Strings don't support integer subscripting because grapheme clusters (Swift's unit of String) have variable byte lengths. Indexing by integer would be inefficient — the runtime would have to count clusters from the start. Instead, use String.Index with startIndex, endIndex, index(after:), or index(_:offsetBy:) to navigate. This design trades convenience for safety and correctness.",
    keyPoints: [
      'Grapheme clusters have variable lengths — indexing by int is inefficient',
      'String.Index is the safe, efficient way to navigate',
      'Swift prioritizes correctness (Unicode) over convenience',
      'index(after:) and index(_:offsetBy:) navigate through valid indices',
    ],
    commonMistakes: [
      "Trying to use string[0] like Array — this doesn't compile",
      "Thinking String[Int] exists — it doesn't, use String.Index",
      "Not understanding why — it's not arbitrary; it's for Unicode correctness",
    ],
    followUps: [
      {
        id: 'interview.swift.strings.043.f1',
        parentQuestionId: 'interview.swift.strings.043',
        question: "If you need to iterate a String with indices, what's the best way?",
        modelAnswer: 'Use for char in string for Characters, or for (index, char) in string.enumerated() for both. Avoid manual index navigation in loops.',
        keyPoints: [
          'Use for-in over Characters directly',
          'Use string.enumerated() for index-character pairs without manual index offsetting',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-strings'],
  },
  {
    id: 'interview.swift.strings.044',
    question: "What is an 'extended grapheme cluster', and why is String.count O(n)?",
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-strings',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Strings', 'Unicode', 'Grapheme Clusters', 'Performance'],
    modelAnswer: "An extended grapheme cluster is a sequence of one or more Unicode scalars that combine to form a single user-perceived character. An emoji might be 1 grapheme but 4+ bytes. A diacritic like 'é' might be 1 grapheme (two-component representation) or 1 scalar (precomposed). String.count counts grapheme clusters, not bytes — it must walk the entire string, making it O(n). This is why you shouldn't use count in tight loops.",
    keyPoints: [
      'Grapheme cluster = user-perceived character, not byte or scalar',
      'Emoji, accents, combining marks are all 1 grapheme',
      'String.count must iterate the entire string to count clusters',
      'Never use count in performance-critical code — cache it',
    ],
    commonMistakes: [
      'Assuming String.count is O(1) like Array.count',
      'Thinking a character is always 1 byte — Unicode breaks that assumption',
    ],
    followUps: [
      {
        id: 'interview.swift.strings.044.f1',
        parentQuestionId: 'interview.swift.strings.044',
        question: 'If a string has a family emoji (👨‍👩‍👧), what\'s its count?',
        modelAnswer: '1 grapheme cluster, despite being composed of 7 Unicode scalars. Swift correctly treats it as a single visual character.',
        keyPoints: [
          'Family emoji is a single grapheme cluster',
          'Multiple code points joined by Zero-Width Joiners (ZWJ) resolve to 1 Character in Swift',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-strings'],
  },
  {
    id: 'interview.swift.strings.045',
    question: "What's the problem with this code, and why does retaining a Substring keep the parent String in memory?\n\nlet large = String(repeating: \"x\", count: 1_000_000)\nlet small = large[..<large.index(large.startIndex, offsetBy: 5)]\n// small is retained, large goes out of scope",
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-strings',
    difficulty: 'intermediate',
    type: 'code-analysis',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Swift', 'Strings', 'Substring', 'Memory', 'Leaks'],
    modelAnswer: "small is a Substring that shares the parent String's buffer — Substring doesn't copy data, it creates a view. When large goes out of scope, you'd expect it to deallocate, but Substring retains a reference to the buffer, so the entire 1MB String stays in memory. Solution: convert the Substring to a String with String(small), which creates its own buffer and releases the parent.",
    keyPoints: [
      "Substring shares the parent String's buffer for efficiency",
      'Retaining a Substring = retaining the entire parent String',
      'This is a hidden memory leak if you store Substrings long-term',
      'Convert to String with String(substring) to own the data',
    ],
    commonMistakes: [
      "Thinking Substring copies data — it doesn't, it's a view",
      'Assuming slicing a 5-character substring saves memory',
      'Not knowing that long-lived Substrings are memory traps',
    ],
    followUps: [
      {
        id: 'interview.swift.strings.045.f1',
        parentQuestionId: 'interview.swift.strings.045',
        question: 'Is Substring dangerous to use?',
        modelAnswer: "No — it's efficient for temporary slices. Dangerous only if you store Substrings long-term without converting to String. Use Substring for temporary operations, String for storage.",
        keyPoints: [
          'Substring is ideal for temporary transformations and slicing',
          'Always convert to String when persisting beyond immediate scope',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-strings'],
  },
  {
    id: 'interview.swift.strings.046',
    question: "What does this print, and why?\n\nlet emoji = \"👨‍👩‍👧\"\nprint(emoji.count)  // ?\nprint(emoji.unicodeScalars.count)  // ?\nprint(emoji.utf16.count)  // ?",
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-strings',
    difficulty: 'intermediate',
    type: 'code-analysis',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Strings', 'Unicode', 'UTF-16', 'UnicodeScalars'],
    modelAnswer: "Prints: 1, 7, 25 (approximately). emoji.count returns 1 because Swift counts grapheme clusters — this family emoji is one visual character. unicodeScalars.count is 7 because the emoji is composed of 7 combining Unicode scalars. utf16.count is ~25 because UTF-16 encoding uses multiple 16-bit units per scalar. This shows that the same string has different 'counts' depending on what you're counting.",
    keyPoints: [
      'count = grapheme clusters (user-perceived characters)',
      'unicodeScalars.count = scalar code points',
      'utf16.count = 16-bit encoding units',
      'Each view answers a different question — use the right one',
    ],
    commonMistakes: [
      'Assuming all counts are the same — they\'re not',
      'Using utf16 or unicodeScalars for character iteration — use graphemes instead',
    ],
    followUps: [
      {
        id: 'interview.swift.strings.046.f1',
        parentQuestionId: 'interview.swift.strings.046',
        question: 'When would you actually use unicodeScalars or utf16?',
        modelAnswer: 'Rarely. unicodeScalars is useful for low-level Unicode handling. utf16 is needed for interop with UTF-16 systems (like some older APIs). For normal string processing, use the default String iteration (graphemes).',
        keyPoints: [
          'unicodeScalars is reserved for low-level parser and encoding operations',
          'utf16 view is primarily used for NSString and Objective-C bridge compatibility',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-strings'],
  },
  {
    id: 'interview.swift.strings.047',
    question: "What's the difference between String and Substring, and when should you convert Substring to String?",
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-strings',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Strings', 'Substring', 'Memory Management', 'Architecture'],
    modelAnswer: "String owns its data; Substring is a view into another String's buffer. Substring is efficient for temporary slices. Convert to String when storing long-term (to release the parent buffer and avoid memory retention). Convert using String(substring). Substring and String conform to slightly different protocols — if you need consistent protocol conformance, convert to String.",
    keyPoints: [
      'String owns its buffer; Substring is a view',
      'Substring is efficient for temporary operations',
      'Long-term storage should be String, not Substring',
      'Conversion is explicit: String(substring)',
    ],
    commonMistakes: [
      'Storing Substrings long-term — they retain parent buffers',
      'Not knowing the difference — treating them as identical',
      'Forgetting to convert when needed — leads to memory retention',
    ],
    followUps: [
      {
        id: 'interview.swift.strings.047.f1',
        parentQuestionId: 'interview.swift.strings.047',
        question: 'If a function returns a Substring, should the caller convert it to String?',
        modelAnswer: 'Only if storing it long-term. For temporary use (passing to another function), Substring is fine. The caller should convert if they plan to keep it.',
        keyPoints: [
          'Temporary consumption does not require conversion',
          'Convert when storing in properties, models, or caching structures',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-strings'],
  },
  {
    id: 'interview.swift.strings.048',
    question: 'How does String.Index work, and what methods do you use to navigate a String?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-strings',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Strings', 'String.Index', 'Navigation', 'Collections'],
    modelAnswer: "String.Index represents a position in a String. You can't create indices directly; you navigate using startIndex, endIndex, index(after:), index(before:), and index(_:offsetBy:). startIndex is the first grapheme; endIndex is one past the last (used in range subscripts). index(after:) moves forward by one grapheme. index(_:offsetBy:) moves by N graphemes. This design ensures you can't access out-of-bounds because every index is valid.",
    keyPoints: [
      'String.Index is a position, not an integer',
      'startIndex and endIndex mark the boundaries',
      'index(after:) and index(before:) move by 1 grapheme',
      'index(_:offsetBy:) moves by N graphemes (can be expensive for large N)',
    ],
    commonMistakes: [
      "Trying to create indices yourself — you can't, use navigation methods",
      'Using index(_:offsetBy:) in loops — inefficient, use enumerated() instead',
      "Assuming String.Index works like Array indices — it doesn't",
    ],
    followUps: [
      {
        id: 'interview.swift.strings.048.f1',
        parentQuestionId: 'interview.swift.strings.048',
        question: 'Is navigating a String by offset expensive?',
        modelAnswer: "Yes, index(_:offsetBy:) is O(n) — it must count graphemes from the given index. For large offsets, it's slow. Use enumerated() or for-in loops to avoid repeated offsets.",
        keyPoints: [
          'index(_:offsetBy:) is O(n) due to variable grapheme cluster lengths',
          'Repeated offset navigation in loops leads to accidental O(n^2) complexity',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-strings'],
  },
  {
    id: 'interview.swift.error_handling.049',
    question: 'What is the difference between try, try?, and try!, and when should you use each?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-error-handling',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Error Handling', 'try', 'try?', 'try!'],
    modelAnswer: "try requires the surrounding code to handle the error, usually with do-catch — if the function throws, execution jumps to the catch block. try? converts the result to an optional: nil if it threw, the value if it succeeded — use this when you don't need to know why it failed. try! force-unwraps the result, crashing at runtime if the function throws — use this only when you can prove failure is impossible, similar to force-unwrapping an optional.",
    keyPoints: [
      'try requires do-catch or a throwing context',
      'try? converts to optional, discards error details',
      'try! crashes on failure — use rarely, only when certain',
      'Same risk profile as force-unwrapping an optional',
    ],
    commonMistakes: [
      'Using try! in code that can realistically fail',
      'Using try? when you actually need to know the error reason',
    ],
    followUps: [
      {
        id: 'interview.swift.error_handling.049.f1',
        parentQuestionId: 'interview.swift.error_handling.049',
        question: "If you use try? on a function that returns Int, what's the type of the result?",
        modelAnswer: 'Int? (Optional<Int>) — try? always wraps the result in an optional, nil on failure.',
        keyPoints: ['try? wraps success in Optional<T>', 'Returns nil on failure'],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-error-handling'],
  },
  {
    id: 'interview.swift.error_handling.050',
    question: 'How does do-catch pattern matching work when you have multiple catch clauses for different error cases?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-error-handling',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Error Handling', 'do-catch', 'Pattern Matching'],
    modelAnswer: "catch clauses are evaluated top to bottom, similar to switch — the first matching pattern handles the error. You can match specific error cases (catch NetworkError.timeout), extract associated values (catch NetworkError.invalidResponse(let code)), or use a catch-all (catch { }) which implicitly binds the error to a variable named 'error'. Order matters: put specific cases before the catch-all, or the catch-all will intercept everything.",
    keyPoints: [
      'catch clauses evaluated top to bottom like switch',
      'Can match specific cases and extract associated values',
      "Catch-all implicitly binds 'error'",
      'Order matters — specific before general',
    ],
    commonMistakes: [
      'Putting the catch-all clause before specific ones — specific clauses become unreachable',
      'Forgetting the catch-all is required unless all cases are exhaustively matched',
    ],
    followUps: [
      {
        id: 'interview.swift.error_handling.050.f1',
        parentQuestionId: 'interview.swift.error_handling.050',
        question: 'Is a catch-all clause always required in a do-catch block?',
        modelAnswer: "Yes, unless you're using typed throws and have exhaustively matched every case of that specific error type. With untyped throws (any Error), you must have a catch-all since any error could occur.",
        keyPoints: [
          'Untyped throws requires a catch-all clause for any Error',
          'Typed throws allows exhaustive matching without catch-all',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-error-handling'],
  },
  {
    id: 'interview.swift.error_handling.051',
    question: 'What does rethrows mean, and how is it different from throws?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-error-handling',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Error Handling', 'rethrows', 'Closures'],
    modelAnswer: "throws means a function always has the potential to throw. rethrows means a function only throws if a closure parameter passed to it throws — the function itself introduces no additional failure. This is used by functions like map and filter, which take a transform closure: if you pass a non-throwing closure, calling map doesn't require try; if you pass a throwing closure, it does. rethrows is a contract enforced by the compiler — a rethrows function can only throw by propagating from its closure parameter.",
    keyPoints: [
      'throws: unconditionally can fail',
      'rethrows: only fails if the closure parameter fails',
      'Used by higher-order functions like map, filter',
      'Compiler enforces the rethrows contract',
    ],
    commonMistakes: [
      'Confusing rethrows with throws — rethrows is conditional on the closure',
      'Trying to throw directly inside a rethrows function without going through the closure — compile error',
    ],
    followUps: [
      {
        id: 'interview.swift.error_handling.051.f1',
        parentQuestionId: 'interview.swift.error_handling.051',
        question: "Can a rethrows function throw an error that didn't come from its closure parameter?",
        modelAnswer: "No — that would violate the rethrows contract and is a compile error. A rethrows function can only propagate errors from its throwing closure parameters.",
        keyPoints: [
          'Rethrowing functions cannot generate new errors on their own',
          'Compiler rejects throw statements outside closure propagation',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-error-handling'],
  },
  {
    id: 'interview.swift.error_handling.052',
    question: 'When would you use Result<Success, Failure> instead of throws/try?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-error-handling',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Error Handling', 'Result', 'Async', 'Completion Handlers'],
    modelAnswer: "Use Result when you need to represent success/failure as a value that can be stored, passed around, or delayed — most commonly in asynchronous completion handlers, where throws/try doesn't apply directly (you can't 'try' an async callback the same way). throws/try is for immediate, synchronous error propagation. Result decouples the failure from control flow — you can hold onto a Result, transform it with map/flatMap, and decide when to unwrap it with .get() or a switch statement.",
    keyPoints: [
      'Result represents success/failure as a value, not control flow',
      'Common in completion handlers and async callbacks',
      'throws/try is for immediate, synchronous propagation',
      'Result supports map, flatMap, mapError for transformation without unwrapping',
    ],
    commonMistakes: [
      'Using Result when throws/try would be simpler for synchronous code',
      'Not knowing you can bridge between them with Result { try ... } and try result.get()',
    ],
    followUps: [
      {
        id: 'interview.swift.error_handling.052.f1',
        parentQuestionId: 'interview.swift.error_handling.052',
        question: 'How do you convert a throwing function call into a Result?',
        modelAnswer: 'Wrap it: let result = Result { try someThrowingFunction() }. This captures success or failure into a Result value automatically.',
        keyPoints: [
          'Result(catching:) initializer converts throwing closures to Result values',
          'result.get() converts Result back to a throwing call',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-error-handling'],
  },
  {
    id: 'interview.swift.error_handling.053',
    question: 'What is defer used for, and in what order do multiple defer blocks execute?',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-error-handling',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Error Handling', 'defer', 'Scope', 'Cleanup'],
    modelAnswer: "defer schedules code to run when the current scope exits, regardless of how it exits — normal return, early return, or a thrown error. It's used for guaranteed cleanup, like closing files or releasing locks. If there are multiple defer blocks in the same scope, they execute in reverse order (LIFO — last in, first out), similar to unwinding a stack. This matters when defer blocks have dependencies on each other's ordering.",
    keyPoints: [
      'defer runs on scope exit, regardless of exit path',
      'Guarantees cleanup even when an error is thrown',
      'Multiple defers execute in LIFO order',
      'Common use: closing resources, releasing locks',
    ],
    commonMistakes: [
      "Assuming defer blocks run in the order they're written — they run in reverse",
      'Not using defer for cleanup that needs to happen even on early return or thrown error',
    ],
    followUps: [
      {
        id: 'interview.swift.error_handling.053.f1',
        parentQuestionId: 'interview.swift.error_handling.053',
        question: 'Does defer run if the app crashes or the process is terminated?',
        modelAnswer: "No — defer only runs on normal scope exit (including thrown errors), not on a crash or forced termination. It's not a substitute for OS-level cleanup guarantees.",
        keyPoints: [
          'defer executes on normal and throwing scope exits only',
          'Fatal errors, SIGKILL, and hardware aborts do not execute defer',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-error-handling'],
  },
  {
    id: 'interview.swift.error_handling.054',
    question: 'What does this code print, and why?\n\nfunc risky() throws -> Int {\n    defer { print("cleanup") }\n    throw NetworkError.timeout\n}\n\ndo {\n    let value = try risky()\n} catch {\n    print("caught: \\(error)")\n}',
    domainId: 'swift',
    moduleId: 'swift-fundamentals-mod',
    topicId: 'swift-error-handling',
    difficulty: 'intermediate',
    type: 'code-analysis',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Error Handling', 'defer', 'Code Analysis'],
    modelAnswer: "Prints 'cleanup' first, then 'caught: timeout' (or similar). Even though the function throws before returning a value, the defer block still executes as the function's scope exits — defer runs regardless of whether the exit is via return or via a thrown error. After the defer runs, the error propagates up to the catch block in the caller, which then prints the caught error.",
    keyPoints: [
      'defer executes even when a function exits via throw',
      'defer runs before the error propagates to the caller',
      'This guarantees cleanup happens even in failure paths',
      'Order: defer block runs, then control passes to catch',
    ],
    commonMistakes: [
      "Assuming defer is skipped if the function throws — it isn't, it always runs",
      'Not realizing defer runs before the catch block receives control',
    ],
    followUps: [
      {
        id: 'interview.swift.error_handling.054.f1',
        parentQuestionId: 'interview.swift.error_handling.054',
        question: "If risky() didn't throw and returned a value normally, would defer still run?",
        modelAnswer: "Yes — defer runs on every scope exit path, whether normal return or thrown error. That's the whole point of defer: guaranteed execution regardless of how the function exits.",
        keyPoints: [
          'defer is guaranteed on all scope exits',
          'Executes identically on success or thrown error',
        ],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-error-handling'],
  },
  {
    id: 'interview.swift.enums.055',
    question: 'What is the difference between raw values and associated values in a Swift enum? Can an enum have both?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-enums',
    difficulty: 'intermediate',
    type: 'comparison',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Swift', 'Enums', 'Raw Values', 'Associated Values'],
    modelAnswer: 'Raw values are compile-time constants of a uniform type assigned to each case — every case maps to a fixed Int, String, or other RawRepresentable value. Associated values are runtime data that you attach at the call site — each case can carry a different type and shape of data per instance. An enum cannot have both simultaneously; they are mutually exclusive features. Raw value enums are automatically Equatable, Hashable, and support a failable initializer from their raw type. Associated value enums require manual Equatable conformance and cannot synthesize CaseIterable automatically.',
    keyPoints: [
      'Raw values are compile-time constants, uniform type across all cases',
      'Associated values are runtime data, different types allowed per case',
      'Mutually exclusive — an enum cannot have both raw values and associated values',
      'Raw value enums synthesize Equatable, Hashable, and a failable init(rawValue:)',
      'Associated value enums require manual Equatable conformance',
    ],
    commonMistakes: [
      'Assuming you can combine raw values and associated values in the same enum',
      'Expecting associated value enums to be automatically Equatable without synthesizing conformance',
    ],
    followUps: [
      {
        id: 'interview.swift.enums.055.f1',
        parentQuestionId: 'interview.swift.enums.055',
        question: 'When would you prefer a raw value enum over an associated value enum?',
        modelAnswer: 'Use raw values when every case maps to a fixed primitive — for serialization (JSON keys, database columns), interop with C/Objective-C APIs that use integer constants, or when you need to reconstruct an enum from stored data using init(rawValue:). Use associated values when each case carries meaningful but differently-shaped data at runtime.',
        keyPoints: ['Raw values for serialization and reconstruction', 'Associated values for runtime, differently-shaped per-case data'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-enums', 'swift-control-flow'],
  },
  {
    id: 'interview.swift.enums.056',
    question: 'How does Swift enforce exhaustiveness in a switch statement over an enum, and why is using `default:` considered a code smell for your own types?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-enums',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Enums', 'Switch', 'Exhaustiveness', 'Compiler'],
    modelAnswer: "The Swift compiler statically verifies at compile time that every case of an enum is handled in a switch statement — it will emit an error if a case is missing, with no runtime check needed. Using `default:` suppresses this check: if you later add a new case to the enum, the compiler silently routes it to `default:` instead of warning you about the missing handler. For enums you own, always prefer exhaustive switches. Reserve `default:` for third-party or SDK enums where you cannot enumerate all cases or where future SDK additions should be handled uniformly.",
    keyPoints: [
      'Exhaustiveness is a compile-time check, not a runtime guarantee',
      '`default:` silences the exhaustiveness check — new cases are silently swallowed',
      'For owned enums, exhaustive switches catch missing cases when you add new ones',
      'Reserve `default:` for SDK or external enums you do not control',
    ],
    commonMistakes: [
      'Using `default:` on your own enums for convenience — future cases will be silently missed',
    ],
    followUps: [
      {
        id: 'interview.swift.enums.056.f1',
        parentQuestionId: 'interview.swift.enums.056',
        question: 'Is there a way to get the compiler to warn you when you forget to handle a new case in a switch, even if you have a default branch?',
        modelAnswer: 'No — once `default:` is present, the compiler is satisfied. The solution is to not use `default:` for your own enums. If you use a library enum and want a warning, consider filing a radar or wrapping the enum in your own type that you can make exhaustive.',
        keyPoints: ['default: unconditionally satisfies the compiler', 'Removing default: is the only way to restore exhaustiveness checking'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-enums', 'swift-control-flow'],
  },
  {
    id: 'interview.swift.enums.057',
    question: 'Explain why Optional<T> in Swift is an enum. What are its two cases, and how does this connect to if let and ??',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-enums',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Optionals', 'Enums', 'Pattern Matching', 'stdlib'],
    modelAnswer: "Optional<Wrapped> is defined in Swift's standard library as `enum Optional<Wrapped> { case none; case some(Wrapped) }`. The `.none` case represents the absence of a value (nil). The `.some(Wrapped)` case carries the wrapped value. All optional syntax is sugar: `String?` is `Optional<String>`, `nil` is `.none`, `if let x = opt` desugars to `if case .some(let x) = opt`, and `??` provides a fallback for the `.none` case. Understanding this makes optional chaining, map/flatMap on optionals, and the @_silgen_name compiler magic much more transparent.",
    keyPoints: [
      'Optional<Wrapped> is a two-case enum: .none and .some(Wrapped)',
      '`nil` is syntactic sugar for Optional.none',
      '`if let` is sugar for pattern matching on .some(let value)',
      '`??` provides a default value for the .none case',
      'Optional.map and flatMap work because Optional is a monad-like container',
    ],
    commonMistakes: [
      'Thinking Optional is a special compiler type — it is a regular generic enum in the stdlib',
      'Not connecting optional chaining (?.) to pattern matching on .some internally',
    ],
    followUps: [
      {
        id: 'interview.swift.enums.057.f1',
        parentQuestionId: 'interview.swift.enums.057',
        question: 'Can you write a switch statement directly over an Optional without using if let?',
        modelAnswer: 'Yes — `switch someOptional { case .none: ... case .some(let value): ... }` is completely valid Swift. In fact, this is what if let desugars to under the hood.',
        keyPoints: ['switch over Optional with .none and .some(let value) is valid', 'if let is syntactic sugar for this pattern'],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-enums', 'swift-optionals'],
  },
  {
    id: 'interview.swift.enums.058',
    question: 'What is `indirect` in a Swift enum, and what problem does it solve? What is the memory implication?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-enums',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 4,
    frequency: 'medium',
    tags: ['Swift', 'Enums', 'indirect', 'Recursive Types', 'Memory'],
    modelAnswer: 'Enums must have a fixed, knowable size at compile time. A recursive enum — one where a case holds an instance of the same enum type — would have infinite size (the enum contains itself, which contains itself, etc.). The `indirect` keyword breaks this cycle by telling the compiler to heap-allocate that case\'s associated value as a reference (like a class instance), making its in-enum representation a fixed-size pointer. This allows recursive data structures like linked lists, expression trees, and binary trees to be modeled as enums. The cost is a heap allocation and ARC reference counting for each `indirect` case — the enum remains a value type, but its `indirect` cases carry a reference internally.',
    keyPoints: [
      'Recursive enums would have infinite size without `indirect`',
      '`indirect` heap-allocates the case payload as a fixed-size reference',
      'The enum is still a value type; only the indirect case payload is heap-allocated',
      'Enables recursive data structures: linked lists, trees, expression trees',
      'ARC overhead applies to each indirect case — a real cost to be aware of',
    ],
    commonMistakes: [
      'Thinking `indirect` makes the entire enum a reference type — the enum itself remains a value type',
      'Forgetting that indirect cases have ARC overhead unlike regular enum cases',
    ],
    followUps: [
      {
        id: 'interview.swift.enums.058.f1',
        parentQuestionId: 'interview.swift.enums.058',
        question: 'Can you mark only specific cases as indirect instead of the whole enum?',
        modelAnswer: 'Yes — you can apply `indirect` to a specific case (`case indirect node(LinkedList)`) instead of to the whole enum declaration (`indirect enum`). Marking the whole enum `indirect` applies it to all cases, which is unnecessary overhead for non-recursive cases.',
        keyPoints: ['Per-case indirect is preferred to avoid unnecessary heap allocation on non-recursive cases'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-enums', 'swift-struct-vs-class'],
  },
  {
    id: 'interview.swift.enums.059',
    question: 'What is CaseIterable and when can Swift automatically synthesize the allCases collection? When can it not?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-enums',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'medium',
    tags: ['Swift', 'Enums', 'CaseIterable', 'allCases', 'Protocol'],
    modelAnswer: 'CaseIterable is a protocol that provides a static `allCases` property containing every case of the enum. Swift automatically synthesizes it for enums with no associated values — the compiler can enumerate every case because each has a fixed identity. Swift cannot synthesize it for enums with associated values, because there is no finite set of all possible payloads to enumerate — a case like `case score(Int)` has infinitely many possible instances. For associated value enums, you can manually implement `static var allCases: [MyEnum]` listing representative cases, but this must be done by hand.',
    keyPoints: [
      'CaseIterable provides a static allCases: [Self] collection',
      'Auto-synthesized for enums with no associated values',
      'Cannot be auto-synthesized for associated value enums — infinite possible instances',
      'Can be manually implemented for associated value enums by listing representative cases',
      'Commonly used for UI pickers, test harnesses, and settings screens',
    ],
    commonMistakes: [
      'Expecting CaseIterable to be automatically synthesized on enums with associated values',
    ],
    followUps: [
      {
        id: 'interview.swift.enums.059.f1',
        parentQuestionId: 'interview.swift.enums.059',
        question: 'How would you manually implement CaseIterable for an enum with associated values?',
        modelAnswer: 'Declare `static var allCases: [MyEnum] = [.caseOne, .caseTwo(someValue), ...]` listing whichever representative instances make sense for your use case. This is entirely manual — you decide which payload values to include.',
        keyPoints: ['Manual implementation lists representative instances', 'You decide which payload values are included — no synthesis'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-enums'],
  },
  {
    id: 'interview.swift.enums.060',
    question: 'How do you use `if case let` to pattern match a single enum case with an associated value? How does it differ from a full switch?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-enums',
    difficulty: 'intermediate',
    type: 'practical',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Enums', 'Pattern Matching', 'if case let', 'guard case'],
    modelAnswer: '`if case .caseName(let value) = someEnum` matches and unwraps exactly one case, ignoring all others — it is shorthand for a switch with only one handled case and no default. A full switch is exhaustive (or has a default), and is better when you need to handle multiple cases. `guard case .caseName(let value) = someEnum else { return }` provides early-exit variant. The `if case` syntax is preferred for single-case checks inside methods where you want clean, readable code without a full switch block.',
    keyPoints: [
      '`if case .name(let x) = enum` matches one case and binds the associated value',
      'Ignores all other cases — not exhaustive',
      '`guard case` provides early-exit pattern for single-case checks',
      'Use switch for multiple case handling; if case for single-case checks',
    ],
    commonMistakes: [
      'Forgetting that if case is not exhaustive — if the case does not match, the block is simply skipped',
      'Confusing `if case let .name(x) = value` with `if let x = value` (which only works for Optionals)',
    ],
    followUps: [
      {
        id: 'interview.swift.enums.060.f1',
        parentQuestionId: 'interview.swift.enums.060',
        question: 'Can you use `if case` with a where clause to add extra conditions?',
        modelAnswer: 'Yes — `if case .signedIn(let id) = state, id.hasPrefix("admin")` adds a where-style condition. Only matches if the case matches AND the condition is true.',
        keyPoints: ['Comma-separated conditions act like where clauses in if case patterns'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-enums', 'swift-control-flow'],
  },
  {
    id: 'interview.swift.enums.061',
    question: 'Can a Swift enum have methods and computed properties? Why is this useful, and what is the limitation compared to structs?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-enums',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'medium',
    tags: ['Swift', 'Enums', 'Methods', 'Computed Properties', 'Value Types'],
    modelAnswer: 'Yes — Swift enums are full value types and can have computed properties, methods, static methods, mutating methods, and protocol conformances, just like structs. This is useful because it keeps behavior co-located with the type: a computed `isRed` property on a Suit enum is cleaner than a free function that takes a Suit and switches over it. The key limitation vs structs is that enums cannot have **stored instance properties** (only computed ones) — an enum\'s only stored state is its case and associated values. You cannot add `var count: Int = 0` to an enum.',
    keyPoints: [
      'Enums can have computed properties, methods, static members, and protocol conformances',
      'Keeps behavior co-located with the type — no scattered switch functions',
      'Limitation: enums cannot have stored instance properties — only computed ones',
      'The case + associated values are the only stored state in an enum',
    ],
    commonMistakes: [
      'Trying to add a stored var property to an enum — this is a compile error',
      'Not realizing enums can have mutating methods that reassign self to a different case',
    ],
    followUps: [
      {
        id: 'interview.swift.enums.061.f1',
        parentQuestionId: 'interview.swift.enums.061',
        question: 'Can an enum\'s mutating method change which case self represents?',
        modelAnswer: 'Yes — `mutating func toggle() { self = (self == .on) ? .off : .on }` is valid. A mutating method on a value type can reassign `self` entirely, including switching to a different case.',
        keyPoints: ['mutating methods can reassign self to a different case entirely'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-enums', 'swift-struct-vs-class'],
  },
  {
    id: 'interview.swift.enums.062',
    question: 'Model a view state enum for a data-loading screen. What cases would you include and what associated values would each carry?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-enums',
    difficulty: 'intermediate',
    type: 'scenario',
    estimatedMinutes: 5,
    frequency: 'high',
    tags: ['Swift', 'Enums', 'Architecture', 'State Modeling', 'Associated Values'],
    modelAnswer: 'A well-designed view state enum for a data-loading screen typically has: `.idle` (initial state, nothing shown), `.loading` (spinner visible, no data yet), `.loaded([Item])` (data available, carrying the fetched array), and `.failed(Error)` (error state, carrying the error for display or retry logic). This is often called a "state machine" pattern — the enum enforces that the UI can only be in one state at a time, and the type system guarantees you must handle all states in your rendering logic. Optional improvements: `.loaded(items: [Item], lastUpdated: Date)` for timestamps, `.empty` as a distinct case from loaded-with-no-items if the UX differs.',
    keyPoints: [
      'idle, loading, loaded(data), failed(error) covers the 4 natural loading states',
      'Associated values carry exactly the data needed for each state — no optionals needed',
      'Switch over the enum in your view to render the correct UI for each state',
      'Exhaustive switch guarantees you never forget to handle a state',
      'Consider .empty as distinct from .loaded([]) if the UI treats them differently',
    ],
    commonMistakes: [
      'Using multiple Bool/Optional properties (isLoading, data?, error?) instead of a single enum — this allows impossible states like isLoading=true AND data!=nil',
      'Not carrying the error in .failed — you lose the ability to show a meaningful error message or retry',
    ],
    followUps: [
      {
        id: 'interview.swift.enums.062.f1',
        parentQuestionId: 'interview.swift.enums.062',
        question: 'What does "making impossible states impossible" mean in the context of view state modeling?',
        modelAnswer: 'With separate Bool/Optional properties, you can have combinations that should never exist in real code — isLoading=true while data is not nil, or error!=nil while isLoading=true. An enum with associated values structurally prevents this: you are either loading, or loaded with data, or failed with an error. The type system eliminates the entire class of "impossible state" bugs at compile time.',
        keyPoints: ['Separate flags allow impossible combinations; enum does not', 'Type system eliminates impossible states at compile time'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-enums', 'swift-error-handling'],
  },
  {
    id: 'interview.swift.enums.063',
    question: 'What does this code print, and why?\n\nenum Shape {\n    case circle(radius: Double)\n    case rectangle(width: Double, height: Double)\n}\n\nlet s: Shape = .circle(radius: 5)\nif case .rectangle(let w, let h) = s {\n    print("rect \\(w)x\\(h)")\n} else {\n    print("not a rectangle")\n}',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-enums',
    difficulty: 'intermediate',
    type: 'code-analysis',
    estimatedMinutes: 3,
    frequency: 'medium',
    tags: ['Swift', 'Enums', 'Pattern Matching', 'Code Analysis', 'if case'],
    modelAnswer: 'Prints "not a rectangle". The `if case .rectangle(let w, let h) = s` pattern tries to match the `.rectangle` case. Since `s` is `.circle(radius: 5)`, the match fails, and the else branch executes. There is no crash or runtime error — `if case` simply evaluates to false when the pattern does not match. This is the safe, idiomatic way to check a specific case without a full switch.',
    keyPoints: [
      'if case is a non-exhaustive match — unmatched cases go to else, no crash',
      'Pattern matching is evaluated at compile time for safety, at runtime for the branch outcome',
      'The associated values (w, h) are only bound if the case matches — they do not exist in the else branch',
    ],
    commonMistakes: [
      'Expecting the code to crash because s is not a .rectangle — if case simply evaluates false',
      'Thinking the bound variables w and h are accessible in the else branch — they are scoped to the if block only',
    ],
    followUps: [
      {
        id: 'interview.swift.enums.063.f1',
        parentQuestionId: 'interview.swift.enums.063',
        question: 'How would you rewrite this using a switch to also print the circle\'s radius?',
        modelAnswer: 'switch s { case .circle(let r): print("circle radius \\(r)"); case .rectangle(let w, let h): print("rect \\(w)x\\(h)") } — exhaustive, handles both cases, binds associated values per branch.',
        keyPoints: ['switch is exhaustive; if case is single-case matching only'],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-enums', 'swift-control-flow'],
  },
  // ─── Stored, Computed & Lazy Properties with Observers ───────────────────────
  {
    id: 'interview.swift.properties.064',
    question: 'What is the difference between a stored property and a computed property in Swift?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-properties',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Properties', 'Stored', 'Computed'],
    modelAnswer: 'A stored property allocates actual memory to hold a value — it is the simplest kind of property and can be `var` (mutable) or `let` (constant after initialization). A computed property has no backing storage; instead it runs a `get` block every time it is read, and an optional `set` block when it is written. Computed properties must always be `var`. Use stored properties when you need to hold state. Use computed properties for values derived from other state — they keep your data model clean by avoiding duplicate or out-of-sync state.',
    keyPoints: [
      'Stored properties hold a value in memory; computed properties calculate on demand',
      'Computed properties are always `var`, even if read-only',
      'A computed property\'s `get` block runs on every access — avoid expensive work without caching',
      'Computed properties are ideal for derived, read-only values like `diameter` from `radius`',
    ],
    commonMistakes: [
      'Declaring a computed property with `let` — this is a compile error',
      'Putting expensive work in a computed property without caching — it re-runs on every read',
    ],
    followUps: [
      {
        id: 'interview.swift.properties.064.f1',
        parentQuestionId: 'interview.swift.properties.064',
        question: 'Can a computed property have a setter? What does the setter receive?',
        modelAnswer: 'Yes. A computed property can have a `set` block in addition to `get`. The setter receives the new value through an implicit parameter called `newValue`. You use the setter to update the underlying stored property that the computed property derives from — for example, setting `diameter` can update `radius`.',
        keyPoints: ['Setter receives implicit `newValue`', 'Use the setter to update the backing stored property'],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-properties', 'swift-struct-vs-class'],
  },
  {
    id: 'interview.swift.properties.065',
    question: 'When do `willSet` and `didSet` observers NOT fire, and why?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-properties',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Properties', 'willSet', 'didSet', 'Observers'],
    modelAnswer: 'Property observers `willSet` and `didSet` do NOT fire in two situations: (1) During `init` — when a property is set inside an initializer, Swift skips observers to avoid running side-effect code on a half-constructed object. (2) When a property is passed as an `inout` parameter — the observers are skipped during the in-out mutation; only fire on the final write-back when the function returns. They do fire on every other mutation after the object is fully initialized.',
    keyPoints: [
      'Observers are skipped inside `init` — object is half-constructed',
      'Observers are skipped during `inout` mutation — fire only on final write-back',
      '`willSet` receives `newValue` (incoming); `didSet` receives `oldValue` (previous)',
      'Observers fire in subclasses even for inherited stored properties',
    ],
    commonMistakes: [
      'Relying on `didSet` to run during `init` for validation — use the `init` body directly instead',
      'Expecting observers to fire mid-mutation on `inout` parameters',
    ],
    followUps: [
      {
        id: 'interview.swift.properties.065.f1',
        parentQuestionId: 'interview.swift.properties.065',
        question: 'Can you add a `didSet` observer to a computed property?',
        modelAnswer: 'No. Property observers can only be attached to stored properties (and to overridden stored properties in a subclass). Computed properties already define custom get/set logic — you can achieve the same result by putting your side-effect code directly inside the `set` block.',
        keyPoints: ['Observers only on stored properties', 'Use set block for computed property side effects'],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-properties', 'swift-struct-vs-class'],
  },
  {
    id: 'interview.swift.properties.066',
    question: 'Why must a `lazy` property always be declared as `var`, not `let`?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-properties',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 2,
    frequency: 'medium',
    tags: ['Swift', 'Properties', 'Lazy', 'var', 'let'],
    modelAnswer: 'A `lazy` property is not initialized at object creation time — it starts as nil and is mutated to its computed value on first access. Since mutation is required, the property must be `var`. A `let` property must hold its final value before initialization completes and cannot be mutated afterward, making it fundamentally incompatible with lazy initialization. The compiler will reject `lazy let` with an explicit error.',
    keyPoints: [
      'lazy property starts nil, is mutated on first access — requires var',
      'let cannot be mutated after init — incompatible with lazy semantics',
      'The compiler will error: "\'lazy\' cannot be used on a let property"',
    ],
    commonMistakes: [
      'Thinking lazy provides immutability — it does not. The value is computed once but the property slot must be mutable.',
    ],
    followUps: [
      {
        id: 'interview.swift.properties.066.f1',
        parentQuestionId: 'interview.swift.properties.066',
        question: 'Is a `lazy` property thread-safe? What happens on concurrent first access?',
        modelAnswer: 'No. `lazy` instance properties are not thread-safe. If two threads simultaneously access the property before it is initialized, the initializer closure can execute twice, causing a data race. You need to add your own synchronization (e.g., a lock, a serial queue, or `actor` isolation) if concurrent first access is possible. `static` stored properties, by contrast, are thread-safe and lazily initialized by the runtime.',
        keyPoints: ['lazy is not thread-safe', 'Concurrent first access = data race', 'static stored properties ARE thread-safe by default'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-properties', 'swift-struct-vs-class'],
  },
  {
    id: 'interview.swift.properties.067',
    question: 'What is the difference between `static` and `class` for type-level properties in Swift?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-properties',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'medium',
    tags: ['Swift', 'Properties', 'static', 'class', 'Type Properties'],
    modelAnswer: 'Both `static` and `class` declare type-level properties that belong to the type itself, not to any instance. The key difference is in subclassing: `static` is **final** — subclasses cannot override it. `class` allows subclasses to override the property. However, `class` can only be used for **computed** properties in a class; stored type properties must use `static`. Structs and enums can only use `static` (they have no inheritance). `static` stored properties are automatically thread-safe and lazily initialized by the runtime.',
    keyPoints: [
      'Both are type-level — accessed on the type, not an instance',
      '`static` is implicitly final — no override allowed',
      '`class` allows subclass overrides — only for computed properties in classes',
      '`static` stored properties are thread-safe + lazily initialized by default',
      'Structs and enums can only use `static`',
    ],
    commonMistakes: [
      'Using `class var` for a stored property — only computed properties can use `class`',
      'Expecting `static` to allow override in subclasses — it is implicitly final',
    ],
    followUps: [
      {
        id: 'interview.swift.properties.067.f1',
        parentQuestionId: 'interview.swift.properties.067',
        question: 'Why is `static let singleton = MyClass()` considered thread-safe in Swift?',
        modelAnswer: 'Swift guarantees that `static` stored properties are initialized exactly once, using thread-safe dispatch (similar to `dispatch_once` in Objective-C). The initialization is atomic and lazy — it happens on first access, and concurrent accesses will wait for initialization to complete before continuing. This makes `static let` the idiomatic way to implement the Singleton pattern in Swift.',
        keyPoints: ['static stored property initialized once atomically', 'Thread-safe by default', 'Replaces dispatch_once for Singletons'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-properties', 'swift-struct-vs-class'],
  },
  {
    id: 'interview.swift.properties.068',
    question: 'What is a property wrapper in Swift, and what problem does it solve?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-properties',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Swift', 'Properties', 'Property Wrappers', '@State', '@Published'],
    modelAnswer: 'A property wrapper is a type annotated with `@propertyWrapper` that adds custom storage and access logic to any property through the required `wrappedValue`. Instead of repeating the same get/set boilerplate across many properties, you write the logic once in a wrapper and apply it with the `@` annotation. This is how SwiftUI\'s `@State`, `@Binding`, `@ObservedObject`, and Combine\'s `@Published` work. Common use cases include clamping values, validation, logging mutations, UserDefaults-backed persistence, and thread-safe access.',
    keyPoints: [
      'Property wrapper = a type with `@propertyWrapper` and a required `wrappedValue` property',
      'Eliminates repeated get/set boilerplate — write once, apply many times',
      '@State, @Published, @AppStorage are all property wrappers',
      'Wrappers can expose a `projectedValue` accessed via the `$` prefix',
    ],
    commonMistakes: [
      'Forgetting that the wrapper type itself is stored, not just the wrapped value — memory overhead applies',
      'Using property wrappers in a context that does not support them (e.g., local variables in older Swift versions)',
    ],
    followUps: [
      {
        id: 'interview.swift.properties.068.f1',
        parentQuestionId: 'interview.swift.properties.068',
        question: 'What is the `projectedValue` in a property wrapper, and how do you access it?',
        modelAnswer: 'The `projectedValue` is an optional secondary value that a property wrapper can expose. You access it with the `$` prefix on the property name. For example, `@State var text: String` exposes a `Binding<String>` as `$text`. @Published exposes a `Publisher` as `$property`. You implement `projectedValue` in the wrapper type and can return anything useful — a Binding, a log array, or the wrapper instance itself.',
        keyPoints: ['projectedValue accessed via $ prefix', '@State $text returns Binding<String>', 'projectedValue type can be anything'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-properties', 'swift-closures'],
  },
  {
    id: 'interview.swift.properties.069',
    question: 'If you declare a struct instance with `let`, can you still mutate its `var` properties?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-properties',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 2,
    frequency: 'high',
    tags: ['Swift', 'Properties', 'Structs', 'Value Types', 'let', 'var'],
    modelAnswer: 'No. When a struct instance is declared as `let`, the entire value is immutable — including all of its `var` properties. This is because structs are value types: the `let` binding protects the complete copy of the value, not just a pointer. Mutating any property would be mutating the whole value. In contrast, with a class (reference type), `let` only makes the reference constant — the object\'s `var` properties can still be mutated because you are mutating the object on the heap, not the reference itself.',
    keyPoints: [
      'let struct = entire value is frozen, including var properties',
      'let class = reference is constant, but var properties can still be mutated',
      'Core value semantics difference between structs and classes',
    ],
    commonMistakes: [
      'Thinking `var` on a property is sufficient to allow mutation on a `let` struct — it is not',
      'Confusing value-type `let` semantics with reference-type `let` semantics',
    ],
    followUps: [
      {
        id: 'interview.swift.properties.069.f1',
        parentQuestionId: 'interview.swift.properties.069',
        question: 'Why do struct methods that mutate properties need to be marked `mutating`?',
        modelAnswer: 'Struct methods have an implicit `self` parameter. For value types, `self` is passed as a constant by default — you cannot mutate it. The `mutating` keyword tells Swift that this method may modify `self`, so when you call it the caller must have a mutable (`var`) binding. Without `mutating`, the compiler rejects any assignment to `self` or its properties inside the method.',
        keyPoints: ['self is constant by default in struct methods', 'mutating = method can write to self', 'Caller must hold a var binding to call a mutating method'],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-properties', 'swift-struct-vs-class'],
  },
  {
    id: 'interview.swift.properties.070',
    question: 'What is the difference between `willSet` and `didSet`? When would you use each?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-properties',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Properties', 'willSet', 'didSet'],
    modelAnswer: '`willSet` fires immediately *before* the property changes and provides `newValue` — the value about to be stored. `didSet` fires immediately *after* the change and provides `oldValue` — the value that was just replaced. You can use `willSet` when you need to read the current value one last time before it is overwritten (e.g., cancel an animation tied to the old value). `didSet` is far more common — it is used for validation, UI updates, logging, or triggering side effects in response to state changes. You can customize the implicit parameter name: `willSet(incoming)` or `didSet(previous)`.',
    keyPoints: [
      'willSet fires before the change; provides `newValue`',
      'didSet fires after the change; provides `oldValue`',
      'didSet is the most commonly used observer — for side effects and UI updates',
      'You can rename the implicit parameters: willSet(myNewName)',
      'Both can coexist on the same property',
    ],
    commonMistakes: [
      'Modifying the property inside `didSet` — this triggers `didSet` again, risking infinite recursion. Guard with a condition.',
      'Using `willSet` to prevent a change — it is not a veto; the change will happen regardless. To prevent a change, use a computed property setter instead.',
    ],
    followUps: [
      {
        id: 'interview.swift.properties.070.f1',
        parentQuestionId: 'interview.swift.properties.070',
        question: 'What happens if you set the same property inside `didSet`?',
        modelAnswer: 'Setting the same property inside its own `didSet` triggers `didSet` again — this can cause infinite recursion if not guarded. Swift does NOT automatically break the cycle. The standard fix is to check whether the new value differs from old before mutating: `didSet { if temperature == oldValue { return } ... }`, or to use a flag variable to prevent re-entry.',
        keyPoints: ['Mutating in didSet re-triggers didSet', 'Guard with oldValue comparison to break cycle', 'No automatic cycle prevention'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-properties', 'swift-struct-vs-class'],
  },
  {
    id: 'interview.swift.properties.071',
    question: 'Can you add `willSet`/`didSet` observers to a computed property or a lazy property?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-properties',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 2,
    frequency: 'medium',
    tags: ['Swift', 'Properties', 'Observers', 'Computed', 'Lazy'],
    modelAnswer: 'No to computed, conditionally for lazy. **Computed properties** already provide full control over reading and writing via their `get` and `set` blocks — you put side effects directly in `set`, making observers redundant and unsupported by the compiler. **Lazy properties** support `didSet`/`willSet` in theory, but there is a known Swift limitation: the observer fires on the first access (when the lazy initializer runs), which may be unexpected. In practice, you rarely need observers on lazy properties — the lazy initializer itself is the natural place to do setup.',
    keyPoints: [
      'Computed properties: no observers — use set block for side effects',
      'Lazy properties: technically supported but fires on first access — use carefully',
      'Most practical use of observers is on regular stored properties',
    ],
    commonMistakes: [
      'Trying to add willSet/didSet to a computed property — compile error',
      'Being surprised that lazy didSet fires on initialization (first access) not only on subsequent mutations',
    ],
    followUps: [],
    relatedTopics: ['swift-properties'],
  },
  {
    id: 'interview.swift.protocols.072',
    question: 'What is the difference between a method declared in a protocol definition versus a method defined only in a protocol extension?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-protocols',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Swift', 'Protocols', 'Extensions', 'Dynamic Dispatch', 'Static Dispatch', 'Witness Table'],
    modelAnswer: 'The difference lies in how method calls are dispatched at runtime: Dynamic Dispatch (via Protocol Witness Tables) vs Static Dispatch (direct compile-time call).\n\n1. **Declared in Protocol Definition (with default implementation in extension)**: The method is an official protocol requirement and is added to the type\'s Protocol Witness Table (PWT). When called on an existential (`any Protocol`), Swift dynamically dispatches the call to the conforming type\'s implementation if overridden, or falls back to the default implementation.\n\n2. **Defined ONLY in Protocol Extension**: The method is NOT a protocol requirement and has NO witness table slot. When invoked on a variable typed as the protocol existential (`any Protocol`), Swift statically dispatches directly to the extension implementation at compile time, completely ignoring any identical method implemented by the concrete conforming type.\n\nTo achieve polymorphic overriding, a method must always be declared in the protocol definition.',
    keyPoints: [
      'Declared in protocol -> Dynamic dispatch via Protocol Witness Table (PWT)',
      'Only in extension -> Static dispatch (direct compile-time call based on variable type)',
      'Existential variables call extension implementation for unrequired methods even if concrete type has a method with the same name',
      'Essential pattern for interviewers to test understanding of Swift runtime architecture',
    ],
    commonMistakes: [
      'Believing that adding a method to a protocol extension automatically makes it polymorphic',
      'Being surprised when `let p: any Protocol = Concrete()` calls the extension method instead of `Concrete`\'s implementation',
    ],
    followUps: [
      {
        id: 'interview.swift.protocols.072.f1',
        parentQuestionId: 'interview.swift.protocols.072',
        question: 'What is a Protocol Witness Table (PWT) in Swift and how is it used?',
        modelAnswer: 'A Protocol Witness Table is an array of function pointers that maps a concrete type\'s methods to a protocol\'s required methods. When an existential (`any Protocol`) calls a requirement, Swift looks up the function pointer in the PWT to dynamically invoke the correct implementation at runtime.',
        keyPoints: ['Array of function pointers generated by compiler', 'One PWT per concrete type conformance', 'Enables dynamic dispatch for value types without class vtables'],
        difficulty: 'advanced',
      },
    ],
    relatedTopics: ['swift-protocols', 'swift-method-dispatch'],
  },
  {
    id: 'interview.swift.protocols.073',
    question: 'Why do delegate protocols in iOS commonly need to inherit from AnyObject?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-protocols',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Protocols', 'AnyObject', 'ARC', 'Delegates', 'Memory'],
    modelAnswer: 'In iOS, delegates are held as weak references (`weak var delegate: (any MyDelegate)?`) to prevent retain cycles (strong reference cycles) between the delegating object and its owner. In Swift, ARC and weak references only exist for reference types (classes). Value types (structs and enums) cannot be held weakly because they do not participate in reference counting.\n\nIf a protocol does not inherit from `AnyObject`, the compiler assumes value types could conform to it, and therefore rejects declaring a `weak` reference to that protocol with a compile-time error: *"\'weak\' must not be applied to non-class-bound \'any MyDelegate\'"*. Constraining the protocol to `AnyObject` (`protocol MyDelegate: AnyObject`) guarantees that only classes can conform, allowing safe `weak` ownership.',
    keyPoints: [
      'Delegate pattern creates potential strong reference cycles between parent and child',
      'Weak references require reference types (classes); structs cannot be held weakly',
      'Inheriting from AnyObject restricts conformance strictly to classes',
      'Prevents compiler error when declaring weak delegate properties',
    ],
    commonMistakes: [
      'Using deprecated `: class` syntax instead of modern `: AnyObject`',
      'Forgetting weak on delegate properties, causing silent memory leaks in UIKit and SwiftUI view controllers',
    ],
    followUps: [],
    relatedTopics: ['swift-protocols', 'memory-arc', 'memory-retain-cycles'],
  },
  {
    id: 'interview.swift.protocols.074',
    question: 'What is an associatedtype in Swift protocols, and how do Primary Associated Types work in Swift 5.7+ and Swift 6?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-protocols',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Swift', 'Protocols', 'Generics', 'associatedtype', 'Primary Associated Types'],
    modelAnswer: 'An `associatedtype` is a placeholder name for a type used inside a protocol blueprint (known as a Protocol with Associated Types, or PAT). Protocols cannot take type parameters in angle brackets like `protocol Stack<T>` in older Swift versions; instead they declare `associatedtype Element`.\n\nConforming types specify the concrete type either explicitly using `typealias Element = Int` or implicitly through method parameter and return type inference.\n\n**Primary Associated Types (Swift 5.7+ / Swift 6)** introduce the ability to declare primary type parameters directly in the protocol header: `protocol Collection<Element>`. This allows developers to use generic constraints directly at call sites without cumbersome type erasure wrappers, such as `func process(items: some Collection<String>)`.',
    keyPoints: [
      'associatedtype provides generic type placeholders inside protocols',
      'Conforming types resolve it via inference or explicit typealias',
      'Primary Associated Types allow angle bracket syntax in protocol definitions: protocol Container<Item>',
      'Drastically simplifies API signatures like some Collection<Element> in modern Swift',
    ],
    commonMistakes: [
      'Attempting to use regular generic syntax `protocol MyProtocol<T>` in Swift 5.6 or earlier',
      'Unnecessarily building complex AnyTypeErased wrappers when Primary Associated Types or `any Protocol<T>` suffice in Swift 6',
    ],
    followUps: [],
    relatedTopics: ['swift-protocols', 'swift-generics', 'swift-type-erasure'],
  },
  {
    id: 'interview.swift.protocols.075',
    question: 'Explain the difference between `some Protocol` and `any Protocol` in modern Swift.',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-protocols',
    difficulty: 'intermediate',
    type: 'comparison',
    estimatedMinutes: 5,
    frequency: 'high',
    tags: ['Swift', 'Protocols', 'some', 'any', 'Existential', 'Opaque Types', 'Performance'],
    modelAnswer: '`some Protocol` (opaque type) and `any Protocol` (existential type) represent two distinct ways to interact with protocols in Swift 5.7+ and Swift 6:\n\n1. **`some Protocol` (Opaque Type)**: The compiler knows the exact, single concrete type under the hood, but hides it from the caller. Because the concrete type is fixed at compile time, method calls use fast static dispatch, require zero heap allocation, and preserve underlying type identity. It is best for function returns (like SwiftUI\'s `var body: some View`) and generic parameter shorthands.\n\n2. **`any Protocol` (Existential Type)**: A dynamic runtime box (existential container) that can hold *different* conforming concrete types over its lifetime. It uses dynamic dispatch via witness tables and requires heap allocation if the payload exceeds 3 words (24 bytes on 64-bit systems). It is required when you need heterogeneous collections (e.g. `[any Shape]`).\n\nRule of thumb: Default to `some` for performance and safety; use `any` only when runtime heterogeneity is truly necessary.',
    keyPoints: [
      'some is resolved at compile-time (opaque type, static dispatch, no boxing cost)',
      'any is resolved at runtime (existential container, dynamic dispatch, potential heap allocation)',
      'some requires returning one single consistent concrete type',
      'any allows mixing different concrete types in a collection: [any Shape]',
    ],
    commonMistakes: [
      'Using `any` everywhere by default, incurring performance and unboxing overhead',
      'Trying to return two different concrete types from a function returning `some Protocol`',
    ],
    followUps: [],
    relatedTopics: ['swift-protocols', 'swift-opaque-types', 'swift-generics'],
  },
  {
    id: 'interview.swift.protocols.076',
    question: 'What is Protocol Composition in Swift, and why is it preferred over deep class inheritance?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-protocols',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'medium',
    tags: ['Swift', 'Protocols', 'Composition', 'Architecture', 'Clean Code'],
    modelAnswer: 'Protocol Composition is the practice of combining multiple smaller, single-purpose protocols using the ampersand (`&`) operator to express compound requirements (e.g. `any Named & Aged & Identifiable`).\n\nIn deep class inheritance hierarchies (OOP), subclasses inherit state and behaviors they may not need, creating rigid dependencies and the "fragile base class" problem. Protocol Composition follows the Interface Segregation Principle: types only conform to the specific capabilities they need, and functions only demand the exact behaviors required. Furthermore, protocol composition works seamlessly with value types (structs and enums), avoiding heap allocation and reference overhead.',
    keyPoints: [
      'Ampersand (&) syntax combines multiple protocols into a temporary composite requirement',
      'Follows the Interface Segregation Principle (small, focused protocols)',
      'Avoids monolithic God base classes and diamond inheritance issues',
      'Standard library examples include Codable = Encodable & Decodable',
    ],
    commonMistakes: [
      'Creating massive "kitchen sink" protocols with dozens of unrelated requirements',
      'Creating deep inheritance trees to share minor helper behaviors instead of composable protocols with extensions',
    ],
    followUps: [],
    relatedTopics: ['swift-protocols', 'swift-struct-vs-class', 'arch-di'],
  },
  {
    id: 'interview.swift.protocols.077',
    question: 'Why must protocol methods be marked with `mutating` if conforming value types modify their internal state, and what happens when a class conforms?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-protocols',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'medium',
    tags: ['Swift', 'Protocols', 'mutating', 'Value Types', 'Classes'],
    modelAnswer: 'In Swift, structs and enums are value types whose instance methods cannot mutate stored properties by default unless explicitly marked `mutating`. If a protocol requirement modifies state, the protocol definition itself must specify `mutating func methodName()`.\n\nIf `mutating` is omitted from the protocol, a conforming struct or enum will fail to compile if it tries to mutate any stored properties inside its implementation.\n\nWhen a `class` conforms to a protocol with a `mutating func`, it implements the method **without** the `mutating` keyword. Because classes are reference types, modifying an instance\'s properties does not alter the reference itself, so `mutating` is not needed or permitted on class methods.',
    keyPoints: [
      'Value types cannot mutate self or stored properties without mutating func',
      'Protocol requirements must declare mutating func to allow value type mutability',
      'Classes conform without the mutating keyword because reference semantics allow mutation',
      'Allows a single protocol to be adopted by both value and reference types safely',
    ],
    commonMistakes: [
      'Forgetting mutating in the protocol definition and wondering why a struct cannot modify its properties',
      'Putting the mutating keyword on class methods (compile error in classes)',
    ],
    followUps: [],
    relatedTopics: ['swift-protocols', 'swift-struct-vs-class', 'swift-properties'],
  },
  {
    id: 'interview.swift.protocols.078',
    question: 'How do initializer requirements work in protocols, and why does a non-final class require the `required` keyword?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-protocols',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'medium',
    tags: ['Swift', 'Protocols', 'Initializers', 'required', 'Classes', 'Subclassing'],
    modelAnswer: 'Protocols can specify initializer requirements (e.g. `init(configuration: Config)`). When a `struct` conforms, it simply implements the initializer.\n\nHowever, when a non-final `class` implements a protocol initializer requirement, it MUST prefix the initializer with the `required` keyword (`required init(...)`).\n\nThe `required` modifier ensures that every potential subclass of that class will also implement or inherit this initializer, guaranteeing that any subclass can be instantiated polymorphically through the protocol. If the class is marked `final`, the `required` keyword can be omitted because no subclasses can ever exist.',
    keyPoints: [
      'Protocols can mandate initializers: init(param: Type)',
      'Non-final classes must mark implementation as required init',
      'Guarantees all future subclasses satisfy the protocol initializer requirement',
      'final classes can omit required because they cannot be subclassed',
    ],
    commonMistakes: [
      'Omitting required on a non-final class initializer implementing a protocol requirement (compile error)',
      'Forgetting that required initializers must be explicitly implemented if a subclass defines designated initializers',
    ],
    followUps: [],
    relatedTopics: ['swift-protocols', 'swift-initialization-deinitialization', 'swift-struct-vs-class'],
  },
  {
    id: 'interview.swift.access_control.079',
    question: "What are Swift's six access control levels, from most to least restrictive?",
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-access-control',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Access Control', 'Encapsulation', 'Modules', 'open', 'package'],
    modelAnswer: 'From most to least restrictive: private (visible only within the enclosing declaration, plus same-file extensions of that type), fileprivate (visible anywhere in the same file), internal (visible throughout the module — this is the default), package (visible across modules within the same Swift package), public (visible to any module that imports this one, but not subclassable/overridable externally), and open (visible AND subclassable/overridable from outside the module).',
    keyPoints: [
      'Six levels: private, fileprivate, internal, package, public, open',
      'internal is the default if no modifier is written',
      'public allows use but not subclassing/overriding externally',
      'open additionally allows subclassing/overriding externally',
    ],
    commonMistakes: [
      'Forgetting package is a distinct level from internal — it spans multiple modules in the same package',
      'Not knowing the order from most to least restrictive',
    ],
    followUps: [
      {
        id: 'interview.swift.access_control.079.f1',
        parentQuestionId: 'interview.swift.access_control.079',
        question: 'Which of these access levels apply only to classes and their members?',
        modelAnswer: 'open. It only makes sense for classes (and their overridable members) since structs, enums, and final classes cannot be subclassed regardless of access level.',
        keyPoints: ['open applies only to classes and class members', 'Value types cannot be subclassed'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-access-control'],
  },
  {
    id: 'interview.swift.access_control.080',
    question: 'What is the difference between private and fileprivate?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-access-control',
    difficulty: 'foundational',
    type: 'conceptual',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Access Control', 'private', 'fileprivate', 'Scope'],
    modelAnswer: 'private restricts access to the enclosing declaration itself, plus (since Swift 4) extensions of that same type within the same file. fileprivate restricts access to the entire file, but across any type in that file — not just the declaring type and its extensions. So fileprivate is broader: it allows a different type in the same file to access the member, which private does not.',
    keyPoints: [
      'private: enclosing declaration + same-file extensions of that type',
      'fileprivate: entire file, across different types',
      'fileprivate is broader in scope than private',
      'Both are file-scoped in some sense, but private is also type-scoped',
    ],
    commonMistakes: [
      'Thinking private and fileprivate are equivalent — they are not, fileprivate is strictly broader',
      'Not knowing that private allows same-file extension access (a Swift 4+ change)',
    ],
    followUps: [
      {
        id: 'interview.swift.access_control.080.f1',
        parentQuestionId: 'interview.swift.access_control.080',
        question: 'If you have a private property and try to access it from an extension of the same type in a DIFFERENT file, what happens?',
        modelAnswer: 'Compile error. The same-file exception for private only applies within the same file — a different file, even for the same type\'s extension, cannot access it.',
        keyPoints: ['Same-file extension rule is strictly limited to the same file', 'Different files cannot access private members even in extensions'],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-access-control'],
  },
  {
    id: 'interview.swift.access_control.081',
    question: 'What is the difference between public and open, and why does this distinction exist?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-access-control',
    difficulty: 'intermediate',
    type: 'comparison',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Swift', 'Access Control', 'public', 'open', 'Subclassing', 'API Design'],
    modelAnswer: 'public makes a declaration visible and usable from any module that imports it, but external modules cannot subclass a public class or override its public members. open provides everything public does, plus allows subclassing and overriding from outside the defining module. This distinction exists because allowing external subclassing is a much bigger commitment for API design — once external code subclasses your type, you have far less freedom to change its internal implementation without breaking that external code. public gives you a safer default; open is an explicit, deliberate choice to support extensibility.',
    keyPoints: [
      'public: usable externally, not subclassable/overridable externally',
      'open: usable AND subclassable/overridable externally',
      'open is a bigger API commitment — external code can depend on overridden behavior',
      'Swift defaults to the safer option (public) requiring explicit opt-in to open',
    ],
    commonMistakes: [
      'Assuming public allows subclassing from other modules — it does not',
      'Marking things open by default instead of only when extensibility is genuinely needed',
    ],
    followUps: [
      {
        id: 'interview.swift.access_control.081.f1',
        parentQuestionId: 'interview.swift.access_control.081',
        question: 'Can you override a public (not open) method within the SAME module?',
        modelAnswer: 'Yes — public vs open only restricts subclassing/overriding from OUTSIDE the defining module. Within the same module, a public method can be overridden freely by any subclass, since internal code already has full access.',
        keyPoints: ['Module boundary governs public vs open distinction', 'Subclassing within the same module is always permitted unless marked final'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-access-control', 'swift-struct-vs-class'],
  },
  {
    id: 'interview.swift.access_control.082',
    question: "What problem does the 'package' access level solve, and when would you use it?",
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-access-control',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Swift', 'Access Control', 'package', 'SPM', 'Modules', 'Swift 5.9'],
    modelAnswer: 'Before package access existed (introduced in Swift 5.9), if you had a multi-module Swift package and wanted a type to be visible across your own modules but NOT to external consumers of the package, you had no good option — internal only works within a single module, and public exposes it to everyone, including external users. package access solves this gap: it\'s visible across all modules within the same package, but invisible to anyone outside the package. Use it for internal package infrastructure shared across your own modules that shouldn\'t be part of your public API.',
    keyPoints: [
      'Solves the gap between internal (single module) and public (everyone)',
      'Visible across modules within the same package only',
      'Useful for internal package infrastructure not meant to be public API',
      'Introduced in Swift 5.9',
    ],
    commonMistakes: [
      'Not knowing this access level exists and defaulting to public unnecessarily',
      'Confusing package scope with internal scope — internal is single-module only',
    ],
    followUps: [
      {
        id: 'interview.swift.access_control.082.f1',
        parentQuestionId: 'interview.swift.access_control.082',
        question: 'If you are building a single-module app (not a multi-module package), does package access level matter to you?',
        modelAnswer: 'Not really — package and internal behave the same way in a single-module context, since there is only one module in the "package" anyway. package access becomes meaningful specifically in multi-module packages.',
        keyPoints: ['In single-module apps, package is redundant with internal', 'Package access is designed for multi-target SPM packages'],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-access-control'],
  },
  {
    id: 'interview.swift.access_control.083',
    question: 'What does `private(set)` do in Swift, and why might you design a property this way?\n\n```swift\nclass ScoreTracker {\n    private(set) var score: Int = 0\n    func addPoint() { score += 1 }\n}\n```',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-access-control',
    difficulty: 'intermediate',
    type: 'code-analysis',
    estimatedMinutes: 3,
    frequency: 'high',
    tags: ['Swift', 'Access Control', 'private(set)', 'Encapsulation', 'Properties'],
    modelAnswer: 'This creates a property that is readable from anywhere the class itself is visible (internal, by default, since no explicit access level is given to the property besides the setter restriction), but only writable from within ScoreTracker itself. External code can read tracker.score freely but cannot directly assign tracker.score = 100 — it can only change the value indirectly through addPoint(). This is useful for exposing observable state while ensuring all mutations go through controlled logic (in this case, always incrementing by exactly one point via addPoint(), never an arbitrary direct assignment).',
    keyPoints: [
      'private(set) restricts only the setter, not the getter',
      'Getter access level follows the property\'s own declared level (internal by default here)',
      'Forces all mutations through controlled methods like addPoint()',
      'Common pattern for exposing read-only-looking state backed by internal mutability',
    ],
    commonMistakes: [
      'Thinking private(set) makes the whole property private — it only restricts the setter',
      'Writing a custom get-only computed property with a separate private backing variable when private(set) would be simpler',
    ],
    followUps: [
      {
        id: 'interview.swift.access_control.083.f1',
        parentQuestionId: 'interview.swift.access_control.083',
        question: 'Could you make the getter public while keeping the setter internal, on a public class?',
        modelAnswer: 'Yes: `public internal(set) var score: Int` (or `public private(set) var score: Int` if you want the setter strictly private). The getter and setter can have independently specified access levels as long as the setter is at least as restrictive as the getter.',
        keyPoints: ['public internal(set) allows public read with module-internal write', 'Setter access level must be less than or equal to getter access level'],
        difficulty: 'intermediate',
      },
    ],
    relatedTopics: ['swift-access-control', 'swift-properties'],
  },
  {
    id: 'interview.swift.access_control.084',
    question: 'Why does good framework design generally favor the most restrictive access level that still works, rather than making everything public?',
    domainId: 'swift',
    moduleId: 'swift-core-mod',
    topicId: 'swift-access-control',
    difficulty: 'intermediate',
    type: 'conceptual',
    estimatedMinutes: 4,
    frequency: 'high',
    tags: ['Swift', 'Access Control', 'Framework Design', 'Encapsulation', 'Architecture'],
    modelAnswer: 'Every public or open declaration becomes part of your framework\'s API contract — external consumers may come to depend on it. This makes future changes riskier: renaming, removing, or changing the behavior of a public declaration is a breaking change for anyone using it. Keeping implementation details private/internal preserves your freedom to refactor without breaking consumers, since nothing outside could have depended on what it cannot see. The general principle: default to the narrowest access level that satisfies the actual requirement, and widen only when there is a specific, deliberate reason.',
    keyPoints: [
      'Public/open declarations are API contracts — consumers may depend on them',
      'Narrow access preserves freedom to refactor internals safely',
      'Widening access should be a deliberate decision, not a default',
      'This is a general software design principle enforced directly by Swift\'s access levels',
    ],
    commonMistakes: [
      'Making everything public "just in case it\'s needed later" — this removes future flexibility',
      'Not considering that public API changes are breaking changes for consumers',
    ],
    followUps: [
      {
        id: 'interview.swift.access_control.084.f1',
        parentQuestionId: 'interview.swift.access_control.084',
        question: 'If you are not building a framework — just an app — does this principle still matter?',
        modelAnswer: 'Yes, though the stakes are lower. Within a single app, using internal/private thoughtfully still gives you the same refactoring safety and makes your codebase easier to reason about, even though there is no external consumer to break.',
        keyPoints: ['Promotes loose coupling and encapsulation within app architectures', 'Reduces cognitive load by narrowing the visible API surface in autocomplete'],
        difficulty: 'foundational',
      },
    ],
    relatedTopics: ['swift-access-control'],
  },
  {
    "id": "interview.swift.initialization.085",
    "question": "How does Swift guarantee that all stored properties are initialized before an instance can be used, and why does this matter?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-initialization-deinitialization",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "Initialization",
      "Memory Safety",
      "Properties"
    ],
    "modelAnswer": "Swift enforces at compile time that every stored property of a struct, class, or enum must be set to a valid initial value before any access to the instance is allowed. Unlike languages like C or Objective-C where uninitialized memory contains garbage data that causes mysterious bugs or security vulnerabilities, Swift eliminates uninitialized memory reads entirely. The compiler verifies this through definite initialization analysis, requiring properties without default values to be populated inside initializers before calling methods or accessing self.",
    "keyPoints": [
      "Every stored property must be fully initialized before use",
      "Enforced strictly at compile time via definite initialization analysis",
      "Prevents uninitialized memory reads, undefined behavior, and security leaks",
      "Applies to structs, classes, and enum instances"
    ],
    "commonMistakes": [
      "Assuming optional properties require explicit assignment in init (they default to nil)",
      "Attempting to read self properties before Phase 1 initialization completes"
    ],
    "followUps": [
      {
        "id": "interview.swift.initialization.085.f1",
        "parentQuestionId": "interview.swift.initialization.085",
        "question": "Do property wrappers change how definite initialization works?",
        "modelAnswer": "Yes. When using a property wrapper without an initial value, you must initialize either the wrapped value or the backing storage (_propertyName) in the initializer before accessing self.",
        "keyPoints": [
          "Backing storage _propertyName must be initialized",
          "Wrapped value access is only valid once storage exists"
        ],
        "difficulty": "advanced"
      }
    ],
    "relatedTopics": [
      "swift-initialization-deinitialization",
      "swift-properties",
      "swift-struct-vs-class"
    ]
  },
  {
    "id": "interview.swift.initialization.086",
    "question": "What is Two-Phase Initialization in Swift class hierarchies, and what safety checks occur in each phase?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-initialization-deinitialization",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 5,
    "frequency": "high",
    "tags": [
      "Swift",
      "Initialization",
      "Two-Phase",
      "Inheritance",
      "Safety"
    ],
    "modelAnswer": "Two-Phase Initialization is Swift's class initialization protocol that ensures memory safety across inheritance hierarchies:\n\n1. Phase 1 (Bottom-Up): The subclass designated initializer initializes all stored properties introduced by that subclass first. Once its own stored properties are initialized, it delegates up to its superclass designated initializer (`super.init(...)`). This chain continues up to the root class. Once the root class finishes initializing its stored properties, the instance's memory is considered fully initialized.\n\n2. Phase 2 (Top-Down): Starting from the root class down through each subclass, initializers can now safely customize stored properties, access `self`, and call instance methods or pass `self` as a parameter.",
    "keyPoints": [
      "Phase 1 ensures all stored properties from subclass up to root class are set",
      "Phase 2 allows self access, instance method calls, and property modification",
      "Cannot call instance methods or pass self before super.init() completes Phase 1",
      "Prevents subclasses from accessing uninitialized superclass state or vice-versa"
    ],
    "commonMistakes": [
      "Calling instance methods or passing self before super.init() completes Phase 1",
      "Assigning a superclass property before calling super.init() (super.init would overwrite it)"
    ],
    "followUps": [
      {
        "id": "interview.swift.initialization.086.f1",
        "parentQuestionId": "interview.swift.initialization.086",
        "question": "Why does Swift forbid modifying superclass properties before super.init()?",
        "modelAnswer": "Because the superclass's designated initializer would overwrite whatever value the subclass assigned when it executes its own initialization logic.",
        "keyPoints": [
          "Superclass init would overwrite subclass assignment",
          "Enforces strict execution ordering"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-initialization-deinitialization",
      "swift-struct-vs-class"
    ]
  },
  {
    "id": "interview.swift.initialization.087",
    "question": "What are the exact rules for designated vs convenience initializers, and how do they delegate?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-initialization-deinitialization",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "Initialization",
      "Designated",
      "Convenience",
      "Delegation"
    ],
    "modelAnswer": "Swift defines three strict delegation rules for class initializers:\n\n1. Rule 1: A designated initializer must call a designated initializer from its immediate superclass (`super.init`). It delegates *up* the inheritance chain.\n2. Rule 2: A convenience initializer must call another initializer from the *same* class (`self.init`). It delegates *across*.\n3. Rule 3: A convenience initializer must ultimately call a designated initializer.\n\nDesignated initializers are the primary funnel points through which all initialization occurs. Convenience initializers provide secondary, supporting initializers with default arguments or configurations.",
    "keyPoints": [
      "Designated initializers delegate UP to superclass designated inits",
      "Convenience initializers delegate ACROSS to same-class initializers",
      "Convenience initializers must ultimately resolve to a designated initializer",
      "Ensures every class fully initializes its own state without gaps"
    ],
    "commonMistakes": [
      "A convenience initializer attempting to call super.init directly (violates Rule 2)",
      "A designated initializer calling self.init (designated initializers cannot delegate across)"
    ],
    "followUps": [
      {
        "id": "interview.swift.initialization.087.f1",
        "parentQuestionId": "interview.swift.initialization.087",
        "question": "Can value types (structs) have designated and convenience initializers?",
        "modelAnswer": "No. Value types do not support inheritance, so all custom struct initializers simply delegate across to other initializers using self.init without needing the convenience keyword.",
        "keyPoints": [
          "No inheritance in structs",
          "Convenience keyword only applies to classes"
        ],
        "difficulty": "foundational"
      }
    ],
    "relatedTopics": [
      "swift-initialization-deinitialization",
      "swift-struct-vs-class"
    ]
  },
  {
    "id": "interview.swift.initialization.088",
    "question": "How do failable initializers (`init?`) work, and how does initialization failure propagate?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-initialization-deinitialization",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "Initialization",
      "Failable",
      "Optionals",
      "Error Handling"
    ],
    "modelAnswer": "A failable initializer (`init?`) defines an initializer that can return `nil` if instance creation cannot succeed (e.g. invalid arguments, missing resource, or corrupt data). It creates an optional instance of the type.\n\nInside a failable initializer, you trigger failure by executing `return nil`. When delegating to another failable initializer (either `self.init?` or `super.init?`), if the delegated initializer returns `nil`, the entire initialization immediately aborts and returns `nil`. You can also override a superclass failable initializer with a non-failable initializer in a subclass, but not vice-versa.",
    "keyPoints": [
      "init? returns an optional instance (T?)",
      "return nil triggers initialization failure and deallocates memory",
      "Failure in a delegated initializer propagates immediately up the chain",
      "A non-failable init can override a failable superclass init, but not vice-versa"
    ],
    "commonMistakes": [
      "Thinking a non-failable initializer can delegate to a failable init without force-unwrapping or catching",
      "Overriding a non-failable superclass initializer with a failable one"
    ],
    "followUps": [
      {
        "id": "interview.swift.initialization.088.f1",
        "parentQuestionId": "interview.swift.initialization.088",
        "question": "When should you prefer throwing initializers (init() throws) over failable initializers (init?)?",
        "modelAnswer": "Use throwing initializers when the caller needs to know *why* initialization failed (with descriptive error types). Use failable initializers when failure is binary and self-explanatory (such as Int(\"abc\") failing).",
        "keyPoints": [
          "Throwing inits convey specific error diagnostics",
          "Failable inits are for simple binary success/failure"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-initialization-deinitialization",
      "swift-optionals",
      "swift-error-handling"
    ]
  },
  {
    "id": "interview.swift.initialization.089",
    "question": "Under what exact conditions does a Swift subclass automatically inherit its superclass initializers?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-initialization-deinitialization",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "medium",
    "tags": [
      "Swift",
      "Initialization",
      "Inheritance",
      "Automatic Inheritance"
    ],
    "modelAnswer": "Swift subclasses do not inherit superclass initializers by default, preventing incomplete initialization. However, automatic inheritance occurs under two specific rules:\n\n1. Rule 1: If the subclass provides default values for all new stored properties and defines NO designated initializers of its own, it automatically inherits ALL superclass designated and convenience initializers.\n2. Rule 2: If the subclass provides an implementation of ALL superclass designated initializers (either by inheriting them via Rule 1 or by explicitly overriding every one), it automatically inherits all superclass convenience initializers.",
    "keyPoints": [
      "Subclasses do not inherit initializers by default to maintain safety",
      "Rule 1: No designated inits defined -> inherits all superclass inits",
      "Rule 2: Implements/overrides all superclass designated inits -> inherits all convenience inits",
      "Providing default values for all subclass properties enables automatic inheritance"
    ],
    "commonMistakes": [
      "Adding a single designated initializer to a subclass and wondering why superclass convenience inits vanished",
      "Assuming convenience initializers are always inherited without implementing all designated inits"
    ],
    "followUps": [
      {
        "id": "interview.swift.initialization.089.f1",
        "parentQuestionId": "interview.swift.initialization.089",
        "question": "Can a subclass implement a superclass designated initializer as a convenience initializer?",
        "modelAnswer": "Yes. A subclass can override a superclass designated initializer using `override convenience init(...)`, provided it delegates to a subclass designated initializer.",
        "keyPoints": [
          "Allowed via override convenience init",
          "Must still delegate across to a designated init"
        ],
        "difficulty": "advanced"
      }
    ],
    "relatedTopics": [
      "swift-initialization-deinitialization",
      "swift-struct-vs-class"
    ]
  },
  {
    "id": "interview.swift.initialization.090",
    "question": "What is a required initializer in Swift, and why does protocol conformance often mandate it on classes?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-initialization-deinitialization",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 3,
    "frequency": "high",
    "tags": [
      "Swift",
      "Initialization",
      "required",
      "Protocols",
      "Polymorphism"
    ],
    "modelAnswer": "The `required` modifier on a class initializer indicates that every subclass of the class must implement that initializer (or automatically inherit it). Subclasses must also prefix their implementation with `required` rather than `override`.\n\nWhen a protocol specifies an initializer requirement (e.g. `init(json: [String: Any])`), any non-final class conforming to that protocol MUST mark the initializer as `required`. This guarantees that if a function creates an instance dynamically via a metatype (`T.init(json:)` where `T: DecodableModel`), any derived subclass of `T` will also satisfy the initializer contract.",
    "keyPoints": [
      "required forces every current and future subclass to implement the initializer",
      "Subclasses mark it with required rather than override",
      "Protocol initializer requirements require non-final classes to use required init",
      "final classes can omit required because no subclasses can ever exist"
    ],
    "commonMistakes": [
      "Using override instead of required when implementing a required initializer in a subclass",
      "Forgetting that protocol initializers require required on non-final classes"
    ],
    "followUps": [
      {
        "id": "interview.swift.initialization.090.f1",
        "parentQuestionId": "interview.swift.initialization.090",
        "question": "Why does a final class not need the required keyword for protocol initializers?",
        "modelAnswer": "Because a final class cannot be subclassed, the requirement that subclasses implement the initializer is vacuously satisfied.",
        "keyPoints": [
          "No subclasses possible",
          "Compiler waives requirement for final classes"
        ],
        "difficulty": "foundational"
      }
    ],
    "relatedTopics": [
      "swift-initialization-deinitialization",
      "swift-protocols"
    ]
  },
  {
    "id": "interview.swift.initialization.091",
    "question": "What are the execution guarantees and constraints of deinitializers (`deinit`) in Swift?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-initialization-deinitialization",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "deinit",
      "Memory Management",
      "ARC",
      "Cleanup"
    ],
    "modelAnswer": "A deinitializer (`deinit`) is called immediately before a class instance is deallocated and its memory reclaimed by ARC. Key guarantees and constraints:\n\n1. Class-only: `deinit` is available only on reference types (`class`). Structs and enums cannot have deinitializers because they are value types whose memory is released when scope exits without reference counting.\n2. Automatic execution: `deinit` is called automatically by ARC when retain count reaches zero. It cannot be called manually.\n3. Inheritance chain: Superclass deinitializers are called automatically at the end of subclass deinitialization. You never call `super.deinit()`.\n4. Access to self: Inside `deinit`, the instance is still fully valid, so you can access all properties (e.g. to close file descriptors, unregister observers, or invalidate timers).",
    "keyPoints": [
      "Only classes support deinit; value types do not",
      "Runs exactly once immediately prior to memory deallocation",
      "Superclass deinit is called automatically by runtime at the end",
      "All stored properties remain valid and readable throughout deinit"
    ],
    "commonMistakes": [
      "Attempting to call super.deinit() (compiler error)",
      "Creating a strong reference to self inside deinit (can cause resurrection bugs or undefined state)",
      "Expecting deinit to run for instances caught in retain cycles"
    ],
    "followUps": [
      {
        "id": "interview.swift.initialization.091.f1",
        "parentQuestionId": "interview.swift.initialization.091",
        "question": "Does deinit run if a program crashes or exits immediately via fatalError()?",
        "modelAnswer": "No. Process termination (crash, fatalError, or exit) halts execution immediately and frees memory at the OS level without invoking individual Swift deinitializers.",
        "keyPoints": [
          "fatalError/crashes abort immediately",
          "OS reclaims process memory without deinit calls"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-initialization-deinitialization",
      "swift-struct-vs-class"
    ]
  },
  {
    "id": "interview.swift.initialization.092",
    "question": "What are the memberwise initializer rules for structs, and how does adding a custom init affect them?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-initialization-deinitialization",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 3,
    "frequency": "high",
    "tags": [
      "Swift",
      "Initialization",
      "Structs",
      "Memberwise Initializer"
    ],
    "modelAnswer": "Swift automatically synthesizes a memberwise initializer for any struct that does not define any custom initializers. This initializer accepts parameters for all stored properties, with default argument values provided for any properties initialized with defaults.\n\nHowever, as soon as you define a custom initializer inside the struct's primary definition, the compiler suppresses the automatic memberwise initializer. If you want to keep both your custom initializer AND the synthesized memberwise initializer, you must declare the custom initializer inside an `extension` of the struct.",
    "keyPoints": [
      "Synthesized automatically if no custom initializers exist in struct definition",
      "Accepts arguments for all stored properties, respecting default values",
      "Suppressed immediately if a custom init is defined in the struct body",
      "Declaring custom inits in an extension preserves the memberwise init"
    ],
    "commonMistakes": [
      "Adding a custom init in the main struct definition and wondering why the memberwise init stopped working",
      "Thinking classes receive an automatic memberwise initializer (only structs do)"
    ],
    "followUps": [
      {
        "id": "interview.swift.initialization.092.f1",
        "parentQuestionId": "interview.swift.initialization.092",
        "question": "What access level does the synthesized memberwise initializer receive?",
        "modelAnswer": "By default, internal. If any stored property is private, the memberwise init is private. It is never automatically public in a framework—you must explicitly write a public init.",
        "keyPoints": [
          "Internal by default",
          "Never public automatically in library modules"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-initialization-deinitialization",
      "swift-struct-vs-class",
      "swift-access-control"
    ]
  },
  {
    "id": "interview.swift.opaque_types.093",
    "question": "What is an opaque return type (`some Protocol`), and what problem does it solve in API design?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-opaque-types",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "some",
      "Opaque Types",
      "Generics",
      "API Design"
    ],
    "modelAnswer": "An opaque return type (`some Protocol`) allows a function or property to return a concrete type while hiding the specific type name from callers. The compiler knows the exact concrete type under the hood, but callers only know that it conforms to the specified protocol.\n\nThis solves two major API design problems:\n1. Leaky implementation details: Complex generic types like `ModifiedContent<TupleView<(Text, Button)>, _PaddingLayout>` are hidden behind `some View`.\n2. Preservation of type identity: Unlike existential boxes (`any Protocol`), `some Protocol` preserves type identity at compile time, enabling static dispatch, compiler optimizations, and compatibility with protocols having `Self` or `associatedtype` requirements.",
    "keyPoints": [
      "Returns a specific, concrete type hidden from callers",
      "Compiler preserves underlying type identity and optimizes via static dispatch",
      "Hides complex nested generic types in framework interfaces",
      "Supports protocols with Self and associatedtype requirements"
    ],
    "commonMistakes": [
      "Attempting to return different concrete types from different branches of an if/else in a some function",
      "Conflating some Protocol with any Protocol"
    ],
    "followUps": [
      {
        "id": "interview.swift.opaque_types.093.f1",
        "parentQuestionId": "interview.swift.opaque_types.093",
        "question": "Why does a function returning `some Equatable` allow equality checks, while `any Equatable` historically caused compiler errors?",
        "modelAnswer": "Because some Equatable guarantees that two returns from the same function call have the identical underlying type satisfying Self == Self, whereas any Equatable erases the type, making it unknown whether two instances share the same concrete type.",
        "keyPoints": [
          "some preserves concrete Self type identity",
          "any erases type identity, breaking binary comparisons"
        ],
        "difficulty": "advanced"
      }
    ],
    "relatedTopics": [
      "swift-opaque-types",
      "swift-protocols",
      "swift-generics"
    ]
  },
  {
    "id": "interview.swift.opaque_types.094",
    "question": "Compare `some Protocol` and `any Protocol` in terms of type identity, dispatch, and flexibility.",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-opaque-types",
    "difficulty": "intermediate",
    "type": "comparison",
    "estimatedMinutes": 5,
    "frequency": "high",
    "tags": [
      "Swift",
      "some vs any",
      "Opaque Types",
      "Existentials",
      "Dispatch"
    ],
    "modelAnswer": "`some Protocol` (Opaque Type) vs `any Protocol` (Existential Box):\n\n1. Type Identity: `some` represents ONE specific concrete type chosen by the implementation. The compiler knows it; callers cannot see it. `any` represents an existential container that can hold ANY conforming type, changing dynamically at runtime.\n2. Dispatch: `some` uses static direct dispatch (inlined, zero overhead). `any` requires dynamic dispatch via Protocol Witness Tables (PWT).\n3. Allocation: `some` has zero heap allocation overhead. `any` uses a 3-word existential container and spills to heap allocation if the wrapped value exceeds 24 bytes.\n4. Heterogeneous collections: You cannot mix different types in `[some Shape]`. You CAN mix different types in `[any Shape]`.",
    "keyPoints": [
      "some = fixed concrete type, compile-time identity, static dispatch, zero allocation cost",
      "any = runtime box, unknown type, dynamic dispatch via witness tables, potential heap allocation",
      "Use some by default; use any only when runtime heterogeneity is required",
      "[any Protocol] allows mixed types; [some Protocol] enforces identical concrete types"
    ],
    "commonMistakes": [
      "Using any by default because it feels like traditional Java/TypeScript interfaces",
      "Not realizing that any Protocol incurs witness table and boxing overhead"
    ],
    "followUps": [
      {
        "id": "interview.swift.opaque_types.094.f1",
        "parentQuestionId": "interview.swift.opaque_types.094",
        "question": "Can you use `some` in function parameter positions in Swift 5.7+?",
        "modelAnswer": "Yes. In Swift 5.7+, `func render(shape: some Shape)` is shorthand for a generic function `func render<T: Shape>(shape: T)`.",
        "keyPoints": [
          "some in parameters acts as generic constraint shorthand",
          "Equivalent to func foo<T: Protocol>(x: T)"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-opaque-types",
      "swift-protocols",
      "swift-method-dispatch"
    ]
  },
  {
    "id": "interview.swift.opaque_types.095",
    "question": "Explain the internal memory layout and runtime cost of an existential container (`any Protocol`).",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-opaque-types",
    "difficulty": "advanced",
    "type": "conceptual",
    "estimatedMinutes": 5,
    "frequency": "high",
    "tags": [
      "Swift",
      "Existential Container",
      "Memory Layout",
      "PWT",
      "VWT",
      "Performance"
    ],
    "modelAnswer": "An existential container in Swift is a 5-word struct (40 bytes on 64-bit systems) consisting of:\n\n1. Value Buffer (3 words / 24 bytes): Stores value types inline if they fit.\n2. Heap Pointer: If the value exceeds 24 bytes, Swift allocates memory on the heap and stores a pointer in word 0 of the buffer.\n3. Value Witness Table (VWT) pointer (1 word): Manages the value's lifecycle (allocate, copy, destroy, deallocate).\n4. Protocol Witness Table (PWT) pointer(s) (1 word per protocol): Contains function pointers to the concrete type's protocol implementations.\n\nRuntime Costs: Dynamic dispatch through function pointers, indirect heap allocation for large values, and reference counting overhead.",
    "keyPoints": [
      "Existential container layout: 3-word inline buffer + VWT pointer + PWT pointer(s)",
      "Values > 24 bytes spill over to heap allocation",
      "VWT handles memory lifecycle (copying and deallocating)",
      "PWT handles dynamic protocol method dispatch"
    ],
    "commonMistakes": [
      "Assuming structs are always allocated on the stack when wrapped in any Protocol",
      "Ignoring the allocation overhead of existential containers in tight performance loops"
    ],
    "followUps": [
      {
        "id": "interview.swift.opaque_types.095.f1",
        "parentQuestionId": "interview.swift.opaque_types.095",
        "question": "What happens to the existential container layout for protocol composition like any ProtocolA & ProtocolB?",
        "modelAnswer": "The container expands by 1 additional word for every additional protocol witness table pointer (e.g. 3-word buffer + VWT + 2 PWTs = 6 words).",
        "keyPoints": [
          "Each additional protocol adds one PWT pointer word",
          "Increases container size"
        ],
        "difficulty": "expert"
      }
    ],
    "relatedTopics": [
      "swift-opaque-types",
      "swift-method-dispatch"
    ]
  },
  {
    "id": "interview.swift.opaque_types.096",
    "question": "Why does SwiftUI mandate `var body: some View` instead of `any View`?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-opaque-types",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "SwiftUI",
      "some View",
      "Performance",
      "Diffing"
    ],
    "modelAnswer": "SwiftUI uses `var body: some View` for two critical reasons:\n\n1. Performance & Memory: In SwiftUI, view bodies are evaluated constantly during rendering and state updates. If `body` returned `any View`, every evaluation would allocate an existential container (and potentially heap memory) for thousands of view nodes on every frame, devastating scroll performance and battery life.\n2. Diffing & View Tree Reconciliation: The SwiftUI layout engine relies on exact compile-time static type information to diff view hierarchies efficiently. Knowing that `body` produces `VStack<TupleView<(Text, Button)>>` enables SwiftUI to track exactly which subview changed without traversing dynamic type metadata.",
    "keyPoints": [
      "Eliminates existential container and heap allocation on every view evaluation",
      "Preserves the exact concrete view hierarchy type at compile time",
      "Allows SwiftUI's diffing engine to reconcile views with zero runtime reflection",
      "Enables compiler inlining across view modifier chains"
    ],
    "commonMistakes": [
      "Wrapping return views in AnyView to bypass compile errors, destroying diffing performance",
      "Thinking some View means any View can be returned conditionally"
    ],
    "followUps": [
      {
        "id": "interview.swift.opaque_types.096.f1",
        "parentQuestionId": "interview.swift.opaque_types.096",
        "question": "When is using AnyView actually acceptable in SwiftUI?",
        "modelAnswer": "Only at high architectural boundaries where truly heterogeneous views must be stored dynamically (e.g. a dynamic plugin architecture or routing coordinator), never inside micro-components.",
        "keyPoints": [
          "Acceptable only for dynamic plugin or navigation architectures",
          "Avoid inside micro-views and lists"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-opaque-types",
      "swift-type-erasure"
    ]
  },
  {
    "id": "interview.swift.opaque_types.097",
    "question": "When is it impossible to use `some` and mandatory to use `any` in Swift?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-opaque-types",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 3,
    "frequency": "high",
    "tags": [
      "Swift",
      "some vs any",
      "Heterogeneous Collections",
      "Existentials"
    ],
    "modelAnswer": "You cannot use `some` and MUST use `any` whenever dynamic runtime heterogeneity is required:\n\n1. Heterogeneous Collections: Storing different types conforming to the same protocol in an array (e.g. `var listeners: [any EventListener] = [AudioListener(), AnalyticsListener()]`). `[some EventListener]` requires every element to be the exact same concrete type.\n2. Stored Properties with Runtime Reassignment: If a property needs to hold different conforming types over its lifetime (e.g. swapping a `NetworkService` for a `MockService` at runtime).\n3. Dynamic Factory Returns: Returning different concrete types based on runtime values (e.g. `func makeView(for type: Type) -> any View`).",
    "keyPoints": [
      "Heterogeneous collections: [any Protocol] allows mixed concrete types",
      "Mutable stored properties whose concrete type changes over time",
      "Returning different concrete types based on runtime conditions",
      "some requires a single, invariant concrete type resolved at compile time"
    ],
    "commonMistakes": [
      "Declaring `var items: [some MyProtocol]` and expecting it to hold different conforming types",
      "Using `any` for homogenous collections where generics or `some` would be faster"
    ],
    "followUps": [
      {
        "id": "interview.swift.opaque_types.097.f1",
        "parentQuestionId": "interview.swift.opaque_types.097",
        "question": "Can you unbox an existential `any Protocol` into an opaque or generic type?",
        "modelAnswer": "Yes! Swift 5.7 added \"implicitly opened existentials\": when you pass an `any Protocol` into a function expecting a generic `T: Protocol` or `some Protocol`, Swift automatically opens the box and passes the underlying concrete type.",
        "keyPoints": [
          "Implicitly opened existentials in Swift 5.7+",
          "Passing any to some automatically unboxes the value"
        ],
        "difficulty": "advanced"
      }
    ],
    "relatedTopics": [
      "swift-opaque-types",
      "swift-protocols",
      "swift-generics"
    ]
  },
  {
    "id": "interview.swift.opaque_types.098",
    "question": "What are Primary Associated Types in Swift 5.7+ and how do they enhance `some` and `any`?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-opaque-types",
    "difficulty": "advanced",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "Primary Associated Types",
      "Generics",
      "Protocols"
    ],
    "modelAnswer": "Before Swift 5.7, protocols with associated types could not specify their associated types using angle brackets at call sites. You could not write `some Collection<String>`—you had to write complex where clauses like `<C: Collection>(c: C) where C.Element == String`.\n\nPrimary Associated Types allow protocol authors to declare key associated types in angle brackets: `protocol Collection<Element>`. This enables concise generic constraints and existentials:\n- `some Collection<String>`: An opaque collection of Strings.\n- `any Publisher<Data, Error>`: An existential publisher emitting Data and Error.\n\nThis dramatically reduced the need for custom type-erased wrappers like `AnyCollection` and `AnyPublisher`.",
    "keyPoints": [
      "Declared with angle brackets in protocol header: protocol Sequence<Element>",
      "Enables generic-style constraints: some Collection<Int>",
      "Enables constrained existentials: any Publisher<Data, URLError>",
      "Eliminated boilerplate where clauses and redundant type-erasure wrappers"
    ],
    "commonMistakes": [
      "Confusing primary associated types with generic protocols (Swift does not have generic protocols; it has protocols with primary associated types)",
      "Thinking all associated types can be placed in angle brackets (only designated primary ones)"
    ],
    "followUps": [
      {
        "id": "interview.swift.opaque_types.098.f1",
        "parentQuestionId": "interview.swift.opaque_types.098",
        "question": "Can a protocol have multiple primary associated types?",
        "modelAnswer": "Yes. For example, `protocol DictionaryProtocol<Key, Value>` or Combine's `Publisher<Output, Failure>`.",
        "keyPoints": [
          "Supports multiple comma-separated primary associated types"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-opaque-types",
      "swift-type-erasure",
      "swift-protocols"
    ]
  },
  {
    "id": "interview.swift.opaque_types.099",
    "question": "How does the Swift compiler optimize `some Protocol` using monomorphization?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-opaque-types",
    "difficulty": "expert",
    "type": "conceptual",
    "estimatedMinutes": 5,
    "frequency": "medium",
    "tags": [
      "Swift",
      "Monomorphization",
      "Compiler Optimization",
      "Opaque Types",
      "Inlining"
    ],
    "modelAnswer": "Monomorphization is the compiler optimization where generic or opaque code is specialized into concrete, type-specific code for each type it is used with.\n\nBecause `some Protocol` guarantees a single concrete type at compile time, the compiler:\n1. Replaces protocol abstractions with direct calls to the concrete type's methods.\n2. Inlines method bodies directly into callers, eliminating call frame setup entirely.\n3. Allocates exact stack space for the concrete type without heap indirection.\n\nIn contrast, `any Protocol` cannot be monomorphized because its underlying type can change dynamically at runtime, forcing the compiler to emit indirect witness table lookups.",
    "keyPoints": [
      "Monomorphization duplicates and specializes generic code for concrete types",
      "Transforms indirect protocol calls into direct static calls",
      "Enables full cross-function inlining and dead-code elimination",
      "any Protocol prevents monomorphization due to runtime polymorphism"
    ],
    "commonMistakes": [
      "Assuming protocol abstractions always carry runtime performance penalties in Swift (monomorphization makes opaque types zero-cost)"
    ],
    "followUps": [
      {
        "id": "interview.swift.opaque_types.099.f1",
        "parentQuestionId": "interview.swift.opaque_types.099",
        "question": "What is code bloat in the context of monomorphization?",
        "modelAnswer": "Because monomorphization emits specialized machine code for each concrete type used with a generic or opaque function, using many distinct types can increase the compiled binary size.",
        "keyPoints": [
          "Specialized code generated per type",
          "Tradeoff between runtime speed and binary size"
        ],
        "difficulty": "advanced"
      }
    ],
    "relatedTopics": [
      "swift-opaque-types",
      "swift-method-dispatch"
    ]
  },
  {
    "id": "interview.swift.opaque_types.100",
    "question": "Why does returning different concrete types from an `if/else` inside a `some Protocol` function fail to compile, and how do you resolve it?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-opaque-types",
    "difficulty": "intermediate",
    "type": "debugging",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "some",
      "Compilation Error",
      "Control Flow",
      "Debugging"
    ],
    "modelAnswer": "A function returning `some Protocol` promises that it returns ONE specific underlying concrete type. If the `if` branch returns `Circle` and the `else` branch returns `Rectangle`, the compiler fails with: *\"Function declares an opaque return type 'some Shape', but the return statements in its body do not have matching underlying types\"*\n\nSolutions:\n1. Use `@ViewBuilder` (in SwiftUI) or custom result builders: Transforms the branches into a single concrete `_ConditionalContent<Circle, Rectangle>` type.\n2. Return an existential `any Shape`: If runtime heterogeneity is truly acceptable.\n3. Return a custom enum: `enum AnyShape { case circle(Circle), rectangle(Rectangle) }` conforming to `Shape`.",
    "keyPoints": [
      "some requires every return statement to return the exact same concrete type",
      "Cannot return different concrete types across if/else or switch branches",
      "Fix via result builders (@ViewBuilder), enum wrapping, or existential any"
    ],
    "commonMistakes": [
      "Expecting the compiler to automatically erase differing return types to an existential",
      "Overusing AnyView instead of letting @ViewBuilder build _ConditionalContent"
    ],
    "followUps": [
      {
        "id": "interview.swift.opaque_types.100.f1",
        "parentQuestionId": "interview.swift.opaque_types.100",
        "question": "Does the same restriction apply to functions returning an existential any Protocol?",
        "modelAnswer": "No. A function returning `any Protocol` can freely return Circle() from one branch and Rectangle() from another, because any Protocol wraps them in existential containers at runtime.",
        "keyPoints": [
          "any Protocol accommodates differing return types at runtime"
        ],
        "difficulty": "foundational"
      }
    ],
    "relatedTopics": [
      "swift-opaque-types",
      "swift-result-builders"
    ]
  },
  {
    "id": "interview.swift.type_erasure.101",
    "question": "What is Type Erasure in Swift, and what fundamental limitation did it originally solve?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-type-erasure",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "Type Erasure",
      "Protocols",
      "associatedtype",
      "Generics"
    ],
    "modelAnswer": "Type Erasure is a design pattern that hides a concrete type behind a generic wrapper type conforming to the same protocol. In early Swift versions (prior to Swift 5.7), protocols containing `associatedtype` or `Self` requirements could only be used as generic constraints (e.g. `<T: Sequence>`), not as standalone types (`let x: Sequence` was illegal: *\"Protocol can only be used as a generic constraint because it has Self or associated type requirements\"*).\n\nType erasure solved this by wrapping the concrete instance inside a concrete struct (like `AnySequence<T>` or `AnyPublisher<Output, Failure>`), capturing protocol method invocations via closures or abstract box classes and forwarding calls.",
    "keyPoints": [
      "Hides concrete types while exposing protocol capabilities through a wrapper",
      "Solved the pre-Swift 5.7 limitation preventing protocols with associated types from being types",
      "Captures methods in closures or abstract box classes and forwards calls",
      "Standard library examples include AnySequence, AnyIterator, AnyHashable"
    ],
    "commonMistakes": [
      "Confusing type erasure with type casting (Any or AnyObject)",
      "Building manual type erasers in modern Swift when primary associated types (any Protocol<T>) suffice"
    ],
    "followUps": [
      {
        "id": "interview.swift.type_erasure.101.f1",
        "parentQuestionId": "interview.swift.type_erasure.101",
        "question": "What is the standard naming convention for type-erased wrappers in the Swift standard library?",
        "modelAnswer": "They are prefixed with `Any`, such as `AnySequence`, `AnyCollection`, `AnyHashable`, `AnyCancellable`, and SwiftUI's `AnyView`.",
        "keyPoints": [
          "Any prefix convention (AnySequence, AnyPublisher, AnyView)"
        ],
        "difficulty": "foundational"
      }
    ],
    "relatedTopics": [
      "swift-type-erasure",
      "swift-opaque-types",
      "swift-protocols"
    ]
  },
  {
    "id": "interview.swift.type_erasure.102",
    "question": "How do you build a custom type-erased wrapper struct using closure-based forwarding?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-type-erasure",
    "difficulty": "advanced",
    "type": "code-analysis",
    "estimatedMinutes": 5,
    "frequency": "high",
    "tags": [
      "Swift",
      "Type Erasure",
      "Closures",
      "Implementation",
      "Architecture"
    ],
    "modelAnswer": "A closure-based type eraser captures protocol requirements in stored closures during initialization:\n\n```swift\nprotocol Speaker {\n    associatedtype Message\n    func speak() -> Message\n}\n\nstruct AnySpeaker<Message>: Speaker {\n    private let _speak: () -> Message\n    \n    init<T: Speaker>(_ speaker: T) where T.Message == Message {\n        self._speak = speaker.speak\n    }\n    \n    func speak() -> Message {\n        return _speak()\n    }\n}\n```\n\nThe generic initializer `<T: Speaker>` accepts any concrete speaker with matching `Message`, captures its method into `_speak`, and discards the concrete type `T`.",
    "keyPoints": [
      "Wrapper struct is generic over the associated types only: AnySpeaker<Message>",
      "Initializer takes a generic conforming type: init<T: Speaker>(_ speaker: T)",
      "Stores protocol methods as closures: private let _speak: () -> Message",
      "Forwards protocol requirement calls directly to stored closures"
    ],
    "commonMistakes": [
      "Making the wrapper struct generic over the concrete type T (defeats the purpose of type erasure)",
      "Forgetting where clause constraints aligning associated types"
    ],
    "followUps": [
      {
        "id": "interview.swift.type_erasure.102.f1",
        "parentQuestionId": "interview.swift.type_erasure.102",
        "question": "What is the alternative to closures for type erasure (the Box pattern)?",
        "modelAnswer": "The Box pattern uses a private abstract class (_AnySpeakerBoxBase) and a generic subclass (_AnySpeakerBox<T>) that holds the concrete instance and overrides virtual methods. It avoids closure allocation per method.",
        "keyPoints": [
          "Abstract base class + generic subclass box",
          "Uses virtual dispatch instead of closures"
        ],
        "difficulty": "advanced"
      }
    ],
    "relatedTopics": [
      "swift-type-erasure",
      "swift-protocols"
    ]
  },
  {
    "id": "interview.swift.type_erasure.103",
    "question": "How does `AnyHashable` work in Swift, and why is it essential for heterogeneous dictionaries?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-type-erasure",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "AnyHashable",
      "Hashable",
      "Type Erasure",
      "Collections"
    ],
    "modelAnswer": "`AnyHashable` is a type-erased wrapper for any type conforming to `Hashable`. Unlike most custom type erasers that only forward method calls, `AnyHashable` provides special runtime equality bridging:\n\n1. It stores the underlying hashable value and delegates `hash(into:)` and `==` to it.\n2. Dynamic Unwrapping: You can extract the concrete value using `as?` (e.g. `anyHashable as? String`).\n3. Cross-Type Equivalence: It handles Objective-C numeric bridging (e.g. `AnyHashable(1 as Int) == AnyHashable(1 as Double)` evaluates to `true`).\n\nIt is essential for heterogeneous dictionaries (`[AnyHashable: Any]`), routing tables, and dependency injection keys.",
    "keyPoints": [
      "Type-erased container for any Hashable type",
      "Allows mixing different key types in dictionaries: [AnyHashable: Any]",
      "Supports safe runtime downcasting via as? TargetType",
      "Includes special numeric equality bridging"
    ],
    "commonMistakes": [
      "Using `[Any: Any]` for dictionaries (Any does not conform to Hashable; keys must be AnyHashable)",
      "Forgetting that AnyHashable unboxes cleanly with `as?`"
    ],
    "followUps": [
      {
        "id": "interview.swift.type_erasure.103.f1",
        "parentQuestionId": "interview.swift.type_erasure.103",
        "question": "Can you compare two AnyHashable instances wrapping different types for equality?",
        "modelAnswer": "Yes. If the types do not bridge (e.g. String vs Int), == evaluates to false without crashing. If they bridge numerics (Int vs Double with equal value), it evaluates to true.",
        "keyPoints": [
          "Safe cross-type equality returns false without crash",
          "Numeric values bridge appropriately"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-type-erasure",
      "swift-collections"
    ]
  },
  {
    "id": "interview.swift.type_erasure.104",
    "question": "Why is manual type erasure needed much less often in modern Swift (Swift 5.7+ / Swift 6)?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-type-erasure",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "Swift 5.7",
      "Type Erasure",
      "any Protocol",
      "Primary Associated Types"
    ],
    "modelAnswer": "Manual type erasure is largely superseded by two Swift 5.7 language features:\n\n1. Existentials for Protocols with Associated Types: Swift 5.7 lifted the restriction on protocols with `associatedtype`. You can now use `any MyProtocol` directly without compiler errors.\n2. Primary Associated Types: Protocols declare primary associated types in angle brackets (e.g. `protocol Sequence<Element>`), allowing developers to write constrained existentials directly: `let items: any Sequence<String> = [\"a\", \"b\"]`.\n\nBefore Swift 5.7, achieving `any Sequence<String>` required writing a 50-line `AnySequence` wrapper. Today, the compiler creates existential containers with primary associated types automatically.",
    "keyPoints": [
      "Swift 5.7 unlocked any Protocol for all protocols with associated types",
      "Primary Associated Types enable any Protocol<AssociatedType> syntax directly",
      "Eliminated the need to write and maintain custom Any* boilerplate wrappers",
      "Manual wrappers are now only needed for backward compatibility or special boxing logic"
    ],
    "commonMistakes": [
      "Writing manual Any wrappers in modern codebases out of habit",
      "Not upgrading legacy Combine AnyPublisher pipelines where any Publisher suffices"
    ],
    "followUps": [
      {
        "id": "interview.swift.type_erasure.104.f1",
        "parentQuestionId": "interview.swift.type_erasure.104",
        "question": "Is there any performance difference between AnyPublisher and any Publisher<Output, Failure>?",
        "modelAnswer": "Both go through dynamic witness table dispatch and heap indirection. However, any Publisher uses compiler-generated existential containers rather than manual class/closure allocations, often resulting in cleaner code and comparable or better performance.",
        "keyPoints": [
          "Both use dynamic dispatch",
          "any Publisher avoids manual wrapper boilerplate"
        ],
        "difficulty": "advanced"
      }
    ],
    "relatedTopics": [
      "swift-type-erasure",
      "swift-opaque-types"
    ]
  },
  {
    "id": "interview.swift.type_erasure.105",
    "question": "What are the memory and performance tradeoffs of custom Type Erasure wrappers vs Generics?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-type-erasure",
    "difficulty": "advanced",
    "type": "comparison",
    "estimatedMinutes": 4,
    "frequency": "medium",
    "tags": [
      "Swift",
      "Type Erasure",
      "Generics",
      "Performance",
      "Memory"
    ],
    "modelAnswer": "Tradeoffs between Type Erasure and Generics:\n\n1. Generics:\n- Compile-time: Monomorphized, specialized, and inlined.\n- Performance: Direct dispatch, stack allocation, zero runtime overhead.\n- Limitation: Rigid type signatures; cannot store different types in a collection.\n\n2. Type Erasure:\n- Runtime: Stores function pointers (closures) or virtual box pointers.\n- Performance: Dynamic indirect dispatch, heap allocation for closure contexts or box instances, ARC retain/release overhead.\n- Benefit: Maximum flexibility; allows storing heterogeneous instances and clean public API surfaces.",
    "keyPoints": [
      "Generics = static dispatch, zero heap allocation, monomorphized speed",
      "Type Erasure = dynamic dispatch, heap allocations for boxes/closures, ARC overhead",
      "Use Generics when performance is critical and types are uniform",
      "Use Type Erasure at architectural boundaries where heterogeneity or abstraction is needed"
    ],
    "commonMistakes": [
      "Overusing type erasure inside high-frequency computational loops",
      "Ignoring heap allocations incurred by closure-based type erasers"
    ],
    "followUps": [
      {
        "id": "interview.swift.type_erasure.105.f1",
        "parentQuestionId": "interview.swift.type_erasure.105",
        "question": "How does the class-box pattern for type erasure compare to the closure-based pattern in terms of allocations?",
        "modelAnswer": "The class-box pattern performs a single heap allocation for the box object, whereas the closure pattern may allocate multiple closure context blocks (one per stored method requirement).",
        "keyPoints": [
          "Class box = single object allocation with vtable",
          "Closure pattern = potential allocation per closure"
        ],
        "difficulty": "expert"
      }
    ],
    "relatedTopics": [
      "swift-type-erasure",
      "swift-generics",
      "swift-method-dispatch"
    ]
  },
  {
    "id": "interview.swift.type_erasure.106",
    "question": "Why does SwiftUI provide `AnyView`, and why does Apple advise against its frequent use?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-type-erasure",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "SwiftUI",
      "AnyView",
      "Type Erasure",
      "Performance"
    ],
    "modelAnswer": "`AnyView` is SwiftUI's built-in type-erased wrapper for views. It allows returning different view types from computed properties or functions without generic constraints.\n\nWhy Apple advises against it:\n1. Destroys Diffing Performance: SwiftUI's diffing engine relies on static type hierarchies to compute minimal UI updates. Wrapping a view in `AnyView` erases its concrete type identity. SwiftUI cannot distinguish whether the view changed state or was replaced entirely, frequently forcing it to tear down and recreate the entire render tree.\n2. Heap Allocation: `AnyView` allocates its wrapped view on the heap.\n3. Better Alternatives: Use `@ViewBuilder`, `Group`, or `@ViewBuilder func` to return conditional views with static type information.",
    "keyPoints": [
      "AnyView erases concrete view type information at runtime",
      "Forces SwiftUI to tear down and recreate view subtrees instead of diffing",
      "Incurs heap allocation and ARC overhead",
      "Use @ViewBuilder, Group, or custom container views instead"
    ],
    "commonMistakes": [
      "Using AnyView in every if/else branch inside body",
      "Wrapping list rows in AnyView, causing severe scrolling stutters"
    ],
    "followUps": [
      {
        "id": "interview.swift.type_erasure.106.f1",
        "parentQuestionId": "interview.swift.type_erasure.106",
        "question": "What does @ViewBuilder generate instead of AnyView for an if/else branch?",
        "modelAnswer": "@ViewBuilder generates an instance of `_ConditionalContent<TrueView, FalseView>`, preserving both concrete types in a single static enum-like structure.",
        "keyPoints": [
          "_ConditionalContent preserves static type information",
          "Enables precise diffing between branches"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-type-erasure",
      "swift-result-builders",
      "swift-opaque-types"
    ]
  },
  {
    "id": "interview.swift.type_erasure.107",
    "question": "Explain how `AnyCancellable` in Combine uses type erasure to manage subscription lifecycles.",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-type-erasure",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 3,
    "frequency": "high",
    "tags": [
      "Swift",
      "Combine",
      "AnyCancellable",
      "Type Erasure",
      "Memory"
    ],
    "modelAnswer": "In Combine, subscribers return concrete subscription objects implementing `Cancellable` (e.g. `Subscribers.Sink<Upstream>`). If you had to store each subscription directly, your view model would need explicit properties for every concrete publisher-subscriber combination.\n\n`AnyCancellable` is a type-erased class conforming to `Cancellable`. It wraps any cancellable token or closure. When stored in a `Set<AnyCancellable>`, it allows storing heterogeneous subscriptions in a single set. When the `AnyCancellable` is deallocated (or when `cancel()` is called), it automatically cancels the underlying subscription, preventing memory leaks.",
    "keyPoints": [
      "Type-erased wrapper for any Cancellable subscription token",
      "Allows storing heterogeneous subscriptions in a single Set<AnyCancellable>",
      "Automatically cancels the subscription on deinit",
      "Decouples callers from complex publisher pipeline types"
    ],
    "commonMistakes": [
      "Forgetting to store the AnyCancellable return value with .store(in: &cancellables), causing immediate subscription cancellation"
    ],
    "followUps": [
      {
        "id": "interview.swift.type_erasure.107.f1",
        "parentQuestionId": "interview.swift.type_erasure.107",
        "question": "Can you initialize an AnyCancellable directly with a custom closure?",
        "modelAnswer": "Yes: `AnyCancellable { cleanUp() }`. It executes the closure when cancelled or deallocated.",
        "keyPoints": [
          "Supports custom closure-based cleanup tokens"
        ],
        "difficulty": "foundational"
      }
    ],
    "relatedTopics": [
      "swift-type-erasure",
      "swift-initialization-deinitialization"
    ]
  },
  {
    "id": "interview.swift.type_erasure.108",
    "question": "How can you type-erase a closure or callback into a concrete struct for delegate replacement?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-type-erasure",
    "difficulty": "intermediate",
    "type": "architecture",
    "estimatedMinutes": 4,
    "frequency": "medium",
    "tags": [
      "Swift",
      "Type Erasure",
      "Closures",
      "Callbacks",
      "Design Patterns"
    ],
    "modelAnswer": "Instead of traditional Objective-C style delegate protocols (`protocol NetworkDelegate: AnyObject`), modern Swift architectures often use type-erased callback structs (the \"Command\" or \"Action\" pattern):\n\n```swift\nstruct Action<Input> {\n    private let _execute: (Input) -> Void\n    \n    init(_ execute: @escaping (Input) -> Void) {\n        self._execute = execute\n    }\n    \n    func callAsFunction(_ input: Input) {\n        _execute(input)\n    }\n}\n```\n\nBy leveraging `callAsFunction`, the struct can be invoked like a function (`action(data)`), while allowing dependency injection, testing mocks, and type erasure of internal handling logic.",
    "keyPoints": [
      "Wraps closures inside a struct to provide value semantics and encapsulation",
      "Supports callAsFunction for intuitive function call syntax: action(data)",
      "Simplifies testing by substituting mock action closures without delegate boilerplate",
      "Decouples components from specific target-action implementations"
    ],
    "commonMistakes": [
      "Creating retain cycles by capturing strong self inside the action closure without [weak self]"
    ],
    "followUps": [
      {
        "id": "interview.swift.type_erasure.108.f1",
        "parentQuestionId": "interview.swift.type_erasure.108",
        "question": "What is callAsFunction in Swift and when was it added?",
        "modelAnswer": "Added in Swift 5.2, callAsFunction allows instances of Swift types (structs, classes) to be called directly as functions using parentheses syntax.",
        "keyPoints": [
          "Swift 5.2 feature enabling callable types"
        ],
        "difficulty": "foundational"
      }
    ],
    "relatedTopics": [
      "swift-type-erasure",
      "swift-closures"
    ]
  },
  {
    "id": "interview.swift.result_builders.109",
    "question": "What is `@resultBuilder` in Swift, and how does the compiler transform declarative closures?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-result-builders",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "@resultBuilder",
      "DSL",
      "Compiler Transformations",
      "Declarative"
    ],
    "modelAnswer": "`@resultBuilder` is a compiler feature (introduced as function builders in Swift 5.1 and formalized in Swift 5.4) that allows authors to define custom Domain-Specific Languages (DSLs) for assembling nested data structures declaratively.\n\nWhen a closure is marked with a result builder attribute (like `@ViewBuilder`), the compiler rewrites each discrete statement inside the closure into calls to static methods on the builder type:\n- Multiple consecutive statements are rewritten into `Builder.buildBlock(e0, e1, ...)`.\n- If statements are rewritten into `Builder.buildOptional` or `Builder.buildEither(first:/second:)`.\n- Loops are rewritten into `Builder.buildArray`.\n\nThis transforms comma-less, declarative-looking statement lists into a single consolidated return value at compile time.",
    "keyPoints": [
      "Transforms closure statements into nested calls to static builder methods",
      "Powers declarative DSLs like SwiftUI (@ViewBuilder) and RegexBuilder",
      "Transforms statements at compile time with zero runtime parsing overhead",
      "Supports conditionals, loops, and expression preprocessing"
    ],
    "commonMistakes": [
      "Assuming result builders perform runtime parsing (they are pure compile-time AST rewrites)",
      "Trying to use statements not supported by the builder (like while loops if buildArray is missing)"
    ],
    "followUps": [
      {
        "id": "interview.swift.result_builders.109.f1",
        "parentQuestionId": "interview.swift.result_builders.109",
        "question": "What was the original attribute name for @resultBuilder in Swift 5.1?",
        "modelAnswer": "It was originally introduced as `@_functionBuilder` before being standardized as `@resultBuilder` in SE-0289.",
        "keyPoints": [
          "Originally @_functionBuilder in Swift 5.1",
          "Standardized as @resultBuilder in SE-0289"
        ],
        "difficulty": "foundational"
      }
    ],
    "relatedTopics": [
      "swift-result-builders",
      "swift-closures"
    ]
  },
  {
    "id": "interview.swift.result_builders.110",
    "question": "What are the core static methods that a `@resultBuilder` type must or can implement?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-result-builders",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 5,
    "frequency": "high",
    "tags": [
      "Swift",
      "@resultBuilder",
      "buildBlock",
      "buildEither",
      "buildArray",
      "API Design"
    ],
    "modelAnswer": "A `@resultBuilder` struct defines static methods that dictate what syntax is allowed:\n\n1. `buildBlock(_ components: Component...) -> Component` [MANDATORY]: Combines statements into a single component.\n2. `buildOptional(_ component: Component?) -> Component`: Enables single `if` statements without `else`.\n3. `buildEither(first: Component) -> Component` and `buildEither(second: Component) -> Component`: Enables `if-else` and `switch` statements.\n4. `buildArray(_ components: [Component]) -> Component`: Enables `for-in` loops.\n5. `buildExpression(_ expression: Expression) -> Component`: Preprocesses raw expressions before passing to buildBlock.\n6. `buildFinalResult(_ component: Component) -> FinalResult`: Transforms the assembled components into a distinct final return type.",
    "keyPoints": [
      "buildBlock is the primary required method combining statements",
      "buildOptional supports single if statements",
      "buildEither(first:/second:) supports if/else and switch branches",
      "buildArray supports for-in loops",
      "buildExpression converts raw input types into builder components",
      "buildFinalResult converts intermediate components into the final output"
    ],
    "commonMistakes": [
      "Forgetting buildOptional and wondering why simple `if condition { ... }` throws a compile error",
      "Assuming all methods are mandatory (only buildBlock is strictly required)"
    ],
    "followUps": [
      {
        "id": "interview.swift.result_builders.110.f1",
        "parentQuestionId": "interview.swift.result_builders.110",
        "question": "How does buildFinalResult enable internal builder representations to differ from caller returns?",
        "modelAnswer": "buildFinalResult allows intermediate operations to use an internal accumulator struct (e.g. an array of AST nodes) while presenting callers with a clean final product (e.g. a rendered HTML string or NSAttributedString).",
        "keyPoints": [
          "Translates internal AST accumulator to final public type"
        ],
        "difficulty": "advanced"
      }
    ],
    "relatedTopics": [
      "swift-result-builders",
      "swift-opaque-types"
    ]
  },
  {
    "id": "interview.swift.result_builders.111",
    "question": "How do `buildEither(first:)` and `buildEither(second:)` translate `if/else` and `switch` statements?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-result-builders",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "medium",
    "tags": [
      "Swift",
      "buildEither",
      "Conditionals",
      "Result Builders",
      "Control Flow"
    ],
    "modelAnswer": "When a result builder encounters an `if/else` construct:\n```swift\nif condition {\n    componentA\n} else {\n    componentB\n}\n```\nThe compiler rewrites this into:\n```swift\nlet result:\nif condition {\n    result = Builder.buildEither(first: componentA)\n} else {\n    result = Builder.buildEither(second: componentB)\n}\n```\n\nFor `switch` statements with multiple cases, the compiler nests `buildEither` calls hierarchically (e.g. `buildEither(first: buildEither(second: ...))`), creating a binary tree of either-types that uniquely preserves type identity across all branches.",
    "keyPoints": [
      "if branch wraps result in buildEither(first:)",
      "else branch wraps result in buildEither(second:)",
      "Multiple switch cases are resolved via nested binary buildEither calls",
      "Preserves complete static type safety across divergent branches"
    ],
    "commonMistakes": [
      "Implementing only buildEither(first:) and omitting buildEither(second:)",
      "Not realizing that SwiftUI's _ConditionalContent is the concrete return of buildEither"
    ],
    "followUps": [
      {
        "id": "interview.swift.result_builders.111.f1",
        "parentQuestionId": "interview.swift.result_builders.111",
        "question": "What is the return type of a SwiftUI @ViewBuilder with an if/else condition?",
        "modelAnswer": "It returns `_ConditionalContent<TrueView, FalseView>`, which is an enum storing either the true or false view branch.",
        "keyPoints": [
          "_ConditionalContent<A, B> represents SwiftUI buildEither output"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-result-builders",
      "swift-opaque-types"
    ]
  },
  {
    "id": "interview.swift.result_builders.112",
    "question": "How does `buildArray` enable `for-in` loops in result builders, and what are its performance considerations?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-result-builders",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 3,
    "frequency": "medium",
    "tags": [
      "Swift",
      "buildArray",
      "Loops",
      "Result Builders",
      "Performance"
    ],
    "modelAnswer": "When a result builder implements `static func buildArray(_ components: [Component]) -> Component`, the compiler permits `for-in` loops inside the builder closure:\n```swift\nfor item in items {\n    ItemView(item)\n}\n```\nThe compiler compiles this by evaluating each iteration, collecting the components into a temporary array `[Component]`, and passing that array to `Builder.buildArray(array)`.\n\nPerformance Consideration: Evaluating a loop allocates a temporary array on the heap. In UI frameworks like SwiftUI, `ForEach` is preferred over `for-in` loops because `ForEach` creates a lightweight view structure rather than pre-allocating an array of view components.",
    "keyPoints": [
      "buildArray takes [Component] and returns Component",
      "Enables for-in syntax inside builder closures",
      "Allocates an intermediate array on the heap during execution",
      "SwiftUI prefers ForEach view structs over raw for-in loops for lazy evaluation"
    ],
    "commonMistakes": [
      "Using for-in inside SwiftUI body instead of ForEach (leads to eager evaluation and lack of identity tracking)",
      "Forgetting that buildArray is required to allow for loops"
    ],
    "followUps": [
      {
        "id": "interview.swift.result_builders.112.f1",
        "parentQuestionId": "interview.swift.result_builders.112",
        "question": "Does SwiftUI @ViewBuilder support buildArray?",
        "modelAnswer": "No! Apple deliberately omitted buildArray from @ViewBuilder to prevent developers from using eager for-in loops instead of identity-tracked ForEach views.",
        "keyPoints": [
          "@ViewBuilder intentionally omits buildArray to force ForEach usage"
        ],
        "difficulty": "advanced"
      }
    ],
    "relatedTopics": [
      "swift-result-builders",
      "swift-opaque-types"
    ]
  },
  {
    "id": "interview.swift.result_builders.113",
    "question": "Write and explain a simple custom Result Builder for creating HTML DOM structures.",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-result-builders",
    "difficulty": "intermediate",
    "type": "code-analysis",
    "estimatedMinutes": 5,
    "frequency": "high",
    "tags": [
      "Swift",
      "@resultBuilder",
      "Custom DSL",
      "HTMLBuilder",
      "Implementation"
    ],
    "modelAnswer": "Here is a custom HTML builder DSL:\n\n```swift\n@resultBuilder\nstruct HTMLBuilder {\n    static func buildBlock(_ components: String...) -> String {\n        components.joined(separator: \"\\n\")\n    }\n    \n    static func buildOptional(_ component: String?) -> String {\n        component ?? \"\"\n    }\n    \n    static func buildEither(first component: String) -> String {\n        component\n    }\n    \n    static func buildEither(second component: String) -> String {\n        component\n    }\n}\n\nfunc div(@HTMLBuilder content: () -> String) -> String {\n    \"<div>\\n\" + content() + \"\\n</div>\"\n}\n\nlet html = div {\n    \"<h1>Title</h1>\"\n    \"<p>Paragraph</p>\"\n}\n```",
    "keyPoints": [
      "Annotate struct with @resultBuilder",
      "Implement static buildBlock combining Strings",
      "Annotate closure parameter in caller function with @HTMLBuilder",
      "Caller writes clean, declarative, comma-less lines of code"
    ],
    "commonMistakes": [
      "Forgetting the @resultBuilder attribute on the builder struct",
      "Omitting @HTMLBuilder on the function closure parameter"
    ],
    "followUps": [
      {
        "id": "interview.swift.result_builders.113.f1",
        "parentQuestionId": "interview.swift.result_builders.113",
        "question": "How do you apply a result builder to an entire function or computed property?",
        "modelAnswer": "You annotate the function or property directly: `@HTMLBuilder func renderPage() -> String { ... }`. The compiler treats the entire function body as a builder block.",
        "keyPoints": [
          "Annotating function or property body directly treats whole scope as a builder"
        ],
        "difficulty": "foundational"
      }
    ],
    "relatedTopics": [
      "swift-result-builders",
      "swift-closures"
    ]
  },
  {
    "id": "interview.swift.result_builders.114",
    "question": "What is the role of `buildExpression` in a result builder, and how does it allow type overloading?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-result-builders",
    "difficulty": "advanced",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "medium",
    "tags": [
      "Swift",
      "buildExpression",
      "Type Overloading",
      "Result Builders",
      "DSL"
    ],
    "modelAnswer": "`buildExpression` is the earliest hook in the result builder transformation pipeline. It converts raw individual expressions written inside the closure into the builder's intermediate `Component` type.\n\nKey capabilities:\n1. Type Conversion: In an HTML builder that operates on `HTMLNode`, `buildExpression(_ string: String) -> HTMLNode` allows raw string literals (`\"Hello\"`) to automatically become text nodes.\n2. Overloading: You can provide multiple overloads for `buildExpression` (e.g. accepting `String`, `Int`, or `CustomModel`), standardizing disparate input types before they reach `buildBlock`.\n3. Validation: It can enforce compile-time type constraints on individual lines.",
    "keyPoints": [
      "Intercepts raw expressions before they reach buildBlock",
      "Converts raw literals into internal component types",
      "Supports overloading to accept multiple distinct expression types",
      "Enables clean DSLs that accept diverse input types naturally"
    ],
    "commonMistakes": [
      "Trying to do conversion in buildBlock instead of buildExpression (buildBlock should only combine pre-converted components)"
    ],
    "followUps": [
      {
        "id": "interview.swift.result_builders.114.f1",
        "parentQuestionId": "interview.swift.result_builders.114",
        "question": "What happens if a result builder does not implement buildExpression?",
        "modelAnswer": "Expressions inside the builder must directly match the Component type expected by buildBlock.",
        "keyPoints": [
          "Omission requires expressions to match Component type directly"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-result-builders",
      "swift-generics"
    ]
  },
  {
    "id": "interview.swift.result_builders.115",
    "question": "Why can deeply nested result builders (like large SwiftUI view bodies) cause slow compile times, and how do you fix it?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-result-builders",
    "difficulty": "intermediate",
    "type": "debugging",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "SwiftUI",
      "Type Checking",
      "Compile Time",
      "Optimization"
    ],
    "modelAnswer": "Deeply nested result builders can trigger the infamous compile error: *\"The compiler is unable to type-check this expression in reasonable time\"*. Reason:\n\nThe Swift compiler type-checks result builders by constructing a massive multi-statement type equation. Because `buildBlock` is overloaded (accepting 1, 2, ... up to 10 components) and subviews have chained generic modifiers, the type checker evaluates an exponential number of possible type combinations across nested closures.\n\nSolutions:\n1. Break large views into smaller child subviews (`struct ChildView: View`).\n2. Extract sub-expressions into computed properties with explicit return types (`var header: some View { ... }`).\n3. Explicitly type variable declarations rather than relying on deep inference.",
    "keyPoints": [
      "Type checker solves combinatorial generic equations across nested buildBlock calls",
      "Deep nesting causes exponential complexity in the type-checking solver",
      "Fix by extracting subviews into dedicated structs or computed properties with explicit types",
      "Avoid 100+ line single body view declarations"
    ],
    "commonMistakes": [
      "Keeping hundreds of lines of UI in a single monolithic body property",
      "Using AnyView as a workaround instead of extracting modular child view structs"
    ],
    "followUps": [
      {
        "id": "interview.swift.result_builders.115.f1",
        "parentQuestionId": "interview.swift.result_builders.115",
        "question": "Why was buildBlock historically limited to 10 parameters in SwiftUI?",
        "modelAnswer": "Before Swift supported variadic generics, Apple had to manually overload buildBlock with 1, 2, ... up to 10 generic arguments: buildBlock<c0, c1, ... c9>. Exceeding 10 required wrapping views in a Group.",
        "keyPoints": [
          "Pre-variadic generics required manual overloads up to 10 parameters",
          "Group bypassed the 10-view limit"
        ],
        "difficulty": "foundational"
      }
    ],
    "relatedTopics": [
      "swift-result-builders",
      "swift-opaque-types"
    ]
  },
  {
    "id": "interview.swift.result_builders.116",
    "question": "How do Parameter Packs and Variadic Generics in Swift 5.9 improve Result Builders?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-result-builders",
    "difficulty": "advanced",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "medium",
    "tags": [
      "Swift",
      "Parameter Packs",
      "Variadic Generics",
      "Swift 5.9",
      "Result Builders"
    ],
    "modelAnswer": "Prior to Swift 5.9, result builders that returned tuple-based types (like SwiftUI's `TupleView`) had to manually define 10 overloads of `buildBlock` (for 1 argument, 2 arguments, up to 10 arguments: `buildBlock<C0, C1, ... C9>`). This was why views with 11 children threw compiler errors unless wrapped in a `Group`.\n\nIn Swift 5.9, Parameter Packs (Variadic Generics) allow writing a single generic `buildBlock` that accepts an arbitrary number of parameters:\n```swift\nstatic func buildBlock<each Component>(_ components: repeat each Component) -> Tuple<repeat each Component>\n```\nThis eliminates artificial 10-item limits and drastically reduces compiler header overhead.",
    "keyPoints": [
      "Parameter packs eliminate artificial limits on number of statements (the old 10-view limit)",
      "Replaces dozens of manual overloads with a single repeat each Component method",
      "Reduces standard library interface bloat and improves compile-time type resolution",
      "Standardized in Swift 5.9 (SE-0393 / SE-0398)"
    ],
    "commonMistakes": [
      "Confusing parameter packs (repeat each T) with standard variadic parameters (T...)",
      "Thinking parameter packs require all elements to be the same concrete type (each element can be distinct)"
    ],
    "followUps": [
      {
        "id": "interview.swift.result_builders.116.f1",
        "parentQuestionId": "interview.swift.result_builders.116",
        "question": "What is the syntax difference between T... and repeat each T?",
        "modelAnswer": "T... requires all elements to be the identical concrete type T (e.g. String...). repeat each T allows every argument to be a completely different concrete type.",
        "keyPoints": [
          "T... is homogenous; repeat each T allows heterogeneous concrete types"
        ],
        "difficulty": "advanced"
      }
    ],
    "relatedTopics": [
      "swift-result-builders",
      "swift-generics"
    ]
  },
  {
    "id": "interview.swift.macros.117",
    "question": "What are Swift Macros (Swift 5.9+), and how do they differ fundamentally from C/C++ preprocessor macros?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-macros",
    "difficulty": "intermediate",
    "type": "comparison",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "Macros",
      "Metaprogramming",
      "SwiftSyntax",
      "Compiler"
    ],
    "modelAnswer": "Swift Macros (introduced in Swift 5.9) are compile-time code generation plugins that operate on the Swift Abstract Syntax Tree (AST) using SwiftSyntax.\n\nFundamental differences from C/C++ preprocessor macros:\n1. AST vs Text Replacement: C macros perform raw textual substitution before compilation without understanding syntax or types. Swift macros parse and manipulate typed syntax nodes.\n2. Type-Safe: Macro inputs and expanded code are fully type-checked by the Swift compiler. If expanded code contains an error, the compiler flags it with line-precise diagnostics.\n3. Sandboxed: Swift macros run in isolated out-of-process sandboxes with no network or filesystem access, ensuring deterministic and secure builds.\n4. Transparent: Expansions can be inspected inline in Xcode via \"Expand Macro\" and debugged with breakpoints.",
    "keyPoints": [
      "Swift macros manipulate Abstract Syntax Tree (AST) nodes via SwiftSyntax",
      "C macros are simple text replacement; Swift macros are type-checked programs",
      "Run in secure compiler sandboxes (no disk, no network, deterministic)",
      "Expand transparently with full Xcode inspection and breakpoint support"
    ],
    "commonMistakes": [
      "Thinking Swift macros can read external files or make network calls at build time",
      "Believing macros perform runtime reflection (they execute strictly at compile time)"
    ],
    "followUps": [
      {
        "id": "interview.swift.macros.117.f1",
        "parentQuestionId": "interview.swift.macros.117",
        "question": "How do macros relate to external code generation tools like Sourcery?",
        "modelAnswer": "Macros integrate directly into the compiler pipeline and IDE without external build phases, disk writes, or out-of-sync generated files, making them faster and seamless.",
        "keyPoints": [
          "Built directly into compiler and IDE",
          "Replaces custom build-phase scripts"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-macros",
      "swift-result-builders"
    ]
  },
  {
    "id": "interview.swift.macros.118",
    "question": "Explain the difference between Freestanding macros (`#`) and Attached macros (`@`).",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-macros",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "Freestanding Macro",
      "Attached Macro",
      "Macros",
      "Syntax"
    ],
    "modelAnswer": "Swift categorizes macros into two structural kinds based on how they are invoked:\n\n1. Freestanding Macros (prefixed with `#`):\n- Expressed as standalone statements or expressions without decorating an existing declaration.\n- Roles:\n  - `#freestanding(expression)`: Produces a piece of code that returns a value (e.g. `#stringify(x + y)`, `#URL(\"https://apple.com\")`).\n  - `#freestanding(declaration)`: Generates one or more new declarations (e.g. `#warning(\"TODO\")`).\n\n2. Attached Macros (prefixed with `@`):\n- Decorate existing declarations (classes, structs, properties, functions) as attributes.\n- Modifies or adds members, accessors, extensions, or peer declarations to the decorated type (e.g. `@Observable`, `@Model`).",
    "keyPoints": [
      "Freestanding macros (#) appear on their own as expressions or declarations",
      "Attached macros (@) decorate existing types, functions, or properties",
      "Freestanding examples: #URL, #stringify, #Predicate",
      "Attached examples: @Observable, @Model, @OptionSet"
    ],
    "commonMistakes": [
      "Attempting to use an attached macro like @Observable with hash syntax (#Observable)",
      "Expecting freestanding expression macros to modify surrounding scope declarations"
    ],
    "followUps": [
      {
        "id": "interview.swift.macros.118.f1",
        "parentQuestionId": "interview.swift.macros.118",
        "question": "What is an example of compile-time validation in a freestanding macro like #URL?",
        "modelAnswer": "#URL(\"invalid url\") parses the string during compilation using URLComponents. If invalid, it emits a compiler error at build time rather than failing at runtime.",
        "keyPoints": [
          "Compile-time URL validation prevents runtime crashes"
        ],
        "difficulty": "foundational"
      }
    ],
    "relatedTopics": [
      "swift-macros"
    ]
  },
  {
    "id": "interview.swift.macros.119",
    "question": "What are the five attached macro roles (`member`, `peer`, `accessor`, `memberAttribute`, `extension`)?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-macros",
    "difficulty": "advanced",
    "type": "conceptual",
    "estimatedMinutes": 5,
    "frequency": "high",
    "tags": [
      "Swift",
      "Attached Macros",
      "Macro Roles",
      "Metaprogramming",
      "Architecture"
    ],
    "modelAnswer": "Attached macros declare specific roles defining where they inject code:\n\n1. `@attached(member)`: Injects new declarations inside the target type (e.g. adds initializers, computed properties, or helper methods).\n2. `@attached(peer)`: Injects new declarations alongside the target declaration at the same scope level (e.g. generates an async overload alongside a completion-handler method).\n3. `@attached(accessor)`: Injects `get`, `set`, `willSet`, or `didSet` accessors onto stored properties, turning them into computed/observed properties.\n4. `@attached(memberAttribute)`: Automatically adds attributes to all members of the target type (e.g. applying `@Published` to every property).\n5. `@attached(extension)`: Injects conformance to protocols via an `extension` on the type.",
    "keyPoints": [
      "member: adds properties, methods, or inits inside the type",
      "peer: adds sibling declarations alongside the target (e.g. async overloads)",
      "accessor: adds getters/setters/observers to properties",
      "memberAttribute: decorates member properties with attributes",
      "extension: adds protocol conformances and extension methods"
    ],
    "commonMistakes": [
      "Trying to add an initializer from an accessor macro (must use member role)",
      "Trying to declare protocol conformance from a member macro (must use extension role)"
    ],
    "followUps": [
      {
        "id": "interview.swift.macros.119.f1",
        "parentQuestionId": "interview.swift.macros.119",
        "question": "Which roles does the @Observable macro use simultaneously?",
        "modelAnswer": "@Observable uses member (to add the observation registrar), memberAttribute (to decorate stored properties), and extension (to add Observable protocol conformance).",
        "keyPoints": [
          "Macros can combine multiple attached roles simultaneously"
        ],
        "difficulty": "advanced"
      }
    ],
    "relatedTopics": [
      "swift-macros",
      "swift-properties"
    ]
  },
  {
    "id": "interview.swift.macros.120",
    "question": "How does the Swift compiler sandbox macro execution, and what constraints are enforced?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-macros",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "medium",
    "tags": [
      "Swift",
      "Macros",
      "Sandbox",
      "Security",
      "Build System"
    ],
    "modelAnswer": "To ensure build determinism, performance, and security, Swift macros execute in a sandboxed compiler sub-process:\n\n1. Separate Executable: The macro package is compiled as a native executable CLI using the host machine architecture, not the target device architecture.\n2. IPC via SwiftSyntax: The compiler communicates with the macro executable over IPC, serializing the AST as JSON/binary and receiving transformed AST nodes.\n3. Sandbox Restrictions:\n- No File System Access: Macros cannot read arbitrary disk files or config files.\n- No Network Access: Macros cannot make HTTP requests.\n- No System Clocks/RNG: Macros should be pure, deterministic functions of their syntax inputs.\n\nThis guarantees that compiling the same source code always produces byte-for-byte identical output and prevents malicious code execution during builds.",
    "keyPoints": [
      "Compiled as separate host-machine executable running in an OS sandbox",
      "Receives and returns syntax trees via IPC (SwiftSyntax)",
      "Strictly forbidden from network access, filesystem writes, or environment inspection",
      "Guarantees build determinism, security, and reproducible builds"
    ],
    "commonMistakes": [
      "Attempting to read a .env or JSON file inside a macro implementation",
      "Expecting macros to run on target architecture (they run on developer host machine)"
    ],
    "followUps": [
      {
        "id": "interview.swift.macros.120.f1",
        "parentQuestionId": "interview.swift.macros.120",
        "question": "How do macros communicate warnings or errors to the developer?",
        "modelAnswer": "Macros emit diagnostics through the `MacroExpansionContext` parameter using `context.diagnose(Diagnostic(...))`. These render as native Xcode error/warning squiggles.",
        "keyPoints": [
          "Emit diagnostics via MacroExpansionContext",
          "Render as native compiler errors in IDE"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-macros"
    ]
  },
  {
    "id": "interview.swift.macros.121",
    "question": "How does the `@Observable` macro in Swift 5.9 work under the hood, and how does it replace Combine?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-macros",
    "difficulty": "advanced",
    "type": "conceptual",
    "estimatedMinutes": 5,
    "frequency": "high",
    "tags": [
      "Swift",
      "@Observable",
      "Observation",
      "Combine",
      "SwiftUI",
      "Macros"
    ],
    "modelAnswer": "The `@Observable` macro completely replaces the legacy Combine-based `ObservableObject` and `@Published` system:\n\nUnder the Hood Transformations:\n1. It injects an `ObservationRegistrar` stored property into the class.\n2. It converts every stored property into a computed property backed by an underscored private property (`_name`).\n3. In the getter, it calls `access(keyPath: \\.name)` to register active access with SwiftUI.\n4. In the setter, it calls `withMutation(keyPath: \\.name)` to notify observers of changes.\n5. It adds conformance to the `Observable` protocol via an extension.\n\nAdvantages over Combine:\n- Field-level tracking: Views re-render ONLY when properties they actually read change, whereas `ObservableObject.objectWillChange` invalidated views on ANY property update.\n- No Combine import required, no `@Published` boilerplate, and no `@StateObject` vs `@ObservedObject` lifecycle confusion.",
    "keyPoints": [
      "Injects ObservationRegistrar to track fine-grained property access",
      "Converts stored properties into access/withMutation computed wrappers",
      "Field-level tracking: views only update when properties they actively read change",
      "Eliminates Combine dependency and @Published boilerplate"
    ],
    "commonMistakes": [
      "Mixing @Observable with @Published (deprecated pattern; @Observable observes all stored properties by default)",
      "Using @StateObject with an @Observable class (use @State instead in iOS 17+)"
    ],
    "followUps": [
      {
        "id": "interview.swift.macros.121.f1",
        "parentQuestionId": "interview.swift.macros.121",
        "question": "How do you prevent a property in an @Observable class from being observed?",
        "modelAnswer": "Decorate the property with the `@ObservationIgnored` macro attribute.",
        "keyPoints": [
          "@ObservationIgnored excludes specific properties from observation tracking"
        ],
        "difficulty": "foundational"
      }
    ],
    "relatedTopics": [
      "swift-macros",
      "swift-properties"
    ]
  },
  {
    "id": "interview.swift.macros.122",
    "question": "What are the architectural limitations of Swift Macros? What CANNOT be done with them?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-macros",
    "difficulty": "advanced",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "Macros",
      "Limitations",
      "Metaprogramming",
      "Architecture"
    ],
    "modelAnswer": "Swift Macros are powerful but have strict architectural boundaries:\n\n1. No Semantic Type Information: Macros only receive syntax trees (ASTs). A macro inspecting `let x: User` sees the string token `\"User\"`, but cannot inspect the `User` struct itself, know its properties, or verify protocol conformance.\n2. Purely Additive: Macros cannot delete or modify existing source code written by the developer. They can only add new declarations, accessors, or attributes.\n3. Strictly Compile-Time: Macros cannot execute runtime logic, read dynamic runtime state, or inspect memory addresses.\n4. Cannot Inspect Outside Scope: A macro decorating `class A` cannot inspect other classes, files, or modules in the project.",
    "keyPoints": [
      "Syntactic, not semantic: cannot query type definitions or protocol conformance",
      "Purely additive: cannot modify or delete existing developer code",
      "Isolated to decorated declaration: cannot inspect other files or types",
      "Zero runtime reflection capabilities"
    ],
    "commonMistakes": [
      "Expecting a macro to know the properties of an external generic type T",
      "Trying to use macros to remove or rewrite existing method bodies"
    ],
    "followUps": [
      {
        "id": "interview.swift.macros.122.f1",
        "parentQuestionId": "interview.swift.macros.122",
        "question": "Why are Swift macros designed to be purely additive?",
        "modelAnswer": "To ensure code remains legible and predictable. If macros could delete or secretly alter existing code, reasoning about program behavior would become nearly impossible.",
        "keyPoints": [
          "Prevents confusing code mutation",
          "Preserves developer intent and clarity"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-macros"
    ]
  },
  {
    "id": "interview.swift.macros.123",
    "question": "How are Swift Macros structured and distributed across Swift packages?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-macros",
    "difficulty": "intermediate",
    "type": "architecture",
    "estimatedMinutes": 4,
    "frequency": "medium",
    "tags": [
      "Swift",
      "SPM",
      "Package.swift",
      "SwiftSyntax",
      "Distribution"
    ],
    "modelAnswer": "A Swift Macro implementation is always split across three separate targets in a Swift Package:\n\n1. Macro Definition Target (Library): Defines the public macro signature using the `#freestanding` or `@attached` declaration and the `#externalMacro` directive linking to the implementation module.\n2. Macro Implementation Target (`macro` executable): Imports `SwiftSyntax` and `SwiftCompilerPlugin`, implementing the actual AST transformation logic (`CompilerPlugin`).\n3. Client Target: The user app or library that imports and uses the macro.\n\nThis separation ensures consumers don't link heavy compiler tools (like SwiftSyntax) into their iOS app binary.",
    "keyPoints": [
      "Split into definition library, implementation macro executable, and client target",
      "Implementation imports SwiftSyntax and SwiftCompilerPlugin",
      "Definition links to implementation via #externalMacro(module:..., type:...)",
      "Ensures SwiftSyntax is never compiled into the client iOS binary"
    ],
    "commonMistakes": [
      "Trying to import SwiftSyntax directly in client app code",
      "Combining macro definition and implementation into a single target"
    ],
    "followUps": [
      {
        "id": "interview.swift.macros.123.f1",
        "parentQuestionId": "interview.swift.macros.123",
        "question": "How do you unit test a Swift macro implementation?",
        "modelAnswer": "Using the `SwiftSyntaxMacrosTestSupport` framework and `assertMacroExpansion(originalCode, expectedExpansion: ...)`, testing AST expansions with exact string diffs.",
        "keyPoints": [
          "assertMacroExpansion from SwiftSyntaxMacrosTestSupport for unit tests"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-macros"
    ]
  },
  {
    "id": "interview.swift.macros.124",
    "question": "How do you inspect macro expansions in Xcode and during compilation?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-macros",
    "difficulty": "foundational",
    "type": "practical",
    "estimatedMinutes": 3,
    "frequency": "high",
    "tags": [
      "Swift",
      "Xcode",
      "Debugging",
      "Macro Expansion",
      "Inspection"
    ],
    "modelAnswer": "Swift and Xcode provide multiple tools to inspect macro expansions:\n\n1. Xcode Inline Expansion: Right-click any macro attribute in Xcode (e.g. `@Observable` or `#URL`) and select **Expand Macro**. Xcode reveals the generated Swift code inline directly under the declaration.\n2. Setting Breakpoints: You can place active breakpoints directly inside expanded macro code in Xcode.\n3. Compiler Output: The compiler flag `-dump-macro-expansions` prints all expanded code to build logs.\n4. In SwiftSyntax tests: Calling `#debugDescription` prints the exact parsed AST structure.",
    "keyPoints": [
      "Right-click -> Expand Macro reveals generated Swift code in Xcode editor",
      "Breakpoints can be placed directly inside expanded macro code",
      "Compiler flag -dump-macro-expansions prints output to build transcript",
      "Provides full transparency, eliminating magic code generation"
    ],
    "commonMistakes": [
      "Treating macros as a black box without inspecting the expanded code during debugging"
    ],
    "followUps": [
      {
        "id": "interview.swift.macros.124.f1",
        "parentQuestionId": "interview.swift.macros.124",
        "question": "Can you copy expanded code into your source file and remove the macro?",
        "modelAnswer": "Yes. In Xcode, the contextual menu includes \"Copy Macro Expansion\", allowing you to replace the macro with hand-written code if you want full manual control.",
        "keyPoints": [
          "Allows copying generated code directly to replace the macro"
        ],
        "difficulty": "foundational"
      }
    ],
    "relatedTopics": [
      "swift-macros"
    ]
  },
  {
    "id": "interview.swift.method_dispatch.125",
    "question": "What is Static (Direct) Dispatch in Swift, and why is it the fastest dispatch mechanism?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-method-dispatch",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "Method Dispatch",
      "Static Dispatch",
      "Direct Dispatch",
      "Performance"
    ],
    "modelAnswer": "Static Dispatch (also known as Direct Dispatch) means the memory address of the function to execute is determined at compile time.\n\nWhy it is the fastest:\n1. Zero Indirection: The CPU executes a direct jump instruction (`call` / `bl`) to a hardcoded memory address, requiring no table lookups or pointer dereferences.\n2. Inlining: Because the compiler knows the exact function implementation, it can replace the function call with the actual function body (inlining), eliminating function call overhead entirely.\n3. Cache Efficiency: Avoids instruction cache misses caused by dynamic pointer lookups.\n\nTypes that use Static Dispatch by default: Structs, Enums, global functions, `final` classes, `private` methods, and methods declared in class/protocol extensions.",
    "keyPoints": [
      "Target function address is fixed at compile time",
      "Zero indirection overhead (no table lookups or runtime checks)",
      "Enables compiler optimizations like inlining and devirtualization",
      "Used by value types, final classes, private methods, and extensions"
    ],
    "commonMistakes": [
      "Believing protocol extension methods are always dynamically dispatched",
      "Using classes when structs would provide static dispatch advantages"
    ],
    "followUps": [
      {
        "id": "interview.swift.method_dispatch.125.f1",
        "parentQuestionId": "interview.swift.method_dispatch.125",
        "question": "Can a method on a struct ever use dynamic dispatch?",
        "modelAnswer": "Only if the struct instance is hidden behind a protocol existential (`any Protocol`) or passed to an Objective-C runtime method.",
        "keyPoints": [
          "Existential wrapping forces dynamic witness table dispatch on structs"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-method-dispatch",
      "swift-struct-vs-class"
    ]
  },
  {
    "id": "interview.swift.method_dispatch.126",
    "question": "How does Table (V-Table) Dispatch work for Swift classes, and what is its overhead?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-method-dispatch",
    "difficulty": "advanced",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "V-Table",
      "Table Dispatch",
      "Classes",
      "Polymorphism"
    ],
    "modelAnswer": "Table Dispatch (Virtual Method Table / V-Table) is the standard mechanism for class inheritance polymorphism in Swift.\n\nHow it works:\n1. Every class has a virtual table (an array of function pointers) generated by the compiler.\n2. When a subclass overrides a method, its v-table entry points to the subclass implementation. If it does not override, it copies the pointer from the superclass.\n3. At runtime, calling `instance.doWork()` performs three steps:\n   - Dereference the object's metadata pointer to find its class v-table.\n   - Index into the v-table at a fixed offset for `doWork`.\n   - Jump to the function pointer.\n\nOverhead: Adds memory indirection, prevents cross-function inlining by default, and can cause instruction cache misses in tight loops.",
    "keyPoints": [
      "Each class has a compiler-generated v-table (array of function pointers)",
      "Method call dereferences object metadata -> indexes table -> jumps to pointer",
      "Enables class inheritance and runtime polymorphism",
      "Prevents the compiler from inlining method calls unless devirtualized"
    ],
    "commonMistakes": [
      "Not marking classes or methods `final` when subclassing is not intended",
      "Assuming v-table dispatch is as slow as Objective-C message dispatch (v-table is much faster than objc_msgSend)"
    ],
    "followUps": [
      {
        "id": "interview.swift.method_dispatch.126.f1",
        "parentQuestionId": "interview.swift.method_dispatch.126",
        "question": "Do class extension methods appear in the v-table?",
        "modelAnswer": "No. In Swift, methods declared in class extensions cannot be overridden in subclasses and use Static Dispatch, not V-Table dispatch.",
        "keyPoints": [
          "Class extension methods use static dispatch by default and cannot be overridden"
        ],
        "difficulty": "advanced"
      }
    ],
    "relatedTopics": [
      "swift-method-dispatch",
      "swift-struct-vs-class"
    ]
  },
  {
    "id": "interview.swift.method_dispatch.127",
    "question": "What is a Protocol Witness Table (PWT), and how does dispatch differ for `some Protocol` vs `any Protocol`?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-method-dispatch",
    "difficulty": "expert",
    "type": "conceptual",
    "estimatedMinutes": 5,
    "frequency": "high",
    "tags": [
      "Swift",
      "Witness Table",
      "PWT",
      "some vs any",
      "Dispatch"
    ],
    "modelAnswer": "A Protocol Witness Table (PWT) is an array of function pointers generated by the compiler for every (Type, Protocol) conformance. It maps protocol requirement slots to the concrete type's implementations.\n\nDispatch comparison:\n1. With `some Protocol` (or generics): The compiler knows the exact concrete type at compile time. It devirtualizes the call directly to the concrete function (Static Dispatch) with zero witness table lookup.\n2. With `any Protocol` (existential): The concrete type is unknown at compile time. The call reads the PWT pointer from the 5-word existential container, indexes the required method slot in the PWT, and jumps to the function pointer (Dynamic Witness Table Dispatch).\n\nThus, `some Protocol` gives you protocol abstraction with static dispatch speed, while `any Protocol` incurs dynamic witness table overhead.",
    "keyPoints": [
      "PWT maps protocol requirements to concrete type implementations",
      "One PWT per (conforming type, protocol) combination",
      "some Protocol devirtualizes to static dispatch (zero PWT lookup at runtime)",
      "any Protocol performs dynamic runtime lookup through the PWT pointer"
    ],
    "commonMistakes": [
      "Assuming protocols always use witness tables (generics and opaque types use static dispatch via monomorphization)",
      "Confusing Protocol Witness Tables (method calls) with Value Witness Tables (memory lifecycle)"
    ],
    "followUps": [
      {
        "id": "interview.swift.method_dispatch.127.f1",
        "parentQuestionId": "interview.swift.method_dispatch.127",
        "question": "What is a Value Witness Table (VWT)?",
        "modelAnswer": "A VWT is a table of runtime operations for managing value types (size, alignment, initializeWithCopy, destroy, deallocate), used by existential containers and generic runtime code.",
        "keyPoints": [
          "VWT handles memory lifecycle (allocation, copying, destruction)"
        ],
        "difficulty": "expert"
      }
    ],
    "relatedTopics": [
      "swift-method-dispatch",
      "swift-opaque-types"
    ]
  },
  {
    "id": "interview.swift.method_dispatch.128",
    "question": "Explain the \"Protocol Extension Dispatch Trap\": why does adding a method to a protocol requirement change its dispatch?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-method-dispatch",
    "difficulty": "advanced",
    "type": "debugging",
    "estimatedMinutes": 5,
    "frequency": "high",
    "tags": [
      "Swift",
      "Protocol Extension",
      "Dispatch Trap",
      "Static Dispatch",
      "Witness Table"
    ],
    "modelAnswer": "The Protocol Extension Dispatch Trap occurs when a method is implemented in a protocol extension:\n\n1. Scenario A: The method is declared in the protocol definition AND implemented in the extension:\n- The method is a protocol requirement. It receives a slot in the Protocol Witness Table.\n- Conforming types that provide their own implementation dynamically override it.\n- Dispatch is Dynamic via PWT.\n\n2. Scenario B: The method is ONLY declared in the extension (not in the protocol body):\n- The method is NOT a protocol requirement. It has no slot in the PWT.\n- Calling the method on an existential `let p: any Protocol` ALWAYS calls the extension implementation via Static Dispatch, even if the concrete conforming type defines an identical method.\n\nThis leads to silent bugs where a custom implementation is ignored when invoked through a protocol type.",
    "keyPoints": [
      "Requirement declared in protocol definition = Dynamic dispatch via PWT (can be overridden)",
      "Method declared only in protocol extension = Static dispatch (cannot be customized polymorphically)",
      "Invoking extension-only method on existential ignores concrete type implementations",
      "Always declare methods in protocol body if polymorphic customization is intended"
    ],
    "commonMistakes": [
      "Adding default methods in an extension without declaring them in the protocol definition, expecting polymorphism",
      "Debugging why a struct's custom method is ignored when cast to a protocol type"
    ],
    "followUps": [
      {
        "id": "interview.swift.method_dispatch.128.f1",
        "parentQuestionId": "interview.swift.method_dispatch.128",
        "question": "How do you fix this dispatch trap?",
        "modelAnswer": "Add the method signature to the protocol declaration body so it becomes an official protocol requirement with a PWT slot.",
        "keyPoints": [
          "Declare method in main protocol body to enable dynamic dispatch"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-method-dispatch",
      "swift-protocols"
    ]
  },
  {
    "id": "interview.swift.method_dispatch.129",
    "question": "How does the `final` keyword optimize method dispatch, and what is Devirtualization?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-method-dispatch",
    "difficulty": "intermediate",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "final",
      "Devirtualization",
      "Optimization",
      "V-Table"
    ],
    "modelAnswer": "Marking a class or method `final` tells the compiler that it can never be subclassed or overridden.\n\nOptimization Impact:\n1. Devirtualization: The compiler converts dynamic v-table lookups into direct function calls (Static Dispatch).\n2. Inlining: Once devirtualized, small methods can be inlined directly at the call site, eliminating function prologue and epilogue costs.\n3. Whole Module Optimization (WMO): When WMO is enabled, the compiler inspects the entire module. If a `public` (but not `open`) class or internal class is never subclassed, the compiler automatically devirtualizes its methods even if you forgot to type `final`.",
    "keyPoints": [
      "final prevents subclassing and overriding",
      "Devirtualization shifts class method dispatch from v-table to direct dispatch",
      "Enables compiler inlining and dead-code elimination",
      "WMO automatically devirtualizes internal classes that are never subclassed"
    ],
    "commonMistakes": [
      "Leaving classes non-final by default when inheritance is not needed",
      "Thinking final is only for architecture restriction rather than performance"
    ],
    "followUps": [
      {
        "id": "interview.swift.method_dispatch.129.f1",
        "parentQuestionId": "interview.swift.method_dispatch.129",
        "question": "Does marking a class final give it value semantics?",
        "modelAnswer": "No. A final class remains a reference type with heap allocation and ARC reference counting. It only optimizes method dispatch, not memory semantics.",
        "keyPoints": [
          "final optimizes dispatch; it does not change reference semantics"
        ],
        "difficulty": "foundational"
      }
    ],
    "relatedTopics": [
      "swift-method-dispatch",
      "swift-struct-vs-class",
      "swift-access-control"
    ]
  },
  {
    "id": "interview.swift.method_dispatch.130",
    "question": "What is `@inlinable` in Swift, and how does it affect cross-module method dispatch?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-method-dispatch",
    "difficulty": "advanced",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "medium",
    "tags": [
      "Swift",
      "@inlinable",
      "Cross-Module Optimization",
      "Performance",
      "Frameworks"
    ],
    "modelAnswer": "By default, function implementations in compiled Swift modules (frameworks/libraries) are opaque to external client modules. Even static functions must be called via dynamic function calls across module boundaries.\n\n`@inlinable` exposes the function's body implementation in the module's public `.swiftinterface` file:\n1. Cross-Module Inlining: Allows the client compiler to inline the framework function's instructions directly into the client app.\n2. Cross-Module Specialization: Allows generic functions to be monomorphized with client concrete types.\n\nTradeoff (ABI Stability): Once inlined, client apps embed that exact code. If you update the framework library later without recompiling the app, the client continues running the old inlined code. It breaks library evolution.",
    "keyPoints": [
      "Exposes function body implementation in module interface",
      "Allows external consuming modules to inline code and specialize generics",
      "Critical for performance-sensitive standard library functions",
      "Tradeoff: breaks ABI resilience if function implementation changes later"
    ],
    "commonMistakes": [
      "Using @inlinable on complex, frequently-changing internal framework business logic",
      "Forgetting that @inlinable functions can only reference public or @usableFromInline declarations"
    ],
    "followUps": [
      {
        "id": "interview.swift.method_dispatch.130.f1",
        "parentQuestionId": "interview.swift.method_dispatch.130",
        "question": "What is @usableFromInline?",
        "modelAnswer": "An attribute that allows an internal property or method to be referenced from an @inlinable function without making it fully public.",
        "keyPoints": [
          "Exposes internal declarations to @inlinable functions"
        ],
        "difficulty": "advanced"
      }
    ],
    "relatedTopics": [
      "swift-method-dispatch",
      "swift-access-control"
    ]
  },
  {
    "id": "interview.swift.method_dispatch.131",
    "question": "What is Message Dispatch in Swift (`objc_msgSend`), and when is it triggered?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-method-dispatch",
    "difficulty": "advanced",
    "type": "conceptual",
    "estimatedMinutes": 4,
    "frequency": "high",
    "tags": [
      "Swift",
      "Message Dispatch",
      "objc_msgSend",
      "Objective-C Runtime",
      "KVO"
    ],
    "modelAnswer": "Message Dispatch is the most dynamic dispatch mechanism in Swift, powered by the Objective-C runtime via `objc_msgSend`.\n\nHow it works:\nInstead of jumping to a fixed address or table index, the caller sends a message (selector) to the object. At runtime, the Objective-C runtime searches the class's method cache, then its dispatch table, and walks up the superclass hierarchy until it finds the implementation (or triggers message forwarding).\n\nWhen it is triggered:\n1. When an `NSObject` subclass method is marked with `dynamic` or `@objc dynamic`.\n2. Key-Value Observing (KVO) observers.\n3. CoreData managed property access.\n4. Method swizzling and runtime mocking frameworks.\n\nPerformance: Slowest dispatch mechanism (lookup overhead and prevents inlining), but enables maximum runtime dynamicity.",
    "keyPoints": [
      "Delegates dispatch to the Objective-C runtime via objc_msgSend",
      "Triggered by @objc dynamic on NSObject subclasses",
      "Powers KVO, Core Data, and method swizzling",
      "Slowest dispatch mechanism, but provides maximum runtime flexibility"
    ],
    "commonMistakes": [
      "Assuming @objc alone triggers message dispatch (@objc only exposes the method; dynamic is required for message dispatch)",
      "Using message dispatch in tight loops where performance is critical"
    ],
    "followUps": [
      {
        "id": "interview.swift.method_dispatch.131.f1",
        "parentQuestionId": "interview.swift.method_dispatch.131",
        "question": "Does Swift have its own pure-Swift method swizzling mechanism without Objective-C?",
        "modelAnswer": "No. Method swizzling strictly requires the Objective-C runtime and message dispatch. Pure Swift types use v-tables or static dispatch, which cannot be dynamically swizzled at runtime.",
        "keyPoints": [
          "Swizzling requires Objective-C runtime and @objc dynamic"
        ],
        "difficulty": "intermediate"
      }
    ],
    "relatedTopics": [
      "swift-method-dispatch"
    ]
  },
  {
    "id": "interview.swift.method_dispatch.132",
    "question": "Summarize the method dispatch matrix: which language constructs use which dispatch strategy in Swift?",
    "domainId": "swift",
    "moduleId": "swift-advanced-mod",
    "topicId": "swift-method-dispatch",
    "difficulty": "expert",
    "type": "comparison",
    "estimatedMinutes": 5,
    "frequency": "high",
    "tags": [
      "Swift",
      "Method Dispatch",
      "Summary",
      "Architecture",
      "V-Table",
      "Witness Table"
    ],
    "modelAnswer": "Swift Method Dispatch Matrix:\n\n1. Value Types (Structs / Enums):\n- Primary declaration: Static Dispatch\n- Extension: Static Dispatch\n\n2. Classes (Reference Types):\n- Primary declaration: Table (V-Table) Dispatch\n- Marked `final` or `private`: Static Dispatch\n- Class extension: Static Dispatch (cannot be overridden)\n- Marked `@objc dynamic`: Message Dispatch (objc_msgSend)\n\n3. Protocols:\n- Declared requirement: Protocol Witness Table (PWT) Dispatch (or Static if specialized via generics/some)\n- Extension only (default implementation without requirement): Static Dispatch\n\n4. Generics:\n- Monomorphized with concrete types: Static Dispatch",
    "keyPoints": [
      "Structs/Enums: Always Static Dispatch",
      "Classes: V-Table (primary), Static (final/private/extension), Message (@objc dynamic)",
      "Protocols: PWT for requirements; Static for extension-only methods",
      "Generics: Static Dispatch when monomorphized by compiler"
    ],
    "commonMistakes": [
      "Thinking class extensions use v-tables",
      "Assuming all protocol methods use dynamic witness tables"
    ],
    "followUps": [
      {
        "id": "interview.swift.method_dispatch.132.f1",
        "parentQuestionId": "interview.swift.method_dispatch.132",
        "question": "Why can class extensions not add methods to the class v-table in Swift?",
        "modelAnswer": "Because Swift modules can be compiled separately. The compiler lays out the class v-table at a fixed size. If separate extensions in different modules could arbitrarily insert slots into the v-table, table offsets would conflict across compilation units.",
        "keyPoints": [
          "V-table layout requires fixed size and offsets at primary class compilation"
        ],
        "difficulty": "expert"
      }
    ],
    "relatedTopics": [
      "swift-method-dispatch",
      "swift-struct-vs-class",
      "swift-protocols"
    ]
  },
  {
  "id": "interview.swift.generics.133",
  "question": "How does parametric polymorphism in Swift compare to C++ templates and Java generics (monomorphization vs type erasure)?",
  "domainId": "swift",
  "moduleId": "swift-core-mod",
  "topicId": "swift-generics",
  "difficulty": "expert",
  "type": "conceptual",
  "estimatedMinutes": 5,
  "frequency": "high",
  "tags": [
    "Swift",
    "Generics",
    "Monomorphization",
    "Type Erasure",
    "C++",
    "Java"
  ],
  "modelAnswer": "Java implements generics via Type Erasure, discarding type parameters at compile time and replacing them with Object/casts, which prevents primitive type parameters (without boxing) and loses runtime type metadata. C++ templates use purely compile-time textual expansion (monomorphization) without type checking until instantiation, enabling zero-cost abstraction but causing slow builds and cryptically late compiler errors. Swift strikes an optimal balance: generics are fully type-checked at definition time against protocol constraints, and the compiler uses specialization (monomorphization) within modules to emit optimized, non-boxed machine code, while retaining unspecialized witness-table-driven representations for dynamic or cross-module scenarios.",
  "keyPoints": [
    "Java: Type erasure strips types at runtime, relies on boxing and casts.",
    "C++: Unconstrained templates instantiate at call sites, causing late compiler errors.",
    "Swift: Fully type-checked at declaration time via constraints; specialized at compile time via monomorphization.",
    "Swift can fall back to unspecialized runtime representation using metadata and witness tables when code cannot be inlined."
  ],
  "commonMistakes": [
    "Thinking Swift generics work identically to Java type erasure.",
    "Believing Swift generics have dynamic dispatch overhead in all cases."
  ],
  "followUps": [
    {
      "id": "interview.swift.generics.133.f1",
      "parentQuestionId": "interview.swift.generics.133",
      "question": "What is the binary size tradeoff with generic monomorphization?",
      "modelAnswer": "Specializing a generic type or function for every distinct concrete type (e.g. Int, Double, String) duplicates the emitted machine code for each type, increasing the compiled binary size (code bloat). Compilers use heuristics and flags like Whole Module Optimization to balance execution speed against executable size.",
      "keyPoints": [
        "Code duplication per concrete type increases binary footprint."
      ],
      "difficulty": "advanced"
    }
  ],
  "relatedTopics": [
    "swift-generics",
    "swift-method-dispatch"
  ]
},
  {
  "id": "interview.swift.generics.134",
  "question": "What is the difference between a protocol constraint (T: Protocol) and a class inheritance constraint (T: Class) in generic declarations?",
  "domainId": "swift",
  "moduleId": "swift-core-mod",
  "topicId": "swift-generics",
  "difficulty": "intermediate",
  "type": "conceptual",
  "estimatedMinutes": 4,
  "frequency": "medium",
  "tags": [
    "Swift",
    "Generics",
    "Type Constraints",
    "Protocols",
    "Classes"
  ],
  "modelAnswer": "A protocol constraint (e.g. `T: Comparable`) requires the type parameter T to conform to the specified protocol, allowing value types (structs, enums) and reference types (classes) alike to satisfy the constraint. A class inheritance constraint (e.g. `T: UIViewController`) requires T to either be that exact class or a subclass of it, restricting T strictly to reference types and granting access to all properties, methods, and initializers of the class hierarchy.",
  "keyPoints": [
    "`T: Protocol` accepts structs, enums, and classes conforming to the contract.",
    "`T: Class` strictly enforces reference semantics and class inheritance.",
    "Multiple constraints can be composed using `&`, such as `<T: UIViewController & UITableViewDelegate>`."
  ],
  "commonMistakes": [
    "Thinking class constraints can be satisfied by structs with matching members.",
    "Confusing a protocol constraint `<T: Shape>` with an existential parameter `(shape: any Shape)`."
  ],
  "followUps": [
    {
      "id": "interview.swift.generics.134.f1",
      "parentQuestionId": "interview.swift.generics.134",
      "question": "Can you constrain a generic type parameter to be a class without specifying a particular superclass?",
      "modelAnswer": "Yes, by constraining T to `AnyObject` (`<T: AnyObject>`), which mandates that T must be a reference type (class).",
      "keyPoints": [
        "`<T: AnyObject>` enforces reference type semantics."
      ],
      "difficulty": "intermediate"
    }
  ],
  "relatedTopics": [
    "swift-generics",
    "swift-protocols"
  ]
},
  {
  "id": "interview.swift.generics.135",
  "question": "How does compiler monomorphization and specialization optimize Swift generics?",
  "domainId": "swift",
  "moduleId": "swift-core-mod",
  "topicId": "swift-generics",
  "difficulty": "advanced",
  "type": "conceptual",
  "estimatedMinutes": 5,
  "frequency": "high",
  "tags": [
    "Swift",
    "Generics",
    "Specialization",
    "Monomorphization",
    "Performance"
  ],
  "modelAnswer": "When Swift compiles a generic function like `func min<T: Comparable>(_ a: T, _ b: T) -> T`, by default it must generate a universal implementation that looks up operations via value witness tables and protocol witness tables. However, when the concrete type is known at the call site (e.g. `min(3, 7)`), the compiler creates a specialized copy (`min_Int(Int, Int) -> Int`), substituting the generic instructions with direct CPU integer comparison instructions. This process is called monomorphization / generic specialization. It turns dynamic witness calls into direct jumps or inlined instructions, eliminating all generic abstraction overhead.",
  "keyPoints": [
    "Universal generic code relies on witness tables to manipulate values of unknown size.",
    "Specialization generates concrete copies of generic functions for specific types.",
    "Enables function inlining, constant folding, and direct CPU register operations.",
    "Occurs automatically within modules, or across modules when @inlinable or @_specialize is applied."
  ],
  "commonMistakes": [
    "Believing Swift generics always suffer dynamic dispatch overhead at runtime.",
    "Expecting specialization across module boundaries when public functions are not @inlinable."
  ],
  "followUps": [
    {
      "id": "interview.swift.generics.135.f1",
      "parentQuestionId": "interview.swift.generics.135",
      "question": "What attribute allows framework authors to pre-specialize generic functions for common types across module boundaries?",
      "modelAnswer": "`@_specialize(where T == Int)` instructs the Swift compiler to emit specialized machine code for specified types even if the general implementation is private or not fully inlined.",
      "keyPoints": [
        "@_specialize generates targeted specialized implementations in libraries."
      ],
      "difficulty": "expert"
    }
  ],
  "relatedTopics": [
    "swift-generics",
    "swift-method-dispatch"
  ]
},
  {
  "id": "interview.swift.generics.136",
  "question": "Explain Conditional Conformance in Swift (SE-0143) and how runtime casting behaves with conditionally conformant types.",
  "domainId": "swift",
  "moduleId": "swift-core-mod",
  "topicId": "swift-generics",
  "difficulty": "advanced",
  "type": "conceptual",
  "estimatedMinutes": 5,
  "frequency": "high",
  "tags": [
    "Swift",
    "Generics",
    "Conditional Conformance",
    "Equatable",
    "Runtime Casts"
  ],
  "modelAnswer": "Conditional Conformance (SE-0143) allows a generic type to conform to a protocol only when its type arguments satisfy certain constraints. For example, `extension Array: Equatable where Element: Equatable`. Before Swift 4.1, `[Int]` was not Equatable because Array as a whole could not conditionally adopt Equatable. Swift 4.1 added compile-time conditional conformance, and Swift 4.2 added dynamic runtime casting support, allowing `(anyValue as? [any Equatable])` or checking `anyValue is Equatable` to dynamically query the witness table generated for the conditionally conforming type.",
  "keyPoints": [
    "Allows generic container types to conform to protocols when Element conforms.",
    "Standard library collections (`Array`, `Optional`, `Dictionary`, `Set`) conditionally conform to `Equatable`, `Hashable`, `Encodable`, `Decodable`.",
    "The compiler synthesizes witness tables conditioned on element witness tables.",
    "Dynamic runtime casts (`is`, `as?`) correctly evaluate conditional conformances at runtime."
  ],
  "commonMistakes": [
    "Declaring unconditional conformances and force-casting elements inside methods.",
    "Assuming conditional conformance cannot be queried via dynamic runtime casts (`as?`)."
  ],
  "followUps": [
    {
      "id": "interview.swift.generics.136.f1",
      "parentQuestionId": "interview.swift.generics.136",
      "question": "What happens if you try to make a generic type conditionally conform to the same protocol twice with different constraints?",
      "modelAnswer": "Swift forbids overlapping conditional conformances for the same protocol because the compiler would not have a deterministic way to choose between them.",
      "keyPoints": [
        "Overlapping conditional conformances trigger a compile-time ambiguity error."
      ],
      "difficulty": "advanced"
    }
  ],
  "relatedTopics": [
    "swift-generics",
    "swift-protocols"
  ]
},
  {
  "id": "interview.swift.generics.137",
  "question": "Why do Swift protocols use associatedtype instead of angle-bracket generic type parameters (e.g. Protocol<T>)?",
  "domainId": "swift",
  "moduleId": "swift-core-mod",
  "topicId": "swift-generics",
  "difficulty": "advanced",
  "type": "conceptual",
  "estimatedMinutes": 5,
  "frequency": "high",
  "tags": [
    "Swift",
    "Generics",
    "Protocols",
    "Associated Types",
    "Type System"
  ],
  "modelAnswer": "In Swift, protocols model contracts of capabilities rather than parameterized containers. If protocols had generic parameters like `Sequence<Element>`, a single type like `Array<Int>` could hypothetically conform to `Sequence<Int>` and `Sequence<String>` simultaneously, creating massive ambiguity in type inference, subscripting, and method dispatch. By using `associatedtype Element`, Swift enforces that every conforming type has exactly ONE associated Element type (functional dependency), creating clean, unambiguous relationships.",
  "keyPoints": [
    "Associated types model a 1-to-1 relationship: each concrete type determines its own associated types.",
    "Generic protocol parameters `<T>` would allow multiple simultaneous conformances of the same protocol.",
    "Associated types provide functional dependencies that simplify type checker inference.",
    "Swift 5.7 added Primary Associated Types (`protocol Sequence<Element>`), giving the convenience of angle brackets without breaking the 1-to-1 model."
  ],
  "commonMistakes": [
    "Thinking associated types are inferior to angle brackets; they serve a fundamentally different modeling goal.",
    "Confusing Primary Associated Types with true multi-conformance generic protocols."
  ],
  "followUps": [
    {
      "id": "interview.swift.generics.137.f1",
      "parentQuestionId": "interview.swift.generics.137",
      "question": "How do Primary Associated Types in Swift 5.7+ improve developer ergonomics?",
      "modelAnswer": "They allow constraining associated types directly in type annotations (e.g. `some Collection<String>` or `any Publisher<Data, Error>`), eliminating verbose where clauses and manual type erasers.",
      "keyPoints": [
        "Enables concise constraint syntax at call sites."
      ],
      "difficulty": "intermediate"
    }
  ],
  "relatedTopics": [
    "swift-generics",
    "swift-protocols",
    "swift-opaque-types"
  ]
},
  {
  "id": "interview.swift.generics.138",
  "question": "How do contextual extensions using where clauses allow API specialization on generic types?",
  "domainId": "swift",
  "moduleId": "swift-core-mod",
  "topicId": "swift-generics",
  "difficulty": "intermediate",
  "type": "conceptual",
  "estimatedMinutes": 4,
  "frequency": "medium",
  "tags": [
    "Swift",
    "Generics",
    "Extensions",
    "Where Clause",
    "Specialization"
  ],
  "modelAnswer": "Contextual extensions allow developers to extend generic types with methods and properties that only exist when the type parameters satisfy specific criteria. For example, `extension Array where Element: Numeric { func sum() -> Element { reduce(0, +) } }`. The method `sum()` is only visible and callable on instances where Element conforms to Numeric (like `[Int]` or `[Double]`), while remaining completely unavailable on `[String]`. This enables rich, domain-specific APIs without cluttering instances where the operation is mathematically or semantically invalid.",
  "keyPoints": [
    "Contextual extensions scope member methods to qualifying type arguments.",
    "Enforced strictly at compile time; invalid calls trigger compilation errors.",
    "Can constrain against protocol conformance (`where Element: Equatable`) or type identity (`where Element == String`)."
  ],
  "commonMistakes": [
    "Placing runtime type checks (`if let intArr = self as? [Int]`) inside general methods instead of using contextual extensions.",
    "Trying to add stored properties inside contextual extensions (Swift extensions cannot add stored properties)."
  ],
  "followUps": [
    {
      "id": "interview.swift.generics.138.f1",
      "parentQuestionId": "interview.swift.generics.138",
      "question": "Can you use type equality constraints in contextual extensions?",
      "modelAnswer": "Yes, using `where Element == SpecificType` (e.g. `extension Array where Element == String { func joinedWithSemicolon() -> String }`).",
      "keyPoints": [
        "Element == ConcreteType enforces exact type match."
      ],
      "difficulty": "intermediate"
    }
  ],
  "relatedTopics": [
    "swift-generics",
    "swift-protocols"
  ]
},
  {
  "id": "interview.swift.generics.139",
  "question": "What are the tradeoffs between writing a generic function versus multiple overloaded functions?",
  "domainId": "swift",
  "moduleId": "swift-core-mod",
  "topicId": "swift-generics",
  "difficulty": "intermediate",
  "type": "conceptual",
  "estimatedMinutes": 4,
  "frequency": "medium",
  "tags": [
    "Swift",
    "Generics",
    "Overloading",
    "API Design",
    "Code Reuse"
  ],
  "modelAnswer": "A generic function (`func serialize<T: Encodable>(_ item: T)`) provides a single, uniform implementation for all types conforming to the contract, eliminating code duplication and ensuring consistent behavior. In contrast, function overloading (`func serialize(_ item: User)`, `func serialize(_ item: Post)`) allows different algorithmic implementations tailored to each type, but duplicates boilerplate. If the algorithm is structurally identical across types, use generics with type constraints. If each type requires distinct business logic, specialized data structures, or performance optimizations, use overloading (or specialize a generic function via protocol requirements).",
  "keyPoints": [
    "Generics promote DRY (Don't Repeat Yourself) when logic is identical across types.",
    "Overloading allows distinct algorithms or parameter signatures per type.",
    "Excessive overloading increases compiler type-checker resolution time and can cause ambiguity.",
    "Generic functions can still be overloaded with concrete versions for specialized fast paths."
  ],
  "commonMistakes": [
    "Writing 10 overloaded functions when a single generic function with a protocol constraint was sufficient.",
    "Overcomplicating generic constraints when 2 distinct overloaded functions would be much clearer."
  ],
  "followUps": [
    {
      "id": "interview.swift.generics.139.f1",
      "parentQuestionId": "interview.swift.generics.139",
      "question": "If both a generic function and a concrete overload match a call site, which one does Swift call?",
      "modelAnswer": "Swift's overload resolution rules prioritize the more specific concrete overload over the more general generic function.",
      "keyPoints": [
        "More specific overload takes precedence."
      ],
      "difficulty": "intermediate"
    }
  ],
  "relatedTopics": [
    "swift-generics",
    "swift-method-dispatch"
  ]
},
  {
  "id": "interview.swift.generics.140",
  "question": "How do Primary Associated Types in Swift 5.7+ bridge the gap between associated types and generic syntax?",
  "domainId": "swift",
  "moduleId": "swift-core-mod",
  "topicId": "swift-generics",
  "difficulty": "advanced",
  "type": "conceptual",
  "estimatedMinutes": 4,
  "frequency": "high",
  "tags": [
    "Swift",
    "Generics",
    "Associated Types",
    "Primary Associated Types",
    "Swift 5.7"
  ],
  "modelAnswer": "Before Swift 5.7, protocols with associated types could not specify their associated types in type signatures; writing `some Collection<Element>` was illegal, forcing developers to write verbose where clauses (`<C: Collection> where C.Element == String`) or manual type erasure (`AnyCollection<String>`). Primary associated types allow protocols to declare primary types in angle brackets (e.g. `protocol Collection<Element>`). Callers can then write concise, expressive constraints such as `func process(items: some Collection<String>)` or `let pub: any Publisher<Data, URLError>`, dramatically improving ergonomics.",
  "keyPoints": [
    "Declared with angle brackets in protocol definition: `protocol Sequence<Element>`.",
    "Works with both opaque types (`some Sequence<Int>`) and existential containers (`any Sequence<Int>`).",
    "Retains the single-conformance guarantees of associated types while providing generic-like call-site syntax."
  ],
  "commonMistakes": [
    "Thinking primary associated types allow multiple conformances of the same protocol with different type arguments.",
    "Assuming all associated types in a protocol must be primary; only key types (like Element or Output) should be primary."
  ],
  "followUps": [
    {
      "id": "interview.swift.generics.140.f1",
      "parentQuestionId": "interview.swift.generics.140",
      "question": "Which standard library protocols feature primary associated types in Swift 5.7+?",
      "modelAnswer": "`Sequence<Element>`, `Collection<Element>`, `AsyncSequence<Element>`, and Combine's `Publisher<Output, Failure>`.",
      "keyPoints": [
        "Common standard library collection and asynchronous protocols."
      ],
      "difficulty": "intermediate"
    }
  ],
  "relatedTopics": [
    "swift-generics",
    "swift-protocols",
    "swift-opaque-types"
  ]
},
  {
  "id": "interview.swift.generics.141",
  "question": "What is Whole Module Optimization (WMO) and how does it affect cross-file generic specialization in Swift?",
  "domainId": "swift",
  "moduleId": "swift-core-mod",
  "topicId": "swift-generics",
  "difficulty": "expert",
  "type": "conceptual",
  "estimatedMinutes": 5,
  "frequency": "medium",
  "tags": [
    "Swift",
    "Generics",
    "WMO",
    "Compiler Optimization",
    "Inlining"
  ],
  "modelAnswer": "Without Whole Module Optimization (single-file compilation mode), the compiler compiles each Swift file independently. When File A calls a generic function defined in File B, File A cannot inspect File B's implementation to specialize it, forcing the call to go through an unspecialized witness table representation. When Whole Module Optimization (WMO) is enabled, the compiler analyzes all files in the module simultaneously. It observes concrete call sites across files, specializes generic functions for their concrete types, inlines them where beneficial, and devirtualizes witness table lookups across the entire module.",
  "keyPoints": [
    "Single-file compilation prevents cross-file generic specialization.",
    "WMO provides whole-module visibility, enabling aggressive specialization and inlining.",
    "Eliminates witness table overhead for internal generic code across files.",
    "Release builds enable WMO by default in Xcode to maximize runtime performance."
  ],
  "commonMistakes": [
    "Assuming generic specialization occurs across different files in Debug mode without WMO.",
    "Thinking WMO can specialize generics across separate Swift modules without @inlinable."
  ],
  "followUps": [
    {
      "id": "interview.swift.generics.141.f1",
      "parentQuestionId": "interview.swift.generics.141",
      "question": "How do you enable generic specialization across different Swift packages or frameworks?",
      "modelAnswer": "Mark public generic functions with `@inlinable` and `@usableFromInline`, which exports the function's SIL/AST into the module interface, allowing consuming modules to specialize it for their own concrete types.",
      "keyPoints": [
        "@inlinable allows cross-module generic specialization."
      ],
      "difficulty": "expert"
    }
  ],
  "relatedTopics": [
    "swift-generics",
    "swift-method-dispatch"
  ]
}
,
  {
  "id": "interview.swift.property_wrappers.142",
  "question": "What is a Property Wrapper in Swift, and why was it introduced in Swift 5.1?",
  "domainId": "swift",
  "moduleId": "swift-advanced-mod",
  "topicId": "swift-property-wrappers-keypaths",
  "difficulty": "foundational",
  "type": "conceptual",
  "estimatedMinutes": 4,
  "frequency": "high",
  "tags": [
    "Swift",
    "Property Wrappers",
    "Boilerplate",
    "@State",
    "Architecture"
  ],
  "modelAnswer": "A Property Wrapper (`@propertyWrapper`) is a language feature introduced in Swift 5.1 (SE-0258) that encapsulates repetitive property access, validation, persistence, and observation logic into a reusable struct or class. Before property wrappers, common behaviors like value clamping, thread synchronization, or `UserDefaults` backing required tedious computed property boilerplate on every single property. By annotating a type with `@propertyWrapper` and implementing the required `wrappedValue` property, developers define access logic once. The Swift compiler automatically synthesizes private backing storage and routes all read and write accesses through the wrapper, establishing clean declarative APIs like SwiftUI's `@State`, `@Binding`, and `@AppStorage`.",
  "keyPoints": [
    "Encapsulates repetitive getter/setter logic into reusable types.",
    "Requires the `@propertyWrapper` attribute and a `wrappedValue` property.",
    "Replaces verbose computed properties across models and UI state layers.",
    "Foundation of SwiftUI's state management (`@State`, `@Binding`, `@Environment`)."
  ],
  "commonMistakes": [
    "Believing property wrappers can only wrap value types; they can wrap classes and closures as well.",
    "Forgetting that the wrapper instance itself occupies memory inside the enclosing type."
  ],
  "followUps": [
    {
      "id": "interview.swift.property_wrappers.142.f1",
      "parentQuestionId": "interview.swift.property_wrappers.142",
      "question": "Can property wrappers be applied to local variables within function bodies?",
      "modelAnswer": "Yes, since Swift 5.5 (SE-0293), property wrappers can be applied to local variables inside functions and closures, whereas earlier Swift versions restricted them strictly to type-level stored properties.",
      "keyPoints": [
        "Local property wrappers added in Swift 5.5.",
        "Useful for local caching or validation algorithms."
      ],
      "difficulty": "intermediate"
    }
  ],
  "relatedTopics": [
    "swift-property-wrappers-keypaths",
    "swift-properties"
  ]
},
  {
  "id": "interview.swift.property_wrappers.143",
  "question": "What is the difference between `wrappedValue` and `projectedValue` in a Swift Property Wrapper?",
  "domainId": "swift",
  "moduleId": "swift-advanced-mod",
  "topicId": "swift-property-wrappers-keypaths",
  "difficulty": "foundational",
  "type": "conceptual",
  "estimatedMinutes": 4,
  "frequency": "high",
  "tags": [
    "Swift",
    "Property Wrappers",
    "wrappedValue",
    "projectedValue",
    "SwiftUI"
  ],
  "modelAnswer": "`wrappedValue` is the mandatory core property of any `@propertyWrapper` that manages and exposes the primary data being stored. When client code accesses the decorated property normally (e.g. `user.username`), the compiler routes the call directly to `wrappedValue`. In contrast, `projectedValue` is an optional secondary property that exposes additional capabilities, metadata, or an alternate representation of the wrapped value. It is accessed by prefixing the property name with a dollar sign (`$`). For example, in SwiftUI, `@State var count: Int` exposes an `Int` via `count` (`wrappedValue`), while `$count` (`projectedValue`) returns a `Binding<Int>` that allows child views to mutate the parent state. The type of `projectedValue` is completely flexible—it can return a `Binding`, a Combine `Publisher`, a validation state, or the wrapper instance itself.",
  "keyPoints": [
    "`wrappedValue` is mandatory and handles standard property read/write access.",
    "`projectedValue` is optional and accessed via the `$` prefix.",
    "`projectedValue` can be any type (e.g., `Binding<T>`, `Publisher`, validation boolean, or `self`).",
    "SwiftUI relies on `projectedValue` to create two-way bindings for controls like `TextField` and `Toggle`."
  ],
  "commonMistakes": [
    "Expecting the `$` syntax to work without explicitly defining a `var projectedValue` in the wrapper struct.",
    "Assuming `projectedValue` must return the same type as `wrappedValue`."
  ],
  "followUps": [
    {
      "id": "interview.swift.property_wrappers.143.f1",
      "parentQuestionId": "interview.swift.property_wrappers.143",
      "question": "Can `projectedValue` have a mutating setter?",
      "modelAnswer": "Yes, `projectedValue` can provide both `get` and `set`, allowing two-way assignment through the `$` syntax, although many wrappers declare it read-only.",
      "keyPoints": [
        "`projectedValue` can have a setter for two-way projection mutation."
      ],
      "difficulty": "intermediate"
    }
  ],
  "relatedTopics": [
    "swift-property-wrappers-keypaths",
    "swift-properties"
  ]
},
  {
  "id": "interview.swift.property_wrappers.144",
  "question": "How does the Swift compiler synthesize backing storage and property accessors under the hood for a `@propertyWrapper`?",
  "domainId": "swift",
  "moduleId": "swift-advanced-mod",
  "topicId": "swift-property-wrappers-keypaths",
  "difficulty": "intermediate",
  "type": "conceptual",
  "estimatedMinutes": 5,
  "frequency": "high",
  "tags": [
    "Swift",
    "Compiler",
    "Property Wrappers",
    "Backing Storage",
    "SIL"
  ],
  "modelAnswer": "When you declare `@Clamped(0...100) var health: Int = 100`, the Swift compiler performs syntactic transformation by desugaring the declaration into three distinct components: (1) A private backing stored property prefixed with an underscore, named `_health` of type `Clamped<Int>`, initialized via `Clamped(wrappedValue: 100, 0...100)`. (2) A computed property named `health` whose getter returns `_health.wrappedValue` and whose setter assigns `_health.wrappedValue = newValue`. (3) If the wrapper provides `projectedValue`, a computed property named `$health` whose getter returns `_health.projectedValue`. Within the declaring type's internal methods, you can directly access `_health` to inspect wrapper metadata or reconfigure the wrapper instance, while external callers only interact with the synthesized computed property and optional projection.",
  "keyPoints": [
    "Synthesizes private backing stored property `_propertyName` of the wrapper's type.",
    "Desugars the declared property into computed getters and setters delegating to `_propertyName.wrappedValue`.",
    "Synthesizes `$propertyName` computed property delegating to `_propertyName.projectedValue`.",
    "Backing storage `_propertyName` preserves access control level equal to or narrower than the declared property."
  ],
  "commonMistakes": [
    "Attempting to declare another property explicitly named `_health` in the same type, causing a naming collision error.",
    "Believing `_propertyName` is accessible as a public API from external modules."
  ],
  "followUps": [
    {
      "id": "interview.swift.property_wrappers.144.f1",
      "parentQuestionId": "interview.swift.property_wrappers.144",
      "question": "How does memberwise initializer synthesis behave on a struct containing property wrappers?",
      "modelAnswer": "The compiler synthesizes two initializer parameters: one accepting the wrapped value type (`health: Int`), and an alternative overload accepting the wrapper instance itself (`_health: Clamped<Int>`), allowing callers to customize wrapper configuration.",
      "keyPoints": [
        "Memberwise init accepts either wrappedValue or the wrapper instance itself."
      ],
      "difficulty": "advanced"
    }
  ],
  "relatedTopics": [
    "swift-property-wrappers-keypaths",
    "swift-initialization-deinitialization"
  ]
},
  {
  "id": "interview.swift.property_wrappers.145",
  "question": "How do SwiftUI's `@State` and `@Binding` use property wrappers and dynamic member lookup under the hood?",
  "domainId": "swift",
  "moduleId": "swift-advanced-mod",
  "topicId": "swift-property-wrappers-keypaths",
  "difficulty": "intermediate",
  "type": "architecture",
  "estimatedMinutes": 5,
  "frequency": "high",
  "tags": [
    "Swift",
    "SwiftUI",
    "@State",
    "@Binding",
    "DynamicMemberLookup"
  ],
  "modelAnswer": "`@State` and `@Binding` are canonical property wrappers that drive SwiftUI's declarative state-driven UI. `@State` allocates storage in a separate heap-allocated graph storage node managed by SwiftUI, keeping state independent of transient struct view recreations. Accessing `wrappedValue` triggers dependency tracking so the view graph knows when to invalidate and redraw. Its `projectedValue` returns a `Binding<Value>`. `@Binding` itself is a property wrapper that does not hold source-of-truth storage; instead, its `wrappedValue` evaluates closures (`get: () -> Value, set: (Value) -> Void`) delegating to the parent `@State`. Furthermore, `Binding` is annotated with `@dynamicMemberLookup`, implementing a subscript taking `KeyPath<Value, Subject>`. This enables dot-syntax chaining (e.g. `$user.address.street`) to produce derived `Binding<String>` instances on child properties with complete compile-time type safety.",
  "keyPoints": [
    "`@State` stores data out-of-line in SwiftUI's internal graph runtime, surviving struct view rebuilds.",
    "`@State`'s `projectedValue` returns a `Binding<Value>`.",
    "`@Binding` wraps getter and setter closures to read/write upstream state without owning it.",
    "`Binding` uses `@dynamicMemberLookup` and `KeyPath` subscripting to project nested bindings automatically."
  ],
  "commonMistakes": [
    "Initializing `@State` with dynamic parameters inside a SwiftUI `init()`, which ignores updates when the parent view re-evaluates.",
    "Confusing `@Binding` (reference to upstream state) with a standalone independent copy."
  ],
  "followUps": [
    {
      "id": "interview.swift.property_wrappers.145.f1",
      "parentQuestionId": "interview.swift.property_wrappers.145",
      "question": "Why must `@State` properties be marked `private` in SwiftUI?",
      "modelAnswer": "Marking `@State` private enforces view encapsulation, ensuring parent views cannot bypass SwiftUI's view lifecycle by directly overwriting state through the memberwise initializer.",
      "keyPoints": [
        "`@State` privacy prevents unintended state overrides from outside the view."
      ],
      "difficulty": "intermediate"
    }
  ],
  "relatedTopics": [
    "swift-property-wrappers-keypaths",
    "swift-properties"
  ]
},
  {
  "id": "interview.swift.property_wrappers.146",
  "question": "Explain the Swift KeyPath type hierarchy from `AnyKeyPath` down to `ReferenceWritableKeyPath`.",
  "domainId": "swift",
  "moduleId": "swift-advanced-mod",
  "topicId": "swift-property-wrappers-keypaths",
  "difficulty": "intermediate",
  "type": "comparison",
  "estimatedMinutes": 5,
  "frequency": "high",
  "tags": [
    "Swift",
    "KeyPaths",
    "Type Hierarchy",
    "WritableKeyPath",
    "ReferenceWritableKeyPath"
  ],
  "modelAnswer": "Swift defines a strongly typed 5-level class hierarchy for KeyPaths: (1) `AnyKeyPath`: The root class, completely type-erased with unknown Root and Value. Useful for heterogeneous storage or runtime introspection. (2) `PartialKeyPath<Root>`: Subclasses `AnyKeyPath`; the `Root` type is statically known, but the `Value` type is erased (returns `Any`). Useful for validating multiple distinct properties on a known struct or class. (3) `KeyPath<Root, Value>`: Subclasses `PartialKeyPath`; both `Root` and `Value` are statically typed for read-only access. (4) `WritableKeyPath<Root, Value>`: Subclasses `KeyPath`; provides read-write access for types with value semantics. Mutating the target property requires the root instance to be a mutable variable (`var`). (5) `ReferenceWritableKeyPath<Root, Value>`: Subclasses `WritableKeyPath`; specifically applies to reference types (classes and actors). Because mutating an object property modifies heap contents rather than the reference itself, it can write to a property on an immutable `let` reference.",
  "keyPoints": [
    "`AnyKeyPath` -> `PartialKeyPath<Root>` -> `KeyPath<Root, Value>`.",
    "`KeyPath<Root, Value>` -> `WritableKeyPath<Root, Value>` -> `ReferenceWritableKeyPath<Root, Value>`.",
    "`WritableKeyPath` requires a mutable `var` instance on value types.",
    "`ReferenceWritableKeyPath` allows property mutation even on a constant `let` class instance.",
    "Swift 5.2 enables KeyPaths to act directly as functions of type `(Root) -> Value`."
  ],
  "commonMistakes": [
    "Attempting to use `WritableKeyPath` to mutate a constant `let` struct instance (compile error).",
    "Confusing Objective-C stringly-typed `#keyPath` with Swift's statically typed `\\Type.property`."
  ],
  "followUps": [
    {
      "id": "interview.swift.property_wrappers.146.f1",
      "parentQuestionId": "interview.swift.property_wrappers.146",
      "question": "How does Swift 5.2's KeyPath-as-function feature simplify functional pipelines?",
      "modelAnswer": "Anywhere a closure of type `(Root) -> Value` is expected (like `.map`, `.filter`, or `.compactMap`), you can pass a KeyPath directly (e.g. `users.map(\\.name)` instead of `users.map { $0.name }`).",
      "keyPoints": [
        "KeyPaths can be passed directly into higher-order functions expecting `(Root) -> Value`."
      ],
      "difficulty": "foundational"
    }
  ],
  "relatedTopics": [
    "swift-property-wrappers-keypaths",
    "swift-closures"
  ]
},
  {
  "id": "interview.swift.property_wrappers.147",
  "question": "Analyze this code: What happens when a property wrapper setter causes re-entrancy via property observers?",
  "domainId": "swift",
  "moduleId": "swift-advanced-mod",
  "topicId": "swift-property-wrappers-keypaths",
  "difficulty": "intermediate",
  "type": "code-analysis",
  "estimatedMinutes": 5,
  "frequency": "medium",
  "tags": [
    "Swift",
    "Property Wrappers",
    "Observers",
    "Re-entrancy",
    "Debugging"
  ],
  "modelAnswer": "If an enclosing type defines a `didSet` on a wrapped property, and that `didSet` modifies the property again, or if the wrapper's internal `wrappedValue` setter triggers a secondary mutation cascade, you can trigger re-entrancy traps or an infinite loop resulting in a stack overflow. Consider: `struct Form { @Clamped(0...100) var score: Int = 0 { didSet { if score == 100 { score = 99 } } } }`. When `score` is set to `100`, the wrapper clamps it to `100`, assigns it, and exits. Then `Form`'s `didSet` runs, sees `100`, and sets `score = 99`. This triggers another setter call and another `didSet`. If the condition did not terminate, it would recurse infinitely. To avoid this, mutation logic should reside strictly inside the wrapper's `wrappedValue` setter rather than mixing wrapper-level constraints with enclosing type property observers.",
  "keyPoints": [
    "`didSet` on a wrapped property runs AFTER the wrapper's `wrappedValue` setter finishes.",
    "Mutating a property inside its own `didSet` causes re-entrant invocation of the setter.",
    "Wrapper encapsulation should contain all normalization logic to prevent cascading observer cycles."
  ],
  "commonMistakes": [
    "Assuming property observers like `willSet`/`didSet` bypass the property wrapper's `wrappedValue` setter (they do not).",
    "Using enclosing property observers to enforce validation rules that should belong inside the wrapper type."
  ],
  "followUps": [
    {
      "id": "interview.swift.property_wrappers.147.f1",
      "parentQuestionId": "interview.swift.property_wrappers.147",
      "question": "Does `willSet` observe the value before or after the wrapper clamps or modifies it?",
      "modelAnswer": "`willSet` on the enclosing type receives `newValue` as passed into the assignment, but before the wrapper's setter body executes and applies clamping or transformations.",
      "keyPoints": [
        "`willSet` receives raw input before wrapper normalization occurs."
      ],
      "difficulty": "advanced"
    }
  ],
  "relatedTopics": [
    "swift-property-wrappers-keypaths",
    "swift-properties"
  ]
},
  {
  "id": "interview.swift.property_wrappers.148",
  "question": "What happens when a mutating Property Wrapper is applied to a Struct vs a Class?",
  "domainId": "swift",
  "moduleId": "swift-advanced-mod",
  "topicId": "swift-property-wrappers-keypaths",
  "difficulty": "advanced",
  "type": "comparison",
  "estimatedMinutes": 5,
  "frequency": "high",
  "tags": [
    "Swift",
    "Value Semantics",
    "Property Wrappers",
    "Mutating",
    "CoW"
  ],
  "modelAnswer": "When a property wrapper struct defines a mutating setter on `wrappedValue` (e.g. `mutating func set`), using that wrapper on a `struct` property means accessing the setter mutates the enclosing struct itself. Consequently, any method modifying the wrapped property must be marked `mutating`, and the struct instance must be stored in a `var`. If the struct instance is copied, the wrapper's backing storage is duplicated because structs possess value semantics; changes to one copy will not affect the other. Conversely, when a property wrapper is applied to a `class`, modifying `wrappedValue` does not mutate the reference identity of the class instance. If the wrapper needs to be shared across multiple struct copies with shared reference persistence, the wrapper itself must be a class, or hold a private reference box internally (with explicit thread-synchronization or Copy-on-Write handling).",
  "keyPoints": [
    "Mutating wrapper on a struct forces value mutation up the enclosing struct hierarchy.",
    "Struct value semantics duplicate wrapper backing storage when the struct is copied.",
    "Class instances allow wrapper mutations even if the variable reference is declared with `let` if the wrapper uses reference semantics.",
    "Shared mutable state across struct copies requires reference-backed wrappers or an external state graph."
  ],
  "commonMistakes": [
    "Expecting changes made to a wrapped property in a struct to reflect across other copies of that struct.",
    "Forgetting that mutating wrapper setters cannot be invoked on a constant `let` struct."
  ],
  "followUps": [
    {
      "id": "interview.swift.property_wrappers.148.f1",
      "parentQuestionId": "interview.swift.property_wrappers.148",
      "question": "Can a property wrapper access the enclosing `self` instance?",
      "modelAnswer": "Yes, via the static subscript `subscript(instance:observedType:keyPath:)`, a wrapper can intercept mutations with a reference to the enclosing type instance, which is how SwiftUI's `@Published` informs `ObservableObject` of changes.",
      "keyPoints": [
        "Static enclosing-subscript enables wrappers to notify or access enclosing instances."
      ],
      "difficulty": "expert"
    }
  ],
  "relatedTopics": [
    "swift-property-wrappers-keypaths",
    "swift-struct-vs-class"
  ]
},
  {
  "id": "interview.swift.property_wrappers.149",
  "question": "How do you implement a thread-safe property wrapper or memoization wrapper using `@dynamicMemberLookup` and KeyPaths?",
  "domainId": "swift",
  "moduleId": "swift-advanced-mod",
  "topicId": "swift-property-wrappers-keypaths",
  "difficulty": "intermediate",
  "type": "code-analysis",
  "estimatedMinutes": 5,
  "frequency": "medium",
  "tags": [
    "Swift",
    "Thread Safety",
    "Property Wrappers",
    "Concurrency",
    "Locks"
  ],
  "modelAnswer": "To implement a thread-safe property wrapper (like `@Atomic` or `@ThreadSafe`), you define a wrapper struct holding a private lock (such as `os_unfair_lock` or `NSLock`) and the value: `@propertyWrapper struct Atomic<Value> { private var value: Value; private let lock = NSLock(); init(wrappedValue: Value) { self.value = wrappedValue }; var wrappedValue: Value { get { lock.lock(); defer { lock.unlock() }; return value }; set { lock.lock(); defer { lock.unlock() }; value = newValue } }; var projectedValue: Atomic<Value> { self } }`. When combined with `@dynamicMemberLookup`, the wrapper can expose a `mutate` helper via KeyPaths, allowing callers to execute compound read-modify-write operations atomically (e.g., `account.$balance.mutate { $0 += 50 }`), avoiding race conditions that occur when reading and writing are two separate locked transactions.",
  "keyPoints": [
    "Synchronizes access inside `wrappedValue` getter and setter using a synchronization primitive.",
    "Exposes wrapper operations (like atomic compare-and-swap or locked mutate) via `projectedValue`.",
    "Atomicity at the property getter/setter level does not guarantee atomicity for compound operations unless a closure-based lock helper is provided."
  ],
  "commonMistakes": [
    "Assuming individual atomic get and set prevent race conditions during compound mutations like `counter += 1`.",
    "Using `os_unfair_lock` inside a value-type struct that moves in memory, which invalidates the lock pointer (locks must have stable memory addresses)."
  ],
  "followUps": [
    {
      "id": "interview.swift.property_wrappers.149.f1",
      "parentQuestionId": "interview.swift.property_wrappers.149",
      "question": "Why should property wrappers holding locks be careful about memory copying?",
      "modelAnswer": "Because copying a struct copies the lock by value, creating two distinct locks guarding independent copies of the data, which completely breaks synchronization; lock wrappers should store locks in a class reference.",
      "keyPoints": [
        "Locks must be reference-typed to prevent splitting across value copies."
      ],
      "difficulty": "advanced"
    }
  ],
  "relatedTopics": [
    "swift-property-wrappers-keypaths",
    "swift-properties"
  ]
}
];
