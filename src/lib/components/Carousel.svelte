<script lang="ts">
	import CarouselItem from './CarouselItem.svelte';
	import type { CarouselProps } from '$lib/types/carousel.js';
	
	// Use Svelte 5 $props() syntax
	let { 
		autoPlay = false,
		interval = 5000,
		showArrows = true,
		showIndicators = true,
		children
	}: CarouselProps & { children?: any } = $props();
	
	// Use $state for reactive variables
	let currentIndex = $state(0);
	let items = $state<any[]>([]);
	let autoPlayInterval: any;
	
	// Function to register items - this will be passed to children
	function registerItem(item: any) {
		items = [...items, item];
		return items.length - 1;
	}
	
	function goToSlide(index: number) {
		currentIndex = index;
	}
	
	function nextSlide() {
		currentIndex = (currentIndex + 1) % items.length;
	}
	
	function prevSlide() {
		currentIndex = (currentIndex - 1 + items.length) % items.length;
	}
	
	// Handle autoplay with $effect
	$effect(() => {
		if (autoPlay && items.length > 0) {
			clearInterval(autoPlayInterval);
			autoPlayInterval = setInterval(nextSlide, interval);
		}
		
		return () => clearInterval(autoPlayInterval);
	});
</script>

<div class="carousel">
	<div class="carousel-container">
		<div 
			class="carousel-track" 
			style:transform={`translateX(-${currentIndex * 100}%)`}
		>
			{@render children?.({ registerItem })}
		</div>
	</div>
	
	{#if showArrows}
		<button 
			class="carousel-arrow carousel-arrow--prev" 
			onclick={prevSlide}
			aria-label="Previous slide"
		>
			‹
		</button>
		
		<button 
			class="carousel-arrow carousel-arrow--next" 
			onclick={nextSlide}
			aria-label="Next slide"
		>
			›
		</button>
	{/if}
	
	{#if showIndicators && items.length > 1}
		<div class="carousel-indicators">
			{#each items as _, i}
				<button 
					class="carousel-indicator {i === currentIndex ? 'carousel-indicator--active' : ''}" 
					onclick={() => goToSlide(i)}
					aria-label={`Go to slide ${i + 1}`}
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.carousel {
		position: relative;
		overflow: hidden;
		width: 100%;
	}
	
	.carousel-container {
		overflow: hidden;
		width: 100%;
	}
	
	.carousel-track {
		display: flex;
		transition: transform var(--duration-base) ease-out;
	}
	
	.carousel-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(255, 255, 255, 0.8);
		border: var(--line-thin) solid var(--border-light);
		border-radius: 50%;
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--text-xl);
		cursor: pointer;
		z-index: 10;
		transition: all var(--duration-fast) ease-out;
	}
	
	.carousel-arrow:hover {
		background: white;
		transform: translateY(-50%) scale(1.1);
	}
	
	.carousel-arrow--prev {
		left: var(--space-4);
	}
	
	.carousel-arrow--next {
		right: var(--space-4);
	}
	
	.carousel-indicators {
		position: absolute;
		bottom: var(--space-4);
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: var(--space-2);
		z-index: 10;
	}
	
	.carousel-indicator {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		border: var(--line-thin) solid var(--border-medium);
		background: rgba(255, 255, 255, 0.8);
		cursor: pointer;
		transition: all var(--duration-fast) ease-out;
	}
	
	.carousel-indicator--active {
		background: var(--accent-primary);
		border-color: var(--accent-primary);
	}
</style>