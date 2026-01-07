<script lang="ts">
	import type { GrilleItemProps } from '$lib/types/grille.js';
	
	export let colSpan: number = 1;
	export let rowSpan: number = 1;
	export let alignSelf: 'start' | 'end' | 'center' | 'stretch' = 'stretch';
	export let justifySelf: 'start' | 'end' | 'center' | 'stretch' = 'stretch';
</script>

<div 
	class="grille-item" 
	style:grid-column={`span ${colSpan}`}
	style:grid-row={`span ${rowSpan}`}
	style:align-self={alignSelf}
	style:justify-self={justifySelf}
>
	<slot />
</div>

<!-- No specific styles needed - inherits from parent grille -->