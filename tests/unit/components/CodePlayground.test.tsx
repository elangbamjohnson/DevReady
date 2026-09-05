import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CodePlayground } from '@/components/code/CodePlayground';

// Mock Monaco Editor for test environment
vi.mock('@monaco-editor/react', () => ({
  default: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <div data-testid="monaco-mock">
      <textarea
        data-testid="monaco-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  ),
}));

describe('CodePlayground Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders editor toolbar and output empty state', () => {
    render(<CodePlayground defaultCode='print("Hello")' />);

    expect(screen.getByText('playground.swift')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /run swift code/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset code to default/i })).toBeInTheDocument();
    expect(screen.getByText(/run your code to see output here/i)).toBeInTheDocument();
  });

  it('executes code and displays success output', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          kind: 'success',
          compiler: 'swift-6.0.1',
          output: 'Hello, World! 🚀',
          error: '',
          exitCode: 0,
          signal: null,
        }),
        { status: 200 }
      )
    );

    render(<CodePlayground defaultCode='print("Hello, World! 🚀")' />);

    const runBtn = screen.getByRole('button', { name: /run swift code/i });
    fireEvent.click(runBtn);

    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Hello, World! 🚀')).toBeInTheDocument();
    });

    expect(fetchSpy).toHaveBeenCalledWith('/api/swift/run', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ code: 'print("Hello, World! 🚀")' }),
    }));
  });

  it('displays compile errors distinctly', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          kind: 'compile',
          compiler: 'swift-6.0.1',
          output: '',
          error: 'cannot find value in scope',
          exitCode: 1,
          signal: null,
        }),
        { status: 200 }
      )
    );

    render(<CodePlayground defaultCode="badCode" />);

    const runBtn = screen.getByRole('button', { name: /run swift code/i });
    fireEvent.click(runBtn);

    await waitFor(() => {
      expect(screen.getByText('Compile Error')).toBeInTheDocument();
      expect(screen.getByText('cannot find value in scope')).toBeInTheDocument();
    });
  });

  it('enforces client-side rate limit after 3 runs', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async () =>
      new Response(
        JSON.stringify({
          kind: 'success',
          compiler: 'swift-6.0.1',
          output: 'done',
          error: '',
          exitCode: 0,
          signal: null,
        }),
        { status: 200 }
      )
    );

    render(<CodePlayground defaultCode='print("Rate limit test")' />);

    const runBtn = screen.getByRole('button', { name: /run swift code/i });

    // 1st run
    fireEvent.click(runBtn);
    await waitFor(() => expect(screen.getByText('done')).toBeInTheDocument());

    // 2nd run
    fireEvent.click(runBtn);
    await waitFor(() => expect(screen.getAllByText('done').length).toBeGreaterThan(0));

    // 3rd run
    fireEvent.click(runBtn);
    await waitFor(() => expect(screen.getAllByText('done').length).toBeGreaterThan(0));

    // 4th run -> should trigger rate limit message
    fireEvent.click(runBtn);
    await waitFor(() => {
      expect(screen.getByText(/Wait \d+(\.\d+)?s/)).toBeInTheDocument();
    });
  });
});
