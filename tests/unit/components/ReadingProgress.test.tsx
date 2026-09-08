import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReadingProgress } from '@/components/learn/ReadingProgress';

describe('ReadingProgress Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders initial progress as 0 for SSR hydration stability even when stored progress exists', () => {
    // Pre-populate localStorage with previous reading progress
    localStorage.setItem(
      'swiftcraft_progress',
      JSON.stringify({
        'test-topic': { progress: 92, lastViewedAt: new Date().toISOString() },
      })
    );

    render(<ReadingProgress topicId="test-topic" />);
    const progressBar = screen.getByRole('progressbar', { name: 'Reading progress' });

    expect(progressBar).toBeInTheDocument();
    // Initial render must be 0 to match SSR output and prevent React hydration mismatch
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('renders clean progressbar structure without targetId or topicId', () => {
    render(<ReadingProgress />);
    const progressBar = screen.getByRole('progressbar', { name: 'Reading progress' });

    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
  });
});
