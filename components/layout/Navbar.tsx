"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { useApp } from "@/components/Providers";

export default function Navbar() {
  const { count, setDrawerOpen, setSearchOpen, introDone } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const home = pathname === "/";
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => { document.body.style.overflow = menu ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menu]);
  const hidden = home && !introDone;
  const icon = "relative p-2 transition-opacity hover:opacity-70";
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${hidden ? "opacity-0" : "opacity-100"} ${scrolled || !home ? "bg-obsidian/85 backdrop-blur-md" : "bg-transparent"}`}>
        <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
          <Link href="/" className="font-display text-xl tracking-[0.3em]" aria-label="KAIZEN home">KAIZEN</Link>
          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((l) => (
              <li key={l.label}><Link href={l.href} className="group relative text-[11px] uppercase tracking-wider2">
                {l.label}<span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-ivory transition-transform duration-300 group-hover:scale-x-100" />
              </Link></li>
            ))}
          </ul>
          <div className="flex items-center gap-1">
            <button className={icon} aria-label="Search" onClick={() => setSearchOpen(true)}><Search size={18} /></button>
            <Link className={`${icon} hidden sm:block`} href="/account" aria-label="Account"><User size={18} /></Link>
            <button className={icon} aria-label={`Open bag, ${count} items`} onClick={() => setDrawerOpen(true)}>
              <ShoppingBag size={18} />
              {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-ivory px-1 text-[10px] font-medium text-obsidian">{count}</span>}
            </button>
            <button className={`${icon} md:hidden`} aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => setMenu((m) => !m)}>{menu ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {menu && (
          <motion.div className="fixed inset-0 z-40 bg-obsidian pt-24 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ul className="flex flex-col px-6">
              {[...navLinks, { label: "Account", href: "/account" }].map((l, i) => (
                <motion.li key={l.label} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 * i }}>
                  <Link href={l.href} onClick={() => setMenu(false)} className="headline block border-b border-ivory/10 py-4 text-5xl">{l.label}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
