// Tipos para el componente Overlay

export interface OverlayProps {
  open?: boolean;
  backdrop?: boolean;
  closable?: boolean;
  zIndex?: number;
  children?: any;
}