// Tipos para el componente Accordion

export interface AccordionItemProps {
  title: string;
  index: number;
  isOpen?: (index: number) => boolean;
  toggle?: (index: number) => void;
}

export interface AccordionProps {
  multiple?: boolean;
  children?: any;
}