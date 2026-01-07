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
		href={href}
		class="button button--{variant} button--{size} {fullWidth ? 'button--full-width' : ''} {icon ? 'button--icon' : ''} {disabled ? 'button--disabled' : ''}"
		role="button"
		aria-disabled={disabled}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		type={type}
		class="button button--{variant} button--{size} {fullWidth ? 'button--full-width' : ''} {icon ? 'button--icon' : ''} {disabled ? 'button--disabled' : ''}"
		disabled={disabled}
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
		transition: all var(--duration-fast) ease-out;
		box-sizing: border-box;
	}
	
	.button:focus {
		outline: 2px solid var(--accent-primary);
		outline-offset: 2px;
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
		background: var(--accent-primary);
		color: white;
		border-color: var(--accent-primary);
	}
	
	.button--primary:hover:not(.button--disabled) {
		background: var(--accent-primary-hover);
		border-color: var(--accent-primary-hover);
		transform: translateY(-1px);
	}
	
	.button--secondary {
		background: var(--text-secondary);
		color: white;
		border-color: var(--text-secondary);
	}
	
	.button--secondary:hover:not(.button--disabled) {
		background: var(--text-primary);
		border-color: var(--text-primary);
	}
	
	.button--outline {
		background: transparent;
		color: var(--text-primary);
		border-color: var(--border-medium);
	}
	
	.button--outline:hover:not(.button--disabled) {
		border-color: var(--text-primary);
		background: var(--bg-cool);
	}
	
	.button--ghost {
		background: transparent;
		color: var(--text-primary);
		border-color: transparent;
	}
	
	.button--ghost:hover:not(.button--disabled) {
		background: var(--bg-cool);
		color: var(--accent-primary);
	}
	
	/* Disabled state */
	.button--disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none !important;
	}
</style>