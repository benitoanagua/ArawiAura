import type { Snippet } from 'svelte';

export interface HeroProps {
    title?: string;
    subtitle?: string;
    children?: Snippet;
    class?: string;
}
