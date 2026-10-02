import type { ReactElement } from 'react';
import { getWhatsappUrl } from '../../../services/contactLinks';
import { Icon } from '../Icon/Icon';
import styles from './WhatsAppButton.module.css';

export function WhatsAppButton(): ReactElement | null {
  const href = getWhatsappUrl();
  if (!href) {
    return null;
  }

  return (
    <a
      className={`${styles.fab} no-print`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
    >
      <Icon name="whatsapp" />
      <span className={styles.label}>WhatsApp</span>
    </a>
  );
}
