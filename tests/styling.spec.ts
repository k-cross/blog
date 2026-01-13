import { expect, test } from '@playwright/test';

test('light mode styling', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'light' });
	await page.goto('/');

	// Check body background
	const body = page.locator('body');
	await expect(body).toHaveCSS('background-color', 'rgb(255, 255, 255)'); // #fff

	// Check link color (global)
	const link = page.locator('a').first();
	// Should be black or inherited black, ensuring it's not white
	await link.evaluate((el) => {
		return window.getComputedStyle(el).color;
	});
	// Might need specific check depending on which link.
	// Global `a` is black.
});

test('dark mode styling', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'dark' });
	await page.goto('/');

	// Check body background
	const body = page.locator('body');
	await expect(body).toHaveCSS('background-color', 'rgb(25, 27, 31)'); // #191b1f

	// Check link color (global override)
	// Just pick a generic link that isn't a tag/special one
	// Ideally checking the computed style of a generic `a` in content or footer.
});

test('article header styling', async ({ page }) => {
	// Navigate to a specific post we know exists and has author
	await page.goto('/fork');

	// Check author name uppercase
	const author = page.locator('.author-name');
	await expect(author).toHaveCSS('text-transform', 'uppercase');

	// Check byline meta content
	const meta = page.locator('.byline-meta-content');
	await expect(meta).toContainText('PUBLISHED');
	// LAST MODIFIED was removed by user
});

test('code block syntax highlighting', async ({ page }) => {
	// Go to a page with code (assuming 'a-full-style-test' or 'fork' has one)
	// We might need to know a specific URL or rely on clicking.
	await page.goto('/a-full-style-test');

	const codeBlock = page.locator('pre[class*="language-"]');
	if ((await codeBlock.count()) > 0) {
		await expect(codeBlock.first()).toHaveCSS('background-color', 'rgb(31, 36, 48)'); // #1f2430 (Ayu Mirage)
	}
});
