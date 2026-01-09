<script lang="ts">
	import { setContext, onDestroy } from 'svelte';
	import Icon from '@iconify/svelte';
	import type { CarouselProps, CarouselContext } from '$lib/types/carousel.js';

	let {
		autoPlay = false,
		interval = 5000,
		showArrows = true,
		showIndicators = true,
		children
	}: CarouselProps = $props();

	let currentIndex = $state(0);
	let items = $state<any[]>([]);
	let timer: ReturnType<typeof setInterval> | undefined;

	function registerItem(item: any) {
		const index = items.length;
		items = [...items, item];
		return index;
	}

	function goToSlide(index: number) {
		currentIndex = index;
		resetTimer();
	}

	function nextSlide() {
		if (items.length === 0) return;
		currentIndex = (currentIndex + 1) % items.length;
	}

	function prevSlide() {
		if (items.length === 0) return;
		currentIndex = (currentIndex - 1 + items.length) % items.length;
	}

	function resetTimer() {
		if (autoPlay) {
			clearInterval(timer);
			timer = setInterval(nextSlide, interval);
		}
	}

	// Provide context for CarouselItems
	setContext<CarouselContext>('carousel', {
		registerItem,
		get currentIndex() {
			return currentIndex;
		}
	});

	$effect(() => {
		if (autoPlay) {
			resetTimer();
		}
		return () => clearInterval(timer);
	});
</script>

<div class="ax-carousel">
	<div class="ax-carousel__viewport">
		<div class="ax-carousel__track" style:transform={`translateX(-${currentIndex * 100}%)`}>
			{@render children?.()}
		</div>
	</div>

	{#if showArrows && items.length > 1}
		<button
			class="ax-carousel__arrow ax-carousel__arrow--prev"
			onclick={() => {
				prevSlide();
				resetTimer();
			}}
			aria-label="Previous slide"
		>
			<Icon icon="carbon:chevron-left" />
		</button>

		<button
			class="ax-carousel__arrow ax-carousel__arrow--next"
			onclick={() => {
				nextSlide();
				resetTimer();
			}}
			aria-label="Next slide"
		>
			<Icon icon="carbon:chevron-right" />
		</button>
	{/if}

	{#if showIndicators && items.length > 1}
		<nav class="ax-carousel__indicators" aria-label="Carousel navigation">
			{#each items as _, i}
				<button
					class="ax-carousel__indicator"
					class:is-active={i === currentIndex}
					onclick={() => goToSlide(i)}
					aria-label={`Go to slide ${i + 1}`}
					aria-current={i === currentIndex ? 'step' : undefined}
				></button>
			{/each}
		</nav>
	{/if}
</div>

<style>
	.ax-carousel {
		position: relative;
		width: 100%;
		background-color: var(--color-surface-container-lowest);
		/* Zero Displacement: Reserve space for border */
		border: var(--line-base) solid var(--color-outline-variant);
		overflow: hidden;
		transition: border-color var(--duration-base);
	}

	.ax-carousel:hover {
		border-color: var(--color-outline);
	}

	.ax-carousel__viewport {
		overflow: hidden;
		width: 100%;
	}

	.ax-carousel__track {
		display: flex;
		transition: transform var(--duration-base) cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Arrows with Zero Displacement */
	.ax-carousel__arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: var(--color-surface);
		/* Use border for structural space */
		border: var(--line-base) solid var(--color-outline);
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 10;
		transition: all var(--duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
		color: var(--color-on-surface);
		outline: none;
		padding: 0;
	}

	.ax-carousel__arrow:hover {
		background: var(--color-primary-container);
		color: var(--color-on-primary-container);
		border-color: var(--color-primary);
	}

	.ax-carousel__arrow:focus-visible {
		box-shadow:
			0 0 0 2px var(--color-surface),
			0 0 0 4px var(--color-primary);
	}

	.ax-carousel__arrow:active {
		transform: translateY(-50%) scale(0.95);
	}

	.ax-carousel__arrow--prev {
		left: var(--space-4);
	}
	.ax-carousel__arrow--next {
		right: var(--space-4);
	}

	/* Indicators with Zero Displacement */
	.ax-carousel__indicators {
		position: absolute;
		bottom: var(--space-4);
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: var(--space-2);
		z-index: 10;
	}

	.ax-carousel__indicator {
		width: var(--space-6);
		height: var(--line-base);
		border: none;
		background: var(--color-outline-variant);
		cursor: pointer;
		transition: all var(--duration-fast) ease-out;
		padding: 0;
		outline: none;
		/* Reserve vertical space for active state to avoid displacement */
		margin: var(--line-thin) 0;
	}

	.ax-carousel__indicator.is-active {
		background: var(--color-primary);
		height: var(--line-thick);
		margin: 0; /* Compensation for increased thickness */
	}

	.ax-carousel__indicator:hover:not(.is-active) {
		background: var(--color-outline);
	}

	.ax-carousel__indicator:focus-visible {
		box-shadow:
			0 0 0 2px var(--color-surface),
			0 0 0 4px var(--color-primary);
	}
</style>
