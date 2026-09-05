'use client';

// File: src/app/playground/PlaygroundPageClient.tsx
// Page body for /playground — purely presentational layout around <CodePlayground>.

import { useEffect, useState } from 'react';
import { CodePlayground } from '@/components/code/CodePlayground';
import { Sparkles, Info } from 'lucide-react';

const EXAMPLES = [
  {
    label: 'Hello, World',
    code: `import Foundation\n\nprint("Hello, World! 🌍")`,
  },
  {
    label: 'Optionals',
    code: `import Foundation\n\nfunc greet(_ name: String?) -> String {\n    guard let name = name else {\n        return "Hello, stranger!"\n    }\n    return "Hello, \\(name)!"\n}\n\nprint(greet("Swift"))\nprint(greet(nil))`,
  },
  {
    label: 'Protocols',
    code: `import Foundation\n\nprotocol Describable {\n    var description: String { get }\n}\n\nstruct Point: Describable {\n    let x: Double\n    let y: Double\n\n    var description: String {\n        return "Point(\\(x), \\(y))"\n    }\n}\n\nlet p = Point(x: 3.0, y: 4.0)\nprint(p.description)`,
  },
  {
    label: 'Generics',
    code: `import Foundation\n\nfunc swap<T>(_ a: inout T, _ b: inout T) {\n    let temp = a\n    a = b\n    b = temp\n}\n\nvar x = 10\nvar y = 20\nswap(&x, &y)\nprint("x =", x, "y =", y)`,
  },
  {
    label: 'Closures',
    code: `import Foundation\n\nlet numbers = [5, 3, 8, 1, 9, 2, 7]\nlet sorted = numbers.sorted { $0 < $1 }\nlet doubled = numbers.map { $0 * 2 }\nlet evens = numbers.filter { $0 % 2 == 0 }\n\nprint("Sorted:", sorted)\nprint("Doubled:", doubled)\nprint("Evens:", evens)`,
  },
];

// Wrapper that wires the example picker events to CodePlayground.
function PlaygroundWithExampleSupport() {
  const [exampleCode, setExampleCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ code: string }>).detail;
      setExampleCode(detail.code);
    };
    window.addEventListener('playground:load-example', handler);
    return () => window.removeEventListener('playground:load-example', handler);
  }, []);

  return (
    <CodePlayground
      // re-mount whenever a new example is loaded so defaultCode takes effect cleanly
      key={exampleCode ?? '__default__'}
      defaultCode={exampleCode}
      editorHeight="340px"
    />
  );
}

export function PlaygroundPageClient() {
  return (
    <div className="min-h-screen bg-surface-0">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ── Hero header ───────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-accent" strokeWidth={1.75} />
            </div>
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">
              Swift Playground
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2 leading-tight">
            Write &amp; Run Swift in Your Browser
          </h1>
          <p className="text-text-secondary text-sm sm:text-base max-w-2xl leading-relaxed">
            An interactive sandbox powered by{' '}
            <a
              href="https://wandbox.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
            >
              Wandbox
            </a>
            . Write Swift code, press{' '}
            <kbd className="inline-flex items-center rounded border border-border-default bg-surface-2 px-1.5 py-0.5 text-xs font-mono text-text-secondary">
              ⌘↵
            </kbd>{' '}
            or click <strong className="text-text-primary">Run</strong>, and see real compiler
            output instantly.
          </p>
        </div>

        {/* ── Example picker ────────────────────────────────────────────── */}
        <div className="mb-5 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-text-tertiary shrink-0">Load example:</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              id={`example-${ex.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              data-testid={`example-${ex.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent('playground:load-example', { detail: { code: ex.code } })
                );
              }}
              className="text-xs px-2.5 py-1 rounded-md border border-border-default bg-surface-1 text-text-secondary hover:text-text-primary hover:border-accent/50 hover:bg-surface-2 transition-all cursor-pointer"
            >
              {ex.label}
            </button>
          ))}
        </div>

        {/* ── Playground ────────────────────────────────────────────────── */}
        <PlaygroundWithExampleSupport />

        {/* ── Info callout ──────────────────────────────────────────────── */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-border-default bg-surface-1 p-4 text-xs text-text-tertiary">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-text-tertiary" strokeWidth={1.75} />
          <div className="leading-relaxed space-y-1">
            <p>
              <strong className="text-text-secondary">Powered by Wandbox</strong> — a free, public
              online compiler service. Code is sent to Wandbox servers for compilation.
            </p>
            <p>Rate-limited to 3 runs per minute client-side. No account required.</p>
            <p>
              <strong className="text-text-secondary">Supported:</strong> Standard Library,
              Foundation. Apple frameworks (UIKit, SwiftUI) are not available in this environment.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
