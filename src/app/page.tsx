// File: src/app/page.tsx
// Method: LandingPage()

'use client';

import { AppShell } from '@/components/layout/AppShell';
import { HeroSection } from '@/components/landing/HeroSection';
import StatsRow from '@/components/landing/StatsRow';
import { LearningPaths } from '@/components/landing/LearningPaths';
import { CoreTopicsSection } from '@/components/landing/CoreTopicsSection';
import { InterviewPreview } from '@/components/landing/InterviewPreview';
import { VersionAwareness } from '@/components/landing/VersionAwareness';

export default function LandingPage() {
  return (
    <AppShell showSidebar={false}>
      <div className="bg-[#0A0A0A] min-h-screen text-neutral-200">
        <HeroSection />
        <StatsRow />
        <LearningPaths />
        <CoreTopicsSection />
        <InterviewPreview />
        <VersionAwareness />

        {/* Footer */}
        <footer className="border-t border-neutral-800 bg-[#0A0A0A] py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-violet-600 flex items-center justify-center font-bold text-white text-[10px]">
                SP
              </div>
              <span className="text-xs font-semibold text-neutral-400">
                SwiftPrep
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              &copy; {new Date().getFullYear()} SwiftPrep. Built for iOS engineers.
            </p>
          </div>
        </footer>
      </div>
    </AppShell>
  );
}
