import type { Indicator } from '../types/content';

export const serviceIndicators: readonly Indicator[] = [
  {
    id: 'frentes',
    value: '04',
    label: 'Frentes de serviço',
    detail: 'Notebooks, celulares, impressoras e suporte de informática.',
  },
  {
    id: 'etapas',
    value: '05',
    label: 'Etapas do atendimento',
    detail: 'Do primeiro contato à orientação na entrega.',
  },
  {
    id: 'autorizacao',
    value: '01',
    label: 'Autorização',
    detail: 'O reparo segue depois que o orçamento é aprovado.',
  },
  {
    id: 'atalho',
    value: '00',
    label: 'Atalho sem explicação',
    detail: 'O diagnóstico é contado em linguagem direta antes da execução.',
  },
];
