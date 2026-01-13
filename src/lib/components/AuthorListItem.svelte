<script lang="ts">
interface Author {
	name?: string;
	image?: string;
	bio?: string;
	location?: string;
	website?: string;
	twitter?: string;
	facebook?: string;
	[key: string]: unknown;
}

interface Props {
	author: Author;
	tooltip: 'small' | 'large';
}

let { author, tooltip }: Props = $props();
</script>

<li class="author-list-item">
	{#if tooltip === 'small'}
		<div class="author-name-tooltip">{author.yamlId}</div>
	{/if}
</li>

<style>
	.author-list-item {
		position: relative;
		flex-shrink: 0;
		margin: 0;
		padding: 0;
	}

	.author-list-item:hover .author-name-tooltip {
		opacity: 1;
		transform: translateY(0px);
	}

	.author-name-tooltip {
		position: absolute;
		bottom: 105%;
		z-index: 999;
		display: block;
		padding: 2px 8px;
		color: white;
		font-size: 1.2rem;
		letter-spacing: 0.2px;
		white-space: nowrap;
		background: var(--darkgrey);
		border-radius: 3px;
		box-shadow:
			rgba(39, 44, 49, 0.08) 0 12px 26px,
			rgba(39, 44, 49, 0.03) 1px 3px 8px;
		opacity: 0;
		transition: all 0.35s cubic-bezier(0.4, 0.01, 0.165, 0.99);
		transform: translateY(6px);
		pointer-events: none;
	}

	@media (max-width: 700px) {
		.author-name-tooltip {
			display: none;
		}
	}
</style>
