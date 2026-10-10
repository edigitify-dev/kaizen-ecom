"use client";
import { useEffect, useRef, useState } from "react";

export function hasWebGL() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
}
export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True only on capable, motion-OK desktop devices. Mobile/tablet get static art direction. */
export function useCan3D() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk(hasWebGL() && !prefersReducedMotion() && window.innerWidth >= 900 && (navigator.hardwareConcurrency || 4) >= 4);
  }, []);
  return ok;
}
export function useInView<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el); return () => io.disconnect();
  }, [rootMargin]);
  return [ref, inView] as const;
}
