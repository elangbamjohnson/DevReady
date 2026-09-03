import type {
  CurriculumDomain,
  CurriculumModule,
  CurriculumTopic,
  TopicCategory,
} from '@/types';

import { swiftDomain } from './domains/swift';
import { objcDomain } from './domains/objc';
import { concurrencyDomain } from './domains/concurrency';
import { combineDomain } from './domains/combine';
import { swiftuiDomain } from './domains/swiftui';
import { uikitDomain } from './domains/uikit';
import { foundationDomain } from './domains/foundation';
import { networkingDomain } from './domains/networking';
import { persistenceDomain } from './domains/persistence';
import { architectureDomain } from './domains/architecture';
import { appLifecycleDomain, backgroundDomain } from './domains/lifecycle-background';
import { notificationsDomain, locationDomain } from './domains/notifications-location';
import { mediaDomain, securityDomain } from './domains/media-security';
import { testingDomain, debuggingDomain } from './domains/testing-debugging';
import { performanceDomain, accessibilityDomain } from './domains/performance-accessibility';
import { appleFrameworksDomain, widgetsDomain } from './domains/frameworks-widgets';
import { storeKitDomain, cicdDomain } from './domains/storekit-cicd';
import { systemDesignDomain, productionDomain, coremlDomain } from './domains/systems-production-ai';

// ─── All 27 Top-Level Curriculum Domains ─────────────────────────────────────

export const CURRICULUM_DOMAINS: CurriculumDomain[] = [
  swiftDomain,
  objcDomain,
  concurrencyDomain,
  combineDomain,
  swiftuiDomain,
  uikitDomain,
  foundationDomain,
  networkingDomain,
  persistenceDomain,
  architectureDomain,
  appLifecycleDomain,
  backgroundDomain,
  notificationsDomain,
  locationDomain,
  mediaDomain,
  securityDomain,
  testingDomain,
  debuggingDomain,
  performanceDomain,
  accessibilityDomain,
  appleFrameworksDomain,
  widgetsDomain,
  storeKitDomain,
  cicdDomain,
  systemDesignDomain,
  productionDomain,
  coremlDomain,
];

// ─── Flattened Modules & Topics ──────────────────────────────────────────────

export const CURRICULUM_MODULES: CurriculumModule[] = CURRICULUM_DOMAINS.flatMap(
  (d) => d.modules
);

export const CURRICULUM_TOPICS: CurriculumTopic[] = CURRICULUM_MODULES.flatMap(
  (m) => m.topics
);

// ─── Query Helper Interface ──────────────────────────────────────────────────

export const curriculumRepository = {
  /** Get all 27 curriculum domains */
  getDomains(): CurriculumDomain[] {
    return CURRICULUM_DOMAINS;
  },

  /** Find a domain by its TopicCategory ID */
  getDomainById(id: TopicCategory): CurriculumDomain | undefined {
    // Handle 'memory' alias pointing to debugging/persistence
    if (id === 'memory') {
      return debuggingDomain;
    }
    return CURRICULUM_DOMAINS.find((d) => d.id === id);
  },

  /** Get all modules for a specific domain */
  getModulesByDomain(domainId: TopicCategory): CurriculumModule[] {
    const domain = this.getDomainById(domainId);
    return domain ? domain.modules : [];
  },

  /** Get a specific module by ID */
  getModuleById(moduleId: string): CurriculumModule | undefined {
    return CURRICULUM_MODULES.find((m) => m.id === moduleId);
  },

  /** Find a topic by its unique ID */
  getTopicById(topicId: string): CurriculumTopic | undefined {
    return CURRICULUM_TOPICS.find((t) => t.id === topicId);
  },

  /** Find a topic by its URL slug */
  getTopicBySlug(slug: string): CurriculumTopic | undefined {
    return CURRICULUM_TOPICS.find((t) => t.slug === slug);
  },

  /** Find all topics for a given category/domain */
  getTopicsByDomain(domainId: TopicCategory): CurriculumTopic[] {
    return CURRICULUM_TOPICS.filter((t) => t.domainId === domainId);
  },

  /** Search across all domains, modules, topics, and aliases */
  search(query: string): CurriculumTopic[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return CURRICULUM_TOPICS.filter((t) => {
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchDesc = t.description.toLowerCase().includes(q);
      const matchTags = t.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchAliases = t.aliases?.some((alias) => alias.toLowerCase().includes(q)) ?? false;
      const matchDomain = t.domainId.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchTags || matchAliases || matchDomain;
    });
  },
};
