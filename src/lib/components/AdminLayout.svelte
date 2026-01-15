<script lang="ts">
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';
	import Pressable from '$lib/components/Pressable.svelte';
	import type { NavItem, AdminLayoutProps } from '$lib/types/Admin';

	let {
		navItems = [
			{ label: 'Dashboard', href: '/admin', icon: 'carbon:dashboard' },
			{ label: 'Posts', href: '/admin/posts', icon: 'carbon:document', badge: '12' },
			{ label: 'Tags', href: '/admin/tags', icon: 'carbon:tag' },
			{ label: 'Media', href: '/admin/media', icon: 'carbon:image', badge: '24' },
			{ label: 'Profile', href: '/admin/profile', icon: 'carbon:user' },
			{ label: 'Settings', href: '/admin/settings', icon: 'carbon:settings' }
		],
		title = 'Admin Dashboard',
		brand,
		actions,
		user,
		children,
		activeHref
	}: AdminLayoutProps & { activeHref?: string } = $props();

	// Mobile sidebar state
	let sidebarOpen = $state(false);

	// Auto-close sidebar on route change (mobile)
	$effect(() => {
		if (typeof window !== 'undefined' && window.innerWidth < 641) {
			sidebarOpen = false;
		}
	});

	// Active state for navigation
	function isActive(href: string): boolean {
		if (activeHref !== undefined) {
			return activeHref === href || activeHref.startsWith(href + '/');
		}
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}

	// Responsive sidebar visibility
	let sidebarVisible = $derived(
		typeof window !== 'undefined' && window.innerWidth >= 641 ? true : sidebarOpen
	);
</script>

