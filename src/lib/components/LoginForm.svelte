<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import Input from '$lib/components/Input.svelte';
	import Pressable from '$lib/components/Pressable.svelte';

	let email = '';
	let password = '';
	let error = '';
	let loading = false;

	async function handleSignin() {
		error = '';
		loading = true;

		try {
			const response = await fetch('/api/auth/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Sign in failed';
				window.toast?.error(error || 'Sign in failed');
				return;
			}

			// Show success message
			window.toast?.success('Welcome back! Redirecting...');

			// Invalidate all data to refresh user state from server
			await invalidateAll();

			// Small delay to show toast before redirect
			setTimeout(async () => {
				// Always redirect to home
				await goto('/');
			}, 500);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'An error occurred';
			error = errorMessage;
			window.toast?.error(errorMessage);
		} finally {
			loading = false;
		}
	}
</script>

<div class="login-form">
	<h2>Sign In</h2>

	{#if error}
		<div class="error-message">{error}</div>
	{/if}

	<form on:submit|preventDefault={handleSignin}>
		<Input
			id="email"
			type="email"
			bind:value={email}
			label="Email"
			placeholder="your@email.com"
			required
			disabled={loading}
			error={error && email ? '' : error}
		/>

		<Input
			id="password"
			type="password"
			bind:value={password}
			label="Password"
			placeholder="••••••••"
			required
			disabled={loading}
			error={error && !email ? error : ''}
		/>

		<Pressable type="submit" disabled={loading} fullWidth>
			{loading ? 'Signing in...' : 'Sign In'}
		</Pressable>
	</form>

	<p class="signup-link">
		Don't have an account? <a href="/signup">Sign up here</a>
	</p>
</div>

<style>
	.login-form {
		max-width: var(--container-narrow);
		margin: var(--space-8) auto;
		padding: var(--space-8);
		border: var(--line-thin) solid var(--stroke-medium);
		border-radius: clamp(8px, 2vw, 12px);
		background-color: var(--color-surface-container-lowest);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	h2 {
		margin: 0 0 var(--space-6) 0;
		text-align: center;
		font-family: var(--font-serif);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-on-surface);
		line-height: var(--leading-tight);
	}

	.error-message {
		background-color: var(--color-error-container);
		color: var(--color-on-error-container);
		padding: var(--space-4);
		border-radius: clamp(4px, 1vw, 8px);
		margin-bottom: var(--space-4);
		border-left: var(--line-bold) solid var(--color-error);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		line-height: var(--leading-snug);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.signup-link {
		text-align: center;
		margin-top: var(--space-6);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		color: var(--color-on-surface-variant);
		line-height: var(--leading-snug);
	}

	.signup-link a {
		color: var(--color-primary);
		text-decoration: none;
		font-weight: 500;
		transition: color var(--duration-fast);
	}

	.signup-link a:hover {
		color: var(--color-primary-container);
		text-decoration: underline;
	}

	@media (max-width: 640px) {
		.login-form {
			margin: var(--space-4) var(--space-2);
			padding: var(--space-6);
		}

		h2 {
			font-size: var(--text-xl);
		}
	}
</style>
