import type { ReactElement, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import styles from './Callout.module.css';

type CalloutProps = {
  children: ReactNode;
  tone?: 'default' | 'inverse';
};

export function Callout({ children, tone = 'default' }: CalloutProps): ReactElement {
  return (
    <p className={cn(styles.callout, tone === 'inverse' && styles.inverse)} role="note">
      {children}
    </p>
  );
}
