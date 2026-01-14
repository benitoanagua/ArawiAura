import type { Snippet } from 'svelte';

export interface AccordionContext {
	toggle: (index: number) => void;
	isOpen: (index: number) => boolean;
}

export interface AccordionItemProps {
	title?: string;
	index: number;
	isOpen?: (index: number) => boolean;
	toggle?: (index: number) => void;
	children: Snippet;
}

export interface AccordionProps {
	multiple?: boolean;
	children: Snippet;
}
