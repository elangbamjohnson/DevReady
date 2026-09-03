'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Clock, CheckCircle2 } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { DifficultyBadge } from '@/components/common/Badge';
import { BookmarkButton } from '@/components/learn/BookmarkButton';
import { VersionBadge } from '@/components/learn/VersionBadge';
import { ReadingProgress } from '@/components/learn/ReadingProgress';
import { ArticleRenderer } from '@/components/learn/ArticleRenderer';
import { ArticleTOCDesktop, ArticleTOCMobile } from '@/components/learn/ArticleTOC';
import { PreviousNext } from '@/components/learn/PreviousNext';
import { topicRepository, categoryMeta } from '@/data/topics/index';
import { markTopicComplete, isTopicComplete } from '@/lib/progressStore';

interface TopicPageProps {
  params: Promise<{ category: string; topic: string }>;
}

export default function TopicPage({ params }: TopicPageProps) {
  const { category, topic: topicSlug } = use(params);

  const artTopic = topicRepository.getTopicBySlug(topicSlug);
  const meta = categoryMeta.find(c => c.slug === category);

  if (!artTopic || !meta || artTopic.category !== meta.category) {
    notFound();
  }

  const { previous, next } = topicRepository.getAdjacentTopics(artTopic.id);

  // Lazy init from localStorage — avoids effect-triggered cascading renders
  const [completed, setCompleted] = useState(() => {
    if (typeof window === 'undefined') return false;
    return isTopicComplete(artTopic.id);
  });

  const handleMarkComplete = () => {
    markTopicComplete(artTopic.id);
    setCompleted(true);
  };

  return (
    <>
      <ReadingProgress />
      <AppShell>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-text-tertiary mb-6 flex-wrap">
            <Link href="/learn" className="hover:text-text-primary transition-colors">Learn</Link>
            <ChevronRight className="w-3 h-3 shrink-0" aria-hidden="true" />
            <Link href={`/learn/${category}`} className="hover:text-text-primary transition-colors">
              {meta.label}
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0" aria-hidden="true" />
            <span className="text-text-secondary font-medium hidden sm:block">{artTopic.group}</span>
            <ChevronRight className="w-3 h-3 shrink-0 hidden sm:block" aria-hidden="true" />
            <span className="text-text-secondary font-medium truncate">{artTopic.title}</span>
          </nav>

          {/* Three-column layout */}
          <div className="flex gap-8 xl:gap-12">
            {/* ── Main Content ── */}
            <main className="flex-1 min-w-0">
              {/* Article Header */}
              <header className="mb-8 pb-6 border-b border-border-default">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <DifficultyBadge level={artTopic.difficulty} />
                    {artTopic.version && (
                      <VersionBadge version={artTopic.version} />
                    )}
                    {artTopic.interviewRelevance === 'high' && (
                      <span className="text-[10px] text-rose-400 bg-rose-500/8 border border-rose-500/20 px-2 py-0.5 rounded-full font-medium">
                        High Interview Relevance
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-text-tertiary">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {artTopic.estimatedTime} min read
                    </span>
                  </div>
                  <BookmarkButton topic={artTopic} />
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
                  {artTopic.title}
                </h1>
                <p className="text-sm sm:text-base text-text-secondary mt-3 leading-relaxed">
                  {artTopic.description}
                </p>

                {/* Mobile TOC */}
                <ArticleTOCMobile blocks={artTopic.content} className="mt-5" />
              </header>

              {/* Article content */}
              <ArticleRenderer blocks={artTopic.content} />

              {/* Completion */}
              <div className="mt-10 pt-6 border-t border-border-default flex items-center justify-between gap-4">
                <div>
                  {completed ? (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  ) : (
                    <p className="text-xs text-text-tertiary">Finished reading?</p>
                  )}
                </div>
                {!completed && (
                  <button
                    type="button"
                    onClick={handleMarkComplete}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
                  >
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                    Mark as completed
                  </button>
                )}
              </div>

              {/* Prev/Next */}
              <PreviousNext previous={previous} next={next} />
            </main>

            {/* ── Desktop Right TOC ── */}
            <ArticleTOCDesktop blocks={artTopic.content} />
          </div>
        </div>
      </AppShell>
    </>
  );
}
