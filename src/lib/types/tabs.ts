import type { Snippet } from 'svelte';

export type TabVariant = 'line' | 'boxed';

export interface TabsContext {
  state: {
    activeIndex: number;
    variant: TabVariant;
  };
  setActiveIndex: (index: number) => void;
}

export interface TabsProps {
  activeTab?: number;
  variant?: TabVariant;
  children: Snippet;
  class?: string;
}

export interface TabProps {
  index: number;
  label?: string;
  children?: Snippet; // Content of the button/tab
  class?: string;
}

export interface TabPanelProps {
  index: number;
  children: Snippet;
  class?: string;
}