import type { ReactElement } from 'react';
import { companyConfig } from '../../config/env';
import { Section } from '../../components/layout/Section/Section';
import { Icon } from '../../components/ui/Icon/Icon';
import { SafeLink } from '../../components/ui/SafeLink/SafeLink';
import { SectionHeading } from '../../components/ui/SectionHeading/SectionHeading';
import { getPublicContactView } from '../../services/contactLinks';
import type { ContactChannelId } from '../../types/company';
import type { IconName } from '../../types/icon';
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
    <Section id="contato" labelledBy="contato-titulo">
      <div className={styles.layout}>
        <div className={styles.intro}>
          <SectionHeading
            id="contato-titulo"
            eyebrow="Contato"
            title={`Fale com a ${companyConfig.name}`}
            description="O atendimento começa pelo modelo do equipamento e pelo defeito que você já percebeu."
          />
          <p className={styles.lead}>
            Use um canal publicado e descreva o equipamento. O diagnóstico começa por essa conversa.
          </p>
        </div>
        <div className={styles.panel}>
          {contact.hasDetails ? (
            <dl className={styles.list}>
              {contact.locationLines.length > 0 ? (
                <div className={styles.row}>
                  <dt>Endereço</dt>
                  <dd className={styles.location}>{contact.locationLines.join('\n')}</dd>
                </div>
              ) : null}
              {contact.hours ? (
                <div className={styles.row}>
                  <dt>Horário</dt>
                  <dd>{contact.hours}</dd>
                </div>
              ) : null}
              {contact.channels.map((channel) => (
                <div key={channel.id} className={styles.row}>
                  <dt>{channel.label}</dt>
                  <dd>
                    <SafeLink href={channel.href} className={styles.channel}>
                      <Icon name={channelIcons[channel.id]} />
                      {channel.value}
                    </SafeLink>
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className={styles.empty}>
              Os canais públicos ainda não foram publicados nesta versão do site.
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}
