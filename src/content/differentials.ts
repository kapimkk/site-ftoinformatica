import type { Differential } from '../types/content';

export const differentials: readonly Differential[] = [
  {
    id: 'diagnosis',
    title: 'Diagnóstico em linguagem direta',
    description:
      'Você recebe a explicação do que foi encontrado, sem precisar traduzir um laudo sozinho.',
  },
  {
    id: 'quote',
    title: 'Orçamento antes da execução',
    description:
      'Peça, serviço e prazo estimado aparecem para autorização. O reparo não segue no escuro.',
  },
  {
    id: 'data',
    title: 'Cuidado com os arquivos',
    description:
      'Quando o serviço mexe no sistema, o backup é orientado e o acesso fica limitado ao necessário.',
  },
  {
    id: 'audience',
    title: 'Pessoa física e empresa',
    description:
      'O mesmo critério vale para um celular pessoal e para a impressora que segura o escritório.',
  },
  {
    id: 'communication',
    title: 'Aviso se o caminho mudar',
    description:
      'Se o diagnóstico abrir uma etapa que não estava no orçamento, você é consultado antes.',
  },
  {
    id: 'delivery',
    title: 'Entrega com orientação',
    description: 'Na devolução, explicamos o que foi feito e o que observar no uso do equipamento.',
  },
];
