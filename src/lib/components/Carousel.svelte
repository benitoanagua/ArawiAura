<script lang="ts">
	import { setContext, onMount, onDestroy } from 'svelte';
	import Icon from '@iconify/svelte';
	import type { CarouselProps, CarouselContext, CarouselGap } from '$lib/types/Carousel.js';

	let {
		desktop = 3,
		mobile = 1,
		gap = 'medium',
		interval = 5000,
		autoPlay = false,
		showArrows = true,
		showDots = true,
		children,
		class: className
	}: CarouselProps = $props();

	// Gap values in pixels
	const GAP_VALUES: Record<CarouselGap, number> = {
		none: 0,
		small: 4,
		medium: 8,
		large: 12
	} as const;

	// State
	let containerElement = $state<HTMLElement>();
	let isMobile = $state(false);
	let activeIndex = $state(0);
	let totalItems = $state(0);
	let autoPlayTimer: number | null = null;
	let isUserInteracting = $state(false);

	// Derived values
	const itemsPerView = $derived(isMobile ? mobile : desktop);
	const gapValue = $derived(GAP_VALUES[gap]);
	const maxIndex = $derived(Math.max(0, totalItems - itemsPerView));
	const canGoPrev = $derived(activeIndex > 0 || autoPlay);
	const canGoNext = $derived(activeIndex < maxIndex || autoPlay);

	// Context for child items
	setContext<CarouselContext>('carousel', {
		get currentIndex() { return activeIndex; },
		get itemsPerView() { return itemsPerView; },
		get gapValue() { return gapValue; },
		get itemWidth() { return 0; },
		get isDragging() { return false; },
		registerItem: () => {
			const newIndex = totalItems;
			totalItems++;
			return newIndex;
		},
		unregisterItem: () => {
			totalItems = Math.max(0, totalItems - 1);
		}
	});

	// Navigation functions
	function scrollToIndex(targetIndex: number): void {
		if (!containerElement) return;

		let finalIndex = targetIndex;
		
		// Handle boundaries
		if (autoPlay) {
			if (targetIndex < 0) finalIndex = maxIndex;
			if (targetIndex > maxIndex) finalIndex = 0;
		} else {
			finalIndex = Math.max(0, Math.min(targetIndex, maxIndex));
		}

		activeIndex = finalIndex;
	}

	function goPrevious(): void {
		scrollToIndex(activeIndex - 1);
		restartAutoPlay();
	}

	function goNext(): void {
		scrollToIndex(activeIndex + 1);
		restartAutoPlay();
	}

	function goToSlide(index: number): void {
		scrollToIndex(index);
		restartAutoPlay();
	}

	// AutoPlay management
	function startAutoPlay(): void {
		if (!autoPlay || autoPlayTimer !== null) return;
		
		autoPlayTimer = window.setInterval(() => {
			if (!isUserInteracting) {
				goNext();
			}
		}, interval);
	}

	function stopAutoPlay(): void {
		if (autoPlayTimer !== null) {
			clearInterval(autoPlayTimer);
			autoPlayTimer = null;
		}
	}

	function restartAutoPlay(): void {
		stopAutoPlay();
		if (autoPlay && !isUserInteracting) {
			startAutoPlay();
		}
	}

	// User interaction handlers
	function handleMouseEnter(): void {
		isUserInteracting = true;
		stopAutoPlay();
	}

	function handleMouseLeave(): void {
		isUserInteracting = false;
		if (autoPlay) {
			startAutoPlay();
		}
	}

	// Lifecycle
	onMount(() => {
		// Media query setup
		const mediaQuery = window.matchMedia('(max-width: 768px)');
		isMobile = mediaQuery.matches;

		const handleMediaChange = (e: MediaQueryListEvent) => {
			isMobile = e.matches;
		};

		mediaQuery.addEventListener('change', handleMediaChange);

		// Start autoPlay if enabled
		if (autoPlay) {
			startAutoPlay();
		}

		return () => {
			mediaQuery.removeEventListener('change', handleMediaChange);
			stopAutoPlay();
		};
	});

	onDestroy(() => {
		stopAutoPlay();
	});
</script>

