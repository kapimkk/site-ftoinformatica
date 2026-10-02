import type { ReactElement, ReactNode } from 'react';
import { Container } from '../../ui/Container/Container';
import styles from './Section.module.css';

type SectionTone = 'default' | 'muted' | 'inverse';

type SectionProps = {
  id: string;
  labelledBy: string;
  tone?: SectionTone;
  children: ReactNode;
};

export function Section({
  id,
  labelledBy,
  tone = 'default',
  children,
}: SectionProps): ReactElement {
  return (
    <section id={id} aria-labelledby={labelledBy} className={styles.section} data-tone={tone}>
      <Container>{children}</Container>
    </section>
  );
}
