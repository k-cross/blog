import { expect, test } from '@playwright/test';

test.describe('error handling', () => {
	test('displays custom 404 page for invalid routes', async ({ page }) => {
		const response = await page.goto('/does-not-exist-12345');
		expect(response?.status()).toBe(404);
		await expect(page.locator('h1')).toContainText('404');
		await expect(page.locator('h1.site-title')).toBeVisible();
		await expect(page.getByText('Not Found')).toBeVisible();
	});
});
