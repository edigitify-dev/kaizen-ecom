"use client";
import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { useApp } from "@/components/Providers";
import { formatINR, type Product } from "@/lib/data";

export default function ProductGallery({ product }: { product: Product }) {
  const { add } = useApp();
  const [size, setSize] = useState("M"); const [color, setColor] = useState(product.colors[0].name); const [view, setView] = useState(0); const [added, setAdded] = useState(false);
  const imgs = Array.from(new Set([product.img, product.imgAlt]));
  return (
    <div className="mx-auto grid max-w-[1400px] gap-10 px-5 pb-24 pt-28 md:grid-cols-2 md:px-10 md:pt-32">
      <div>
        <div className="relative aspect-[4/5] overflow-hidden bg-soft"><Image src={imgs[view]} alt={product.alt} fill priority sizes="(min-width:768px) 50vw, 100vw" className="object-cover" /></div>
        <div className="mt-3 flex gap-3">{imgs.map((s, i) => (
          <button key={s} onClick={() => setView(i)} aria-label={`View image ${i + 1}`} aria-pressed={view === i} className={`relative h-24 w-20 overflow-hidden border ${view === i ? "border-ivory" : "border-transparent opacity-60"}`}><Image src={s} alt="" fill sizes="80px" className="object-cover" /></button>))}</div>
      </div>
      <div className="md:sticky md:top-32 md:self-start">
        <h1 className="headline text-5xl md:text-7xl">{product.name}</h1>
        <p className="mt-3 text-xl">{formatINR(product.price)}</p>
        <p className="mt-6 max-w-md text-silver">{product.description}</p>
        <fieldset className="mt-8"><legend className="label mb-3">Color — {color}</legend>
          <div className="flex gap-3">{product.colors.map((c) => <button key={c.name} onClick={() => setColor(c.name)} aria-label={c.name} aria-pressed={color === c.name} className={`h-8 w-8 rounded-full border ${color === c.name ? "ring-1 ring-ivory ring-offset-2 ring-offset-obsidian" : ""}`} style={{ background: c.hex }} />)}</div></fieldset>
        <fieldset className="mt-6"><legend className="label mb-3">Size</legend>
          <div className="flex gap-2">{product.sizes.map((s) => <button key={s} onClick={() => setSize(s)} aria-pressed={size === s} className={`h-11 w-14 border text-sm transition-colors ${size === s ? "border-ivory bg-ivory text-obsidian" : "border-ivory/25 hover:border-ivory"}`}>{s}</button>)}</div></fieldset>
        <button onClick={() => { add(product, size); setAdded(true); setTimeout(() => setAdded(false), 1500); }} className="btn btn-solid mt-8 w-full max-w-md">{added ? <>Added <Check size={14} /></> : "Add to bag"}</button>
        <ul className="mt-10 max-w-md divide-y divide-ivory/10 border-t border-ivory/10 text-sm text-silver">{product.details.map((d) => <li key={d} className="py-3">{d}</li>)}</ul>
      </div>
    </div>
  );
}
