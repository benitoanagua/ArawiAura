import type { Snippet } from 'svelte';

export interface CarouselProps {
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  children?: Snippet;
}

export interface CarouselItemProps {
  children?: Snippet;
}

export interface CarouselContext {
  registerItem: (item: any) => number;
  currentIndex: number;
}