import type { ReactElement } from 'react';
import { Section } from '../../components/layout/Section/Section';
import { Icon } from '../../components/ui/Icon/Icon';
import { getServiceIcon } from '../../components/ui/Icon/serviceIcon';
import { Reveal } from '../../components/ui/Reveal/Reveal';
import { SectionHeading } from '../../components/ui/SectionHeading/SectionHeading';
import { serviceList } from '../../content/services';
import styles from './ServicesSection.module.css';

export function ServicesSection(): ReactElement {
  return (
    <Section id="servicos" labelledBy="servicos-titulo" tone="muted">
      <div className={styles.intro}>
        <SectionHeading
          id="servicos-titulo"
          eyebrow="Serviços"
          title="Quatro frentes, o mesmo jeito de atender"
          description="O caminho é o mesmo em todas: entender o sintoma, diagnosticar, apresentar o orçamento e executar só com autorização."
        />
        <div className={styles.grid}>
          {serviceList.map((service) => (
            <Reveal key={service.id}>
              <a className={styles.card} href={`#${service.id}`}>
                <span className={styles.iconWrap}>
                  <Icon name={getServiceIcon(service.id)} />
                </span>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
                <span className={styles.more}>
                  Ver detalhes
                  <Icon name="arrow" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
