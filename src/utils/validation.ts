const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const SOCIAL_HANDLE_PATTERN = /^[A-Za-z0-9._]{1,30}$/;

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

export function isEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

export function isPhoneDigits(value: string): boolean {
  return /^\d{10,15}$/.test(value);
}

export function isSocialHandle(value: string): boolean {
  return SOCIAL_HANDLE_PATTERN.test(value);
}

export function parseHttpUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

export function isExternalHref(href: string): boolean {
  return href.startsWith('https://') || href.startsWith('http://');
}
