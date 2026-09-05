// File: src/app/api/swift/run/route.ts
// Proxy route: resolves the latest Swift compiler ID from Wandbox at request time,
// then forwards the user's code to Wandbox's compile API.
// This avoids CORS issues (Wandbox does not set ACAO for direct browser POST)
// and decouples the frontend from a hard-coded compiler version string.

import { NextRequest, NextResponse } from 'next/server';

const WANDBOX_LIST_URL = 'https://wandbox.org/api/list.json';
const WANDBOX_COMPILE_URL = 'https://wandbox.org/api/compile.json';

// Maximum payload we accept from the client (16 KiB) to prevent abuse.
const MAX_CODE_BYTES = 16_384;

// ── Types returned by Wandbox ────────────────────────────────────────────────

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
    // Cache for 1 hour so every user request doesn't hammer the Wandbox list API.
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Wandbox list API returned ${res.status}`);
  }

  const compilers: WandboxCompiler[] = await res.json();

  // Filter to Swift, sort descending by version string, take the first.
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

  // 4. Resolve the current Swift compiler ID
  let compiler: string;
  try {
    compiler = await resolveSwiftCompiler();
  } catch (err) {
    console.error('[swift/run] Failed to resolve compiler:', err);
    return NextResponse.json(
      { error: 'Could not determine Swift compiler. Try again later.' },
      { status: 502 }
    );
  }

  // 5. Forward to Wandbox
  let wandboxRes: Response;
  try {
    wandboxRes = await fetch(WANDBOX_COMPILE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ compiler, code }),
      // No caching — compile results must always be fresh.
      cache: 'no-store',
    });
  } catch (err) {
    console.error('[swift/run] Network error calling Wandbox:', err);
    return NextResponse.json(
      { error: 'Wandbox is unreachable. Check your connection and try again.' },
      { status: 502 }
    );
  }

  if (!wandboxRes.ok) {
    const text = await wandboxRes.text().catch(() => '');
    console.error(`[swift/run] Wandbox returned ${wandboxRes.status}:`, text);
    return NextResponse.json(
      { error: `Compiler service returned ${wandboxRes.status}` },
      { status: 502 }
    );
  }

  const data: WandboxCompileResponse = await wandboxRes.json();

  // 6. Normalise the response into a stable shape the frontend can rely on.
  //    We distinguish between three outcome kinds:
  //      • "success"   — code compiled and ran; program_output is the stdout.
  //      • "compile"   — compilation failed; compiler_error holds diagnostics.
  //      • "runtime"   — compiled but crashed; program_error / signal is set.
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
}
