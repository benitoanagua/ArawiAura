<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Overlay from '$lib/components/Overlay.svelte';
	import type {
		OverlayAlign,
		OverlayPosition,
		OverlayBox,
		OverlayFill
	} from '$lib/types/overlay.js';
	import * as falso from '@ngneat/falso';

	const { Story } = defineMeta({
		title: 'Components/Overlay',
		tags: ['autodocs']
	});

	// Mock data generator using Falso (as requested)
	const createOverlayData = () => ({
		title: falso.randSentence(),
		url: '#',
		featureImage: `https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200`,
		tagName: falso.randWord(),
		authorName: falso.randFullName(),
		publishedAt: 'Oct 24, 2025',
		readingTime: `${falso.randNumber({ min: 3, max: 15 })} min read`
	});

	const overlayData = createOverlayData();

	const positions: OverlayPosition[] = ['top', 'center', 'bottom'];
	const aligns: OverlayAlign[] = ['start', 'center', 'end'];
	const boxes: OverlayBox[] = ['none', 'background', 'frame'];
	const fills: OverlayFill[] = ['gradient', 'full', 'none'];
</script>

<Story name="Variants Overview">
	<div class="story-grid">
		<section>
			<h3>Position & Alignment Master</h3>
			<div class="demo-grid">
				<Overlay
					{...overlayData}
					title="Top Start"
					position="top"
					align="start"
					fill="gradient"
					aspectRatio="video"
				/>
				<Overlay
					{...overlayData}
					title="Center Center"
					position="center"
					align="center"
					fill="full"
					aspectRatio="video"
				/>
				<Overlay
					{...overlayData}
					title="Bottom End"
					position="bottom"
					align="end"
					fill="gradient"
					aspectRatio="video"
				/>
			</div>
		</section>

		<section>
			<h3>Box Variants</h3>
			<div class="demo-grid">
				<Overlay {...overlayData} title="Box: None" box="none" fill="full" aspectRatio="video" />
				<Overlay
					{...overlayData}
					title="Box: Background"
					box="background"
					fill="none"
					aspectRatio="video"
				/>
				<Overlay {...overlayData} title="Box: Frame" box="frame" fill="none" aspectRatio="video" />
			</div>
		</section>

		<section>
			<h3>Fill Types</h3>
			<div class="demo-grid">
				<Overlay {...overlayData} title="Fill: Gradient" fill="gradient" aspectRatio="video" />
				<Overlay {...overlayData} title="Fill: Full" fill="full" aspectRatio="video" />
				<Overlay {...overlayData} title="Fill: None" fill="none" aspectRatio="video" />
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

	.demo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 1.5rem;
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
