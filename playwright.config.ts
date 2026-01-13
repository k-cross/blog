import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'bun run build && bun run preview --port 4175',
		port: 4175,
		reuseExistingServer: !process.env.CI,
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});
