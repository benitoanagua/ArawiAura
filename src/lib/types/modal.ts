import type { Snippet } from 'svelte';

// Tipos para el componente Modal

export type ModalMaxWidth = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  open?: boolean;
  title?: string;
  closable?: boolean;
  backdrop?: boolean;
  maxWidth?: ModalMaxWidth;
  children: Snippet;
  class?: string;
}