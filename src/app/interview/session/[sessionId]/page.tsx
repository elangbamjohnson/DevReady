// File: src/app/interview/session/[sessionId]/page.tsx
// Method: export default function InterviewSessionPage()

'use client';

import { useState, useEffect, useMemo, use, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  Code2,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { interviewRepository } from '@/data/interview';
import {
  interviewStore,
  subscribeToInterviewStore,
  getServerNull,
} from '@/lib/interview/interviewStore';
import { calculateInterviewResult } from '@/lib/interview/scoringEngine';
import { cn } from '@/lib/utils';
import type { InterviewQuestion, InterviewResponse, SelfRating } from '@/types/interview';

export default function InterviewSessionPage({
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

  const [showExitModal, setShowExitModal] = useState(false);
  const [expandedFollowUp, setExpandedFollowUp] = useState(false);
  const [revealedFollowUpAnswer, setRevealedFollowUpAnswer] = useState(false);
  const [checkedPoints, setCheckedPoints] = useState<Record<number, boolean>>({});
  const [timeOnQuestion, setTimeOnQuestion] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !interviewStore.getSession(sessionId)) {
      router.push('/interview');
    }
  }, [sessionId, router]);

  // Current question data
  const currentQuestion: InterviewQuestion | null = useMemo(() => {
    if (!session || session.questionIds.length === 0) return null;
    const qId = session.questionIds[session.currentIndex];
    return interviewRepository.getQuestionById(qId) || null;
  }, [session]);

  // Current question response in session
  const currentResponse: InterviewResponse | undefined = useMemo(() => {
    if (!session || !currentQuestion) return undefined;
    return session.responses[currentQuestion.id];
  }, [session, currentQuestion]);

  const revealed = (currentResponse?.answerRevealed ?? false) || session?.mode === 'practice';

  // Question stopwatch timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnQuestion((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [session?.currentIndex]);

  if (!session || !currentQuestion) {
    return (
      <AppShell>
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-neutral-400">Loading interview question...</p>
          </div>
        </div>
      </AppShell>
    );
  }

  const currentIndex = session.currentIndex;
  const totalQuestions = session.questionIds.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleReveal = () => {
    interviewStore.updateResponse(sessionId, {
      questionId: currentQuestion.id,
      answerRevealed: true,
      completed: false,
      followUpsViewed: currentResponse?.followUpsViewed || [],
    });
  };

  const handleRate = (rating: SelfRating) => {
    interviewStore.updateResponse(sessionId, {
      questionId: currentQuestion.id,
      selfRating: rating,
      timeSpent: timeOnQuestion,
      answerRevealed: true,
      completed: true,
      followUpsViewed: currentResponse?.followUpsViewed || [],
    });
  };

  const handleNext = () => {
    if (isSubmitting) return;

    if (isLastQuestion) {
      setIsSubmitting(true);
      // Compile all questions and calculate final results
      const allSessionQuestions = session.questionIds
        .map((id) => interviewRepository.getQuestionById(id))
        .filter((q): q is InterviewQuestion => Boolean(q));

      const result = calculateInterviewResult(allSessionQuestions, session.responses);
      interviewStore.completeSession(sessionId, result);
      router.push(`/interview/results/${sessionId}`);
    } else {
      setTimeOnQuestion(0);
      setExpandedFollowUp(false);
      setRevealedFollowUpAnswer(false);
      setCheckedPoints({});
      interviewStore.advanceQuestion(sessionId);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setTimeOnQuestion(0);
      setExpandedFollowUp(false);
      setRevealedFollowUpAnswer(false);
      setCheckedPoints({});
      interviewStore.previousQuestion(sessionId);
    }
  };

  const formatSeconds = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <AppShell>
      <div className="flex-1 w-full flex flex-col min-h-screen">
        {/* Sticky Top Bar Header */}
        <header className="sticky top-14 z-30 bg-[#18181b]/95 backdrop-blur-md border-b border-neutral-800/80 px-4 sm:px-8 py-3.5">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowExitModal(true)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60 transition-colors"
                title="Exit Interview"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 block">
                  {session.title}
                </span>
                <span className="text-sm font-semibold text-white">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
              </div>
            </div>

            {/* Middle: Progress Bar */}
            <div className="hidden sm:flex flex-col items-center w-48">
              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-violet-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-neutral-500 font-mono mt-1">
                {progressPercent}% Completed
              </span>
            </div>

            {/* Right: Stopwatch & Domain Pill */}
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-neutral-500" />
                {formatSeconds(timeOnQuestion)}
              </span>

              <span className="text-xs font-mono capitalize px-2.5 py-1 rounded-md bg-violet-950/40 text-violet-300 border border-violet-800/50">
                {currentQuestion.domainId}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-8 py-8 max-w-4xl mx-auto w-full space-y-6">
          {/* Question Card */}
          <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded uppercase tracking-wider bg-neutral-800/80 text-neutral-400 border border-neutral-700/50">
                  {currentQuestion.type}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded capitalize bg-neutral-800/80 text-neutral-400 border border-neutral-700/50">
                  {currentQuestion.difficulty}
                </span>
              </div>

              <span className="text-xs text-neutral-500 font-mono">
                ID: {currentQuestion.id}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight">
              {currentQuestion.question}
            </h2>

            {/* Code Snippet if applicable */}
            {currentQuestion.codeSnippet && (
              <div className="mt-5 rounded-xl overflow-hidden border border-neutral-800 bg-[#09090b]">
                <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-violet-400" />
                    {currentQuestion.codeSnippet.caption || 'Code Analysis'}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-neutral-500">
                    {currentQuestion.codeSnippet.language}
                  </span>
                </div>
                <pre className="p-4 text-xs font-mono text-neutral-200 overflow-x-auto leading-relaxed">
                  <code>{currentQuestion.codeSnippet.code}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Think State vs Revealed Answer */}
          {!revealed ? (
            <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-600/10 border border-violet-500/20 text-violet-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-base font-semibold text-white">Think & Formulate Your Answer</h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Take a moment to reason through the trade-offs or speak your response aloud before revealing the expected model answer.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleReveal}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white text-xs font-semibold transition-all shadow-md shadow-violet-950/40 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  Reveal Model Answer & Key Points
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Model Answer Card */}
              <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-emerald-400 mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  Model Answer
                </div>
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-sans">
                  {currentQuestion.modelAnswer}
                </p>
              </div>

              {/* What a Strong Candidate Mentions (Key Points Checklist) */}
              {currentQuestion.keyPoints.length > 0 && (
                <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl p-6">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    What a Strong Candidate Should Mention
                  </h3>
                  <div className="space-y-2.5">
                    {currentQuestion.keyPoints.map((point, idx) => {
                      const isChecked = checkedPoints[idx] || false;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCheckedPoints((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                          className={cn(
                            'w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-colors flex items-start gap-3 cursor-pointer',
                            isChecked
                              ? 'bg-emerald-950/20 border-emerald-800/50 text-emerald-300'
                              : 'bg-neutral-900/40 border-neutral-800/60 text-neutral-300 hover:bg-neutral-800/40'
                          )}
                        >
                          <div
                            className={cn(
                              'w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors',
                              isChecked ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-neutral-600'
                            )}
                          >
                            {isChecked && <CheckCircle2 className="w-3 h-3" />}
                          </div>
                          <span>{point}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Common Mistakes Warning */}
              {currentQuestion.commonMistakes.length > 0 && (
                <div className="bg-amber-950/10 border border-amber-800/30 rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-amber-400 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    Common Pitfalls & Mistakes
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-300 list-disc list-inside">
                    {currentQuestion.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Interviewer Follow-Up Question */}
              {currentQuestion.followUps && currentQuestion.followUps.length > 0 && (
                <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setExpandedFollowUp(!expandedFollowUp)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between hover:bg-neutral-900/40 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-violet-400" />
                      <span className="text-sm font-semibold text-white">
                        Interviewer Follow-Up ({currentQuestion.followUps.length})
                      </span>
                    </div>
                    {expandedFollowUp ? (
                      <ChevronUp className="w-4 h-4 text-neutral-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    )}
                  </button>

                  {expandedFollowUp && (
                    <div className="p-6 pt-0 border-t border-neutral-800/60 space-y-4">
                      {currentQuestion.followUps.map((fu) => (
                        <div key={fu.id} className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                          <p className="text-sm font-medium text-violet-200">
                            &ldquo;{fu.question}&rdquo;
                          </p>

                          {!revealedFollowUpAnswer ? (
                            <button
                              type="button"
                              onClick={() => setRevealedFollowUpAnswer(true)}
                              className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1.5"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Reveal Follow-up Answer
                            </button>
                          ) : (
                            <div className="space-y-2 pt-2 border-t border-neutral-800/80 animate-in fade-in">
                              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                                {fu.modelAnswer}
                              </p>
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {fu.keyPoints.map((kp, kidx) => (
                                  <span
                                    key={kidx}
                                    className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 font-mono"
                                  >
                                    ✓ {kp}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Self-Assessment Selector */}
              <div className="bg-[#141414] border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
                <h3 className="text-sm font-bold text-white mb-1">
                  How well did you know this answer?
                </h3>
                <p className="text-xs text-neutral-400 mb-5">
                  Select your self-assessment to compute your final score and identify knowledge gaps.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { key: 'unknown' as const, label: "Didn't Know", color: 'hover:border-rose-500 hover:bg-rose-950/20 active:bg-rose-900/30', active: 'bg-rose-950/30 border-rose-500 text-rose-300' },
                    { key: 'partial' as const, label: 'Partially Knew', color: 'hover:border-amber-500 hover:bg-amber-950/20 active:bg-amber-900/30', active: 'bg-amber-950/30 border-amber-500 text-amber-300' },
                    { key: 'good' as const, label: 'Good', color: 'hover:border-blue-500 hover:bg-blue-950/20 active:bg-blue-900/30', active: 'bg-blue-950/30 border-blue-500 text-blue-300' },
                    { key: 'excellent' as const, label: 'Excellent', color: 'hover:border-emerald-500 hover:bg-emerald-950/20 active:bg-emerald-900/30', active: 'bg-emerald-950/30 border-emerald-500 text-emerald-300' },
                  ].map((btn) => {
                    const isSelected = currentResponse?.selfRating === btn.key;
                    return (
                      <button
                        key={btn.key}
                        type="button"
                        onClick={() => handleRate(btn.key)}
                        className={cn(
                          'p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center',
                          isSelected
                            ? btn.active
                            : cn('bg-neutral-900/50 border-neutral-800 text-neutral-300', btn.color)
                        )}
                      >
                        {btn.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Sticky Bottom Navigation Footer */}
        <footer className="sticky bottom-0 z-30 bg-[#18181b]/95 backdrop-blur-md border-t border-neutral-800/80 px-4 sm:px-8 py-3.5">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white hover:bg-neutral-800/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white text-xs font-semibold transition-all shadow-md shadow-violet-950/40 cursor-pointer"
            >
              {isLastQuestion ? 'Complete Interview & View Results' : 'Next Question'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </footer>

        {/* Exit Confirmation Dialog */}
        {showExitModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#18181b] border border-neutral-800 rounded-2xl max-w-sm w-full p-6 space-y-4 animate-in zoom-in-95">
              <h3 className="text-lg font-bold text-white">Exit Interview?</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Your progress is saved locally. You can resume this session anytime from the Interview landing page.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => router.push('/interview')}
                  className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors"
                >
                  Save & Exit to Overview
                </button>
                <button
                  type="button"
                  onClick={() => {
                    interviewStore.abandonSession(sessionId);
                    router.push('/interview');
                  }}
                  className="w-full py-2 rounded-xl text-neutral-400 hover:text-rose-400 text-xs font-medium transition-colors"
                >
                  Abandon Session
                </button>
                <button
                  type="button"
                  onClick={() => setShowExitModal(false)}
                  className="w-full py-2 rounded-xl text-neutral-500 hover:text-neutral-300 text-xs transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
