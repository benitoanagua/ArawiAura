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
export { default as Container } from './components/Container.svelte';

// Types
export type * from './types/Accordion';
export type * from './types/Pressable';
export type * from './types/Card';
export type * from './types/Carousel';
export type * from './types/Hero';
export type * from './types/Grille';
export type * from './types/TopBar';
export type * from './types/Logo';
export type * from './types/Modal';
export type * from './types/Offcanvas';
export type * from './types/Overlay';
export type * from './types/BottomBar';
export type * from './types/Tabs';
export type * from './types/ThemeSwitcher';
export type * from './types/Container';
export type * from './types/ContentBox';
export type * from './types/Drop';
export type * from './types/Heading';
export type * from './types/Input';
export type * from './types/LoadingSpinner';
export type * from './types/Table';
export type * from './types/Toast';

// Utilities (deprecated - use Heading component instead)
export { escapeHtml } from './utils/title-renderer';
