<script lang="ts">
	import { setContext } from 'svelte';

	let { multiple = false, children } = $props<{
		multiple?: boolean;
		children?: import('svelte').Snippet;
	}>();

	let openIndexes = $state<number[]>([]);

	function toggle(index: number) {
		if (multiple) {
			if (openIndexes.includes(index)) {
				openIndexes = openIndexes.filter((i) => i !== index);
			} else {
				openIndexes = [...openIndexes, index];
			}
		} else {
			openIndexes = openIndexes.includes(index) ? [] : [index];
		}
	}

	function isOpen(index: number) {
		return openIndexes.includes(index);
	}

	// Provide state to children via Context API (Idiomatic Svelte 5)
	setContext('accordion', {
		toggle,
		isOpen
	});
</script>

<div class="accordion">
	{@render children?.()}
</div>

<style>
	.accordion {
		border: var(--line-thin) solid var(--color-outline-variant);
		border-radius: var(--space-2);
		overflow: hidden;
		background-color: var(--color-surface);
	}
</style>
