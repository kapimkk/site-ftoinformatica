import { useState, type ReactElement } from 'react';
import { Section } from '../../components/layout/Section/Section';
import { Icon } from '../../components/ui/Icon/Icon';
import { differentials } from '../../content/differentials';
import type { DifferentialId } from '../../types/content';
import type { IconName } from '../../types/icon';
import styles from './DifferentialsSection.module.css';

const differentialIcons: Record<DifferentialId, IconName> = {
  diagnosis: 'search',
  quote: 'file',
  data: 'shield',
  audience: 'users',
  communication: 'message',
  delivery: 'check',
};

export function DifferentialsSection(): ReactElement {
  const [openId, setOpenId] = useState<DifferentialId | null>(null);

  return (
    <Section id="diferenciais" labelledBy="diferenciais-titulo" tone="muted">
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Diferenciais</p>
        <h2 id="diferenciais-titulo">Toque para ver</h2>
      </header>
      <div className={styles.grid}>
        {differentials.map((item) => {
          const open = openId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={styles.card}
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span className={styles.iconWrap}>
                <Icon name={differentialIcons[item.id]} />
              </span>
              <span className={styles.title}>{item.title}</span>
              {open ? <span className={styles.description}>{item.description}</span> : null}
            </button>
          );
        })}
      </div>
    </Section>
  );
}
