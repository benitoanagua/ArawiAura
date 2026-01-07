<script lang="ts">
	import AccordionItem from './AccordionItem.svelte';
	import type { AccordionProps } from '$lib/types/accordion.js';
	
	// Get all props in one $props() call
	let { multiple = false, children }: { multiple?: boolean, children?: any } = $props();
	let openIndexes: number[] = [];
	
	function toggle(index: number) {
		if (multiple) {
			if (openIndexes.includes(index)) {
				openIndexes = openIndexes.filter(i => i !== index);
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
		border: var(--line-thin) solid var(--border-light);
		border-radius: var(--space-2);
		overflow: hidden;
	}
</style>