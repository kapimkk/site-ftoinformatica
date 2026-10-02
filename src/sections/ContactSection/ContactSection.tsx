import type { ReactElement } from 'react';
import { Section } from '../../components/layout/Section/Section';
import { Icon } from '../../components/ui/Icon/Icon';
import { getPublicContactView } from '../../services/contactLinks';
import type { ContactChannelId } from '../../types/company';
import type { IconName } from '../../types/icon';
import { isExternalHref } from '../../utils/validation';
import styles from './ContactSection.module.css';

const channelIcons: Record<ContactChannelId, IconName> = {
  phone: 'phone',
  whatsapp: 'whatsapp',
  email: 'mail',
  instagram: 'instagram',
  facebook: 'facebook',
  maps: 'mapPin',
};

export function ContactSection(): ReactElement {
  const contact = getPublicContactView();

  return (
    <Section id="contato" labelledBy="contato-titulo" tone="inverse">
      <div className={styles.layout}>
        <header>
          <p className={styles.eyebrow}>Contato</p>
          <h2 id="contato-titulo">Fale conosco</h2>
          <p className={styles.lead}>Modelo do aparelho e o que ele parou de fazer.</p>
        </header>
        {contact.hasDetails ? (
          <div className={styles.grid}>
            {contact.channels.map((channel) => {
              const external = isExternalHref(channel.href);
              return (
                <a
                  key={channel.id}
                  className={styles.card}
                  href={channel.href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className={styles.icon}>
                    <Icon name={channelIcons[channel.id]} />
                  </span>
                  <span className={styles.label}>{channel.label}</span>
                  <span className={styles.value}>{channel.value}</span>
                  {external ? <span className="visually-hidden"> (abre em nova aba)</span> : null}
                </a>
              );
            })}
            {contact.locationLines.length > 0 ? (
              <article className={styles.cardStatic}>
                <span className={styles.label}>Endereço</span>
                <span className={styles.value}>{contact.locationLines.join(' · ')}</span>
              </article>
            ) : null}
            {contact.hours ? (
              <article className={styles.cardStatic}>
                <span className={styles.label}>Horário</span>
                <span className={styles.value}>{contact.hours}</span>
              </article>
            ) : null}
          </div>
        ) : (
          <p className={styles.empty}>Os canais de contato ainda não foram publicados.</p>
        )}
      </div>
    </Section>
  );
}
