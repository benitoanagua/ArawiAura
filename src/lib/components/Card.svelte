<script lang="ts">
	import type {
		CardHeading,
		CardDensity,
		CardMediaAlign,
		CardMediaWidth,
		CardAspectRatio,
		CardElevation
	} from '$lib/types/card.js';
	import { createTitleRenderer, renderTitleHtml } from '$lib/utils/title-renderer.js';
	import { onMount, onDestroy } from 'svelte';

	// Core properties
	export let title: string = '';
	export let url: string = '';
	export let excerpt: string = '';
	export let featureImage: string = '';

	// Author properties
	export let authorName: string = '';
	export let authorUrl: string = '';
	export let authorProfileImage: string = '';

	// Tag properties
	export let tagName: string = '';
	export let tagUrl: string = '';

	// Metadata
	export let readingTime: string = '';
	export let publishedAt: string = '';

	// Layout properties
	export let mediaAlign: CardMediaAlign = 'left';
	export let mediaWidth: CardMediaWidth = 'is-half';
	export let density: CardDensity = 'normal';
	export let aspectRatio: CardAspectRatio = 'monitor';
	export let elevation: CardElevation = 2;
	export let headingLevel: CardHeading = 4;

	// State for image size detection
	let imageSize = { width: 0, height: 0 };
	let imageElement: HTMLImageElement;
	let imageObserver: ResizeObserver;

	// Reactive computations
	$: formattedDate = publishedAt
		? new Date(publishedAt).toLocaleDateString('es-ES', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			})
		: '';

	// Use the title renderer utility
	$: titleRenderer = createTitleRenderer(title, headingLevel);

	// Computed classes
	function getCardClasses() {
		const classes = ['wc-card', `wc-card--elevation-${elevation}`];
		return classes.join(' ');
	}

	function getFlexClass() {
		if (mediaAlign === 'left' && density !== 'normal') return 'flex-row';
		if (mediaAlign === 'left' && density === 'normal') return 'flex-col md:flex-row';
		if (mediaAlign === 'right' && density !== 'normal') return 'flex-row-reverse';
		if (mediaAlign === 'right' && density === 'normal')
			return 'flex-col-reverse md:flex-row-reverse';
		if (mediaAlign === 'top') return 'flex-col';
		return 'flex-col-reverse';
	}

	function getFigureClass() {
		const isHorizontal = mediaAlign === 'left' || mediaAlign === 'right';
		const isNormalDensity = density === 'normal';

		if (!isHorizontal || (isHorizontal && isNormalDensity)) return 'flex-1';

		switch (mediaWidth) {
			case 'is-one-fifth':
				return 'width-one-fifth';
			case 'is-one-quarter':
				return 'width-one-quarter';
			case 'is-one-third':
				return 'width-one-third';
			case 'is-two-fifths':
				return 'width-two-fifths';
			default:
				return 'width-half';
		}
	}

	function getImageClasses() {
		const sizeClass =
			imageSize.width < 240
				? 'image-rounded'
				: imageSize.width >= 240 && imageSize.width <= 440
					? 'image-rounded-md'
					: 'image-rounded-lg';

		const aspectClass =
			aspectRatio === 'square'
				? 'image-aspect-square'
				: aspectRatio === 'video'
					? 'image-aspect-video'
					: 'image-aspect-monitor';

		return `image-full image-object-cover ${sizeClass} ${aspectClass}`;
	}

	function setupImageObserver() {
		if (imageElement) {
			imageObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					imageSize = {
						width: entry.contentRect.width,
						height: entry.contentRect.height
					};
				}
			});
			imageObserver.observe(imageElement);
		}
	}

	function cleanupImageObserver() {
		imageObserver?.disconnect();
	}

	onMount(() => {
		setupImageObserver();
	});

	onDestroy(() => {
		cleanupImageObserver();
	});
</script>

