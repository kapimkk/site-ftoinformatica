import { useState, type KeyboardEvent, type ReactElement } from 'react';
import { companyConfig } from '../../config/env';
import { getHeroLead, heroPoints } from '../../content/companyCopy';
import { serviceList } from '../../content/services';
import type { ServiceId } from '../../types/content';
import { ButtonLink } from '../../components/ui/Button/Button';
import { DeviceStage } from '../../components/ui/DeviceStage/DeviceStage';
import { Container } from '../../components/ui/Container/Container';
import { Icon } from '../../components/ui/Icon/Icon';
import { getServiceIcon } from '../../components/ui/Icon/serviceIcon';
import { getWhatsappUrl } from '../../services/contactLinks';
import styles from './HeroSection.module.css';

const initialService = serviceList[0];

function getNextTabIndex(key: string, index: number, lastIndex: number): number | null {
  if (key === 'ArrowRight') {
    return index === lastIndex ? 0 : index + 1;
  }

  if (key === 'ArrowLeft') {
    return index === 0 ? lastIndex : index - 1;
  }

  if (key === 'Home') {
    return 0;
  }

  if (key === 'End') {
    return lastIndex;
  }

  return null;
}

export function HeroSection(): ReactElement | null {
  const [activeId, setActiveId] = useState<ServiceId>(initialService?.id ?? 'notebooks');
  const activeService = serviceList.find((service) => service.id === activeId) ?? initialService;
  const whatsappUrl = getWhatsappUrl();

  if (!activeService) {
    return null;
  }

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number): void => {
    const nextIndex = getNextTabIndex(event.key, index, serviceList.length - 1);

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    const nextService = serviceList[nextIndex];
    if (!nextService) {
      return;
    }

    setActiveId(nextService.id);
    document.getElementById(`tab-${nextService.id}`)?.focus();
  };

  return (
    <section className={styles.hero} id="inicio" aria-labelledby="inicio-titulo">
      <Container className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Assistência técnica</p>
          <h1 id="inicio-titulo" className={styles.title}>
            O equipamento parou. O próximo passo é um diagnóstico claro.
          </h1>
          <p className={styles.lead}>{getHeroLead(companyConfig.name)}</p>
          <div className={styles.actions}>
            <ButtonLink href="#orcamento">Solicitar orçamento</ButtonLink>
            {whatsappUrl ? (
              <ButtonLink href={whatsappUrl} variant="ghost">
                WhatsApp
              </ButtonLink>
            ) : (
              <ButtonLink href="#servicos" variant="ghost">
                Ver serviços
              </ButtonLink>
            )}
          </div>
          <ul className={styles.points}>
            {heroPoints.map((point) => (
              <li key={point}>
                <Icon name="check" className={styles.pointIcon} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visual}>
          <DeviceStage focus={activeService.id} />
          <div className={styles.ticket}>
            <div className={styles.ticketTop}>
              <div>
                <p className={styles.ticketLabel}>Ordem de serviço ilustrativa</p>
                <p className={styles.ticketName}>{companyConfig.name}</p>
              </div>
              <p className={styles.badge}>Demonstração</p>
            </div>
            <div className={styles.tabs} role="tablist" aria-label="Tipos de equipamento">
              {serviceList.map((service, index) => {
                const selected = service.id === activeService.id;
                return (
                  <button
                    key={service.id}
                    id={`tab-${service.id}`}
                    className={styles.tab}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`panel-${service.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveId(service.id)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                  >
                    {service.name}
                  </button>
                );
              })}
            </div>
            <div
              className={styles.panel}
              id={`panel-${activeService.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeService.id}`}
            >
              <p className={styles.symptomTitle}>{activeService.symptomsTitle}</p>
              <ul className={styles.symptoms}>
                {activeService.symptoms.slice(0, 3).map((symptom) => (
                  <li key={symptom}>{symptom}</li>
                ))}
              </ul>
              <ButtonLink
                href={`#${activeService.id}`}
                variant="secondary"
                className={styles.ticketLink}
              >
                <Icon name={getServiceIcon(activeService.id)} />
                Ver este serviço
              </ButtonLink>
              <p className={styles.status}>
                <span className={styles.dot} aria-hidden="true" />
                Status ilustrativo: aguardando diagnóstico
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
