import type { ReactElement } from 'react';
import { getHeroLead } from '../../content/companyCopy';
import { serviceList } from '../../content/services';
import { ButtonLink } from '../../components/ui/Button/Button';
import { Container } from '../../components/ui/Container/Container';
import { DeviceStage } from '../../components/ui/DeviceStage/DeviceStage';
import { getServiceIcon } from '../../components/ui/Icon/serviceIcon';
import { Icon } from '../../components/ui/Icon/Icon';
import { selectServiceHash, useServiceHash } from '../../hooks/useServiceHash';
import styles from './HeroSection.module.css';

export function HeroSection(): ReactElement {
  const activeId = useServiceHash();

  return (
    <section className={styles.hero} id="inicio" aria-labelledby="inicio-titulo">
      <Container className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Assistência técnica</p>
          <h1 id="inicio-titulo" className={styles.title}>
            Equipamento parado? A gente resolve.
          </h1>
          <p className={styles.lead}>{getHeroLead()}</p>
          <div className={styles.devices} role="tablist" aria-label="Equipamentos">
            {serviceList.map((service) => {
              const selected = service.id === activeId;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  className={styles.device}
                  aria-selected={selected}
                  onClick={() => selectServiceHash(service.id)}
                >
                  <Icon name={getServiceIcon(service.id)} />
                  {service.name}
                </button>
              );
            })}
          </div>
          <div className={styles.actions}>
            <ButtonLink href="#contato">Fale conosco</ButtonLink>
            <ButtonLink href="#servicos" variant="ghost">
              Ver defeitos
            </ButtonLink>
          </div>
        </div>
        <DeviceStage focus={activeId} />
      </Container>
    </section>
  );
}
