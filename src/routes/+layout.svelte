<script lang="ts">
	import PageMeta from '$lib/components/PageMeta.svelte';
	import ToastManager from '$lib/components/ToastManager.svelte';
	import { page } from '$app/stores';

	let { children, data }: any = $props();
	let currentPath = $derived($page.url.pathname);
</script>

<div class="app">
	<PageMeta 
		copyright="© 2026 Benito Anagua"
		user={data?.user}
		{currentPath}
	/>

	<main class="main-content">
		{@render children()}
	</main>
	
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
	}
</style>
