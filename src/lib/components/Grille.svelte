<script lang="ts">
	import type { GapSize, GrilleProps } from '$lib/types/grille.js';
	
	export let columns: number = 1;
	export let gap: GapSize = 'md';
	export let responsive: boolean = true;
	
	let columnClass = responsive 
		? `grille--cols-${columns}` 
		: `grille--cols-${columns}-fixed`;
</script>

<div class={`grille ${columnClass} grille--gap-${gap}`}>
	<slot />
</div>

<style>
	.grille {
		display: grid;
		gap: var(--space-4);
	}
	
	/* Gap sizes */
	.grille--gap-xs { gap: var(--space-1); }
	.grille--gap-sm { gap: var(--space-2); }
	.grille--gap-md { gap: var(--space-4); }
	.grille--gap-lg { gap: var(--space-6); }
	.grille--gap-xl { gap: var(--space-8); }
	
	/* Responsive columns */
	.grille--cols-1 { grid-template-columns: 1fr; }
	.grille--cols-2 { grid-template-columns: repeat(2, 1fr); }
	.grille--cols-3 { grid-template-columns: repeat(3, 1fr); }
	.grille--cols-4 { grid-template-columns: repeat(4, 1fr); }
	.grille--cols-5 { grid-template-columns: repeat(5, 1fr); }
	.grille--cols-6 { grid-template-columns: repeat(6, 1fr); }
	
	/* Fixed columns (non-responsive) */
	.grille--cols-1-fixed { grid-template-columns: 1fr; }
	.grille--cols-2-fixed { grid-template-columns: repeat(2, minmax(0, 1fr)); }
	.grille--cols-3-fixed { grid-template-columns: repeat(3, minmax(0, 1fr)); }
	.grille--cols-4-fixed { grid-template-columns: repeat(4, minmax(0, 1fr)); }
	.grille--cols-5-fixed { grid-template-columns: repeat(5, minmax(0, 1fr)); }
	.grille--cols-6-fixed { grid-template-columns: repeat(6, minmax(0, 1fr)); }
	
	/* Responsive behavior */
	@media (max-width: 768px) {
		.grille--cols-2,
		.grille--cols-3,
		.grille--cols-4,
		.grille--cols-5,
		.grille--cols-6 {
			grid-template-columns: 1fr;
		}
		
		.grille--cols-2-fixed { grid-template-columns: 1fr; }
		.grille--cols-3-fixed { grid-template-columns: 1fr; }
		.grille--cols-4-fixed { grid-template-columns: 1fr; }
		.grille--cols-5-fixed { grid-template-columns: 1fr; }
		.grille--cols-6-fixed { grid-template-columns: 1fr; }
	}
	
	@media (min-width: 769px) and (max-width: 1024px) {
		.grille--cols-3,
		.grille--cols-4,
		.grille--cols-5,
		.grille--cols-6 {
			grid-template-columns: repeat(2, 1fr);
		}
		
		.grille--cols-4-fixed { grid-template-columns: repeat(2, minmax(0, 1fr)); }
		.grille--cols-5-fixed { grid-template-columns: repeat(2, minmax(0, 1fr)); }
		.grille--cols-6-fixed { grid-template-columns: repeat(2, minmax(0, 1fr)); }
	}
	
	@media (min-width: 1025px) and (max-width: 1440px) {
		.grille--cols-4,
		.grille--cols-5,
		.grille--cols-6 {
			grid-template-columns: repeat(3, 1fr);
		}
		
		.grille--cols-5-fixed { grid-template-columns: repeat(3, minmax(0, 1fr)); }
		.grille--cols-6-fixed { grid-template-columns: repeat(3, minmax(0, 1fr)); }
	}
</style>