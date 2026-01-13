<script lang="ts">
import Footer from '$lib/components/Footer.svelte';
import SiteNav from '$lib/components/header/SiteNav.svelte';
import PostCard from '$lib/components/PostCard.svelte';
import Wrapper from '$lib/components/Wrapper.svelte';
import config from '$lib/config';
// Use a default header or the main one
import headerImg from '$lib/content/img/moma/diffuse.jpg';

let { data } = $props();
</script>

<svelte:head>
	<title>{data.tag} - {config.title}</title>
</svelte:head>

<Wrapper>
	<div class="site-header-background" style="background-image: url({headerImg})">
		<div class="inner">
			<SiteNav isPost={false} />
			<div class="site-header-content">
				<h1 class="site-title">{data.tag}</h1>
				<h2 class="site-description">A collection of {data.posts.length} posts</h2>
			</div>
		</div>
	</div>

	<main id="site-main" class="site-main outer">
		<div class="inner posts">
			<div class="post-feed">
				{#each data.posts as post (post.fields.slug)}
					<PostCard {post} large={post.fields.slug === data.posts[0].fields.slug} />
				{/each}
			</div>
		</div>
	</main>

	<Footer />
</Wrapper>

<style>
	/* Reuse homepage styles */
	.site-header-background {
		position: relative;
		padding-bottom: 12px;
		color: #fff;
		background: #15171a no-repeat center center;
		background-size: cover;
	}
	.site-header-background:before {
		content: '';
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
		content: '';
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

	.site-description {
		z-index: 10;
		margin: 0;
		padding: 5px 0;
		font-size: 2.1rem;
		line-height: 1.4em;
		font-weight: 400;
		opacity: 0.8;
	}

	.site-main {
		flex-grow: 1;
	}
	.outer {
		position: relative;
		padding: 0 5vw;
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
