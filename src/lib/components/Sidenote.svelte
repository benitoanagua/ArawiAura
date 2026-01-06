<script lang="ts">
  export let content: string = '';
  export let id: string | undefined = undefined;
  
  let expanded = false;
  
  const toggle = () => {
    expanded = !expanded;
  };
  
  // Generar ID único si no se proporciona
  $: noteId = id || `sn-${Math.random().toString(36).substr(2, 9)}`;
</script>

<label for={noteId} class="sidenote-toggle">⁺</label>
<input type="checkbox" id={noteId} class="sidenote-checkbox" bind:checked={expanded} />
<span class="sidenote">
  {@html content}
</span>
