import { expect, test } from '@playwright/test';

test('homepage loads and displays links', async ({ page }) => {
	await page.goto('/', { waitUntil: 'domcontentloaded' });
	await expect(page).toHaveTitle(/Ken Cross/);

	const links = page.locator('a');
	const count = await links.count();
	expect(count).toBeGreaterThan(0);
});

test('can navigate to a blog post', async ({ page }) => {
	await page.goto('/');
	// Click first post card link
	const firstPostLink = page.locator('.post-card-content-link').first();
	await firstPostLink.click();

	await expect(page).toHaveURL(/\/.*\/$/); // Should end with a slug/
	await expect(page.locator('canvas.mermaid')).toBeHidden(); // Ensure no raw mermaid text
});

test('check for broken links on homepage', async ({ page }) => {
	await page.goto('/');
	const links = await page.evaluate(() => {
		return Array.from(document.querySelectorAll('a'))
			.map((a) => a.href)
			.filter((href) => href && !href.startsWith('mailto:') && !href.startsWith('tel:'));
	});

	for (const link of links) {
		const response = await page.request.get(link);
		expect(response.status()).toBeLessThan(400);
	}
});
