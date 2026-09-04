import { test, expect } from '@playwright/test';

test.describe('Curriculum Study Guide Fallback & Navigation', () => {
  test('renders curriculum study guide cleanly without 404 for unwritten topics', async ({ page }) => {
    // Navigate to a curriculum topic that renders as a study guide
    const response = await page.goto('/learn/swift/collections');
    expect(response?.status()).toBe(200);

    // Verify study guide elements
    await expect(page.getByText(/Curriculum Study Guide/i)).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: /Arrays, Sets & Dictionaries/i })).toBeVisible();

    // Verify practice button is present and links to configure with pre-filled topicId
    const practiceLink = page.getByRole('link', { name: /Start Practice Session/i });
    await expect(practiceLink).toBeVisible();
    await expect(practiceLink).toHaveAttribute('href', /interview\/configure\?topicId=swift-collections/);
  });
});
