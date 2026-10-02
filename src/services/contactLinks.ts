import { companyConfig } from '../config/env';
import { getWhatsappMessage } from '../content/companyCopy';
import type {
  CompanyConfig,
  ContactChannel,
  PublicContactView,
  QuoteAction,
} from '../types/company';
import { formatBrazilPhone, toTelHref } from '../utils/phone';

function buildWhatsappUrl(digits: string, message: string): string {
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function buildMailto(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function getWhatsappUrl(company: CompanyConfig = companyConfig): string | null {
  if (!company.whatsappDigits) {
    return null;
  }

  return buildWhatsappUrl(company.whatsappDigits, getWhatsappMessage(company.name));
}

export function getQuoteAction(company: CompanyConfig = companyConfig): QuoteAction {
  const whatsappUrl = getWhatsappUrl(company);
  if (whatsappUrl) {
    return {
      href: whatsappUrl,
      label: 'Chamar no WhatsApp',
      external: true,
    };
  }

  if (company.email) {
    return {
      href: buildMailto(
        company.email,
        `Orçamento - ${company.name}`,
        'Olá, gostaria de solicitar um orçamento. Segue o equipamento e o defeito observado:',
      ),
      label: 'Enviar e-mail',
      external: false,
    };
  }

  return {
    href: '#contato',
    label: 'Ver canais de contato',
    external: false,
  };
}

export function getPublicContactView(company: CompanyConfig = companyConfig): PublicContactView {
  const channels: ContactChannel[] = [];

  if (company.phoneDigits) {
    channels.push({
      id: 'phone',
      label: 'Telefone',
      value: company.phoneDisplay,
      href: toTelHref(company.phoneDigits),
    });
  }

  const whatsappUrl = getWhatsappUrl(company);
  if (whatsappUrl && company.whatsappDigits) {
    channels.push({
      id: 'whatsapp',
      label: 'WhatsApp',
      value: formatBrazilPhone(company.whatsappDigits),
      href: whatsappUrl,
    });
  }

  if (company.email) {
    channels.push({
      id: 'email',
      label: 'E-mail',
      value: company.email,
      href: buildMailto(
        company.email,
        `Contato - ${company.name}`,
        `Olá, gostaria de falar com a ${company.name}.`,
      ),
    });
  }

  if (company.instagramUrl) {
    channels.push({
      id: 'instagram',
      label: 'Instagram',
      value: 'Abrir perfil',
      href: company.instagramUrl,
    });
  }

  if (company.facebookUrl) {
    channels.push({
      id: 'facebook',
      label: 'Facebook',
      value: 'Abrir página',
      href: company.facebookUrl,
    });
  }

  if (company.googleMapsUrl) {
    channels.push({
      id: 'maps',
      label: 'Mapa',
      value: 'Abrir localização',
      href: company.googleMapsUrl,
    });
  }

  const locationLines = [company.address, company.city].filter((line) => line.length > 0);
  const hours = company.businessHours;

  return {
    channels,
    locationLines,
    hours,
    hasDetails: channels.length > 0 || locationLines.length > 0 || hours.length > 0,
  };
}
