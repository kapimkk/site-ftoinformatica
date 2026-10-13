import { useRef, type PointerEvent, type ReactElement, type RefObject } from 'react';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import type { ServiceId } from '../../../types/content';
import { BenchCanvas } from './BenchCanvas';
import styles from './DeviceStage.module.css';

type DeviceStageProps = {
  focus: ServiceId;
};

type Pointer = {
  x: number;
  y: number;
};

export function DeviceStage({ focus }: DeviceStageProps): ReactElement {
  const stageRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const reducedMotion = usePrefersReducedMotion();

  const onPointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (reducedMotion || event.pointerType !== 'mouse') {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current.x = (event.clientX - bounds.left) / bounds.width - 0.5;
    pointer.current.y = (event.clientY - bounds.top) / bounds.height - 0.5;
  };

  const onPointerLeave = (): void => {
    pointer.current.x = 0;
    pointer.current.y = 0;
  };

  return (
    <div
      ref={stageRef}
      className={styles.stage}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-hidden="true"
    >
      <BenchCanvas
        focus={focus}
        reducedMotion={reducedMotion}
        pointer={pointer as RefObject<Pointer>}
      />
      <p className={styles.caption}>Bancada ilustrativa</p>
    </div>
  );
}
