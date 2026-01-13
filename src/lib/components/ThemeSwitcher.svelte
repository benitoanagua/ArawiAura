<script lang="ts">
	import { onMount } from 'svelte';
	import type { Theme, ThemeSwitcherProps } from '$lib/types/theme-switcher.js';
	import Icon from '@iconify/svelte';

	let systemTheme: 'light' | 'dark' = 'light';

	let {
		theme = $bindable('auto'),
		showLabel = false,
		class: className,
		children
	}: ThemeSwitcherProps = $props();

	onMount(() => {
		// Initialize from localStorage or system preference
		const savedTheme = localStorage.getItem('ax-theme') as Theme | null;
		systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

		theme = savedTheme || 'auto';
		const resolvedTheme = theme === 'auto' ? systemTheme : theme;
		document.documentElement.setAttribute('data-theme', resolvedTheme);

		// Listen for storage changes (sync across tabs/instances)
		const handleStorage = (e: StorageEvent) => {
			if (e.key === 'ax-theme' && e.newValue) {
				theme = e.newValue as Theme;
				const newResolved = theme === 'auto' ? systemTheme : theme;
				document.documentElement.setAttribute('data-theme', newResolved);
			}
		};

		window.addEventListener('storage', handleStorage);

		return () => {
			window.removeEventListener('storage', handleStorage);
		};
	});

	function applyTheme(newTheme: Theme, sysTheme: 'light' | 'dark') {
		const resolvedTheme = newTheme === 'auto' ? sysTheme : newTheme;
		document.documentElement.setAttribute('data-theme', resolvedTheme);
		localStorage.setItem('ax-theme', newTheme);
	}

	function getResolvedTheme(): 'light' | 'dark' {
		if (theme === 'auto') {
			return systemTheme;
		}
		return theme;
	}

	function toggleTheme() {
		// Cycle through: auto → light → dark → auto
		if (theme === 'auto') {
			theme = 'light';
		} else if (theme === 'light') {
			theme = 'dark';
		} else {
			theme = 'auto';
		}
		applyTheme(theme, systemTheme);
	}

	const isDark = $derived(getResolvedTheme() === 'dark');
	const isAuto = $derived(theme === 'auto');
	const themeLabel = $derived(
		theme === 'auto' ? `Auto (${systemTheme})` : theme === 'dark' ? 'Night' : 'Day'
	);
</script>

<button
	class="ax-theme-switcher {className || ''}"
	onclick={toggleTheme}
	aria-label="Switch theme mode"
	title="Current: {theme} mode. Click to cycle through auto, light, and dark modes."
>
	<div class="ax-theme-switcher__icon">
		{#if isAuto}
			<Icon icon="carbon:settings" width="18" height="18" />
		{:else if isDark}
			<Icon icon="carbon:moon" width="18" height="18" />
		{:else}
			<Icon icon="carbon:sun" width="18" height="18" />
		{/if}
	</div>

	{#if showLabel}
		<span class="ax-theme-switcher__label">
			{themeLabel}
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
