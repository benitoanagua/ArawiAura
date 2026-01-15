<script lang="ts">
	import type { CardProps } from '$lib/types/Card.js';

	let {
		elevation = 2,
		density = 'normal',
		top,
		body,
		footer,
		children,
		class: className
	}: CardProps = $props();

	// Determinar si es interactivo (tiene slots)
	const isInteractive = $derived(Boolean(top || body || footer || children));
</script>

<div
	class="ax-card ax-card--elevation-{elevation} ax-card--{density} {isInteractive
		? 'ax-card--interactive'
		: ''} {className || ''}"
	role={isInteractive ? 'button' : undefined}
>
	<div class="ax-card__container">
		<!-- Top Slot -->
		{#if top}
			<header class="ax-card__top-slot">
				{@render top()}
			</header>
		{/if}

		<!-- Body Slot -->
		{#if body}
			<div class="ax-card__body-slot">
				{@render body()}
			</div>
		{:else if children}
			<div class="ax-card__body-slot">
				{@render children()}
			</div>
		{/if}

		<!-- Footer Slot -->
		{#if footer}
			<footer class="ax-card__footer-slot">
				{@render footer()}
			</footer>
		{/if}
	</div>
</div>

<style>
	.ax-card {
		/* Architectural Honesty: Blueprint-Core Foundation */
		background: var(--color-surface-container);
		border-radius: clamp(4px, 1vw, 12px);
		transition:
			box-shadow 200ms var(--ease-out),
			border-color 200ms var(--ease-out);
		position: relative;
		overflow: hidden;

		/* Zero Displacement: Reserve space for border */
		border: var(--line-base) solid transparent;
	}

	/* Linear Elevation System - Weight as Hierarchy */
	.ax-card--elevation-0 {
		/* E-0 (Base): Total Integration */
		background: transparent;
		border: none;
		padding: 0;
	}

	.ax-card--elevation-1 {
		/* E-1 (Surface): Subtle Delimitation */
		border-color: var(--color-outline-variant);
		border-width: var(--line-thin);
	}

	.ax-card--elevation-2 {
		/* E-2 (Focus): Primary Interaction Object */
		border-color: var(--color-outline);
		border-width: var(--line-thin);
	}

	.ax-card--elevation-3 {
		/* E-3 (High): Maximum Visual Authority */
		border-color: var(--color-primary);
		border-width: var(--line-base);
	}

	/* Dynamic Density - Contextual Geometry */
	.ax-card--compact {
		--card-padding: clamp(12px, 2vw, 16px);
	}

	.ax-card--normal {
		--card-padding: clamp(16px, 3vw, 24px);
	}

	.ax-card--comfortable {
		--card-padding: clamp(20px, 4vw, 32px);
	}

	.ax-card__container {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	/* Slot Styles - Non-Conventional Architecture */
	.ax-card__top-slot {
		padding: var(--card-padding);
		border-bottom: var(--line-thin) solid var(--color-outline-variant);
		flex-shrink: 0;
	}

	.ax-card__body-slot {
		padding: var(--card-padding);
		flex: 1;
		font-family: var(--font-sans);
		line-height: 1.6;
		color: var(--color-on-surface);
		display: flex;
		flex-direction: column;
	}

	.ax-card__footer-slot {
		padding: var(--card-padding);
		border-top: var(--line-thin) solid var(--color-outline-variant);
		margin-top: auto;
		display: flex;
		gap: var(--space-2);
		flex-wrap: wrap;
		flex-shrink: 0;
	}

	/* Responsive Geometry */
	@media (max-width: 768px) {
		.ax-card--compact {
			--card-padding: var(--space-3);
		}

		.ax-card--comfortable {
			--card-padding: var(--space-4);
		}

		.ax-card__top-slot,
		.ax-card__body-slot,
		.ax-card__footer-slot {
			padding: var(--space-3);
		}
	}
</style>
