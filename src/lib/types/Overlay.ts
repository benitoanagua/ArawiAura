import type { Snippet } from 'svelte';

export type OverlayAlign = 'start' | 'center' | 'end';
export type OverlayPosition = 'top' | 'center' | 'bottom';
export type OverlayBox = 'background' | 'border' | 'transparent';
export type OverlayFill = 'full' | 'gradient' | 'none';
export type OverlayAspectRatio = 'square' | 'video' | 'monitor' | 'portrait';

export interface OverlayProps {
	title: string;
	url: string;
	featureImage?: string;
	tagName?: string;
	authorName?: string;
	publishedAt?: string;
	readingTime?: string;
	aspectRatio?: OverlayAspectRatio;
	headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
	align?: OverlayAlign;
	position?: OverlayPosition;
	box?: OverlayBox;
	fill?: OverlayFill;
	showMeta?: boolean;
	compact?: boolean;
	children?: Snippet;
}
