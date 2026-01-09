<script lang="ts">
	import { onMount } from 'svelte';
	import type { Theme, ThemeSwitcherProps } from '$lib/types/theme-switcher.js';
	import Icon from '@iconify/svelte';

	let {
		theme = $bindable('light'),
		showLabel = true,
		class: className,
		children
	}: ThemeSwitcherProps = $props();

	onMount(() => {
		// Initialize from localStorage or system preference
		const savedTheme = localStorage.getItem('ax-theme') as Theme | null;
		const systemTheme: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';

		theme = savedTheme || systemTheme;
		applyTheme(theme);

		// Listen for storage changes (sync across tabs/instances)
		const handleStorage = (e: StorageEvent) => {
			if (e.key === 'ax-theme' && e.newValue) {
				theme = e.newValue as Theme;
			}
		};

		// Listen for theme changes via custom event (sync within same page)
		const handleThemeChange = (e: CustomEvent<Theme>) => {
			theme = e.detail;
		};

		window.addEventListener('storage', handleStorage);
		window.addEventListener('ax-theme-change', handleThemeChange as EventListener);

		return () => {
			window.removeEventListener('storage', handleStorage);
			window.removeEventListener('ax-theme-change', handleThemeChange as EventListener);
		};
	});

	function applyTheme(newTheme: Theme) {
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('ax-theme', newTheme);
		// Dispatch custom event to sync other instances on same page
		window.dispatchEvent(new CustomEvent('ax-theme-change', { detail: newTheme }));
	}

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		applyTheme(theme);
	}

	const isDark = $derived(theme === 'dark');
</script>

<button
	class="ax-theme-switcher {className || ''}"
	onclick={toggleTheme}
	aria-label="Switch theme"
	title="Switch to {isDark ? 'light' : 'dark'} mode"
>
	<div class="ax-theme-switcher__icon">
		{#if isDark}
			<Icon icon="carbon:moon" width="18" height="18" />
		{:else}
			<Icon icon="carbon:sun" width="18" height="18" />
		{/if}
	</div>

	{#if showLabel}
		<span class="ax-theme-switcher__label">
			{isDark ? 'Night' : 'Day'}
		</span>
	{/if}

	{#if children}
		{@render children()}
	{/if}
</button>

<style>
	.ax-theme-switcher {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-2) var(--space-4);
		background: var(--color-surface);
		border: var(--line-thin) solid var(--color-outline-variant);
		border-radius: var(--space-1);
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: all var(--duration-fast) var(--ease-out);
		outline: none;
		/* Zero Displacement: Focus ring as inset shadow */
		box-shadow: inset 0 0 0 0 var(--color-primary);
	}

	.ax-theme-switcher:hover {
		background-color: var(--color-surface-container-low);
		border-color: var(--color-outline);
	}

	.ax-theme-switcher:focus-visible {
		box-shadow: inset 0 0 0 2px var(--color-primary);
	}

	.ax-theme-switcher:active {
		transform: scale(0.98);
	}

	.ax-theme-switcher__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-primary);
		transition: transform var(--duration-base) var(--ease-out);
	}

	.ax-theme-switcher:hover .ax-theme-switcher__icon {
		transform: rotate(15deg);
	}

	.ax-theme-switcher__label {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-on-surface-variant);
	}

	/* Micro-física: Responsive label */
	@media (max-width: 640px) {
		.ax-theme-switcher__label {
			display: none;
		}
		.ax-theme-switcher {
			padding: var(--space-2);
		}
	}
</style>
