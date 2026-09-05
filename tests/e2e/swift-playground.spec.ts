import { test, expect } from '@playwright/test';

test.describe('Swift Playground Page', () => {
  test('renders the playground page with editor, examples, and output panel', async ({ page }) => {
    // Intercept the /api/swift/run route to return deterministic result without relying on Wandbox network in CI/tests
    await page.route('/api/swift/run', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          kind: 'success',
          compiler: 'swift-6.0.1',
          output: 'Hello, Playground E2E!',
          error: '',
          exitCode: 0,
          signal: null,
        }),
      });
    });

    await page.goto('/playground');

    // Heading and description
    await expect(page.getByRole('heading', { level: 1, name: /Write & Run Swift in Your Browser/i })).toBeVisible();

    // Editor toolbar
    await expect(page.getByText('playground.swift')).toBeVisible();
    const runButton = page.locator('#playground-run-btn');
    await expect(runButton).toBeVisible();

    // Example picker buttons
    await expect(page.getByRole('button', { name: 'Hello, World' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Optionals' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Protocols' })).toBeVisible();

    // Output panel initial state
    await expect(page.getByText(/Run your code to see output here/i)).toBeVisible();

    // Click Run
    await runButton.click();

    // Output panel should display result
    await expect(page.getByText('Success')).toBeVisible();
    await expect(page.getByText('Hello, Playground E2E!')).toBeVisible();
  });
});
