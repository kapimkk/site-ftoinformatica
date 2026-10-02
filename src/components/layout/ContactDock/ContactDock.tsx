import type { ReactElement } from 'react';
import { Icon } from '../../ui/Icon/Icon';
import { getWhatsappUrl } from '../../../services/contactLinks';
import styles from './ContactDock.module.css';

export function ContactDock(): ReactElement {
  const whatsappUrl = getWhatsappUrl();

  return (
    <div className={`${styles.dock} no-print`}>
      <p className={styles.text}>Precisa de reparo agora?</p>
      <div className={styles.actions}>
        {whatsappUrl ? (
          <a className={styles.secondary} href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" />
            WhatsApp
            <span className="visually-hidden"> (abre em nova aba)</span>
          </a>
        ) : null}
        <a className={styles.primary} href="#contato">
          Fale conosco
        </a>
      </div>
    </div>
  );
}
