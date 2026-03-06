import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
	plugins: [sveltekit()],
	build: {
		target: 'es2022',
		minify: 'esbuild',
	},
	resolve: {
		conditions: mode === 'test' ? ['browser'] : [],
	},
	test: {
		globals: true,
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: ['./vitest-setup.ts'],
	},
}));
