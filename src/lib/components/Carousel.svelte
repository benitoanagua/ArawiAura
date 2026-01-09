<script lang="ts">
	import Icon from '@iconify/svelte';

	let {
		autoPlay = false,
		interval = 5000,
		showArrows = true,
		showIndicators = true,
		children
	} = $props<{
		autoPlay?: boolean;
		interval?: number;
		showArrows?: boolean;
		showIndicators?: boolean;
		children?: import('svelte').Snippet<[any]>;
	}>();

	let currentIndex = $state(0);
	let items = $state<any[]>([]);
	let autoPlayInterval: any;

	function registerItem(item: any) {
		const index = items.length;
		items = [...items, item];
		return index;
	}

	function goToSlide(index: number) {
		currentIndex = index;
	}

	function nextSlide() {
		if (items.length === 0) return;
		currentIndex = (currentIndex + 1) % items.length;
	}

	function prevSlide() {
		if (items.length === 0) return;
		currentIndex = (currentIndex - 1 + items.length) % items.length;
	}

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
		<div class="carousel-track" style:transform={`translateX(-${currentIndex * 100}%)`}>
			{@render children?.({ registerItem })}
		</div>
	</div>

	{#if showArrows && items.length > 1}
		<button
			class="carousel-arrow carousel-arrow--prev"
			onclick={prevSlide}
			aria-label="Previous slide"
		>
			<Icon icon="carbon:chevron-left" width="1.5rem" />
		</button>

		<button class="carousel-arrow carousel-arrow--next" onclick={nextSlide} aria-label="Next slide">
			<Icon icon="carbon:chevron-right" width="1.5rem" />
		</button>
	{/if}

	{#if showIndicators && items.length > 1}
		<div class="carousel-indicators">
			{#each items as _, i}
				<button
					class="carousel-indicator"
					class:is-active={i === currentIndex}
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
		border: var(--line-thin) solid var(--color-outline-variant);
		background-color: var(--color-surface-container-lowest);
	}

	.carousel-container {
		overflow: hidden;
		width: 100%;
	}

	.carousel-track {
		display: flex;
		transition: transform var(--duration-base) cubic-bezier(0.4, 0, 0.2, 1);
	}

	.carousel-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: var(--color-surface);
		border: var(--line-thin) solid var(--color-outline);
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
	}

	.carousel-arrow:hover {
		background: var(--color-primary-container);
		color: var(--color-on-primary-container);
		border-color: var(--color-primary);
	}

	.carousel-arrow:focus-visible {
		box-shadow:
			0 0 0 2px var(--color-surface),
			0 0 0 4px var(--color-primary);
	}

	.carousel-arrow:active {
		transform: translateY(-50%) scale(0.95);
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
		width: var(--space-6);
		height: var(--line-base);
		border: none;
		background: var(--color-outline-variant);
		cursor: pointer;
		transition: all var(--duration-fast) ease-out;
		padding: 0;
		outline: none;
	}

	.carousel-indicator.is-active {
		background: var(--color-primary);
		height: var(--line-thick);
	}

	.carousel-indicator:focus-visible {
		box-shadow:
			0 0 0 2px var(--color-surface),
			0 0 0 4px var(--color-primary);
	}
</style>
