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

<header class="site-header">
  <div class="site-header__container">
    <a href="/" class="site-header__logo">
      {siteTitle}
    </a>
    
    <nav class="site-header__nav">
      {#each navigation as item}
        <a 
          href={item.href} 
          class="site-header__nav-link {currentPath === item.href ? 'site-header__nav-link--active' : ''}"
        >
          {item.name}
        </a>
      {/each}
    </nav>
    
    <!-- Mobile menu button -->
    <button 
      type="button" 
      class="mobile-menu-button"
      class:mobile-menu--open={mobileMenuOpen}
      on:click={toggleMobileMenu}
      aria-label="Toggle navigation menu"
      aria-expanded={mobileMenuOpen}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
  
  <!-- Mobile Navigation -->
  {#if mobileMenuOpen}
    <div 
      class="mobile-menu mobile-menu--open"
      role="dialog" 
      aria-modal="true" 
      aria-label="Menú de navegación"
      tabindex="-1"
      on:click={closeMobileMenu}
      on:keydown={(e) => e.key === 'Escape' && closeMobileMenu()}
    >
      <nav class="mobile-menu__nav">
        {#each navigation as item}
          <a 
            href={item.href} 
            class="mobile-menu__nav-link {currentPath === item.href ? 'site-header__nav-link--active' : ''}"
          >
            {item.name}
          </a>
        {/each}
      </nav>
    </div>
  {/if}
</header>
