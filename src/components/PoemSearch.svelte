<!-- src/components/PoemSearch.svelte -->
<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { onMount } from "svelte";

  export let poems: {
    slug: string;
    title: string;
    lang: string;
    body: string;
  }[] = [];
  export let lang: "es" | "en";

  let open = false;
  let query = "";
  let searchLang = lang; // idioma de búsqueda
  let results: typeof poems = [];

  $: if (query) {
    const q = query.toLowerCase();
    results = poems
      .filter((p) => p.lang === searchLang)
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)
      )
      .slice(0, 10);
  } else {
    results = [];
  }

  function openModal() {
    open = true;
    query = "";
  }
  function closeModal() {
    open = false;
  }
  function focusInput() {
    const el = document.getElementById("search-input") as HTMLInputElement;
    el?.focus();
  }

  const esc = (e: KeyboardEvent) => e.key === "Escape" && closeModal();

  onMount(() => {
    if (open) window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  });

  $: if (open) {
    window.addEventListener("keydown", esc);
    setTimeout(focusInput, 50);
  } else {
    window.removeEventListener("keydown", esc);
  }
</script>

<!-- Botón flotante -->
<button
  on:click={openModal}
  class="fixed bottom-6 right-6 bg-stone-900 text-white rounded-full p-3 shadow-lg z-40"
  aria-label={lang === "es" ? "Buscar poemas" : "Search poems"}
>
  🔍
</button>

<!-- Modal -->
{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events (overlay is only for backdrop-click) -->
  <div
    class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
    role="dialog"
    tabindex="-1"
    on:click|self={closeModal}
    transition:fade={{ duration: 200 }}
  >
    <div
      class="bg-white dark:bg-stone-800 rounded-xl shadow-2xl w-full max-w-lg"
      transition:scale={{ duration: 200, start: 0.95 }}
    >
      <!-- Cabecera -->
      <div class="flex items-center justify-between border-b px-4 py-3">
        <div class="flex items-center gap-2 text-sm">
          <span>{lang === "es" ? "Idioma:" : "Language:"}</span>
          <select
            bind:value={searchLang}
            on:change={focusInput}
            class="bg-transparent border-none outline-none cursor-pointer"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
        </div>
        <button
          on:click={closeModal}
          class="text-2xl leading-none text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      <!-- Input -->
      <input
        id="search-input"
        type="search"
        bind:value={query}
        placeholder={searchLang === "es" ? "Buscar…" : "Search…"}
        class="w-full bg-transparent px-4 py-3 text-lg outline-none"
      />

      <!-- Resultados -->
      <ul class="max-h-80 overflow-y-auto p-4 space-y-2">
        {#each results as p (p.slug)}
          <li>
            <a
              href={`/${p.slug}/`}
              class="block hover:bg-stone-100 dark:hover:bg-stone-700 p-2 rounded"
              on:click={closeModal}
            >
              {p.title}
            </a>
          </li>
        {:else}
          <li class="text-center text-stone-400">
            {query
              ? searchLang === "es"
                ? "Sin resultados"
                : "No results"
              : searchLang === "es"
                ? "Empieza a escribir…"
                : "Start typing…"}
          </li>
        {/each}
      </ul>
    </div>
  </div>
{/if}
