import type { ReactElement, ReactNode } from 'react';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { cn } from '../../../utils/cn';
import styles from './Reveal.module.css';

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({ children, className }: RevealProps): ReactElement {
  const reducedMotion = usePrefersReducedMotion();

  return <div className={cn(!reducedMotion && styles.reveal, className)}>{children}</div>;
}
