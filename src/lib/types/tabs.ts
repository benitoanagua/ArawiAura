// Tipos para los componentes Tab

export type TabVariant = 'line' | 'boxed';

export interface TabProps {
  label: string;
  index: number;
  activeIndex: number;
  registerTab: (tab: any) => number;
  activateTab: (index: number) => void;
}

export interface TabPanelProps {
  index: number;
  activeIndex: number;
}

export interface TabsProps {
  activeTab?: number;
  variant?: TabVariant;
  children?: any;
}