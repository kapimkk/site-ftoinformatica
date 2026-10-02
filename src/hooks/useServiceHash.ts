import { useEffect, useState } from 'react';
import type { ServiceId } from '../types/content';

const SERVICE_IDS = ['notebooks', 'celulares', 'impressoras', 'suporte'] as const;

export function isServiceId(value: string): value is ServiceId {
  return (SERVICE_IDS as readonly string[]).includes(value);
}

export function selectServiceHash(serviceId: ServiceId): void {
  const nextUrl = `${window.location.pathname}${window.location.search}#${serviceId}`;
  window.history.replaceState(null, '', nextUrl);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}

export function useServiceHash(fallback: ServiceId = 'notebooks'): ServiceId {
  const [serviceId, setServiceId] = useState<ServiceId>(() => {
    const hash = window.location.hash.slice(1);
    return isServiceId(hash) ? hash : fallback;
  });

  useEffect(() => {
    const syncFromHash = (): void => {
      const hash = window.location.hash.slice(1);
      if (isServiceId(hash)) {
        setServiceId(hash);
      }
    };

    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  return serviceId;
}
