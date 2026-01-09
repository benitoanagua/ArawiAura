<script lang="ts">
	import type { ButtonVariant, ButtonSize, ButtonType, ButtonProps } from '$lib/types/button.js';

	// Use Svelte 5 $props() syntax
	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		href = '',
		type = 'button',
		fullWidth = false,
		icon = false,
		children
	}: ButtonProps & { children?: any } = $props();

	// Event handlers
	let _onclick: (e: Event) => void = () => {};

	function clickHandler(e: Event) {
		if (!disabled && _onclick) {
			_onclick(e);
		}
	}
</script>

{#if href}
	<a
		{href}
		class="button button--{variant} button--{size} {fullWidth ? 'button--full-width' : ''} {icon
			? 'button--icon'
			: ''} {disabled ? 'button--disabled' : ''}"
		role="button"
		aria-disabled={disabled}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		{type}
		class="button button--{variant} button--{size} {fullWidth ? 'button--full-width' : ''} {icon
			? 'button--icon'
			: ''} {disabled ? 'button--disabled' : ''}"
		{disabled}
		onclick={clickHandler}
	>
		{@render children?.()}
	</button>
{/if}

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		border: var(--line-thin) solid transparent;
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
	.button:focus-visible {
		box-shadow:
			0 0 0 2px var(--color-surface),
			0 0 0 4px var(--color-primary);
		z-index: 10;
	}

	/* Micro-física: Industrial Switch */
	.button:active:not(.button--disabled) {
		transform: scale(0.98);
	}

	/* Size variants */
	.button--sm {
		padding: var(--space-1) var(--space-3);
		font-size: var(--text-sm);
	}

	.button--md {
		padding: var(--space-2) var(--space-4);
		font-size: var(--text-base);
	}

	.button--lg {
		padding: var(--space-3) var(--space-6);
		font-size: var(--text-lg);
	}

	/* Full width */
	.button--full-width {
		width: 100%;
	}

	/* Icon only */
	.button--icon {
		padding: var(--space-2);
	}

	/* Variant styles */
	.button--primary {
		background: var(--color-primary);
		color: var(--color-on-primary);
		border: var(--line-base) solid var(--color-primary);
	}

	.button--primary:hover:not(.button--disabled) {
		background: var(--color-primary-container);
		color: var(--color-on-primary-container);
		border-color: var(--color-primary-container);
	}

	.button--secondary {
		background: var(--color-secondary);
		color: var(--color-on-secondary);
		border: var(--line-thin) solid var(--color-secondary);
	}

	.button--secondary:hover:not(.button--disabled) {
		background: var(--color-secondary-container);
		color: var(--color-on-secondary-container);
		border-color: var(--color-secondary-container);
	}

	.button--outline {
		background: transparent;
		color: var(--color-on-surface);
		border: var(--line-thin) solid var(--color-outline);
	}

	.button--outline:hover:not(.button--disabled) {
		border: var(--line-base) solid var(--color-primary);
		color: var(--color-primary);
		background: var(--color-surface-container-low);
	}

	.button--ghost {
		background: transparent;
		color: var(--color-on-surface);
		border: var(--line-thin) solid transparent;
	}

	.button--ghost:hover:not(.button--disabled) {
		background: var(--color-surface-container-low);
		border-color: var(--color-outline-variant);
	}

	/* Disabled state */
	.button--disabled {
		opacity: 0.5;
		cursor: not-allowed;
		filter: grayscale(1);
	}
</style>
