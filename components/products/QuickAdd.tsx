"use client";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useApp } from "@/components/Providers";
import type { Product } from "@/lib/data";

export default function QuickAdd({ product }: { product: Product }) {
  const { add } = useApp(); const [done, setDone] = useState(false);
  return (
    <button aria-label={`Quick add ${product.name}, size M`} onClick={() => { add(product, "M"); setDone(true); setTimeout(() => setDone(false), 1400); }}
      className="grid h-10 w-10 place-items-center rounded-full bg-obsidian text-ivory transition-transform duration-300 hover:scale-105 active:scale-95">
      {done ? <Check size={16} /> : <Plus size={16} />}
    </button>
  );
}
