import { expect, test } from '@playwright/test';

test('rss feed exists and is valid xml', async ({ request }) => {
	const response = await request.get('/rss.xml');
	expect(response.ok()).toBeTruthy();
	expect(response.headers()['content-type']).toBe('application/xml');

	const text = await response.text();
	expect(text).toContain('<rss');
	expect(text).toContain('xmlns:dc="http://purl.org/dc/elements/1.1/"');
	expect(text).toContain('<channel>');
	expect(text).toContain('<title>Ken Cross</title>');
});
