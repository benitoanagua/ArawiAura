<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from '$lib/components/Card.svelte';
	import type { CardDensity, CardElevation } from '$lib/types/Card.js';

	const { Story } = defineMeta({
		title: 'Components/Card',
		tags: ['autodocs']
	});

	const densities: CardDensity[] = ['normal', 'compact', 'comfortable'];
	const elevations: CardElevation[] = [0, 1, 2, 3];
</script>

<Story name="Variants Overview">
	<div class="story-grid">
		<section>
			<h3>By Density</h3>
			<div class="row row--scroll">
				{#each densities as density}
					<div class="col col--300">
						<Card {density}>
							<h4>Card Content</h4>
							<p>This is a {density} density card with balanced spacing and layout.</p>
						</Card>
						<div class="label">{density}</div>
					</div>
				{/each}
			</div>
		</section>

		<section>
			<h3>By Elevation</h3>
			<div class="row row--scroll">
				{#each elevations as elevation}
					<div class="col col--300">
						<Card {elevation}>
							<h4>Elevation {elevation}</h4>
							<p>Card with elevation level {elevation} showing depth and visual hierarchy.</p>
						</Card>
						<div class="label">Elevation {elevation}</div>
					</div>
				{/each}
			</div>
		</section>

		<section>
			<h3>Content Variations</h3>
			<div class="row row--scroll">
				<div class="col col--300">
					<Card elevation={2}>
						<h4>With Header</h4>
						<p>Card with title and description content.</p>
					</Card>
					<div class="label">Header + Content</div>
				</div>
				
				<div class="col col--300">
					<Card elevation={1} density="compact">
						<h4>Compact Layout</h4>
						<p>Dense card suitable for lists and grids.</p>
					</Card>
					<div class="label">Compact</div>
				</div>
				
				<div class="col col--300">
					<Card elevation={3} density="comfortable">
						<h4>Comfortable Spacing</h4>
						<p>Spacious card for detailed content and better readability.</p>
					</Card>
					<div class="label">Comfortable</div>
				</div>
			</div>
		</section>

		<section>
			<h3>Interactive States</h3>
			<div class="row row--scroll">
				<div class="col col--300">
					<Card elevation={2}>
						<h4>Hover Effect</h4>
						<p>Cards with elevation 2+ have subtle hover interactions.</p>
					</Card>
					<div class="label">Interactive</div>
				</div>
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

	.row {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.row--scroll {
		flex-wrap: nowrap;
		overflow-x: auto;
		padding-bottom: 1rem;
	}

	.col {
		flex-shrink: 0;
	}

	.col--300 {
		width: 320px;
	}

	.label {
		margin-top: 0.75rem;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		text-transform: uppercase;
		color: var(--color-on-surface-variant);
		text-align: center;
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

	:global(.svelte-storybook) h4 {
		margin: 0 0 0.5rem 0;
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--color-on-surface);
	}

	:global(.svelte-storybook) p {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-on-surface-variant);
		line-height: 1.5;
	}
</style>