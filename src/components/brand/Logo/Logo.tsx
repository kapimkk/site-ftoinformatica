import type { ReactElement } from 'react';
import styles from './Logo.module.css';

export function Logo(): ReactElement {
  return (
    <svg className={styles.mark} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <rect width="40" height="40" rx="10" fill="currentColor" />
      <rect x="11" y="10" width="4.2" height="20" fill="var(--color-navy-900)" />
      <rect x="11" y="10" width="16" height="4.2" fill="var(--color-navy-900)" />
      <rect x="11" y="17.6" width="12" height="4.2" fill="var(--color-navy-900)" />
    </svg>
  );
}
