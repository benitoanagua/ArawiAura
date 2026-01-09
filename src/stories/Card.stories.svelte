<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from '$lib/components/Card.svelte';
	import type { CardDensity, CardMediaAlign, CardElevation } from '$lib/types/card.js';
	import * as falso from '@ngneat/falso';

	const { Story } = defineMeta({
		title: 'Components/Card',
		tags: ['autodocs']
	});

	// Mock data generators with strict typing
	const createCardData = () => ({
		title: falso.randSentence(),
		url: '#',
		excerpt: falso.randParagraph(),
		featureImage: `https://picsum.photos/800/600?random=${falso.randNumber()}`,
		authorName: falso.randFullName(),
		authorUrl: '#',
		tagName: falso.randWord(),
		tagUrl: '#',
		readingTime: `${falso.randNumber({ min: 2, max: 15 })} min`,
		publishedAt: falso.randRecentDate().toISOString()
	});

	const cardData = createCardData();
	const densities: CardDensity[] = ['normal', 'compact', 'minimal'];
	const elevations: CardElevation[] = [0, 1, 2, 3];
</script>

<Story name="Variants Overview">
	<div class="story-grid">
		<section>
			<h3>By Density</h3>
			<div class="row row--scroll">
				{#each densities as density}
					<div class="col col--300">
						<Card {...cardData} {density} />
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
						<Card {...cardData} {elevation} />
						<div class="label">Elevation {elevation}</div>
					</div>
				{/each}
			</div>
		</section>

		<section>
			<h3>By Alignment (Vertical)</h3>
			<div class="row row--scroll">
				<div class="col col--300">
					<Card {...cardData} mediaAlign="top" />
					<div class="label">Top (Default)</div>
				</div>
				<div class="col col--300">
					<Card {...cardData} mediaAlign="bottom" />
					<div class="label">Bottom</div>
				</div>
			</div>
		</section>

		<section>
			<h3>By Alignment (Horizontal)</h3>
			<div class="column column--gap-4">
				<div class="col-full">
					<Card {...cardData} mediaAlign="left" density="compact" />
					<div class="label">Aligned Left (Compact)</div>
				</div>
				<div class="col-full">
					<Card {...cardData} mediaAlign="right" density="compact" />
					<div class="label">Aligned Right (Compact)</div>
				</div>
			</div>
		</section>

		<section>
			<h3>Mixed Grid (Simulation)</h3>
			<div class="grid-layout">
				<div class="grid-main">
					<Card {...createCardData()} mediaAlign="top" elevation={2} />
				</div>
				<div class="grid-side">
					<Card
						{...createCardData()}
						density="compact"
						mediaAlign="left"
						mediaWidth="is-one-third"
						elevation={1}
					/>
					<Card
						{...createCardData()}
						density="compact"
						mediaAlign="left"
						mediaWidth="is-one-third"
						elevation={1}
					/>
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

	.column {
		display: flex;
		flex-direction: column;
	}

	.column--gap-4 {
		gap: 1.5rem;
	}

	.col {
		flex-shrink: 0;
	}

	.col--300 {
		width: 320px;
	}

	.col-full {
		width: 100%;
	}

	.grid-layout {
		display: grid;
		grid-template-columns: 2fr 1.5fr;
		gap: 1.5rem;
	}

	.grid-side {
		display: flex;
		flex-direction: column;
		gap: 1rem;
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

	@media (max-width: 1024px) {
		.grid-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
