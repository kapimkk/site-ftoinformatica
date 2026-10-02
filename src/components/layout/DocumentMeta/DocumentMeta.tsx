import { useEffect } from 'react';
import { companyConfig } from '../../../config/env';
import { buildStructuredData } from '../../../services/structuredData';

function upsertMeta(key: string, content: string, attribute: 'name' | 'property'): void {
  const selector = `meta[${attribute}="${key}"]`;
  const existing = document.head.querySelector(selector);
  const element = existing instanceof HTMLMetaElement ? existing : document.createElement('meta');

  if (!existing) {
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

export function DocumentMeta(): null {
  useEffect(() => {
    const title = `${companyConfig.name} | Assistência técnica`;
    const description = `${companyConfig.name} faz reparo de notebooks, celulares e impressoras, manutenção e suporte técnico de informática.`;

    document.title = title;
    upsertMeta('description', description, 'name');
    upsertMeta('og:title', title, 'property');
    upsertMeta('og:description', description, 'property');
    upsertMeta('og:type', 'website', 'property');
    upsertMeta('og:locale', 'pt_BR', 'property');

    const scriptId = 'company-structured-data';
    const existingScript = document.getElementById(scriptId);
    const script =
      existingScript instanceof HTMLScriptElement
        ? existingScript
        : document.createElement('script');

    if (!existingScript) {
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(buildStructuredData(window.location.origin)).replace(
      /</g,
      '\\u003c',
    );
  }, []);

  return null;
}
