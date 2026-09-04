'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Clock, CheckCircle2, MessageSquare, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { DifficultyBadge } from '@/components/common/Badge';
import { BookmarkButton } from '@/components/learn/BookmarkButton';
import { VersionBadge } from '@/components/learn/VersionBadge';
import { ReadingProgress } from '@/components/learn/ReadingProgress';
import { ArticleRenderer } from '@/components/learn/ArticleRenderer';
import { ArticleTOCDesktop, ArticleTOCMobile } from '@/components/learn/ArticleTOC';
import { PreviousNext } from '@/components/learn/PreviousNext';
import { topicRepository, categoryMeta } from '@/data/topics/index';
import { CURRICULUM_TOPICS, CURRICULUM_DOMAINS } from '@/data/curriculum';
import { markTopicComplete, useIsTopicComplete } from '@/lib/progressStore';

interface TopicPageProps {
  params: Promise<{ category: string; topic: string }>;
}

export default function TopicPage({ params }: TopicPageProps) {
  const { category, topic: topicSlug } = use(params);

  const artTopic = topicRepository.getTopicBySlug(topicSlug);
  const meta =
    categoryMeta.find((c) => c.slug === category) ||
    CURRICULUM_DOMAINS.find((d) => d.id === category);

  // Check if topic exists in the curriculum taxonomy
  const curriculumTopic = !artTopic
    ? CURRICULUM_TOPICS.find(
        (t) => (t.slug === topicSlug || t.id === topicSlug) && t.domainId === category
      )
    : null;

  if (!artTopic && !curriculumTopic) {
    notFound();
  }

  const categoryLabel = meta ? ('label' in meta ? meta.label : meta.shortTitle) : category;

  const topicId = artTopic?.id ?? curriculumTopic?.id ?? '';
  const completed = useIsTopicComplete(topicId);

  const handleMarkComplete = () => {
    markTopicComplete(topicId);
  };

  // If detailed article exists, render full article experience
  if (artTopic) {
    const { previous, next } = topicRepository.getAdjacentTopics(artTopic.id);

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
                {categoryLabel}
              </Link>
              <ChevronRight className="w-3 h-3 shrink-0" aria-hidden="true" />
              <span className="text-text-secondary font-medium hidden sm:block">{artTopic.group}</span>
              <ChevronRight className="w-3 h-3 shrink-0 hidden sm:block" aria-hidden="true" />
              <span className="text-text-secondary font-medium truncate">{artTopic.title}</span>
            </nav>

            {/* Three-column layout */}
            <div className="flex gap-8 xl:gap-12">
              <main className="flex-1 min-w-0">
                <header className="mb-8 pb-6 border-b border-border-default">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <DifficultyBadge level={artTopic.difficulty} />
                      {artTopic.version && <VersionBadge version={artTopic.version} />}
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

                  <ArticleTOCMobile blocks={artTopic.content} className="mt-5" />
                </header>

                <ArticleRenderer blocks={artTopic.content} topicId={artTopic.id} category={artTopic.category} />

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
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      Mark as completed
                    </button>
                  )}
                </div>

                <PreviousNext previous={previous} next={next} />
              </main>

              <ArticleTOCDesktop blocks={artTopic.content} />
            </div>
          </div>
        </AppShell>
      </>
    );
  }

  // Fallback: Render rich Curriculum Topic Overview for planned/curriculum topics
  return (
    <AppShell>
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-neutral-400 mb-6 flex-wrap">
          <Link href="/learn" className="hover:text-white transition-colors">Learn</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <Link href={`/learn/${category}`} className="hover:text-white transition-colors capitalize">
            {categoryLabel}
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-neutral-200 font-medium truncate">{curriculumTopic!.title}</span>
        </nav>

        <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 flex-wrap">
            <DifficultyBadge level={curriculumTopic!.difficulty} />
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-violet-950/40 text-violet-300 border border-violet-800/40">
              Curriculum Study Guide
            </span>
            <span className="text-xs text-neutral-400 flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" />
              ~{curriculumTopic!.estimatedMinutes}m
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {curriculumTopic!.title}
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 mt-3 leading-relaxed">
              {curriculumTopic!.description}
            </p>
          </div>

          {/* Concepts covered */}
          {curriculumTopic!.concepts && curriculumTopic!.concepts.length > 0 && (
            <div className="pt-4 border-t border-neutral-800 space-y-3">
              <h2 className="text-xs uppercase tracking-wider font-semibold text-neutral-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                Key Concepts Covered
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {curriculumTopic!.concepts.map((concept) => (
                  <div
                    key={concept.id}
                    className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-300 flex items-start gap-2"
                  >
                    <span className="text-emerald-400 font-bold mt-0.5">•</span>
                    <div>
                      <span className="font-semibold text-white block">{concept.title}</span>
                      {concept.description && (
                        <span className="text-neutral-400 text-[11px] mt-0.5 block">{concept.description}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practice in Interview Mode Card */}
          <div className="p-5 rounded-xl bg-violet-950/20 border border-violet-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-violet-400" />
                Practice Topic in Interview Mode
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Evaluate your technical knowledge and answer follow-up questions for this topic.
              </p>
            </div>

            <Link
              href={`/interview/configure?topicId=${curriculumTopic!.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors shrink-0 shadow-sm shadow-violet-950/40"
            >
              Start Practice Session
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
            <Link
              href={`/learn/${category}`}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Explore All {categoryLabel} Topics
            </Link>

            <button
              type="button"
              onClick={handleMarkComplete}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {completed ? 'Marked Complete' : 'Mark as Complete'}
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
