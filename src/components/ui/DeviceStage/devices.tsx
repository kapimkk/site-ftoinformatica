import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef, type ReactElement } from 'react';
import {
  BoxGeometry,
  CanvasTexture,
  ExtrudeGeometry,
  MathUtils,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  Shape,
  SRGBColorSpace,
  type Group,
  type InstancedMesh,
  type Mesh,
} from 'three';
import { createLaptopScreen, createPhoneScreen } from './screenTexture';

export type Vec3 = [number, number, number];

export type Pose = {
  position: Vec3;
  rotation: Vec3;
  scale: number;
};

type DeviceProps = {
  pose: Pose;
  reducedMotion: boolean;
  opened?: boolean;
};

const CHASSIS = '#a7adb6';
const GRAPHITE = '#1a1e24';

function movePose(node: Group, pose: Pose, reducedMotion: boolean, delta: number): void {
  const [x, y, z] = pose.position;
  const [rx, ry, rz] = pose.rotation;

  if (reducedMotion) {
    node.position.set(x, y, z);
    node.rotation.set(rx, ry, rz);
    node.scale.setScalar(pose.scale);
    return;
  }

  node.position.x = MathUtils.damp(node.position.x, x, 3.2, delta);
  node.position.y = MathUtils.damp(node.position.y, y, 3.2, delta);
  node.position.z = MathUtils.damp(node.position.z, z, 3.2, delta);
  node.rotation.x = MathUtils.damp(node.rotation.x, rx, 3.2, delta);
  node.rotation.y = MathUtils.damp(node.rotation.y, ry, 3.2, delta);
  node.rotation.z = MathUtils.damp(node.rotation.z, rz, 3.2, delta);
  node.scale.setScalar(MathUtils.damp(node.scale.x, pose.scale, 3.2, delta));
}

