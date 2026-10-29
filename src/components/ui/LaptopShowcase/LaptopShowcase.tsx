import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type FormEvent,
  type KeyboardEvent,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { companyConfig } from '../../../config/env';
import { phoneSlides } from '../../../content/phoneSlides';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import type { PhoneSlide, ServiceId } from '../../../types/content';
import { cn } from '../../../utils/cn';
import { Icon } from '../Icon/Icon';
import styles from './LaptopShowcase.module.css';

type LaptopShowcaseProps = {
  focus: ServiceId;
};

type Direction = 1 | -1;

const AUTOPLAY_MS = 5500;
const MAX_TILT_DEG = 6;
function wrapIndex(index: number): number {
  return (index + phoneSlides.length) % phoneSlides.length;
}

function findServiceSlide(serviceId: ServiceId): number {
  const index = phoneSlides.findIndex((slide) => slide.serviceId === serviceId);
  return index < 0 ? 0 : index;
}

function formatClock(date: Date): string {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR');
}

function useClock(): { time: string; date: string } {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(timer);
  }, []);

  return { time: formatClock(now), date: formatDate(now) };
}

function WindowMark(): ReactElement {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <rect x="1.5" y="2" width="13" height="12" rx="2" />
      <path d="M1.5 6h13" />
    </svg>
  );
}

function SearchMark(): ReactElement {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="7" cy="7" r="4.25" />
      <path d="m10.2 10.2 3.3 3.3" />
    </svg>
  );
}

function TrayIcon({ children }: { children: ReactNode }): ReactElement {
  return (
    <span className={styles.trayIcon} aria-hidden="true">
      {children}
    </span>
  );
}

function SystemTray(): ReactElement {
  return (
    <>
      <TrayIcon>
        <svg viewBox="0 0 16 16">
          <path d="M8 12.2 2.2 7.4a6.2 6.2 0 0 1 11.6 0Z" />
          <path d="M8 9.6 5 7.2a3.4 3.4 0 0 1 6 0Z" />
          <circle cx="8" cy="12.6" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      </TrayIcon>
      <TrayIcon>
        <svg viewBox="0 0 16 16">
          <path d="M2.5 6.5h2.2L8 4v8l-3.3-2.5H2.5Z" />
          <path d="M10 6.2a2.6 2.6 0 0 1 0 3.6M11.6 4.8a4.6 4.6 0 0 1 0 6.4" />
        </svg>
      </TrayIcon>
      <TrayIcon>
        <svg viewBox="0 0 16 16">
          <rect x="1.5" y="4" width="11" height="8" rx="1.4" />
          <path d="M12.5 6.5H14v3h-1.5" />
        </svg>
      </TrayIcon>
    </>
  );
}

function WindowBody({
  slide,
  direction,
}: {
  slide: PhoneSlide;
  direction: Direction;
}): ReactElement {
  return (
    <div className={cn(styles.slide, direction === 1 ? styles.fromRight : styles.fromLeft)}>
      {slide.image ? <img className={styles.slideImage} src={slide.image} alt="" /> : null}
      <span className={styles.badge} style={{ '--i': 0 } as CSSProperties}>
        <Icon name={slide.icon} />
      </span>
      <span className={styles.tag} data-kind={slide.kind} style={{ '--i': 1 } as CSSProperties}>
        {slide.tag}
      </span>
      <p className={styles.headline} style={{ '--i': 2 } as CSSProperties}>
        {slide.title}
      </p>
      <p className={styles.copy} style={{ '--i': 3 } as CSSProperties}>
        {slide.text}
      </p>
      <p className={styles.note} style={{ '--i': 4 } as CSSProperties}>
        <strong>{slide.kind === 'ad' ? 'Saiba' : 'Dica'}</strong>
        {slide.detail}
      </p>
    </div>
  );
}

