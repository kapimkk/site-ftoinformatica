import type { ReactElement, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { isExternalHref } from '../../../utils/validation';
import styles from './SafeLink.module.css';

type SafeLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'inverse';
  appearance?: 'text' | 'plain';
};

export function SafeLink({
  href,
  children,
  className,
  tone = 'default',
  appearance = 'text',
}: SafeLinkProps): ReactElement {
  const external = isExternalHref(href);

  return (
    <a
      className={cn(
        appearance === 'text' && styles.link,
        appearance === 'text' && tone === 'inverse' && styles.inverse,
        className,
      )}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {external ? <span className="visually-hidden"> (abre em nova aba)</span> : null}
    </a>
  );
}
