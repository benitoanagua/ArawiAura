<script lang="ts">
	import { onMount } from 'svelte';
	import type { Theme, ThemeToggleProps } from '$lib/types/theme-toggle.js';
	
	export let dark: boolean = false;
	
	let theme: Theme = 'light';
	
	onMount(() => {
		// Check for saved theme preference or respect system preference
		const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
		const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		
		theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
		document.documentElement.setAttribute('data-theme', theme);
		
		// Update dark prop based on current theme
		dark = theme === 'dark';
	});
	
	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		dark = theme === 'dark';
		
		// Update document attribute
		document.documentElement.setAttribute('data-theme', theme);
		
		// Save preference to localStorage
		localStorage.setItem('theme', theme);
		
		// Dispatch theme change event
		dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
	}
</script>

<button 
	class="theme-toggle" 
	aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
	on:click={toggleTheme}
>
	{#if theme === 'light'}
		<span class="theme-icon">☀️</span>
		<span class="theme-label">Light</span>
	{:else}
		<span class="theme-icon">🌙</span>
		<span class="theme-label">Dark</span>
	{/if}
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		border: var(--line-thin) solid var(--border-light);
		border-radius: var(--space-4);
		background: var(--bg-white);
		color: var(--text-primary);
		cursor: pointer;
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		transition: all var(--duration-fast) ease-out;
	}
	
	.theme-toggle:hover {
		border-color: var(--accent-primary);
		background: var(--bg-cool);
	}
	
	.theme-icon {
		font-size: var(--text-base);
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