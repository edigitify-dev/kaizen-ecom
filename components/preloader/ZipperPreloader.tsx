"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useApp } from "@/components/Providers";
import { hasWebGL, prefersReducedMotion } from "@/lib/hooks";
import type { ZState } from "./ZipperScene";

const ZipperScene = dynamic(() => import("./ZipperScene"), { ssr: false });
const STATUS = ["LOADING", "UNZIPPING", "ENTERING", "WELCOME"];

/** Cinematic intro: textured Three.js zipper on desktop, photo-textured CSS fallback on small screens. */
export default function ZipperPreloader() {
  const { setIntroDone } = useApp();
  const [mode, setMode] = useState<"init" | "3d" | "static" | "off">("init");
  const [sceneReady, setSceneReady] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const [status, setStatus] = useState(0);
  const root = useRef<HTMLDivElement>(null),
    veil = useRef<HTMLDivElement>(null),
    line = useRef<HTMLDivElement>(null);
  const sceneLayer = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const z = useRef<ZState>({ reveal: 0, slide: 0, cam: 0 });

  const finish = useCallback(() => {
    setIntroDone(true);
    setMode("off");
    document.body.style.overflow = "";
  }, [setIntroDone]);
  const handleSceneReady = useCallback(() => setSceneReady(true), []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      finish();
      return;
    }
    document.body.style.overflow = "hidden";
    setMode(window.innerWidth < 768 || !hasWebGL() ? "static" : "3d");
    // Real readiness: fonts + the hero image, capped so we never hold the user hostage.
    const heroBackground = new Image();
    heroBackground.src = "/images/hero-background.webp";
    const heroModel = new Image();
    heroModel.src = "/images/hero-model.png";
    const zipper = new Image();
    zipper.src = "/images/zipper-intro-wide.webp";
    const leftCloth = new Image();
    leftCloth.src = "/images/zipper-cloth-left.webp";
    const rightCloth = new Image();
    rightCloth.src = "/images/zipper-cloth-right.webp";
    const ready = Promise.all([
      document.fonts?.ready,
      heroBackground.decode?.().catch(() => {}),
      heroModel.decode?.().catch(() => {}),
      zipper.decode?.().catch(() => {}),
      leftCloth.decode?.().catch(() => {}),
      rightCloth.decode?.().catch(() => {}),
    ]);
    Promise.race([ready, new Promise((r) => setTimeout(r, 4000))]).then(() =>
      setAssetsReady(true),
    );
    return () => {
      document.body.style.overflow = "";
    };
  }, [finish]);

  useEffect(() => {
    if (mode !== "3d" || sceneReady) return;
    const timeout = window.setTimeout(
      () => setMode((current) => (current === "3d" ? "static" : current)),
      2600,
    );
    return () => window.clearTimeout(timeout);
  }, [mode, sceneReady]);

  useEffect(() => {
    // static fallback: two halves part, no WebGL
    if (mode !== "static" || !assetsReady) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });
      tlRef.current = tl;
      tl.call(() => setStatus(1), [], 0.6)
        .to(
          ".kz-half-l",
          { xPercent: -105, duration: 1.1, ease: "power3.inOut" },
          0.8,
        )
        .to(
          ".kz-half-r",
          { xPercent: 105, duration: 1.1, ease: "power3.inOut" },
          0.8,
        )
        .call(() => setIntroDone(true), [], 1.5)
        .to(root.current, { opacity: 0, duration: 0.3 }, 1.9);
    }, root);
    return () => ctx.revert();
  }, [mode, assetsReady, finish, setIntroDone]);

  useEffect(() => {
    // 3D timeline (~3.4s), starts only when scene + assets are really ready
    if (mode !== "3d" || !sceneReady || !assetsReady) return;
    const s = z.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });
      tlRef.current = tl;
      tl.to(
        sceneLayer.current,
        { opacity: 1, duration: 0.35, ease: "power2.out" },
        0,
      )
        .to(
          veil.current,
          { "--w": "60%", duration: 0.8, ease: "power2.out" },
          0.1,
        )
        .to(line.current, { opacity: 0.9, duration: 0.5 }, 0)
        .to(s, { reveal: 1, duration: 1, ease: "none" }, 0.5)
        .call(() => setStatus(1), [], 1.3)
        .to(s, { slide: 1, duration: 1.5, ease: "power2.inOut" }, 1.3)
        .to(line.current, { opacity: 0, duration: 0.5 }, 1.9)
        .call(() => setStatus(2), [], 2.6)
        .to(s, { cam: 1, duration: 0.9, ease: "power2.in" }, 2.6)
        .call(
          () => {
            setStatus(3);
            setIntroDone(true);
          },
          [],
          2.95,
        )
        .to(root.current, { opacity: 0, duration: 0.4 }, 3.1);
    }, root);
    return () => ctx.revert();
  }, [mode, sceneReady, assetsReady, finish, setIntroDone]);

  if (mode === "off") return null;
  return (
    <div
      ref={root}
      className="fixed inset-0 z-[80] bg-transparent"
      role="status"
      aria-label="Loading KAIZEN"
    >
      {mode === "static" && (
        <>
          <div className="kz-fabric-panel kz-half-l absolute inset-y-0 left-0 w-1/2" />
          <div className="kz-fabric-panel kz-half-r absolute inset-y-0 right-0 w-1/2" />
        </>
      )}
      {mode === "init" && <div className="absolute inset-0 bg-obsidian" />}
      {mode === "3d" && (
        <>
          <div ref={sceneLayer} className="absolute inset-0">
            <ZipperScene state={z} onReady={handleSceneReady} />
          </div>
        </>
      )}
      {mode === "3d" && (
        <div
          ref={veil}
          className="pointer-events-none absolute inset-0 bg-obsidian"
          style={{
            ["--w" as string]: "0%",
            maskImage:
              "linear-gradient(90deg,#000 calc(50% - var(--w)),transparent calc(50% - var(--w)),transparent calc(50% + var(--w)),#000 calc(50% + var(--w)))",
            WebkitMaskImage:
              "linear-gradient(90deg,#000 calc(50% - var(--w)),transparent calc(50% - var(--w)),transparent calc(50% + var(--w)),#000 calc(50% + var(--w)))",
          }}
        />
      )}
      <div
        ref={line}
        className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-ivory/70 to-transparent opacity-0"
      />
      <p
        className="label absolute bottom-8 left-6 text-ivory/70 md:left-10"
        aria-live="polite"
      >
        {STATUS[status]}
        {status < 3 ? "…" : ""}
      </p>
      <button
        onClick={() => {
          tlRef.current ? tlRef.current.timeScale(8) : finish();
        }}
        className="label absolute bottom-8 right-6 border-b border-ivory/30 pb-0.5 text-ivory/70 transition-colors hover:text-ivory md:right-10"
      >
        Skip intro
      </button>
    </div>
  );
}
