import { useState, type ReactElement } from 'react';
import { Section } from '../../components/layout/Section/Section';
import { processSteps } from '../../content/process';
import styles from './ProcessSection.module.css';

export function ProcessSection(): ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = processSteps[activeIndex] ?? processSteps[0];

  return (
    <Section id="atendimento" labelledBy="atendimento-titulo">
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Atendimento</p>
        <h2 id="atendimento-titulo">Como funciona</h2>
      </header>
      <div className={styles.layout}>
        <div className={styles.steps} role="tablist" aria-label="Etapas do atendimento">
          {processSteps.map((step, index) => (
            <button
              key={step.id}
              type="button"
              role="tab"
              className={styles.step}
              aria-selected={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {step.title}
            </button>
          ))}
        </div>
        {activeStep ? (
          <p className={styles.detail} role="tabpanel">
            {activeStep.description}
          </p>
        ) : null}
      </div>
    </Section>
  );
}
