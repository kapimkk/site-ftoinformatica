import type { ReactElement } from 'react';
import styles from './SkipLink.module.css';

export function SkipLink(): ReactElement {
  return (
    <a className={styles.skip} href="#conteudo">
      Ir para o conteúdo
    </a>
  );
}
