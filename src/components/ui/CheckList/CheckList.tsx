import type { ReactElement } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './CheckList.module.css';

type CheckListProps = {
  items: readonly string[];
};

export function CheckList({ items }: CheckListProps): ReactElement {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <Icon name="check" className={styles.icon} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
