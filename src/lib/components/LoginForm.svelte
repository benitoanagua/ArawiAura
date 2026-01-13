<script lang="ts">
	import { goto } from '$app/navigation';

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
				return;
			}

			// Redirect to admin or home page
			await goto('/admin');
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
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
		max-width: 400px;
		margin: 2rem auto;
		padding: 2rem;
		border: 1px solid var(--color-border, #ccc);
		border-radius: 8px;
	}

	h2 {
		margin-top: 0;
		text-align: center;
	}

	.error-message {
		background-color: #fee;
		color: #c00;
		padding: 1rem;
		border-radius: 4px;
		margin-bottom: 1rem;
		border-left: 4px solid #c00;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-weight: 600;
	}

	input {
		padding: 0.75rem;
		border: 1px solid var(--color-border, #ccc);
		border-radius: 4px;
		font-size: 1rem;
	}

	input:focus {
		outline: none;
		border-color: var(--color-primary, #007bff);
		box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
	}

	button {
		padding: 0.75rem;
		background-color: var(--color-primary, #007bff);
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	button:hover:not(:disabled) {
		background-color: var(--color-primary-dark, #0056b3);
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.signup-link {
		text-align: center;
		margin-top: 1rem;
		font-size: 0.9rem;
	}

	.signup-link a {
		color: var(--color-primary, #007bff);
		text-decoration: none;
	}

	.signup-link a:hover {
		text-decoration: underline;
	}
</style>
