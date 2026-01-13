<script lang="ts">
	import type { PageMetaProps } from '$lib/types/page-meta.js';
	import type { User } from '$lib/db/types';
	import Drop from '$lib/components/Drop.svelte';
	import Pressable from '$lib/components/Pressable.svelte';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	interface BottomNavProps extends PageMetaProps {
		user?: User | null;
	}

	let {
		copyright = `© ${new Date().getFullYear()}`,
		user = null,
		userMenuOptions,
		guestNavOptions,
		siteTitle = 'Arawi Aura',
		showLogo = true,
		currentPath = '/',
		class: className
	}: BottomNavProps = $props();

	let showUserMenu = $state(false);

	// Navigation items for top bar
	const navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{ label: 'Contact', href: '/contact' }
	];

	async function handleLogout() {
		try {
			await fetch('/api/auth/logout', { method: 'POST' });
			window.location.href = '/';
			showUserMenu = false;
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}

	// Default user menu options
	function getDefaultUserMenuOptions() {
		return [
			{ label: 'Profile', iconComponent: 'carbon:user', href: user ? `/author/${user.slug}` : '' },
			{ label: 'Settings', iconComponent: 'carbon:settings', href: '/settings' },
			{ divider: true },
			{ label: 'Logout', iconComponent: 'carbon:logout', value: 'logout' }
		];
	}

	// Default guest navigation options
	function getDefaultGuestNavOptions() {
		return [
			{ label: 'Sign In', iconComponent: 'carbon:login', href: '/login' },
			{ label: 'Sign Up', iconComponent: 'carbon:user-follow', href: '/signup' }
		];
	}

	// Use provided options or defaults
	const finalUserMenuOptions = () => userMenuOptions || getDefaultUserMenuOptions();
	const finalGuestNavOptions = () => guestNavOptions || getDefaultGuestNavOptions();

	async function handleUserMenuSelect(option: any) {
		if (option.value === 'logout') {
			try {
				await fetch('/api/auth/logout', { method: 'POST' });
				window.toast?.success('Logged out successfully');
				await goto('/');
			} catch (error) {
				window.toast?.error('Logout failed');
			}
		}
	}

	function handleGuestNavSelect(option: any) {
		if (option.href) {
			goto(option.href);
		}
	}
</script>

<!-- Top Navigation Header -->
<header class="ax-top-header">
	<div class="ax-top-header__container">
		{#if showLogo}
			<div class="ax-top-header__logo">
				<span class="ax-top-header__logo-mark">●</span>
				<span class="ax-top-header__site-title">{siteTitle}</span>
			</div>
		{/if}
		
		<nav class="ax-top-header__nav">
			{#each navItems as item}
				<a 
					href={item.href} 
					class="ax-top-header__nav-link {currentPath === item.href ? 'active' : ''}"
				>
					{item.label}
				</a>
			{/each}
		</nav>
		
		<div class="ax-top-header__auth">
			{#if user}
				<div class="ax-top-header__user-menu">
					<button 
						class="ax-top-header__user-toggle" 
						onclick={() => showUserMenu = !showUserMenu}
					>
						<span class="ax-top-header__user-name">{user.name}</span>
						<span class="ax-top-header__user-role" class:admin={user.role === 'admin'}>
							{user.role === 'admin' ? '👑 Admin' : '✍️ Author'}
						</span>
					</button>
					
					{#if showUserMenu}
						<div class="ax-top-header__user-dropdown">
							{#if user.role === 'admin'}
								<a href="/admin" class="ax-top-header__menu-item">Admin Panel</a>
								<hr />
							{/if}
							<a href={`/author/${user.slug}`} class="ax-top-header__menu-item">My Profile</a>
							<button class="ax-top-header__menu-item ax-top-header__logout-btn" onclick={handleLogout}>
								Logout
							</button>
						</div>
					{/if}
				</div>
			{:else}
				<div class="ax-top-header__auth-links">
					<a href="/login" class="ax-top-header__auth-link">Sign In</a>
					<a href="/signup" class="ax-top-header__auth-link ax-top-header__auth-link--primary">Sign Up</a>
				</div>
			{/if}
		</div>
	</div>
</header>

<!-- Bottom Navigation Bar -->
<nav class="ax-bottom-nav">
	<div class="ax-bottom-nav__container">
		{#if user}
			<!-- Authenticated User View - Menu on Left -->
			<div class="ax-bottom-nav__left">
				<span class="ax-bottom-nav__copyright">{copyright}</span>
				<Drop 
					options={finalUserMenuOptions()} 
					onSelect={handleUserMenuSelect}
					align="left"
				>
					<Pressable variant="ghost" size="sm">
						{user.name} 
						<Icon icon="carbon:chevron-down" width="1.1em" height="1.1em" />
					</Pressable>
				</Drop>
			</div>
			<div class="ax-bottom-nav__right">
				<!-- Right side intentionally left empty -->
			</div>
		{:else}
			<!-- Guest View - Actions on Left -->
			<div class="ax-bottom-nav__left">
				<span class="ax-bottom-nav__copyright">{copyright}</span>
				<div class="ax-bottom-nav__guest-actions">
					{#each finalGuestNavOptions() as option}
						<Pressable 
							variant="ghost" 
							size="sm"
							onclick={() => handleGuestNavSelect(option)}
						>
							{#if option.iconComponent}
								<Icon icon={option.iconComponent} width="1.2em" height="1.2em" />
							{/if}
							{option.label}
						</Pressable>
					{/each}
				</div>
			</div>
			<div class="ax-bottom-nav__right">
				<!-- Right side intentionally left empty -->
			</div>
		{/if}
	</div>
</nav>

<style>
	/* Top Navigation Header */
	.ax-top-header {
		position: sticky;
		top: 0;
		z-index: 100;
		background-color: var(--color-surface);
		border-bottom: var(--line-thin) solid var(--stroke-medium);
	}

	.ax-top-header__container {
		max-width: var(--container-base);
		margin: 0 auto;
		padding: 0 var(--space-4);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		height: 64px;
	}

	.ax-top-header__logo {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.ax-top-header__logo-mark {
		font-size: 1.2em;
		color: var(--color-primary);
	}

	.ax-top-header__site-title {
		font-family: var(--font-sans);
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--color-on-surface);
	}

	.ax-top-header__nav {
		display: flex;
		gap: var(--space-6);
	}

	.ax-top-header__nav-link {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		color: var(--color-on-surface-variant);
		text-decoration: none;
		transition: all var(--duration-fast);
		padding: var(--space-2) var(--space-1);
		border-radius: var(--space-1);
	}

	.ax-top-header__nav-link:hover,
	.ax-top-header__nav-link.active {
		color: var(--color-primary);
		background-color: var(--color-surface-container-low);
	}

	.ax-top-header__auth {
		display: flex;
		align-items: center;
	}

	.ax-top-header__user-menu {
		position: relative;
	}

	.ax-top-header__user-toggle {
		background: none;
		border: var(--line-thin) solid var(--stroke-medium);
		padding: var(--space-2) var(--space-3);
		border-radius: var(--space-1);
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-0-5);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		transition: all var(--duration-base);
		min-width: 120px;
	}

	.ax-top-header__user-toggle:hover {
		background-color: var(--color-surface-container-high);
		border-color: var(--stroke-maximum);
	}

	.ax-top-header__user-name {
		font-weight: 600;
		color: var(--color-on-surface);
		line-height: var(--leading-tight);
	}

	.ax-top-header__user-role {
		font-size: var(--text-xs);
		color: var(--color-on-surface-variant);
		line-height: var(--leading-tight);
	}

	.ax-top-header__user-role.admin {
		color: var(--color-primary);
		font-weight: 600;
	}

	.ax-top-header__user-dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		background: var(--color-surface-container-lowest);
		border: var(--line-thin) solid var(--stroke-medium);
		border-radius: var(--space-1);
		margin-top: var(--space-1);
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

	.ax-top-header__menu-item {
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

	.ax-top-header__menu-item:hover {
		background-color: var(--color-surface-container-low);
	}

	.ax-top-header__logout-btn {
		color: var(--color-error);
		font-weight: 600;
		border-top: var(--line-thin) solid var(--stroke-subtle);
		margin-top: var(--space-1);
		padding-top: var(--space-3);
	}

	.ax-top-header__auth-links {
		display: flex;
		gap: var(--space-2);
	}

	.ax-top-header__auth-link {
		padding: var(--space-2) var(--space-3);
		text-decoration: none;
		color: var(--color-on-surface);
		border: var(--line-thin) solid var(--stroke-medium);
		border-radius: var(--space-1);
		transition: all var(--duration-fast);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: 500;
	}

	.ax-top-header__auth-link:hover {
		background-color: var(--color-surface-container-high);
		border-color: var(--stroke-maximum);
	}

	.ax-top-header__auth-link--primary {
		background-color: var(--color-primary);
		color: var(--color-on-primary);
		border-color: var(--color-primary);
		font-weight: 600;
	}

	.ax-top-header__auth-link--primary:hover {
		background-color: var(--color-primary-container);
		color: var(--color-on-primary-container);
		border-color: var(--color-primary-container);
	}

	/* Bottom Navigation Bar - Light Theme */
	.ax-bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: var(--color-surface);
		border-top: var(--line-thin) solid var(--color-outline);
		z-index: 999;
		padding: var(--space-2) 0;
		box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
	}

	.ax-bottom-nav__container {
		max-width: var(--container-base);
		margin: 0 auto;
		padding: 0 var(--space-4);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* New layout classes */
	.ax-bottom-nav__left {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.ax-bottom-nav__right {
		display: flex;
		align-items: center;
	}

	.ax-bottom-nav__copyright {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-on-surface-variant);
		opacity: 0.8;
		margin-right: var(--space-3);
	}

	/* Guest View */
	.ax-bottom-nav__guest-actions {
		display: flex;
		gap: var(--space-2);
		align-items: center;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.ax-top-header__container {
			padding: 0 var(--space-3);
			gap: var(--space-3);
		}

		.ax-top-header__nav {
			display: none;
		}

		.ax-top-header__user-toggle {
			font-size: var(--text-xs);
			padding: var(--space-1-5) var(--space-2);
			min-width: 100px;
		}

		.ax-top-header__auth-links {
			gap: var(--space-1-5);
		}

		.ax-top-header__auth-link {
			padding: var(--space-1-5) var(--space-2);
			font-size: var(--text-xs);
		}
	}

	@media (max-width: 640px) {
		.ax-bottom-nav__container {
			padding: 0 var(--space-3);
		}

		.ax-bottom-nav__guest-actions {
			gap: var(--space-1-5);
		}

		.ax-bottom-nav__copyright {
			font-size: 0.65rem;
			margin-right: var(--space-2);
		}
	}

	@media (max-width: 480px) {
		.ax-top-header__container {
			padding: 0 var(--space-2);
		}

		.ax-top-header__site-title {
			font-size: var(--text-base);
		}

		.ax-bottom-nav {
			padding: var(--space-1-5) 0;
		}

		.ax-bottom-nav__container {
			padding: 0 var(--space-2);
		}
	}

	/* Ensure main content has bottom padding to accommodate fixed nav */
	:global(.main-content) {
		padding-bottom: calc(60px + env(safe-area-inset-bottom));
	}

	@media (max-width: 640px) {
		:global(.main-content) {
			padding-bottom: calc(56px + env(safe-area-inset-bottom));
		}
	}

	@media (max-width: 480px) {
		:global(.main-content) {
			padding-bottom: calc(52px + env(safe-area-inset-bottom));
		}
	}
</style>