<div class="carousel {className || ''}" role="region" aria-label="Carousel">
	<!-- Controls -->
	<div class="carousel__header">
		{#if showArrows}
			<div class="carousel__arrows">
				<button
					class="carousel__arrow"
					class:carousel__arrow--disabled={!canGoPrev}
					disabled={!canGoPrev}
					onclick={goPrevious}
					aria-label="Previous slide"
				>
					<div class="carousel__arrow-icon">
						<Icon icon="carbon:chevron-left" width="1.2em" height="1.2em" />
					</div>
				</button>
				<button
					class="carousel__arrow"
					class:carousel__arrow--disabled={!canGoNext}
					disabled={!canGoNext}
					onclick={goNext}
					aria-label="Next slide"
				>
					<div class="carousel__arrow-icon">
						<Icon icon="carbon:chevron-right" width="1.2em" height="1.2em" />
					</div>
				</button>
			</div>
		{/if}

		{#if showDots && maxIndex > 0}
			<div class="carousel__dots">
				{#each Array(maxIndex + 1) as _, i}
					<button
						class="carousel__dot"
						class:carousel__dot--active={activeIndex === i}
						onclick={() => goToSlide(i)}
						aria-label="Go to slide {i + 1}"
					></button>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Viewport -->
	<div
		class="carousel__viewport"
		bind:this={containerElement}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		style="--items-per-view: {itemsPerView}; --gap: {gapValue}px; --active-index: {activeIndex};"
		role="presentation"
	>
		<div class="carousel__track">
			{@render children?.()}
		</div>
	</div>
</div>

<style>
	.carousel {
		width: 100%;
		display: flex;
		flex-direction: column;
		
		/* Minimal Architectural Outline styling */
		border: 1px solid var(--color-outline-variant, rgba(0, 0, 0, 0.12));
		border-radius: 6px;
		background: var(--color-surface, rgba(255, 255, 255, 0.02));
	}

	.carousel__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.75rem;
		border-bottom: 1px solid var(--color-outline-variant, rgba(0, 0, 0, 0.08));
	}

	.carousel__arrows {
		display: flex;
		gap: 4px;
	}

	.carousel__arrow {
		width: 36px;
		height: 36px;
		border: 1px solid var(--color-outline, rgba(0, 0, 0, 0.2));
		border-radius: 4px;
		background: var(--color-surface-container, rgba(0, 0, 0, 0.04));
		color: var(--color-on-surface, #1a1a1a);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 200ms ease;
		outline: none;
	}

	.carousel__arrow:focus-visible {
		box-shadow:
			0 0 0 2px var(--color-surface, #fff),
			0 0 0 4px var(--color-primary, #0066cc);
		z-index: 10;
	}

	.carousel__arrow:hover:not(.carousel__arrow--disabled) {
		border-color: var(--color-outline, rgba(0, 0, 0, 0.3));
		background: var(--color-surface-container-high, rgba(0, 0, 0, 0.08));
		color: var(--color-on-surface, #000);
	}

	.carousel__arrow:active:not(.carousel__arrow--disabled) {
		transform: scale(0.95);
		border-color: var(--color-primary, #0066cc);
	}

	.carousel__arrow--disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.carousel__arrow-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.carousel__dots {
		display: flex;
		gap: 6px;
		align-items: center;
	}

	.carousel__dot {
		width: 8px;
		height: 8px;
		border: 1px solid var(--color-outline, rgba(0, 0, 0, 0.3));
		border-radius: 50%;
		background: transparent;
		cursor: pointer;
		transition: all 200ms ease;
		padding: 0;
	}

	.carousel__dot:hover {
		border-color: var(--color-outline, rgba(0, 0, 0, 0.5));
		background: var(--color-surface-container, rgba(0, 0, 0, 0.1));
	}

	.carousel__dot--active {
		background: var(--color-primary, #0066cc);
		border-color: var(--color-primary, #0066cc);
		transform: scale(1.3);
	}

	.carousel__viewport {
		overflow: hidden;
	}

	.carousel__track {
		display: flex;
		gap: var(--gap, 8px);
		padding: 0.75rem 0;
		transition: transform 300ms ease;
		transform: translateX(calc(-1 * var(--active-index, 0) * (100% / var(--items-per-view))));
	}

	/* Responsive */
	@media (max-width: 768px) {
		.carousel__header {
			flex-direction: column;
			gap: 0.75rem;
		}
		
		.carousel__arrows {
			order: 2;
		}
		
		.carousel__dots {
			order: 1;
		}
	}
</style>