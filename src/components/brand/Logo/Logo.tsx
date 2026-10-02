import type { ReactElement } from 'react';
import { companyConfig } from '../../../config/env';
import styles from './Logo.module.css';

export function Logo(): ReactElement {
  return <img className={styles.mark} src="/logo.png" alt="" width={210} height={151} />;
}

export function BrandLockup(): ReactElement {
  return (
    <span className={styles.lockup}>
      <Logo />
      <span className={styles.name}>{companyConfig.name}</span>
    </span>
  );
}
