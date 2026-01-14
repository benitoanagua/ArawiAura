<script lang="ts">
	import { getContext, onMount, onDestroy } from 'svelte';
	import type { CarouselItemProps, CarouselContext } from '$lib/types/Carousel.js';

	let { children, class: className }: CarouselItemProps = $props();

	const carousel = getContext<CarouselContext>('carousel');
	let itemIndex = $state<number | null>(null);

	onMount(() => {
		if (carousel) {
			itemIndex = carousel.registerItem();
		}
	});

	onDestroy(() => {
		if (carousel && itemIndex !== null) {
			carousel.unregisterItem(itemIndex);
		}
	});
</script>

<div class="ax-carousel-item {className || ''}">
	<div class="ax-carousel-item__content">
		{@render children?.()}
	</div>
</div>

<style>
	.ax-carousel-item {
		/* Simple width calculation: (100% - total gaps) / items */
		flex: 0 0
			calc((100% - (var(--items-per-view, 1) - 1) * var(--gap, 8px)) / var(--items-per-view, 1));
		min-width: 0;
		max-width: calc(
			(100% - (var(--items-per-view, 1) - 1) * var(--gap, 8px)) / var(--items-per-view, 1)
		);

		/* Styling */
		border: 1px solid var(--color-outline-variant, rgba(0, 0, 0, 0.08));
		border-radius: 4px;
		background: var(--color-surface-container, rgba(0, 0, 0, 0.02));
		overflow: hidden;
		box-sizing: border-box;
	}

	.ax-carousel-item__content {
		width: 100%;
		height: 100%;
		min-height: 140px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.ax-carousel-item:hover {
		border-color: var(--color-outline, rgba(0, 0, 0, 0.15));
		background: var(--color-surface-container-high, rgba(0, 0, 0, 0.04));
		transition: all 200ms ease;
	}
</style>
