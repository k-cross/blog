import { expect, test } from '@playwright/test';

test.describe('SEO and metadata validation', () => {
	test('homepage has correct meta tags', async ({ page }) => {
		await page.goto('/');

		// Basic meta
		await expect(page).toHaveTitle(/Ken Cross/);

		// Ensure meta description exists
		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveCount(1);
		await expect(metaDescription).toHaveAttribute('content', /Observations of Progress/);

		// Open Graph tags
		const ogTitle = page.locator('meta[property="og:title"]');
		await expect(ogTitle).toHaveCount(1);
	});

	test('blog post has dynamic valid meta tags', async ({ page }) => {
		await page.goto('/tools'); // Known static post

		await expect(page).toHaveTitle(/Tools/);

		const metaDescription = page.locator('meta[name="description"]');
		await expect(metaDescription).toHaveCount(1);
		await expect(metaDescription).toHaveAttribute('content', /A new age of tooling/);

		// Author meta
		const authorMeta = page.locator('meta[name="author"]');
		await expect(authorMeta).toHaveCount(1);
		await expect(authorMeta).toHaveAttribute('content', /Ken Cross/);
	});
});
