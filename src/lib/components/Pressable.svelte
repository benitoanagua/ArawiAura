<script lang="ts">
	import type {
		PressableVariant,
		PressableSize,
		PressableType,
		PressableProps
	} from '$lib/types/pressable.js';

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
	}: PressableProps & { children?: any } = $props();

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
		class="pressable pressable--{variant} pressable--{size} {fullWidth
			? 'pressable--full-width'
			: ''} {icon ? 'pressable--icon' : ''} {disabled ? 'pressable--disabled' : ''}"
		role="button"
		aria-disabled={disabled}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		{type}
		class="pressable pressable--{variant} pressable--{size} {fullWidth
			? 'pressable--full-width'
			: ''} {icon ? 'pressable--icon' : ''} {disabled ? 'pressable--disabled' : ''}"
		{disabled}
		onclick={clickHandler}
	>
		{@render children?.()}
	</button>
{/if}

<style>
	.pressable {
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
	.pressable:focus-visible {
		box-shadow:
			0 0 0 2px var(--color-surface),
			0 0 0 4px var(--color-primary);
		z-index: 10;
	}

	/* Micro-física: Industrial Switch */
	.pressable:active:not(.pressable--disabled) {
		transform: scale(0.98);
	}

	/* Size variants */
	.pressable--sm {
		padding: calc(var(--space-1) - 1px) var(--space-3);
		font-size: var(--text-sm);
	}

	.pressable--md {
		padding: calc(var(--space-2) - 1px) var(--space-4);
		font-size: var(--text-base);
	}

	.pressable--lg {
		padding: calc(var(--space-3) - 1px) var(--space-6);
		font-size: var(--text-lg);
	}

	/* Full width */
	.pressable--full-width {
		width: 100%;
	}

	/* Icon only */
	.pressable--icon {
		padding: var(--space-2);
	}

	/* Variant styles */
	.pressable--primary {
		background: var(--color-primary);
		color: var(--color-on-primary);
		border-color: var(--color-primary);
	}

	.pressable--primary:hover:not(.pressable--disabled) {
		background: var(--color-primary-container);
		color: var(--color-on-primary-container);
		border-color: var(--color-primary-container);
	}

	.pressable--secondary {
		background: var(--color-secondary);
		color: var(--color-on-secondary);
		border-color: var(--color-secondary);
	}

	.pressable--secondary:hover:not(.pressable--disabled) {
		background: var(--color-secondary-container);
		color: var(--color-on-secondary-container);
		border-color: var(--color-secondary-container);
	}

	.pressable--outline {
		background: transparent;
		color: var(--color-on-surface);
		/* Use box-shadow inset for the "thin" line while border remains base weight */
		box-shadow: inset 0 0 0 var(--line-thin) var(--color-outline);
		border-color: transparent;
	}

	.pressable--outline:hover:not(.pressable--disabled) {
		box-shadow: inset 0 0 0 var(--line-base) var(--color-primary);
		color: var(--color-primary);
		background: var(--color-surface-container-low);
	}

	.pressable--ghost {
		background: transparent;
		color: var(--color-on-surface);
		border-color: transparent;
	}

	.pressable--ghost:hover:not(.pressable--disabled) {
		background: var(--color-surface-container-low);
		box-shadow: inset 0 0 0 var(--line-thin) var(--color-outline-variant);
	}

	.pressable--link {
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

	.pressable--link:hover:not(.pressable--disabled) {
		border-bottom-color: var(--color-primary);
		background: transparent;
	}

	/* Disabled state */
	.pressable--disabled {
		opacity: 0.5;
		cursor: not-allowed;
		filter: grayscale(1);
	}
</style>
