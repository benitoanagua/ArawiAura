<script lang="ts">
	import TopBar from '$lib/components/TopBar.svelte';
	import BottomBar from '$lib/components/BottomBar.svelte';
	import ToastManager from '$lib/components/ToastManager.svelte';
	import { page } from '$app/state';

	let { children, data }: any = $props();
	let currentPath = $derived(page.url.pathname);
	let isAdminRoute = $derived(currentPath.startsWith('/admin'));
</script>

<div class="app">
	{#if !isAdminRoute}
		<TopBar siteTitle="Arawi Aura" showLogo={true} showNav={true} sticky={true} {currentPath} />
	{/if}

	<main class="main-content">
		{@render children()}
	</main>

	{#if !isAdminRoute}
		<BottomBar copyright="© 2026 Benito Anagua" user={data?.user} />
	{/if}

	<ToastManager />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.main-content {
		flex: 1;
		padding-bottom: 64px; /* Space for fixed bottom nav */
	}
</style>
