import type { FaqItem } from '../types/content';

export const faqItems: readonly FaqItem[] = [
  {
    id: 'defeito',
    question: 'Preciso saber o nome técnico do defeito para chamar?',
    answer:
      'Não. Descreva o que o equipamento faz ou deixou de fazer. Identificar a causa faz parte do diagnóstico.',
  },
  {
    id: 'inicio',
    question: 'O reparo começa assim que o aparelho é deixado?',
    answer:
      'Não. Primeiro apresentamos o orçamento. A execução depende da autorização de quem solicitou o serviço.',
  },
  {
    id: 'arquivos',
    question: 'Os arquivos são recuperados?',
    answer:
      'Não há garantia de recuperação. Quando ainda é possível, orientamos o backup antes do serviço. O resultado depende do estado do equipamento.',
  },
  {
    id: 'marcas',
    question: 'Quais marcas entram no atendimento?',
    answer:
      'As linhas mais comuns de notebooks, celulares e impressoras. A viabilidade é confirmada na avaliação do aparelho, não por uma lista fechada neste site.',
  },
  {
    id: 'garantia',
    question: 'O serviço tem garantia?',
    answer:
      'A garantia do que foi executado é informada no orçamento. Não publicamos um prazo único porque ele depende do reparo feito.',
  },
  {
    id: 'perfil',
    question: 'Atendem pessoa física e empresa?',
    answer:
      'Sim. Os dois perfis passam pela mesma sequência: diagnóstico, orçamento e autorização.',
  },
  {
    id: 'busca',
    question: 'O equipamento é buscado em casa ou na empresa?',
    answer:
      'O atendimento padrão é a entrega na assistência. Visita ou busca, quando existem, são combinadas no contato e dependem da agenda.',
  },
];
