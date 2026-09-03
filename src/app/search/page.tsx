'use client';

import { useState, useCallback } from 'react';
import { Search as SearchIcon, FileText, MessageSquare, Code } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/common/Card';
import { Tabs } from '@/components/common/Tabs';
import { CategoryBadge } from '@/components/common/Badge';
import { EmptyState } from '@/components/common/EmptyState';
import { mockSearchResults } from '@/data/mockSearch';
// utils not needed
import type { SearchResult } from '@/types';

const typeIcons = {
  topic: FileText,
  question: MessageSquare,
  code: Code,
} as const;

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Topics', value: 'topic' },
  { label: 'Questions', value: 'question' },
  { label: 'Code Examples', value: 'code' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = useCallback(
    (value: string) => {
      setQuery(value);
      if (value.length > 0) {
        setHasSearched(true);
        const filtered = mockSearchResults.filter((r) => {
          const matchesQuery =
            r.title.toLowerCase().includes(value.toLowerCase()) ||
            r.snippet.toLowerCase().includes(value.toLowerCase());
          const matchesTab = activeTab === 'all' || r.type === activeTab;
          return matchesQuery && matchesTab;
        });
        setResults(filtered);
      } else {
        setHasSearched(false);
        setResults([]);
      }
    },
    [activeTab]
  );

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (query.length > 0) {
      const filtered = mockSearchResults.filter((r) => {
        const matchesQuery =
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.snippet.toLowerCase().includes(query.toLowerCase());
        const matchesTab = tab === 'all' || r.type === tab;
        return matchesQuery && matchesTab;
      });
      setResults(filtered);
    }
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-text-primary flex items-center gap-2">
            <SearchIcon className="w-5 h-5 text-accent" />
            Search
          </h1>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search topics, questions, code examples..."
            value={query}
            onChange={(e) => performSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border-default bg-surface-1 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent transition-colors"
            autoFocus
          />
        </div>

        {/* Category tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} className="mb-6" />

        {/* Results */}
        {!hasSearched ? (
          <div className="text-center py-16">
            <p className="text-sm text-text-tertiary mb-2">
              Search across topics, questions, and code examples
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {['retain cycle', 'actors', 'MVVM', 'weak vs unowned', 'URLSession'].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => performSearch(suggestion)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-border-default text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors cursor-pointer"
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          </div>
        ) : results.length === 0 ? (
          <EmptyState
            icon={SearchIcon}
            title="No search results."
            description={`No results found for "${query}". Try a different search term.`}
          />
        ) : (
          <div className="space-y-2">
            {results.map((result) => {
              const Icon = typeIcons[result.type];
              return (
                <Card key={result.id} hover padding="sm">
                  <a href={result.href} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-2 border border-border-default flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-text-tertiary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-text-primary truncate">
                        {result.title}
                      </h3>
                      <p className="text-xs text-text-tertiary truncate mt-0.5">
                        {result.snippet}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <CategoryBadge category={result.category} />
                      <span className="text-[10px] text-text-tertiary capitalize bg-surface-2 px-1.5 py-0.5 rounded">
                        {result.type}
                      </span>
                    </div>
                  </a>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
