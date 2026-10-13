import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, type ReactElement } from 'react';
import { CanvasTexture, MathUtils, SRGBColorSpace, type Group } from 'three';
import type { ServiceId } from '../../../types/content';
import type { Vec3 } from './devices';

type PartKind =
  | 'board'
  | 'battery'
  | 'camera'
  | 'screw'
  | 'shield'
  | 'driver'
  | 'flex'
  | 'chip'
  | 'roller'
  | 'heatsink';

type PartSpec = {
  id: string;
  kind: PartKind;
  offset: Vec3;
  rotation: Vec3;
  spin: number;
  phase: number;
};

type ExplodedPartsProps = {
  focus: ServiceId;
  origin: Vec3;
  reducedMotion: boolean;
};

const SPAWN: Vec3 = [0, 0.28, 0.04];

const PARTS: Record<ServiceId, PartSpec[]> = {
  notebooks: [
    {
      id: 'board',
      kind: 'board',
      offset: [-0.62, 0.92, 0.12],
      rotation: [0.4, 0.5, 0.2],
      spin: 0.35,
      phase: 0.2,
    },
    {
      id: 'battery',
      kind: 'battery',
      offset: [0.58, 0.62, 0.18],
      rotation: [0.2, -0.4, 0.15],
      spin: 0.22,
      phase: 1.1,
    },
    {
      id: 'camera',
      kind: 'camera',
      offset: [0.28, 1.12, -0.05],
      rotation: [0.5, 0.2, 0],
      spin: 0.4,
      phase: 2,
    },
    {
      id: 'shield',
      kind: 'shield',
      offset: [-0.28, 0.72, 0.32],
      rotation: [0.6, 0.3, 0.2],
      spin: 0.28,
      phase: 0.6,
    },
    {
      id: 'flex',
      kind: 'flex',
      offset: [0.05, 1.08, 0.22],
      rotation: [0.75, 0.15, 0.08],
      spin: 0.18,
      phase: 1.6,
    },
    {
      id: 'sink',
      kind: 'heatsink',
      offset: [0.46, 1.08, 0.08],
      rotation: [0.5, -0.25, 0.05],
      spin: 0.2,
      phase: 0.8,
    },
    {
      id: 'chip',
      kind: 'chip',
      offset: [-0.78, 0.48, 0.2],
      rotation: [0.2, 0.8, 0],
      spin: 0.5,
      phase: 2.4,
    },
    {
      id: 'screw-a',
      kind: 'screw',
      offset: [0.78, 0.38, 0.28],
      rotation: [0.4, 0, 0.6],
      spin: 0.8,
      phase: 0.4,
    },
    {
      id: 'screw-b',
      kind: 'screw',
      offset: [-0.42, 0.42, 0.4],
      rotation: [1, 0.2, 0],
      spin: 0.7,
      phase: 1.8,
    },
    {
      id: 'screw-c',
      kind: 'screw',
      offset: [0.42, 0.88, 0.05],
      rotation: [0.2, 0.4, 1],
      spin: 0.9,
      phase: 2.8,
    },
    {
      id: 'driver',
      kind: 'driver',
      offset: [0.82, 0.16, 0.42],
      rotation: [0.3, 0.4, -0.9],
      spin: 0.12,
      phase: 0.9,
    },
  ],
  celulares: [
    {
      id: 'board',
      kind: 'board',
      offset: [-0.48, 1.05, 0.08],
      rotation: [0.35, -0.4, 0.25],
      spin: 0.32,
      phase: 0.3,
    },
    {
      id: 'battery',
      kind: 'battery',
      offset: [0.46, 0.78, 0.12],
      rotation: [0.15, 0.5, -0.1],
      spin: 0.2,
      phase: 1.2,
    },
    {
      id: 'camera',
      kind: 'camera',
      offset: [-0.12, 1.28, 0.02],
      rotation: [0.6, 0.2, 0.1],
      spin: 0.45,
      phase: 2.1,
    },
    {
      id: 'shield',
      kind: 'shield',
      offset: [0.22, 1.08, 0.2],
      rotation: [0.5, -0.2, 0.4],
      spin: 0.26,
      phase: 0.7,
    },
    {
      id: 'flex',
      kind: 'flex',
      offset: [-0.42, 0.78, 0.18],
      rotation: [0.7, 0.2, 0.1],
      spin: 0.16,
      phase: 1.5,
    },
    {
      id: 'sink',
      kind: 'heatsink',
      offset: [0.28, 1.22, 0.06],
      rotation: [0.45, 0.35, 0.05],
      spin: 0.22,
      phase: 1.3,
    },
    {
      id: 'chip',
      kind: 'chip',
      offset: [0.52, 1.12, -0.02],
      rotation: [0.3, 0.6, 0],
      spin: 0.55,
      phase: 2.6,
    },
    {
      id: 'screw-a',
      kind: 'screw',
      offset: [-0.55, 0.42, 0.18],
      rotation: [0.8, 0, 0.4],
      spin: 0.85,
      phase: 0.5,
    },
    {
      id: 'screw-b',
      kind: 'screw',
      offset: [0.38, 0.42, 0.28],
      rotation: [1.1, 0.2, 0],
      spin: 0.75,
      phase: 1.9,
    },
    {
      id: 'screw-c',
      kind: 'screw',
      offset: [-0.22, 0.92, 0.28],
      rotation: [0.3, 0.5, 0.9],
      spin: 0.95,
      phase: 2.7,
    },
    {
      id: 'driver',
      kind: 'driver',
      offset: [0.62, 0.22, 0.32],
      rotation: [0.2, -0.3, 0.8],
      spin: 0.1,
      phase: 1,
    },
  ],
  impressoras: [
    {
      id: 'board',
      kind: 'board',
      offset: [-0.55, 0.72, 0.1],
      rotation: [0.45, 0.3, -0.2],
      spin: 0.3,
      phase: 0.4,
    },
    {
      id: 'roller',
      kind: 'roller',
      offset: [0.48, 0.58, 0.12],
      rotation: [0.2, 0.6, 1.2],
      spin: 0.4,
      phase: 1.3,
    },
    {
      id: 'shield',
      kind: 'shield',
      offset: [0.15, 0.88, 0.18],
      rotation: [0.5, 0.2, 0.2],
      spin: 0.24,
      phase: 0.8,
    },
    {
      id: 'flex',
      kind: 'flex',
      offset: [-0.22, 0.98, 0.14],
      rotation: [0.65, 0.1, 0.08],
      spin: 0.18,
      phase: 1.7,
    },
    {
      id: 'chip',
      kind: 'chip',
      offset: [0.58, 0.32, 0.22],
      rotation: [0.2, 0.8, 0],
      spin: 0.5,
      phase: 2.2,
    },
    {
      id: 'screw-a',
      kind: 'screw',
      offset: [-0.4, 0.38, 0.28],
      rotation: [0.7, 0, 0.5],
      spin: 0.8,
      phase: 0.6,
    },
    {
      id: 'screw-b',
      kind: 'screw',
      offset: [0.32, 0.48, 0.32],
      rotation: [1, 0.3, 0],
      spin: 0.7,
      phase: 1.8,
    },
    {
      id: 'driver',
      kind: 'driver',
      offset: [0.72, 0.18, 0.28],
      rotation: [0.25, 0.2, -0.7],
      spin: 0.12,
      phase: 1.1,
    },
  ],
  suporte: [
    {
      id: 'board',
      kind: 'board',
      offset: [0.55, 0.78, 0.12],
      rotation: [0.4, -0.5, 0.15],
      spin: 0.3,
      phase: 0.2,
    },
    {
      id: 'chip',
      kind: 'chip',
      offset: [-0.55, 0.7, 0.2],
      rotation: [0.25, 0.7, 0],
      spin: 0.48,
      phase: 1.4,
    },
    {
      id: 'flex',
      kind: 'flex',
      offset: [0.2, 1.05, 0.14],
      rotation: [0.65, 0.15, 0.08],
      spin: 0.16,
      phase: 2,
    },
    {
      id: 'shield',
      kind: 'shield',
      offset: [-0.25, 0.55, 0.35],
      rotation: [0.55, 0.4, 0.1],
      spin: 0.22,
      phase: 0.9,
    },
    {
      id: 'screw-a',
      kind: 'screw',
      offset: [0.72, 0.36, 0.22],
      rotation: [0.6, 0, 0.8],
      spin: 0.8,
      phase: 0.5,
    },
    {
      id: 'screw-b',
      kind: 'screw',
      offset: [-0.68, 0.4, 0.3],
      rotation: [1, 0.2, 0.2],
      spin: 0.72,
      phase: 1.6,
    },
    {
      id: 'driver',
      kind: 'driver',
      offset: [0.85, 0.14, 0.35],
      rotation: [0.2, 0.5, -1],
      spin: 0.1,
      phase: 1.2,
    },
    {
      id: 'camera',
      kind: 'camera',
      offset: [-0.1, 1.05, 0],
      rotation: [0.5, 0.3, 0],
      spin: 0.38,
      phase: 2.5,
    },
  ],
};

