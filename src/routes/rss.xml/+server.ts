import type { Component } from 'svelte';
import { render } from 'svelte/server';
import config from '$lib/config';

interface PostMetadata {
	title: string;
	date: string;
	excerpt?: string;
	draft?: boolean;
	slug?: string;
	[key: string]: unknown;
}

interface PostModule {
	default: Component;
	metadata: PostMetadata;
}

interface Post extends PostMetadata {
	html: string;
	slug: string;
}

export const GET = async () => {
	const imports = import.meta.glob<PostModule>('$lib/content/posts/*.md', { eager: true });
	const posts: Post[] = Object.entries(imports)
		.map(([path, module]) => {
			const slug = path.split('/').pop()?.replace('.md', '');
			const { html } = render(module.default);
			return {
				...module.metadata,
				html,
				slug: `/${slug}`,
			};
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.filter((post) => !post.draft) as Post[];

	const xml = `
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>${config.title}</title>
    <link>${config.siteUrl}</link>
    <atom:link href="${config.siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>${config.lang}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
			.map(
				(post) => `
      <item>
        <title>${post.title}</title>
        <description><![CDATA[${post.excerpt || ''}]]></description>
        <link>${config.siteUrl}${post.slug}</link>
        <guid isPermaLink="true">${config.siteUrl}${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <content:encoded><![CDATA[${post.html}]]></content:encoded>
      </item>
    `,
			)
			.join('')}
  </channel>
</rss>
`.trim();

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
		},
	});
};
