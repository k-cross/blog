<script lang="ts">
import * as d3 from 'd3';

type DataPoint = {
	x: number;
	y: number;
	label: string;
};

let {
	data = [] as DataPoint[],
	width = 600,
	height = 400,
	marginTop = 20,
	marginRight = 30,
	marginBottom = 40,
	marginLeft = 40,
	xLabel = 'X Axis',
	yLabel = 'Y Axis',
} = $props();

// Calculate scales reactively
let xScale = $derived(
	d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => Math.max(d.x, d.y)) || 10]) // Shared max for a true 45 deg line proportionality
		.range([marginLeft, width - marginRight])
		.nice(),
);

let yScale = $derived(
	d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => Math.max(d.x, d.y)) || 10]) // Same domain as X for square grid / 45-degree angle
		.range([height - marginBottom, marginTop])
		.nice(),
);

// Ticks for axes
let xTicks = $derived(xScale.ticks(5));
let yTicks = $derived(yScale.ticks(5));

// 45-degree line coordinates
let lineMax = $derived(Math.max(...xScale.domain()));
</script>

<div class="chart-container" style="width: {width}px; height: {height}px;">
    <svg viewBox="0 0 {width} {height}" {width} {height}>
        <!-- 45-degree line through origin -->
        <line
            x1={xScale(0)}
            y1={yScale(0)}
            x2={xScale(lineMax)}
            y2={yScale(lineMax)}
            stroke="var(--midgrey)"
            stroke-width="1.5"
            stroke-dasharray="4"
        />

        <!-- x-axis -->
        <g transform={`translate(0,${height - marginBottom})`}>
            <line
                x1={marginLeft}
                x2={width - marginRight}
                stroke="currentColor"
            />
            {#each xTicks as tick}
                <g transform={`translate(${xScale(tick)},0)`}>
                    <line y2="6" stroke="currentColor" />
                    <text
                        y="20"
                        text-anchor="middle"
                        fill="currentColor"
                        font-size="12px"
                    >
                        {tick}
                    </text>
                </g>
            {/each}
            <text
                x={width - marginRight}
                y="-10"
                text-anchor="end"
                fill="currentColor"
                font-size="14px"
                font-weight="bold"
            >
                {xLabel}
            </text>
        </g>

        <!-- y-axis -->
        <g transform={`translate(${marginLeft},0)`}>
            <line
                y1={marginTop}
                y2={height - marginBottom}
                stroke="currentColor"
            />
            {#each yTicks as tick}
                <g transform={`translate(0,${yScale(tick)})`}>
                    <line x2="-6" stroke="currentColor" />
                    <text
                        x="-15"
                        dy="0.32em"
                        text-anchor="end"
                        fill="currentColor"
                        font-size="12px"
                    >
                        {tick}
                    </text>
                </g>
            {/each}
            <text
                x="10"
                y={marginTop}
                text-anchor="start"
                fill="currentColor"
                font-size="14px"
                font-weight="bold"
            >
                {yLabel}
            </text>
        </g>

        <!-- Data points -->
        {#each data as point}
            <g transform={`translate(${xScale(point.x)},${yScale(point.y)})`}>
                <circle r="6" fill="var(--blue)" opacity="0.8" />
                <!-- Offset label to avoid covering the circle -->
                <text
                    dx="8"
                    dy="4"
                    font-size="12px"
                    fill="currentColor"
                    class="point-label"
                >
                    {point.label}
                </text>
            </g>
        {/each}
    </svg>
</div>

<style>
    .chart-container {
        margin: 2rem auto;
        display: flex;
        justify-content: center;
        color: var(--darkgrey);
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
        .chart-container {
            color: var(--lightgrey);
        }
    }

    .point-label {
        font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            "Open Sans",
            "Helvetica Neue",
            sans-serif;
    }
</style>
