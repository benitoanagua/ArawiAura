<script lang="ts">
	import type { CardProps } from '$lib/types/Card.js';

	let {
		elevation = 2,
		density = 'normal',
		children
	}: CardProps = $props();
</script>

<div class="ax-card ax-card--elevation-{elevation} ax-card--{density}">
	<div class="ax-card__container">
		{@render children?.()}
	</div>
</div>

<style>
	.ax-card {
		/* Structural Honesty */
		background: var(--color-surface-container);
		border-radius: var(--space-3);
		transition: all var(--duration-base) cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
		
		/* Shared Border Grid */
		border: var(--line-thin) solid transparent;
	}

	/* Elevations - Linear Weight System */
	.ax-card--elevation-0 {
		background: transparent;
		border: none;
		box-shadow: none;
	}

	.ax-card--elevation-1 {
		border-color: var(--color-outline-variant);
	}

	.ax-card--elevation-2 {
		border-color: var(--color-outline);
		box-shadow: 
			0 2px 8px rgba(0, 0, 0, 0.05),
			inset 0 0 0 var(--line-thin) var(--color-surface);
	}

	.ax-card--elevation-3 {
		border-color: var(--color-primary);
		border-width: var(--line-base);
		box-shadow: 
			0 4px 16px rgba(0, 0, 0, 0.1),
			inset 0 0 0 var(--line-thin) var(--color-surface);
	}

	/* Hover States - Anti-Reflow */
	.ax-card--elevation-2:hover {
		border-color: var(--color-primary);
		transform: translateY(-1px);
		box-shadow: 
			0 4px 12px rgba(0, 0, 0, 0.08),
			inset 0 0 0 var(--line-thin) var(--color-surface);
	}

	.ax-card--elevation-3:hover {
		transform: translateY(-2px);
		box-shadow: 
			0 8px 24px rgba(0, 0, 0, 0.12),
			inset 0 0 0 var(--line-thin) var(--color-surface);
	}

	/* Density Variants - Dynamic Geometry */
	.ax-card--compact {
		--card-padding: var(--space-3);
	}

	.ax-card--normal {
		--card-padding: var(--space-5);
	}

	.ax-card--comfortable {
		--card-padding: var(--space-6);
	}

	.ax-card__container {
		padding: var(--card-padding);
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	/* Header */
	.ax-card__header {
		margin-bottom: var(--space-4);
		padding-bottom: var(--space-4);
		border-bottom: var(--line-thin) solid var(--color-outline-variant);
	}

	.ax-card__title {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-on-surface);
		margin: 0 0 var(--space-2);
		letter-spacing: -0.02em;
	}

	.ax-card__subtitle {
		font-family: var(--font-sans);
		font-size: var(--text-base);
		color: var(--color-on-surface-variant);
		margin: 0;
	}

	/* Content */
	.ax-card__content {
		flex: 1;
	}

	/* Footer */
	.ax-card__footer {
		margin-top: auto;
		padding-top: var(--space-4);
		border-top: var(--line-thin) solid var(--color-outline-variant);
	}

	/* Actions */
	.ax-card__actions {
		display: flex;
		gap: var(--space-2);
		flex-wrap: wrap;
		margin-top: var(--space-4);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.ax-card--normal {
			--card-padding: var(--space-4);
		}
		
		.ax-card--comfortable {
			--card-padding: var(--space-5);
		}
		
		.ax-card__title {
			font-size: var(--text-lg);
		}
	}
</style>