"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Accessible modal/drawer shell: focus trap, Esc to close, scroll lock, focus return. */
export default function Overlay({ open, onClose, label, side = "center", children }:
  { open: boolean; onClose: () => void; label: string; side?: "center" | "right" | "top"; children: React.ReactNode }) {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const lock = document.body.style.overflow; document.body.style.overflow = "hidden";
    const focusables = () => Array.from(panel.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])') ?? []);
    setTimeout(() => (panel.current?.querySelector<HTMLElement>("[data-autofocus]") ?? focusables()[0])?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") { const f = focusables(); if (!f.length) return; const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = lock; prev?.focus?.(); };
  }, [open, onClose]);

  const pos = side === "right" ? "right-0 top-0 h-full w-full max-w-md" : side === "top" ? "left-0 right-0 top-0" : "left-1/2 top-1/2 w-[min(92vw,960px)] -translate-x-1/2 -translate-y-1/2";
  const from = side === "right" ? { x: "100%" } : side === "top" ? { y: "-100%" } : { opacity: 0, scale: 0.98 };
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]">
          <motion.div className="absolute inset-0 bg-black/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div ref={panel} role="dialog" aria-modal="true" aria-label={label}
            className={`absolute ${pos} bg-charcoal text-ivory shadow-2xl`}
            initial={from} animate={{ x: 0, y: 0, opacity: 1, scale: 1 }} exit={from} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
