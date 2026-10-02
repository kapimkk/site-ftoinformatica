import type { ReactElement } from 'react';
import { Section } from '../../components/layout/Section/Section';
import { Icon } from '../../components/ui/Icon/Icon';
import { SectionHeading } from '../../components/ui/SectionHeading/SectionHeading';
import { faqItems } from '../../content/faq';
import styles from './FaqSection.module.css';

export function FaqSection(): ReactElement {
  return (
    <Section id="duvidas" labelledBy="duvidas-titulo" tone="muted">
      <SectionHeading
        id="duvidas-titulo"
        eyebrow="Dúvidas"
        title="Antes de trazer o equipamento"
        description="Respostas diretas sobre orçamento, arquivos, marcas e a forma de atendimento."
      />
      <div className={styles.list}>
        {faqItems.map((item) => (
          <details key={item.id} className={styles.item} name="duvidas">
            <summary>
              {item.question}
              <Icon name="chevron" className={styles.chevron} />
            </summary>
            <p className={styles.answer}>{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