function roundedRect(width: number, height: number, radius: number): Shape {
  const shape = new Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

function useScreen(create: () => HTMLCanvasElement): CanvasTexture {
  const texture = useMemo(() => {
    const map = new CanvasTexture(create());
    map.colorSpace = SRGBColorSpace;
    map.anisotropy = 8;
    return map;
  }, [create]);

  useLayoutEffect(() => () => texture.dispose(), [texture]);

  return texture;
}

function createGlintMap(): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 8;
  const context = canvas.getContext('2d');
  const map = new CanvasTexture(canvas);
  if (!context) {
    return map;
  }

  const gradient = context.createLinearGradient(0, 0, 128, 0);
  gradient.addColorStop(0, 'rgba(255,255,255,0)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.9)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 8);
  map.needsUpdate = true;
  map.colorSpace = SRGBColorSpace;
  return map;
}

function ScreenGlint({
  width,
  height,
  y,
  z,
  reducedMotion,
}: {
  width: number;
  height: number;
  y: number;
  z: number;
  reducedMotion: boolean;
}): ReactElement {
  const mesh = useRef<Mesh>(null);
  const map = useMemo(() => createGlintMap(), []);

  useLayoutEffect(() => () => map.dispose(), [map]);

  useFrame((state) => {
    const node = mesh.current;
    const material = node?.material;
    if (!node || !(material instanceof MeshBasicMaterial)) {
      return;
    }

    if (reducedMotion) {
      material.opacity = 0;
      return;
    }

    const cycle = (state.clock.elapsedTime % 5.5) / 5.5;
    node.position.x = MathUtils.lerp(-width * 0.45, width * 0.45, cycle);
    material.opacity = Math.sin(cycle * Math.PI) * 0.35;
  });

  return (
    <mesh ref={mesh} position={[0, y, z]}>
      <planeGeometry args={[width * 0.42, height]} />
      <meshBasicMaterial map={map} transparent opacity={0} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

function Keyboard(): ReactElement {
  const keys = useRef<InstancedMesh>(null);
  const geometry = useMemo(() => new BoxGeometry(0.056, 0.011, 0.046), []);
  const material = useMemo(
    () => new MeshStandardMaterial({ color: '#6d7580', roughness: 0.46, metalness: 0.35 }),
    [],
  );

  useLayoutEffect(() => {
    const mesh = keys.current;
    if (!mesh) {
      return;
    }

    const dummy = new Object3D();
    const rows = [
      { z: -0.3, count: 14, keyWidth: 0.056, gap: 0.008 },
      { z: -0.22, count: 14, keyWidth: 0.056, gap: 0.008 },
      { z: -0.14, count: 13, keyWidth: 0.06, gap: 0.008 },
      { z: -0.06, count: 12, keyWidth: 0.064, gap: 0.008 },
    ];
    let index = 0;

    for (const row of rows) {
      const span = row.count * row.keyWidth + (row.count - 1) * row.gap;
      for (let column = 0; column < row.count; column += 1) {
        const x = -span / 2 + row.keyWidth / 2 + column * (row.keyWidth + row.gap);
        dummy.position.set(x, 0.06, row.z);
        dummy.scale.set(1, 1, 1);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        mesh.setMatrixAt(index, dummy.matrix);
        index += 1;
      }
    }

    dummy.position.set(0, 0.06, 0.03);
    dummy.scale.set(7.2, 1, 1.15);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
    mesh.count = index + 1;
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();

    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return <instancedMesh ref={keys} args={[geometry, material, 54]} castShadow />;
}

export function Laptop({ pose, reducedMotion }: DeviceProps): ReactElement {
  const group = useRef<Group>(null);
  const screen = useScreen(createLaptopScreen);

  useFrame((_, delta) => {
    if (group.current) {
      movePose(group.current, pose, reducedMotion, delta);
    }
  });

  return (
    <group ref={group} position={pose.position} rotation={pose.rotation} scale={pose.scale}>
      <RoundedBox
        args={[1.5, 0.05, 1.06]}
        position={[0, 0.025, 0]}
        radius={0.018}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={CHASSIS}
          metalness={0.94}
          roughness={0.28}
          clearcoat={0.35}
          clearcoatRoughness={0.25}
        />
      </RoundedBox>
      <RoundedBox
        args={[1.32, 0.008, 0.5]}
        position={[0, 0.049, -0.14]}
        radius={0.004}
        smoothness={3}
        receiveShadow
      >
        <meshStandardMaterial color={GRAPHITE} metalness={0.35} roughness={0.62} />
      </RoundedBox>
      <Keyboard />
      <RoundedBox
        args={[0.4, 0.008, 0.26]}
        position={[0, 0.053, 0.3]}
        radius={0.012}
        smoothness={3}
      >
        <meshStandardMaterial color="#3c424b" metalness={0.45} roughness={0.4} />
      </RoundedBox>
      <mesh position={[-0.752, 0.028, 0.16]} castShadow>
        <boxGeometry args={[0.012, 0.008, 0.1]} />
        <meshStandardMaterial color="#07080b" />
      </mesh>
      <mesh position={[-0.752, 0.028, -0.02]}>
        <boxGeometry args={[0.012, 0.016, 0.055]} />
        <meshStandardMaterial color="#07080b" />
      </mesh>
      <mesh position={[0, 0.055, -0.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.016, 0.016, 1.18, 20]} />
        <meshStandardMaterial color="#6d737c" metalness={0.85} roughness={0.3} />
      </mesh>
      <group position={[0, 0.05, -0.5]} rotation={[-0.5, 0, 0]}>
        <RoundedBox
          args={[1.5, 0.98, 0.04]}
          position={[0, 0.49, 0]}
          radius={0.016}
          smoothness={4}
          castShadow
        >
          <meshPhysicalMaterial
            color={CHASSIS}
            metalness={0.94}
            roughness={0.26}
            clearcoat={0.4}
            clearcoatRoughness={0.2}
          />
        </RoundedBox>
        <mesh position={[0, 0.46, 0.021]}>
          <planeGeometry args={[1.38, 0.84]} />
          <meshBasicMaterial map={screen} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.46, 0.023]}>
          <planeGeometry args={[1.38, 0.84]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.08}
            roughness={0.05}
            metalness={0}
            color="#d7e4f5"
          />
        </mesh>
        <ScreenGlint width={1.38} height={0.84} y={0.46} z={0.028} reducedMotion={reducedMotion} />
        <mesh position={[0, 0.92, 0.022]}>
          <circleGeometry args={[0.012, 20]} />
          <meshStandardMaterial color="#11141a" metalness={0.2} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

function PhoneBody(): ReactElement {
  const geometry = useMemo(() => {
    const body = new ExtrudeGeometry(roundedRect(0.36, 0.78, 0.09), {
      depth: 0.036,
      bevelEnabled: false,
      curveSegments: 12,
    });
    body.translate(0, 0.39, -0.028);
    return body;
  }, []);

  useLayoutEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial
        color="#14181e"
        metalness={0.96}
        roughness={0.18}
        clearcoat={0.55}
        clearcoatRoughness={0.12}
      />
    </mesh>
  );
}

export function Phone({ pose, reducedMotion, opened = false }: DeviceProps): ReactElement {
  const group = useRef<Group>(null);
  const display = useRef<Group>(null);
  const screen = useScreen(createPhoneScreen);

  useFrame((_, delta) => {
    if (group.current) {
      movePose(group.current, pose, reducedMotion, delta);
    }

    const panel = display.current;
    if (!panel) {
      return;
    }

    const lift = opened ? 0.16 : 0;
    const gap = opened ? 0.26 : 0;
    if (reducedMotion) {
      panel.position.set(0, lift, gap);
      return;
    }

    panel.position.y = MathUtils.damp(panel.position.y, lift, 2.2, delta);
    panel.position.z = MathUtils.damp(panel.position.z, gap, 2.2, delta);
  });

  return (
    <group ref={group} position={pose.position} rotation={pose.rotation} scale={pose.scale}>
      <PhoneBody />
      <mesh position={[0, 0.4, 0.006]}>
        <planeGeometry args={[0.26, 0.58]} />
        <meshStandardMaterial color="#0c6b45" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[-0.04, 0.48, 0.004]}>
        <boxGeometry args={[0.1, 0.07, 0.004]} />
        <meshStandardMaterial color="#14181c" roughness={0.4} metalness={0.3} />
      </mesh>
      <group ref={display}>
        <mesh position={[0, 0.4, 0.012]}>
          <planeGeometry args={[0.3, 0.66]} />
          <meshBasicMaterial map={screen} toneMapped={false} />
        </mesh>
        <ScreenGlint width={0.3} height={0.66} y={0.4} z={0.014} reducedMotion={reducedMotion} />
      </group>
      <mesh position={[0.184, 0.52, 0]}>
        <boxGeometry args={[0.008, 0.07, 0.012]} />
        <meshStandardMaterial color="#0c0e12" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.184, 0.38, 0]}>
        <boxGeometry args={[0.008, 0.11, 0.012]} />
        <meshStandardMaterial color="#0c0e12" metalness={0.7} roughness={0.3} />
      </mesh>
      <RoundedBox
        args={[0.14, 0.14, 0.01]}
        position={[-0.07, 0.62, -0.026]}
        radius={0.02}
        smoothness={4}
      >
        <meshStandardMaterial color="#07090d" metalness={0.7} roughness={0.22} />
      </RoundedBox>
      <mesh position={[-0.1, 0.66, -0.033]}>
        <circleGeometry args={[0.016, 18]} />
        <meshStandardMaterial color="#1d3148" metalness={0.85} roughness={0.12} />
      </mesh>
      <mesh position={[-0.05, 0.66, -0.033]}>
        <circleGeometry args={[0.016, 18]} />
        <meshStandardMaterial color="#1d3148" metalness={0.85} roughness={0.12} />
      </mesh>
    </group>
  );
}

export function Printer({ pose, reducedMotion, opened = false }: DeviceProps): ReactElement {
  const group = useRef<Group>(null);
  const lid = useRef<Group>(null);
  const paper = useRef<Mesh>(null);
  const led = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      movePose(group.current, pose, reducedMotion, delta);
    }

    const sheet = paper.current;
    if (sheet && !reducedMotion) {
      sheet.position.z = 0.4 + Math.sin(state.clock.elapsedTime * 0.9) * 0.035;
    }

    const lamp = led.current?.material;
    if (lamp instanceof MeshStandardMaterial && !reducedMotion) {
      lamp.emissiveIntensity = 1.1 + Math.sin(state.clock.elapsedTime * 3) * 0.7;
    }

    const cover = lid.current;
    if (cover) {
      const angle = opened ? -0.75 : 0;
      cover.rotation.x = reducedMotion
        ? angle
        : MathUtils.damp(cover.rotation.x, angle, 2.2, delta);
    }
  });

  return (
    <group ref={group} position={pose.position} rotation={pose.rotation} scale={pose.scale}>
      <RoundedBox
        args={[0.78, 0.028, 0.34]}
        position={[0, 0.02, 0.16]}
        radius={0.008}
        smoothness={2}
        receiveShadow
      >
        <meshStandardMaterial color="#c5ccd4" metalness={0.12} roughness={0.45} />
      </RoundedBox>
      <RoundedBox
        args={[0.9, 0.22, 0.56]}
        position={[0, 0.15, -0.02]}
        radius={0.03}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#e7ebf0"
          metalness={0.18}
          roughness={0.32}
          clearcoat={0.2}
          clearcoatRoughness={0.3}
        />
      </RoundedBox>
      <group ref={lid} position={[0, 0.26, -0.28]}>
        <RoundedBox
          args={[0.82, 0.04, 0.48]}
          position={[0, 0.02, 0.24]}
          radius={0.016}
          smoothness={3}
          castShadow
        >
          <meshStandardMaterial color="#d5dbe2" metalness={0.16} roughness={0.38} />
        </RoundedBox>
        <mesh position={[0, 0.042, 0.24]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.62, 0.3]} />
          <meshStandardMaterial color="#243044" metalness={0.35} roughness={0.18} />
        </mesh>
      </group>
      <mesh position={[0, 0.12, 0.265]}>
        <boxGeometry args={[0.66, 0.035, 0.012]} />
        <meshStandardMaterial color="#1b2128" />
      </mesh>
      <mesh ref={paper} position={[0, 0.125, 0.4]} castShadow>
        <boxGeometry args={[0.58, 0.004, 0.26]} />
        <meshStandardMaterial color="#f7f8fb" roughness={0.85} metalness={0} />
      </mesh>
      <mesh position={[0.28, 0.18, 0.268]}>
        <boxGeometry args={[0.14, 0.07, 0.008]} />
        <meshBasicMaterial color="#102033" toneMapped={false} />
      </mesh>
      <mesh ref={led} position={[-0.28, 0.18, 0.268]}>
        <sphereGeometry args={[0.012, 16, 16]} />
        <meshStandardMaterial color="#f5c400" emissive="#f5c400" emissiveIntensity={1.4} />
      </mesh>
    </group>
  );
}

export function Desk(): ReactElement {
  return (
    <RoundedBox
      args={[3.05, 0.07, 1.4]}
      position={[0, -0.035, 0]}
      radius={0.04}
      smoothness={4}
      receiveShadow
    >
      <meshStandardMaterial color="#16304a" metalness={0.22} roughness={0.48} />
    </RoundedBox>
  );
}
