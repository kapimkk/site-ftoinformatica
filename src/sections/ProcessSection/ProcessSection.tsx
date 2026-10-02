import type { ReactElement } from 'react';
import { Section } from '../../components/layout/Section/Section';
import { SectionHeading } from '../../components/ui/SectionHeading/SectionHeading';
import { processSteps } from '../../content/process';
import styles from './ProcessSection.module.css';

export function ProcessSection(): ReactElement {
  return (
    <Section id="atendimento" labelledBy="atendimento-titulo" tone="inverse">
      <SectionHeading
        id="atendimento-titulo"
        eyebrow="Como funciona"
        title="Do chamado à devolução do equipamento"
        description="Cinco etapas. Nenhuma delas executa o reparo antes da sua autorização."
        tone="inverse"
      />
      <ol className={styles.steps}>
        {processSteps.map((step, index) => (
          <li key={step.id} className={styles.step}>
            <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
