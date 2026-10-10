"use client";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export type ZState = { reveal: number; slide: number; cam: number };
type Ref = { current: ZState };
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => { t = clamp(t); return t * t * (3 - 2 * t); };
const CAM_Z = 8, FOV = 35;
const sliderY = (slide: number, h: number) => h * 0.3 - slide * h * 1.2;
const openAt = (y: number, sy: number, h: number) => smooth((y - sy) / (h * 0.75));

function Panel({ side, w, h, G, W, state, tex }: { side: 1 | -1; w: number; h: number; G: number; W: number; state: Ref; tex: THREE.Texture }) {
  const geo = useMemo(() => { const g = new THREE.PlaneGeometry(w, h, 28, 80); g.userData.base = Float32Array.from(g.attributes.position.array as Float32Array); return g; }, [w, h]);
  useFrame(({ clock }) => {
    const s = state.current, t = clock.elapsedTime, sy = sliderY(s.slide, h);
    const pos = geo.attributes.position as THREE.BufferAttribute, base = geo.userData.base as Float32Array;
    for (let i = 0; i < pos.count; i++) {
      const lx = base[i * 3], ly = base[i * 3 + 1], k = (w / 2 + side * lx) / w, a = openAt(ly, sy, h);
      const x = lx + side * (a * G * (1 - 0.3 * k) + a * 0.12 * Math.sin(ly * 2 + k * 2) + s.cam * W * (0.36 + 0.9 * k));
      const z = a * (0.5 * k + 0.8 * k * k) * (1 + 0.35 * Math.sin(ly * 1.7 + k * 4 + t * 0.7)) + s.cam * 2.5 * k;
      pos.setXYZ(i, x, ly, z);
    }
    pos.needsUpdate = true; geo.computeVertexNormals();
  });
  return (
    <mesh geometry={geo} position={[side * w / 2, 0, 0]} frustumCulled={false}>
      <meshPhysicalMaterial map={tex} bumpMap={tex} bumpScale={0.035} color="#b7b4ac" roughness={0.94} sheen={0.8} sheenColor="#4a4a46" sheenRoughness={0.62} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Teeth({ side, N, h, G, W, state }: { side: 1 | -1; N: number; h: number; G: number; W: number; state: Ref }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const d = useMemo(() => new THREE.Object3D(), []);
  const tooth = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.5, -0.3); shape.lineTo(-0.3, -0.5); shape.lineTo(0.38, -0.43);
    shape.lineTo(0.5, -0.18); shape.lineTo(0.37, 0.42); shape.lineTo(-0.32, 0.5); shape.lineTo(-0.5, 0.27); shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.42, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.07, bevelSegments: 3, curveSegments: 4 });
    geometry.translate(0, 0, -0.21);
    return geometry;
  }, []);
  const pitch = (h + 0.6) / N;
  useFrame(() => {
    const m = ref.current; if (!m) return;
    const s = state.current, sy = sliderY(s.slide, h);
    for (let i = 0; i < N; i++) {
      const y = h / 2 + 0.3 - i * pitch - (side > 0 ? pitch / 2 : 0);
      const a = openAt(y, sy, h), dist = Math.abs(i / N - 0.5) * 2;
      d.position.set(side * (0.055 + a * G + a * 0.12 * Math.sin(y * 2) + s.cam * W * 0.36), y, 0.1);
      d.rotation.set(side * 0.04, side * a * 0.5, (i % 2 ? 1 : -1) * 0.06);
      const reveal = clamp((s.reveal * 1.4 - dist) * 5);
      d.scale.set(0.15 * reveal, pitch * 1.16 * reveal, 0.11 * reveal);
      d.updateMatrix(); m.setMatrixAt(i, d.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[tooth, undefined, N]} frustumCulled={false}>
      <meshPhysicalMaterial color="#c8c6bf" metalness={0.96} roughness={0.2} clearcoat={0.85} clearcoatRoughness={0.16} envMapIntensity={1.5} />
    </instancedMesh>
  );
}

function Slider({ h, state }: { h: number; state: Ref }) {
  const g = useRef<THREE.Group>(null), tab = useRef<THREE.Group>(null);
  const body = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.2, 0.33); shape.lineTo(-0.3, 0.23); shape.lineTo(-0.22, 0.04);
    shape.lineTo(-0.13, -0.02); shape.lineTo(-0.13, -0.19); shape.lineTo(-0.15, -0.43);
    shape.quadraticCurveTo(-0.15, -0.55, 0, -0.55); shape.quadraticCurveTo(0.15, -0.55, 0.15, -0.43);
    shape.lineTo(0.13, -0.19); shape.lineTo(0.13, -0.02); shape.lineTo(0.22, 0.04);
    shape.lineTo(0.3, 0.23); shape.lineTo(0.2, 0.33); shape.closePath();
    const hole = new THREE.Path(); hole.absellipse(0, -0.36, 0.055, 0.075, 0, Math.PI * 2, true); shape.holes.push(hole);
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.09, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.025, bevelSegments: 4, curveSegments: 12 });
    geometry.translate(0, 0, -0.045);
    return geometry;
  }, []);
  useFrame(({ clock }) => {
    const s = state.current; if (!g.current || !tab.current) return;
    g.current.position.y = sliderY(s.slide, h); g.current.scale.setScalar(smooth(s.reveal * 2.2 - 0.6) * (1 + s.cam * 0.4));
    tab.current.rotation.z = Math.sin(clock.elapsedTime * 1.6) * 0.035 + (s.slide > 0 && s.slide < 1 ? 0.06 : 0);
  });
  return (
    <group ref={g} position={[0, 0, 0.12]}>
      <mesh geometry={body}>
        <meshPhysicalMaterial color="#c9c7c0" metalness={0.98} roughness={0.19} clearcoat={0.9} clearcoatRoughness={0.13} envMapIntensity={1.8} />
      </mesh>
      <RoundedBox args={[0.055, 0.3, 0.022]} radius={0.02} smoothness={4} position={[0, 0.145, 0.09]}>
        <meshStandardMaterial color="#77766f" metalness={1} roughness={0.3} />
      </RoundedBox>
      <group ref={tab} position={[0, 0, 0.08]}>
        <mesh position={[0, 0.27, 0]}><torusGeometry args={[0.12, 0.025, 8, 24]} /><meshPhysicalMaterial color="#c9c7c0" metalness={0.98} roughness={0.18} clearcoat={0.9} /></mesh>
      </group>
    </group>
  );
}

