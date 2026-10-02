import { useEffect, useRef, useState, type ReactElement, type Ref } from 'react';
import { DESKTOP_NAV_QUERY, NAV_ITEMS } from '../../../config/navigation';
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll';
import { useScrolled } from '../../../hooks/useScrolled';
import { cn } from '../../../utils/cn';
import { BrandLockup } from '../../brand/Logo/Logo';
import { ButtonLink } from '../../ui/Button/Button';
import { Icon } from '../../ui/Icon/Icon';
import styles from './SiteHeader.module.css';

type SiteHeaderProps = {
  activeSectionId: string;
};

type NavLinksProps = {
  activeSectionId: string;
  onNavigate?: () => void;
  firstItemRef?: Ref<HTMLAnchorElement>;
};

function NavLinks({ activeSectionId, onNavigate, firstItemRef }: NavLinksProps): ReactElement {
  return (
    <ul className={styles.list}>
      {NAV_ITEMS.map((item, index) => {
        const current = item.id === activeSectionId;
        return (
          <li key={item.id}>
            <a
              ref={index === 0 ? firstItemRef : undefined}
              href={item.href}
              className={cn(styles.link, current && styles.current)}
              aria-current={current ? 'true' : undefined}
              onClick={onNavigate}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function SiteHeader({ activeSectionId }: SiteHeaderProps): ReactElement {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) {
      return;
    }

    const dialog = dialogRef.current;
    const menuButton = menuButtonRef.current;
    const media = window.matchMedia(DESKTOP_NAV_QUERY);

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton?.focus();
        return;
      }

      if (event.key !== 'Tab' || !dialog || !menuButton) {
        return;
      }

      const nodes = [menuButton, ...dialog.querySelectorAll<HTMLElement>('a[href], button')];
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onMediaChange = (): void => {
      if (media.matches) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    media.addEventListener('change', onMediaChange);
    firstLinkRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      media.removeEventListener('change', onMediaChange);
    };
  }, [open]);

  const closeMenu = (): void => setOpen(false);

  return (
    <>
      <header className={cn(styles.header, scrolled && styles.scrolled)}>
        <div className={styles.bar}>
          <a href="#inicio" className={styles.brand} onClick={closeMenu}>
            <BrandLockup />
          </a>
          <nav className={styles.nav} aria-label="Seções">
            <NavLinks activeSectionId={activeSectionId} />
          </nav>
          <div className={styles.actions}>
            <ButtonLink href="#contato" className={styles.quote} onClick={closeMenu}>
              Fale conosco
            </ButtonLink>
            <button
              ref={menuButtonRef}
              type="button"
              className={styles.menuButton}
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((current) => !current)}
            >
              <span className="visually-hidden">{open ? 'Fechar menu' : 'Abrir menu'}</span>
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>
      {open ? (
        <div
          ref={dialogRef}
          id="menu-mobile"
          className={styles.mobile}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <nav aria-label="Seções">
            <NavLinks
              activeSectionId={activeSectionId}
              onNavigate={closeMenu}
              firstItemRef={firstLinkRef}
            />
          </nav>
          <ButtonLink href="#contato" className={styles.mobileQuote} onClick={closeMenu}>
            Fale conosco
          </ButtonLink>
        </div>
      ) : null}
    </>
  );
}
