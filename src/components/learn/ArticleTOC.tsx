'use client';

import { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ContentBlock, HeadingBlock } from '@/types';

interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface ArticleTOCProps {
  blocks: ContentBlock[];
  className?: string;
}

function extractHeadings(blocks: ContentBlock[]): TOCItem[] {
  return blocks
    .filter((b): b is HeadingBlock => b.type === 'heading' && (b.level === 2 || b.level === 3))
    .map(b => ({ id: b.id, text: b.content, level: b.level as 2 | 3 }));
}

function slugify(text: string, id: string): string {
  return `heading-${id}`;
}

// ─── Desktop TOC (right sidebar) ─────────────────────────────────────────────

export function ArticleTOCDesktop({ blocks, className }: ArticleTOCProps) {
  const headings = extractHeadings(blocks);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the topmost visible heading
          const topMost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(topMost.target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    headings.forEach(h => {
      const el = document.getElementById(slugify(h.text, h.id));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [blocks]); // eslint-disable-line react-hooks/exhaustive-deps

  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn('hidden xl:block w-56 shrink-0', className)}
    >
      <div className="sticky top-24">
        <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">
          On this page
        </p>
        <ul className="space-y-1">
          {headings.map(h => {
            const elemId = slugify(h.text, h.id);
            const isActive = activeId === elemId;
            return (
              <li key={h.id}>
                <a
                  href={`#${elemId}`}
                  className={cn(
                    'block text-xs leading-relaxed py-0.5 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    h.level === 3 && 'pl-3',
                    isActive
                      ? 'text-accent font-medium'
                      : 'text-text-tertiary hover:text-text-secondary'
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(elemId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

// ─── Mobile TOC (collapsible drawer) ─────────────────────────────────────────

export function ArticleTOCMobile({ blocks, className }: ArticleTOCProps) {
  const [open, setOpen] = useState(false);
  const headings = extractHeadings(blocks);

  if (headings.length < 2) return null;

  return (
    <div className={cn('xl:hidden my-4', className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs font-medium text-text-secondary border border-border-default px-3 py-2 rounded-lg hover:bg-surface-2 transition-colors w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-expanded={open}
        aria-controls="mobile-toc"
      >
        <List className="w-3.5 h-3.5" aria-hidden="true" />
        <span>On this page</span>
        <ChevronRight
          className={cn('w-3.5 h-3.5 ml-auto transition-transform', open && 'rotate-90')}
          aria-hidden="true"
        />
      </button>

      {open && (
        <nav id="mobile-toc" aria-label="Table of contents" className="mt-2 border border-border-default rounded-lg bg-surface-1 py-2">
          <ul>
            {headings.map(h => (
              <li key={h.id}>
                <a
                  href={`#heading-${h.id}`}
                  className={cn(
                    'block px-4 py-2 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors',
                    h.level === 3 && 'pl-7'
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`heading-${h.id}`)?.scrollIntoView({ behavior: 'smooth' });
                    setOpen(false);
                  }}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
