import { test, expect } from '@playwright/test';

test.describe('Learn Section Next & Previous Navigation', () => {
  test('navigates sequentially forward and backward through Swift language topics in exact curriculum order', async ({ page }) => {
    // 1. Start at Optionals
    await page.goto('/learn/swift/optionals');
    await expect(page.getByRole('heading', { level: 1, name: 'Optionals' })).toBeVisible();

    // Helper to click next/previous safely across viewports
    const prevNav = page.locator('nav[aria-label="Topic navigation"]').getByRole('link', { name: /previous/i });
    const nextNav = page.locator('nav[aria-label="Topic navigation"]').getByRole('link', { name: /next/i });

    // 2. Click Previous -> should navigate back to Variables & Types
    await expect(prevNav).toBeVisible();
    await prevNav.click({ force: true });
    await expect(page).toHaveURL(/\/learn\/swift\/variables-and-types/);
    await expect(page.getByRole('heading', { level: 1, name: /Variables, Constants & Type Inference/i })).toBeVisible();

    // 3. Click Next -> Optionals
    await nextNav.click({ force: true });
    await expect(page).toHaveURL(/\/learn\/swift\/optionals/);

    // 4. Click Next -> Struct vs Class
    await nextNav.click({ force: true });
    await expect(page).toHaveURL(/\/learn\/swift\/struct-vs-class/);
    await expect(page.getByRole('heading', { level: 1, name: /Struct vs Class/i })).toBeVisible();

    // 5. Click Next -> Control Flow (ensures fix: not jumping to closures!)
    await nextNav.click({ force: true });
    await expect(page).toHaveURL(/\/learn\/swift\/control-flow/);
    await expect(page.getByRole('heading', { level: 1, name: /Control Flow & Pattern Matching/i })).toBeVisible();

    // 6. Click Next -> Functions
    await nextNav.click({ force: true });
    await expect(page).toHaveURL(/\/learn\/swift\/functions/);
    await expect(page.getByRole('heading', { level: 1, name: /Functions & Parameter Semantics/i })).toBeVisible();

    // 7. Click Next -> Closures
    await nextNav.click({ force: true });
    await expect(page).toHaveURL(/\/learn\/swift\/closures/);
    await expect(page.getByRole('heading', { level: 1, name: /Closures & Capture Lists/i })).toBeVisible();

    // 8. Click Next -> Collections
    await nextNav.click({ force: true });
    await expect(page).toHaveURL(/\/learn\/swift\/collections/);
    await expect(page.getByRole('heading', { level: 1, name: /Arrays, Sets & Dictionaries/i })).toBeVisible();

    // 9. Click Previous from Collections -> Closures
    await prevNav.click({ force: true });
    await expect(page).toHaveURL(/\/learn\/swift\/closures/);

    // 10. Click Previous from Closures -> Functions
    await prevNav.click({ force: true });
    await expect(page).toHaveURL(/\/learn\/swift\/functions/);
  });

  test('navigates sequentially forward and backward through Swift Concurrency topics in exact curriculum order', async ({ page }) => {
    // 1. Start at async/await
    await page.goto('/learn/concurrency/async-await');
    await expect(page.getByRole('heading', { level: 1, name: /async\/await/i })).toBeVisible();

    const prevNav = page.locator('nav[aria-label="Topic navigation"]').getByRole('link', { name: /previous/i });
    const nextNav = page.locator('nav[aria-label="Topic navigation"]').getByRole('link', { name: /next/i });

    // First topic in concurrency should have no Previous button
    await expect(prevNav).toHaveCount(0);

    // 2. Next -> Task
    await nextNav.click({ force: true });
    await expect(page).toHaveURL(/\/learn\/concurrency\/task/);
    await expect(page.getByRole('heading', { level: 1, name: /^Task$/i })).toBeVisible();

    // 3. Next -> TaskGroup
    await nextNav.click({ force: true });
    await expect(page).toHaveURL(/\/learn\/concurrency\/task-groups/);
    await expect(page.getByRole('heading', { level: 1, name: /TaskGroup/i })).toBeVisible();

    // 4. Next -> Actors in Swift
    await nextNav.click({ force: true });
    await expect(page).toHaveURL(/\/learn\/concurrency\/actors-in-swift/);
    await expect(page.getByRole('heading', { level: 1, name: /Actors in Swift/i })).toBeVisible();

    // 5. Previous from Actors in Swift -> TaskGroup (ensuring symmetry!)
    await prevNav.click({ force: true });
    await expect(page).toHaveURL(/\/learn\/concurrency\/task-groups/);

    // Return to Actors -> Next -> @MainActor
    await nextNav.click({ force: true });
    await expect(page).toHaveURL(/\/learn\/concurrency\/actors-in-swift/);
    await nextNav.click({ force: true });
    await expect(page).toHaveURL(/\/learn\/concurrency\/mainactor/);
    await expect(page.getByRole('heading', { level: 1, name: /@MainActor/i })).toBeVisible();

    // 6. Next -> Sendable
    await nextNav.click({ force: true });
    await expect(page).toHaveURL(/\/learn\/concurrency\/sendable/);
    await expect(page.getByRole('heading', { level: 1, name: /^Sendable$/i })).toBeVisible();

    // Sendable is the last available topic, so it should not have a Next button leading into an infinite loop
    await expect(nextNav).toHaveCount(0);

    // Previous from Sendable -> @MainActor
    await prevNav.click({ force: true });
    await expect(page).toHaveURL(/\/learn\/concurrency\/mainactor/);
  });
});
