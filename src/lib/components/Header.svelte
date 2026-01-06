<script lang="ts">
	export let siteTitle: string = '';
	export let currentPath: string = '/';

	let mobileMenuOpen = false;

	const navigation = [
		{ name: 'Inicio', href: '/' },
		{ name: 'Blog', href: '/blog' },
		{ name: 'Sobre', href: '/about' },
		{ name: 'Contacto', href: '/contact' }
	];

	const toggleMobileMenu = () => {
		mobileMenuOpen = !mobileMenuOpen;
	};

	const closeMobileMenu = () => {
		mobileMenuOpen = false;
	};
</script>

<header class="editorial-header">
	<div class="editorial-header__container">
		<a href="/" class="editorial-header__logo">
			<span class="logo-text">{siteTitle}</span>
		</a>

		<!-- Línea estructural -->
		<div class="editorial-header__divider"></div>

		<nav class="editorial-header__nav">
			{#each navigation as item}
				<a
					href={item.href}
					class="editorial-header__nav-link {currentPath === item.href ? 'active' : ''}"
				>
					<span class="nav-link__text">{item.name}</span>
					<span class="nav-link__line"></span>
				</a>
			{/each}
		</nav>
	</div>
</header>

<style>
	/* Header al estilo Linear Editorial */
	.editorial-header {
		position: sticky;
		top: 0;
		z-index: 1000;
		background: rgba(255, 255, 255, 0.98);
		backdrop-filter: blur(10px);
		border-bottom: var(--line-thin) solid var(--border-light);
		padding: var(--space-6) 0;
	}

	.editorial-header__container {
		max-width: var(--container-narrow);
		margin: 0 auto;
		padding: 0 var(--space-6);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-8);
	}

	.editorial-header__logo {
		font-family: var(--font-sans);
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--text-primary);
		text-decoration: none;
		letter-spacing: -0.01em;
	}

	.editorial-header__divider {
		flex: 1;
		height: var(--line-thin);
		background: var(--border-light);
		margin: 0 var(--space-4);
	}

	.editorial-header__nav {
		display: flex;
		gap: var(--space-8);
	}

	.editorial-header__nav-link {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--text-secondary);
		text-decoration: none;
		position: relative;
		padding: var(--space-2) 0;
	}

	.editorial-header__nav-link:hover {
		color: var(--text-primary);
	}

	.editorial-header__nav-link.active {
		color: var(--text-primary);
	}

	.nav-link__line {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: var(--line-base);
		background: var(--text-primary);
		transition: width var(--duration-base) var(--ease-out);
	}

	.editorial-header__nav-link:hover .nav-link__line,
	.editorial-header__nav-link.active .nav-link__line {
		width: 100%;
	}
</style>