function createBoardTexture(): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const context = canvas.getContext('2d');
  const map = new CanvasTexture(canvas);
  map.colorSpace = SRGBColorSpace;
  if (!context) {
    return map;
  }

  context.fillStyle = '#0c6b45';
  context.fillRect(0, 0, 512, 320);
  context.strokeStyle = '#d6b25e';
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(24, 40);
  context.lineTo(180, 40);
  context.lineTo(180, 150);
  context.lineTo(360, 150);
  context.lineTo(420, 250);
  context.moveTo(40, 220);
  context.lineTo(200, 220);
  context.lineTo(260, 80);
  context.stroke();

  context.fillStyle = '#14181c';
  for (const chip of [
    [48, 70, 120, 70],
    [230, 48, 90, 90],
    [300, 180, 140, 60],
    [70, 200, 80, 50],
  ]) {
    context.beginPath();
    context.roundRect(chip[0], chip[1], chip[2], chip[3], 6);
    context.fill();
  }

  context.fillStyle = '#c9ccd1';
  for (let index = 0; index < 10; index += 1) {
    context.fillRect(250 + index * 10, 58, 3, 8);
    context.fillRect(250 + index * 10, 118, 3, 8);
  }

  context.fillStyle = '#e6c36a';
  for (let index = 0; index < 14; index += 1) {
    context.fillRect(8, 36 + index * 18, 14, 8);
  }

  map.needsUpdate = true;
  return map;
}

