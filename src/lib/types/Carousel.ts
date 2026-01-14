import type { Snippet } from 'svelte';

export type CarouselGap = 'none' | 'small' | 'medium' | 'large';

export interface CarouselContext {
	currentIndex: number;
	itemsPerView: number;
	gapValue: number;
	itemWidth: number;
	isDragging: boolean;
	registerItem: () => number;
	unregisterItem: (index: number) => void;
	class?: string;
}

export interface CarouselItemProps {
	children: Snippet;
	class?: string;
}

export interface CarouselProps {
	desktop?: number;
	mobile?: number;
	gap?: CarouselGap;
	interval?: number;
	autoPlay?: boolean;
	showArrows?: boolean;
	showDots?: boolean;
	children: Snippet;
	class?: string;
}
