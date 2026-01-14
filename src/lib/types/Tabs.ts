import type { Snippet } from 'svelte';

export type TabVariant = 'line' | 'boxed' | 'pill';

export interface TabsState {
	activeIndex: number;
	variant: TabVariant;
}

export interface TabsContext {
	state: TabsState;
	setActiveIndex: (index: number) => void;
}

export interface TabProps {
	index: number;
	label?: string;
	disabled?: boolean;
	children?: Snippet;
	class?: string;
}

export interface TabPanelProps {
	label?: string;
	active?: boolean;
	index?: number;
	children: Snippet;
	class?: string;
}

export interface TabsProps {
	activeTab?: number;
	variant?: TabVariant;
	children: Snippet;
	class?: string;
}
