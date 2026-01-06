<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	
	let { children, data } = $props();
	
	const currentPath = '/';
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
</svelte:head>

<Header siteTitle="Arawi Aura" currentPath={currentPath} />

<main class="main-content">
	{@render children()}
</main>
