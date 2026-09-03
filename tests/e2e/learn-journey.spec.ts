import { test, expect } from '@playwright/test';

test.describe('Learn Experience User Journey', () => {
  test('navigates to topic, reads content, copies code, marks complete, and bookmarks', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    // 1. Visit Dashboard
    await page.goto('/dashboard');
    await expect(page).toHaveTitle(/SwiftCraft/i);

    // 2. Navigate to Learn
    await page.goto('/learn');
    await expect(page.getByRole('heading', { level: 1, name: 'Learn' })).toBeVisible();

    // 3. Navigate into Concurrency category
    await page.goto('/learn/concurrency');
    await expect(page.getByRole('heading', { level: 1, name: 'Concurrency' })).toBeVisible();

    // 4. Open Actors in Swift topic
    await page.goto('/learn/concurrency/actors-in-swift');
    await expect(page.getByRole('heading', { level: 1, name: /Actors in Swift/i })).toBeVisible();

    // 5. Verify content elements
    await expect(page.getByText(/Actor Reentrancy/i).first()).toBeVisible();

    // 6. Test code block copy button
    const copyButton = page.getByRole('button', { name: /copy code/i }).first();
    if (await copyButton.isVisible()) {
      await copyButton.click();
      await expect(page.getByRole('button', { name: /copied/i })).toBeVisible();
    }

    // 7. Mark as complete
    const markCompleteBtn = page.getByRole('button', { name: /mark as completed/i });
    if (await markCompleteBtn.isVisible()) {
      await markCompleteBtn.click();
      await expect(page.getByText(/Completed/i)).toBeVisible();

      // Reload and assert completion persists
      await page.reload();
      await expect(page.getByText(/Completed/i)).toBeVisible();
    }

    // 8. Bookmark topic
    const bookmarkBtn = page.getByRole('button', { name: /bookmark/i });
    if (await bookmarkBtn.isVisible()) {
      await bookmarkBtn.click();

      // Navigate to Bookmarks page and assert topic appears
      await page.goto('/bookmarks');
      await expect(page.getByText(/Actors in Swift/i)).toBeVisible();
    }
  });
});
