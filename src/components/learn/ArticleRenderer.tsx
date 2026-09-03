'use client';

import { Fragment } from 'react';
import { CodeBlock } from './CodeBlock';
import { Callout } from './Callout';
import { QuickAnswer } from './QuickAnswer';
import { ContentTable, ComparisonTable } from './ComparisonTable';
import { InterviewSection } from './InterviewSection';
import { RelatedTopics } from './RelatedTopics';
import { topicRepository } from '@/data/topics/index';
import type { ContentBlock } from '@/types';

// ─── Inline text formatter (`code` → <code>) ─────────────────────────────────

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="px-1.5 py-0.5 rounded bg-surface-2 font-mono text-[0.875em] text-accent border border-border-subtle">
              {part.slice(1, -1)}
            </code>
          );
        }
        // Bold via **text**
        const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
        return (
          <Fragment key={i}>
            {boldParts.map((bp, j) => {
              if (bp.startsWith('**') && bp.endsWith('**')) {
                return <strong key={j} className="font-semibold text-text-primary">{bp.slice(2, -2)}</strong>;
              }
              return <span key={j}>{bp}</span>;
            })}
          </Fragment>
        );
      })}
    </>
  );
}

// ─── Article Renderer ─────────────────────────────────────────────────────────

interface ArticleRendererProps {
  blocks: ContentBlock[];
  topicId?: string;
  category?: string;
}

export function ArticleRenderer({ blocks, topicId, category }: ArticleRendererProps) {
  return (
    <div className="article-content">
      {blocks.map((block) => {
        switch (block.type) {
          case 'quickAnswer':
            return <QuickAnswer key={block.id} content={block.content} />;

          case 'heading': {
            const headingId = `heading-${block.id}`;
            if (block.level === 2) {
              return (
                <h2
                  key={block.id}
                  id={headingId}
                  className="text-lg sm:text-xl font-bold text-text-primary mt-10 mb-4 scroll-mt-24 tracking-tight"
                >
                  {block.content}
                </h2>
              );
            }
            return (
              <h3
                key={block.id}
                id={headingId}
                className="text-base sm:text-lg font-semibold text-text-primary mt-6 mb-3 scroll-mt-24"
              >
                {block.content}
              </h3>
            );
          }

          case 'paragraph':
            return (
              <p key={block.id} className="text-sm sm:text-base text-text-secondary leading-relaxed mb-5">
                <InlineText text={block.content} />
              </p>
            );

          case 'code':
            return (
              <CodeBlock
                key={block.id}
                code={block.content}
                language={block.language}
                filename={block.filename}
                caption={block.caption}
              />
            );

          case 'callout':
            return (
              <Callout
                key={block.id}
                variant={block.variant}
                title={block.title}
                content={block.content}
              />
            );

          case 'list':
            return block.ordered ? (
              <ol key={block.id} className="list-decimal list-inside space-y-2 mb-5 text-sm sm:text-base text-text-secondary">
                {block.items.map((item, i) => (
                  <li key={i} className="leading-relaxed pl-1">
                    <InlineText text={item} />
                  </li>
                ))}
              </ol>
            ) : (
              <ul key={block.id} className="list-disc list-inside space-y-2 mb-5 text-sm sm:text-base text-text-secondary">
                {block.items.map((item, i) => (
                  <li key={i} className="leading-relaxed pl-1">
                    <InlineText text={item} />
                  </li>
                ))}
              </ul>
            );

          case 'table':
            return <ContentTable key={block.id} block={block} />;

          case 'comparison':
            return <ComparisonTable key={block.id} block={block} />;

          case 'interview':
            return <InterviewSection key={block.id} block={block} topicId={topicId} category={category} />;

          case 'relatedTopics': {
            const topics = block.topicIds
              .map(id => topicRepository.getTopicById(id))
              .filter(Boolean) as import('@/types').ArticleTopic[];
            return <RelatedTopics key={block.id} topics={topics} />;
          }

          case 'divider':
            return <hr key={block.id} className="my-8 border-border-subtle" />;

          default:
            return null;
        }
      })}
    </div>
  );
}
