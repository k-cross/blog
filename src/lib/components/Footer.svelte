<script lang="ts">
import config from '$lib/config';
</script>

<footer class="site-footer outer">
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<div class="inner site-footer-content">
		<section class="copyright">
			<a href="/">{config.title}</a> &copy; {new Date().getFullYear()}
		</section>
		<nav class="site-footer-nav">
			<a href="/">Latest Posts</a>
			{#if config.bsky}
				<a href={config.bsky} target="_blank" rel="noopener noreferrer"> Bluesky </a>
			{/if}
			<a href="/rss.xml">RSS</a>
		</nav>
	</div>
</footer>

<style>
	.site-footer {
		position: relative;
		padding-top: 20px;
		padding-bottom: 60px;
		color: #fff;
		background: #000; /* approximated setLightness('0.0015', colors.darkgrey) */
	}

	/* inner class is defined in global styles, but used here for structure */

	.site-footer-content {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		color: rgba(255, 255, 255, 0.7);
		font-size: 1.3rem;
	}

	.site-footer-content :global(a) {
		color: rgba(255, 255, 255, 0.7);
	}

	.site-footer-content :global(a:hover) {
		color: rgba(255, 255, 255, 1);
		text-decoration: none;
	}

	@media (max-width: 650px) {
		.site-footer-content {
			flex-direction: column;
		}
	}

	.site-footer-nav {
		display: flex;
	}

	.site-footer-nav a {
		position: relative;
		margin-left: 20px;
	}

	.site-footer-nav a:before {
		content: '';
		position: absolute;
		top: 11px;
		left: -11px;
		display: block;
		width: 2px;
		height: 2px;
		background: #fff;
		border-radius: 100%;
	}

	.site-footer-nav a:first-of-type:before {
		display: none;
	}

	@media (max-width: 650px) {
		.site-footer-nav a:first-of-type {
			margin-left: 0;
		}
	}
</style>
