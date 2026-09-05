// File: src/app/playground/page.tsx
// Standalone Swift Playground page — backed by Wandbox via /api/swift/run

import type { Metadata } from 'next';
import { AppShell } from '@/components/layout/AppShell';
import { PlaygroundPageClient } from './PlaygroundPageClient';

export const metadata: Metadata = {
  title: 'Swift Playground',
  description:
    'Write and run Swift code in your browser. Powered by Wandbox — no installation needed.',
  keywords: ['Swift playground', 'run Swift online', 'Swift REPL', 'iOS coding practice'],
};

export default function PlaygroundPage() {
  return (
    <AppShell>
      <PlaygroundPageClient />
    </AppShell>
  );
}
