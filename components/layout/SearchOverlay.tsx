"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import Overlay from "@/components/ui/Overlay";
import { useApp } from "@/components/Providers";
import { articles, collections, formatINR, products } from "@/lib/data";

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useApp();
  const [q, setQ] = useState("");
  const close = () => { setSearchOpen(false); setQ(""); };
  const r = useMemo(() => {
    const s = q.trim().toLowerCase(); if (!s) return null;
    return {
      p: products.filter((p) => p.name.toLowerCase().includes(s)),
      c: collections.filter((c) => c.name.toLowerCase().includes(s)),
      a: articles.filter((a) => a.title.toLowerCase().includes(s)),
    };
  }, [q]);
  const none = r && !r.p.length && !r.c.length && !r.a.length;
  const row = "flex items-baseline justify-between border-b border-ivory/10 py-3 text-sm hover:text-silver";
  return (
    <Overlay open={searchOpen} onClose={close} label="Search" side="top">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="flex items-center gap-4 border-b border-ivory/30 pb-3">
          <Search size={18} aria-hidden />
          <label htmlFor="site-search" className="sr-only">Search KAIZEN</label>
          <input id="site-search" data-autofocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, collections, journal"
            className="flex-1 bg-transparent font-serif text-2xl outline-none placeholder:text-muted" autoComplete="off" />
          <button onClick={close} aria-label="Close search"><X size={18} /></button>
        </div>
        <div className="min-h-[120px] py-6" aria-live="polite">
          {!r && <p className="label">Try &ldquo;hoodie&rdquo;, &ldquo;minimalist&rdquo; or &ldquo;silhouette&rdquo;.</p>}
          {none && <p className="font-serif text-xl">No results for &ldquo;{q}&rdquo;. Try a different word.</p>}
          {r?.p.map((p) => <Link key={p.slug} href={`/products/${p.slug}`} onClick={close} className={row}><span>{p.name}</span><span className="label">{formatINR(p.price)}</span></Link>)}
          {r?.c.map((c) => <Link key={c.slug} href={`/collections/${c.slug}`} onClick={close} className={row}><span>{c.name}</span><span className="label">Collection</span></Link>)}
          {r?.a.map((a) => <Link key={a.slug} href={`/journal/${a.slug}`} onClick={close} className={row}><span>{a.title}</span><span className="label">Journal</span></Link>)}
        </div>
      </div>
    </Overlay>
  );
}
