<script lang="ts">
	import type { TopBarProps } from '$lib/types/top-bar.js';
	import Logo from './Logo.svelte';
	import Offcanvas from './Offcanvas.svelte';

	let {
		siteTitle = '',
		logoUrl = '',
		navItems = [
			{ label: 'Home', href: '/' },
			{ label: 'About', href: '/about' },
			{ label: 'Contact', href: '/contact' }
		],
		showLogo = true,
		showNav = true,
		sticky = false,
		currentPath = '/',
		class: className
	}: TopBarProps = $props();

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<header class="ax-top-bar {sticky ? 'ax-top-bar--sticky' : ''} {className || ''}">
	<div class="ax-top-bar__container">
		<div class="ax-top-bar__branding">
			{#if showLogo}
				<Logo
					src={logoUrl}
					text={siteTitle}
					showText={!logoUrl}
					href="/"
					textSize="md"
					height={32}
				/>
			{/if}
		</div>

		{#if showNav}
			<!-- Desktop Nav -->
			<nav class="ax-top-bar__nav ax-top-bar__nav--desktop">
				<ul class="ax-top-bar__list">
					{#each navItems as item}
						<li class="ax-top-bar__item">
							<a
								href={item.href}
								class="ax-top-bar__link {currentPath === item.href
									? 'ax-top-bar__link--active'
									: ''}"
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- Mobile Menu Toggle -->
			<button
				class="ax-top-bar__toggle"
				aria-label="Toggle navigation menu"
				aria-expanded={menuOpen}
				onclick={toggleMenu}
			>
				<span class="ax-top-bar__burger {menuOpen ? 'open' : ''}"></span>
			</button>
		{/if}
	</div>

	<!-- Mobile Menu (Offcanvas) -->
	{#if showNav}
		<Offcanvas bind:open={menuOpen} position="right" showCloseButton={false}>
			<nav class="ax-top-bar__mobile-nav">
				<div class="ax-top-bar__mobile-header">
					<span class="ax-top-bar__mobile-title">Menu</span>
				</div>
				<ul class="ax-top-bar__mobile-list">
					{#each navItems as item}
						<li class="ax-top-bar__mobile-item">
							<a
								href={item.href}
								class="ax-top-bar__mobile-link {currentPath === item.href
									? 'ax-top-bar__mobile-link--active'
									: ''}"
								onclick={() => (menuOpen = false)}
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</Offcanvas>
	{/if}
</header>

<style>
	.ax-top-bar {
		background: var(--color-surface);
		border-bottom: var(--line-thin) solid var(--color-outline-variant);
		transition: all var(--duration-base) ease-in-out;
		position: relative;
		z-index: 100;
	}

	.ax-top-bar--sticky {
		position: sticky;
		top: 0;
	}

	.ax-top-bar__container {
		max-width: var(--container-base);
		margin: 0 auto;
		padding: var(--space-2) var(--space-8);
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 56px; /* Minimalist height */
	}

	.ax-top-bar__branding {
		flex-shrink: 0;
	}

	.ax-top-bar__nav--desktop {
		display: none;
	}

	.ax-top-bar__list {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: var(--space-6); /* More spacing for minimalist look */
	}

	.ax-top-bar__link {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--color-on-surface-variant);
		text-decoration: none;
		padding: var(--space-1) var(--space-2);
		border-radius: var(--space-1);
		transition: all var(--duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		display: block;
		outline: none;
		position: relative;
		/* Zero Displacement */
		box-shadow: inset 0 0 0 0 var(--color-primary);
	}

	.ax-top-bar__link:hover {
		color: var(--color-primary);
	}

	.ax-top-bar__link--active {
		color: var(--color-primary);
		font-weight: 700;
	}

	.ax-top-bar__link:focus-visible {
		box-shadow: inset 0 0 0 1px var(--color-primary);
	}

	.ax-top-bar__toggle {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: none;
		border: 1px solid transparent;
		border-radius: var(--space-1);
		cursor: pointer;
		width: 40px;
		height: 40px;
		padding: 0;
		color: var(--color-on-surface);
		z-index: 201; /* Ensure above offcanvas if needed, though offcanvas has close button inside */
	}

	.ax-top-bar__toggle:hover {
		color: var(--color-primary);
	}

	.ax-top-bar__burger {
		width: 18px;
		height: 1.5px;
		background: currentColor;
		position: relative;
		transition: all var(--duration-fast) ease-in-out;
	}

	.ax-top-bar__burger::before,
	.ax-top-bar__burger::after {
		content: '';
		position: absolute;
		width: 18px;
		height: 1.5px;
		background: currentColor;
		transition: all var(--duration-fast) ease-in-out;
	}

	.ax-top-bar__burger::before {
		transform: translateY(-5px);
	}

	.ax-top-bar__burger::after {
		transform: translateY(5px);
	}

	.ax-top-bar__burger.open {
		background: transparent;
	}

	.ax-top-bar__burger.open::before {
		transform: rotate(45deg);
	}

	.ax-top-bar__burger.open::after {
		transform: rotate(-45deg);
	}

	/* Mobile Menu Styles */
	.ax-top-bar__mobile-header {
		margin-bottom: var(--space-6);
		padding-bottom: var(--space-4);
		border-bottom: var(--line-thin) solid var(--color-outline-variant);
	}

	.ax-top-bar__mobile-title {
		font-family: var(--font-sans);
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-on-surface);
	}

	.ax-top-bar__mobile-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.ax-top-bar__mobile-link {
		display: block;
		padding: var(--space-3) var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-on-surface-variant);
		text-decoration: none;
		border-left: 2px solid transparent;
		transition: all var(--duration-fast) ease-out;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.ax-top-bar__mobile-link:hover,
	.ax-top-bar__mobile-link--active {
		color: var(--color-primary);
		background-color: var(--color-surface-container-low);
		border-left-color: var(--color-primary);
	}

	@media (min-width: 768px) {
		.ax-top-bar__nav--desktop {
			display: block;
		}

		.ax-top-bar__toggle {
			display: none;
		}
	}
</style>
