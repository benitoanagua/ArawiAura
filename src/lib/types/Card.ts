import type { Snippet } from 'svelte';

export type CardElevation = 0 | 1 | 2 | 3;
export type CardDensity = 'compact' | 'normal' | 'comfortable';

export interface CardProps {
	elevation?: CardElevation;
	density?: CardDensity;
	// ContentBox-like properties for compatibility
	title?: string;
	url?: string;
	excerpt?: string;
	featureImage?: string;
	authorName?: string;
	authorUrl?: string;
	authorProfileImage?: string;
	tagName?: string;
	tagUrl?: string;
	readingTime?: string;
	publishedAt?: string;
	headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
	children?: Snippet;
	class?: string;
}
