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
		/* Ring-based Architecture: Use box-shadow for all borders */
		border: none;
		border-radius: var(--space-1);
		font-family: var(--font-sans);
		font-weight: 500;
		text-decoration: none;
		cursor: pointer;
		transition: all var(--duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
		box-sizing: border-box;
		position: relative;
		outline: none;
		--ring-color-default: transparent;
		box-shadow: 0 0 0 var(--line-thin) var(--ring-color-default);
	}

	.ax-pressable:focus-visible {
		box-shadow:
			0 0 0 var(--ring-offset) var(--color-surface),
			0 0 0 calc(var(--ring-offset) + var(--ring-width)) var(--ring-color),
			0 0 0 var(--line-thin) var(--ring-color-default);
		z-index: 10;
	}

	.ax-pressable:active:not(.ax-pressable--disabled) {
		transform: scale(0.98);
	}

	/* Size variants - Consistent padding accounting for ring thickness */
	.ax-pressable--sm {
		padding: var(--space-1) var(--space-3);
		font-size: var(--text-sm);
	}

	.ax-pressable--md {
		padding: var(--space-2) var(--space-4);
		font-size: var(--text-base);
	}

	.ax-pressable--lg {
		padding: var(--space-3) var(--space-6);
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

	/* Variant styles using ring system */
	.ax-pressable--primary {
		background: var(--color-primary);
		color: var(--color-on-primary);
		--ring-color-default: var(--color-primary);
	}

	.ax-pressable--primary:hover:not(.ax-pressable--disabled) {
		background: var(--color-primary-container);
		color: var(--color-on-primary-container);
		--ring-color-default: var(--color-primary-container);
	}

	.ax-pressable--secondary {
		background: var(--color-secondary);
		color: var(--color-on-secondary);
		--ring-color-default: var(--color-secondary);
	}

	.ax-pressable--secondary:hover:not(.ax-pressable--disabled) {
		background: var(--color-secondary-container);
		color: var(--color-on-secondary-container);
		--ring-color-default: var(--color-secondary-container);
	}

	.ax-pressable--outline {
		background: transparent;
		color: var(--color-on-surface);
		--ring-color-default: var(--color-outline);
	}

	.ax-pressable--outline:hover:not(.ax-pressable--disabled) {
		--ring-color-default: var(--color-primary);
		color: var(--color-primary);
		background: var(--color-surface-container-low);
	}

	.ax-pressable--ghost {
		background: transparent;
		color: var(--color-on-surface);
		--ring-color-default: transparent;
	}

	.ax-pressable--ghost:hover:not(.ax-pressable--disabled) {
		background: var(--color-surface-container-low);
		--ring-color-default: var(--color-outline-variant);
	}

	.ax-pressable--link {
		background: transparent;
		color: var(--color-primary);
		border-radius: 0;
		padding: 0 var(--space-1);
		min-height: auto;
		height: auto;
		line-height: inherit;
		/* Link variant with bottom ring */
		--ring-color-default: transparent;
		box-shadow: 0 var(--line-thin) 0 0 var(--ring-color-default);
	}

	.ax-pressable--link:hover:not(.ax-pressable--disabled) {
		--ring-color-default: var(--color-primary);
		background: transparent;
	}

	/* Disabled state */
	.ax-pressable--disabled {
		opacity: 0.5;
		cursor: not-allowed;
		filter: grayscale(1);
	}
</style>