// place files you want to import through the `$lib` alias in this folder.

// Components
export { default as Accordion } from './components/Accordion.svelte';
export { default as AccordionItem } from './components/AccordionItem.svelte';
export { default as Pressable } from './components/Pressable.svelte';
export { default as Card } from './components/Card.svelte';
export { default as Carousel } from './components/Carousel.svelte';
export { default as CarouselItem } from './components/CarouselItem.svelte';
export { default as Grille } from './components/Grille.svelte';
export { default as GrilleItem } from './components/GrilleItem.svelte';
export { default as Heading } from './components/Heading.svelte';
export { default as TopBar } from './components/TopBar.svelte';
export { default as Logo } from './components/Logo.svelte';
export { default as Modal } from './components/Modal.svelte';
export { default as Offcanvas } from './components/Offcanvas.svelte';
export { default as Overlay } from './components/Overlay.svelte';

export { default as Tab } from './components/Tab.svelte';
export { default as TabPanel } from './components/TabPanel.svelte';
export { default as Tabs } from './components/Tabs.svelte';
export { default as ThemeSwitcher } from './components/ThemeSwitcher.svelte';

// Types
export type * from './types/accordion';
export type * from './types/pressable';
export type * from './types/card';
export type * from './types/carousel';
export type * from './types/hero';
export type * from './types/grille';
export type * from './types/top-bar';
export type * from './types/logo';
export type * from './types/modal';
export type * from './types/offcanvas';
export type * from './types/overlay';
export type * from './types/page-meta';
export type * from './types/pressable';
export type * from './types/tabs';
export type * from './types/theme-switcher';

// Utilities (deprecated - use Heading component instead)
export { escapeHtml } from './utils/title-renderer';