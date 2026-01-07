// Tipos para el componente Grille

export type GapSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface GrilleItemProps {
  colSpan?: number;
  rowSpan?: number;
  alignSelf?: 'start' | 'end' | 'center' | 'stretch';
  justifySelf?: 'start' | 'end' | 'center' | 'stretch';
}

export interface GrilleProps {
  columns?: number;
  gap?: GapSize;
  responsive?: boolean;
  children?: any;
}