<script lang="ts">
import Footer from '$lib/components/Footer.svelte';
import SiteNav from '$lib/components/header/SiteNav.svelte';
import PostCard from '$lib/components/PostCard.svelte';
import Wrapper from '$lib/components/Wrapper.svelte';
import config from '$lib/config';
import headerImg from '$lib/content/img/moma/diffuse.jpg';

let { data } = $props();
</script>

<svelte:head>
	<title>{config.title}</title>
	<meta name="description" content={config.description} />
	<meta property="og:site_name" content={config.title} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={config.title} />
	<meta property="og:description" content={config.description} />
	<meta property="og:url" content={config.siteUrl} />
	<meta property="og:image" content={headerImg} />
</svelte:head>

<Wrapper>
	<header
		class="site-header-background"
		style="background-image: url({headerImg})"
	>
		<div class="inner">
			<SiteNav />
			<div class="site-header-content">
				<h1 class="site-title">{config.title}</h1>
				<h2 class="site-description">{config.description}</h2>
			</div>
		</div>
	</header>

	<main id="site-main" class="site-main outer">
		<div class="inner posts">
			<div class="post-feed">
				{#each data.posts as post, index (post.fields.slug)}
					<PostCard {post} large={index === 0} />
				{/each}
			</div>
		</div>
	</main>

	<Footer />
</Wrapper>

<style>
	.site-header-background {
		position: relative;
		padding-bottom: 12px;
		color: #fff;
		background: #15171a no-repeat center center;
		background-size: cover;
	}

	.site-header-background:before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 10;
		display: block;
		background: rgba(0, 0, 0, 0.18);
	}

	.site-header-background:after {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: auto;
		left: 0;
		z-index: 10;
		display: block;
		height: 140px;
		background: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0));
	}

	@media (prefers-color-scheme: dark) {
		.site-header-background:before {
			background: rgba(0, 0, 0, 0.6);
		}
	}

	.site-header-content {
		z-index: 100;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 6vw 3vw;
		min-height: 200px;
		max-height: 340px;
	}

	.site-title {
		z-index: 10;
		margin: 0 0 0 -2px;
		padding: 0;
		font-size: 5rem;
		line-height: 1em;
		font-weight: 600;
	}

	@media (max-width: 500px) {
		.site-title {
			font-size: 4.2rem;
		}
	}

	.site-description {
		z-index: 10;
		margin: 0;
		padding: 5px 0;
		font-size: 2.1rem;
		line-height: 1.4em;
		font-weight: 400;
		opacity: 0.8;
	}

	@media (max-width: 500px) {
		.site-description {
			font-size: 1.8rem;
		}
	}

	.site-main {
		flex-grow: 1;
	}

	@media (prefers-color-scheme: dark) {
		.site-main {
			background: #191b1f; /* colors.darkmode */
		}
	}

	.outer {
		position: relative;
		padding: 0 5vw;
	}

	.posts {
		overflow-x: hidden;
	}

	.post-feed {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		margin: 0 -20px;
		padding: 50px 0 0;
		background: #fff;
		/* Special Template Styles */
		padding: 40px 0 5vw;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
	}

	@media (prefers-color-scheme: dark) {
		.post-feed {
			background: #191b1f;
		}
	}
</style>
