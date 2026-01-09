import type { Snippet } from 'svelte';

export type OffcanvasPosition = 'left' | 'right';

export interface OffcanvasProps {
    open?: boolean;
    position?: OffcanvasPosition;
    children?: Snippet;
    class?: string;
    showCloseButton?: boolean;
    onclose?: () => void;
}
