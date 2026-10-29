import type { PhoneSlide } from '../types/content';
import { serviceCatalog } from './services';

/**
 * Telas exibidas no celular do hero.
 * Para personalizar, edite os textos ou informe `image` com um arquivo de `public/`
 * (ex.: `/anuncios/promocao.jpg`). Sem imagem, a tela usa o fundo verde.
 */
export const phoneSlides: readonly PhoneSlide[] = [
  {
    id: 'notebooks',
    kind: 'service',
    serviceId: 'notebooks',
    icon: 'notebook',
    tag: 'Reparo de notebooks',
    title: 'Notebook esquentando ou desligando sozinho?',
    text: serviceCatalog.notebooks.summary,
    detail: 'Poeira no cooler é uma causa comum de aquecimento e lentidão.',
  },
  {
    id: 'celulares',
    kind: 'service',
    serviceId: 'celulares',
    icon: 'phone',
    tag: 'Reparo de celulares',
    title: 'Tela trincada, bateria fraca ou não carrega?',
    text: serviceCatalog.celulares.summary,
    detail: 'Faça backup das fotos e contatos antes de entregar o aparelho.',
  },
  {
    id: 'impressoras',
    kind: 'service',
    serviceId: 'impressoras',
    icon: 'printer',
    tag: 'Impressoras',
    title: 'Papel atolando ou impressão falhada?',
    text: serviceCatalog.impressoras.summary,
    detail: 'Não puxe a folha presa com força: isso pode danificar os roletes.',
  },
  {
    id: 'suporte',
    kind: 'service',
    serviceId: 'suporte',
    icon: 'support',
    tag: 'Suporte de informática',
    title: 'Computador lento ou com vírus?',
    text: serviceCatalog.suporte.summary,
    detail: 'Formatação só entra quando o diagnóstico mostra que é o melhor caminho.',
  },
  {
    id: 'orcamento',
    kind: 'ad',
    icon: 'file',
    tag: 'Anúncio',
    title: 'Orçamento antes da execução',
    text: 'Peça, serviço e prazo estimado aparecem para autorização.',
    detail: 'Sem autorização, nada é executado.',
  },
  {
    id: 'empresas',
    kind: 'ad',
    icon: 'users',
    tag: 'Anúncio',
    title: 'Atendemos pessoa física e empresa',
    text: 'O mesmo critério vale para o celular pessoal e para a impressora do escritório.',
    detail: 'Fale conosco e conte o modelo e o defeito.',
  },
];
