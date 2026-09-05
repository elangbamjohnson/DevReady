import { test, expect } from '@playwright/test';

test.describe('Learn Last Viewed Topic Auto-Redirect & Escape Hatch', () => {
  test('fresh session without progress history stays on /learn browse list', async ({ page }) => {
    // Clear storage to ensure fresh session
    await page.goto('/dashboard');
    await page.evaluate(() => localStorage.clear());

    // Visit /learn directly
    await page.goto('/learn');

    // Should stay on /learn and show the normal category catalog
    await expect(page).toHaveURL(/\/learn$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Learn' })).toBeVisible();
    await expect(page.getByText(/Explore Swift and iOS concepts/i)).toBeVisible();
  });

  test('auto-redirects to last viewed topic when returning to /learn', async ({ page }) => {
    // 1. Visit a topic page
    await page.goto('/learn/swift/optionals');
    await expect(page.getByRole('heading', { level: 1, name: 'Optionals' })).toBeVisible();

    // Verify localStorage has recorded the visit
    const stored = await page.evaluate(() => localStorage.getItem('swiftcraft_progress'));
    expect(stored).toContain('swift-optionals');

    // 2. Navigate away to dashboard
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { level: 1, name: /Good morning/i })).toBeVisible();

    // 3. Click "Learn" in the main navigation
    const learnNavLink = page.getByRole('link', { name: 'Learn', exact: true }).first();
    await learnNavLink.click({ force: true });

    // 4. Assert auto-redirected back to /learn/swift/optionals
    await expect(page).toHaveURL(/\/learn\/swift\/optionals/);
    await expect(page.getByRole('heading', { level: 1, name: 'Optionals' })).toBeVisible();
  });

  test('escape hatch (?browse=1) in breadcrumbs opens browse list without redirecting', async ({ page }) => {
    // 1. Visit topic
    await page.goto('/learn/swift/optionals');
    await expect(page.getByRole('heading', { level: 1, name: 'Optionals' })).toBeVisible();

    // 2. Click the "Learn" breadcrumb link (which contains ?browse=1)
    const breadcrumbLearn = page.getByRole('navigation', { name: 'Breadcrumb' }).getByRole('link', { name: 'Learn' });
    await expect(breadcrumbLearn).toHaveAttribute('href', '/learn?browse=1');
    await breadcrumbLearn.click();

    // 3. Assert URL has ?browse=1 and category catalog is displayed
    await expect(page).toHaveURL(/\/learn\?browse=1/);
    await expect(page.getByRole('heading', { level: 1, name: 'Learn' })).toBeVisible();
    await expect(page.getByText(/Explore Swift and iOS concepts/i)).toBeVisible();

    // 4. Wait slightly to verify no bounce back occurs
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/learn\?browse=1/);
  });

  test('direct visit to /learn?browse=1 stays on browse list even when history exists', async ({ page }) => {
    // Seed progress with a topic
    await page.goto('/learn/swift/optionals');
    await expect(page.getByRole('heading', { level: 1, name: 'Optionals' })).toBeVisible();

    // Directly navigate to /learn?browse=1
    await page.goto('/learn?browse=1');

    // Should stay on browse list
    await expect(page).toHaveURL(/\/learn\?browse=1/);
    await expect(page.getByRole('heading', { level: 1, name: 'Learn' })).toBeVisible();
  });

  test('restores scroll position when returning to a topic', async ({ page }) => {
    await page.goto('/learn/swift/optionals');
    await expect(page.getByRole('heading', { level: 1, name: 'Optionals' })).toBeVisible();

    // Scroll down partway through the article (50% of scrollable range)
    await page.evaluate(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, maxScroll * 0.5);
    });
    await page.waitForTimeout(500); // allow progress-save logic to record it

    // Verify progress was recorded in storage
    const stored = await page.evaluate(() => {
      const raw = localStorage.getItem('swiftcraft_progress');
      return raw ? JSON.parse(raw)['swift-optionals'] : null;
    });
    expect(stored?.progress).toBeGreaterThan(40);

    // Navigate away and back (simulating the redirect flow)
    await page.goto('/');
    await page.goto('/learn/swift/optionals');

    // Wait for restoration to complete
    await page.waitForTimeout(300);

    const scrollY = await page.evaluate(() => window.scrollY);
    const scrollableHeight = await page.evaluate(
      () => document.documentElement.scrollHeight - window.innerHeight
    );
    const restoredPercent = (scrollY / scrollableHeight) * 100;

    // Allow reasonable tolerance — exact pixel match isn't the goal
    expect(restoredPercent).toBeGreaterThan(40);
    expect(restoredPercent).toBeLessThan(60);
  });

  test('restores scroll position around code blocks without jump', async ({ page }) => {
    await page.goto('/learn/swift/optionals');
    const codeBlock = page.locator('pre').first();
    await expect(codeBlock).toBeVisible();

    // Scroll to the code block
    await codeBlock.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500); // allow save debounce to complete

    const codeBlockY = await codeBlock.evaluate((el) => el.getBoundingClientRect().top);

    // Navigate away and back
    await page.goto('/dashboard');
    await page.goto('/learn/swift/optionals');

    // Code block should be at approximately the same viewport position immediately
    await expect(codeBlock).toBeVisible();
    const restoredCodeBlockY = await codeBlock.evaluate((el) => el.getBoundingClientRect().top);
    expect(Math.abs(restoredCodeBlockY - codeBlockY)).toBeLessThan(60);
  });
});
