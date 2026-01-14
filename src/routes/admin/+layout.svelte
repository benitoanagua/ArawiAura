<script lang="ts">
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
	let sidebarOpen = $state(false);

	const navItems = [
		{ label: 'Dashboard', href: '/admin', icon: 'carbon:dashboard' },
		{ label: 'Posts', href: '/admin/posts', icon: 'carbon:document' },
		{ label: 'Tags', href: '/admin/tags', icon: 'carbon:tag' },
		{ label: 'Media', href: '/admin/media', icon: 'carbon:image' },
		{ label: 'Profile', href: '/admin/profile', icon: 'carbon:user' },
		{ label: 'Settings', href: '/admin/settings', icon: 'carbon:settings' }
	];

	function isActive(href: string) {
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}
</script>

<div class="ax-admin-layout">
	<!-- Header - Architectural Outline Style -->
	<header class="ax-header">
		<div class="ax-header__brand">
			<h1 class="ax-header__title">Admin Dashboard</h1>
		</div>
		<div class="ax-header__actions">
			<a href="/" class="ax-button ax-button--outline ax-button--sm">
				<Icon icon="carbon:view" width="16" height="16" />
				View Site
			</a>
			<a href="/api/auth/logout" class="ax-button ax-button--ghost ax-button--sm ax-button--danger">
				<Icon icon="carbon:logout" width="16" height="16" />
				Logout
			</a>
		</div>
	</header>

	<!-- Main Content -->
	<div class="ax-main">
		<!-- Sidebar - Blueprint Grid Style -->
		<aside class="ax-sidebar">
			<nav class="ax-nav">
				{#each navItems as item}
					<a
						href={item.href}
						class="ax-nav-item {isActive(item.href) ? 'ax-nav-item--active' : ''}"
					>
						<Icon icon={item.icon} width="20" height="20" class="ax-nav-item__icon" style="flex-shrink: 0;" />
						<span class="ax-nav-item__label">{item.label}</span>
					</a>
				{/each}
			</nav>
		</aside>

		<!-- Content - Structural Honesty -->
		<main class="ax-content">
			<div class="ax-content__inner">
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
	}

	/* Header - Industrial Precision */
	.ax-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-4) var(--space-6);
		background: var(--color-surface-container-high);
		border-bottom: var(--line-base) solid var(--color-outline);
		box-shadow: 
			0 var(--line-thin) 0 0 var(--color-outline-variant),
			inset 0 calc(var(--line-thin) * -1) 0 0 var(--color-outline-variant);
		z-index: 100;
	}

	.ax-header__brand {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.ax-header__title {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-on-surface);
		margin: 0;
		letter-spacing: -0.02em;
	}

	.ax-header__actions {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	/* Main Content Area */
	.ax-main {
		display: flex;
		flex: 1;
		overflow: hidden;
	}

	/* Sidebar - Blueprint Grid */
	.ax-sidebar {
		width: 280px;
		background: var(--color-surface-container);
		border-right: var(--line-base) solid var(--color-outline);
		box-shadow: 
			inset calc(var(--line-thin) * -1) 0 0 0 var(--color-outline-variant);
		display: flex;
		flex-direction: column;
	}

	.ax-nav {
		display: flex;
		flex-direction: column;
		padding: var(--space-4);
		gap: var(--space-1);
		flex: 1;
	}

	.ax-nav-item {
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
		box-shadow: 0 0 0 var(--line-thin) transparent;
	}

	.ax-nav-item:hover:not(.ax-nav-item--active) {
		background: var(--color-surface-container-high);
		color: var(--color-on-surface);
		border-color: var(--color-outline);
	}

	.ax-nav-item--active {
		background: var(--color-primary-container);
		color: var(--color-on-primary-container);
		border-color: var(--color-primary);
		box-shadow: 
			inset 0 0 0 var(--line-thin) var(--color-primary);
	}

	.ax-nav-item__label {
		flex: 1;
	}

	/* Content Area - Structural Honesty */
	.ax-content {
		flex: 1;
		overflow-y: auto;
		background: var(--color-surface);
	}

	.ax-content__inner {
		padding: var(--space-6);
	}

	/* Button Styles - Ring System */
	.ax-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		border: none;
		border-radius: var(--space-1);
		font-family: var(--font-sans);
		font-weight: 500;
		text-decoration: none;
		cursor: pointer;
		transition: all var(--duration-fast) ease-out;
		outline: none;
		background: transparent;
		color: var(--color-on-surface);
		box-shadow: 0 0 0 var(--line-thin) transparent;
	}

	.ax-button:focus-visible {
		box-shadow:
			0 0 0 var(--space-1) var(--color-surface),
			0 0 0 var(--space-2) var(--color-outline);
	}

	.ax-button--sm {
		padding: var(--space-2) var(--space-4);
		font-size: var(--text-sm);
	}

	.ax-button--outline {
		box-shadow: 0 0 0 var(--line-thin) var(--color-outline);
	}

	.ax-button--outline:hover {
		box-shadow: 0 0 0 var(--line-thin) var(--color-primary);
		color: var(--color-primary);
		background: var(--color-surface-container-low);
	}

	.ax-button--ghost {
		box-shadow: 0 0 0 var(--line-thin) transparent;
	}

	.ax-button--ghost:hover {
		background: var(--color-surface-container-low);
		box-shadow: 0 0 0 var(--line-thin) var(--color-outline-variant);
	}

	.ax-button--danger {
		color: var(--color-error);
	}

	.ax-button--danger:hover {
		background: var(--color-error-container);
		color: var(--color-on-error-container);
		box-shadow: 0 0 0 var(--line-thin) var(--color-error);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.ax-sidebar {
			width: 240px;
		}
		
		.ax-content__inner {
			padding: var(--space-4);
		}
	}

	@media (max-width: 768px) {
		.ax-header {
			padding: var(--space-3) var(--space-4);
		}
		
		.ax-sidebar {
			width: 200px;
		}
		
		.ax-nav-item {
			padding: var(--space-2) var(--space-3);
		}
	}
</style>