import { expect, test } from '@playwright/test';

test('mermaid charts render successfully without errors', async ({ page }) => {
	const errors: string[] = [];

	page.on('console', (msg) => {
		if (msg.type() === 'error' || msg.type() === 'warning') {
			errors.push(`[${msg.type()}] ${msg.text()}`);
		}
	});

	page.on('pageerror', (err) => {
		errors.push(`[pageerror] ${err.message}`);
	});

	// Navigate to the post with mermaid charts
	const response = await page.goto('/ai_agents');
	expect(response?.status()).toBe(200);

	// Wait for the SVG to be rendered within the mermaid div
	// This ensures mermaid.run() has actually finished processing
	const mermaidSvgLocator = page.locator('.mermaid svg').first();
	await mermaidSvgLocator.waitFor({ state: 'visible', timeout: 10000 });

	// Count the number of SVGs rendered
	const svgCount = await page.locator('.mermaid svg').count();
	expect(svgCount).toBeGreaterThan(0);

	// Ensure there are no raw mermaid code blocks left
	const unrenderedBlocks = await page.locator('pre code.language-mermaid').count();
	expect(unrenderedBlocks).toBe(0);

	// Ensure each SVG has non-zero dimensions and contains inner elements
	for (let i = 0; i < svgCount; i++) {
		const svgLocator = page.locator('.mermaid svg').nth(i);

		const boundingBox = await svgLocator.boundingBox();
		expect(boundingBox).not.toBeNull();
		expect(boundingBox!.width).toBeGreaterThan(0);
		expect(boundingBox!.height).toBeGreaterThan(0);

		// Ensure it actually rendered paths or groups (not an empty SVG)
		const innerElementsCount = await svgLocator.locator('g, path, text').count();
		expect(innerElementsCount).toBeGreaterThan(0);
	}

	// Verify no console errors from Mermaid were thrown
	const mermaidErrors = errors.filter((e) => e.toLowerCase().includes('mermaid'));
	expect(mermaidErrors).toHaveLength(0);
});

test('mermaid charts switch themes dynamically', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'light' });
	await page.goto('/ai_agents');

	const firstSvg = page.locator('.mermaid svg').first();
	await firstSvg.waitFor({ state: 'visible', timeout: 10000 });

	// In default (light) theme, some texts or nodes will have specific styling
	// (usually dark strokes/text on light background)
	// We capture the HTML to compare
	const lightSvgHtml = await firstSvg.innerHTML();

	// Emulate dark mode
	await page.emulateMedia({ colorScheme: 'dark' });

	// Wait for the SVG HTML to change (meaning the event listener fired and the re-render happened)
	await expect(async () => {
		const darkSvgHtml = await firstSvg.innerHTML();
		expect(darkSvgHtml).not.toEqual(lightSvgHtml);
	}).toPass({ timeout: 5000 });

	// Double check the new node has non-zero paths again
	const innerElementsCount = await firstSvg.locator('g, path, text').count();
	expect(innerElementsCount).toBeGreaterThan(0);
});