function Scene({ state, onReady }: { state: Ref; onReady: () => void }) {
  const size = useThree((s) => s.size), camera = useThree((s) => s.camera);
  const H = 2 * CAM_Z * Math.tan((FOV * Math.PI) / 360), W = H * (size.width / size.height);
  const [leftSource, rightSource] = useLoader(THREE.TextureLoader, ["/images/zipper-cloth-left.webp", "/images/zipper-cloth-right.webp"]);
  const [leftCloth, rightCloth] = useMemo(() => [leftSource, rightSource].map((source) => {
    const texture = source.clone();
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1, 1);
    texture.anisotropy = 8;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }), [leftSource, rightSource]);
  useEffect(() => { onReady(); }, [onReady]);
  const w = W / 2 + 0.2, G = W * 0.38, N = Math.ceil((H + 0.6) / 0.17);
  useFrame(() => { camera.position.z = CAM_Z - state.current.cam * 3.5; });
  return (
    <>
      <ambientLight intensity={0.34} />
      <directionalLight position={[3, 4, 5]} intensity={2.6} color="#fff4e0" />
      <spotLight position={[-5, -2, 6]} intensity={48} angle={0.55} penumbra={0.92} color="#aeb6c1" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={4} position={[-4, 3, 3]} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={2.5} position={[4, -2, 3]} scale={[2, 8, 1]} />
        <Lightformer form="ring" intensity={2} position={[0, 0, 5]} scale={4} />
      </Environment>
      <Panel side={-1} w={w} h={H + 0.8} G={G} W={W} state={state} tex={leftCloth} />
      <Panel side={1} w={w} h={H + 0.8} G={G} W={W} state={state} tex={rightCloth} />
      <Teeth side={-1} N={N} h={H + 0.8} G={G} W={W} state={state} />
      <Teeth side={1} N={N} h={H + 0.8} G={G} W={W} state={state} />
      <Slider h={H + 0.8} state={state} />
    </>
  );
}

export default function ZipperScene({ state, onReady }: { state: Ref; onReady: () => void }) {
  return (
    <Canvas gl={{ alpha: true, antialias: true }} dpr={[1, 1.35]} camera={{ position: [0, 0, CAM_Z], fov: FOV }} style={{ background: "transparent" }}>
      <Scene state={state} onReady={onReady} />
    </Canvas>
  );
}
