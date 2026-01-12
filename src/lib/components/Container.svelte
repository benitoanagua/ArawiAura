<script lang="ts">
	import type { ContainerProps } from '$lib/types/container.js';

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
	}

	/* Size variants */
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
	}

	/* Spacing variants */
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

	@media (max-width: 768px) {
		.ax-container--full {
			padding-left: var(--space-2);
			padding-right: var(--space-2);
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
</style>