<script lang="ts">
	import { getContext, onMount, onDestroy } from 'svelte';
	import type { GrilleItemProps, GrilleContext } from '$lib/types/grille.js';

	let { children }: GrilleItemProps = $props();

	const grille = getContext<GrilleContext & { getItemIndex: (id: number) => number }>('grille');

	let myId = -1;
	let innerWidth = $state(0);

	onMount(() => {
		if (grille) {
			myId = grille.registerItem();
		}
	});

	onDestroy(() => {
		if (grille && myId !== -1) {
			grille.unregisterItem(myId);
		}
	});

	// Grid math logic
	const isMobile = $derived(innerWidth < 768);
	const columns = $derived(isMobile ? grille.mobile : grille.desktop);
	const index = $derived(grille.getItemIndex(myId));

	const gridState = $derived.by(() => {
		if (index === -1 || columns === 0) return null;

		const length = grille.itemCount;
		const divInt = Math.floor(length / columns);
		const divMod = length % columns;
		const rows = divMod > 0 ? divInt + 1 : divInt;
		const row = Math.floor(index / columns) + 1;
		const col = index % columns; // 0 to columns-1

		return { rows, row, col };
	});

	const padding = $derived(grille.gap === 'small' ? 8 : grille.gap === 'medium' ? 16 : 24);

	const width = $derived.by(() => {
		if (!gridState || grille.containerWidth === 0) return 'auto';

		// Subtract 1px to account for the container's border-left
		// And add a small sub-pixel buffer (0.5px) to prevent resize loops
		const effectiveAvailableWidth = grille.containerWidth - 1.5;

		const availableWidth = effectiveAvailableWidth - 2 * padding * (columns - 1);
		const widthBase = Math.floor(availableWidth / columns);
		const borderCorrection = gridState.col < columns - 1 ? 1 : 0;

		return `${widthBase - borderCorrection}px`;
	});

	const hasRightBorder = $derived(gridState && gridState.col < columns - 1);
	const hasBottomBorder = $derived(gridState && gridState.row < gridState.rows);

	const borderColor = 'var(--color-outline-variant)';

	const itemStyles = $derived.by(() => {
		if (!gridState) return '';

		let styles = `width: ${width}; box-sizing: content-box;`;

		if (hasRightBorder) {
			styles += ` padding-right: ${padding}px; margin-right: ${padding}px; border-right: 1px solid ${borderColor};`;
		}

		if (hasBottomBorder) {
			styles += ` padding-bottom: ${padding}px; margin-bottom: ${padding}px; border-bottom: 1px solid ${borderColor};`;
		}

		if (hasRightBorder && hasBottomBorder) {
			const gradientSize = Math.round((2 * padding * Math.sqrt(2)) / 4 + 1);
			styles += ` border-image: linear-gradient(315deg, transparent ${gradientSize}px, ${borderColor} 0) 1;`;
		}

		return styles;
	});
</script>

<svelte:window bind:innerWidth />

<div class="ax-grille-item" style={itemStyles}>
	<div class="ax-grille-item__content">
		{@render children?.()}
	</div>
</div>

<style>
	.ax-grille-item {
		display: flex;
		flex-direction: column;
		position: relative;
		flex: 0 0 auto; /* Prevent growing or shrinking beyond explicit px width */
		transition: none !important;
	}

	.ax-grille-item__content {
		width: 100%;
		height: 100%;
	}
</style>