let boardMap: CanvasTexture | null = null;

function useBoardMap(): CanvasTexture {
  return useMemo(() => {
    boardMap ??= createBoardTexture();
    return boardMap;
  }, []);
}

function Board(): ReactElement {
  const map = useBoardMap();

  return (
    <mesh castShadow>
      <boxGeometry args={[0.34, 0.012, 0.22]} />
      <meshStandardMaterial map={map} color="#0c6b45" roughness={0.55} metalness={0.15} />
    </mesh>
  );
}

function Battery(): ReactElement {
  return (
    <group>
      <RoundedBox args={[0.2, 0.012, 0.32]} radius={0.008} smoothness={3} castShadow>
        <meshStandardMaterial color="#1a1d22" roughness={0.45} metalness={0.35} />
      </RoundedBox>
      <mesh position={[-0.07, 0.008, 0.12]}>
        <boxGeometry args={[0.04, 0.006, 0.03]} />
        <meshStandardMaterial color="#d7a441" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0.02, 0.008, -0.02]}>
        <boxGeometry args={[0.1, 0.004, 0.16]} />
        <meshStandardMaterial color="#2a3138" roughness={0.6} metalness={0.1} />
      </mesh>
    </group>
  );
}

function CameraModule(): ReactElement {
  return (
    <group>
      <RoundedBox args={[0.12, 0.03, 0.12]} radius={0.012} smoothness={3} castShadow>
        <meshStandardMaterial color="#0c0e12" metalness={0.7} roughness={0.25} />
      </RoundedBox>
      <mesh position={[-0.025, 0.02, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 0.012, 20]} />
        <meshStandardMaterial color="#16324a" metalness={0.85} roughness={0.12} />
      </mesh>
      <mesh position={[0.028, 0.02, -0.018]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.016, 0.016, 0.01, 16]} />
        <meshStandardMaterial color="#1a3a52" metalness={0.8} roughness={0.15} />
      </mesh>
    </group>
  );
}

function Screw(): ReactElement {
  return (
    <group>
      <mesh castShadow>
        <cylinderGeometry args={[0.018, 0.018, 0.008, 16]} />
        <meshStandardMaterial color="#c5c9ce" metalness={0.9} roughness={0.22} />
      </mesh>
      <mesh position={[0, -0.012, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.02, 12]} />
        <meshStandardMaterial color="#aeb4bb" metalness={0.85} roughness={0.28} />
      </mesh>
    </group>
  );
}

function Shield(): ReactElement {
  return (
    <RoundedBox args={[0.16, 0.02, 0.1]} radius={0.004} smoothness={2} castShadow>
      <meshStandardMaterial color="#d5d8dc" metalness={0.92} roughness={0.18} />
    </RoundedBox>
  );
}

