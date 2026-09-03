// File: src/app/dashboard/page.tsx
// Method: export default function Dashboard()

'use client';

import { AppShell } from '@/components/layout/AppShell';
import DashboardGreeting from '@/components/DashboardGreeting';
import ReadinessCard from '@/components/dashboard/ReadinessCard';
import ContinueLearningCard from '@/components/dashboard/ContinueLearningCard';
import PracticeSessionCard from '@/components/dashboard/PracticeSessionCard';
import RecommendedTopics from '@/components/dashboard/RecommendedTopics';
import RecentlyViewed from '@/components/dashboard/RecentlyViewed';
import ActivityFeed from '@/components/dashboard/ActivityFeed';

export default function Dashboard() {
  return (
    <AppShell>
      <div className="min-h-screen bg-[#0A0A0A] text-neutral-200">
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* 1. Dashboard Greeting */}
          <DashboardGreeting />

          {/* 2. Top 3-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 items-stretch">
            <ReadinessCard />
            <ContinueLearningCard />
            <PracticeSessionCard />
          </div>

          {/* 3. Recommended Topics (Full Width Section) */}
          <RecommendedTopics />

          {/* 4. Bottom 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 items-stretch">
            <RecentlyViewed />
            <ActivityFeed />
          </div>
        </main>
      </div>
    </AppShell>
  );
}
