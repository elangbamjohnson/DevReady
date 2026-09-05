'use client';

/**
 * CodePlayground — Monaco-backed Swift playground component.
 *
 * Uses dynamic import for the Monaco editor to avoid SSR issues;
 * the editor itself is client-only. The component matches the visual
 * language of the existing CodeBlock: same surface tokens, same
 * border radius, same font stack.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Play,
  Loader2,
  TerminalSquare,
  AlertTriangle,
  CheckCircle2,
  X,
  RotateCcw,
  Copy,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Monaco dynamic import ──────────────────────────────────────────────────
// Loading Monaco dynamically prevents "self is not defined" during SSR.
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="w-5 h-5 animate-spin text-text-tertiary" />
    </div>
  ),
});

// ── Types ──────────────────────────────────────────────────────────────────

type RunKind = 'success' | 'compile' | 'runtime';

interface RunResult {
  kind: RunKind;
  compiler: string;
  output: string;
  error: string;
  exitCode: number;
  signal: string | null;
}

// ── Client-side rate limiter ───────────────────────────────────────────────
// Simple token-bucket: max 3 runs per 60 s window, enforced in-browser.
// (Server-side rate limiting is intentionally out of scope for dev phase.)

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60_000;

function useRateLimiter() {
  const timestamps = useRef<number[]>([]);

  const check = useCallback((): { allowed: boolean; waitMs: number } => {
    const now = Date.now();
    timestamps.current = timestamps.current.filter(
      (t) => now - t < RATE_LIMIT_WINDOW_MS
    );

    if (timestamps.current.length < RATE_LIMIT_MAX) {
      timestamps.current.push(now);
      return { allowed: true, waitMs: 0 };
    }

    const oldest = timestamps.current[0];
    const waitMs = RATE_LIMIT_WINDOW_MS - (now - oldest);
    return { allowed: false, waitMs };
  }, []);

  return check;
}

// ── Props ──────────────────────────────────────────────────────────────────

interface CodePlaygroundProps {
  /** Initial code shown in the editor */
  defaultCode?: string;
  /** Height of the editor panel (CSS value) */
  editorHeight?: string;
  className?: string;
}

const DEFAULT_CODE = `// Welcome to the Swift Playground 🚀
// Write Swift code below and press Run to execute it.

import Foundation

struct Greeter {
    let name: String

    func greet() -> String {
        return "Hello, \\(name)! 👋"
    }
}

let greeter = Greeter(name: "SwiftCraft")
print(greeter.greet())
`;

// ── Helpers ────────────────────────────────────────────────────────────────

function msToSeconds(ms: number): string {
  return (ms / 1000).toFixed(1);
}

// ── Sub-components ─────────────────────────────────────────────────────────

