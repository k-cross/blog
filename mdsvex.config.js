import { defineMDSveXConfig as defineMdsvexConfig } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import rehypeSlug from 'rehype-slug';
import remarkFootnotes from 'remark-footnotes';
import remarkMath from 'remark-math';

const config = defineMdsvexConfig({
	extensions: ['.md'],

	smartypants: {
		dashes: 'oldschool',
	},

	// remark-math needs to be before rehype-katex to process $$ syntax
	remarkPlugins: [remarkMath, remarkFootnotes],
	rehypePlugins: [rehypeKatexSvelte, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
});

export default config;
