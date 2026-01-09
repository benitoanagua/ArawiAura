<script lang="ts">
	import type { PressableProps } from '$lib/types/pressable.js';

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		href = '',
		type = 'button',
		fullWidth = false,
		icon = false,
		onclick,
		class: className,
		children
	}: PressableProps = $props();
</script>

{#if href}
	<a
		{href}
		class="ax-pressable ax-pressable--{variant} ax-pressable--{size} {fullWidth
			? 'ax-pressable--full-width'
			: ''} {icon ? 'ax-pressable--icon' : ''} {disabled ? 'ax-pressable--disabled' : ''} {className ||
			''}"
		role="button"
		aria-disabled={disabled}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		{type}
		class="ax-pressable ax-pressable--{variant} ax-pressable--{size} {fullWidth
			? 'ax-pressable--full-width'
			: ''} {icon ? 'ax-pressable--icon' : ''} {disabled ? 'ax-pressable--disabled' : ''} {className ||
			''}"
		{disabled}
		{onclick}
	>
		{@render children?.()}
	</button>
{/if}

<style>
	.ax-pressable {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		/* Zero Displacement: Reserve space for maximum border thickness */
		border: var(--line-base) solid transparent;
		border-radius: var(--space-1);
		font-family: var(--font-sans);
		font-weight: 500;
		text-decoration: none;
		cursor: pointer;
		transition: all var(--duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
		box-sizing: border-box;
		position: relative;
		outline: none;
	}

	/* Architectural Outline: Focus Ring */
	.ax-pressable:focus-visible {
		box-shadow:
			0 0 0 2px var(--color-surface),
			0 0 0 4px var(--color-primary);
		z-index: 10;
	}

	/* Micro-física: Industrial Switch */
	.ax-pressable:active:not(.ax-pressable--disabled) {
		transform: scale(0.98);
	}

	/* Size variants */
	.ax-pressable--sm {
		padding: calc(var(--space-1) - 1px) var(--space-3);
		font-size: var(--text-sm);
	}

	.ax-pressable--md {
		padding: calc(var(--space-2) - 1px) var(--space-4);
		font-size: var(--text-base);
	}

	.ax-pressable--lg {
		padding: calc(var(--space-3) - 1px) var(--space-6);
		font-size: var(--text-lg);
	}

	/* Full width */
	.ax-pressable--full-width {
		width: 100%;
	}

	/* Icon only */
	.ax-pressable--icon {
		padding: var(--space-2);
	}

	/* Variant styles */
	.ax-pressable--primary {
		background: var(--color-primary);
		color: var(--color-on-primary);
		border-color: var(--color-primary);
	}

	.ax-pressable--primary:hover:not(.ax-pressable--disabled) {
		background: var(--color-primary-container);
		color: var(--color-on-primary-container);
		border-color: var(--color-primary-container);
	}

	.ax-pressable--secondary {
		background: var(--color-secondary);
		color: var(--color-on-secondary);
		border-color: var(--color-secondary);
	}

	.ax-pressable--secondary:hover:not(.ax-pressable--disabled) {
		background: var(--color-secondary-container);
		color: var(--color-on-secondary-container);
		border-color: var(--color-secondary-container);
	}

	.ax-pressable--outline {
		background: transparent;
		color: var(--color-on-surface);
		/* Use box-shadow inset for the "thin" line while border remains base weight */
		box-shadow: inset 0 0 0 var(--line-thin) var(--color-outline);
		border-color: transparent;
	}

	.ax-pressable--outline:hover:not(.ax-pressable--disabled) {
		box-shadow: inset 0 0 0 var(--line-base) var(--color-primary);
		color: var(--color-primary);
		background: var(--color-surface-container-low);
	}

	.ax-pressable--ghost {
		background: transparent;
		color: var(--color-on-surface);
		border-color: transparent;
	}

	.ax-pressable--ghost:hover:not(.ax-pressable--disabled) {
		background: var(--color-surface-container-low);
		box-shadow: inset 0 0 0 var(--line-thin) var(--color-outline-variant);
	}

	.ax-pressable--link {
		background: transparent;
		color: var(--color-primary);
		border: none;
		border-radius: 0;
		padding: 0 var(--space-1);
		min-height: auto;
		height: auto;
		line-height: inherit;
		border-bottom: var(--line-thin) solid transparent;
	}

	.ax-pressable--link:hover:not(.ax-pressable--disabled) {
		border-bottom-color: var(--color-primary);
		background: transparent;
	}

	/* Disabled state */
	.ax-pressable--disabled {
		opacity: 0.5;
		cursor: not-allowed;
		filter: grayscale(1);
	}
</style>