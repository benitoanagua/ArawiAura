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

	input,
	textarea {
		padding: var(--space-3);
		border: var(--line-thin) solid var(--stroke-medium);
		border-radius: clamp(4px, 1vw, 8px);
		font-family: var(--font-sans);
		font-size: var(--text-base);
		color: var(--color-on-surface);
		background-color: var(--color-surface);
		transition: all var(--duration-fast);
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--stroke-maximum);
		box-shadow: 0 0 0 var(--ring-width) var(--ring-color);
		background-color: var(--color-surface-container-lowest);
	}

	input:disabled,
	textarea:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background-color: var(--color-surface-container-low);
	}

	input::placeholder,
	textarea::placeholder {
		color: var(--color-on-surface-variant);
	}

	small {
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		color: var(--color-on-surface-variant);
		line-height: var(--leading-snug);
	}

	textarea {
		resize: vertical;
		min-height: 80px;
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

		input,
		textarea,
		button {
			padding: var(--space-2-5);
			font-size: var(--text-sm);
		}
	}
</style>
