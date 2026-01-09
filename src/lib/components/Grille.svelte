<script lang="ts">
	import { setContext } from 'svelte';
	import type { GrilleProps, GrilleContext } from '$lib/types/grille.js';

	let { desktop = 3, mobile = 2, gap = 'medium', children }: GrilleProps = $props();

	let containerWidth = $state(0);
	let items = $state<number[]>([]);
	let nextId = 0;

	function registerItem() {
		const id = nextId++;
		items.push(id);
		return id;
	}

	function unregisterItem(id: number) {
		items = items.filter((i) => i !== id);
	}

	// Helper to calculate position in grid
	// Note: We use the index in the 'items' array as the sequence index
	function getItemIndex(id: number) {
		return items.indexOf(id);
	}

	// Provide context for GrilleItems
	setContext<GrilleContext & { getItemIndex: (id: number) => number }>('grille', {
		registerItem,
		unregisterItem,
		getItemIndex,
		get containerWidth() {
			return containerWidth;
		},
		get desktop() {
			return desktop;
		},
		get mobile() {
			return mobile;
		},
		get gap() {
			return gap;
		},
		get itemCount() {
			return items.length;
		}
	});
</script>

<div class="ax-grille" bind:clientWidth={containerWidth}>
	<div class="ax-grille__container">
		{@render children?.()}
	</div>
</div>

<style>
	.ax-grille {
		width: 100%;
		overflow: hidden;
		display: block;
		box-sizing: border-box;
	}

	.ax-grille__container {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		box-sizing: border-box;
		border-top: 1px solid var(--color-outline-variant);
		border-left: 1px solid var(--color-outline-variant);
	}
</style>
