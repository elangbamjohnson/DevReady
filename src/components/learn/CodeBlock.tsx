'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  caption?: string;
  className?: string;
}

type TokenType = 'keyword' | 'type' | 'string' | 'comment' | 'number' | 'decorator' | 'plain';

interface Token {
  type: TokenType;
  text: string;
}

const SWIFT_KEYWORDS = new Set([
  'actor', 'class', 'struct', 'enum', 'protocol', 'extension', 'func', 'var', 'let',
  'private', 'public', 'internal', 'fileprivate', 'open', 'return', 'await', 'async',
  'if', 'else', 'guard', 'switch', 'case', 'default', 'import', 'init', 'deinit',
  'self', 'Self', 'try', 'throw', 'throws', 'rethrows', 'where', 'for', 'in', 'while',
  'repeat', 'defer', 'break', 'continue', 'fallthrough', 'typealias', 'mutating',
  'nonisolated', 'some', 'any', 'final', 'override', 'static', 'lazy', 'weak', 'unowned',
  'do', 'catch', 'as', 'is', 'true', 'false', 'nil', 'super',
]);

const SWIFT_TYPES = new Set([
  'String', 'Int', 'Double', 'Float', 'Bool', 'Data', 'Array', 'Dictionary',
  'Set', 'Optional', 'Error', 'Task', 'TaskGroup', 'MainActor', 'Sendable', 'Void',
  'URL', 'UUID', 'Result', 'View', 'State', 'Binding', 'Observable', 'Published',
  'ObservableObject', 'StateObject', 'EnvironmentObject', 'AnyObject', 'AnyView',
  'UIViewController', 'UIView', 'UITableView', 'UICollectionView', 'UIImage',
  'URLSession', 'JSONDecoder', 'JSONEncoder', 'NSObject', 'NSString', 'NSArray',
]);

function tokenizeCode(code: string): Token[] {
  const tokens: Token[] = [];
  const tokenRegex = /(@[a-zA-Z_][a-zA-Z0-9_]*)|(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*")|(#?[a-zA-Z_][a-zA-Z0-9_]*)|\b(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b|(\s+|[^\s\w"@#/]+)/g;

  let match: RegExpExecArray | null;
  while ((match = tokenRegex.exec(code)) !== null) {
    const [full, decorator, comment, str, word, num] = match;
    if (decorator) {
      tokens.push({ type: 'decorator', text: decorator });
    } else if (comment) {
      tokens.push({ type: 'comment', text: comment });
    } else if (str) {
      tokens.push({ type: 'string', text: str });
    } else if (num) {
      tokens.push({ type: 'number', text: num });
    } else if (word) {
      if (SWIFT_KEYWORDS.has(word)) {
        tokens.push({ type: 'keyword', text: word });
      } else if (SWIFT_TYPES.has(word)) {
        tokens.push({ type: 'type', text: word });
      } else {
        tokens.push({ type: 'plain', text: word });
      }
    } else {
      tokens.push({ type: 'plain', text: full });
    }
  }
  return tokens;
}

const langLabel: Record<string, string> = {
  swift: 'Swift',
  objc: 'Objective-C',
  json: 'JSON',
  bash: 'Bash',
  text: 'Text',
};

export function CodeBlock({ code, language = 'swift', filename, caption, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const tokens = tokenizeCode(code);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available — fail silently
    }
  };

  return (
    <figure className={cn('my-5 rounded-xl overflow-hidden border border-border-default bg-[#0d0d0f]', className)}>
      {/* Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#151518] border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-surface-3 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-surface-3 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-surface-3 inline-block" />
          </div>
          {filename && (
            <span className="text-xs text-text-tertiary font-mono">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-tertiary font-medium uppercase tracking-wider select-none">
            {langLabel[language] ?? language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Code copied to clipboard' : 'Copy code'}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            ) : (
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Code body */}
      <div className="code-block overflow-x-auto p-4 sm:p-5">
        <pre className="m-0 p-0 text-xs sm:text-[13px]">
          <code>
            {tokens.map((token, i) => {
              switch (token.type) {
                case 'keyword':
                  return <span key={i} className="keyword">{token.text}</span>;
                case 'type':
                  return <span key={i} className="type">{token.text}</span>;
                case 'string':
                  return <span key={i} className="string">{token.text}</span>;
                case 'comment':
                  return <span key={i} className="comment">{token.text}</span>;
                case 'number':
                  return <span key={i} className="function">{token.text}</span>;
                case 'decorator':
                  return <span key={i} className="keyword">{token.text}</span>;
                default:
                  return <span key={i} className="text-[#e2e8f0]">{token.text}</span>;
              }
            })}
          </code>
        </pre>
      </div>

      {caption && (
        <figcaption className="px-4 py-2 text-xs text-text-tertiary bg-[#151518] border-t border-border-subtle">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
