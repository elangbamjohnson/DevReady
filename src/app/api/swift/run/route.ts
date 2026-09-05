// File: src/app/api/swift/run/route.ts
// Proxy route: resolves the latest Swift compiler ID from Wandbox at request time,
// then forwards the user's code to Wandbox's compile API.
// If Wandbox is unreachable or experiencing upstream outages (e.g. Cloudflare 522),
// it gracefully falls back to native Swift CLI execution if available in the host environment.
// This guarantees that developers & students can always run Swift code reliably.

import { NextRequest, NextResponse } from 'next/server';
import { runLocalSwift } from '@/lib/swiftRunner';

const WANDBOX_LIST_URL = 'https://wandbox.org/api/list.json';
const WANDBOX_COMPILE_URL = 'https://wandbox.org/api/compile.json';
const WANDBOX_TIMEOUT_MS = 5000;

// Maximum payload we accept from the client (16 KiB) to prevent abuse.
const MAX_CODE_BYTES = 16_384;

// ── Types ────────────────────────────────────────────────────────────────────

interface WandboxCompiler {
  name: string;
  language: string;
  version: string;
}

interface WandboxCompileResponse {
  status?: string;
  compiler_output?: string;
  compiler_error?: string;
  program_output?: string;
  program_error?: string;
  signal?: string;
}

// ── Helper: pick the newest Swift compiler from Wandbox ─────────────────────

async function resolveSwiftCompiler(): Promise<string> {
  const res = await fetch(WANDBOX_LIST_URL, {
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(3000),
  });

  if (!res.ok) {
    throw new Error(`Wandbox list API returned ${res.status}`);
  }

  const compilers: WandboxCompiler[] = await res.json();

  const swiftCompilers = compilers
    .filter((c) => c.language === 'Swift')
    .sort((a, b) => b.version.localeCompare(a.version, undefined, { numeric: true }));

  if (swiftCompilers.length === 0) {
    throw new Error('No Swift compiler found on Wandbox');
  }

  return swiftCompilers[0].name; // e.g. "swift-6.0.1"
}

// ── POST handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Validate Content-Type
  const contentType = req.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json(
      { error: 'Content-Type must be application/json' },
      { status: 415 }
    );
  }

  // 2. Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null || !('code' in body)) {
    return NextResponse.json({ error: 'Missing "code" field' }, { status: 400 });
  }

  const code = (body as { code: unknown }).code;
  if (typeof code !== 'string' || code.trim().length === 0) {
    return NextResponse.json({ error: '"code" must be a non-empty string' }, { status: 400 });
  }

  // 3. Enforce size limit
  if (Buffer.byteLength(code, 'utf8') > MAX_CODE_BYTES) {
    return NextResponse.json(
      { error: `Code exceeds the ${MAX_CODE_BYTES / 1024} KiB limit` },
      { status: 413 }
    );
  }

  // 4. Try Wandbox first
  let wandboxError: unknown = null;
  try {
    let compiler = 'swift-6.0.1';
    try {
      compiler = await resolveSwiftCompiler();
    } catch {
      // Keep default 'swift-6.0.1' if list resolution failed
    }

    const wandboxRes = await fetch(WANDBOX_COMPILE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ compiler, code }),
      cache: 'no-store',
      signal: AbortSignal.timeout(WANDBOX_TIMEOUT_MS),
    });

    if (wandboxRes.ok) {
      const data: WandboxCompileResponse = await wandboxRes.json();

      const exitCode = parseInt(data.status ?? '0', 10);
      const compilerError = (data.compiler_error ?? '').trim();
      const programOutput = (data.program_output ?? '').trim();
      const programError = (data.program_error ?? '').trim();
      const compilerOutput = (data.compiler_output ?? '').trim();

      let kind: 'success' | 'compile' | 'runtime';
      if (compilerError) {
        kind = 'compile';
      } else if (exitCode !== 0 || programError) {
        kind = 'runtime';
      } else {
        kind = 'success';
      }

      return NextResponse.json({
        kind,
        compiler,
        output: programOutput || compilerOutput,
        error: compilerError || programError,
        exitCode,
        signal: data.signal ?? null,
      });
    } else {
      wandboxError = new Error(`Wandbox returned ${wandboxRes.status}`);
    }
  } catch (err) {
    wandboxError = err;
  }

  // 5. Wandbox failed or timed out -> Fallback to native Swift execution
  console.warn('[swift/run] Wandbox unavailable, trying native Swift fallback:', wandboxError);

  try {
    const outcome = await runLocalSwift(code);
    return NextResponse.json(outcome);
  } catch (localErr) {
    console.error('[swift/run] Native Swift fallback failed:', localErr);
    return NextResponse.json(
      {
        error:
          'Compiler backend is currently unreachable. Wandbox timed out and local Swift is unavailable.',
      },
      { status: 502 }
    );
  }
}
