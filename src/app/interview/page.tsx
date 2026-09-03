// File: src/app/interview/page.tsx
// Method: export default function InterviewLandingPage()

'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MessageSquare,
  Clock,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  Zap,
  Play,
  History,
  SlidersHorizontal,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { INTERVIEW_TRACKS, selectInterviewQuestions } from '@/lib/interview/questionSelector';
import {
  interviewStore,
  subscribeToInterviewStore,
  getServerNull,
  getServerEmptySessions,
} from '@/lib/interview/interviewStore';
import { ALL_INTERVIEW_QUESTIONS } from '@/data/interview';
import { cn } from '@/lib/utils';
import type { InterviewTrack } from '@/types/interview';

export default function InterviewLandingPage() {
  const router = useRouter();

  const activeSession = useSyncExternalStore(
    subscribeToInterviewStore,
    () => interviewStore.getActiveSession(),
    getServerNull
  );

  const history = useSyncExternalStore(
    subscribeToInterviewStore,
    () => interviewStore.getHistory(),
    getServerEmptySessions
  );

  const recentSessions = history.slice(0, 3);

  const handleStartTrack = (track: InterviewTrack) => {
    const selected = selectInterviewQuestions(ALL_INTERVIEW_QUESTIONS, {
      difficulty: track.level,
      categoryIds: track.featuredDomains,
      count: track.defaultQuestionCount,
      mode: 'interview',
    });

    const session = interviewStore.createSession({
      title: `${track.title} Session`,
      mode: 'interview',
      difficulty: track.level,
      categoryIds: track.featuredDomains,
      questionIds: selected.map((q) => q.id),
    });

    router.push(`/interview/session/${session.id}`);
  };

  return (
    <AppShell>
      <div className="flex-1 w-full">
        <div className="px-6 py-8 lg:px-8 max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <MessageSquare className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white tracking-tight">Interview Practice</h1>
                  <p className="text-sm text-neutral-400 mt-1">
                    Practice the questions, reasoning, and system-design discussions expected from modern iOS engineers.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/interview/configure"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800 text-sm font-medium transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4 text-neutral-400" />
                Custom Setup
              </Link>
              <Link
                href="/interview/history"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800 text-sm font-medium transition-colors"
              >
                <History className="w-4 h-4 text-neutral-400" />
                History
              </Link>
            </div>
          </div>

          {/* Active Session Resume Banner */}
          {activeSession && (
            <div className="mb-8 p-5 bg-violet-950/20 border border-violet-800/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0 mt-0.5">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs uppercase tracking-wider font-semibold text-violet-400">
                      In-Progress Session
                    </span>
                    <span className="text-xs text-neutral-500">•</span>
                    <span className="text-xs text-neutral-400">
                      Question {activeSession.currentIndex + 1} of {activeSession.questionIds.length}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mt-0.5">
                    {activeSession.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Mode: <span className="capitalize text-neutral-300">{activeSession.mode}</span> • Level:{' '}
                    <span className="capitalize text-neutral-300">{activeSession.difficulty}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    interviewStore.abandonSession(activeSession.id);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 transition-colors"
                >
                  Discard
                </button>
                <Link
                  href={`/interview/session/${activeSession.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors shadow-sm shadow-violet-950/40"
                >
                  Continue Session
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Interview Tracks Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Structured Tracks</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Pre-configured interview paths matching targeted hiring seniority tiers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {INTERVIEW_TRACKS.map((track) => (
                <div
                  key={track.id}
                  className="bg-[#141414] border border-neutral-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700/80 transition-all group"
                >
                  <div>
                    {/* Badge & Meta */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={cn('text-xs px-2.5 py-0.5 rounded-full font-medium border', track.badgeColor)}>
                        {track.title}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-neutral-500" />
                          {track.defaultQuestionCount} Questions
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-neutral-500" />
                          ~{track.estimatedMinutes}m
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-neutral-100 group-hover:text-white transition-colors">
                      {track.subtitle}
                    </h3>
                    <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                      {track.description}
                    </p>

                    {/* Featured domains */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {track.featuredDomains.map((dom) => (
                        <span
                          key={dom}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800/80 text-neutral-400 capitalize"
                        >
                          {dom}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-neutral-800/60 flex items-center justify-between">
                    <span className="text-xs text-neutral-500">Realistic Interview Mode</span>
                    <button
                      type="button"
                      onClick={() => handleStartTrack(track)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm shadow-violet-950/40"
                    >
                      Start Interview
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interview Modes Guide */}
          <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl p-6 mb-12">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              Available Practice Modes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/60">
                <div className="flex items-center gap-2 font-semibold text-neutral-200 mb-1">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  Practice Mode
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Self-paced review. Answers and checklists can be inspected immediately without waiting or pressure.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/60">
                <div className="flex items-center gap-2 font-semibold text-neutral-200 mb-1">
                  <MessageSquare className="w-4 h-4 text-violet-400" />
                  Interview Mode
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Realistic simulation. Prompts you to think and formulate answers before revealing model answers and follow-ups.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/60">
                <div className="flex items-center gap-2 font-semibold text-neutral-200 mb-1">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Rapid Fire
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Fast-paced conceptual drills designed for quick recall and high-frequency knowledge checks.
                </p>
              </div>
            </div>
          </div>

          {/* Recent Interview Activity */}
          {recentSessions.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white tracking-tight">Recent Sessions</h2>
                <Link
                  href="/interview/history"
                  className="text-xs font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1"
                >
                  View All History
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-3">
                {recentSessions.map((s) => (
                  <div
                    key={s.id}
                    className="p-4 bg-[#141414] border border-neutral-800/80 rounded-xl flex items-center justify-between gap-4 hover:bg-[#181818] transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Link
                          href={s.result ? `/interview/results/${s.id}` : `/interview/session/${s.id}`}
                          className="text-sm font-semibold text-neutral-200 hover:text-violet-400 transition-colors"
                        >
                          {s.title}
                        </Link>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                          {s.mode}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">
                        {new Date(s.startedAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}{' '}
                        • {s.questionIds.length} Questions
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      {s.result ? (
                        <div className="text-right">
                          <span className="text-base font-bold font-mono text-emerald-400">
                            {s.result.overallScore}%
                          </span>
                          <span className="block text-[10px] text-neutral-500">Overall Score</span>
                        </div>
                      ) : (
                        <span className="text-xs text-neutral-500 capitalize">{s.status}</span>
                      )}

                      <Link
                        href={s.result ? `/interview/results/${s.id}` : `/interview/session/${s.id}`}
                        className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        {s.result ? 'View Results' : 'Resume'}
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
