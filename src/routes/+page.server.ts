/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ComponentType } from 'svelte';
import { render } from 'svelte/server';

interface PostMetadata {
	title: string;
	date: string;
	excerpt?: string;
	timeToRead?: number;
	draft?: boolean;
	[key: string]: unknown; // Allow other frontmatter properties
}

interface PostModule {
	default: ComponentType; // The Svelte component itself
	metadata: PostMetadata;
}

export const load = async () => {
	const imports = import.meta.glob<PostModule>('$lib/content/posts/*.md', { eager: true });

	const posts = Object.entries(imports).map(([path, module]) => {
		const slug = path.split('/').pop()?.replace('.md', '');
		const { html } = render(module.default);
		return {
			slug,
			...module.metadata, // frontmatter
			frontmatter: module.metadata, // compatible with existing structure
			html, // rendered html
			excerpt: module.metadata.excerpt,
			fields: { slug: `/${slug}` }, // match route structure
			timeToRead: module.metadata.timeToRead || 5, // Approximation or calculation needed
		};
	});

	const sortedPosts = posts.sort((a, b) => {
		return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
	});

	// Filter drafts
	const filteredPosts = sortedPosts.filter((post) => !post.frontmatter.draft);

	return {
		posts: filteredPosts,
	};
};
