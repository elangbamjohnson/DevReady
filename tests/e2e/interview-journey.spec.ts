import { test, expect } from '@playwright/test';

test.describe('Interview Experience User Journey', () => {
  test('launches track, reveals answer, rates performance, and reviews results', async ({ page }) => {
    // 1. Navigate to Interview Overview
    await page.goto('/interview');
    await expect(page.getByRole('heading', { level: 1, name: /Interview Practice/i })).toBeVisible();

    // 2. Start Junior Track
    const startJuniorBtn = page.getByRole('button', { name: /Start Interview/i }).first();
    await expect(startJuniorBtn).toBeVisible();
    await expect(async () => {
      await startJuniorBtn.click();
      await expect(page).toHaveURL(/\/interview\/session\//, { timeout: 3000 });
    }).toPass({ timeout: 10000 });

    // 3. Arrive at session page
    await expect(page.getByText(/Question 1 of/i)).toBeVisible();

    // 4. Think State -> Reveal Model Answer
    const revealBtn = page.getByRole('button', { name: /Reveal Model Answer/i });
    await expect(revealBtn).toBeVisible();
    await revealBtn.click();

    // 5. Verify revealed sections
    await expect(page.getByText(/Model Answer/i)).toBeVisible();
    await expect(page.getByText(/What a Strong Candidate Should Mention/i)).toBeVisible();

    // 6. Test Interviewer Follow-Up expansion
    const followUpBtn = page.getByRole('button', { name: /Interviewer Follow-Up/i });
    if (await followUpBtn.isVisible()) {
      await followUpBtn.click();
      await expect(page.getByRole('button', { name: /Reveal Follow-up Answer/i })).toBeVisible();
    }

    // 7. Select Self-Assessment rating
    const goodRatingBtn = page.getByRole('button', { name: /Good/i });
    await expect(goodRatingBtn).toBeVisible();
    await goodRatingBtn.click();

    // 8. Verify Next Question button is ready
    const nextBtn = page.getByRole('button', { name: /Next Question/i });
    await expect(nextBtn).toBeVisible();
  });
});
