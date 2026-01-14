<script lang="ts">
	import Heading from './Heading.svelte';
	import type { OverlayProps } from '$lib/types/Overlay.js';

	let {
		title,
		url,
		featureImage,
		tagName,
		authorName,
		publishedAt,
		readingTime,
		aspectRatio = 'monitor',
		headingLevel = 4,
		align = 'center',
		position = 'center',
		box = 'background',
		fill = 'full',
		showMeta = true,
		compact = false
	}: OverlayProps = $props();

	/* Logic: showMeta controls visibility of all meta items */
	const hasMeta = $derived(showMeta && !!(authorName || publishedAt || readingTime));
</script>

<div
	class="ax-overlay ax-overlay--aspect-{aspectRatio} ax-overlay--box-{box} ax-overlay--fill-{fill} ax-overlay--align-{align} ax-overlay--position-{position}"
	class:ax-overlay--compact={compact}
>
	{#if featureImage}
		<div class="ax-overlay__image" style:background-image="url({featureImage})"></div>
	{/if}

	<div class="ax-overlay__container">
		<div class="ax-overlay__content">
			{#if tagName}
				<span class="ax-overlay__tag">{tagName}</span>
			{/if}

			<a href={url} class="ax-overlay__title-link">
				<Heading level={headingLevel} class="ax-overlay__title">
					{title}
				</Heading>
			</a>

			{#if hasMeta}
				<ul class="ax-overlay__meta">
					{#if authorName}
						<li class="ax-overlay__meta-item">{authorName}</li>
					{/if}
					{#if publishedAt}
						<li class="ax-overlay__meta-item">{publishedAt}</li>
					{/if}
					{#if readingTime}
						<li class="ax-overlay__meta-item">{readingTime}</li>
					{/if}
				</ul>
			{/if}
		</div>
	</div>
</div>

<style>
	/* Base Overlay */
	.ax-overlay {
		width: 100%;
		display: flex;
		overflow: hidden;
		background-size: cover;
		background-position: center;
		position: relative;
		isolation: isolate;
		border: 1px solid rgba(255, 255, 255, 0.2); /* border-white/20 */
		border-radius: var(--space-2);
	}

	.ax-overlay__image {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		z-index: 0;
	}

	/* Fills - using pseudo-elements for gradients/overlays */
	.ax-overlay::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		transition: background 0.3s ease;
	}

	.ax-overlay--fill-none::before {
		display: none;
	}

	.ax-overlay--fill-full::before {
		background: rgba(0, 0, 0, 0.4); /* bg-scrim/40 */
	}

	/* Gradients based on position */
	.ax-overlay--fill-gradient.ax-overlay--position-top::before {
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2), transparent);
	}

	.ax-overlay--fill-gradient.ax-overlay--position-bottom::before {
		background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2), transparent);
	}

	.ax-overlay--fill-gradient.ax-overlay--position-center::before {
		background: linear-gradient(
			to top,
			transparent,
			rgba(0, 0, 0, 0.3) 20%,
			rgba(0, 0, 0, 0.3) 80%,
			transparent
		);
	}

	/* Container / Layout */
	.ax-overlay__container {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		z-index: 2;
		padding: var(--space-4); /* md:p-4 */
	}

	/* Positioning Logic */
	.ax-overlay--position-top .ax-overlay__container {
		align-items: flex-start;
	}
	.ax-overlay--position-center .ax-overlay__container {
		align-items: center;
	}
	.ax-overlay--position-bottom .ax-overlay__container {
		align-items: flex-end;
	}

	.ax-overlay--align-start .ax-overlay__container {
		justify-content: flex-start;
	}
	.ax-overlay--align-center .ax-overlay__container {
		justify-content: center;
	}
	.ax-overlay--align-end .ax-overlay__container {
		justify-content: flex-end;
	}

	/* Content Card */
	.ax-overlay__content {
		max-width: 42rem;
		padding: var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		position: relative;
		border-radius: var(--space-2); /* rounded-lg */
		transition: all 0.3s ease;
		box-sizing: border-box;

		/* Default: Transparent, Border White/30 */
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.ax-overlay__content:hover {
		border-color: rgba(255, 255, 255, 0.5);
	}

	/* Alignment inside content */
	.ax-overlay--align-start .ax-overlay__content {
		text-align: left;
		align-items: flex-start;
	}
	.ax-overlay--align-center .ax-overlay__content {
		text-align: center;
		align-items: center;
	}
	.ax-overlay--align-end .ax-overlay__content {
		text-align: right;
		align-items: flex-end;
	}

	/* Box Styles */
	.ax-overlay--box-background .ax-overlay__content {
		background: rgba(255, 255, 255, 0.05); /* bg-white/5 */
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		border: 2px solid rgba(255, 255, 255, 0.4); /* border-white/40 */
	}

	.ax-overlay--box-border .ax-overlay__content {
		background: transparent;
		backdrop-filter: none;
		border: 2px solid rgba(255, 255, 255, 0.6); /* border-white/60 */
	}

	.ax-overlay--box-border .ax-overlay__content:hover {
		border-color: rgba(255, 255, 255, 0.8);
	}

	.ax-overlay--box-transparent .ax-overlay__content {
		background: transparent;
		border: 0;
		backdrop-filter: none;
	}

	/* Tag / Category */
	.ax-overlay__tag {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: var(--space-1) var(--space-3);
		border-radius: 999px; /* rounded-full */
		transition: all 0.2s ease;
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.6);
		color: white;
		width: fit-content;
	}

	.ax-overlay__tag:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: white;
	}

	/* Title Link */
	.ax-overlay__title-link {
		position: relative;
		display: block;
		text-decoration: none;
	}

	.ax-overlay__title-link :global(.ax-overlay__title) {
		color: white;
		transition: all 0.2s ease;
	}

	/* Title Underline animation from reference */
	.ax-overlay__title-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background: white;
		transition: width 0.3s ease;
	}

	.ax-overlay__title-link:hover::after {
		width: 100%;
	}

	/* Metadata */
	.ax-overlay__meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-3);
		padding-top: var(--space-3);
		border-top: 1px solid rgba(255, 255, 255, 0.2);
		margin: 0;
		list-style: none;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
	}

	.ax-overlay__meta-item {
		color: rgba(255, 255, 255, 0.9);
		font-weight: 500;
		transition: color 0.2s ease;
	}

	.ax-overlay__meta-item:hover {
		color: white;
	}

	.ax-overlay__meta-item:not(:last-child)::after {
		content: '•';
		margin-left: var(--space-2);
		margin-right: var(--space-1);
		color: rgba(255, 255, 255, 0.4);
	}

	/* Aspect Ratios */
	.ax-overlay--aspect-monitor {
		aspect-ratio: 4 / 3;
	}
	.ax-overlay--aspect-square {
		aspect-ratio: 1 / 1;
	}
	.ax-overlay--aspect-video {
		aspect-ratio: 16 / 9;
	}

	/* Mobile Adjustments */
	@media (max-width: 768px) {
		.ax-overlay {
			border: 0;
		}
		.ax-overlay__content {
			margin: var(--space-2);
			border: 1px solid rgba(255, 255, 255, 0.3);
			border-radius: var(--space-2);
		}
		.ax-overlay--box-background .ax-overlay__content,
		.ax-overlay--box-border .ax-overlay__content {
			border-width: 1px;
		}
	}

	/* Title Sizes for Overlay context */
	.ax-overlay__title-link :global(.ax-overlay__title.ax-heading--1) {
		font-size: var(--text-4xl);
		font-weight: 800;
	}
	.ax-overlay__title-link :global(.ax-overlay__title.ax-heading--2) {
		font-size: var(--text-3xl);
		font-weight: 700;
	}
	.ax-overlay__title-link :global(.ax-overlay__title.ax-heading--3) {
		font-size: var(--text-2xl);
		font-weight: 600;
	}
	.ax-overlay__title-link :global(.ax-overlay__title.ax-heading--4) {
		font-size: var(--text-xl);
		font-weight: 600;
	}
</style>
