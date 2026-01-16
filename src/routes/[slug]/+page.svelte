<script lang="ts">
import { format } from 'date-fns';
import mermaid from 'mermaid';
import { onMount } from 'svelte';
import Footer from '$lib/components/Footer.svelte';
import SiteNav from '$lib/components/header/SiteNav.svelte';
import Wrapper from '$lib/components/Wrapper.svelte';

import type { PageData } from './$types';

interface Props {
	data: PageData;
}

let { data }: Props = $props();
// data.Content is the component
let Content = $derived(data.Content);

interface PostMetadata {
	title: string;
	date: string;
	excerpt?: string;
	tags?: string[];
	author?: (string | { yamlId: string })[];
	layout?: string;
	[key: string]: unknown;
}

let metadata = $derived(data.metadata as PostMetadata);
let coverImage = $derived(data.coverImage as string | null);

let date = $derived(new Date(metadata.date));
let displayDatetime = $derived(format(date, 'dd LLL yyyy').toUpperCase());

onMount(async () => {
	// Find all mermaid code blocks
	// Note: mdsvex might render code blocks as <pre><code class="language-mermaid">
	const blocks = document.querySelectorAll('pre code.language-mermaid');
	let found = false;
	for (const block of blocks) {
		const content = block.textContent;
		const pre = block.parentElement;
		if (pre && content) {
			found = true;
			const div = document.createElement('div');
			div.classList.add('mermaid');
			div.textContent = content;
			pre.replaceWith(div);
		}
	}

	if (found) {
		mermaid.initialize({ startOnLoad: false });
		await mermaid.run();
	}
});
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.excerpt} />
	<meta property="article:published_time" content={metadata.date} />
	{#if metadata.tags}
		<meta property="article:tag" content={metadata.tags[0]} />
	{/if}
	<script
		async
		src="https://embed.bsky.app/static/embed.js"
		charset="utf-8"
	></script>
	<script
		async
		src="https://platform.twitter.com/widgets.js"
		charset="utf-8"
	></script>
</svelte:head>

<div class="index-layout post-template">
	<Wrapper>
		<header class="site-header">
			<div class="outer site-nav-main">
				<div class="inner">
					<!-- eslint-disable svelte/no-navigation-without-resolve -->
					<SiteNav isPost post={metadata} />
				</div>
			</div>
		</header>

		<main id="site-main" class="site-main outer">
			<div class="inner">
				<article
					class="post-full {metadata.layout === 'isolated'
						? 'layout-isolated'
						: ''} {!coverImage ? 'no-image' : ''}"
				>
					<header class="post-full-header">
						<section class="post-full-tags">
							{#if metadata.tags && metadata.tags.length > 0}
								<a href="/tags/{metadata.tags[0]}"
									>{metadata.tags[0]}</a
								>
							{/if}
						</section>
						<h1 class="post-full-title">{metadata.title}</h1>
						{#if metadata.author}
							<p class="author-name">
								{metadata.author
									.map((a: string | { yamlId: string }) =>
										typeof a === "string" ? a : a.yamlId,
									)
									.join(", ")}
							</p>
						{/if}
						<div class="post-full-byline">
							<section class="post-full-byline-content">
								<div class="byline-meta-content">
									<span class="byline-meta-date"
										>PUBLISHED: {displayDatetime}</span
									>
								</div>
							</section>
						</div>
					</header>

					{#if coverImage}
						<figure class="post-full-image">
							<img src={coverImage} alt={metadata.title} />
						</figure>
					{/if}

					<section class="post-full-content">
						<div class="post-content">
							<Content />
						</div>
					</section>
				</article>
			</div>
		</main>

		<Footer />
	</Wrapper>
</div>

<style>
	/* Ported from post.tsx PostTemplate css */
	.site-main {
		background: #fff;
		padding-bottom: 4vw;
	}

	@media (prefers-color-scheme: dark) {
		.site-main {
			background: #191b1f; /* colors.darkmode */
		}
	}

	/* Ported from shared.ts outer/inner/SiteNavMain */
	.outer {
		position: relative;
		padding: 0 5vw;
	}

	.site-nav-main {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		z-index: 1000;
		background: #0f1113; /* lighten('-0.05', colors.darkgrey) approx */
	}

	.post-full {
		position: relative;
		z-index: 50;
	}

	.post-full-header {
		position: relative;
		margin: 0 auto;
		padding: 70px 170px 50px;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
	}

	@media (max-width: 1170px) {
		.post-full-header {
			padding: 60px 11vw 50px;
		}
	}
	@media (max-width: 800px) {
		.post-full-header {
			padding-right: 5vw;
			padding-left: 5vw;
		}
	}

	.post-full-tags {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: var(--midgrey);
		font-size: 1.3rem;
		line-height: 1.4em;
		font-weight: 600;
		text-transform: uppercase;
	}

	.post-full-tags a {
		color: var(--green);
		text-decoration: none;
	}

	.post-full-title {
		margin: 0 0 0.2em;
		color: #212529; /* setLightness('0.05', colors.darkgrey) */
	}

	@media (prefers-color-scheme: dark) {
		.post-full-title {
			color: rgba(255, 255, 255, 0.9);
		}
	}

	.post-full-byline {
		display: flex;
		justify-content: space-between;
		margin: 35px 0 0;
		padding-top: 15px;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	@media (prefers-color-scheme: light) {
		.post-full-byline {
			border-top: 1px solid rgba(0, 0, 0, 0.1);
		}
	}

	.post-full-byline-content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.author-name {
		margin: 0 0 5px;
		font-size: 1.4rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: var(--midgrey);
	}

	@media (prefers-color-scheme: dark) {
		.author-name {
			color: rgba(255, 255, 255, 0.7);
		}
	}

	.byline-meta-content {
		color: var(--midgrey);
		font-size: 1.2rem;
		line-height: 1.5em;
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	@media (prefers-color-scheme: dark) {
		.byline-meta-content {
			color: rgba(255, 255, 255, 0.5);
		}
	}

	.post-full-image {
		margin: 25px 0 50px;
		height: 800px;
		background: #c5d2d9 center center;
		background-size: cover;
		border-radius: 5px;
	}

	.post-full-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.layout-isolated .post-full-image {
		height: 640px;
	}

	/* Post Content Styles (from PostContent.tsx) - Scoped to .post-content */

	.post-content {
		position: relative;
		margin: 0 auto;
		padding: 0 170px 6vw;
		min-height: 230px;
		font-family: Georgia, serif;
		font-size: 2rem;
		line-height: 1.6em;
		background: #fff;
	}

	@media (prefers-color-scheme: dark) {
		.post-content {
			background: #191b1f; /* colors.darkmode */
		}
	}

	@media (max-width: 1170px) {
		.post-content {
			padding: 0 11vw 6vw;
		}
	}
	@media (max-width: 800px) {
		.post-content {
			padding: 0 5vw 6vw;
			font-size: 1.8rem;
		}
	}

	.post-content :global(p),
	.post-content :global(ul),
	.post-content :global(ol),
	.post-content :global(blockquote) {
		margin-bottom: 1.5em;
	}

	.post-content :global(h1),
	.post-content :global(h2),
	.post-content :global(h3),
	.post-content :global(h4) {
		margin-top: 1.2em; /* Reduced from 1.5em */
		margin-bottom: 0.5em; /* Added margin bottom for spacing */
		font-weight: 600;
	}

	.post-content :global(h1) {
		font-size: 3.4rem;
	}

	.post-content :global(h2) {
		font-size: 2.6rem;
	}

	.post-content :global(h3) {
		font-size: 2.1rem;
	}

	.post-content :global(h4) {
		font-size: 1.8rem;
	}

	.post-content :global(pre) {
		overflow-x: auto;
		padding: 20px;
		max-width: 100%;
		border: 1px solid #2d3035;
		color: var(--whitegrey);
		font-size: 1.4rem;
		line-height: 1.5em;
		background: #0f1113;
		border-radius: 5px;
	}

	.post-content :global(code) {
		padding: 0 5px 2px;
		font-size: 0.8em;
		background: var(--whitegrey);
		border-radius: 3px;
	}

	@media (prefers-color-scheme: dark) {
		.post-content :global(code) {
			background: var(--darkmode_l15);
			color: var(--whitegrey);
		}
	}

	.post-content :global(pre code) {
		padding: 0;
		background: transparent;
	}

	.post-content :global(.mermaid) {
		display: flex;
		justify-content: center;
		margin: 2em 0;
	}
</style>
