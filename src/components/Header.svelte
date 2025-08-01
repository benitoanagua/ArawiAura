<script lang="ts">
  import { fade, fly } from "svelte/transition";

  export let lang: "es" | "en";
  export let title: string;
  export let nav: Array<{ label: string; href: string }>;
  let open = false;
</script>

<header class="border-b border-stone-200 dark:border-stone-800">
  <nav
    class="container mx-auto flex items-center justify-between py-4 px-4 md:px-6"
  >
    <!-- Logo -->
    <a href={`/${lang}/`} class="text-xl md:text-2xl font-serif tracking-tight">
      {title}
    </a>

    <!-- Desktop nav -->
    <ul class="hidden md:flex gap-x-6 text-sm uppercase tracking-wider">
      {#each nav as item}
        <li>
          <a href={item.href} class="hover:text-teal-600 transition-colors"
            >{item.label}</a
          >
        </li>
      {/each}
    </ul>

    <!-- Desktop lang -->
    <div class="hidden md:flex gap-x-2 text-sm">
      <a href="/en/" class={lang === "en" ? "font-bold" : ""}>EN</a>
      <span>/</span>
      <a href="/es/" class={lang === "es" ? "font-bold" : ""}>ES</a>
    </div>

    <!-- Mobile hamburger -->
    <button
      class="md:hidden text-stone-600 dark:text-stone-400"
      aria-label={lang === "es" ? "Abrir menú" : "Open menu"}
      on:click={() => (open = !open)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {#if open}
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        {:else}
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        {/if}
      </svg>
    </button>
  </nav>

  <!-- Mobile drawer -->
  {#if open}
    <!-- overlay -->
    <button
      class="md:hidden fixed inset-0 bg-black/60 z-40"
      aria-label={lang === "es" ? "Cerrar overlay" : "Close overlay"}
      on:click={() => (open = false)}
      transition:fade={{ duration: 200 }}
    ></button>

    <!-- panel -->
    <div
      class="md:hidden fixed top-0 right-0 h-full w-64 bg-white dark:bg-stone-900 shadow-xl z-50
             flex flex-col p-6 space-y-4"
      transition:fly={{ x: 300, duration: 300 }}
    >
      <button
        class="self-end text-2xl"
        aria-label={lang === "es" ? "Cerrar menú" : "Close menu"}
        on:click={() => (open = false)}
      >
        &times;
      </button>

      {#each nav as item}
        <a
          href={item.href}
          class="text-sm uppercase tracking-wider hover:text-teal-600"
          on:click={() => (open = false)}
        >
          {item.label}
        </a>
      {/each}

      <hr class="border-stone-300 dark:border-stone-700" />

      <div class="flex gap-x-2 text-sm">
        <a href="/en/" class={lang === "en" ? "font-bold" : ""}>EN</a>
        <span>/</span>
        <a href="/es/" class={lang === "es" ? "font-bold" : ""}>ES</a>
      </div>
    </div>
  {/if}
</header>
