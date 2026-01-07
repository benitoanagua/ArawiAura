<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	
	let { children, data } = $props();
	
	// Subscribe to page changes to get current path
	let currentPath = $page.url.pathname;
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
</svelte:head>

<Header siteTitle="Arawi Aura" {currentPath} />

<main class="main-content">
	{@render children()}
</main>
