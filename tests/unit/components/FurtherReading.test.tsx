import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FurtherReading } from '@/components/learn/FurtherReading';
import type { FurtherReadingItem } from '@/types';

describe('FurtherReading Component', () => {
  it('returns null when items is undefined or empty', () => {
    const { container: c1 } = render(<FurtherReading />);
    expect(c1.firstChild).toBeNull();

    const { container: c2 } = render(<FurtherReading items={[]} />);
    expect(c2.firstChild).toBeNull();
  });

  it('renders section heading and subtitle', () => {
    const items: FurtherReadingItem[] = [
      {
        title: 'The Basics — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics',
        source: 'swift-org',
      },
    ];

    render(<FurtherReading items={items} />);

    expect(screen.getByRole('region', { name: /Further Reading/i })).toBeInTheDocument();
    expect(screen.getByText(/Further Reading/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Official Apple\/Swift\.org documentation for deeper reference/i)
    ).toBeInTheDocument();
  });

  it('renders external links with correct URLs, targets, rel attributes, and domain badges', () => {
    const items: FurtherReadingItem[] = [
      {
        title: 'Optional — Swift Standard Library',
        url: 'https://developer.apple.com/documentation/swift/optional',
        source: 'apple-developer',
      },
      {
        title: 'The Basics (Optionals section) — The Swift Programming Language',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics',
        source: 'swift-org',
      },
    ];

    render(<FurtherReading items={items} />);

    // Domain badges
    expect(screen.getByText('developer.apple.com')).toBeInTheDocument();
    expect(screen.getByText('docs.swift.org')).toBeInTheDocument();

    // Link 1
    const link1 = screen.getByRole('link', { name: /Optional — Swift Standard Library/i });
    expect(link1).toHaveAttribute('href', 'https://developer.apple.com/documentation/swift/optional');
    expect(link1).toHaveAttribute('target', '_blank');
    expect(link1).toHaveAttribute('rel', 'noopener noreferrer');

    // Link 2
    const link2 = screen.getByRole('link', {
      name: /The Basics \(Optionals section\) — The Swift Programming Language/i,
    });
    expect(link2).toHaveAttribute(
      'href',
      'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics'
    );
    expect(link2).toHaveAttribute('target', '_blank');
    expect(link2).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
