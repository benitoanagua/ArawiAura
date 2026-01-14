<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Carousel from '$lib/components/Carousel.svelte';
	import CarouselItem from '$lib/components/CarouselItem.svelte';
	import type { CarouselGap } from '$lib/types/Carousel';
	import * as falso from '@ngneat/falso';

	const { Story } = defineMeta({
		title: 'Components/Carousel',
		tags: ['autodocs']
	});

	// Generators
	const createSlideData = (count: number) => {
		return Array.from({ length: count }, (_, i) => ({
			id: i,
			title: `${i + 1}`,
			phrase: falso.randCatchPhrase()
		}));
	};

	const slides = createSlideData(6);
	const gaps: CarouselGap[] = ['none', 'small', 'medium', 'large'];
</script>

<Story name="Variants Overview">
	<div class="story-container">
		<section>
			<h3>3 Columns, Medium Gap</h3>
			<Carousel desktop={3} mobile={1} gap="medium">
				{#each slides as slide}
					<CarouselItem>
						<div class="slide-number">{slide.title}</div>
						<p class="slide-text">{slide.phrase}</p>
					</CarouselItem>
				{/each}
			</Carousel>
		</section>

		<section>
			<h3>Gap Variations</h3>
			{#each gaps as gap}
				<div class="gap-demo">
					<span class="label">Gap: {gap}</span>
					<Carousel desktop={4} mobile={2} {gap} showDots={false}>
						{#each createSlideData(5) as slide}
							<CarouselItem>
								<div class="slide-number small">{slide.id + 1}</div>
							</CarouselItem>
						{/each}
					</Carousel>
				</div>
			{/each}
		</section>

		<section>
			<h3>AutoPlay (2 Columns)</h3>
			<Carousel desktop={2} mobile={1} autoPlay={true} interval={3000}>
				{#each createSlideData(5) as slide}
					<CarouselItem>
						<div class="slide-number">{slide.title}</div>
						<p class="slide-text">Auto-playing...</p>
					</CarouselItem>
				{/each}
			</Carousel>
		</section>

		<section>
			<h3>4 Columns</h3>
			<Carousel desktop={4} mobile={2} gap="small">
				{#each createSlideData(8) as slide}
					<CarouselItem>
						<div class="slide-number">{slide.title}</div>
					</CarouselItem>
				{/each}
			</Carousel>
		</section>
	</div>
</Story>

<style>
	.story-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 1rem;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	section h3 {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		text-transform: uppercase;
		color: var(--color-on-surface-variant);
		border-bottom: 1px solid var(--color-outline-variant);
		padding-bottom: 0.5rem;
		margin: 0;
	}

	.gap-demo {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--color-on-surface-variant);
	}

	.slide-number {
		font-size: 2rem;
		font-weight: 800;
		color: var(--color-primary);
	}

	.slide-number.small {
		font-size: 1.25rem;
	}

	.slide-text {
		color: var(--color-on-surface-variant);
		font-size: 0.8rem;
		text-align: center;
		margin: 0;
	}
</style>
