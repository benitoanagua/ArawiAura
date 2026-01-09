<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Overlay from '$lib/components/Overlay.svelte';
	import type {
		OverlayAlign,
		OverlayPosition,
		OverlayBox,
		OverlayFill,
		OverlayProps
	} from '$lib/types/overlay.js';
	import * as falso from '@ngneat/falso';

	const { Story } = defineMeta({
		title: 'Components/Overlay',
		tags: ['autodocs']
	});

	// Generators
	const createOverlayData = (): OverlayProps => ({
		title: falso.randPhrase(),
		url: '#',
		featureImage: `https://picsum.photos/800/600?random=${falso.randNumber({ min: 1, max: 1000 })}`,
		tagName: falso.randWord(),
		authorName: falso.randFullName(),
		publishedAt: `${falso.randMonth({ abbreviation: true })} ${falso.randNumber({ min: 1, max: 30 })}`,
		readingTime: `${falso.randNumber({ min: 5, max: 25 })} min read`,
		headingLevel: 3,
		aspectRatio: 'monitor',
		align: 'center',
		position: 'center',
		box: 'background',
		fill: 'gradient',
		showMeta: true
	});

	const overlayData = createOverlayData();

	const boxes: OverlayBox[] = ['background', 'border', 'transparent'];
	const fills: OverlayFill[] = ['full', 'gradient', 'none'];
	const positions: OverlayPosition[] = ['top', 'center', 'bottom'];
	const aligns: OverlayAlign[] = ['start', 'center', 'end'];
	const ratios: Array<{ label: string; value: OverlayProps['aspectRatio'] }> = [
		{ label: 'Monitor (4:3)', value: 'monitor' },
		{ label: 'Video (16:9)', value: 'video' },
		{ label: 'Square (1:1)', value: 'square' }
	];
</script>

<Story name="Variants Overview">
	<div class="story-grid">
		<section>
			<h3>By Box Style</h3>
			<div class="row row--scroll">
				{#each boxes as box}
					<div class="col col--300">
						<Overlay {...overlayData} {box} title="Box: {box}" />
						<div class="label">{box}</div>
					</div>
				{/each}
			</div>
		</section>

		<section>
			<h3>By Fill Type</h3>
			<div class="row row--scroll">
				{#each fills as fill}
					<div class="col col--300">
						<Overlay {...overlayData} {fill} title="Fill: {fill}" />
						<div class="label">{fill}</div>
					</div>
				{/each}
			</div>
		</section>

		<section>
			<h3>By Position (Vertical)</h3>
			<div class="row row--scroll">
				{#each positions as position}
					<div class="col col--300">
						<Overlay {...createOverlayData()} {position} title="Pos: {position}" />
						<div class="label">{position}</div>
					</div>
				{/each}
			</div>
		</section>

		<section>
			<h3>By Alignment (Horizontal)</h3>
			<div class="row row--scroll">
				{#each aligns as align}
					<div class="col col--300">
						<Overlay {...createOverlayData()} {align} title="Align: {align}" />
						<div class="label">{align}</div>
					</div>
				{/each}
			</div>
		</section>

		<section>
			<h3>By Aspect Ratio</h3>
			<div class="row row--scroll">
				{#each ratios as ratio}
					<div class="col col--300">
						<Overlay
							{...createOverlayData()}
							aspectRatio={ratio.value}
							title={ratio.label}
							featureImage="https://picsum.photos/600/450"
						/>
						<div class="label">{ratio.label}</div>
					</div>
				{/each}
			</div>
		</section>

		<section>
			<h3>Mixed Grid (Simulation)</h3>
			<div class="grid-layout">
				<div class="grid-main">
					<Overlay {...createOverlayData()} title="Main Feature" headingLevel={2} />
				</div>
				<div class="grid-side">
					<Overlay
						{...createOverlayData()}
						fill="none"
						box="transparent"
						title="Secondary Link"
						headingLevel={4}
						aspectRatio="video"
						featureImage="https://picsum.photos/600/400"
					/>
					<Overlay
						{...createOverlayData()}
						box="border"
						fill="gradient"
						title="Related Article"
						headingLevel={4}
						aspectRatio="video"
						featureImage="https://picsum.photos/600/400"
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

	.col {
		flex-shrink: 0;
	}

	.col--300 {
		width: 320px;
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
