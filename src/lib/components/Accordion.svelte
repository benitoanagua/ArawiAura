<script lang="ts">
	import AccordionItem from './AccordionItem.svelte';
	import type { AccordionProps } from '$lib/types/accordion.js';

	// Get all props in one $props() call
	let { multiple = false, children } = $props<{
		multiple?: boolean;
		children?: import('svelte').Snippet<[any]>;
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
</script>

<div class="accordion">
	{@render children?.({ toggle, isOpen })}
</div>

<style>
	.accordion {
		border: var(--line-thin) solid var(--color-outline-variant);
		border-radius: var(--space-2);
		overflow: hidden;
		background-color: var(--color-surface);
	}
</style>
