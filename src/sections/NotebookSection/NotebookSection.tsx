import type { ReactElement } from 'react';
import { ServiceDetail } from '../ServiceDetail/ServiceDetail';

export function NotebookSection(): ReactElement {
  return <ServiceDetail serviceId="notebooks" />;
}
