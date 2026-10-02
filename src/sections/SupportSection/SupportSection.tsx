import type { ReactElement } from 'react';
import { ServiceDetail } from '../ServiceDetail/ServiceDetail';

export function SupportSection(): ReactElement {
  return <ServiceDetail serviceId="suporte" tone="muted" reverse />;
}
