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
			
			<button 
				class="menu-toggle" 
				aria-label="Toggle navigation menu"
				on:click={toggleMenu}
			>
				<span class="menu-icon"></span>
				<span class="menu-icon"></span>
				<span class="menu-icon"></span>
			</button>
		{/if}
	</div>
</header>

<style>
	.site-header {
		background: var(--bg-white);
		border-bottom: var(--line-thin) solid var(--border-light);
	}
	
	.site-header--sticky {
		position: sticky;
		top: 0;
		z-index: 100;
	}
	
	.header-container {
		max-width: var(--container-base);
		margin: 0 auto;
		padding: var(--space-4) var(--space-8);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.header-branding {
		flex-shrink: 0;
	}
	
	.logo {
		display: block;
	}
	
	.logo-img {
		height: 2rem;
		width: auto;
	}
	
	.logo-text {
		font-family: var(--font-serif);
		font-size: var(--text-xl);
		font-weight: 600;
		color: var(--text-primary);
		text-decoration: none;
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
		gap: var(--space-6);
	}
	
	.nav-item {
		margin: 0;
	}
	
	.nav-link {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--text-primary);
		text-decoration: none;
		padding: var(--space-2) var(--space-3);
		border-radius: var(--space-1);
		transition: all var(--duration-fast) ease-out;
	}
	
	.nav-link:hover {
		background: var(--bg-cool);
		color: var(--accent-primary);
	}
	
	.nav-link--active {
		color: var(--accent-primary);
		font-weight: 600;
		background: var(--bg-cool);
	}
	
	.menu-toggle {
		display: none;
		flex-direction: column;
		background: none;
		border: none;
		cursor: pointer;
		padding: var(--space-2);
	}
	
	.menu-icon {
		width: 1.5rem;
		height: 2px;
		background: var(--text-primary);
		margin: 0.2rem 0;
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
			background: var(--bg-white);
			flex-direction: column;
			justify-content: center;
			transition: right var(--duration-base) ease-out;
			z-index: 200;
		}
		
		.nav-open {
			right: 0;
		}
		
		.nav-list {
			flex-direction: column;
			gap: 0;
			text-align: center;
		}
		
		.nav-link {
			display: block;
			padding: var(--space-4);
			border-bottom: var(--line-thin) solid var(--border-light);
		}
		
		.menu-toggle {
			display: flex;
		}
	}
</style>