"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

type Progress = { current: number };
type Stream = {
  side: -1 | 1;
  length: number;
  width: number;
  y: number;
  slope: number;
  delay: number;
  phase: number;
  texture: 0 | 1;
  rotation: number;
};
const streams: Stream[] = [
  {
    side: -1,
    length: 12,
    width: 2.15,
    y: 0.25,
    slope: 0.42,
    delay: 0,
    phase: 0.2,
    texture: 0,
    rotation: -0.32,
  },
  {
    side: -1,
    length: 6.1,
    width: 1.85,
    y: 0.25,
    slope: -0.16,
    delay: 0.045,
    phase: 1.4,
    texture: 1,
    rotation: 0.12,
  },
  {
    side: -1,
    length: 8,
    width: 1.7,
    y: -0.18,
    slope: -0.48,
    delay: 0.09,
    phase: 2.6,
    texture: 0,
    rotation: 0.42,
  },
  {
    side: -1,
    length: 6.6,
    width: 2,
    y: -0.5,
    slope: 0.22,
    delay: 0.13,
    phase: 3.7,
    texture: 1,
    rotation: -0.72,
  },
  {
    side: 1,
    length: 12,
    width: 2.1,
    y: 0.22,
    slope: 0.48,
    delay: 0.025,
    phase: 0.9,
    texture: 1,
    rotation: 0.32,
  },
  {
    side: 1,
    length: 6,
    width: 1.8,
    y: 0.22,
    slope: -0.18,
    delay: 0.07,
    phase: 2.1,
    texture: 0,
    rotation: 0.22,
  },
  {
    side: 1,
    length: 11,
    width: 1.75,
    y: 0.2,
    slope: -0.44,
    delay: 0.11,
    phase: 3.2,
    texture: 1,
    rotation: -0.52,
  },
  {
    side: 1,
    length: 6.5,
    width: 2,
    y: -0.52,
    slope: 0.26,
    delay: 0.15,
    phase: 4.4,
    texture: 0,
    rotation: -0.72,
  },
];
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (n: number) => {
  const t = clamp(n);
  return t * t * (3 - 2 * t);
};

function SilkStream({
  stream,
  texture,
  progress,
}: {
  stream: Stream;
  texture: THREE.Texture;
  progress: Progress;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(1, 1, 88, 24);
    g.translate(0.5, 0, 0); // keep the fine attachment point anchored at the girl's back
    g.userData.base = Float32Array.from(
      g.attributes.position.array as Float32Array,
    );
    g.userData.baseUv = Float32Array.from(
      g.attributes.uv.array as Float32Array,
    );
    return g;
  }, []);
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: texture,
        color: "#fffdf8",
        transparent: true,
        opacity: 0,
        roughness: 0.48,
        metalness: 0,
        sheen: 0.8,
        sheenColor: "#fff8ea",
        sheenRoughness: 0.44,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    [texture],
  );

  useFrame(({ clock }) => {
    const reveal = smooth((progress.current - 0.2 - stream.delay) / 0.52);
    if (mesh.current) {
      mesh.current.scale.x = stream.side * stream.length * reveal;
      mesh.current.scale.y = stream.width;
    }
    const now = clock.elapsedTime * 0.62 + stream.phase;
    const positions = geometry.attributes.position as THREE.BufferAttribute;
    const uv = geometry.attributes.uv as THREE.BufferAttribute;
    const base = geometry.userData.base as Float32Array;
    const baseUv = geometry.userData.baseUv as Float32Array;

    for (let i = 0; i < positions.count; i++) {
      const u = base[i * 3];
      const v = base[i * 3 + 1];
      const wave =
        Math.sin(u * 8 + now) * 0.16 * u +
        Math.sin(u * 4.2 - now * 0.8) * 0.12 * u;
      const flutter = Math.sin(u * 13 + now * 1.4) * 0.035 * u;
      const edge = Math.sin((u * 0.94 + 0.03) * Math.PI);
      positions.setXYZ(
        i,
        u,
        v * (0.36 + 0.82 * Math.pow(Math.max(0, edge), 0.35)) +
          stream.slope * u * u +
          wave,
        Math.sin(u * 5 + now) * 0.12 + v * flutter,
      );
      // Reveal the image from its narrow root, keeping its texture scale intact as the cloth unfurls.
      uv.setXY(i, baseUv[i * 2] * reveal, baseUv[i * 2 + 1]);
    }
    positions.needsUpdate = true;
    uv.needsUpdate = true;
    geometry.computeVertexNormals();
    material.opacity = reveal * 0.92;
  });

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      material={material}
      position={[0, stream.y, -1.45]}
      scale={[0, stream.width, 1]}
      rotation={[0, 0, stream.rotation]}
      frustumCulled={false}
    />
  );
}

function Scene({ progress }: { progress: Progress }) {
  const [leftSource, rightSource] = useLoader(THREE.TextureLoader, [
    "/images/movement-silk-1.webp",
    "/images/movement-silk-2.webp",
  ]);
  const [leftSilk, rightSilk] = useMemo(
    () =>
      [leftSource, rightSource].map((source) => {
        const texture = source.clone();
        texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.repeat.set(1, 1);
        texture.anisotropy = 8;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;
        return texture;
      }),
    [leftSource, rightSource],
  );

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[-3, 5, 4]} intensity={1.7} color="#fff2df" />
      <Environment resolution={64}>
        <Lightformer
          form="rect"
          intensity={2.5}
          position={[-4, 3, 3]}
          scale={[5, 2, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.5}
          position={[4, 1, 2]}
          scale={[3, 5, 1]}
        />
      </Environment>
      {streams.map((stream, i) => (
        <SilkStream
          key={i}
          stream={stream}
          texture={stream.texture === 0 ? leftSilk : rightSilk}
          progress={progress}
        />
      ))}
    </>
  );
}

export default function MovementClothScene({
  progress,
  active,
}: {
  progress: Progress;
  active: boolean;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.35]}
      camera={{ position: [0, 0, 8], fov: 38 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <Scene progress={progress} />
    </Canvas>
  );
}
