import {
  CURRICULUM_DOMAINS,
  CURRICULUM_MODULES,
  CURRICULUM_TOPICS,
} from '@/data/curriculum';

export interface ValidationIssue {
  severity: 'error' | 'warning';
  entityType: 'domain' | 'module' | 'topic';
  entityId: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  totalDomains: number;
  totalModules: number;
  totalTopics: number;
}

const VALID_DIFFICULTIES = [
  'foundational',
  'intermediate',
  'advanced',
  'expert',
  'junior',
  'mid',
  'senior',
  'staff',
];

const VALID_STATUSES = [
  'available',
  'coming-soon',
  'planned',
  'deprecated',
  'needs-review',
];

const VALID_PRIORITIES = ['P0', 'P1', 'P2', 'P3'];

/**
 * Validates the entire curriculum taxonomy for structural consistency,
 * duplicate identifiers, broken relationships, and invalid metadata.
 */
export function validateCurriculum(): ValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  const domainIds = new Set<string>();
  const moduleIds = new Set<string>();
  const topicIds = new Set<string>();
  const topicSlugs = new Set<string>();

  // 1. Validate Domains
  CURRICULUM_DOMAINS.forEach((domain) => {
    if (domainIds.has(domain.id)) {
      errors.push({
        severity: 'error',
        entityType: 'domain',
        entityId: domain.id,
        message: `Duplicate Domain ID: "${domain.id}"`,
      });
    }
    domainIds.add(domain.id);

    if (!domain.title || !domain.number) {
      errors.push({
        severity: 'error',
        entityType: 'domain',
        entityId: domain.id,
        message: `Domain "${domain.id}" is missing required title or number.`,
      });
    }

    if (domain.modules.length === 0) {
      warnings.push({
        severity: 'warning',
        entityType: 'domain',
        entityId: domain.id,
        message: `Domain "${domain.id}" has no modules defined.`,
      });
    }
  });

  // 2. Validate Modules
  CURRICULUM_MODULES.forEach((module) => {
    if (moduleIds.has(module.id)) {
      errors.push({
        severity: 'error',
        entityType: 'module',
        entityId: module.id,
        message: `Duplicate Module ID: "${module.id}"`,
      });
    }
    moduleIds.add(module.id);

    if (!domainIds.has(module.domainId)) {
      errors.push({
        severity: 'error',
        entityType: 'module',
        entityId: module.id,
        message: `Module "${module.id}" references non-existent domain "${module.domainId}".`,
      });
    }

    if (module.topics.length === 0) {
      warnings.push({
        severity: 'warning',
        entityType: 'module',
        entityId: module.id,
        message: `Module "${module.id}" has no topics defined.`,
      });
    }
  });

  // 3. Validate Topics
  CURRICULUM_TOPICS.forEach((topic) => {
    // Unique ID check
    if (topicIds.has(topic.id)) {
      errors.push({
        severity: 'error',
        entityType: 'topic',
        entityId: topic.id,
        message: `Duplicate Topic ID: "${topic.id}"`,
      });
    }
    topicIds.add(topic.id);

    // Unique Slug check
    if (topicSlugs.has(topic.slug)) {
      errors.push({
        severity: 'error',
        entityType: 'topic',
        entityId: topic.id,
        message: `Duplicate Topic Slug: "${topic.slug}"`,
      });
    }
    topicSlugs.add(topic.slug);

    // Parent references check
    if (!domainIds.has(topic.domainId)) {
      errors.push({
        severity: 'error',
        entityType: 'topic',
        entityId: topic.id,
        message: `Topic "${topic.id}" references unknown domain "${topic.domainId}".`,
      });
    }

    if (!moduleIds.has(topic.moduleId)) {
      errors.push({
        severity: 'error',
        entityType: 'topic',
        entityId: topic.id,
        message: `Topic "${topic.id}" references unknown module "${topic.moduleId}".`,
      });
    }

    // Enum validation
    if (!VALID_DIFFICULTIES.includes(topic.difficulty)) {
      errors.push({
        severity: 'error',
        entityType: 'topic',
        entityId: topic.id,
        message: `Topic "${topic.id}" has invalid difficulty: "${topic.difficulty}".`,
      });
    }

    if (!VALID_STATUSES.includes(topic.status)) {
      errors.push({
        severity: 'error',
        entityType: 'topic',
        entityId: topic.id,
        message: `Topic "${topic.id}" has invalid status: "${topic.status}".`,
      });
    }

    if (!VALID_PRIORITIES.includes(topic.priority)) {
      errors.push({
        severity: 'error',
        entityType: 'topic',
        entityId: topic.id,
        message: `Topic "${topic.id}" has invalid priority: "${topic.priority}".`,
      });
    }

    // Relationship reference validation
    topic.prerequisites?.forEach((prereqId) => {
      if (!CURRICULUM_TOPICS.some((t) => t.id === prereqId)) {
        warnings.push({
          severity: 'warning',
          entityType: 'topic',
          entityId: topic.id,
          message: `Topic "${topic.id}" references unknown prerequisite "${prereqId}".`,
        });
      }
    });

    topic.relatedTopics?.forEach((relId) => {
      if (!CURRICULUM_TOPICS.some((t) => t.id === relId)) {
        warnings.push({
          severity: 'warning',
          entityType: 'topic',
          entityId: topic.id,
          message: `Topic "${topic.id}" references unknown relatedTopic "${relId}".`,
        });
      }
    });

    if (topic.previousTopic && !CURRICULUM_TOPICS.some((t) => t.id === topic.previousTopic)) {
      warnings.push({
        severity: 'warning',
        entityType: 'topic',
        entityId: topic.id,
        message: `Topic "${topic.id}" references unknown previousTopic "${topic.previousTopic}".`,
      });
    }

    if (topic.nextTopic && !CURRICULUM_TOPICS.some((t) => t.id === topic.nextTopic)) {
      warnings.push({
        severity: 'warning',
        entityType: 'topic',
        entityId: topic.id,
        message: `Topic "${topic.id}" references unknown nextTopic "${topic.nextTopic}".`,
      });
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    totalDomains: CURRICULUM_DOMAINS.length,
    totalModules: CURRICULUM_MODULES.length,
    totalTopics: CURRICULUM_TOPICS.length,
  };
}

// Auto-run validation in non-production builds for instant feedback
if (process.env.NODE_ENV !== 'production') {
  const result = validateCurriculum();
  if (!result.valid) {
    console.error(`[CurriculumValidator] ❌ Validation failed with ${result.errors.length} errors:`);
    result.errors.forEach((e) => console.error(`  • [${e.entityType}:${e.entityId}] ${e.message}`));
  }
}
