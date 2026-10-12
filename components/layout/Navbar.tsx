"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { useApp } from "@/components/Providers";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const { count, setDrawerOpen, setSearchOpen, introDone } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const home = pathname === "/";

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.3,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    if (reduce) return;
    if (latest > prev && latest > 240) setHideOnScroll(true);
    else if (latest < prev) setHideOnScroll(false);
  });

  useEffect(() => setScrolled(window.scrollY > 40), []);
  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const introHidden = home && !introDone;
  const solid = scrolled || !home || menu;
  const slideUp = hideOnScroll && !menu;

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  const icon =
    "relative grid h-10 w-10 place-items-center rounded-full transition-all duration-300 hover:bg-ivory/10 active:scale-90";

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 md:px-6"
        initial={false}
        animate={{ y: slideUp ? -110 : 0, opacity: introHidden ? 0 : 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div
          className={`relative mx-auto transition-[max-width,margin,background-color,border-color,box-shadow,backdrop-filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            solid
              ? "mt-3 max-w-[1120px] rounded-full border border-ivory/10 bg-obsidian/70 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "mt-0 max-w-[1600px] rounded-full border border-transparent bg-transparent"
          }`}
        >
          <nav
            aria-label="Primary"
            className={`flex items-center justify-between px-4 transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-6 ${
              solid ? "h-14" : "h-16 md:h-20"
            }`}
          >
            <Link
              href="/"
              aria-label="KAIZEN home"
              className="font-display text-xl tracking-[0.3em] transition-[letter-spacing,opacity] duration-500 hover:tracking-[0.4em] hover:opacity-90"
            >
              KAIZEN
            </Link>

            <ul
              className="hidden items-center gap-1 md:flex"
              onMouseLeave={() => setHovered(null)}
            >
              {navLinks.map((l) => {
                const active = isActive(l.href);
                return (
                  <li
                    key={l.label}
                    className="relative"
                    onMouseEnter={() => setHovered(l.label)}
                  >
                    <Link
                      href={l.href}
                      className={`relative z-10 block px-4 py-2 text-[11px] uppercase tracking-wider2 transition-opacity duration-300 ${
                        active || hovered === l.label || hovered === null
                          ? "opacity-100"
                          : "opacity-50"
                      }`}
                    >
                      {l.label}
                    </Link>
                    {hovered === l.label && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-ivory/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      />
                    )}
                    {active && (
                      <motion.span
                        className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-ivory"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.18 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-0.5">
              <button
                className={icon}
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={18} />
              </button>
              <Link
                className={`${icon} hidden sm:grid`}
                href="/account"
                aria-label="Account"
              >
                <User size={18} />
              </Link>
              <button
                className={icon}
                aria-label={`Open bag, ${count} items`}
                onClick={() => setDrawerOpen(true)}
              >
                <ShoppingBag size={18} />
                <AnimatePresence mode="popLayout">
                  {count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 22,
                      }}
                      className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-ivory px-1 text-[10px] font-medium text-obsidian"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <button
                className={`${icon} md:hidden`}
                aria-label={menu ? "Close menu" : "Open menu"}
                aria-expanded={menu}
                onClick={() => setMenu((m) => !m)}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={menu ? "x" : "m"}
                    initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="grid place-items-center"
                  >
                    {menu ? <X size={20} /> : <Menu size={20} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </nav>

          {/* scroll progress line */}
          <motion.span
            aria-hidden
            style={{ scaleX: progress }}
            className={`pointer-events-none absolute bottom-0 left-6 right-6 h-px origin-left bg-ivory/50 transition-opacity duration-500 ${
              scrolled && !menu ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-obsidian px-6 pb-8 pt-28 md:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 36px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 36px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 36px) 36px)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <ul className="flex flex-col">
              {[...navLinks, { label: "Account", href: "/account" }].map(
                (l, i) => (
                  <li
                    key={l.label}
                    className="overflow-hidden border-b border-ivory/10"
                  >
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{
                        duration: 0.6,
                        ease: EASE,
                        delay: 0.12 + 0.06 * i,
                      }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setMenu(false)}
                        className="headline flex items-baseline justify-between py-4 text-5xl transition-opacity active:opacity-60"
                      >
                        {l.label}
                        <span className="text-xs tracking-wider2 opacity-40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ),
              )}
            </ul>
            <motion.p
              className="mt-auto text-[11px] uppercase tracking-wider2 opacity-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              KAIZEN — Continuous improvement
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
