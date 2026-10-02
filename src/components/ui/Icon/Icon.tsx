import type { ReactElement, ReactNode, SVGProps } from 'react';
import type { IconName } from '../../../types/icon';
import { cn } from '../../../utils/cn';
import styles from './Icon.module.css';

type IconProps = {
  name: IconName;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, 'name'>;

const paths: Record<IconName, ReactNode> = {
  notebook: (
    <>
      <rect x="3" y="4.5" width="18" height="12" rx="1.6" />
      <path d="M2 19.5h20" />
      <path d="M8 16.5h8" />
    </>
  ),
  phone: (
    <>
      <rect x="8" y="3" width="8" height="18" rx="2" />
      <path d="M11 18.5h2" />
    </>
  ),
  printer: (
    <>
      <path d="M7 8V4.5h10V8" />
      <path d="M6 8.5h12a1.5 1.5 0 0 1 1.5 1.5v5h-15v-5A1.5 1.5 0 0 1 6 8.5Z" />
      <path d="M7 14.5h10V20H7v-5.5Z" />
    </>
  ),
  support: (
    <>
      <path d="M4.5 13V12a7.5 7.5 0 0 1 15 0v1" />
      <rect x="3.5" y="13" width="4" height="6" rx="1.2" />
      <rect x="16.5" y="13" width="4" height="6" rx="1.2" />
      <path d="M16.5 19v.8A2.2 2.2 0 0 1 14.3 22H12" />
    </>
  ),
  check: <path d="M5 12.5 9.2 17 19 7" />,
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5L15 15" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6.5v5.2c0 4.2-2.8 7.2-7 8.8-4.2-1.6-7-4.6-7-8.8V6.5L12 3.5Z" />
      <path d="m9 12.2 2 2 4.2-4.2" />
    </>
  ),
  message: <path d="M5 6.5h14v9H8l-3 2.5Z" />,
  mapPin: (
    <>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
      <circle cx="12" cy="11" r="1.6" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.6" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path
      d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.2l.8-3H13V9c0-.6.4-1 1-1Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  whatsapp: (
    <>
      <path d="M12 5a6.5 6.5 0 0 0-5.6 9.8L5.6 18.4l3.7-.9A6.5 6.5 0 1 0 12 5Z" />
      <path d="M9.4 10.1c.2 1.5 1.4 2.6 2.9 3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m15.5 15.5 4.5 4.5" />
    </>
  ),
  file: (
    <>
      <path d="M7 3.5h7l4 4V20.5H7Z" />
      <path d="M14 3.5V8h4" />
      <path d="M9.5 13h5M9.5 16.5h4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="9" r="2.4" />
      <circle cx="16" cy="10" r="2" />
      <path d="M4.8 18.5c.6-2.4 2.4-3.6 4.2-3.6s3.6 1.2 4.2 3.6" />
      <path d="M14 14.8c1.5-.2 3 .4 3.8 2 .5.9.8 1.8 1 2.4" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
};

export function Icon({ name, className, ...props }: IconProps): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn(styles.icon, className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
