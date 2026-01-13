/* eslint-disable @typescript-eslint/no-explicit-any */
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import { render } from 'svelte/server';

interface MarkdownModule {
	metadata: {
		title: string;
		date: string;
		tags?: string[];
		excerpt?: string;
		draft?: boolean;
		timeToRead?: number;
		[key: string]: unknown; // For other potential frontmatter properties
	};
	default: Component; // Represents the Svelte component
}

export const load = async ({ params }: { params: { tag: string } }) => {
	const { tag } = params;
	const imports = import.meta.glob<MarkdownModule>('$lib/content/posts/*.md', { eager: true });

	// Sort and filter by tag
	const posts = Object.entries(imports)
		.map(([path, module]) => {
			const slug = path.split('/').pop()?.replace('.md', '');
			const { html } = render(module.default);
			return {
				...module.metadata,
				frontmatter: module.metadata,
				html,
				excerpt: module.metadata.excerpt,
				fields: { slug: `/${slug}` },
				timeToRead: module.metadata.timeToRead || 5,
			};
		})
		.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
		.filter((post) => post.frontmatter.tags?.includes(tag) && !post.frontmatter.draft);

	if (posts.length === 0) {
		throw error(404, 'No posts found for this tag');
	}

	return {
		posts,
		tag,
	};
};
