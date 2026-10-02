import type { ProcessStep } from '../types/content';

export const processSteps: readonly ProcessStep[] = [
  {
    id: 'contato',
    title: 'Contato',
    description: 'Você chama por um canal publicado e informa o modelo e o defeito observado.',
  },
  {
    id: 'triagem',
    title: 'Triagem',
    description:
      'Confirmamos o equipamento, o sintoma e a forma de deixar o aparelho na assistência.',
  },
  {
    id: 'diagnostico',
    title: 'Diagnóstico',
    description: 'A avaliação separa peça, sistema, limpeza e o que pode esperar.',
  },
  {
    id: 'autorizacao',
    title: 'Autorização',
    description: 'O orçamento é apresentado. Sem a sua aprovação, o reparo não é executado.',
  },
  {
    id: 'entrega',
    title: 'Entrega',
    description:
      'O equipamento volta com a orientação do que foi feito e do que acompanhar no uso.',
  },
];
