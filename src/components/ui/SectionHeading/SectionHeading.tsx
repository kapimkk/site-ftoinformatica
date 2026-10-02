import type { ReactElement } from 'react';
import { cn } from '../../../utils/cn';
import styles from './SectionHeading.module.css';

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'default' | 'inverse';
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  tone = 'default',
}: SectionHeadingProps): ReactElement {
  return (
    <header className={cn(styles.header, tone === 'inverse' && styles.inverse)}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {description ? <p className={styles.description}>{description}</p> : null}
    </header>
  );
}
