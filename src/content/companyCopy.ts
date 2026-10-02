export const heroPoints = [
  'Orçamento apresentado antes da execução',
  'Diagnóstico explicado em linguagem direta',
  'Suporte para o uso cotidiano do equipamento',
] as const;

export function getHeroLead(companyName: string): string {
  return `A ${companyName} repara notebooks, celulares e impressoras e presta suporte de informática para quem precisa do equipamento no trabalho ou no estudo.`;
}

export function getCompanySummary(companyName: string): string {
  return `${companyName} faz assistência técnica de informática: reparo de notebooks, celulares e impressoras, manutenção e suporte para o uso do dia a dia.`;
}

export function getQuoteLead(companyName: string): string {
  return `Informe o modelo e o que o equipamento está fazendo. A ${companyName} responde com o caminho de diagnóstico e o orçamento antes de executar.`;
}

export function getWhatsappMessage(companyName: string): string {
  return `Olá, vim pelo site da ${companyName} e gostaria de solicitar um orçamento.`;
}
