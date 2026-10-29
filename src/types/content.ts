import type { IconName } from './icon';

export type ServiceId = 'notebooks' | 'celulares' | 'impressoras' | 'suporte';

export interface ServiceDefinition {
  id: ServiceId;
  name: string;
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  symptomsTitle: string;
  symptoms: readonly string[];
  workTitle: string;
  work: readonly string[];
  note: string;
}

export interface PhoneSlide {
  id: string;
  kind: 'service' | 'ad';
  serviceId?: ServiceId;
  icon: IconName;
  tag: string;
  title: string;
  text: string;
  detail: string;
  image?: string;
}

export type DifferentialId =
  'diagnosis' | 'quote' | 'data' | 'audience' | 'communication' | 'delivery';

export interface Differential {
  id: DifferentialId;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context: string;
  demonstration: true;
}

export interface Indicator {
  id: string;
  value: string;
  label: string;
  detail: string;
}
