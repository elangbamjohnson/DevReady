// File: src/app/learn/page.tsx
// Method: export default function LearnPage()

'use client';

import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import CategoryNav from '@/components/CategoryNav';
import TopicGroupList from '@/components/TopicGroupList';

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <AppShell>
      <div className="flex-1 w-full">
        <div className="px-6 py-8 lg:px-8">
          {/* Page Header */}
          <header className="mb-2">
            <div className="flex items-center gap-3">
              <BookOpen className="w-7 h-7 text-violet-500" strokeWidth={2} aria-hidden="true" />
              <h1 className="text-3xl font-bold text-white tracking-tight">Learn</h1>
            </div>
            <p className="text-sm text-neutral-400 mt-2">
              Explore Swift and iOS concepts from fundamentals to advanced engineering.
            </p>
          </header>

          {/* Category Navigation */}
          <CategoryNav
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Topic Group List */}
          <TopicGroupList selectedCategory={selectedCategory} />
        </div>
      </div>
    </AppShell>
  );
}
