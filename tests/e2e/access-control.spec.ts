import { test, expect } from '@playwright/test';

test.describe('Access Control Topic Page', () => {
  test('renders the full Access Control article with navigation and interview questions', async ({ page }) => {
    const response = await page.goto('/learn/swift/access-control');
    expect(response?.status()).toBe(200);

    // Verify title & heading
    await expect(page.getByRole('heading', { level: 1, name: /Access Control: private, fileprivate, internal, package, public, open/i })).toBeVisible();

    // Verify Quick Answer
    await expect(page.getByText(/Access control keywords determine which parts of your code can see and use a type/i)).toBeVisible();

    // Verify key sections
    await expect(page.getByRole('heading', { level: 2, name: /Why does it matter\?/i })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: /How does it work\?/i })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: /Common mistakes/i })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: /When to use what/i })).toBeVisible();

    // Verify access levels
    await expect(page.getByRole('heading', { level: 3, name: /private — visible only within the enclosing declaration/i })).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: /fileprivate — visible anywhere in the same file/i })).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: /internal — the default, visible throughout the module/i })).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: /package — visible across modules within the same package/i })).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: /public — visible to any module that imports this one/i })).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: /open — visible AND subclassable\/overridable from outside/i })).toBeVisible();

    // Verify Previous / Next navigation links
    const prevLink = page.getByRole('link', { name: /Previous Protocols & Protocol/i });
    await expect(prevLink).toBeVisible();
    await expect(prevLink).toHaveAttribute('href', '/learn/swift/protocols');

    const nextLink = page.getByRole('link', { name: /Next Generics & Type Constraints/i });
    await expect(nextLink).toBeVisible();
    await expect(nextLink).toHaveAttribute('href', '/learn/swift/generics');
  });
});
