import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';

interface PostModule {
	default: Component;
	metadata: {
		image?: string;
		picture?: string;
		[key: string]: unknown;
	};
}

interface ImageModule {
	default: string;
}

export const load = async ({ params }) => {
	// Non-eager glob for code splitting - scan posts and root pages
	const posts = import.meta.glob(['$lib/content/posts/*.md', '$lib/content/*.md']);
	const images = import.meta.glob('$lib/content/**/*.{png,jpg,jpeg,gif,webp}', {
		eager: true,
		query: { '?url': true },
	});

	// Iterate to find the matching slug
	for (const [path, resolver] of Object.entries(posts)) {
		// Match slug at end of path (handles both /posts/slug.md and /slug.md)
		if (path.endsWith(`/${params.slug}.md`)) {
			const post = (await resolver()) as PostModule;
			let coverImage = null;

			const imageField = post.metadata.image || post.metadata.picture;
			if (imageField) {
				const imgName = imageField.split('/').pop();
				if (imgName) {
					for (const [imgPath, imgMod] of Object.entries(images)) {
						if (imgPath.endsWith(imgName)) {
							coverImage = (imgMod as ImageModule).default;
							break;
						}
					}
				}
			}

			return {
				Content: post.default,
				metadata: post.metadata,
				slug: params.slug,
				coverImage,
			};
		}
	}

	throw error(404, 'Post not found');
};
