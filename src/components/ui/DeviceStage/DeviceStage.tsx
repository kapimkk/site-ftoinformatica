import { useRef, type PointerEvent, type ReactElement } from 'react';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import type { ServiceId } from '../../../types/content';
import styles from './DeviceStage.module.css';

type DeviceStageProps = {
  focus: ServiceId;
};

export function DeviceStage({ focus }: DeviceStageProps): ReactElement {
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const onPointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (reducedMotion || event.pointerType !== 'mouse') {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--tilt-x', `${(x * 18).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${(y * -12).toFixed(2)}deg`);
  };

  const onPointerLeave = (): void => {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }

    stage.style.setProperty('--tilt-x', '0deg');
    stage.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <div
      ref={stageRef}
      className={styles.stage}
      data-focus={focus}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-hidden="true"
    >
      <div className={styles.glow} />
      <div className={styles.tilt}>
        <div className={styles.float}>
          <div className={styles.world}>
            <div className={styles.floor} />
            <div className={styles.ring} />

            <div className={`${styles.slot} ${styles.laptopSlot}`}>
              <div className={styles.laptop}>
                <div className={styles.deck}>
                  <div className={styles.keys} />
                  <div className={styles.trackpad} />
                </div>
                <div className={styles.lid}>
                  <div className={styles.screen}>
                    <span className={styles.scan} />
                    <span className={styles.line} />
                    <span className={`${styles.line} ${styles.lineShort}`} />
                    <span className={`${styles.line} ${styles.lineMid}`} />
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.slot} ${styles.phoneSlot}`}>
              <div className={styles.phone}>
                <div className={styles.phoneScreen}>
                  <span className={styles.notch} />
                  <span className={styles.phoneLine} />
                  <span className={`${styles.phoneLine} ${styles.phoneLineShort}`} />
                </div>
              </div>
            </div>

            <div className={`${styles.slot} ${styles.printerSlot}`}>
              <div className={styles.printer}>
                <div className={styles.printerBody}>
                  <span className={styles.printerSlotMark} />
                </div>
                <div className={styles.paper}>
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.caption}>Bancada ilustrativa</p>
    </div>
  );
}
