<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Carousel from '$lib/components/Carousel.svelte';
	import CarouselItem from '$lib/components/CarouselItem.svelte';

	const { Story } = defineMeta({
		title: 'Components/Carousel',
		component: Carousel,
		tags: ['autodocs']
	});
</script>

<Story name="Variants Overview">
	<div class="story-grid">
		<section>
			<h3>Standard Carousel</h3>
			<div class="carousel-wrapper">
				<Carousel showArrows={true} showIndicators={true}>
					<CarouselItem>
						<div class="slide slide--1">
							<h3>Slide 1</h3>
							<p>Standard configuration with arrows and indicators.</p>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div class="slide slide--2">
							<h3>Slide 2</h3>
							<p>Abstract landscapes and technical aesthetics.</p>
						</div>
					</CarouselItem>
				</Carousel>
			</div>
		</section>

		<section>
			<h3>AutoPlay (3s)</h3>
			<div class="carousel-wrapper">
				<Carousel autoPlay={true} interval={3000}>
					<CarouselItem>
						<div class="slide slide--3">
							<h3>AutoPlay 1</h3>
							<p>Automatically advances every 3 seconds.</p>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div class="slide slide--1">
							<h3>AutoPlay 2</h3>
							<p>Smooth transitions and Zero Displacement.</p>
						</div>
					</CarouselItem>
				</Carousel>
			</div>
		</section>

		<section>
			<h3>Minimal (Hidden controls)</h3>
			<div class="carousel-wrapper">
				<Carousel showArrows={false} showIndicators={false} autoPlay={true}>
					<CarouselItem>
						<div class="slide slide--2">
							<h3>Minimal Slide</h3>
							<p>Clean look without manual controls.</p>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div class="slide slide--3">
							<h3>Pure Content</h3>
							<p>Focusing on the visual impact.</p>
						</div>
					</CarouselItem>
				</Carousel>
			</div>
		</section>
	</div>
</Story>

<style>
	.story-grid {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 3rem;
		background: var(--color-background);
		min-height: 100vh;
	}

	.carousel-wrapper {
		max-width: 800px;
		margin: 0 auto;
	}

	.slide {
		width: 100%;
		height: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 3rem;
		color: white;
	}

	.slide h3 {
		font-family: var(--font-sans);
		font-size: var(--text-2xl);
		margin-bottom: 1rem;
	}

	.slide p {
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		max-width: 400px;
	}

	.slide--1 {
		background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
	}
	.slide--2 {
		background: linear-gradient(135deg, #111827 0%, #374151 100%);
	}
	.slide--3 {
		background: linear-gradient(135deg, #4c1d95 0%, #8b5cf6 100%);
	}

	section h3 {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		text-transform: uppercase;
		color: var(--color-on-surface-variant);
		margin-bottom: 1.5rem;
		border-bottom: 1px solid var(--color-outline-variant);
		padding-bottom: 0.5rem;
	}
</style>
