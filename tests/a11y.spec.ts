import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const checkA11y = async (page: any, path: string) => {
	await page.goto(path);
	const results = await new AxeBuilder({ page }).analyze();
	if (results.violations.length > 0) {
		console.log(`\nViolations for ${path}:`);
		results.violations.forEach((violation) => {
			console.log(`- ${violation.id}: ${violation.help}`);
			console.log(`  Impact: ${violation.impact}`);
			console.log(`  Nodes: ${violation.nodes.length}`);
			violation.nodes.forEach((node) => {
				console.log(`    - ${node.html}`);
			});
		});
	}
	expect(results.violations).toEqual([]);
};

test.describe('accessibility checks', () => {
	test('home page a11y', async ({ page }) => checkA11y(page, '/'));
	test('post page a11y', async ({ page }) => checkA11y(page, '/tools'));
	test('tag page a11y', async ({ page }) => checkA11y(page, '/tags/technique'));
	test('about page a11y', async ({ page }) => checkA11y(page, '/about'));
});
