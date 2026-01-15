<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/components/Input.svelte';
	import Pressable from '$lib/components/Pressable.svelte';

	let name = '';
	let slug = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let bio = '';
	let error = '';
	let loading = false;

	async function handleSignup() {
		error = '';

		// Validate passwords match
		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			window.toast?.error('Passwords do not match');
			return;
		}

		loading = true;

		try {
			const response = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, slug, email, password, bio })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Sign up failed';
				window.toast?.error(error || 'Sign up failed');
				return;
			}

			// Show success message
			window.toast?.success('Account created successfully! Welcome to Arawi Aura.');

			// Small delay to show toast before redirect
			setTimeout(async () => {
				// Redirect based on user role
				if (data.user?.role === 'admin') {
					await goto('/admin');
				} else {
					await goto('/');
				}
			}, 1500);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'An error occurred';
			error = errorMessage;
			window.toast?.error(errorMessage);
		} finally {
			loading = false;
		}
	}
</script>

<div class="signup-form">
	<h2>Create Account</h2>

	{#if error}
		<div class="error-message">{error}</div>
	{/if}

	<form on:submit|preventDefault={handleSignup}>
		<Input
			id="name"
			type="text"
			bind:value={name}
			label="Full Name"
			placeholder="John Doe"
			required
			disabled={loading}
		/>

		<Input
			id="slug"
			type="text"
			bind:value={slug}
			label="Username (URL slug)"
			placeholder="john-doe"
			description="Lowercase letters, numbers, and hyphens only"
			pattern="[a-z0-9-]+"
			required
			disabled={loading}
		/>

		<Input
			id="email"
			type="email"
			bind:value={email}
			label="Email"
			placeholder="your@email.com"
			required
			disabled={loading}
		/>

		<Input
			id="bio"
			type="textarea"
			bind:value={bio}
			label="Bio"
			placeholder="Tell us about yourself"
			rows={3}
			disabled={loading}
		/>

		<Input
			id="password"
			type="password"
			bind:value={password}
			label="Password"
			placeholder="••••••••"
			description="At least 8 characters"
			minlength={8}
			required
			disabled={loading}
		/>

		<Input
			id="confirmPassword"
			type="password"
			bind:value={confirmPassword}
			label="Confirm Password"
			placeholder="••••••••"
			required
			disabled={loading}
			error={password && confirmPassword && password !== confirmPassword
				? 'Passwords do not match'
				: ''}
		/>

		<Pressable type="submit" disabled={loading} fullWidth>
			{loading ? 'Creating account...' : 'Sign Up'}
		</Pressable>
	</form>

	<p class="signin-link">
		Already have an account? <a href="/login">Sign in here</a>
	</p>
</div>

<style>
	.signup-form {
		max-width: var(--container-base);
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

	.signin-link {
		text-align: center;
		margin-top: var(--space-6);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		color: var(--color-on-surface-variant);
		line-height: var(--leading-snug);
	}

	.signin-link a {
		color: var(--color-primary);
		text-decoration: none;
		font-weight: 500;
		transition: color var(--duration-fast);
	}

	.signin-link a:hover {
		color: var(--color-primary-container);
		text-decoration: underline;
	}

	@media (max-width: 640px) {
		.signup-form {
			margin: var(--space-4) var(--space-2);
			padding: var(--space-6);
		}

		h2 {
			font-size: var(--text-xl);
		}
	}
</style>
