<script lang="ts">
import '../app.css';
import '../prism-ayu-mirage.css';
import 'katex/dist/katex.min.css';
interface Props {
	children?: import('svelte').Snippet;
}

let { children }: Props = $props();
</script>

{@render children?.()}
