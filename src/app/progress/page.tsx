'use client';

import { BarChart3, CheckCircle, BookOpen, Bookmark } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/common/Card';
import { ProgressRing } from '@/components/common/ProgressRing';
import { ProgressBar } from '@/components/common/ProgressBar';
import { CategoryBadge } from '@/components/common/Badge';
import { overallReadiness, topicProgress, recentActivity } from '@/data/mockProgress';
import { cn } from '@/lib/utils';

const activityIcons = {
  completed: CheckCircle,
  practiced: BookOpen,
  bookmarked: Bookmark,
} as const;

const activityColors = {
  completed: 'text-emerald-400',
  practiced: 'text-blue-400',
  bookmarked: 'text-amber-400',
} as const;

export default function ProgressPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-text-primary flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent" />
            Progress
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Track your learning journey and interview readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Overall + Topics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Readiness */}
            <Card padding="lg">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ProgressRing
                  percentage={overallReadiness.score}
                  size={140}
                  strokeWidth={10}
                  label={`${overallReadiness.score}%`}
                  sublabel="Overall"
                />
                <div className="text-center sm:text-left">
                  <h2 className="text-lg font-semibold text-text-primary">
                    Overall Readiness
                  </h2>
                  <p className="text-sm text-accent font-medium mt-1">
                    {overallReadiness.targetRole}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-text-secondary">
                    <span>
                      <span className="text-text-primary font-medium">
                        {overallReadiness.totalQuestionsPracticed}
                      </span>{' '}
                      questions practiced
                    </span>
                    <span>
                      <span className="text-text-primary font-medium">
                        {overallReadiness.streakDays}
                      </span>{' '}
                      day streak
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Topic Progress */}
            <Card padding="lg">
              <h2 className="text-sm font-semibold text-text-primary mb-4">
                Topic Progress
              </h2>
              <div className="space-y-4">
                {topicProgress.map((tp) => (
                  <ProgressBar
                    key={tp.category}
                    label={tp.label}
                    percentage={tp.percentage}
                    showPercentage
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* Right: Recent Activity */}
          <div>
            <Card padding="md">
              <h2 className="text-sm font-semibold text-text-primary mb-4">
                Recent Activity
              </h2>
              <div className="space-y-3">
                {recentActivity.map((activity) => {
                  const Icon = activityIcons[activity.type];
                  const color = activityColors[activity.type];
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <Icon className={cn('w-4 h-4 mt-0.5 shrink-0', color)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-primary truncate">
                          {activity.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <CategoryBadge category={activity.category} />
                          <span className="text-[10px] text-text-tertiary">
                            {activity.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
