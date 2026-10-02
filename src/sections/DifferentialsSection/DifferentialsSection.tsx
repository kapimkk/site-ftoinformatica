import type { ReactElement } from 'react';
import { Section } from '../../components/layout/Section/Section';
import { Icon } from '../../components/ui/Icon/Icon';
import { SectionHeading } from '../../components/ui/SectionHeading/SectionHeading';
import { differentials } from '../../content/differentials';
import type { DifferentialId } from '../../types/content';
import type { IconName } from '../../types/icon';
import styles from './DifferentialsSection.module.css';

const differentialIcons: Record<DifferentialId, IconName> = {
  diagnosis: 'search',
  quote: 'file',
  data: 'shield',
  audience: 'users',
  communication: 'message',
  delivery: 'check',
};

export function DifferentialsSection(): ReactElement {
  return (
    <Section id="diferenciais" labelledBy="diferenciais-titulo" tone="muted">
      <SectionHeading
        id="diferenciais-titulo"
        eyebrow="Diferenciais"
        title="Clareza antes, durante e na entrega"
        description="O diferencial não é um adjetivo. É a ordem do atendimento: explicar, orçar, autorizar e orientar."
      />
      <div className={styles.grid}>
        {differentials.map((item) => (
          <article key={item.id} className={styles.card}>
            <span className={styles.iconWrap}>
              <Icon name={differentialIcons[item.id]} />
            </span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
