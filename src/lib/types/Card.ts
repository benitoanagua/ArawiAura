import type { Snippet } from 'svelte';

export type CardElevation = 0 | 1 | 2 | 3;
export type CardDensity = 'compact' | 'normal' | 'comfortable';

export interface CardProps {
	elevation?: CardElevation;
	density?: CardDensity;
	class?: string;

	// Non-conventional slot names
	top?: Snippet;
	body?: Snippet;
	footer?: Snippet;

	// Fallback content slot for compatibility
	children?: Snippet;
}