function Driver(): ReactElement {
  return (
    <group>
      <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.018, 0.02, 0.12, 16]} />
        <meshStandardMaterial color="#f5c400" roughness={0.4} metalness={0.05} />
      </mesh>
      <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.021, 0.021, 0.03, 12]} />
        <meshStandardMaterial color="#1c2128" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.006, 0.006, 0.16, 10]} />
        <meshStandardMaterial color="#cfd3d8" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function FlexCable(): ReactElement {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.14, 0.01, 0.26]} />
        <meshStandardMaterial color="#d4843a" roughness={0.45} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.004, 0.09]}>
        <boxGeometry args={[0.06, 0.008, 0.03]} />
        <meshStandardMaterial color="#eceff3" metalness={0.2} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Heatsink(): ReactElement {
  const fins = [-0.045, -0.015, 0.015, 0.045];

  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.16, 0.018, 0.1]} />
        <meshStandardMaterial color="#c5ccd4" metalness={0.92} roughness={0.2} />
      </mesh>
      {fins.map((x) => (
        <mesh key={x} position={[x, 0.028, 0]} castShadow>
          <boxGeometry args={[0.012, 0.032, 0.1]} />
          <meshStandardMaterial color="#e4e8ed" metalness={0.88} roughness={0.18} />
        </mesh>
      ))}
    </group>
  );
}

function Chip(): ReactElement {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.08, 0.012, 0.08]} />
        <meshStandardMaterial color="#16191e" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.046]}>
        <boxGeometry args={[0.07, 0.006, 0.008]} />
        <meshStandardMaterial color="#d9dde2" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, -0.046]}>
        <boxGeometry args={[0.07, 0.006, 0.008]} />
        <meshStandardMaterial color="#d9dde2" metalness={0.85} roughness={0.25} />
      </mesh>
    </group>
  );
}

function Roller(): ReactElement {
  return (
    <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
      <cylinderGeometry args={[0.028, 0.028, 0.22, 20]} />
      <meshStandardMaterial color="#2a3038" roughness={0.55} metalness={0.2} />
    </mesh>
  );
}

function PartMesh({ kind }: { kind: PartKind }): ReactElement {
  switch (kind) {
    case 'board':
      return <Board />;
    case 'battery':
      return <Battery />;
    case 'camera':
      return <CameraModule />;
    case 'screw':
      return <Screw />;
    case 'shield':
      return <Shield />;
    case 'driver':
      return <Driver />;
    case 'flex':
      return <FlexCable />;
    case 'chip':
      return <Chip />;
    case 'roller':
      return <Roller />;
    case 'heatsink':
      return <Heatsink />;
  }
}

const PART_SCALE: Record<PartKind, number> = {
  board: 1.35,
  battery: 1.35,
  camera: 1.45,
  screw: 2.1,
  shield: 1.4,
  driver: 1.85,
  flex: 1.5,
  chip: 1.45,
  roller: 1.25,
  heatsink: 1.35,
};

function FloatingPart({
  spec,
  reducedMotion,
}: {
  spec: PartSpec;
  reducedMotion: boolean;
}): ReactElement {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) {
      return;
    }

    if (reducedMotion) {
      node.position.set(spec.offset[0], spec.offset[1], spec.offset[2]);
      node.rotation.set(spec.rotation[0], spec.rotation[1], spec.rotation[2]);
      return;
    }

    const time = state.clock.elapsedTime;
    const hover = Math.sin(time * 1.15 + spec.phase) * 0.03;
    node.position.x = MathUtils.damp(node.position.x, spec.offset[0], 1.8, delta);
    node.position.y = MathUtils.damp(node.position.y, spec.offset[1] + hover, 1.8, delta);
    node.position.z = MathUtils.damp(node.position.z, spec.offset[2], 1.8, delta);
    node.rotation.x = spec.rotation[0] + Math.sin(time * 0.45 + spec.phase) * 0.18;
    node.rotation.y = spec.rotation[1] + time * spec.spin;
    node.rotation.z = spec.rotation[2];
  });

  return (
    <group ref={group} position={SPAWN} rotation={spec.rotation} scale={PART_SCALE[spec.kind]}>
      <PartMesh kind={spec.kind} />
    </group>
  );
}

export function ExplodedParts({ focus, origin, reducedMotion }: ExplodedPartsProps): ReactElement {
  const parts = PARTS[focus];

  return (
    <group position={origin}>
      <group key={focus}>
        {parts.map((spec) => (
          <FloatingPart key={spec.id} spec={spec} reducedMotion={reducedMotion} />
        ))}
      </group>
    </group>
  );
}
