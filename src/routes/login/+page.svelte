<script lang="ts">
	import LoginForm from '$lib/components/LoginForm.svelte';
	import { goto } from '$app/navigation';

	let { data } = $props() as any;

	$effect(() => {
		if (data?.user) {
			goto('/admin');
		}
	});
</script>

<svelte:head>
	<title>Sign In - Arawi Aura</title>
	<meta name="description" content="Sign in to your Arawi Aura blog account" />
</svelte:head>

<LoginForm />
