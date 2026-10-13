import { ContactShadows } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useLayoutEffect, useRef, type ReactElement, type RefObject } from 'react';
import { MathUtils, Mesh, PMREMGenerator, type Group, type Scene, type WebGLRenderer } from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { ServiceId } from '../../../types/content';
import { Desk, Laptop, Phone, Printer, type Pose } from './devices';

type Pointer = {
  x: number;
  y: number;
};

type BenchCanvasProps = {
  focus: ServiceId;
  reducedMotion: boolean;
  pointer: RefObject<Pointer>;
};

const LAYOUT: Record<ServiceId, { laptop: Pose; phone: Pose; printer: Pose }> = {
  notebooks: {
    laptop: { position: [-0.12, 0, 0.02], rotation: [0, -0.55, 0], scale: 1 },
    phone: { position: [0.92, 0, 0.12], rotation: [0.04, -0.45, 0], scale: 1 },
    printer: { position: [-1.12, 0, -0.28], rotation: [0, 0.55, 0], scale: 0.82 },
  },
  celulares: {
    laptop: { position: [-0.72, 0, -0.2], rotation: [0, 0.45, 0], scale: 0.66 },
    phone: { position: [0.08, 0, 0.22], rotation: [0.02, -0.2, 0], scale: 1.28 },
    printer: { position: [0.95, 0, -0.32], rotation: [0, -0.4, 0], scale: 0.66 },
  },
  impressoras: {
    laptop: { position: [-0.82, 0, -0.18], rotation: [0, 0.6, 0], scale: 0.62 },
    phone: { position: [0.88, 0, 0.02], rotation: [0.04, -0.5, 0], scale: 0.78 },
    printer: { position: [0, 0, 0.12], rotation: [0, -0.25, 0], scale: 1.15 },
  },
  suporte: {
    laptop: { position: [-0.2, 0, 0.04], rotation: [0, -0.4, 0], scale: 0.86 },
    phone: { position: [0.76, 0, 0.14], rotation: [0.03, -0.35, 0], scale: 0.92 },
    printer: { position: [-0.98, 0, -0.24], rotation: [0, 0.45, 0], scale: 0.72 },
  },
};

function mountStudioEnvironment(renderer: WebGLRenderer, scene: Scene): () => void {
  const generator = new PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = generator.fromScene(room, 0.04).texture;
  scene.environment = environment;
  scene.environmentIntensity = 1.2;

  return () => {
    environment.dispose();
    generator.dispose();
    room.traverse((child) => {
      if (!(child instanceof Mesh)) {
        return;
      }

      child.geometry.dispose();
      if (Array.isArray(child.material)) {
        child.material.forEach((item) => item.dispose());
        return;
      }
      child.material.dispose();
    });
  };
}

function StudioLights(): null {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);

  useLayoutEffect(() => mountStudioEnvironment(gl, scene), [gl, scene]);

  return null;
}

function BenchScene({ focus, reducedMotion, pointer }: BenchCanvasProps): ReactElement {
  const rig = useRef<Group>(null);
  const layout = LAYOUT[focus];

  useFrame((state, delta) => {
    const node = rig.current;
    if (!node || reducedMotion) {
      return;
    }

    const time = state.clock.elapsedTime;
    const aimX = pointer.current.y * 0.08;
    const aimY = pointer.current.x * 0.28 + Math.sin(time * 0.35) * 0.08;
    node.rotation.x = MathUtils.damp(node.rotation.x, aimX, 2.4, delta);
    node.rotation.y = MathUtils.damp(node.rotation.y, aimY, 2.4, delta);
    node.position.y = Math.sin(time * 0.8) * 0.03;
  });

  return (
    <>
      <StudioLights />
      <ambientLight intensity={0.28} />
      <spotLight
        position={[2.6, 4.8, 2.8]}
        angle={0.5}
        penumbra={0.85}
        intensity={36}
        color="#fff6e8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-3.2, 2.4, -1.5]} intensity={1.8} color="#9eb6d8" />
      <directionalLight position={[0.4, 1.4, 4.2]} intensity={0.7} color="#ffffff" />
      <group ref={rig}>
        <Desk />
        <Laptop pose={layout.laptop} reducedMotion={reducedMotion} />
        <Phone pose={layout.phone} reducedMotion={reducedMotion} />
        <Printer pose={layout.printer} reducedMotion={reducedMotion} />
        <ContactShadows position={[0, 0.002, 0]} opacity={0.45} scale={7} blur={2.2} far={2.4} />
      </group>
    </>
  );
}

export function BenchCanvas({ focus, reducedMotion, pointer }: BenchCanvasProps): ReactElement {
  return (
    <Canvas
      camera={{ position: [0.35, 1.15, 4.7], fov: 30, near: 0.1, far: 30 }}
      dpr={[1, 1.6]}
      frameloop={reducedMotion ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true }}
      shadows
      onCreated={({ camera, gl }) => {
        camera.lookAt(0, 0.28, 0);
        gl.setClearColor('#071526', 0);
      }}
    >
      <BenchScene focus={focus} reducedMotion={reducedMotion} pointer={pointer} />
    </Canvas>
  );
}
