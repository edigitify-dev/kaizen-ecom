"use client";
import { useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

type P = { current: number };
function Ribbon({ pos, rot, speed, seed, opacity = 0.32, length = 7, width = 1.8, texture }: { pos: [number, number, number]; rot: [number, number, number]; speed: number; seed: number; opacity?: number; length?: number; width?: number; texture?: THREE.Texture }) {
  const geo = useMemo(() => { const g = new THREE.PlaneGeometry(length, width, 72, 22); g.userData.base = Float32Array.from(g.attributes.position.array as Float32Array); return g; }, [length, width]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed, p = geo.attributes.position as THREE.BufferAttribute, b = geo.userData.base as Float32Array;
    for (let i = 0; i < p.count; i++) { const x = b[i * 3], y = b[i * 3 + 1];
      p.setXYZ(i, x, y + Math.sin(x * 0.7 + t * 0.6 + seed) * 0.35, Math.sin(x * 1.1 + t + seed) * 0.55 + Math.cos(y * 2 + t * 0.7) * 0.2); }
    p.needsUpdate = true; geo.computeVertexNormals();
  });
  return <mesh geometry={geo} position={pos} rotation={rot} frustumCulled={false}>
    <meshPhysicalMaterial map={texture} color={texture ? "#ffffff" : "#d9d5ca"} transparent opacity={opacity} roughness={0.55} side={THREE.DoubleSide} depthWrite={false} sheen={1} sheenColor="#fff" />
  </mesh>;
}

function HeroFabricRibbons() {
  const [sourceA, sourceB] = useLoader(THREE.TextureLoader, ["/images/hero-black-cloth-1.webp", "/images/hero-black-cloth-2.webp"]);
  const [fabricA, fabricB] = useMemo(() => [sourceA, sourceB].map((source) => {
    const texture = source.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }), [sourceA, sourceB]);

  return <>
    <Ribbon pos={[0, 1.05, -1.15]} rot={[0.12, -0.08, 0.04]} speed={0.34} seed={4.4} opacity={0.94} length={14} width={4.5} texture={fabricA} />
    <Ribbon pos={[0, -1.15, -1.8]} rot={[-0.1, Math.PI - 0.08, -0.1]} speed={0.28} seed={7.1} opacity={0.88} length={14.5} width={4.6} texture={fabricB} />
  </>;
}

function Rocks() {
  const geo = useMemo(() => { const g = new THREE.PlaneGeometry(18, 9, 90, 45); const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i); const r = Math.max(0, 1 - Math.abs(y) / 3.6);
      p.setZ(i, (Math.sin(x * 1.3) * Math.cos(y * 1.7) * 0.5 + Math.sin(x * 3.1 + y * 2.3) * 0.18 + Math.sin(x * 0.5) * 0.4) * r); }
    g.computeVertexNormals(); return g; }, []);
  return <mesh geometry={geo} rotation={[-Math.PI / 2.15, 0, 0]} position={[0, -2.4, -1]}><meshStandardMaterial color="#1b1b19" roughness={0.75} flatShading /></mesh>;
}

function Rig({ progress, variant }: { progress: P; variant: "hero" | "movement" }) {
  useFrame((s) => {
    const p = progress.current, c = s.camera;
    const tx = variant === "hero" ? s.pointer.x * 0.35 : 0, ty = variant === "hero" ? s.pointer.y * 0.2 : 0;
    c.position.x += (tx - c.position.x) * 0.04; c.position.y += (ty + (variant === "movement" ? 0.4 : 0) - c.position.y) * 0.04;
    c.position.z = variant === "movement" ? 8.5 - p * 3 : 8; c.lookAt(0, variant === "movement" ? -0.2 : 0, 0);
  });
  return null;
}

export default function RibbonScene({ variant, progress, active }: { variant: "hero" | "movement"; progress: P; active: boolean }) {
  const hero = variant === "hero";
  return (
    <Canvas frameloop={active ? "always" : "never"} dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 38 }} gl={{ alpha: true, antialias: true }}
      eventSource={typeof document !== "undefined" ? document.body : undefined} eventPrefix="client" style={{ background: "transparent" }}>
      <ambientLight intensity={0.2} /><directionalLight position={[4, 5, 3]} intensity={hero ? 2 : 3} />
      <Environment resolution={64}><Lightformer form="rect" intensity={3} position={[-3, 3, 4]} scale={[5, 2, 1]} /><Lightformer form="rect" intensity={1.5} position={[4, 0, 2]} scale={[1.5, 6, 1]} /></Environment>
      {hero ? <>
        <Ribbon pos={[2.6, 1.6, -1]} rot={[0.2, -0.4, -0.5]} speed={0.5} seed={0} length={9.5} width={2.4} />
        <Ribbon pos={[3.2, -0.6, -2]} rot={[-0.1, -0.5, 0.4]} speed={0.4} seed={2} opacity={0.22} length={10} width={2.5} />
        <HeroFabricRibbons />
      </> : <>
        <Ribbon pos={[-3.2, 1.8, -1]} rot={[0.1, 0.4, 0.5]} speed={0.45} seed={1} />
        <Ribbon pos={[3.4, 1.3, -1.5]} rot={[0.1, -0.4, -0.45]} speed={0.4} seed={3} />
        <Ribbon pos={[0, 2.8, -3]} rot={[0.5, 0, 0.1]} speed={0.3} seed={5} opacity={0.2} />
        <Rocks />
      </>}
      <Rig progress={progress} variant={variant} />
    </Canvas>
  );
}
