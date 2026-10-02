import type { ReactElement } from 'react';
import { ServiceDetail } from '../ServiceDetail/ServiceDetail';

export function MobileSection(): ReactElement {
  return <ServiceDetail serviceId="celulares" tone="muted" reverse />;
}
