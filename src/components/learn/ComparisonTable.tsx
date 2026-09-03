import { cn } from '@/lib/utils';
import type { TableBlock, ComparisonBlock } from '@/types';

// ─── Generic Table ─────────────────────────────────────────────────────────────

interface TableProps {
  block: TableBlock;
  className?: string;
}

export function ContentTable({ block, className }: TableProps) {
  return (
    <figure className={cn('my-6 overflow-x-auto', className)}>
      <table className="w-full text-sm border-collapse min-w-[400px]">
        <thead>
          <tr className="border-b border-border-default">
            {block.headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-2.5 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-border-subtle hover:bg-surface-1 transition-colors"
            >
              {row.cells.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    'px-4 py-2.5 text-text-secondary',
                    j === 0 && 'font-medium text-text-primary'
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {block.caption && (
        <figcaption className="mt-2 text-xs text-text-tertiary text-center">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─── Code Comparison (Side-by-Side) ───────────────────────────────────────────

import { CodeBlock } from './CodeBlock';

interface ComparisonProps {
  block: ComparisonBlock;
  className?: string;
}

export function ComparisonTable({ block, className }: ComparisonProps) {
  // If it has code (side-by-side code blocks)
  if (block.leftCode || block.rightCode) {
    return (
      <div className={cn('my-6', className)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2 px-1">
              {block.leftLabel}
            </p>
            {block.leftCode && (
              <CodeBlock
                code={block.leftCode}
                language={(block.leftLanguage as 'swift' | 'objc' | 'json' | 'bash' | 'text') ?? 'swift'}
              />
            )}
          </div>
          <div>
            <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2 px-1">
              {block.rightLabel}
            </p>
            {block.rightCode && (
              <CodeBlock
                code={block.rightCode}
                language={(block.rightLanguage as 'swift' | 'objc' | 'json' | 'bash' | 'text') ?? 'swift'}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Attribute comparison rows
  return (
    <div className={cn('my-6 overflow-x-auto', className)}>
      <table className="w-full text-sm border-collapse min-w-[300px]">
        <thead>
          <tr className="border-b border-border-default">
            <th className="px-4 py-2.5 text-left text-xs text-text-tertiary uppercase tracking-wider w-32" />
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
              {block.leftLabel}
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
              {block.rightLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {(block.rows ?? []).map((row, i) => (
            <tr
              key={i}
              className="border-b border-border-subtle hover:bg-surface-1 transition-colors"
            >
              <td className="px-4 py-2.5 text-xs font-medium text-text-tertiary">{row.label}</td>
              <td className="px-4 py-2.5 text-text-secondary">{row.left}</td>
              <td className="px-4 py-2.5 text-text-secondary">{row.right}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
