import type { ReactElement } from 'react';
import { Section } from '../../components/layout/Section/Section';
import { CheckList } from '../../components/ui/CheckList/CheckList';
import { SectionHeading } from '../../components/ui/SectionHeading/SectionHeading';
import { getService } from '../../content/services';
import type { ServiceId } from '../../types/content';
import styles from './ServiceDetail.module.css';

type ServiceDetailProps = {
  serviceId: ServiceId;
  tone?: 'default' | 'muted';
  reverse?: boolean;
};

export function ServiceDetail({
  serviceId,
  tone = 'default',
  reverse = false,
}: ServiceDetailProps): ReactElement {
  const service = getService(serviceId);
  const headingId = `${service.id}-titulo`;

  return (
    <Section id={service.id} labelledBy={headingId} tone={tone}>
      <div className={styles.layout} data-reverse={reverse}>
        <div className={styles.copy}>
          <SectionHeading
            id={headingId}
            eyebrow={service.eyebrow}
            title={service.title}
            description={service.description}
          />
          <p className={styles.note}>{service.note}</p>
        </div>
        <div className={styles.panel} data-elevated={tone === 'muted'}>
          <div className={styles.block}>
            <h3>{service.symptomsTitle}</h3>
            <CheckList items={service.symptoms} />
          </div>
          <div className={styles.block}>
            <h3>{service.workTitle}</h3>
            <CheckList items={service.work} />
          </div>
        </div>
      </div>
    </Section>
  );
}
