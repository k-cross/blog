<script lang="ts">
import AuthorListItem from './AuthorListItem.svelte';

interface Author {
	name?: string;
	image?: string;
	bio?: string;
	location?: string;
	website?: string;
	twitter?: string;
	facebook?: string;
	[key: string]: unknown;
}

interface Props {
	authors: Author[];
	tooltip: 'small' | 'large';
}

let { authors, tooltip }: Props = $props();
</script>

<ul class="author-list">
	{#each authors as author (author.yamlId)}
		<AuthorListItem {author} {tooltip} />
	{/each}
</ul>

<style>
	.author-list {
		display: flex;
		flex-wrap: wrap;
		margin: 0 0 0 4px;
		padding: 0;
		list-style: none;
	}
</style>
