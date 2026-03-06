import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import LabeledScatterPlot from './LabeledScatterPlot.svelte';

describe('LabeledScatterPlot', () => {
	it('renders with default props', () => {
		const { container } = render(LabeledScatterPlot);

		// Should have an SVG element
		const svg = container.querySelector('svg');
		expect(svg).toBeInTheDocument();

		// Wait, default data is empty, shouldn't have any circles
		const circles = container.querySelectorAll('circle');
		expect(circles.length).toBe(0);
	});

	it('renders data points and labels correctly', () => {
		const testData = [
			{ label: 'Point A', x: 2, y: 5 },
			{ label: 'Point B', x: 6, y: 3 },
		];

		const { container } = render(LabeledScatterPlot, { data: testData });

		// Should have exactly 2 circles
		const circles = container.querySelectorAll('circle');
		expect(circles.length).toBe(2);

		// Labels should be present
		expect(screen.getByText('Point A')).toBeInTheDocument();
		expect(screen.getByText('Point B')).toBeInTheDocument();
	});

	it('renders the 45 degree line', () => {
		const { container } = render(LabeledScatterPlot);

		// The first line parsed is the 45 degree reference
		const line = container.querySelector('line[stroke-dasharray="4"]');
		expect(line).toBeInTheDocument();
	});
});
