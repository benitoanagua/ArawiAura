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
	}

	.auth-bar {
		background-color: var(--color-surface, #f5f5f5);
		border-bottom: 1px solid var(--color-border, #ddd);
		padding: 0.75rem 1rem;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.user-menu {
		position: relative;
	}

	.user-menu-toggle {
		background: none;
		border: 1px solid var(--color-border, #ddd);
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		transition: background-color 0.2s;
	}

	.user-menu-toggle:hover {
		background-color: var(--color-surface-hover, #efefef);
	}

	.user-name {
		font-weight: 600;
	}

	.user-role {
		font-size: 0.8rem;
		color: var(--color-text-secondary, #666);
	}

	.user-role.admin {
		color: #ff6b00;
		font-weight: 600;
	}

	.user-menu-dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		background: white;
		border: 1px solid var(--color-border, #ddd);
		border-radius: 4px;
		margin-top: 0.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		min-width: 200px;
		z-index: 10;
	}

	.menu-item {
		display: block;
		padding: 0.75rem 1rem;
		text-decoration: none;
		color: var(--color-text, #333);
		border: none;
		background: none;
		cursor: pointer;
		width: 100%;
		text-align: left;
		transition: background-color 0.2s;
		font-size: 0.95rem;
	}

	.menu-item:hover {
		background-color: var(--color-surface, #f5f5f5);
	}

	.logout-btn {
		color: #c00;
		font-weight: 600;
	}

	.auth-links {
		display: flex;
		gap: 1rem;
	}

	.auth-link {
		padding: 0.5rem 1rem;
		text-decoration: none;
		color: var(--color-text, #333);
		border-radius: 4px;
		transition: background-color 0.2s;
		font-size: 0.95rem;
	}

	.auth-link:hover {
		background-color: var(--color-surface-hover, #efefef);
	}

	.auth-link--primary {
		background-color: var(--color-primary, #007bff);
		color: white;
	}

	.auth-link--primary:hover {
		background-color: var(--color-primary-dark, #0056b3);
	}

	@media (max-width: 640px) {
		.auth-bar {
			padding: 0.5rem;
		}

		.user-menu-toggle {
			font-size: 0.85rem;
			padding: 0.4rem 0.75rem;
		}

		.auth-links {
			gap: 0.5rem;
		}

		.auth-link {
			padding: 0.4rem 0.75rem;
			font-size: 0.85rem;
		}
	}
</style>
