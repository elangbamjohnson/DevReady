import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookmarkButton } from '@/components/learn/BookmarkButton';
import type { ArticleTopic } from '@/types';

const mockTopic: ArticleTopic = {
  id: 'test-topic',
  slug: 'test-topic',
  title: 'Test Topic',
  category: 'swift',
  group: 'Swift Fundamentals',
  description: 'A test topic for bookmarking',
  difficulty: 'foundational',
  estimatedTime: 10,
  language: 'swift',
  version: { language: 'Swift', version: '6', status: 'current' },
  interviewRelevance: 'high',
  tags: ['test'],
  relatedTopics: [],
  content: [],
};

describe('BookmarkButton Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders with initial unbookmarked state and aria-label', () => {
    render(<BookmarkButton topic={mockTopic} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Bookmark this topic');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('toggles bookmark state on click and updates aria attributes', () => {
    render(<BookmarkButton topic={mockTopic} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Remove bookmark');
    expect(button).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Bookmark this topic');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });
});
