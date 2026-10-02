import { companyConfig } from '../config/env';
import { serviceList } from '../content/services';

function compactRecord(entries: Array<[string, string | undefined]>): Record<string, string> {
  return Object.fromEntries(
    entries.filter((entry): entry is [string, string] => Boolean(entry[1])),
  );
}

export function buildStructuredData(pageUrl: string): Record<string, unknown> {
  const company = companyConfig;
  const sameAs = [company.instagramUrl, company.facebookUrl].filter((url) => url.length > 0);

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: company.name,
    description: `${company.name} repara notebooks, celulares e impressoras e presta suporte técnico de informática.`,
    url: pageUrl,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de assistência técnica',
      itemListElement: serviceList.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.summary,
        },
      })),
    },
  };

  if (company.phoneDigits.length >= 12) {
    data.telephone = `+${company.phoneDigits}`;
  }

  if (company.email) {
    data.email = company.email;
  }

  if (company.address || company.city) {
    data.address = compactRecord([
      ['@type', 'PostalAddress'],
      ['streetAddress', company.address || undefined],
      ['addressLocality', company.city || undefined],
    ]);
  }

  if (sameAs.length > 0) {
    data.sameAs = sameAs;
  }

  return data;
}
