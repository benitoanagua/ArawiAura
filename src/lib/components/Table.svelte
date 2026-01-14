<script lang="ts">
	import type { TableProps } from '$lib/types/Table.js';

	let {
		dense = false,
		striped = false,
		hoverable = true,
		children
	}: TableProps = $props();
</script>

<div class="ax-table-wrapper">
	<table class="ax-table {dense ? 'ax-table--dense' : ''} {striped ? 'ax-table--striped' : ''} {hoverable ? 'ax-table--hoverable' : ''}">
		{@render children?.()}
	</table>
</div>

<style>
	.ax-table-wrapper {
		background: var(--color-surface-container);
		border-radius: var(--space-3);
		border: var(--line-base) solid var(--color-outline);
		overflow: hidden;
		box-shadow: 
			0 2px 8px rgba(0, 0, 0, 0.05),
			inset 0 0 0 var(--line-thin) var(--color-surface);
	}

	.ax-table {
		width: 100%;
		border-collapse: collapse;
		background: var(--color-surface-container);
	}

	/* Variants */
	.ax-table--dense {
		font-size: var(--text-sm);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.ax-table-wrapper {
			overflow-x: auto;
		}

		.ax-table {
			min-width: 600px;
		}
	}
</style>