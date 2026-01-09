import type { Snippet } from 'svelte';

export type CarouselGap = 'none' | 'small' | 'medium' | 'large';

export interface CarouselProps {
  desktop?: number;
  mobile?: number;
  gap?: CarouselGap;
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  children?: Snippet;
  class?: string;
}

export interface CarouselItemProps {
  children?: Snippet;
  class?: string;
}

export interface CarouselContext {
  registerItem: (item: any) => number;
  unregisterItem: (index: number) => void;
  currentIndex: number;
  itemsPerView: number;
  gapValue: number;
  itemWidth: number;
  isDragging: boolean;
}