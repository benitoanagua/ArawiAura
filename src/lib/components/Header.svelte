<script lang="ts">
	export let siteTitle: string = '';
	export let logoUrl: string = '';
	export let navItems: { label: string; href: string }[] = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{ label: 'Contact', href: '/contact' }
	];
	export let showLogo: boolean = true;
	export let showNav: boolean = true;
	export let sticky: boolean = false;
	export let currentPath: string = '/';

	let menuOpen = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<header class="site-header {sticky ? 'site-header--sticky' : ''}">
	<div class="header-container">
		<div class="header-branding">
			{#if showLogo && logoUrl}
				<a href="/" class="logo">
					<img src={logoUrl} alt={siteTitle} class="logo-img" />
				</a>
			{:else if showLogo}
				<a href="/" class="logo-text">{siteTitle}</a>
			{/if}
		</div>

		{#if showNav}
			<nav class="header-nav {menuOpen ? 'nav-open' : ''}">
				<ul class="nav-list">
					{#each navItems as item}
						<li class="nav-item">
							<a
								href={item.href}
								class="nav-link {currentPath === item.href ? 'nav-link--active' : ''}"
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<button class="menu-toggle" aria-label="Toggle navigation menu" on:click={toggleMenu}>
				<span class="menu-icon"></span>
				<span class="menu-icon"></span>
				<span class="menu-icon"></span>
			</button>
		{/if}
	</div>
</header>

<style>
	.site-header {
		background: var(--color-surface);
		border-bottom: var(--line-thin) solid var(--color-outline-variant);
		transition: all var(--duration-base) ease-in-out;
	}

	.site-header--sticky {
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.header-container {
		max-width: var(--container-base);
		margin: 0 auto;
		padding: var(--space-2) var(--space-8);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header-branding {
		flex-shrink: 0;
	}

	.logo-text {
		font-family: var(--font-serif);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-primary);
		text-decoration: none;
		letter-spacing: -0.02em;
	}

	.header-nav {
		display: flex;
		align-items: center;
	}

	.nav-list {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: var(--space-4);
	}

	.nav-link {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--color-on-surface-variant);
		text-decoration: none;
		padding: var(--space-2) var(--space-4);
		border: var(--line-thin) solid transparent;
		transition: all var(--duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.nav-link:hover {
		color: var(--color-primary);
		background-color: var(--color-surface-container-low);
	}

	.nav-link--active {
		color: var(--color-primary);
		border-bottom: var(--line-base) solid var(--color-primary);
	}

	.nav-link:focus-visible {
		box-shadow:
			0 0 0 2px var(--color-surface),
			0 0 0 4px var(--color-primary);
		outline: none;
	}

	.menu-toggle {
		display: none;
		flex-direction: column;
		background: none;
		border: 1px solid var(--color-outline);
		cursor: pointer;
		padding: var(--space-2);
		gap: 4px;
	}

	.menu-icon {
		width: 1.25rem;
		height: 2px;
		background: var(--color-on-surface);
		transition: all var(--duration-fast) ease-out;
	}

	@media (max-width: 768px) {
		.header-nav {
			position: fixed;
			top: 0;
			right: -100%;
			height: 100vh;
			width: 80%;
			max-width: 300px;
			background: var(--color-surface);
			flex-direction: column;
			justify-content: center;
			transition: right var(--duration-base) cubic-bezier(0.4, 0, 0.2, 1);
			z-index: 200;
			border-left: var(--line-thin) solid var(--color-outline-variant);
		}

		.nav-open {
			right: 0;
		}

		.nav-list {
			flex-direction: column;
			gap: var(--space-2);
			text-align: center;
			width: 100%;
		}

		.nav-link {
			display: block;
			padding: var(--space-6);
			border-bottom: var(--line-thin) solid var(--color-outline-variant);
		}

		.menu-toggle {
			display: flex;
		}
	}
</style>
