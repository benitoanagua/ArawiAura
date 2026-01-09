<script lang="ts">
	import { getContext } from 'svelte';
	import type { CarouselItemProps, CarouselContext } from '$lib/types/carousel.js';

	let { children }: CarouselItemProps = $props();

	// Consume context from parent Carousel
	const carousel = getContext<CarouselContext>('carousel');

	let itemIndex = $state<number | null>(null);

	// Register item automatically on mount
	$effect(() => {
		if (carousel && itemIndex === null) {
			itemIndex = carousel.registerItem({});
		}
	});

	const isActive = $derived(itemIndex === carousel?.currentIndex);
</script>

<div class="ax-carousel-item" class:is-active={isActive}>
	{@render children?.()}
</div>

<style>
	.ax-carousel-item {
		flex: 0 0 100%;
		width: 100%;
		min-height: 300px; /* Base height, can be overridden */
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--color-surface);
		transition: opacity var(--duration-base) var(--ease-out);
		opacity: 0.5;
	}

	.ax-carousel-item.is-active {
		opacity: 1;
	}
</style>
