<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

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
		<div class="form-group">
			<label for="email">Email</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				placeholder="your@email.com"
				required
				disabled={loading}
			/>
		</div>

		<div class="form-group">
			<label for="password">Password</label>
			<input
				id="password"
				type="password"
				bind:value={password}
				placeholder="••••••••"
				required
				disabled={loading}
			/>
		</div>

		<button type="submit" disabled={loading}>
			{loading ? 'Signing in...' : 'Sign In'}
		</button>
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

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	label {
		font-weight: 600;
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		color: var(--color-on-surface);
		line-height: var(--leading-snug);
	}

	input {
		padding: var(--space-3);
		border: var(--line-thin) solid var(--stroke-medium);
		border-radius: clamp(4px, 1vw, 8px);
		font-family: var(--font-sans);
		font-size: var(--text-base);
		color: var(--color-on-surface);
		background-color: var(--color-surface);
		transition: all var(--duration-fast);
	}

	input:focus {
		outline: none;
		border-color: var(--stroke-maximum);
		box-shadow: 0 0 0 var(--ring-width) var(--ring-color);
		background-color: var(--color-surface-container-lowest);
	}

	input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background-color: var(--color-surface-container-low);
	}

	input::placeholder {
		color: var(--color-on-surface-variant);
	}

	button {
		padding: var(--space-3);
		background-color: var(--color-primary);
		color: var(--color-on-primary);
		border: var(--line-thin) solid var(--color-primary);
		border-radius: clamp(4px, 1vw, 8px);
		font-family: var(--font-sans);
		font-size: var(--text-base);
		font-weight: 600;
		cursor: pointer;
		transition: all var(--duration-base);
		line-height: var(--leading-snug);
	}

	button:hover:not(:disabled) {
		background-color: var(--color-primary-container);
		color: var(--color-on-primary-container);
		border-color: var(--color-primary-container);
		transform: translateY(-1px);
	}

	button:active:not(:disabled) {
		transform: translateY(0);
		scale: 0.98;
	}

	button:focus {
		outline: var(--line-thin) solid var(--ring-color);
		outline-offset: var(--ring-offset);
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none;
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

		input,
		button {
			padding: var(--space-2-5);
			font-size: var(--text-sm);
		}
	}
</style>
