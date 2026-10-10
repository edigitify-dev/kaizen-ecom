"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Product } from "@/lib/data";

export type CartItem = { id: string; slug: string; name: string; price: number; img: string; size: string; qty: number };
type Ctx = {
  items: CartItem[]; count: number; subtotal: number; drawerOpen: boolean; setDrawerOpen: (v: boolean) => void;
  add: (p: Product, size?: string) => void; setQty: (id: string, qty: number) => void; remove: (id: string) => void;
  searchOpen: boolean; setSearchOpen: (v: boolean) => void;
  introDone: boolean; setIntroDone: (v: boolean) => void;
};
const C = createContext<Ctx | null>(null);
export const useApp = () => { const c = useContext(C); if (!c) throw new Error("useApp outside Providers"); return c; };

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.6, smoothWheel: true, wheelMultiplier: 0.88, anchors: true, allowNestedScroll: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (pathname === "/" && !introDone) lenis.stop();
    else lenis.start();
  }, [pathname, introDone]);

  useEffect(() => { // hydrate cart after mount to avoid hydration mismatch
    try { const raw = localStorage.getItem("kaizen-cart"); if (raw) setItems(JSON.parse(raw)); } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) try { localStorage.setItem("kaizen-cart", JSON.stringify(items)); } catch {} }, [items, loaded]);

  const add = useCallback((p: Product, size = "M") => {
    const id = `${p.slug}-${size}`;
    setItems((cur) => cur.some((i) => i.id === id)
      ? cur.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
      : [...cur, { id, slug: p.slug, name: p.name, price: p.price, img: p.img, size, qty: 1 }]);
    setDrawerOpen(true);
  }, []);
  const setQty = useCallback((id: string, qty: number) =>
    setItems((cur) => (qty <= 0 ? cur.filter((i) => i.id !== id) : cur.map((i) => (i.id === id ? { ...i, qty } : i)))), []);
  const remove = useCallback((id: string) => setItems((cur) => cur.filter((i) => i.id !== id)), []);

  const value = useMemo<Ctx>(() => ({
    items, count: items.reduce((n, i) => n + i.qty, 0), subtotal: items.reduce((n, i) => n + i.qty * i.price, 0),
    drawerOpen, setDrawerOpen, add, setQty, remove, searchOpen, setSearchOpen, introDone, setIntroDone,
  }), [items, drawerOpen, searchOpen, introDone, add, setQty, remove]);
  return <C.Provider value={value}>{children}</C.Provider>;
}
