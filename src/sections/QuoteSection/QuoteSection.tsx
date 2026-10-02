import type { ReactElement } from 'react';
import { companyConfig } from '../../config/env';
import { getQuoteLead } from '../../content/companyCopy';
import { Section } from '../../components/layout/Section/Section';
import { ButtonLink } from '../../components/ui/Button/Button';
import { SectionHeading } from '../../components/ui/SectionHeading/SectionHeading';
import { getQuoteAction } from '../../services/contactLinks';
import styles from './QuoteSection.module.css';

export function QuoteSection(): ReactElement {
  const action = getQuoteAction();
  const showContactLink = action.href !== '#contato';

  return (
    <Section id="orcamento" labelledBy="orcamento-titulo" tone="inverse">
      <div className={styles.panel}>
        <SectionHeading
          id="orcamento-titulo"
          eyebrow="Orçamento"
          title="Conte o modelo e o defeito observado"
          description={getQuoteLead(companyConfig.name)}
          tone="inverse"
        />
        <div className={styles.actions}>
          <ButtonLink href={action.href} external={action.external}>
            {action.label}
          </ButtonLink>
          {showContactLink ? (
            <ButtonLink href="#contato" variant="ghost">
              Ver contato
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
