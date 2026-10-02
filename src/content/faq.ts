import type { FaqItem } from '../types/content';

export const faqItems: readonly FaqItem[] = [
  {
    id: 'defeito',
    question: 'Preciso saber o nome do defeito?',
    answer: 'Não. Conte o que o aparelho faz ou deixou de fazer.',
  },
  {
    id: 'inicio',
    question: 'O reparo começa na hora?',
    answer: 'Não. Primeiro vem o orçamento. Sem autorização, nada é executado.',
  },
  {
    id: 'arquivos',
    question: 'Os arquivos são recuperados?',
    answer: 'Não há garantia. Quando dá, o backup é orientado antes do serviço.',
  },
  {
    id: 'garantia',
    question: 'Tem garantia?',
    answer: 'A garantia do serviço feito é informada no orçamento.',
  },
];
