<script lang="ts">
interface Props {
	class?: string;
	children?: import('svelte').Snippet;
}

let { class: className, children }: Props = $props();
</script>

<div class={className}>
	{@render children?.()}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
