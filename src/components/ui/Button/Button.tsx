import type { ReactElement, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { isExternalHref } from '../../../utils/validation';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
  onClick?: () => void;
};

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className,
  external,
  onClick,
}: ButtonLinkProps): ReactElement {
  const opensNewTab = external ?? isExternalHref(href);

  return (
    <a
      className={cn(styles.button, styles[variant], className)}
      href={href}
      onClick={onClick}
      {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {opensNewTab ? <span className="visually-hidden"> (abre em nova aba)</span> : null}
    </a>
  );
}
