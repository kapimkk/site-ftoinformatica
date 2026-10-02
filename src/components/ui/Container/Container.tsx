import type { ReactElement, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import styles from './Container.module.css';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps): ReactElement {
  return <div className={cn(styles.container, className)}>{children}</div>;
}
