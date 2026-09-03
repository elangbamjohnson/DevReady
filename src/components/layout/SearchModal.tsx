'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Search, FileText, MessageSquare, Code, Command } from 'lucide-react';
import { categoryLabel } from '@/lib/utils';
import { topicRepository } from '@/data/topics/index';
import type { SearchResult } from '@/types';

// Build search results from topics + legacy mock questions
function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  topicRepository.getTopics().forEach(topic => {
    results.push({
      id: topic.id,
      title: topic.title,
      category: topic.category,
      type: 'topic',
      snippet: topic.description,
      href: `/learn/${topic.category}/${topic.slug}`,
    });
  });

  return results;
}

const SEARCH_INDEX = buildSearchIndex();

function searchIndex(query: string): SearchResult[] {
  const q = query.toLowerCase();
  return SEARCH_INDEX.filter(r =>
    r.title.toLowerCase().includes(q) ||
    r.snippet.toLowerCase().includes(q) ||
    r.category.toLowerCase().includes(q)
  ).slice(0, 12);
}

const typeIcons = {
  topic: FileText,
  question: MessageSquare,
  code: Code,
} as const;

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setQuery('');
      setResults([]);
    }, 200);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) handleClose();
      }
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    setResults(value.length > 0 ? searchIndex(value) : []);
  }, []);

  if (!isOpen) return null;

  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    if (!acc[r.type]) acc[r.type] = [];
    acc[r.type].push(r);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative w-full max-w-lg mx-4 bg-surface-1 border border-border-default rounded-xl shadow-2xl overflow-hidden animate-scale-in">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border-default">
          <Search className="w-4 h-4 text-text-tertiary shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search topics, concepts, code..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none"
            aria-label="Search"
          />
          <button
            onClick={handleClose}
            className="flex items-center justify-center cursor-pointer min-w-[36px] min-h-[36px]"
            aria-label="Close search (Escape)"
          >
            <kbd className="text-[10px] text-text-tertiary bg-surface-2 px-1.5 py-0.5 rounded border border-border-default font-mono">
              ESC
            </kbd>
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto" role="listbox" aria-label="Search results">
          {query.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-text-tertiary">
                Search topics, Swift concepts, and more
              </p>
              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-text-tertiary">
                <kbd className="flex items-center gap-0.5 bg-surface-2 px-1.5 py-0.5 rounded border border-border-default font-mono">
                  <Command className="w-2.5 h-2.5" />K
                </kbd>
                <span>to toggle search</span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-text-tertiary">
                No results for &ldquo;{query}&rdquo;
              </p>
            </div>
          ) : (
            <div className="py-2">
              {Object.entries(grouped).map(([type, items]) => {
                const Icon = typeIcons[type as keyof typeof typeIcons];
                return (
                  <div key={type}>
                    <div className="px-4 py-1.5">
                      <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">
                        {type === 'topic' ? 'Topics' : type === 'question' ? 'Questions' : 'Code Examples'}
                      </span>
                    </div>
                    {items.map((result) => (
                      <a
                        key={result.id}
                        href={result.href}
                        role="option"
                        aria-selected="false"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-2 transition-colors focus-visible:outline-none focus-visible:bg-surface-2"
                        onClick={handleClose}
                      >
                        <Icon className="w-4 h-4 text-text-tertiary shrink-0" aria-hidden="true" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-text-primary truncate">{result.title}</p>
                          <p className="text-xs text-text-tertiary truncate">{result.snippet}</p>
                        </div>
                        <span className="text-[10px] text-text-tertiary bg-surface-2 px-1.5 py-0.5 rounded shrink-0">
                          {categoryLabel(result.category)}
                        </span>
                      </a>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
