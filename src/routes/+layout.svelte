<script lang="ts">
	import TopBar from '$lib/components/TopBar.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import ToastManager from '$lib/components/ToastManager.svelte';
	import { page } from '$app/state';

	let { children, data }: any = $props();
	let currentPath = $derived(page.url.pathname);
</script>

<div class="app">
	<TopBar siteTitle="Arawi Aura" showLogo={true} showNav={true} sticky={true} {currentPath} />

	<main class="main-content">
		{@render children()}
	</main>

	<PageMeta copyright="© 2026 Benito Anagua" user={data?.user} />

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
