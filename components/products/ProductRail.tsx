import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import ProductCard from "./ProductCard";
import Reveal from "@/components/effects/Reveal";

export default function ProductRail() {
  return (
    <section id="new-arrivals" className="on-ivory scroll-mt-16 bg-ivory px-5 py-20 text-obsidian md:px-10 md:py-28" aria-labelledby="na-h">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><h2 id="na-h" className="font-serif text-5xl md:text-7xl">New Arrivals</h2>
            <p className="mt-3 max-w-sm text-obsidian/70">Fresh silhouettes. Timeless attitude.</p></div>
          <Link href="/shop" className="group flex items-center gap-3 text-[11px] uppercase tracking-wider2">View all <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></Link>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {products.slice(0, 4).map((p, i) => <Reveal key={p.slug} delay={i * 0.08}><ProductCard product={p} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}
