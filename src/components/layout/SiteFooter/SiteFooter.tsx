import type { ReactElement } from 'react';
import { companyConfig } from '../../../config/env';
import { FOOTER_NAV_ITEMS } from '../../../config/navigation';
import { getCompanySummary } from '../../../content/companyCopy';
import { serviceList } from '../../../content/services';
import { getPublicContactView } from '../../../services/contactLinks';
import { BrandLockup } from '../../brand/Logo/Logo';
import { Container } from '../../ui/Container/Container';
import { SafeLink } from '../../ui/SafeLink/SafeLink';
import styles from './SiteFooter.module.css';

export function SiteFooter(): ReactElement {
  const contact = getPublicContactView();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a className={styles.brandLink} href="#inicio">
              <BrandLockup />
            </a>
            <p className={styles.summary}>{getCompanySummary()}</p>
          </div>

          <nav className={styles.column} aria-label="Mapa do site">
            <p className={styles.columnTitle}>Navegação</p>
            <ul className={styles.links}>
              {FOOTER_NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <SafeLink href={item.href} tone="inverse">
                    {item.label}
                  </SafeLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.column} aria-label="Serviços">
            <p className={styles.columnTitle}>Serviços</p>
            <ul className={styles.links}>
              {serviceList.map((service) => (
                <li key={service.id}>
                  <SafeLink href={`#${service.id}`} tone="inverse">
                    {service.name}
                  </SafeLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.column}>
            <p className={styles.columnTitle}>Contato</p>
            {contact.locationLines.length > 0 ? (
              <p className={styles.detail}>{contact.locationLines.join('\n')}</p>
            ) : null}
            {contact.hours ? <p className={styles.detail}>{contact.hours}</p> : null}
            {contact.channels.length > 0 ? (
              <ul className={styles.links}>
                {contact.channels.map((channel) => (
                  <li key={channel.id}>
                    <SafeLink href={channel.href} tone="inverse">
                      {channel.label}: {channel.value}
                    </SafeLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.detail}>Canais de contato ainda não publicados.</p>
            )}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {companyConfig.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
