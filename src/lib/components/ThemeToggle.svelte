<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	let { dark = $bindable(false) } = $props<{ dark?: boolean }>();

	let theme = $state<'light' | 'dark'>('light');

	onMount(() => {
		const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
		const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
		document.documentElement.setAttribute('data-theme', theme);
		dark = theme === 'dark';
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		dark = theme === 'dark';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}
</script>

<button
	class="theme-toggle"
	aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
	onclick={toggleTheme}
>
	<div class="theme-icon">
		{#if theme === 'light'}
			<Icon icon="carbon:sun" width="1.25rem" />
		{:else}
			<Icon icon="carbon:moon" width="1.25rem" />
		{/if}
	</div>
	<span class="theme-label">{theme === 'light' ? 'Day' : 'Night'}</span>
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-2) var(--space-4);
		border: var(--line-thin) solid var(--color-outline);
		background: var(--color-surface);
		color: var(--color-on-surface);
		cursor: pointer;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		transition: all var(--duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
		outline: none;
	}

	.theme-toggle:hover {
		border-color: var(--color-primary);
		background: var(--color-surface-container-low);
		color: var(--color-primary);
	}

	.theme-toggle:focus-visible {
		box-shadow:
			0 0 0 2px var(--color-surface),
			0 0 0 4px var(--color-primary);
	}

	.theme-toggle:active {
		transform: scale(0.96);
	}

	.theme-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.theme-label {
		display: none;
	}

	@media (min-width: 768px) {
		.theme-label {
			display: inline;
		}
	}
</style>
