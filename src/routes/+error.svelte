<script lang="ts">
import { page } from '$app/stores';
import Footer from '$lib/components/Footer.svelte';
import SiteNav from '$lib/components/header/SiteNav.svelte';
import Wrapper from '$lib/components/Wrapper.svelte';
</script>

<svelte:head>
    <title>{$page.status} - Ken Cross Blog</title>
</svelte:head>

<Wrapper>
    <header class="site-header-background">
        <div class="inner">
            <SiteNav isPost={false} />
            <div class="site-header-content">
                <h1 class="site-title">{$page.status}</h1>
                <h2 class="site-description">Not Found</h2>
            </div>
        </div>
    </header>
    <main id="site-main" class="site-main outer">
        <div class="inner">
            <section class="error-message">
                <p>The page you were looking for doesn't exist.</p>
                <a href="/">Go to the front page →</a>
            </section>
        </div>
    </main>
    <Footer />
</Wrapper>

<style>
    .error-message {
        text-align: center;
        padding: 10vw 0;
    }
    .site-header-background {
        position: relative;
        padding-bottom: 12px;
        color: #fff;
        background: var(--darkgrey) no-repeat center center;
        background-size: cover;
    }

    .site-header-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 6vw 3vw;
        min-height: 200px;
        max-height: 340px;
    }

    .site-title {
        margin: 0;
        padding: 0;
        font-size: 8rem;
        line-height: 1em;
        font-weight: 700;
    }

    .site-description {
        margin: 0;
        padding: 5px 0;
        font-size: 2.1rem;
        line-height: 1.4em;
        font-weight: 400;
        opacity: 0.8;
    }
</style>
