<script lang="ts">
	import type { TopBarProps } from '$lib/types/top-bar.js';
	import Logo from './Logo.svelte';
	import { slide } from 'svelte/transition';

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

	<!-- Mobile Nav Dropdown -->
	{#if showNav && menuOpen}
		<nav class="ax-top-bar__nav ax-top-bar__nav--mobile" transition:slide={{ duration: 200 }}>
			<ul class="ax-top-bar__list">
				{#each navItems as item}
					<li class="ax-top-bar__item">
						<a
							href={item.href}
							class="ax-top-bar__link {currentPath === item.href ? 'ax-top-bar__link--active' : ''}"
							onclick={() => (menuOpen = false)}
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
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

	.ax-top-bar__nav--mobile .ax-top-bar__link--active {
		box-shadow: inset 2px 0 0 0 var(--color-primary);
		padding-left: var(--space-3);
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

	/* Mobile Menu */
	.ax-top-bar__nav--mobile {
		background: var(--color-surface);
		border-bottom: var(--line-thin) solid var(--color-outline-variant);
		padding: var(--space-4);
		overflow: hidden;
	}

	.ax-top-bar__nav--mobile .ax-top-bar__list {
		flex-direction: column;
		gap: var(--space-3);
	}

	@media (min-width: 768px) {
		.ax-top-bar__nav--desktop {
			display: block;
		}

		.ax-top-bar__toggle,
		.ax-top-bar__nav--mobile {
			display: none;
		}
	}
</style>
