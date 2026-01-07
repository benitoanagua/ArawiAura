<script lang="ts">
	import type { CarouselItemProps } from '$lib/types/carousel.js';
	
	// Receive props including the registerItem function from parent
	let { 
		index, 
		registerItem,
		children 
	}: CarouselItemProps & { 
		registerItem: (item: any) => number,
		children?: any 
	} = $props();
	
	// Register this item with the parent carousel using $effect
	let itemIndex = $state(0);
	
	$effect(() => {
		const result = registerItem({ index });
		if (result !== undefined) {
			itemIndex = result;
		}
	});
</script>

<div class="carousel-item">
	{@render children?.()}
</div>

<style>
	.carousel-item {
		flex: 0 0 100%;
		width: 100%;
	}
</style>