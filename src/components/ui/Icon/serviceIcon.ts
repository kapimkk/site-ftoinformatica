import type { ServiceId } from '../../../types/content';
import type { IconName } from '../../../types/icon';

const serviceIcons: Record<ServiceId, IconName> = {
  notebooks: 'notebook',
  celulares: 'phone',
  impressoras: 'printer',
  suporte: 'support',
};

export function getServiceIcon(serviceId: ServiceId): IconName {
  return serviceIcons[serviceId];
}
