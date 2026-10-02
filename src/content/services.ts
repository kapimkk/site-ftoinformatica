import type { ServiceDefinition, ServiceId } from '../types/content';

export const serviceCatalog: Record<ServiceId, ServiceDefinition> = {
  notebooks: {
    id: 'notebooks',
    name: 'Notebooks',
    eyebrow: 'Reparo de notebooks',
    title: 'Notebook que não liga, esquenta ou perdeu a imagem',
    summary: 'Hardware e sistema avaliados antes de trocar peça ou formatar.',
    description:
      'O notebook costuma parar no meio do trabalho: tela apagada, bateria que não segura, teclado falhando ou máquina que desliga sozinha. A avaliação separa defeito de peça, sujeira, aquecimento e sistema.',
    symptomsTitle: 'O que costuma chegar na bancada',
    symptoms: [
      'Não liga, desliga sozinho ou reinicia',
      'Tela escura, com manchas, linhas ou quebrada',
      'Teclado, touchpad ou dobradiça com defeito',
      'Bateria que não carrega ou dura pouco',
      'Superaquecimento, barulho no cooler e lentidão',
      'Sistema que não inicia ou trava com frequência',
    ],
    workTitle: 'Como o reparo é conduzido',
    work: [
      'Leitura do sintoma antes de abrir o equipamento',
      'Limpeza interna quando o aquecimento pede manutenção',
      'Reparo de tela, teclado, bateria e conectores',
      'Apoio de sistema quando a causa não é só hardware',
    ],
    note: 'A troca de peça só entra no orçamento quando o diagnóstico aponta essa necessidade.',
  },
  celulares: {
    id: 'celulares',
    name: 'Celulares',
    eyebrow: 'Reparo de celulares',
    title: 'Tela, bateria, carga e falhas do uso diário',
    summary: 'Reparo do aparelho com backup orientado quando o serviço mexe no sistema.',
    description:
      'Celular com tela trincada, bateria que acaba cedo ou conector que falha atrapalha trabalho e estudo. O atendimento começa pelo que o aparelho está fazendo — sem prometer desbloqueio de conta ou contorno de segurança.',
    symptomsTitle: 'Defeitos mais comuns',
    symptoms: [
      'Tela trincada, sem imagem ou sem toque',
      'Bateria que descarrega rápido ou está inchada',
      'Não carrega ou o conector falha',
      'Áudio, microfone ou alto-falante com problema',
      'Travamentos e aplicativos que fecham',
      'Necessidade de backup antes de um reparo de sistema',
    ],
    workTitle: 'O que o atendimento cobre',
    work: [
      'Avaliação da tela, da bateria e da carga',
      'Orientação de backup antes de mexer no sistema',
      'Reparo dos componentes que o diagnóstico confirmar',
      'Teste das funções afetadas antes da devolução',
    ],
    note: 'Não fazemos desbloqueio de conta, liberação de operadora nem procedimentos que contornem a segurança do aparelho.',
  },
  impressoras: {
    id: 'impressoras',
    name: 'Impressoras',
    eyebrow: 'Impressoras',
    title: 'Manutenção para a impressora voltar a entregar a página',
    summary: 'Atolamento, impressão falhada e equipamento que o computador não encontra.',
    description:
      'No escritório, a impressora parada segura contrato, boleto e documento. A manutenção olha o atolamento, a qualidade da página e a ligação com o computador ou com a rede, e deixa claro o que é ajuste, limpeza ou peça.',
    symptomsTitle: 'Falhas que interrompem a impressão',
    symptoms: [
      'Papel atolado com frequência',
      'Impressão falhada, fraca ou manchada',
      'Faixas, cores trocadas ou página em branco',
      'Equipamento que não aparece no computador ou na rede',
      'Mensagens de erro no painel',
      'Uso intenso sem manutenção preventiva',
    ],
    workTitle: 'Manutenção e reparo',
    work: [
      'Avaliação do atolamento e do conjunto de impressão',
      'Limpeza e manutenção quando o uso pede',
      'Configuração no computador e na rede local',
      'Orientação para reduzir a repetição da falha',
    ],
    note: 'Suprimento e peça só são propostos depois da avaliação do equipamento.',
  },
  suporte: {
    id: 'suporte',
    name: 'Suporte',
    eyebrow: 'Suporte de informática',
    title: 'Apoio técnico para o computador voltar à rotina',
    summary: 'Lentidão, vírus, formatação, e-mail, rede e dúvidas de uso.',
    description:
      'Nem todo chamado é um equipamento quebrado. Às vezes a máquina está lenta, um programa não abre, a impressora não é reconhecida ou a pessoa travou numa tarefa. O suporte começa pela rotina de quem usa o computador.',
    symptomsTitle: 'Pedidos de suporte',
    symptoms: [
      'Computador lento, travando ou reiniciando',
      'Suspeita de vírus ou programa indesejado',
      'Formatação quando o sistema não se recupera',
      'Instalação de programas do dia a dia',
      'E-mail, impressora e rede local',
      'Dúvida de uso depois de um reparo',
    ],
    workTitle: 'Como o suporte acontece',
    work: [
      'Entender o uso da máquina antes de formatar',
      'Backup orientado quando os arquivos importam',
      'Configuração do básico para voltar ao trabalho',
      'Explicação do que foi alterado no equipamento',
    ],
    note: 'Formatação não é o primeiro passo automático. Ela entra quando o diagnóstico mostra que é o melhor caminho.',
  },
};

export const serviceList: readonly ServiceDefinition[] = [
  serviceCatalog.notebooks,
  serviceCatalog.celulares,
  serviceCatalog.impressoras,
  serviceCatalog.suporte,
];

export function getService(id: ServiceId): ServiceDefinition {
  return serviceCatalog[id];
}
