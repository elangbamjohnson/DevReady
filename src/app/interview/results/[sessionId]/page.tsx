// File: src/app/interview/results/[sessionId]/page.tsx
// Method: export default function InterviewResultsPage()

'use client';

import { useEffect, use, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  History,
  TrendingUp,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { CURRICULUM_TOPICS, CURRICULUM_DOMAINS } from '@/data/curriculum';
import {
  interviewStore,
  subscribeToInterviewStore,
  getServerNull,
} from '@/lib/interview/interviewStore';
import { getPerformanceLabel, getPerformanceTier } from '@/lib/interview/scoringEngine';
import { cn } from '@/lib/utils';
import type { TopicCategory } from '@/types/interview';

export default function InterviewResultsPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const resolvedParams = use(params);
  const sessionId = resolvedParams.sessionId;
  const router = useRouter();

  const session = useSyncExternalStore(
    subscribeToInterviewStore,
    () => interviewStore.getSession(sessionId),
    getServerNull
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && session && !session.result) {
      router.push('/interview');
    }
  }, [session, router]);

  if (!session || !session.result) {
    return (
      <AppShell>
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AppShell>
    );
  }

  const result = session.result;
  const overallScore = result.overallScore;
  const tier = getPerformanceTier(overallScore);
  const tierLabel = getPerformanceLabel(overallScore);

  // Map weak topics to full curriculum metadata for rich Learn links
  const weakTopics = result.recommendedTopicIds
    .map((tId) => CURRICULUM_TOPICS.find((ct) => ct.id === tId))
    .filter((ct): ct is (typeof CURRICULUM_TOPICS)[0] => Boolean(ct));

  // Category labels helper
  const getDomainTitle = (catId: string) => {
    return CURRICULUM_DOMAINS.find((d) => d.id === catId)?.shortTitle || catId;
  };

  const handlePracticeWeakAreas = () => {
    if (result.weaknesses.length === 0) {
      router.push('/interview/configure');
      return;
    }

    const weakCategoryIds = result.weaknesses as TopicCategory[];
    router.push(
      `/interview/configure?${weakCategoryIds.map((c) => `category=${c}`).join('&')}`
    );
  };

  return (
    <AppShell>
      <div className="flex-1 w-full">
        <div className="px-6 py-8 lg:px-8 max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-neutral-400">
                Evaluation Report
              </span>
              <h1 className="text-3xl font-bold text-white tracking-tight mt-0.5">
                Interview Results
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                {session.title} • Completed on{' '}
                {new Date(session.completedAt || session.startedAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>

            <Link
              href="/interview/history"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              <History className="w-3.5 h-3.5" />
              History
            </Link>
          </div>

          {/* Overall Score Summary Hero */}
          <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              {/* Circular / Big Gauge */}
              <div
                className={cn(
                  'w-28 h-28 rounded-2xl border flex flex-col items-center justify-center shrink-0 shadow-lg',
                  tier === 'excellent' && 'bg-emerald-950/30 border-emerald-500/50 text-emerald-400 shadow-emerald-950/50',
                  tier === 'strong' && 'bg-blue-950/30 border-blue-500/50 text-blue-400 shadow-blue-950/50',
                  tier === 'developing' && 'bg-amber-950/30 border-amber-500/50 text-amber-400 shadow-amber-950/50',
                  tier === 'needs-attention' && 'bg-rose-950/30 border-rose-500/50 text-rose-400 shadow-rose-950/50'
                )}
              >
                <span className="text-4xl font-extrabold font-mono tracking-tight">{overallScore}%</span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-neutral-400 mt-0.5">
                  Overall
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border',
                      tier === 'excellent' && 'bg-emerald-950/50 border-emerald-500/30 text-emerald-300',
                      tier === 'strong' && 'bg-blue-950/50 border-blue-500/30 text-blue-300',
                      tier === 'developing' && 'bg-amber-950/50 border-amber-500/30 text-amber-300',
                      tier === 'needs-attention' && 'bg-rose-950/50 border-rose-500/30 text-rose-300'
                    )}
                  >
                    {tierLabel}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1.5">
                  {tier === 'excellent' && 'Outstanding Readiness'}
                  {tier === 'strong' && 'Solid Technical Grounding'}
                  {tier === 'developing' && 'Developing Knowledge'}
                  {tier === 'needs-attention' && 'Core Weaknesses Identified'}
                </h2>
                <p className="text-xs text-neutral-400 mt-1 max-w-md leading-relaxed">
                  Answered {result.answeredCount} of {result.questionCount} questions across{' '}
                  {Object.keys(result.categoryScores).length} technical domains.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handlePracticeWeakAreas}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Practice Weak Areas
              </button>
              <Link
                href="/interview"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-medium transition-colors"
              >
                All Tracks
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Category Performance Breakdown */}
          <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-violet-400" />
              Domain Performance Breakdown
            </h2>

            <div className="space-y-4">
              {Object.entries(result.categoryScores).map(([catId, score]) => (
                <div key={catId} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-200">
                      {getDomainTitle(catId)}
                    </span>
                    <span className="font-mono font-medium text-neutral-400">
                      {score}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden border border-neutral-800">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-500',
                        score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                      )}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Identified Weaknesses & Recommended Next Topics */}
          {weakTopics.length > 0 && (
            <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Recommended Learn Topics to Review
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Based on questions rated &ldquo;Didn&apos;t Know&rdquo; or &ldquo;Partially Knew&rdquo;, jump directly into these targeted curriculum lessons.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {weakTopics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/learn/${topic.domainId}/${topic.slug}`}
                    className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-violet-600/60 hover:bg-neutral-900 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                          {getDomainTitle(topic.domainId)}
                        </span>
                        <span className="text-[11px] text-neutral-500 font-mono capitalize">
                          {topic.difficulty}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-neutral-100 group-hover:text-violet-300 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                        {topic.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs text-violet-400 font-medium">
                      <span>Study Topic</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Identified Strengths */}
          {result.strengths.length > 0 && (
            <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Validated Strengths
              </h2>
              <div className="flex flex-wrap gap-2">
                {result.strengths.map((catId) => (
                  <span
                    key={catId}
                    className="px-3 py-1.5 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-xs font-medium text-emerald-300 flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3 h-3" />
                    {getDomainTitle(catId)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
