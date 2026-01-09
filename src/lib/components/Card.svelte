<script lang="ts">
	import type { CardProps } from '$lib/types/card.js';
	import { renderTitleHtml } from '$lib/utils/title-renderer.js';

	let {
		title,
		url,
		excerpt = '',
		featureImage = '',
		tagName = '',
		tagUrl = '',
		authorName = '',
		authorUrl = '',
		authorProfileImage = '',
		mediaAlign = 'top',
		mediaWidth = 'is-half',
		headingLevel = 4,
		density = 'normal',
		aspectRatio = 'monitor',
		elevation = 2,
		readingTime = '',
		publishedAt = '',
		children
	}: CardProps = $props();

	// Formateador de fecha reactivo
	const formattedDate = $derived(
		publishedAt
			? new Date(publishedAt).toLocaleDateString('es-ES', {
					year: 'numeric',
					month: 'short',
					day: 'numeric'
				})
			: ''
	);

	// Determinar si es horizontal
	const isHorizontal = $derived(mediaAlign === 'left' || mediaAlign === 'right');
</script>

<div
	class="ax-card ax-card--elevation-{elevation} ax-card--{density} ax-card--align-{mediaAlign} {isHorizontal
		? `ax-card--width-${mediaWidth}`
		: ''}"
>
	<div class="ax-card__container">
		{#if featureImage}
			<figure class="ax-card__media ax-card__media--{aspectRatio}">
				<a href={url} tabindex="-1">
					<img src={featureImage} alt={title} loading="lazy" />
				</a>
			</figure>
		{/if}

		<div class="ax-card__body">
			{#if authorName || authorProfileImage}
				<header class="ax-card__header">
					{#if authorProfileImage}
						<img src={authorProfileImage} alt={authorName} class="ax-card__author-avatar" />
					{:else}
						<span class="ax-card__author-dot"></span>
					{/if}
					{#if authorName}
						<a href={authorUrl} class="ax-card__author-name">{authorName}</a>
					{/if}
				</header>
			{/if}

			<div class="ax-card__content">
				<a href={url} class="ax-card__title-link">
					<div class="ax-card__title">
						{@html renderTitleHtml(title, headingLevel)}
					</div>
				</a>

				{#if excerpt && density === 'normal'}
					<p class="ax-card__excerpt">{excerpt}</p>
				{/if}

				{#if children}
					<div class="ax-card__custom-content">
						{@render children()}
					</div>
				{/if}
			</div>

			{#if (tagName || readingTime || formattedDate) && density !== 'minimal'}
				<footer class="ax-card__footer">
					<div class="ax-card__meta">
						{#if formattedDate}
							<time datetime={publishedAt} class="ax-card__meta-item">{formattedDate}</time>
						{/if}
						{#if readingTime}
							<span class="ax-card__meta-item">{readingTime}</span>
						{/if}
					</div>
					{#if tagName}
						<a href={tagUrl} class="ax-card__tag">{tagName}</a>
					{/if}
				</footer>
			{/if}
		</div>
	</div>
</div>

<style>
	.ax-card {
		--card-border-color: var(--color-outline-variant);
		--card-border-width: var(--line-thin);
		--card-radius: var(--space-2);
		--card-bg: var(--color-surface);

		display: block;
		background: var(--card-bg);
		border-radius: var(--card-radius);
		transition: all var(--duration-base) cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;

		/* Zero Displacement: Reserve space for border */
		border: var(--line-base) solid transparent;
	}

	/* Elevations */
	.ax-card--elevation-0 {
		border: none;
		background: transparent;
	}
	.ax-card--elevation-1 {
		border-color: var(--color-outline-variant);
	}
	.ax-card--elevation-2 {
		border-color: var(--color-outline);
	}
	.ax-card--elevation-3 {
		border-color: var(--color-primary);
		border-width: var(--line-base);
	}

	.ax-card--elevation-2:hover {
		border-color: var(--color-primary);
		box-shadow: inset 0 0 0 1px var(--color-primary);
	}

	.ax-card__container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	/* Layout Alignments */
	.ax-card--align-left .ax-card__container {
		flex-direction: row;
	}
	.ax-card--align-right .ax-card__container {
		flex-direction: row-reverse;
	}
	.ax-card--align-bottom .ax-card__container {
		flex-direction: column-reverse;
	}

	/* Horizontal Widths (applied when left/right) */
	.ax-card--align-left.ax-card--width-is-one-fifth .ax-card__media,
	.ax-card--align-right.ax-card--width-is-one-fifth .ax-card__media {
		width: 20%;
	}
	.ax-card--align-left.ax-card--width-is-one-quarter .ax-card__media,
	.ax-card--align-right.ax-card--width-is-one-quarter .ax-card__media {
		width: 25%;
	}
	.ax-card--align-left.ax-card--width-is-one-third .ax-card__media,
	.ax-card--align-right.ax-card--width-is-one-third .ax-card__media {
		width: 33.33%;
	}
	.ax-card--align-left.ax-card--width-is-half .ax-card__media,
	.ax-card--align-right.ax-card--width-is-half .ax-card__media {
		width: 50%;
	}

	/* Media Area */
	.ax-card__media {
		margin: 0;
		overflow: hidden;
		flex-shrink: 0;
		background: var(--color-surface-container);
		position: relative;
	}

	.ax-card__media img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform var(--duration-slow) var(--ease-out);
	}

	.ax-card:hover .ax-card__media img {
		transform: scale(1.05);
	}

	/* Aspect Ratios */
	.ax-card__media--square {
		aspect-ratio: 1/1;
	}
	.ax-card__media--video {
		aspect-ratio: 16/9;
	}
	.ax-card__media--monitor {
		aspect-ratio: 4/3;
	}

	/* Body Content Area */
	.ax-card__body {
		padding: var(--space-4);
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: var(--space-4);
		min-width: 0;
	}

	/* Dense variants */
	.ax-card--compact .ax-card__body {
		padding: var(--space-3);
		gap: var(--space-3);
	}
	.ax-card--minimal .ax-card__body {
		padding: var(--space-2);
		gap: var(--space-2);
	}

	/* Author Header */
	.ax-card__header {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding-bottom: var(--space-2);
		border-bottom: var(--line-thin) solid var(--color-outline-variant);
	}

	.ax-card__author-avatar {
		width: 24px;
		height: 24px;
		border-radius: var(--space-1);
		object-fit: cover;
		border: var(--line-thin) solid var(--color-outline);
	}

	.ax-card__author-dot {
		width: 6px;
		height: 6px;
		background: var(--color-primary);
		border-radius: 50%;
	}

	.ax-card__author-name {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--color-on-surface-variant);
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.ax-card__author-name:hover {
		color: var(--color-primary);
	}

	/* Title & Link */
	.ax-card__title-link {
		text-decoration: none;
		color: var(--color-on-surface);
	}

	.ax-card__title :global(.title-renderer__title) {
		margin: 0;
		font-family: var(--font-sans);
		font-weight: 700;
		line-height: var(--leading-tight);
		transition: color var(--duration-fast);
	}

	.ax-card__title-link:hover .ax-card__title :global(.title-renderer__title) {
		color: var(--color-primary);
	}

	/* Excerpt */
	.ax-card__excerpt {
		margin: 0;
		font-family: var(--font-serif);
		font-size: var(--text-base);
		color: var(--color-on-surface-variant);
		line-height: var(--leading-relaxed);
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		line-clamp: 3;
		overflow: hidden;
	}

	/* Footer Meta */
	.ax-card__footer {
		margin-top: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: var(--space-2);
		border-top: var(--line-thin) solid var(--color-outline-variant);
	}

	.ax-card__meta {
		display: flex;
		gap: var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-on-surface-variant);
		text-transform: uppercase;
	}

	.ax-card__tag {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 700;
		color: var(--color-primary);
		text-decoration: none;
		border: var(--line-thin) solid var(--color-primary);
		padding: 0 var(--space-1);
		transition: all var(--duration-fast);
	}

	.ax-card__tag:hover {
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.ax-card__container {
			flex-direction: column !important;
		}
		.ax-card__media {
			width: 100% !important;
		}
	}
</style>
