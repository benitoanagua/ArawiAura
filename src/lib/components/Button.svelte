<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type $$Props = (HTMLButtonAttributes | HTMLAnchorAttributes) & {
		variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		fullWidth?: boolean;
		disabled?: boolean;
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		class?: string;
	};

	export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let fullWidth: boolean = false;
	export let disabled: boolean = false;
	export let href: string | undefined = undefined;
	export let type: 'button' | 'submit' | 'reset' = 'button';

	let klass = '';
	export { klass as class };

	// Variant classes
	$: variantClasses = {
		primary: 'btn--primary',
		secondary: 'btn--secondary',
		outline: 'btn--outline',
		ghost: 'btn--ghost'
	}[variant];

	// Size classes
	$: sizeClasses = {
		sm: 'btn--sm',
		md: '',
		lg: 'btn--lg'
	}[size];

	// Combined classes
	$: classes = ['btn', variantClasses, sizeClasses, fullWidth && 'w-full', klass]
		.filter(Boolean)
		.join(' ');
</script>

{#if href}
	<a
		{href}
		class={classes}
		role="button"
		tabindex={disabled ? -1 : 0}
		aria-disabled={disabled}
		{...$$restProps}
	>
		<slot />
	</a>
{:else}
	<button class={classes} {type} {disabled} {...$$restProps} on:click on:keydown>
		<slot />
	</button>
{/if}

<style>
	/* Button Editorial Base - Refinado y elegante */
	:global(.btn) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-4);
		border: 1px solid transparent;
		border-radius: var(--border-radius-base);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: 400;
		text-decoration: none;
		cursor: pointer;
		transition: all var(--duration-base) var(--ease-out);
		white-space: nowrap;
		letter-spacing: 0.5px;
	}

	/* Button Variants - Minimalista */
	:global(.btn--primary) {
		background: var(--accent-primary);
		color: white;
		border-color: var(--accent-primary);
	}

	:global(.btn--primary:hover:not(:disabled)) {
		background: var(--accent-primary);
		border-color: var(--accent-primary);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(26, 26, 26, 0.15);
	}

	:global(.btn--primary:active:not(:disabled)) {
		transform: translateY(0);
		box-shadow: none;
	}

	:global(.btn--secondary) {
		background: var(--text-secondary);
		color: white;
		border-color: var(--text-secondary);
	}

	:global(.btn--secondary:hover:not(:disabled)) {
		background: var(--text-primary);
		border-color: var(--text-primary);
		transform: translateY(-1px);
	}

	:global(.btn--outline) {
		background: transparent;
		color: var(--text-primary);
		border-color: var(--border-base);
	}

	:global(.btn--outline:hover:not(:disabled)) {
		background: var(--text-primary);
		color: white;
		border-color: var(--text-primary);
		transform: translateY(-1px);
	}

	:global(.btn--ghost) {
		background: transparent;
		color: var(--text-primary);
		border-color: transparent;
	}

	:global(.btn--ghost:hover:not(:disabled)) {
		background: var(--bg-cool);
		border-color: transparent;
		transform: translateY(-1px);
	}

	/* Button Sizes - Proporcionado */
	:global(.btn--sm) {
		padding: var(--space-2) var(--space-3);
		font-size: var(--text-xs);
		letter-spacing: 0.3px;
	}

	:global(.btn--lg) {
		padding: var(--space-4) var(--space-6);
		font-size: var(--text-md);
		letter-spacing: 0.6px;
	}

	/* Button States */
	:global(.btn:disabled) {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}

	:global(.btn:focus-visible) {
		outline: 1px solid var(--accent-primary);
		outline-offset: 2px;
	}

	/* Full Width */
	:global(.btn.w-full) {
		width: 100%;
	}
</style>
