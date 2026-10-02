import type { ReactElement } from 'react';
import { companyConfig } from '../../../config/env';
import styles from './Logo.module.css';

export function Logo(): ReactElement {
  return (
    <img className={styles.mark} src="/favicon.ico" alt="" width={225} height={225} />
  );
}

export function BrandLockup(): ReactElement {
  return (
    <span className={styles.lockup}>
      <Logo />
      <span className="visually-hidden">{companyConfig.name}</span>
    </span>
  );
}
