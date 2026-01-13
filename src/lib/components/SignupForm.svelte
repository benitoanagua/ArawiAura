<script lang="ts">
	import { goto } from '$app/navigation';

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

<div class="signup-form">
	<h2>Create Account</h2>

	{#if error}
		<div class="error-message">{error}</div>
	{/if}

	<form on:submit|preventDefault={handleSignup}>
		<div class="form-group">
			<label for="name">Full Name</label>
			<input
				id="name"
				type="text"
				bind:value={name}
				placeholder="John Doe"
				required
				disabled={loading}
			/>
		</div>

		<div class="form-group">
			<label for="slug">Username (URL slug)</label>
			<input
				id="slug"
				type="text"
				bind:value={slug}
				placeholder="john-doe"
				pattern="[a-z0-9-]+"
				required
				disabled={loading}
			/>
			<small>Lowercase letters, numbers, and hyphens only</small>
		</div>

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
			<label for="bio">Bio</label>
			<textarea
				id="bio"
				bind:value={bio}
				placeholder="Tell us about yourself"
				rows="3"
				disabled={loading}
			></textarea>
		</div>

		<div class="form-group">
			<label for="password">Password</label>
			<input
				id="password"
				type="password"
				bind:value={password}
				placeholder="••••••••"
				minlength="8"
				required
				disabled={loading}
			/>
			<small>At least 8 characters</small>
		</div>

		<div class="form-group">
			<label for="confirmPassword">Confirm Password</label>
			<input
				id="confirmPassword"
				type="password"
				bind:value={confirmPassword}
				placeholder="••••••••"
				required
				disabled={loading}
			/>
		</div>

		<button type="submit" disabled={loading}>
			{loading ? 'Creating account...' : 'Sign Up'}
		</button>
	</form>

	<p class="signin-link">
		Already have an account? <a href="/login">Sign in here</a>
	</p>
</div>

<style>
	.signup-form {
		max-width: 500px;
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
		gap: 0.25rem;
	}

	label {
		font-weight: 600;
	}

	input,
	textarea {
		padding: 0.75rem;
		border: 1px solid var(--color-border, #ccc);
		border-radius: 4px;
		font-size: 1rem;
		font-family: inherit;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-primary, #007bff);
		box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
	}

	small {
		font-size: 0.85rem;
		color: var(--color-text-secondary, #666);
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

	.signin-link {
		text-align: center;
		margin-top: 1rem;
		font-size: 0.9rem;
	}

	.signin-link a {
		color: var(--color-primary, #007bff);
		text-decoration: none;
	}

	.signin-link a:hover {
		text-decoration: underline;
	}
</style>
