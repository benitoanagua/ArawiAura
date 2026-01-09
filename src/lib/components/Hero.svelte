<script lang="ts">
	import type { HeroProps } from '$lib/types/hero.js';

	let { title = '', subtitle = '', children, class: className }: HeroProps = $props();
</script>

<section class="ax-hero {className || ''}">
	<div class="ax-hero__container">
		{#if title}
			<h1 class="ax-hero__title">{title}</h1>
		{/if}

		{#if subtitle}
			<p class="ax-hero__subtitle">{subtitle}</p>
		{/if}

		{#if children}
			<div class="ax-hero__actions">
				{@render children()}
			</div>
		{/if}
	</div>
</section>

<style>
	.ax-hero {
		padding: var(--space-20) 0;
		background-color: var(--color-surface);
		/* Minimalist: No borders, pure typography focus */
	}

	.ax-hero__container {
		max-width: var(--container-base);
		margin: 0 auto;
		padding: 0 var(--space-8);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-6);
	}

	.ax-hero__title {
		font-family: var(--font-sans);
		font-size: var(--text-6xl); /* Larger, bolder */
		font-weight: 800;
		line-height: 1.1;
		color: var(--color-on-surface);
		margin: 0;
		letter-spacing: -0.04em;
		max-width: 15ch;
	}

	.ax-hero__subtitle {
		font-family: var(--font-serif); /* Serif for contrast */
		font-size: var(--text-xl);
		line-height: var(--leading-relaxed);
		color: var(--color-on-surface-variant);
		margin: 0;
		max-width: 45ch;
		opacity: 0.8;
	}

	.ax-hero__actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		margin-top: var(--space-4);
	}

	@media (max-width: 768px) {
		.ax-hero {
			padding: var(--space-12) 0;
		}

		.ax-hero__title {
			font-size: var(--text-4xl);
		}
	}
</style>
