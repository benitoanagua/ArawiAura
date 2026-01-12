import type { Snippet } from 'svelte';

export type ContainerSize = 'base' | 'narrow' | 'wide' | 'full';
export type ContainerSpacing = 'tight' | 'normal' | 'loose' | 'none';

export interface ContainerProps {
    size?: ContainerSize;
    spacing?: ContainerSpacing;
    children?: Snippet;
    class?: string;
}