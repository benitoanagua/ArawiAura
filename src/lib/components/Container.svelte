<script lang="ts">
	import type { ContainerProps } from '$lib/types/Container.js';

	let {
		size = 'base',
		spacing = 'normal',
		children,
		class: className
	}: ContainerProps = $props();
</script>

<div class="ax-container ax-container--{size} ax-container--spacing-{spacing} {className ?? ''}">
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.ax-container {
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		box-sizing: border-box;
	}

	/* Size variants - Following architectural outline proportions */
	.ax-container--base {
		max-width: var(--container-base);
	}

	.ax-container--narrow {
		max-width: var(--container-narrow);
	}

	.ax-container--wide {
		max-width: var(--container-wide);
	}

	.ax-container--full {
		max-width: 100%;
		padding-left: var(--space-4);
		padding-right: var(--space-4);
		border-left: var(--line-thin) solid var(--stroke-subtle);
		border-right: var(--line-thin) solid var(--stroke-subtle);
	}

	/* Spacing variants - Using architectural outline spacing system */
	.ax-container--spacing-tight {
		padding-top: var(--space-8);
		padding-bottom: var(--space-8);
	}

	.ax-container--spacing-normal {
		padding-top: var(--space-16);
		padding-bottom: var(--space-16);
	}

	.ax-container--spacing-loose {
		padding-top: var(--space-24);
		padding-bottom: var(--space-24);
	}

	.ax-container--spacing-none {
		padding-top: 0;
		padding-bottom: 0;
	}

	/* Architectural outline responsive behavior */
	@media (max-width: 1200px) {
		.ax-container--base,
		.ax-container--wide {
			padding-left: var(--space-6);
			padding-right: var(--space-6);
		}
	}

	@media (max-width: 768px) {
		.ax-container--full {
			padding-left: var(--space-3);
			padding-right: var(--space-3);
			border-left-width: 0;
			border-right-width: 0;
		}

		.ax-container--base,
		.ax-container--wide,
		.ax-container--narrow {
			padding-left: var(--space-4);
			padding-right: var(--space-4);
		}

		.ax-container--spacing-tight {
			padding-top: var(--space-6);
			padding-bottom: var(--space-6);
		}

		.ax-container--spacing-normal {
			padding-top: var(--space-12);
			padding-bottom: var(--space-12);
		}

		.ax-container--spacing-loose {
			padding-top: var(--space-16);
			padding-bottom: var(--space-16);
		}
	}

	@media (max-width: 480px) {
		.ax-container--base,
		.ax-container--wide,
		.ax-container--narrow,
		.ax-container--full {
			padding-left: var(--space-2);
			padding-right: var(--space-2);
		}

		.ax-container--spacing-tight {
			padding-top: var(--space-4);
			padding-bottom: var(--space-4);
		}

		.ax-container--spacing-normal {
			padding-top: var(--space-8);
			padding-bottom: var(--space-8);
		}

		.ax-container--spacing-loose {
			padding-top: var(--space-12);
			padding-bottom: var(--space-12);
		}
	}
</style>