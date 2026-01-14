import type { Snippet } from 'svelte';

export type ContentBoxHeading = 1 | 2 | 3 | 4 | 5 | 6;
export type ContentBoxDensity = 'minimal' | 'compact' | 'normal' | 'comfortable';
export type ContentBoxMediaAlign = 'left' | 'right' | 'top' | 'bottom';
export type ContentBoxMediaWidth =
	| 'is-one-fifth'
	| 'is-one-quarter'
	| 'is-one-third'
	| 'is-two-fifths'
	| 'is-half';
export type ContentBoxAspectRatio = 'monitor' | 'square' | 'video';
export type ContentBoxElevation = 0 | 1 | 2 | 3;

export interface ContentBoxProps {
	title?: string;
	url?: string;
	excerpt?: string;
	featureImage?: string;
	tagName?: string;
	tagUrl?: string;
	authorName?: string;
	authorUrl?: string;
	authorProfileImage?: string;
	mediaAlign?: ContentBoxMediaAlign;
	mediaWidth?: ContentBoxMediaWidth;
	headingLevel?: ContentBoxHeading;
	density?: ContentBoxDensity;
	aspectRatio?: ContentBoxAspectRatio;
	readingTime?: string;
	publishedAt?: string;
	elevation?: ContentBoxElevation;
	children?: Snippet;
	class?: string;
}