function OutputPanel({ result }: { result: RunResult | null }) {
  const [copied, setCopied] = useState(false);

  const content = result
    ? result.kind === 'success'
      ? result.output || '(no output)'
      : result.error || result.output || '(no output)'
    : null;

  const handleCopy = async () => {
    if (!content) return;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-text-tertiary select-none">
        <TerminalSquare className="w-8 h-8 opacity-30" strokeWidth={1.5} />
        <p className="text-xs">Run your code to see output here</p>
      </div>
    );
  }

  const kindConfig: Record<
    RunKind,
    { label: string; icon: React.ReactNode; colorClass: string; bgClass: string }
  > = {
    success: {
      label: 'Success',
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      colorClass: 'text-emerald-400',
      bgClass: 'bg-emerald-500/10',
    },
    compile: {
      label: 'Compile Error',
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
      colorClass: 'text-amber-400',
      bgClass: 'bg-amber-500/10',
    },
    runtime: {
      label: `Runtime Error${result.signal ? ` (${result.signal})` : ''}`,
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
      colorClass: 'text-rose-400',
      bgClass: 'bg-rose-500/10',
    },
  };

  const cfg = kindConfig[result.kind];

  return (
    <div className="flex flex-col h-full">
      {/* Status bar */}
      <div
        className={cn(
          'flex items-center justify-between px-3 py-1.5 border-b border-border-default',
          cfg.bgClass
        )}
      >
        <div className={cn('flex items-center gap-1.5 text-xs font-medium', cfg.colorClass)}>
          {cfg.icon}
          <span>{cfg.label}</span>
          <span className="text-text-tertiary font-normal ml-1">
            · exit {result.exitCode} · {result.compiler}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer"
          aria-label="Copy output"
        >
          {copied ? (
            <><Check className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Copied</span></>
          ) : (
            <><Copy className="w-3 h-3" /><span>Copy</span></>
          )}
        </button>
      </div>

      {/* Output content */}
      <div className="flex-1 overflow-auto p-4">
        <pre className="code-block text-sm whitespace-pre-wrap break-words leading-relaxed">
          {content}
        </pre>
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export function CodePlayground({
  defaultCode = DEFAULT_CODE,
  editorHeight = '320px',
  className,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(defaultCode);
  const [result, setResult] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitWait, setRateLimitWait] = useState<number | null>(null);

  const checkRate = useRateLimiter();

  // Clear rate-limit countdown
  useEffect(() => {
    if (rateLimitWait === null) return;
    const timer = setTimeout(() => setRateLimitWait(null), rateLimitWait);
    return () => clearTimeout(timer);
  }, [rateLimitWait]);

  const handleRun = useCallback(async () => {
    const { allowed, waitMs } = checkRate();
    if (!allowed) {
      setRateLimitWait(waitMs);
      return;
    }

    setRunning(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch('/api/swift/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
      }

      const data: RunResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setRunning(false);
    }
  }, [code, checkRate]);

  // ⌘+Enter / Ctrl+Enter shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!running) handleRun();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRun, running]);

  const handleReset = () => {
    setCode(defaultCode);
    setResult(null);
    setError(null);
  };

  return (
    <div
      className={cn(
        'rounded-xl border border-border-default bg-surface-0 overflow-hidden',
        'shadow-[0_0_0_1px_rgba(255,255,255,0.04)] flex flex-col',
        className
      )}
    >
      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-default bg-surface-1 shrink-0">
        <div className="flex items-center gap-2.5">
          {/* Traffic-light dots (decorative, same palette as macOS) */}
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] opacity-80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] opacity-80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] opacity-80" />
          <span className="text-xs text-text-tertiary font-mono ml-1">playground.swift</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Reset button */}
          <button
            onClick={handleReset}
            disabled={running}
            className="flex items-center gap-1.5 text-xs text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed px-2 py-1 rounded hover:bg-surface-2"
            aria-label="Reset code to default"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>

          {/* Run button */}
          <button
            id="playground-run-btn"
            onClick={handleRun}
            disabled={running || rateLimitWait !== null}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer',
              'bg-accent hover:bg-accent-hover active:brightness-90 text-white shadow-sm',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            aria-label="Run Swift code"
          >
            {running ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin" /><span>Running…</span></>
            ) : rateLimitWait !== null ? (
              <span>Wait {msToSeconds(rateLimitWait)}s</span>
            ) : (
              <><Play className="w-3.5 h-3.5 fill-current" /><span>Run</span><span className="opacity-60 font-normal hidden sm:inline">⌘↵</span></>
            )}
          </button>
        </div>
      </div>

      {/* ── Editor ───────────────────────────────────────────────────────── */}
      <div style={{ height: editorHeight }} className="shrink-0 relative">
        <MonacoEditor
          height="100%"
          defaultLanguage="swift"
          value={code}
          onChange={(val) => setCode(val ?? '')}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
            fontLigatures: true,
            lineHeight: 22,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6,
            },
            padding: { top: 16, bottom: 16 },
            renderLineHighlight: 'gutter',
            cursorStyle: 'line',
            wordWrap: 'on',
            tabSize: 4,
            insertSpaces: true,
            automaticLayout: true,
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            renderWhitespace: 'none',
            contextmenu: true,
            suggestOnTriggerCharacters: true,
            quickSuggestions: { other: true, comments: false, strings: false },
          }}
          beforeMount={(monaco) => {
            // Match the app's dark surface exactly so there's no jarring white flash.
            monaco.editor.defineTheme('swift-dark', {
              base: 'vs-dark',
              inherit: true,
              rules: [
                { token: 'keyword', foreground: 'c084fc', fontStyle: 'bold' },
                { token: 'type', foreground: '67e8f9' },
                { token: 'string', foreground: '86efac' },
                { token: 'comment', foreground: '71717a', fontStyle: 'italic' },
                { token: 'number', foreground: 'fb923c' },
                { token: 'identifier', foreground: 'e4e4e7' },
                { token: 'delimiter', foreground: '71717a' },
              ],
              colors: {
                'editor.background': '#09090b',         // surface-0
                'editor.foreground': '#fafafa',          // text-primary
                'editorLineNumber.foreground': '#3f3f46',
                'editorLineNumber.activeForeground': '#71717a',
                'editor.lineHighlightBackground': '#18181b',   // surface-2
                'editor.selectionBackground': '#6366f133',
                'editor.inactiveSelectionBackground': '#6366f122',
                'editorCursor.foreground': '#818cf8',
                'editorIndentGuide.background1': '#27272a',
                'editorIndentGuide.activeBackground1': '#3f3f46',
              },
            });
            monaco.editor.setTheme('swift-dark');
          }}
          onMount={(editor, monaco) => {
            monaco.editor.setTheme('swift-dark');
            // Focus the editor when mounted
            editor.focus();
          }}
        />
      </div>

      {/* ── Output panel ─────────────────────────────────────────────────── */}
      <div className="border-t border-border-default bg-surface-1" style={{ minHeight: '160px', maxHeight: '320px' }}>
        {/* Output panel header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border-default">
          <div className="flex items-center gap-2">
            <TerminalSquare className="w-3.5 h-3.5 text-text-tertiary" strokeWidth={1.75} />
            <span className="text-xs text-text-tertiary font-medium tracking-wide uppercase">Output</span>
          </div>
          {result && (
            <button
              onClick={() => { setResult(null); setError(null); }}
              className="text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer p-0.5 rounded"
              aria-label="Clear output"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Error banner (network/proxy errors, distinct from compiler errors) */}
        {error && (
          <div className="mx-4 mt-3 flex items-start gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-400">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div style={{ height: result ? '200px' : '120px' }} className="overflow-hidden">
          <OutputPanel result={result} />
        </div>
      </div>
    </div>
  );
}
