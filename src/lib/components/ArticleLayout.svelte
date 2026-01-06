<script lang="ts">
  export let title: string = '';
  export let subtitle: string = '';
  export let date: string = '';
  export let author: string = '';
  export let readingTime: number = 0;
  export let category: string = '';
  
  // Formatear fecha para display
  $: formattedDate = date ? new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';
</script>

<article class="article-layout">
  <header class="article-layout__header">
    {#if category}
      <div class="text-accent font-mono text-sm tracking-wide mb-4">
        {category.toUpperCase()}
      </div>
    {/if}
    
    <h1 class="article-layout__title">
      {title}
    </h1>
    
    {#if subtitle}
      <p class="article-layout__subtitle">
        {subtitle}
      </p>
    {/if}
    
    <div class="article-layout__meta">
      {#if date}
        <time datetime={date}>{formattedDate}</time>
      {/if}
      {#if readingTime}
        <span>{readingTime} min de lectura</span>
      {/if}
      {#if author}
        <span>Por {author}</span>
      {/if}
    </div>
  </header>
  
  <div class="article-layout__content">
    <slot />
  </div>
</article>
