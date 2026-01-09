import type { Snippet } from 'svelte';

export type GapSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GapValue = 'small' | 'medium' | 'large';

export interface GrilleProps {
  desktop?: number;
  mobile?: number;
  gap?: GapValue;
  children?: Snippet;
}

export interface GrilleItemProps {
  children?: Snippet;
}

export interface GrilleContext {
  registerItem: () => number;
  unregisterItem: (id: number) => void;
  containerWidth: number;
  desktop: number;
  mobile: number;
  gap: GapValue;
  itemCount: number;
}