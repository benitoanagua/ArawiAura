<script lang="ts">
	import AuthHeader from '$lib/components/AuthHeader.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import { page } from '$app/stores';

	let { children, data }: any = $props();
	let currentPath = $derived($page.url.pathname);
</script>

<div class="app">
	<AuthHeader user={data?.user} {currentPath} siteTitle="Arawi Aura" />

	<main class="main-content">
		{@render children()}
	</main>

	<PageMeta
		showLogo={true}
		copyright="© 2026 Benito Anagua"
		links={[
			{ label: 'Privacy', href: '/privacy' },
			{ label: 'Terms', href: '/terms' }
		]}
	/>
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
