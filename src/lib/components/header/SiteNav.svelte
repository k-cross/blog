<script lang="ts">
import { onMount } from 'svelte';
import Bluesky from '$lib/components/icons/Bluesky.svelte';
import config from '$lib/config';

interface Props {
	isPost?: boolean;
	post?: { title: string };
}

let { isPost = false, post = { title: '' } }: Props = $props();

let showTitle = $state(false);
let titleRef: HTMLElement | undefined = $state();
let lastScrollY = 0;
let ticking = false;

function update() {
	if (!titleRef) return;

	lastScrollY = window.scrollY;

	const trigger = titleRef.getBoundingClientRect().top;
	const triggerOffset = titleRef.offsetHeight + 35;

	if (lastScrollY >= trigger + triggerOffset) {
		showTitle = true;
	} else {
		showTitle = false;
	}
	ticking = false;
}

function onScroll() {
	if (!titleRef) return;
	if (!ticking) {
		requestAnimationFrame(update);
	}
	ticking = true;
}

onMount(() => {
	if (isPost) {
		window.addEventListener('scroll', onScroll, { passive: true });
		lastScrollY = window.scrollY;
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}
});
</script>

<nav class="site-nav">
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<div class="site-nav-left">
		<div class="site-nav-content" class:show-title={showTitle}>
			<ul class="nav-list" role="menu">
				<li role="menuitem">
					<a class="site-nav-logo" href="/">Home</a>
				</li>
				<li role="menuitem">
					<a href="/about">About</a>
				</li>
			</ul>
			{#if isPost}
				<span bind:this={titleRef} class="nav-post-title">
					{post.title}
				</span>
			{/if}
		</div>
	</div>
	<div class="site-nav-right">
		<div class="social-links">
			{#if config.bsky}
				<a
					class="social-link"
					href={config.bsky}
					title="Bluesky"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Bluesky class="social-icon" />
				</a>
			{/if}
		</div>
	</div>
</nav>

<style>
	.site-nav {
		position: relative;
		z-index: 100;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		overflow-y: hidden;
		height: 64px;
		font-size: 1.3rem;
	}

	.site-nav-left {
		flex: 1 0 auto;
		display: flex;
		align-items: center;
		overflow-x: auto;
		overflow-y: hidden;
		-webkit-overflow-scrolling: touch;
		margin-right: 10px;
		padding: 10px 0 80px;
		font-weight: 500;
		letter-spacing: 0.2px;
		text-transform: uppercase;
		white-space: nowrap;
		-ms-overflow-scrolling: touch;
	}

	@media (max-width: 700px) {
		.site-nav-left {
			margin-right: 0;
			padding-left: 5vw;
		}
	}

	.site-nav-content {
		position: relative;
		align-self: flex-start;
	}

	.nav-list {
		position: absolute;
		z-index: 1000;
		display: flex;
		margin: 0 0 0 -12px;
		padding: 0;
		list-style: none;
		transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
	}

	.nav-list li {
		display: block;
		margin: 0;
		padding: 0;
	}

	.nav-list li a {
		position: relative;
		display: block;
		padding: 12px 12px;
		color: #fff;
		opacity: 0.8;
		transition: opacity 0.35s ease-in-out;
	}

	.nav-list li a:hover {
		text-decoration: none;
		opacity: 1;
	}

	.nav-list li a:before {
		content: '';
		position: absolute;
		right: 100%;
		bottom: 8px;
		left: 12px;
		height: 1px;
		background: #fff;
		opacity: 0.25;
		transition: all 0.35s ease-in-out;
	}

	.nav-list li a:hover:before {
		right: 12px;
		opacity: 0.5;
	}

	.site-nav-right {
		flex: 0 1 auto;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 10px 0;
		height: 64px;
	}

	@media (max-width: 700px) {
		.site-nav-right {
			display: none;
		}
	}

	.social-links {
		flex-shrink: 0;
		display: flex;
		align-items: center;
	}

	.social-link {
		display: inline-block;
		margin: 0;
		padding: 10px;
		opacity: 0.8;
	}

	.social-link:hover {
		opacity: 1;
	}

	:global(.social-icon) {
		height: 1.8rem;
		fill: #fff;
	}

	/* Post Title Logic */
	.nav-post-title {
		visibility: hidden;
		position: absolute;
		top: 9px;
		color: #fff;
		font-size: 1.7rem;
		font-weight: 400;
		text-transform: none;
		opacity: 0;
		transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
		transform: translateY(175%);
	}

	/* Show/Hide Logic */
	.site-nav-content.show-title .nav-list {
		visibility: hidden;
		opacity: 0;
		transform: translateY(-175%);
	}

	.site-nav-content.show-title .nav-post-title {
		visibility: visible;
		opacity: 1;
		transform: translateY(0);
	}
</style>
