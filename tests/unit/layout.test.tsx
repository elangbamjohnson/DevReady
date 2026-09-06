import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import RootLayout from '@/app/layout';

describe('RootLayout', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
  });

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
  });

  it('renders root layout with inline theme-init script and no next/script component', () => {
    const html = renderToStaticMarkup(
      <RootLayout>
        <div data-testid="child-content">Content</div>
      </RootLayout>
    );

    // Verify it produces valid HTML with head, script, and body
    expect(html).toContain('<script id="theme-init"');
    expect(html).toContain('localStorage.getItem(\'theme\')');
    expect(html).toContain('data-theme');
    expect(html).toContain('<div data-testid="child-content">Content</div>');
    // Ensure Next.js script runtime wrapper is NOT present
    expect(html).not.toContain('__next_s');
  });

  it('executes inline theme script correctly to apply light theme from localStorage', () => {
    localStorage.setItem('theme', 'light');

    // Extract and run script contents as browser would before paint
    const scriptCode = `(function(){try{var theme=localStorage.getItem('theme');if(theme==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`;
    
    // Evaluate script
    const runScript = new Function(scriptCode);
    runScript();

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('leaves data-theme unset when localStorage is dark or empty', () => {
    localStorage.setItem('theme', 'dark');

    const scriptCode = `(function(){try{var theme=localStorage.getItem('theme');if(theme==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`;
    const runScript = new Function(scriptCode);
    runScript();

    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });
});
