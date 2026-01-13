<script lang="ts">
	import SignupForm from '$lib/components/SignupForm.svelte';
	import { goto } from '$app/navigation';

	let { data } = $props() as any;

	$effect(() => {
		if (data?.user) {
			goto('/admin');
		}
	});
</script>

<svelte:head>
	<title>Sign Up - Arawi Aura</title>
	<meta name="description" content="Create a new Arawi Aura blog account" />
</svelte:head>

<SignupForm />
