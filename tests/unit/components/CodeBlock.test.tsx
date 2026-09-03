import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CodeBlock } from '@/components/learn/CodeBlock';

describe('CodeBlock Component', () => {
  let writeTextMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeTextMock = vi.fn().mockImplementation(() => Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: writeTextMock,
      },
      writable: true,
      configurable: true,
    });
  });

  it('renders code snippet and language label correctly', () => {
    const sampleCode = 'actor BankAccount {\n  var balance = 100\n}';
    render(<CodeBlock code={sampleCode} language="swift" filename="Account.swift" />);

    expect(screen.getByText('Account.swift')).toBeInTheDocument();
    expect(screen.getByText('Swift')).toBeInTheDocument();
    expect(screen.getByText('BankAccount')).toBeInTheDocument();
  });

  it('copies code to clipboard when clicking copy button', async () => {
    const sampleCode = 'let answer = 42';

    render(<CodeBlock code={sampleCode} language="swift" />);

    const copyBtn = screen.getByRole('button', { name: /copy code/i });
    expect(copyBtn).toBeInTheDocument();

    fireEvent.click(copyBtn);

    expect(writeTextMock).toHaveBeenCalledWith(sampleCode);
    expect(await screen.findByRole('button', { name: /code copied to clipboard/i })).toBeInTheDocument();
  });
});