export function LaptopShowcase({ focus }: LaptopShowcaseProps): ReactElement {
  const reducedMotion = usePrefersReducedMotion();
  const clock = useClock();
  const searchId = useId();
  const laptopRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(() => findServiceSlide(focus));
  const [direction, setDirection] = useState<Direction>(1);
  const [syncedFocus, setSyncedFocus] = useState(focus);
  const [paused, setPaused] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');

  if (focus !== syncedFocus) {
    const target = findServiceSlide(focus);
    setSyncedFocus(focus);
    setDirection(target >= index ? 1 : -1);
    setIndex(target);
    setMinimized(false);
    setMenuOpen(false);
  }

  const menuBlocksAutoplay = menuOpen || minimized;
  const autoplay = !reducedMotion && !paused && !menuBlocksAutoplay;
  const slide = phoneSlides[index];
  const visibleSlides = phoneSlides.filter((item) => {
    const haystack = `${item.title} ${item.tag}`.toLocaleLowerCase('pt-BR');
    return haystack.includes(query.trim().toLocaleLowerCase('pt-BR'));
  });

  useEffect(() => {
    if (!autoplay) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDirection(1);
      setIndex((current) => wrapIndex(current + 1));
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [autoplay, index]);

  const goTo = (target: number, nextDirection: Direction): void => {
    setDirection(nextDirection);
    setIndex(wrapIndex(target));
    setMinimized(false);
    setMenuOpen(false);
    setQuery('');
  };

  const showNext = (): void => goTo(index + 1, 1);
  const showPrevious = (): void => goTo(index - 1, -1);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevious();
    } else if (event.key === 'Escape') {
      setMenuOpen(false);
    }
  };

  const onBlur = (event: FocusEvent<HTMLElement>): void => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setPaused(false);
    }
  };

  const onTilt = (event: PointerEvent<HTMLElement>): void => {
    const laptop = laptopRef.current;
    if (!laptop || reducedMotion || event.pointerType !== 'mouse') {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    laptop.style.setProperty('--tilt-x', `${(-y * MAX_TILT_DEG).toFixed(2)}deg`);
    laptop.style.setProperty('--tilt-y', `${(x * MAX_TILT_DEG).toFixed(2)}deg`);
  };

  const resetTilt = (): void => {
    laptopRef.current?.style.setProperty('--tilt-x', '2deg');
    laptopRef.current?.style.setProperty('--tilt-y', '0deg');
  };

  const openMenu = (event: FormEvent | undefined, focusSearch: boolean): void => {
    event?.preventDefault();
    setMenuOpen(true);
    if (focusSearch) {
      window.setTimeout(() => document.getElementById(searchId)?.focus(), 0);
    }
  };

  return (
    <section
      className={styles.showcase}
      aria-roledescription="carrossel"
      aria-label="Área de trabalho com dicas e anúncios"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        resetTilt();
      }}
      onFocus={() => setPaused(true)}
      onBlur={onBlur}
      onPointerMove={onTilt}
    >
      <button
        type="button"
        className={cn(styles.arrow, styles.arrowPrevious)}
        onClick={showPrevious}
        aria-label="Tela anterior"
      >
        <Icon name="chevron" />
      </button>

      <div ref={laptopRef} className={styles.laptop}>
        <img
          className={styles.photo}
          src="/laptop-chassis.png"
          alt=""
          width={950}
          height={655}
        />
        <div className={styles.display}>
            <div className={styles.desktop}>
              {minimized ? null : (
                <article className={cn(styles.window, maximized && styles.windowMax)}>
                  <header className={styles.titleBar}>
                    <WindowMark />
                    <span className={styles.windowTitle}>{slide.tag}</span>
                    <div className={styles.captionButtons}>
                      <button
                        type="button"
                        aria-label="Minimizar"
                        onClick={() => setMinimized(true)}
                      >
                        <i />
                      </button>
                      <button
                        type="button"
                        aria-label={maximized ? 'Restaurar' : 'Maximizar'}
                        aria-pressed={maximized}
                        onClick={() => setMaximized((current) => !current)}
                      >
                        <b />
                      </button>
                      <button
                        type="button"
                        className={styles.close}
                        aria-label="Fechar e ver a próxima tela"
                        onClick={showNext}
                      >
                        <span />
                      </button>
                    </div>
                    {autoplay ? (
                      <span
                        key={slide.id}
                        className={styles.windowProgress}
                        style={{ '--duration': `${AUTOPLAY_MS}ms` } as CSSProperties}
                      />
                    ) : null}
                  </header>
                  <div
                    className={styles.windowBody}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} de ${phoneSlides.length}`}
                    aria-live={autoplay ? 'off' : 'polite'}
                  >
                    <WindowBody key={slide.id} slide={slide} direction={direction} />
                  </div>
                </article>
              )}

              {menuOpen ? (
                <div className={styles.startMenu}>
                  <p className={styles.menuTitle}>{companyConfig.name}</p>
                  <label className={styles.searchField} htmlFor={searchId}>
                    <SearchMark />
                    <input
                      id={searchId}
                      value={query}
                      placeholder="Pesquisar dicas e anúncios"
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </label>
                  <ul>
                    {visibleSlides.map((item) => {
                      const itemIndex = phoneSlides.indexOf(item);
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            aria-current={itemIndex === index ? 'true' : undefined}
                            onClick={() => goTo(itemIndex, itemIndex >= index ? 1 : -1)}
                          >
                            <Icon name={item.icon} />
                            <span>{item.title}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  {visibleSlides.length === 0 ? (
                    <p className={styles.empty}>Nenhuma tela com esse texto.</p>
                  ) : null}
                  <a href="#contato">Fale conosco</a>
                </div>
              ) : null}
            </div>

            <div className={styles.taskbar}>
              <div className={styles.pinned}>
                <button
                  type="button"
                  className={styles.start}
                  aria-label="Iniciar"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((current) => !current)}
                >
                  <WindowMark />
                </button>
                <button
                  type="button"
                  className={styles.start}
                  aria-label="Pesquisar"
                  onClick={() => openMenu(undefined, true)}
                >
                  <SearchMark />
                </button>
                {phoneSlides.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    className={styles.task}
                    aria-label={item.title}
                    aria-current={itemIndex === index ? 'true' : undefined}
                    onClick={() => {
                      if (itemIndex === index && minimized) {
                        setMinimized(false);
                        return;
                      }
                      goTo(itemIndex, itemIndex >= index ? 1 : -1);
                    }}
                  >
                    <Icon name={item.icon} />
                  </button>
                ))}
              </div>
              <div className={styles.tray}>
                <SystemTray />
                <time className={styles.clock} dateTime={new Date().toISOString()}>
                  <span>{clock.time}</span>
                  <span>{clock.date}</span>
                </time>
              </div>
            </div>
          </div>
      </div>

      <button
        type="button"
        className={cn(styles.arrow, styles.arrowNext)}
        onClick={showNext}
        aria-label="Próxima tela"
      >
        <Icon name="chevron" />
      </button>
    </section>
  );
}
