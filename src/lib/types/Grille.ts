import type { Snippet } from 'svelte';

export type GrilleGap = 'none' | 'small' | 'medium' | 'large';

export interface GrilleContext {
	registerItem: () => number;
	unregisterItem: (id: number) => void;
	getItemIndex: (id: number) => number;
	containerWidth: number;
	columns: number;
	gap: GrilleGap;
	itemCount: number;
}

export interface GrilleItemProps {
	children: Snippet;
}

export interface GrilleProps {
	desktop?: number;
	mobile?: number;
	gap?: GrilleGap;
	children: Snippet;
}
