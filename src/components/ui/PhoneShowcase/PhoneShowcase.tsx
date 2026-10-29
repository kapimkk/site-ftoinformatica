import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  type ReactElement,
} from 'react';
import { companyConfig } from '../../../config/env';
import { phoneSlides } from '../../../content/phoneSlides';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import type { PhoneSlide, ServiceId } from '../../../types/content';
import { cn } from '../../../utils/cn';
import { Icon } from '../Icon/Icon';
import styles from './PhoneShowcase.module.css';

type PhoneShowcaseProps = {
  focus: ServiceId;
};

type Direction = 1 | -1;

const AUTOPLAY_MS = 5500;
const SWIPE_THRESHOLD_PX = 40;
const MAX_TILT_DEG = 10;

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

function useClock(): string {
  const [time, setTime] = useState(() => formatClock(new Date()));

  useEffect(() => {
    const timer = window.setInterval(() => setTime(formatClock(new Date())), 15_000);
    return () => window.clearInterval(timer);
  }, []);

  return time;
}

function SlideContent({
  slide,
  direction,
}: {
  slide: PhoneSlide;
  direction: Direction;
}): ReactElement {
  return (
    <div
      className={cn(styles.slide, direction === 1 ? styles.fromRight : styles.fromLeft)}
      data-kind={slide.kind}
    >
      {slide.image ? <img className={styles.slideImage} src={slide.image} alt="" /> : null}
      <span className={styles.iconBadge} style={{ '--i': 0 } as CSSProperties}>
        <Icon name={slide.icon} />
      </span>
      <span className={styles.tag} style={{ '--i': 1 } as CSSProperties}>
        {slide.tag}
      </span>
      <p className={styles.title} style={{ '--i': 2 } as CSSProperties}>
        {slide.title}
      </p>
      <p className={styles.text} style={{ '--i': 3 } as CSSProperties}>
        {slide.text}
      </p>
      <p className={styles.detail} style={{ '--i': 4 } as CSSProperties}>
        <strong>{slide.kind === 'ad' ? 'Saiba' : 'Dica'}</strong>
        {slide.detail}
      </p>
    </div>
  );
}

export function PhoneShowcase({ focus }: PhoneShowcaseProps): ReactElement {
  const reducedMotion = usePrefersReducedMotion();
  const time = useClock();
  const [index, setIndex] = useState(() => findServiceSlide(focus));
  const [direction, setDirection] = useState<Direction>(1);
  const [syncedFocus, setSyncedFocus] = useState(focus);
  const [paused, setPaused] = useState(false);
  const deviceRef = useRef<HTMLDivElement>(null);
  const swipeStartX = useRef<number | null>(null);

  if (focus !== syncedFocus) {
    const target = findServiceSlide(focus);
    setSyncedFocus(focus);
    setDirection(target >= index ? 1 : -1);
    setIndex(target);
  }

  const autoplay = !reducedMotion && !paused;
  const slide = phoneSlides[index];

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
    }
  };

  const onBlur = (event: FocusEvent<HTMLElement>): void => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setPaused(false);
    }
  };

  const onTilt = (event: PointerEvent<HTMLElement>): void => {
    const device = deviceRef.current;
    if (!device || reducedMotion || event.pointerType !== 'mouse') {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    device.style.setProperty('--tilt-x', `${(-y * MAX_TILT_DEG).toFixed(2)}deg`);
    device.style.setProperty('--tilt-y', `${(x * MAX_TILT_DEG).toFixed(2)}deg`);
    device.style.setProperty('--glare-x', `${((x + 0.5) * 100).toFixed(1)}%`);
  };

  const resetTilt = (): void => {
    const device = deviceRef.current;
    device?.style.setProperty('--tilt-x', '0deg');
    device?.style.setProperty('--tilt-y', '0deg');
    device?.style.setProperty('--glare-x', '30%');
  };

  const onSwipeStart = (event: PointerEvent<HTMLElement>): void => {
    swipeStartX.current = event.clientX;
  };

  const onSwipeEnd = (event: PointerEvent<HTMLElement>): void => {
    const start = swipeStartX.current;
    swipeStartX.current = null;
    if (start === null) {
      return;
    }

    const distance = event.clientX - start;
    if (distance <= -SWIPE_THRESHOLD_PX) {
      showNext();
    } else if (distance >= SWIPE_THRESHOLD_PX) {
      showPrevious();
    }
  };

  return (
    <section
      className={styles.showcase}
      aria-roledescription="carrossel"
      aria-label="Novidades e dicas de informática"
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

      <div className={styles.float}>
        <div ref={deviceRef} className={styles.device}>
          <span className={cn(styles.sideButton, styles.action)} aria-hidden="true" />
          <span className={cn(styles.sideButton, styles.volumeUp)} aria-hidden="true" />
          <span className={cn(styles.sideButton, styles.volumeDown)} aria-hidden="true" />
          <span className={cn(styles.sideButton, styles.power)} aria-hidden="true" />

          <div
            className={styles.screen}
            onPointerDown={onSwipeStart}
            onPointerUp={onSwipeEnd}
            onPointerCancel={() => {
              swipeStartX.current = null;
            }}
          >
            <div className={styles.statusBar} aria-hidden="true">
              <span className={styles.clock}>{time}</span>
              <span className={styles.island}>
                <span className={styles.lens} />
              </span>
              <span className={styles.indicators}>
                <span className={styles.signal}>
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.battery} />
              </span>
            </div>

            <div className={styles.progress} aria-hidden="true">
              {phoneSlides.map((item, itemIndex) => (
                <span
                  key={item.id}
                  className={styles.progressTrack}
                  data-state={
                    itemIndex < index ? 'done' : itemIndex === index ? 'active' : 'pending'
                  }
                >
                  {itemIndex === index ? (
                    <span
                      key={index}
                      className={styles.progressFill}
                      style={
                        {
                          '--duration': `${AUTOPLAY_MS}ms`,
                          animationPlayState: autoplay ? 'running' : 'paused',
                        } as CSSProperties
                      }
                    />
                  ) : null}
                </span>
              ))}
            </div>

            <div className={styles.appHeader} aria-hidden="true">
              <span className={styles.appMark}>FTO</span>
              <span>{companyConfig.name}</span>
              <span className={styles.counter}>
                {index + 1}/{phoneSlides.length}
              </span>
            </div>

            <div
              className={styles.viewport}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${phoneSlides.length}`}
              aria-live={autoplay ? 'off' : 'polite'}
            >
              <SlideContent key={slide.id} slide={slide} direction={direction} />
            </div>

            <a className={styles.cta} href="#contato">
              <Icon name="message" />
              Fale conosco
            </a>
            <span className={styles.homeIndicator} aria-hidden="true" />
          </div>
          <span className={styles.glare} aria-hidden="true" />
        </div>
        <span className={styles.shadow} aria-hidden="true" />
      </div>

      <button
        type="button"
        className={cn(styles.arrow, styles.arrowNext)}
        onClick={showNext}
        aria-label="Próxima tela"
      >
        <Icon name="chevron" />
      </button>

      <div className={styles.dots}>
        {phoneSlides.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            className={styles.dot}
            aria-label={`Ir para a tela ${itemIndex + 1}: ${item.title}`}
            aria-current={itemIndex === index ? 'true' : undefined}
            onClick={() => goTo(itemIndex, itemIndex >= index ? 1 : -1)}
          />
        ))}
      </div>
    </section>
  );
}
