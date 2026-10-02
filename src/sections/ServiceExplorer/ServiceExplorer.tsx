import { useState, type ReactElement } from 'react';
import { Section } from '../../components/layout/Section/Section';
import { ButtonLink } from '../../components/ui/Button/Button';
import { Icon } from '../../components/ui/Icon/Icon';
import { getServiceIcon } from '../../components/ui/Icon/serviceIcon';
import { getService, serviceList } from '../../content/services';
import { selectServiceHash, useServiceHash } from '../../hooks/useServiceHash';
import type { ServiceId } from '../../types/content';
import styles from './ServiceExplorer.module.css';

function SymptomPanel({ serviceId }: { serviceId: ServiceId }): ReactElement {
  const service = getService(serviceId);
  const [symptomIndex, setSymptomIndex] = useState(0);
  const symptom = service.symptoms[symptomIndex] ?? service.symptoms[0];

  return (
    <div className={styles.panel} role="tabpanel">
      <div className={styles.chips}>
        {service.symptoms.map((item, index) => (
          <button
            key={item}
            type="button"
            className={styles.chip}
            aria-pressed={index === symptomIndex}
            onClick={() => setSymptomIndex(index)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className={styles.result}>
        <p className={styles.symptom}>{symptom}</p>
        <p>{service.summary}</p>
        <p className={styles.note}>{service.note}</p>
        <ButtonLink href="#contato">Fale conosco sobre isso</ButtonLink>
      </div>
    </div>
  );
}

export function ServiceExplorer(): ReactElement {
  const serviceId = useServiceHash();

  return (
    <Section id="servicos" labelledBy="servicos-titulo">
      <div className={styles.jumps}>
        {serviceList.map((item) => (
          <span key={item.id} id={item.id} />
        ))}
      </div>
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Serviços</p>
        <h2 id="servicos-titulo">Qual é o defeito?</h2>
      </header>
      <div className={styles.tabs} role="tablist" aria-label="Tipo de equipamento">
        {serviceList.map((item) => {
          const selected = item.id === serviceId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={styles.tab}
              aria-selected={selected}
              onClick={() => selectServiceHash(item.id)}
            >
              <Icon name={getServiceIcon(item.id)} />
              {item.name}
            </button>
          );
        })}
      </div>
      <SymptomPanel key={serviceId} serviceId={serviceId} />
    </Section>
  );
}
