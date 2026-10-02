import type { CompanyConfig } from '../types/company';
import { formatBrazilPhone } from '../utils/phone';
import {
  isEmail,
  isPhoneDigits,
  isSocialHandle,
  onlyDigits,
  parseHttpUrl,
} from '../utils/validation';

const FALLBACK_COMPANY_NAME = 'FTO Informática';
const FALLBACK_BUSINESS_HOURS = 'Segunda a sexta, 9h às 18h';
const PHONE_MIN_LENGTH = 10;
const PHONE_MAX_LENGTH = 15;

const MAP_HOSTS = ['google.com', 'google.com.br', 'goo.gl', 'maps.app.goo.gl'];

function readRaw(value: string | undefined): string {
  return value?.trim() ?? '';
}

function warnInvalid(warnings: string[], field: string, reason: string): void {
  warnings.push(`${field}: ${reason}`);
}

function readPhone(warnings: string[], field: string, value: string | undefined): string {
  const raw = readRaw(value);
  if (!raw) {
    return '';
  }

  const digits = onlyDigits(raw);
  if (!isPhoneDigits(digits)) {
    warnInvalid(
      warnings,
      field,
      `informe de ${PHONE_MIN_LENGTH} a ${PHONE_MAX_LENGTH} dígitos, com DDI no WhatsApp.`,
    );
    return '';
  }

  if (field === 'VITE_COMPANY_WHATSAPP' && digits.length <= 11) {
    warnInvalid(
      warnings,
      field,
      'inclua o DDI (55 para o Brasil) para o link do WhatsApp abrir no país certo.',
    );
  }

  return digits;
}

function readEmail(warnings: string[], value: string | undefined): string {
  const email = readRaw(value).toLowerCase();
  if (!email) {
    return '';
  }

  if (!isEmail(email)) {
    warnInvalid(warnings, 'VITE_COMPANY_EMAIL', 'e-mail inválido. O valor foi ignorado.');
    return '';
  }

  return email;
}

function matchesHost(hostname: string, bases: readonly string[]): boolean {
  const host = hostname.replace(/^www\./, '');
  return bases.some((base) => host === base || host.endsWith(`.${base}`));
}

function readSocialUrl(
  warnings: string[],
  field: string,
  value: string | undefined,
  hosts: readonly string[],
  baseUrl: string,
): string {
  const raw = readRaw(value);
  if (!raw) {
    return '';
  }

  if (/^https?:\/\//i.test(raw)) {
    const url = parseHttpUrl(raw);
    if (!url || !matchesHost(url.hostname, hosts)) {
      warnInvalid(warnings, field, `use uma URL https de ${hosts.join(' ou ')}.`);
      return '';
    }
    return url.toString();
  }

  const handle = raw.replace(/^@/, '').replace(/\/+$/, '');
  if (!isSocialHandle(handle)) {
    warnInvalid(warnings, field, 'use um usuário público ou a URL completa do perfil.');
    return '';
  }

  return `${baseUrl}${handle}`;
}

function readMapsUrl(warnings: string[], value: string | undefined): string {
  const raw = readRaw(value);
  if (!raw) {
    return '';
  }

  const url = parseHttpUrl(raw);

  if (!url || !matchesHost(url.hostname, MAP_HOSTS)) {
    warnInvalid(
      warnings,
      'VITE_GOOGLE_MAPS_URL',
      'use um link https do Google Maps (google.com, goo.gl ou maps.app.goo.gl).',
    );
    return '';
  }

  return url.toString();
}

export function createCompanyConfig(env: ImportMetaEnv): CompanyConfig {
  const warnings: string[] = [];
  const name = readRaw(env.VITE_COMPANY_NAME) || FALLBACK_COMPANY_NAME;
  const phoneDigits = readPhone(warnings, 'VITE_COMPANY_PHONE', env.VITE_COMPANY_PHONE);
  const whatsappDigits = readPhone(warnings, 'VITE_COMPANY_WHATSAPP', env.VITE_COMPANY_WHATSAPP);

  const config: CompanyConfig = {
    name,
    phoneDigits,
    phoneDisplay: phoneDigits ? formatBrazilPhone(phoneDigits) : '',
    whatsappDigits,
    email: readEmail(warnings, env.VITE_COMPANY_EMAIL),
    address: readRaw(env.VITE_COMPANY_ADDRESS),
    city: readRaw(env.VITE_COMPANY_CITY),
    instagramUrl: readSocialUrl(
      warnings,
      'VITE_COMPANY_INSTAGRAM',
      env.VITE_COMPANY_INSTAGRAM,
      ['instagram.com'],
      'https://instagram.com/',
    ),
    facebookUrl: readSocialUrl(
      warnings,
      'VITE_COMPANY_FACEBOOK',
      env.VITE_COMPANY_FACEBOOK,
      ['facebook.com'],
      'https://facebook.com/',
    ),
    businessHours: readRaw(env.VITE_COMPANY_BUSINESS_HOURS) || FALLBACK_BUSINESS_HOURS,
    googleMapsUrl: readMapsUrl(warnings, env.VITE_GOOGLE_MAPS_URL),
  };

  if (import.meta.env.DEV && warnings.length > 0) {
    console.warn(`[fto] Variáveis públicas ignoradas ou incompletas:\n- ${warnings.join('\n- ')}`);
  }

  return config;
}

export const companyConfig = createCompanyConfig(import.meta.env);
