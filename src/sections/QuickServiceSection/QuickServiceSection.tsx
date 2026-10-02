import type { ReactElement } from 'react';
import { Section } from '../../components/layout/Section/Section';
import { Callout } from '../../components/ui/Callout/Callout';
import { Icon } from '../../components/ui/Icon/Icon';
import { SafeLink } from '../../components/ui/SafeLink/SafeLink';
import { SectionHeading } from '../../components/ui/SectionHeading/SectionHeading';
import { getPublicContactView } from '../../services/contactLinks';
import type { ContactChannelId } from '../../types/company';
import type { IconName } from '../../types/icon';
import styles from './QuickServiceSection.module.css';

const quickChannels = ['whatsapp', 'phone', 'email'] as const satisfies readonly ContactChannelId[];

const channelIcons: Record<(typeof quickChannels)[number], IconName> = {
  whatsapp: 'whatsapp',
  phone: 'phone',
  email: 'mail',
};

export function QuickServiceSection(): ReactElement {
  const contact = getPublicContactView();
  const channels = new Map(contact.channels.map((channel) => [channel.id, channel]));

  return (
    <Section id="atendimento-rapido" labelledBy="atendimento-rapido-titulo" tone="muted">
      <div className={styles.stack}>
        <SectionHeading
          id="atendimento-rapido-titulo"
          eyebrow="Atendimento rápido"
          title="Se o equipamento parou agora"
          description="Informe o modelo e o que o equipamento está fazendo — ou deixou de fazer."
        />
        {quickChannels.some((channelId) => channels.has(channelId)) ? (
          <div className={styles.grid}>
            {quickChannels.map((channelId) => {
              const channel = channels.get(channelId);
              if (!channel) {
                return null;
              }

              return (
                <SafeLink
                  key={channel.id}
                  href={channel.href}
                  appearance="plain"
                  className={styles.card}
                >
                  <span className={styles.iconWrap}>
                    <Icon name={channelIcons[channelId]} />
                  </span>
                  <span className={styles.label}>{channel.label}</span>
                  <span className={styles.value}>{channel.value}</span>
                </SafeLink>
              );
            })}
          </div>
        ) : (
          <Callout>Nenhum canal rápido foi publicado ainda.</Callout>
        )}
      </div>
    </Section>
  );
}
