<script lang="ts">
	import { renderTitleHtml } from '$lib/utils/title-renderer.js';
	import type { OverlayProps } from '$lib/types/overlay.js';

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
		compact = false
	}: OverlayProps = $props();

	const hasMeta = $derived(!!(authorName || publishedAt || readingTime));

	/* Architectural Outline: Zero Displacement logic */
</script>

<div
	class="ax-overlay ax-overlay--aspect-{aspectRatio} ax-overlay--box-{box} ax-overlay--fill-{fill}"
	class:ax-overlay--compact={compact}
>
	{#if featureImage && fill !== 'none'}
		<div class="ax-overlay__backdrop"></div>
	{/if}

	{#if featureImage}
		<div class="ax-overlay__image" style:background-image="url({featureImage})"></div>
	{/if}

	<div class="ax-overlay__container ax-overlay--align-{align} ax-overlay--position-{position}">
		<div class="ax-overlay__content">
			{#if tagName}
				<span class="ax-overlay__tag">{tagName}</span>
			{/if}

			<a href={url} class="ax-overlay__title-link">
				{@html renderTitleHtml(title, headingLevel)}
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
	.ax-overlay {
		position: relative;
		display: block;
		width: 100%;
		background-color: var(--color-surface-container-highest);
		overflow: hidden;
		/* Zero Displacement: Reserve space for border */
		border: var(--line-base) solid transparent;
		box-sizing: border-box;
		transition:
			border-color var(--duration-base),
			box-shadow var(--duration-base);
		border-radius: var(--space-1);
	}

	.ax-overlay:hover {
		border-color: var(--color-outline);
		box-shadow: inset 0 0 0 1px var(--color-outline);
	}

	.ax-overlay__image {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		z-index: 0;
		/* Card Media-Control: internal thin border to isolate from grid */
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
	}

	/* Aspect Ratios */
	.ax-overlay--aspect-monitor {
		aspect-ratio: 16 / 9;
	}
	.ax-overlay--aspect-video {
		aspect-ratio: 4 / 3;
	}
	.ax-overlay--aspect-square {
		aspect-ratio: 1 / 1;
	}

	/* Backdrops/Fills */
	.ax-overlay__backdrop {
		position: absolute;
		inset: 0;
		z-index: 1;
		transition: background-color var(--duration-base) ease-out;
	}

	.ax-overlay--fill-full .ax-overlay__backdrop {
		background: rgba(0, 0, 0, 0.5);
	}

	.ax-overlay--fill-gradient .ax-overlay__backdrop {
		background: linear-gradient(to bottom, transparent 30%, rgba(0, 0, 0, 0.8));
	}

	.ax-overlay:hover .ax-overlay__backdrop {
		background-color: rgba(0, 0, 0, 0.65);
	}

	/* Container & Layout */
	.ax-overlay__container {
		position: relative;
		height: 100%;
		display: flex;
		padding: var(--space-8);
		z-index: 2;
	}

	.ax-overlay--compact .ax-overlay__container {
		padding: var(--space-4);
	}

	/* Positioning */
	.ax-overlay--position-top {
		align-items: flex-start;
	}
	.ax-overlay--position-center {
		align-items: center;
	}
	.ax-overlay--position-bottom {
		align-items: flex-end;
	}

	/* Alignment */
	.ax-overlay--align-start {
		justify-content: flex-start;
		text-align: left;
	}
	.ax-overlay--align-center {
		justify-content: center;
		text-align: center;
	}
	.ax-overlay--align-end {
		justify-content: flex-end;
		text-align: right;
	}

	/* Content Logic */
	.ax-overlay__content {
		max-width: 85%;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.ax-overlay--align-start .ax-overlay__content {
		align-items: flex-start;
	}
	.ax-overlay--align-center .ax-overlay__content {
		align-items: center;
	}
	.ax-overlay--align-end .ax-overlay__content {
		align-items: flex-end;
	}

	/* Text Styles */
	.ax-overlay__title-link {
		text-decoration: none;
		display: block;
	}

	.ax-overlay__title-link :global(.title-renderer__title) {
		font-family: var(--font-serif);
		line-height: var(--leading-tight);
		margin: 0;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
		color: white;
		transition: transform var(--duration-base) var(--ease-out);
	}

	.ax-overlay:hover .ax-overlay__title-link :global(.title-renderer__title) {
		transform: translateY(-2px);
	}

	/* Heading Sizes (Blueprint-Core) */
	.ax-overlay__title-link :global(h1.title-renderer__title) {
		font-size: var(--text-4xl);
		font-weight: 800;
	}
	.ax-overlay__title-link :global(h2.title-renderer__title) {
		font-size: var(--text-3xl);
		font-weight: 700;
	}
	.ax-overlay__title-link :global(h3.title-renderer__title) {
		font-size: var(--text-2xl);
		font-weight: 600;
	}
	.ax-overlay__title-link :global(h4.title-renderer__title) {
		font-size: var(--text-xl);
		font-weight: 600;
	}

	.ax-overlay--compact .ax-overlay__title-link :global(.title-renderer__title) {
		font-size: var(--text-lg);
	}

	.ax-overlay__tag {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		background: var(--color-primary);
		color: var(--color-on-primary);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--space-1);
		width: fit-content;
	}

	.ax-overlay__meta {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		gap: var(--space-3);
		color: rgba(255, 255, 255, 0.9);
		font-family: var(--font-mono); /* Metadata Stack philosophy */
		font-size: var(--text-xs);
	}

	.ax-overlay__meta-item {
		display: flex;
		align-items: center;
	}

	.ax-overlay__meta-item:not(:last-child)::after {
		content: '|';
		margin-left: var(--space-3);
		opacity: 0.5;
		font-weight: 100;
	}

	/* Box Types (Structural Variations) */
	.ax-overlay--box-frame .ax-overlay__content {
		background: rgba(0, 0, 0, 0.85);
		padding: var(--space-6);
		border: var(--line-base) solid var(--color-outline-variant);
		backdrop-filter: blur(8px);
	}

	.ax-overlay--box-background .ax-overlay__title-link :global(.title-renderer__title) {
		background: rgba(0, 0, 0, 0.7);
		padding: 0.2em 0.5em;
		box-decoration-break: clone;
		-webkit-box-decoration-break: clone;
		text-shadow: none;
	}
</style>
