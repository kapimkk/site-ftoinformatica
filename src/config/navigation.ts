import type { NavItem } from '../types/navigation';

export const NAV_ITEMS = [
  { id: 'servicos', label: 'Serviços', href: '#servicos' },
  { id: 'notebooks', label: 'Notebooks', href: '#notebooks' },
  { id: 'celulares', label: 'Celulares', href: '#celulares' },
  { id: 'impressoras', label: 'Impressoras', href: '#impressoras' },
  { id: 'suporte', label: 'Suporte', href: '#suporte' },
  { id: 'atendimento', label: 'Atendimento', href: '#atendimento' },
  { id: 'contato', label: 'Contato', href: '#contato' },
] as const satisfies readonly NavItem[];

export const FOOTER_NAV_ITEMS = [
  ...NAV_ITEMS,
  { id: 'diferenciais', label: 'Diferenciais', href: '#diferenciais' },
  { id: 'duvidas', label: 'Dúvidas', href: '#duvidas' },
  { id: 'orcamento', label: 'Orçamento', href: '#orcamento' },
] as const satisfies readonly NavItem[];

export const SECTION_IDS: readonly string[] = NAV_ITEMS.map((item) => item.id);

export const DESKTOP_NAV_QUERY = '(min-width: 1100px)';