<!-- Layout Container -->
<div class="ax-admin-layout {sidebarOpen ? 'ax-admin-layout--sidebar-open' : ''}">
	<!-- Mobile Overlay -->
	{#if sidebarOpen && typeof window !== 'undefined' && window.innerWidth < 641}
		<div
			class="ax-admin-overlay"
			onclick={() => (sidebarOpen = false)}
			role="presentation"
			aria-hidden="true"
		></div>
	{/if}

	<!-- Header - Blueprint Engineering -->
	<header class="ax-admin-header">
		<!-- Mobile Menu Toggle -->
		{#if typeof window !== 'undefined' && window.innerWidth < 641}
			<Pressable
				variant="ghost"
				size="sm"
				class="ax-admin-header__menu-toggle"
				onclick={() => (sidebarOpen = !sidebarOpen)}
			>
				<Icon icon={sidebarOpen ? 'carbon:close' : 'carbon:menu'} width="20" height="20" />
			</Pressable>
		{/if}

		<!-- Brand Section -->
		{#if brand}
			{@render brand()}
		{:else}
			<div class="ax-admin-header__brand">
				<h1 class="ax-admin-header__title">{title}</h1>
			</div>
		{/if}

		<!-- Actions Section -->
		{#if actions}
			{@render actions()}
		{:else}
			<!-- Desktop Actions -->
			<div class="ax-admin-header__actions ax-admin-header__actions--desktop">
				{#if user}
					<div class="ax-admin-header__user-info">
						<span class="ax-admin-header__user-name">{user.name || 'User'}</span>
						<span class="ax-admin-header__user-email">{user.email || ''}</span>
					</div>
					<Pressable href="/" variant="outline" size="sm">
						<Icon icon="carbon:view" width="16" height="16" />
						View Site
					</Pressable>

					<Pressable href="/api/auth/logout" variant="secondary" size="sm">
						<Icon icon="carbon:logout" width="16" height="16" />
						Logout
					</Pressable>
				{/if}
			</div>
		{/if}
	</header>

	<!-- Main Blueprint Structure -->
	<div class="ax-admin-main">
		<!-- Sidebar - Technical Grid -->
		<aside class="ax-admin-sidebar {sidebarVisible ? 'ax-admin-sidebar--visible' : ''}">
			<nav class="ax-admin-nav">
				{#each navItems as item}
					<a
						href={item.href}
						class="ax-admin-nav-item {isActive(item.href) ? 'ax-admin-nav-item--active' : ''}"
					>
						<Icon icon={item.icon} width="20" height="20" />
						<span class="ax-admin-nav-item__label">{item.label}</span>
						{#if item.badge}
							<span class="ax-admin-nav-item__badge">{item.badge}</span>
						{/if}
					</a>
				{/each}

				{#if user}
					<div class="ax-admin-sidebar__mobile-actions">
						<div class="ax-admin-sidebar__user-info">
							<span class="ax-admin-sidebar__user-name">{user?.name || 'User'}</span>
							<span class="ax-admin-sidebar__user-email">{user?.email || ''}</span>
						</div>

						<Pressable href="/" variant="outline" size="sm" class="ax-admin-sidebar__mobile-action">
							<Icon icon="carbon:view" width="16" height="16" />
							View Site
						</Pressable>

						<Pressable
							href="/api/auth/logout"
							variant="secondary"
							size="sm"
							class="ax-admin-sidebar__mobile-action"
						>
							<Icon icon="carbon:logout" width="16" height="16" />
							Logout
						</Pressable>
					</div>
				{/if}
			</nav>
		</aside>

		<!-- Content - Structural Honesty -->
		<main class="ax-admin-content">
			<div class="ax-admin-content__inner">
				{@render children?.()}
			</div>
		</main>
	</div>
</div>

<style>
	/* Architectural Outline Admin Layout */
	.ax-admin-layout {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background: var(--color-surface);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
	}

	/* Mobile Overlay - Anti-Reflow */
	.ax-admin-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 998;
		backdrop-filter: blur(2px);
	}

	/* Header - Industrial Precision */
	.ax-admin-header {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-2) var(--space-3);
		background: var(--color-surface-container-high);
		border-bottom: var(--line-base) solid var(--color-outline);
		z-index: 996;
		position: relative;
		flex-shrink: 0;
	}

	/* Mobile First Responsive Design */
	/* Base Mobile Styles (default) */
	.ax-admin-header__brand {
		order: 1;
		flex: 1;
	}

	.ax-admin-header__title {
		font-family: var(--font-display);
		font-size: var(--text-base);
		font-weight: 700;
		color: var(--color-only);
		margin: 0;
		letter-spacing: -0.02em;
		line-height: 1.2;
	}

	.ax-admin-header__actions {
		order: 2;
		display: flex;
		gap: var(--space-2);
	}

	.ax-admin-header__actions--desktop {
		display: none;
	}

	:global(.ax-admin-header__menu-toggle) {
		display: flex;
	}

	/* Desktop Styles */
	@media (min-width: 641px) {
		.ax-admin-header {
			padding: var(--space-3) var(--space-4);
			gap: var(--space-4);
		}

		:global(.ax-admin-header__menu-toggle) {
			display: none;
		}

		.ax-admin-header__title {
			font-size: var(--text-lg);
		}

		.ax-admin-header__actions--desktop {
			display: flex;
			gap: var(--space-3);
		}

		.ax-admin-header__user-info {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			padding-right: var(--space-3);
			border-right: var(--line-thin) solid var(--color-outline-variant);
		}

		.ax-admin-header__user-name {
			font-family: var(--font-sans);
			font-weight: 600;
			font-size: var(--text-sm);
			color: var(--color-on-surface);
			line-height: 1.2;
		}

		.ax-admin-header__user-email {
			font-family: var(--font-sans);
			font-size: var(--text-xs);
			color: var(--color-on-surface-variant);
			line-height: 1.2;
		}
	}

	/* Main Blueprint Structure */
	.ax-admin-main {
		display: flex;
		flex: 1;
		overflow: hidden;
	}

	/* Sidebar - Technical Grid */
	.ax-admin-sidebar {
		width: 280px;
		background: var(--color-surface-container);
		border-right: var(--line-base) solid var(--color-outline);
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		transform: translateX(-100%);
		transition: transform var(--duration-base) ease-out;
		z-index: 999;
	}

	.ax-admin-sidebar--visible {
		transform: translateX(0);
	}

	/* Mobile First Responsive Sidebar */
	/* Desktop (full sidebar) */
	@media (min-width: 641px) {
		.ax-admin-sidebar {
			width: 280px;
			position: relative;
			transform: translateX(0);
			border-right: var(--line-base) solid var(--color-outline);
		}

		.ax-admin-sidebar__mobile-actions {
			display: none;
		}
	}

	/* Navigation - Blueprint Grid System */
	.ax-admin-nav {
		display: flex;
		flex-direction: column;
		padding: var(--space-4);
		gap: var(--space-1);
		flex: 1;
	}

	.ax-admin-nav-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		border-radius: var(--space-2);
		text-decoration: none;
		color: var(--color-on-surface-variant);
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: 500;
		transition: all var(--duration-fast) ease-out;
		border: var(--line-thin) solid transparent;
		white-space: nowrap;
		overflow: hidden;
	}

	/* Enhanced Ring System - Anti-Reflow */
	.ax-admin-nav-item:hover:not(.ax-admin-nav-item--active) {
		background: var(--color-surface-container-high);
		color: var(--color-on-surface);
		box-shadow: 0 0 0 1px var(--color-outline);
	}

	/* Active State - Primary Ring */
	.ax-admin-nav-item--active {
		background: var(--color-primary-container);
		color: var(--color-on-primary-container);
		border-color: var(--color-primary);
		box-shadow:
			inset 0 0 0 var(--line-thin) var(--color-primary),
			0 0 0 1px var(--color-primary);
	}

	.ax-admin-nav-item__label {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.ax-admin-nav-item__badge {
		background: var(--color-error);
		color: var(--color-on-error);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 700;
		padding: var(--space-1) var(--space-2);
		border-radius: var(--space-5);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		min-width: 20px;
		text-align: center;
		line-height: 1;
	}

	.ax-admin-nav-item--active .ax-admin-nav-item__badge {
		background: var(--color-on-primary-container);
		color: var(--color-primary);
	}

	/* Mobile Actions in Sidebar */
	.ax-admin-sidebar__mobile-actions {
		display: none;
		flex-direction: column;
		gap: var(--space-2);
		padding: var(--space-4);
		border-top: var(--line-thin) solid var(--color-outline-variant);
		margin-top: auto;
	}

	.ax-admin-sidebar__user-info {
		padding: var(--space-2) var(--space-3);
		background: var(--color-surface-container-low);
		border-radius: var(--space-1);
		margin-bottom: var(--space-3);
	}

	.ax-admin-sidebar__user-name {
		font-family: var(--font-sans);
		font-weight: 600;
		font-size: var(--text-sm);
		color: var(--color-on-surface);
		display: block;
	}

	.ax-admin-sidebar__user-email {
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		color: var(--color-on-surface-variant);
		display: block;
		margin-top: var(--space-1);
	}

	:global(.ax-admin-sidebar__mobile-action) {
		width: 100%;
		justify-content: flex-start;
		padding: var(--space-3) var(--space-4);
		border-radius: var(--space-1);
	}

	/* Show mobile actions on mobile */
	@media (max-width: 640px) {
		.ax-admin-sidebar__mobile-actions {
			display: flex;
		}
	}

	/* Content Area - Structural Honesty */
	.ax-admin-content {
		flex: 1;
		overflow-y: auto;
		background: var(--color-surface);
		position: relative;
	}

	.ax-admin-content__inner {
		padding: var(--space-3);
		max-width: 1400px;
		margin: 0 auto;
		width: 100%;
	}

	/* Mobile First Responsive Content */
	@media (min-width: 641px) {
		.ax-admin-content__inner {
			padding: var(--space-4);
		}
	}

	/* Custom Scrollbar - Industrial Aesthetic */
	.ax-admin-content::-webkit-scrollbar {
		width: 8px;
	}

	.ax-admin-content::-webkit-scrollbar-track {
		background: var(--color-surface-container-low);
	}

	.ax-admin-content::-webkit-scrollbar-thumb {
		background: var(--color-outline-variant);
		border-radius: var(--space-1);
		border: 2px solid var(--color-surface-container-low);
	}

	.ax-admin-content::-webkit-scrollbar-thumb:hover {
		background: var(--color-outline);
	}
</style>
