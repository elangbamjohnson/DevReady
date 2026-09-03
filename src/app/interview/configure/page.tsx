// File: src/app/interview/configure/page.tsx
// Method: export default function InterviewConfigurePage()

'use client';

import { useState, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  SlidersHorizontal,
  ArrowLeft,
  ArrowRight,
  Shield,
  Layers,
  Zap,
  Check,
  AlertCircle,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { CURRICULUM_DOMAINS } from '@/data/curriculum';
import { ALL_INTERVIEW_QUESTIONS } from '@/data/interview';
import { interviewStore } from '@/lib/interview/interviewStore';
import { selectInterviewQuestions } from '@/lib/interview/questionSelector';
import { cn } from '@/lib/utils';
import type { DifficultyLevel, InterviewMode, TopicCategory } from '@/types/interview';

function ConfigureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read query params if arriving from a specific Learn topic or category
  const initialCategory = searchParams.get('category') as TopicCategory | null;
  const initialTopicId = searchParams.get('topicId');

  const [difficulty, setDifficulty] = useState<DifficultyLevel>('advanced');
  const [selectedCategories, setSelectedCategories] = useState<TopicCategory[]>(
    initialCategory ? [initialCategory] : ['swift', 'concurrency', 'swiftui', 'uikit', 'architecture']
  );
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(initialTopicId);
  const [mode, setMode] = useState<InterviewMode>('interview');
  const [questionCount, setQuestionCount] = useState<number>(10);

  // Available topics for the selected categories
  const availableTopics = useMemo(() => {
    if (selectedCategories.length === 0) return [];
    return CURRICULUM_DOMAINS.filter((d) => selectedCategories.includes(d.id)).flatMap((d) =>
      d.modules.flatMap((m) =>
        m.topics.map((t) => ({
          id: t.id,
          title: t.title,
          domainId: t.domainId,
          domainTitle: d.shortTitle,
        }))
      )
    );
  }, [selectedCategories]);

  // Pre-flight count calculation
  const matchingQuestions = useMemo(() => {
    return selectInterviewQuestions(ALL_INTERVIEW_QUESTIONS, {
      difficulty,
      categoryIds: selectedCategories,
      topicIds: selectedTopicId ? [selectedTopicId] : undefined,
      mode,
      count: 1000, // check total matching pool
    });
  }, [difficulty, selectedCategories, selectedTopicId, mode]);

  const toggleCategory = (domainId: TopicCategory) => {
    setSelectedCategories((prev) => {
      if (prev.includes(domainId)) {
        // Keep at least one category selected
        if (prev.length === 1) return prev;
        return prev.filter((id) => id !== domainId);
      }
      return [...prev, domainId];
    });
  };

  const handleStart = () => {
    const selected = selectInterviewQuestions(ALL_INTERVIEW_QUESTIONS, {
      difficulty,
      categoryIds: selectedCategories,
      topicIds: selectedTopicId ? [selectedTopicId] : undefined,
      mode,
      count: questionCount,
    });

    const session = interviewStore.createSession({
      title: selectedTopicId
        ? `Topic: ${availableTopics.find((t) => t.id === selectedTopicId)?.title || 'Targeted Practice'}`
        : `${difficulty.toUpperCase()} iOS Interview (${selectedCategories.length} domains)`,
      mode,
      difficulty,
      categoryIds: selectedCategories,
      topicIds: selectedTopicId ? [selectedTopicId] : undefined,
      questionIds: selected.map((q) => q.id),
    });

    router.push(`/interview/session/${session.id}`);
  };

  const difficulties: { key: DifficultyLevel; label: string; desc: string }[] = [
    { key: 'foundational', label: 'Foundational', desc: 'Junior / Core syntax & primitives' },
    { key: 'intermediate', label: 'Intermediate', desc: 'Mid-Level / UI state & async networking' },
    { key: 'advanced', label: 'Advanced', desc: 'Senior / Concurrency, memory & architecture' },
    { key: 'expert', label: 'Expert', desc: 'Staff / System design & scalability' },
  ];

  return (
    <div className="flex-1 w-full">
      <div className="px-6 py-8 lg:px-8 max-w-4xl mx-auto">
        {/* Navigation back */}
        <div className="mb-6">
          <Link
            href="/interview"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Interview Tracks
          </Link>
        </div>

        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <SlidersHorizontal className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Configure Interview</h1>
              <p className="text-sm text-neutral-400 mt-1">
                Customize your targeted domain focus, difficulty level, and session dynamics.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* 1. Target Difficulty */}
          <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-violet-400" />
              1. Target Seniority / Difficulty
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {difficulties.map((d) => (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setDifficulty(d.key)}
                  className={cn(
                    'p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between',
                    difficulty === d.key
                      ? 'bg-violet-950/30 border-violet-600 text-white shadow-sm shadow-violet-950/50'
                      : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                  )}
                >
                  <span className="font-semibold text-sm text-neutral-200">{d.label}</span>
                  <span className="text-[11px] text-neutral-500 mt-1">{d.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Choose Categories */}
          <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-violet-400" />
                2. Domains to Cover ({selectedCategories.length} selected)
              </h2>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedCategories(CURRICULUM_DOMAINS.map((d) => d.id))}
                  className="text-violet-400 hover:underline"
                >
                  Select All
                </button>
                <span className="text-neutral-600">•</span>
                <button
                  type="button"
                  onClick={() => setSelectedCategories(['swift', 'concurrency'])}
                  className="text-neutral-400 hover:text-neutral-200"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {CURRICULUM_DOMAINS.map((domain) => {
                const isSelected = selectedCategories.includes(domain.id);
                return (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => toggleCategory(domain.id)}
                    className={cn(
                      'p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer',
                      isSelected
                        ? 'bg-violet-950/20 border-violet-700/60 text-violet-300'
                        : 'bg-neutral-900/30 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                    )}
                  >
                    <span className="truncate">{domain.shortTitle}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-violet-400 shrink-0 ml-1.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Optional Specific Topic Filter */}
          <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                3. Targeted Topic (Optional)
              </h2>
              {selectedTopicId && (
                <button
                  type="button"
                  onClick={() => setSelectedTopicId(null)}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Clear Topic Filter
                </button>
              )}
            </div>
            <p className="text-xs text-neutral-500 mb-4">
              Focus questions exclusively on one specific curriculum module topic.
            </p>

            <select
              value={selectedTopicId || ''}
              onChange={(e) => setSelectedTopicId(e.target.value || null)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-violet-600 cursor-pointer"
            >
              <option value="">All Topics in Selected Domains (Recommended)</option>
              {availableTopics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  [{topic.domainTitle}] {topic.title}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Mode & Length */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mode */}
            <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-violet-400" />
                4. Session Mode
              </h2>
              <div className="space-y-2">
                {[
                  { key: 'interview' as const, label: 'Realistic Interview', desc: 'Think before revealing answer' },
                  { key: 'practice' as const, label: 'Practice Review', desc: 'Immediate answer inspection' },
                  { key: 'rapid-fire' as const, label: 'Rapid Fire', desc: 'Fast recall conceptual drills' },
                ].map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setMode(m.key)}
                    className={cn(
                      'w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between',
                      mode === m.key
                        ? 'bg-violet-950/20 border-violet-600 text-white'
                        : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    )}
                  >
                    <div>
                      <span className="text-sm font-medium text-neutral-200 block">{m.label}</span>
                      <span className="text-[11px] text-neutral-500">{m.desc}</span>
                    </div>
                    {mode === m.key && <Check className="w-4 h-4 text-violet-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Length */}
            <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-violet-400" />
                  5. Number of Questions
                </h2>
                <div className="grid grid-cols-3 gap-2.5">
                  {[10, 20, 30].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setQuestionCount(count)}
                      className={cn(
                        'py-3 rounded-xl border text-center transition-all cursor-pointer font-mono font-bold text-base',
                        questionCount === count
                          ? 'bg-violet-950/30 border-violet-600 text-violet-300'
                          : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                      )}
                    >
                      {count}
                      <span className="block text-[10px] font-normal font-sans text-neutral-500 mt-0.5">
                        ~{Math.round(count * 1.5)}m
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Matching Pool Preview */}
              <div className="mt-4 p-3 rounded-xl bg-neutral-900 border border-neutral-800/80 text-xs flex items-center justify-between">
                <span className="text-neutral-400">Available matching pool:</span>
                <span className="font-mono font-semibold text-emerald-400">
                  {matchingQuestions.length} Questions
                </span>
              </div>
            </div>
          </div>

          {/* Validation Notice if pool is smaller */}
          {matchingQuestions.length === 0 ? (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              No questions found for this specific combination. Please select additional domains or choose &ldquo;All Topics&rdquo;.
            </div>
          ) : matchingQuestions.length < questionCount ? (
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-neutral-400 shrink-0" />
              Only {matchingQuestions.length} questions exist matching your exact filters. The session will automatically adjust to {matchingQuestions.length} questions.
            </div>
          ) : null}

          {/* Bottom CTA */}
          <div className="pt-4 flex items-center justify-between">
            <Link
              href="/interview"
              className="px-5 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white text-sm font-medium transition-colors"
            >
              Cancel
            </Link>

            <button
              type="button"
              disabled={matchingQuestions.length === 0}
              onClick={handleStart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all shadow-lg shadow-violet-950/50 cursor-pointer"
            >
              Launch Interview Session ({Math.min(questionCount, matchingQuestions.length || questionCount)} Questions)
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InterviewConfigurePage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-10 text-center text-neutral-400">Loading configuration...</div>}>
        <ConfigureContent />
      </Suspense>
    </AppShell>
  );
}
