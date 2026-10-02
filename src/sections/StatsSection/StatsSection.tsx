import type { ReactElement } from 'react';
import { Section } from '../../components/layout/Section/Section';
import { Callout } from '../../components/ui/Callout/Callout';
import { SectionHeading } from '../../components/ui/SectionHeading/SectionHeading';
import { serviceIndicators } from '../../content/indicators';
import styles from './StatsSection.module.css';

export function StatsSection(): ReactElement {
  return (
    <Section id="indicadores" labelledBy="indicadores-titulo">
      <div className={styles.stack}>
        <SectionHeading
          id="indicadores-titulo"
          eyebrow="Indicadores"
          title="O atendimento descrito em números"
          description="Estes números organizam o modelo publicado neste site. Não são estatísticas de clientes, faturamento ou tempo de mercado."
        />
        <Callout>
          Conteúdo estrutural da página, não um histórico da empresa. Substitua apenas se houver
          indicadores reais e autorizados para publicação.
        </Callout>
        <div className={styles.grid}>
          {serviceIndicators.map((indicator) => (
            <article key={indicator.id} className={styles.card}>
              <p className={styles.value}>{indicator.value}</p>
              <h3 className={styles.label}>{indicator.label}</h3>
              <p className={styles.detail}>{indicator.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
