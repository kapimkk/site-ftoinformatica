import type { ReactElement } from 'react';
import { ServiceDetail } from '../ServiceDetail/ServiceDetail';

export function PrinterSection(): ReactElement {
  return <ServiceDetail serviceId="impressoras" />;
}
