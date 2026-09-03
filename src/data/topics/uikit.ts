import type { ArticleTopic } from '@/types';

export const uikitTopics: ArticleTopic[] = [
  {
    id: 'uikit-lifecycle',
    slug: 'viewcontroller-lifecycle',
    title: 'UIViewController Lifecycle',
    category: 'uikit',
    group: 'View Controllers',
    description: 'Master the UIViewController lifecycle: viewDidLoad, viewWillAppear, viewDidAppear, and deallocation order.',
    difficulty: 'junior',
    estimatedTime: 10,
    language: 'swift',
    version: { platform: 'iOS', version: '26', status: 'current', lastReviewed: '2026-09-01' },
    interviewRelevance: 'high',
    tags: ['lifecycle', 'viewcontroller', 'viewdidload', 'viewwillappear'],
    relatedTopics: ['uikit-tableview', 'uikit-collectionview'],
    nextTopic: 'uikit-tableview',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: 'A `UIViewController` goes through a predictable sequence of lifecycle callbacks: `viewDidLoad` (once), then `viewWillAppear`/`viewDidAppear` (each presentation), then `viewWillDisappear`/`viewDidDisappear`. Understanding when to perform actions in each is critical for correctness and performance.',
      },
      {
        type: 'code',
        id: 'code-lifecycle',
        language: 'swift',
        content: `class ProfileViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Called once — set up UI, load static data
        setupUI()
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        // Called every time view appears — refresh data
        refreshUserData()
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        // View is fully visible — start animations, analytics
        startAnalyticsTimer()
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        // About to leave — save state, stop timers
        stopAnalyticsTimer()
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        // Fully gone — cancel network requests
        cancelPendingRequests()
    }
}`,
      },
      {
        type: 'callout',
        id: 'c-super',
        variant: 'important',
        title: 'Always call super',
        content: 'Always call the super implementation of lifecycle methods. Failing to do so can cause subtle, hard-to-debug layout and state issues — especially in complex view controller hierarchies.',
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'What is the full UIViewController lifecycle?',
          'When should you set up UI — viewDidLoad or init?',
          'What is the difference between viewWillAppear and viewDidAppear?',
          'When is viewDidLoad called relative to the view\'s frame being set?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['uikit-tableview'] },
    ],
  },

  {
    id: 'uikit-tableview',
    slug: 'uitableview',
    title: 'UITableView & Diffable Data Source',
    category: 'uikit',
    group: 'Collections',
    description: 'Build performant table views using UITableViewDiffableDataSource and NSDiffableDataSourceSnapshot.',
    difficulty: 'mid',
    estimatedTime: 15,
    language: 'swift',
    version: { platform: 'iOS', version: '13', status: 'current', lastReviewed: '2026-09-01', introducedIn: 'iOS 13' },
    interviewRelevance: 'high',
    tags: ['tableview', 'diffable', 'datasource', 'snapshot'],
    relatedTopics: ['uikit-lifecycle', 'uikit-collectionview'],
    previousTopic: 'uikit-lifecycle',
    nextTopic: 'uikit-collectionview',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: '`UITableViewDiffableDataSource` (iOS 13+) replaces the old delegate-based data source. You describe the desired state via `NSDiffableDataSourceSnapshot` and call `apply()`. UIKit automatically calculates and animates the difference — no more manual `insertRows`/`deleteRows`.',
      },
      {
        type: 'code',
        id: 'code-diffable',
        language: 'swift',
        content: `enum Section { case main }

class UsersViewController: UIViewController {
    var tableView: UITableView!
    var dataSource: UITableViewDiffableDataSource<Section, User>!

    override func viewDidLoad() {
        super.viewDidLoad()
        setupTableView()
        configureDataSource()
    }

    func configureDataSource() {
        dataSource = UITableViewDiffableDataSource(tableView: tableView) { tableView, indexPath, user in
            let cell = tableView.dequeueReusableCell(withIdentifier: "UserCell", for: indexPath)
            var config = cell.defaultContentConfiguration()
            config.text = user.name
            cell.contentConfiguration = config
            return cell
        }
    }

    func applySnapshot(users: [User], animated: Bool = true) {
        var snapshot = NSDiffableDataSourceSnapshot<Section, User>()
        snapshot.appendSections([.main])
        snapshot.appendItems(users)
        dataSource.apply(snapshot, animatingDifferences: animated)
    }
}`,
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'high',
        questions: [
          'Why is DiffableDataSource preferred over the traditional delegate approach?',
          'What requirements must items meet to work with DiffableDataSource?',
          'How do you animate row insertions and deletions with DiffableDataSource?',
          'How does DiffableDataSource handle section reordering?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['uikit-lifecycle', 'uikit-collectionview'] },
    ],
  },

  {
    id: 'uikit-collectionview',
    slug: 'uicollectionview',
    title: 'UICollectionView Compositional Layout',
    category: 'uikit',
    group: 'Collections',
    description: 'Build complex, performant collection view layouts using Compositional Layout with sections and groups.',
    difficulty: 'senior',
    estimatedTime: 20,
    language: 'swift',
    version: { platform: 'iOS', version: '13', status: 'current', lastReviewed: '2026-09-01', introducedIn: 'iOS 13' },
    interviewRelevance: 'medium',
    tags: ['collectionview', 'compositional-layout', 'orthogonal', 'supplementary'],
    relatedTopics: ['uikit-tableview', 'uikit-lifecycle'],
    previousTopic: 'uikit-tableview',
    content: [
      {
        type: 'quickAnswer',
        id: 'qa',
        content: '`UICollectionViewCompositionalLayout` (iOS 13+) expresses layouts declaratively through a hierarchy of **Item → Group → Section**. Each section can have independent scrolling, spacing, and supplementary views, allowing complex App Store-style layouts without subclassing.',
      },
      {
        type: 'code',
        id: 'code-comp',
        language: 'swift',
        content: `func createLayout() -> UICollectionViewLayout {
    UICollectionViewCompositionalLayout { sectionIndex, environment in
        // Item: fills the group
        let item = NSCollectionLayoutItem(
            layoutSize: NSCollectionLayoutSize(
                widthDimension: .fractionalWidth(1),
                heightDimension: .fractionalHeight(1)
            )
        )

        // Group: 3 columns, fixed height
        let group = NSCollectionLayoutGroup.horizontal(
            layoutSize: NSCollectionLayoutSize(
                widthDimension: .fractionalWidth(1),
                heightDimension: .absolute(120)
            ),
            subitem: item,
            count: 3
        )
        group.interItemSpacing = .fixed(8)

        let section = NSCollectionLayoutSection(group: group)
        section.interGroupSpacing = 8
        section.contentInsets = NSDirectionalEdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16)
        return section
    }
}`,
      },
      {
        type: 'interview',
        id: 'interview',
        relevance: 'medium',
        questions: [
          'What is the hierarchy in Compositional Layout?',
          'How do you achieve horizontally scrolling sections?',
          'How do you add section headers with Compositional Layout?',
          'How does Compositional Layout differ from Flow Layout?',
        ],
      },
      { type: 'relatedTopics', id: 'related', topicIds: ['uikit-tableview'] },
    ],
  },
];