<div class={getCardClasses()}>
	<div class="wc-card__container {getFlexClass()}">
		{#if featureImage}
			<figure class="wc-card__figure {getFigureClass()}">
				<a href={url}>
					<img src={featureImage} alt={title} class={getImageClasses()} bind:this={imageElement} />
				</a>
			</figure>
		{/if}

		<div class="wc-card__content">
			{#if authorName}
				<div class="wc-card__author">
					{#if authorProfileImage}
						<img src={authorProfileImage} alt={authorName} class="wc-card__author-image" />
					{:else}
						<span class="wc-card__author-bullet"></span>
					{/if}
					<a href={authorUrl} class="wc-card__author-link">
						{authorName}
					</a>
				</div>
			{/if}

			<a href={url} class="wc-card__title-link">
				{@html renderTitleHtml(title, headingLevel)}
			</a>

			{#if density === 'normal'}
				<p class="wc-card__excerpt">{excerpt}</p>
			{/if}

			{#if tagName && density !== 'minimal'}
				<div class="wc-card__meta">
					{#if publishedAt}
						<span class="wc-card__meta-item">{formattedDate}</span>
					{/if}
					{#if readingTime}
						<span class="wc-card__meta-item">{readingTime}</span>
					{/if}
					<a href={tagUrl} class="wc-card__tag">
						{tagName}
					</a>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	/* Base card styles */
	.wc-card {
		display: block;
		transition: all var(--duration-base) cubic-bezier(0.4, 0, 0.2, 1);
		background: var(--color-surface);
		border: var(--line-thin) solid var(--color-outline-variant);
		overflow: hidden;
	}

	/* Elevation variants - Architectural Outline style */
	.wc-card--elevation-0 {
		border: none;
		background: transparent;
	}

	.wc-card--elevation-1 {
		border: var(--line-thin) solid var(--color-outline-variant);
		border-radius: var(--space-1);
	}

	.wc-card--elevation-2 {
		border: var(--line-thin) solid var(--color-outline);
		border-radius: var(--space-2);
	}

	.wc-card--elevation-2:hover {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px var(--color-primary);
	}

	.wc-card--elevation-3 {
		border: var(--line-base) solid var(--color-primary);
		border-radius: var(--space-3);
	}

	/* Container layout */
	.wc-card__container {
		display: flex;
		gap: 0; /* Blueprint Grid: borders shared */
		width: 100%;
	}

	/* Figure (image container) */
	.wc-card__figure {
		margin: 0;
		overflow: hidden;
		flex-shrink: 0;
		border-right: var(--line-thin) solid var(--color-outline-variant);
		position: relative;
	}

	/* Image enclosure: internal border */
	.wc-card__figure::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border: 1px solid rgba(255, 255, 255, 0.1);
		pointer-events: none;
	}

	.wc-card__figure img {
		transition: transform var(--duration-base) ease-out;
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
	}

	.wc-card__figure:hover img {
		transform: scale(1.02);
	}

	/* Aspect Ratios */
	.image-aspect-square {
		aspect-ratio: 1 / 1;
	}
	.image-aspect-video {
		aspect-ratio: 16 / 9;
	}
	.image-aspect-monitor {
		aspect-ratio: 4 / 3;
	}

	/* Content area */
	.wc-card__content {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-4);
		flex: 1;
		min-width: 0;
	}

	/* Author section */
	.wc-card__author {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding-bottom: var(--space-2);
		border-bottom: var(--line-thin) solid var(--color-outline-variant);
	}

	.wc-card__author-image {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: var(--space-1);
		object-fit: cover;
		border: var(--line-thin) solid var(--color-outline);
	}

	.wc-card__author-bullet {
		width: 0.5rem;
		height: 0.5rem;
		border: 1px solid var(--color-primary);
		display: inline-block;
	}

	.wc-card__author-link {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--color-on-surface-variant);
		text-decoration: none;
		text-transform: uppercase;
		transition: color var(--duration-fast) ease-out;
	}

	.wc-card__author-link:hover {
		color: var(--color-primary);
	}

	/* Title */
	.wc-card__title-link {
		text-decoration: none;
		color: var(--color-on-surface);
	}

	.wc-card__title-link :global(.title-renderer__title) {
		font-family: var(--font-sans);
		font-weight: 700;
		line-height: var(--leading-tight);
		margin: 0;
		color: inherit;
		letter-spacing: -0.01em;
	}

	/* Excerpt */
	.wc-card__excerpt {
		font-family: var(--font-serif);
		font-size: var(--text-base);
		line-height: var(--leading-relaxed);
		color: var(--color-on-surface-variant);
		margin: 0;
		opacity: 0.9;
	}

	/* Meta information (Technical Look) */
	.wc-card__meta {
		display: flex;
		gap: var(--space-4);
		align-items: center;
		padding-top: var(--space-2);
		border-top: var(--line-thin) solid var(--color-outline-variant);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
	}

	.wc-card__tag {
		color: var(--color-primary);
		text-decoration: none;
		font-weight: 600;
		border: 1px solid var(--color-primary);
		padding: 0 var(--space-1);
		transition: all var(--duration-fast) ease-out;
	}

	.wc-card__tag:hover {
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	/* Width utilities */
	.width-one-fifth {
		width: 20%;
	}
	.width-one-quarter {
		width: 25%;
	}
	.width-one-third {
		width: 33.333%;
	}
	.width-two-fifths {
		width: 40%;
	}
	.width-half {
		width: 50%;
	}

	/* Resp. Layouts */
	.flex-row {
		flex-direction: row;
	}
	.flex-row-reverse {
		flex-direction: row-reverse;
	}
	.flex-col {
		flex-direction: column;
	}
	.flex-col-reverse {
		flex-direction: column-reverse;
	}

	@media (max-width: 768px) {
		.md-flex-row,
		.md-flex-row-reverse {
			flex-direction: column;
		}
		.wc-card__figure {
			border-right: none;
			border-bottom: var(--line-thin) solid var(--color-outline-variant);
			width: 100% !important;
		}
	}
</style>
