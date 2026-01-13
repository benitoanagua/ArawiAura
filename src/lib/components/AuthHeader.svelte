<script lang="ts">
	import TopBar from './TopBar.svelte';
	import { goto } from '$app/navigation';
	import type { User } from '$lib/db/types';

	interface Props {
		user: User | null;
		currentPath: string;
		siteTitle?: string;
	}

	const { user, currentPath, siteTitle = 'Arawi Aura' }: Props = $props();

	let showUserMenu = $state(false);

	async function handleLogout() {
		try {
			await fetch('/api/auth/logout', { method: 'POST' });
			await goto('/');
			showUserMenu = false;
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}

	const navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{ label: 'Contact', href: '/contact' }
	];
</script>

<header class="auth-header">
	<TopBar {siteTitle} {navItems} showLogo={true} showNav={true} sticky={true} {currentPath} />

	<div class="auth-bar">
		{#if user}
			<div class="user-menu">
				<button class="user-menu-toggle" onclick={() => (showUserMenu = !showUserMenu)}>
					<span class="user-name">{user.name}</span>
					<span class="user-role" class:admin={user.role === 'admin'}>
						{user.role === 'admin' ? '👑 Admin' : '✍️ Author'}
					</span>
				</button>

				{#if showUserMenu}
					<div class="user-menu-dropdown">
						{#if user.role === 'admin'}
							<a href="/admin" class="menu-item">Admin Panel</a>
							<hr />
						{/if}
						<a href={`/author/${user.slug}`} class="menu-item">My Profile</a>
						<button class="menu-item logout-btn" onclick={handleLogout}> Logout </button>
					</div>
				{/if}
			</div>
		{:else}
			<div class="auth-links">
				<a href="/login" class="auth-link">Sign In</a>
				<a href="/signup" class="auth-link auth-link--primary">Sign Up</a>
			</div>
		{/if}
	</div>
</header>

<style>
	.auth-header {
		position: sticky;
		top: 0;
		z-index: 100;
		background-color: var(--color-surface);
		border-bottom: var(--line-thin) solid var(--stroke-medium);
	}

	.auth-bar {
		background-color: var(--color-surface-container-low);
		border-bottom: var(--line-thin) solid var(--stroke-subtle);
		padding: var(--space-3) var(--space-4);
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: var(--space-4);
	}

	.user-menu {
		position: relative;
	}

	.user-menu-toggle {
		background: none;
		border: var(--line-thin) solid var(--stroke-medium);
		padding: var(--space-2) var(--space-4);
		border-radius: clamp(4px, 1vw, 8px);
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-1);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		transition: all var(--duration-base);
		min-width: 120px;
	}

	.user-menu-toggle:hover {
		background-color: var(--color-surface-container-high);
		border-color: var(--stroke-maximum);
	}

	.user-menu-toggle:focus {
		outline: var(--line-thin) solid var(--ring-color);
		outline-offset: var(--ring-offset);
	}

	.user-name {
		font-weight: 600;
		color: var(--color-on-surface);
		line-height: var(--leading-tight);
	}

	.user-role {
		font-size: var(--text-xs);
		color: var(--color-on-surface-variant);
		line-height: var(--leading-tight);
	}

	.user-role.admin {
		color: var(--color-primary);
		font-weight: 600;
	}

	.user-menu-dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		background: var(--color-surface-container-lowest);
		border: var(--line-thin) solid var(--stroke-medium);
		border-radius: clamp(4px, 1vw, 8px);
		margin-top: var(--space-2);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		min-width: 200px;
		z-index: 10;
		animation: dropdownSlide var(--duration-base) ease-out;
	}

	@keyframes dropdownSlide {
		from {
			transform: translateY(-8px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.menu-item {
		display: block;
		padding: var(--space-3) var(--space-4);
		text-decoration: none;
		color: var(--color-on-surface);
		border: none;
		background: none;
		cursor: pointer;
		width: 100%;
		text-align: left;
		transition: background-color var(--duration-fast);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		line-height: var(--leading-snug);
	}

	.menu-item:hover {
		background-color: var(--color-surface-container-low);
	}

	.menu-item:focus {
		outline: var(--line-thin) solid var(--ring-color);
		outline-offset: calc(-1 * var(--ring-offset));
	}

	.logout-btn {
		color: var(--color-error);
		font-weight: 600;
		border-top: var(--line-thin) solid var(--stroke-subtle);
		margin-top: var(--space-1);
		padding-top: var(--space-3);
	}

	.auth-links {
		display: flex;
		gap: var(--space-3);
	}

	.auth-link {
		padding: var(--space-2) var(--space-4);
		text-decoration: none;
		color: var(--color-on-surface);
		border: var(--line-thin) solid var(--stroke-medium);
		border-radius: clamp(4px, 1vw, 8px);
		transition: all var(--duration-fast);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: 500;
	}

	.auth-link:hover {
		background-color: var(--color-surface-container-high);
		border-color: var(--stroke-maximum);
	}

	.auth-link:focus {
		outline: var(--line-thin) solid var(--ring-color);
		outline-offset: var(--ring-offset);
	}

	.auth-link--primary {
		background-color: var(--color-primary);
		color: var(--color-on-primary);
		border-color: var(--color-primary);
		font-weight: 600;
	}

	.auth-link--primary:hover {
		background-color: var(--color-primary-container);
		color: var(--color-on-primary-container);
		border-color: var(--color-primary-container);
	}

	@media (max-width: 640px) {
		.auth-bar {
			padding: var(--space-2) var(--space-3);
			gap: var(--space-2);
		}

		.user-menu-toggle {
			font-size: var(--text-xs);
			padding: var(--space-1-5) var(--space-3);
			min-width: 100px;
		}

		.auth-links {
			gap: var(--space-2);
		}

		.auth-link {
			padding: var(--space-1-5) var(--space-3);
			font-size: var(--text-xs);
		}
	}
</style>
