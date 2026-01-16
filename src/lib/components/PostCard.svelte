<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'date-fns';

interface Post {
	frontmatter: {
		title: string;
		date: string;
		tags?: string[];
		excerpt?: string;
		[key: string]: unknown;
	};
	fields: {
		slug: string;
	};
	excerpt?: string;
	timeToRead?: number;
}

interface Props {
	post: Post;
	large?: boolean;
}

let { post, large = false }: Props = $props();

let date = $derived(new Date(post.frontmatter.date));
let datetime = $derived(format(date, 'yyyy-MM-dd'));
let displayDatetime = $derived(format(date, 'dd LLL yyyy'));
</script>

<article class="post-card" class:post-card-large={large}>
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<div class="post-card-content">
		<a class="post-card-content-link" href={post.fields.slug}>
			<header class="post-card-header">
				{#if post.frontmatter.tags}
					<div class="post-card-primary-tag">
						{post.frontmatter.tags[0]}
					</div>
				{/if}
				<h2 class="post-card-title">{post.frontmatter.title}</h2>
			</header>
			<section class="post-card-excerpt">
				<p>{post.frontmatter.excerpt || post.excerpt}</p>
			</section>
		</a>
		<footer class="post-card-meta">
			<div class="post-card-byline-content">
				<span class="post-card-byline-date">
					<time {datetime}>{displayDatetime}</time>
					<span class="bull">&bull;</span>
					{post.timeToRead} min read
				</span>
			</div>
		</footer>
	</div>
</article>

<style>
	.post-card {
		position: relative;
		flex: 1 1 301px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		margin: 0 0 40px;
		padding: 0 20px 40px;
		min-height: 220px;
		border-bottom: 1px solid #eef2f4; /* lighten('0.12', colors.lightgrey) */
		background-size: cover;
	}

	:global(.dark) .post-card {
		border-bottom-color: #2b2d31; /* lighten('0.08', colors.darkmode) approx */
	}

	@media (prefers-color-scheme: dark) {
		.post-card {
			border-bottom-color: #2b2d31;
		}
	}

	@media (min-width: 795px) {
		.post-card-large {
			flex: 1 1 100%;
			flex-direction: row;
			padding-bottom: 40px;
			min-height: 280px;
			border-top: 0;
		}

		.post-card-large :global(.post-card-header) {
			margin-top: 0;
		}

		.post-card-large .post-card-content {
			flex: 0 1 361px;
			justify-content: center;
		}

		.post-card-large .post-card-title {
			margin-top: 0;
			font-size: 3.2rem;
		}

		.post-card-large .post-card-content-link {
			padding: 0 0 0 40px;
		}

		.post-card-large .post-card-meta {
			padding: 0 0 0 40px;
		}

		.post-card-large .post-card-excerpt p {
			margin-bottom: 1.5em;
			font-size: 1.8rem;
			line-height: 1.5em;
		}
	}

	.post-card-content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}

	.post-card-content-link {
		position: relative;
		display: block;
		color: var(--darkgrey);
	}

	.post-card-content-link:hover {
		text-decoration: none;
	}

	.post-card-primary-tag {
		margin: 0 0 0.2em;
		color: var(--green);
		font-size: 1.2rem;
		font-weight: 500;
		letter-spacing: 0.2px;
		text-transform: uppercase;
	}

	.post-card-title {
		margin: 0 0 0.4em;
		line-height: 1.15em;
		transition: color 0.2s ease-in-out;
	}

	@media (prefers-color-scheme: dark) {
		.post-card-title {
			color: rgba(255, 255, 255, 0.85);
		}
	}

	.post-card-excerpt {
		font-family: Georgia, serif;
	}

	@media (prefers-color-scheme: dark) {
		.post-card-excerpt {
			color: #8da1aa !important; /* lighten('0.1', colors.midgrey) */
		}
	}

	.post-card-meta {
		display: flex;
		align-items: flex-start;
		padding: 0;
	}

	.post-card-byline-content {
		flex: 1 1 50%;
		display: flex;
		flex-direction: column;
		margin: 4px 0 0 10px;
		color: #5b6c75; /* darkened for a11y, was #8da1aa */
		font-size: 1.2rem;
		line-height: 1.4em;
		font-weight: 400;
		letter-spacing: 0.2px;
		text-transform: uppercase;
	}

	.post-card-byline-content span {
		margin: 0;
	}
</style>
