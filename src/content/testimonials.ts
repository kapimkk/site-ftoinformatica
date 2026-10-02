import type { Testimonial } from '../types/content';

export const demonstrationTestimonials: readonly Testimonial[] = [
  {
    id: 'exemplo-notebook',
    quote:
      'Exemplo de depoimento: o diagnóstico do notebook foi explicado antes de qualquer troca de peça.',
    author: 'Cliente exemplo',
    context: 'Uso pessoal · demonstração de layout',
    demonstration: true,
  },
  {
    id: 'exemplo-celular',
    quote:
      'Exemplo de depoimento: deixei o celular com a tela danificada e aprovei o orçamento antes do reparo.',
    author: 'Cliente exemplo',
    context: 'Trabalho · demonstração de layout',
    demonstration: true,
  },
  {
    id: 'exemplo-impressora',
    quote:
      'Exemplo de depoimento: a impressora do escritório voltou a imprimir e a orientação de uso veio junto.',
    author: 'Cliente exemplo',
    context: 'Escritório · demonstração de layout',
    demonstration: true,
  },
];
