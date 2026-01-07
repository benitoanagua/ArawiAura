<script lang="ts">
	import type { CardHeading, CardDensity, CardMediaAlign, CardMediaWidth, CardAspectRatio, CardElevation } from '$lib/types/card.js';
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
		if (mediaAlign === 'right' && density === 'normal') return 'flex-col-reverse md:flex-row-reverse';
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
						height: entry.contentRect.height,
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
					<img
						src={featureImage}
						alt={title}
						class={getImageClasses()}
						bind:this={imageElement}
					/>
				</a>
			</figure>
		{/if}

		<div class="wc-card__content">
			{#if authorName}
				<div class="wc-card__author">
					{#if authorProfileImage}
						<img
							src={authorProfileImage}
							alt={authorName}
							class="wc-card__author-image"
						/>
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
		transition: all var(--duration-base) ease-out;
		background: transparent;
	}

	/* Elevation variants */
	.wc-card--elevation-0 {
		padding: 0;
		border: 0;
	}

	.wc-card--elevation-1 {
		border: var(--line-thin) solid var(--border-light);
		border-radius: 0.5rem;
		padding: var(--space-3);
		background: transparent;
		transition: color var(--duration-fast) ease-out;
	}

	.wc-card--elevation-1:hover {
		border-color: var(--text-secondary);
	}

	.wc-card--elevation-2 {
		border: var(--line-thin) solid var(--border-medium);
		border-radius: 0.75rem;
		padding: var(--space-4);
		background: transparent;
		transition: all var(--duration-fast) ease-out;
	}

	.wc-card--elevation-2:hover {
		border-color: var(--text-primary);
		box-shadow: var(--shadow-sm);
	}

	.wc-card--elevation-3 {
		border: var(--line-base) solid var(--text-primary);
		border-radius: 0.75rem;
		padding: var(--space-5);
		background: transparent;
		box-shadow: var(--shadow-sm);
	}

	.wc-card--elevation-3:hover {
		border-color: var(--accent-primary);
	}

	/* Container layout */
	.wc-card__container {
		display: flex;
		gap: var(--space-4);
		width: 100%;
	}

	/* Figure (image container) */
	.wc-card__figure {
		margin: 0;
		overflow: hidden;
		flex-shrink: 0;
		border: var(--line-thin) solid var(--border-light);
		border-radius: 0.375rem;
	}

	.wc-card__figure img {
		transition: transform var(--duration-base) ease-out;
		width: 100%;
		height: auto;
		display: block;
	}

	/* Image classes for dynamic styling */
	.image-full {
		width: 100%;
		height: auto;
		display: block;
	}

	.image-object-cover {
		object-fit: cover;
	}

	.image-rounded { border-radius: 0.25rem; }
	.image-rounded-md { border-radius: 0.375rem; }
	.image-rounded-lg { border-radius: 0.5rem; }

	.image-aspect-square { aspect-ratio: 1 / 1; }
	.image-aspect-video { aspect-ratio: 16 / 9; }
	.image-aspect-monitor { aspect-ratio: 4 / 3; }

	.wc-card__figure:hover img {
		transform: scale(1.05);
	}

	/* Content area */
	.wc-card__content {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		flex: 1;
		min-width: 0;
	}

	/* Author section */
	.wc-card__author {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding-bottom: var(--space-3);
		border-bottom: var(--line-thin) solid var(--border-light);
	}

	.wc-card__author-image {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		object-fit: cover;
		border: var(--line-thin) solid var(--border-medium);
		padding: 0.125rem;
	}

	.wc-card__author-bullet {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		display: inline-block;
		background: transparent;
		border: var(--line-thin) solid var(--accent-primary);
	}

	.wc-card__author-link {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--text-secondary);
		text-decoration: none;
		position: relative;
		transition: color var(--duration-fast) ease-out;
	}

	.wc-card__author-link:hover {
		color: var(--accent-primary);
	}

	.wc-card__author-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--accent-primary);
		transition: width var(--duration-base) ease-out;
	}

	.wc-card__author-link:hover::after {
		width: 100%;
	}

	/* Title link */
	.wc-card__title-link {
		text-decoration: none;
		color: inherit;
	}

	.title-renderer__title {
		font-family: var(--font-sans);
		font-weight: 600;
		line-height: var(--leading-tight);
		margin: 0;
		color: var(--text-primary);
	}

	/* Excerpt */
	.wc-card__excerpt {
		font-family: var(--font-serif);
		font-size: var(--text-base);
		line-height: var(--leading-relaxed);
		color: var(--text-secondary);
		margin: 0;
	}

	/* Meta information */
	.wc-card__meta {
		display: flex;
		gap: var(--space-3);
		align-items: center;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.wc-card__meta-item {
		color: var(--text-muted);
	}

	.wc-card__tag {
		color: var(--accent-primary);
		text-decoration: none;
		border-bottom: var(--line-thin) dotted var(--accent-primary);
		transition: all var(--duration-fast) ease-out;
	}

	.wc-card__tag:hover {
		color: var(--accent-primary-hover);
		border-bottom-style: solid;
	}

	/* Width utility classes */
	.width-one-fifth { width: 20%; }
	.width-one-quarter { width: 25%; }
	.width-one-third { width: 33.333%; }
	.width-two-fifths { width: 40%; }
	.width-half { width: 50%; }

	/* Flex direction utilities */
	.flex-row { flex-direction: row; }
	.flex-row-reverse { flex-direction: row-reverse; }
	.flex-col { flex-direction: column; }
	.flex-col-reverse { flex-direction: column-reverse; }
	.flex-1 { flex: 1; }

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.wc-card__container {
			flex-direction: column;
		}
		
		.md-flex-row { flex-direction: row; }
		.md-flex-row-reverse { flex-direction: row-reverse; }
		
		.wc-card__figure {
			width: 100%;
		}
		
		.width-one-fifth,
		.width-one-quarter,
		.width-one-third,
		.width-two-fifths,
		.width-half {
			width: 100%;
		}
	}
</style>
