"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import Overlay from "@/components/ui/Overlay";
import { useApp } from "@/components/Providers";
import { formatINR } from "@/lib/data";

export default function CartDrawer() {
  const { drawerOpen, setDrawerOpen, items, subtotal, setQty, remove } = useApp();
  const close = () => setDrawerOpen(false);
  return (
    <Overlay open={drawerOpen} onClose={close} label="Shopping bag" side="right">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-ivory/10 px-6 py-5">
          <h2 className="label text-ivory">Bag ({items.reduce((n, i) => n + i.qty, 0)})</h2>
          <button onClick={close} aria-label="Close bag" className="p-1"><X size={18} /></button>
        </div>
        <div data-lenis-prevent className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-serif text-2xl">Your bag is empty.</p>
              <Link href="/shop" onClick={close} className="btn btn-ghost mt-8">Shop new arrivals</Link>
            </div>
          ) : (
            <ul className="divide-y divide-ivory/10">
              {items.map((i) => (
                <li key={i.id} className="flex gap-4 py-5">
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-soft"><Image src={i.img} alt={i.name} fill sizes="96px" className="object-cover" /></div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-3">
                      <div><Link href={`/products/${i.slug}`} onClick={close} className="text-sm hover:underline">{i.name}</Link>
                        <p className="label mt-1">Size {i.size}</p></div>
                      <p className="text-sm">{formatINR(i.price * i.qty)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-ivory/20">
                        <button aria-label={`Decrease ${i.name}`} onClick={() => setQty(i.id, i.qty - 1)} className="p-2"><Minus size={13} /></button>
                        <span className="w-8 text-center text-sm" aria-live="polite">{i.qty}</span>
                        <button aria-label={`Increase ${i.name}`} onClick={() => setQty(i.id, i.qty + 1)} className="p-2"><Plus size={13} /></button>
                      </div>
                      <button onClick={() => remove(i.id)} className="label underline-offset-4 hover:text-ivory hover:underline">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-ivory/10 px-6 py-6">
            <div className="mb-1 flex justify-between text-sm"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <p className="mb-5 text-xs text-muted">Shipping and taxes are calculated at checkout.</p>
            <button disabled className="btn btn-solid w-full cursor-not-allowed opacity-50" title="Checkout is not connected in this demo">Checkout unavailable in demo</button>
            <button onClick={close} className="btn btn-ghost mt-3 w-full">Continue shopping</button>
          </div>
        )}
      </div>
    </Overlay>
  );
}
