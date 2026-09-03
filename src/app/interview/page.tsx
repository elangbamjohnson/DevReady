'use client';

import { useState } from 'react';
import { MessageSquare, Clock, Bookmark, BookmarkCheck, Eye, EyeOff } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { DifficultyBadge, CategoryBadge } from '@/components/common/Badge';
import { CodeBlock } from '@/components/code/CodeBlock';
import { ALL_CATEGORIES, DIFFICULTY_LEVELS } from '@/lib/constants';
import { mockQuestions } from '@/data/mockQuestions';
import { cn } from '@/lib/utils';
import type { TopicCategory, DifficultyLevel } from '@/types';

export default function InterviewPage() {
  const [activeDifficulty, setActiveDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [activeCategory, setActiveCategory] = useState<TopicCategory | 'all'>('all');
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());
  const [bookmarked, setBookmarked] = useState<Set<string>>(
    new Set(mockQuestions.filter((q) => q.isBookmarked).map((q) => q.id))
  );

  const filteredQuestions = mockQuestions.filter((q) => {
    if (activeDifficulty !== 'all' && q.difficulty !== activeDifficulty) return false;
    if (activeCategory !== 'all' && q.category !== activeCategory) return false;
    return true;
  });

  const toggleReveal = (id: string) => {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-text-primary flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-accent" />
            Interview Practice
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Test your knowledge with real-world iOS engineering questions.
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-8">
          {/* Difficulty */}
          <div>
            <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
              Difficulty
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveDifficulty('all')}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer',
                  activeDifficulty === 'all'
                    ? 'bg-accent text-white border-accent'
                    : 'border-border-default text-text-secondary hover:text-text-primary hover:bg-surface-2'
                )}
              >
                All Levels
              </button>
              {DIFFICULTY_LEVELS.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setActiveDifficulty(level.value)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer',
                    activeDifficulty === level.value
                      ? 'bg-accent text-white border-accent'
                      : 'border-border-default text-text-secondary hover:text-text-primary hover:bg-surface-2'
                  )}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer',
                  activeCategory === 'all'
                    ? 'bg-accent text-white border-accent'
                    : 'border-border-default text-text-secondary hover:text-text-primary hover:bg-surface-2'
                )}
              >
                All
              </button>
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer',
                    activeCategory === cat.value
                      ? 'bg-accent text-white border-accent'
                      : 'border-border-default text-text-secondary hover:text-text-primary hover:bg-surface-2'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const isRevealed = revealedAnswers.has(q.id);
            const isBookmarked = bookmarked.has(q.id);
            return (
              <Card key={q.id} padding="lg" as="article">
                {/* Meta row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <DifficultyBadge level={q.difficulty} />
                    <CategoryBadge category={q.category} />
                    <span className="flex items-center gap-1 text-xs text-text-tertiary">
                      <Clock className="w-3 h-3" />
                      {q.estimatedTime}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleBookmark(q.id)}
                    className="text-text-tertiary hover:text-accent transition-colors cursor-pointer"
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-accent" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Question */}
                <h3 className="text-base font-medium text-text-primary mb-4 leading-snug">
                  {q.question}
                </h3>

                {/* Answer area */}
                {!isRevealed ? (
                  <div className="bg-surface-2/50 border border-border-default rounded-lg p-4 text-center">
                    <p className="text-sm text-text-secondary italic mb-3">
                      {q.thinkPrompt}
                    </p>
                    <Button size="sm" onClick={() => toggleReveal(q.id)}>
                      <Eye className="w-3.5 h-3.5" />
                      View Answer
                    </Button>
                  </div>
                ) : (
                  <div className="bg-surface-2/50 border border-border-default rounded-lg p-4 animate-fade-in">
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      {q.answerSummary}
                    </p>

                    {q.codeSnippet && (
                      <CodeBlock code={q.codeSnippet} language="swift" className="mb-4" />
                    )}

                    {q.keyTakeaways.length > 0 && (
                      <div className="border-t border-border-default pt-3">
                        <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
                          Key Takeaways
                        </p>
                        <ul className="space-y-1">
                          {q.keyTakeaways.map((point, i) => (
                            <li key={i} className="text-xs text-text-secondary flex items-start gap-2">
                              <span className="text-accent mt-0.5">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button
                      onClick={() => toggleReveal(q.id)}
                      className="mt-4 flex items-center gap-1.5 text-xs text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                      Hide Answer
                    </button>
                  </div>
                )}
              </Card>
            );
          })}

          {filteredQuestions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm text-text-tertiary">
                No questions found for the selected filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
