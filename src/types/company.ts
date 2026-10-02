export type ContactChannelId = 'phone' | 'whatsapp' | 'email' | 'instagram' | 'facebook' | 'maps';

export interface ContactChannel {
  id: ContactChannelId;
  label: string;
  value: string;
  href: string;
}

export interface PublicContactView {
  channels: readonly ContactChannel[];
  locationLines: readonly string[];
  hours: string;
  hasDetails: boolean;
}

export interface QuoteAction {
  href: string;
  label: string;
  external: boolean;
}

export interface CompanyConfig {
  name: string;
  phoneDigits: string;
  phoneDisplay: string;
  whatsappDigits: string;
  email: string;
  address: string;
  city: string;
  instagramUrl: string;
  facebookUrl: string;
  businessHours: string;
  googleMapsUrl: string;
}
