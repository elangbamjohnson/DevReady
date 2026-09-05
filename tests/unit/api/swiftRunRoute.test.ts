import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/swift/run/route';
import { runLocalSwift } from '@/lib/swiftRunner';

vi.mock('@/lib/swiftRunner', () => ({
  runLocalSwift: vi.fn(),
}));

describe('Swift Playground API Route (/api/swift/run)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('rejects requests with missing or non-json Content-Type', async () => {
    const req = new NextRequest('http://localhost/api/swift/run', {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: 'print("hello")',
    });

    const res = await POST(req);
    expect(res.status).toBe(415);
    const data = await res.json();
    expect(data.error).toContain('Content-Type must be application/json');
  });

  it('rejects missing or empty code', async () => {
    const req = new NextRequest('http://localhost/api/swift/run', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code: '   ' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('non-empty string');
  });

  it('rejects code exceeding the size limit', async () => {
    const hugeCode = 'a'.repeat(20_000);
    const req = new NextRequest('http://localhost/api/swift/run', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code: hugeCode }),
    });

    const res = await POST(req);
    expect(res.status).toBe(413);
    const data = await res.json();
    expect(data.error).toContain('limit');
  });

  it('handles successful compilation and execution', async () => {
    const mockList = [
      { name: 'swift-5.10.1', version: '5.10.1', language: 'Swift' },
      { name: 'swift-6.0.1', version: '6.0.1', language: 'Swift' },
      { name: 'gcc-14.1.0', version: '14.1.0', language: 'C++' },
    ];

    const mockCompile = {
      status: '0',
      program_output: 'Hello, Swift!\n',
    };

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async (url, init) => {
      const urlStr = url.toString();
      if (urlStr.includes('list.json')) {
        return new Response(JSON.stringify(mockList), { status: 200 });
      }
      if (urlStr.includes('compile.json')) {
        const body = JSON.parse((init?.body as string) ?? '{}');
        expect(body.compiler).toBe('swift-6.0.1');
        expect(body.code).toBe('print("Hello, Swift!")');
        return new Response(JSON.stringify(mockCompile), { status: 200 });
      }
      return new Response('Not found', { status: 404 });
    });

    const req = new NextRequest('http://localhost/api/swift/run', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code: 'print("Hello, Swift!")' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();

    expect(data.kind).toBe('success');
    expect(data.compiler).toBe('swift-6.0.1');
    expect(data.output).toBe('Hello, Swift!');
    expect(data.exitCode).toBe(0);

    fetchSpy.mockRestore();
  });

  it('correctly categorizes compiler errors', async () => {
    const mockList = [{ name: 'swift-6.0.1', version: '6.0.1', language: 'Swift' }];
    const mockCompile = {
      status: '1',
      compiler_error: 'prog.swift:1:1: error: cannot find "foo" in scope\nfoo\n^\n',
    };

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => {
      if (url.toString().includes('list.json')) {
        return new Response(JSON.stringify(mockList), { status: 200 });
      }
      return new Response(JSON.stringify(mockCompile), { status: 200 });
    });

    const req = new NextRequest('http://localhost/api/swift/run', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code: 'foo' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();

    expect(data.kind).toBe('compile');
    expect(data.error).toContain('cannot find "foo" in scope');

    fetchSpy.mockRestore();
  });

  it('correctly categorizes runtime crashes / errors', async () => {
    const mockList = [{ name: 'swift-6.0.1', version: '6.0.1', language: 'Swift' }];
    const mockCompile = {
      status: '134',
      signal: 'SIGABRT',
      program_error: 'Fatal error: Index out of range',
    };

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => {
      if (url.toString().includes('list.json')) {
        return new Response(JSON.stringify(mockList), { status: 200 });
      }
      return new Response(JSON.stringify(mockCompile), { status: 200 });
    });

    const req = new NextRequest('http://localhost/api/swift/run', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code: 'let arr = [1]; print(arr[5])' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();

    expect(data.kind).toBe('runtime');
    expect(data.error).toContain('Fatal error: Index out of range');
    expect(data.signal).toBe('SIGABRT');
    expect(data.exitCode).toBe(134);

    fetchSpy.mockRestore();
  });

  it('handles wandbox failure by gracefully falling back to native runner', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
      throw new Error('Network timeout');
    });

    vi.mocked(runLocalSwift).mockResolvedValueOnce({
      kind: 'success',
      compiler: 'Apple Swift 6 (native)',
      output: 'fallback worked',
      error: '',
      exitCode: 0,
      signal: null,
    });

    const req = new NextRequest('http://localhost/api/swift/run', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code: 'print("fallback worked")' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.output).toBe('fallback worked');
    expect(data.kind).toBe('success');

    fetchSpy.mockRestore();
  });

  it('handles total failure when both wandbox and native runner fail', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
      throw new Error('Network timeout');
    });

    vi.mocked(runLocalSwift).mockRejectedValueOnce(new Error('Swift CLI unavailable'));

    const req = new NextRequest('http://localhost/api/swift/run', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code: 'print("test")' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(502);
    const data = await res.json();
    expect(data.error).toContain('Compiler backend is currently unreachable');

    fetchSpy.mockRestore();
  });
});
