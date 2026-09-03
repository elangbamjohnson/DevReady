import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge, DifficultyBadge, CategoryBadge } from '@/components/common/Badge';
import { VersionBadge } from '@/components/learn/VersionBadge';

describe('Badge Components', () => {
  it('renders standard Badge with custom content', () => {
    render(<Badge>Swift 6</Badge>);
    expect(screen.getByText('Swift 6')).toBeInTheDocument();
  });

  it('renders DifficultyBadge with proper labels and style mappings', () => {
    const { rerender } = render(<DifficultyBadge level="junior" />);
    expect(screen.getByText('Junior')).toBeInTheDocument();

    rerender(<DifficultyBadge level="senior" />);
    expect(screen.getByText('Senior')).toBeInTheDocument();

    rerender(<DifficultyBadge level="expert" />);
    expect(screen.getByText('Expert')).toBeInTheDocument();
  });

  it('renders CategoryBadge with friendly category label', () => {
    render(<CategoryBadge category="concurrency" />);
    expect(screen.getByText('Concurrency')).toBeInTheDocument();
  });

  it('renders VersionBadge with status and version indicators', () => {
    render(
      <VersionBadge
        version={{
          language: 'Swift',
          version: '6',
          status: 'beta',
          minimumVersion: '5.0',
        }}
      />
    );

    expect(screen.getByText('Swift 6')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });
});
