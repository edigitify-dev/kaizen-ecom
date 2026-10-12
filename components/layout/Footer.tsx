"use client";
import { useState } from "react";
import Link from "next/link";
import { Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { subscribe } from "@/lib/newsletter";

const cols = [
  { h: "Shop", l: [["New arrivals", "/shop"], ["The Minimalist", "/collections/the-minimalist"], ["The After Hours", "/collections/the-after-hours"], ["The Unconventional", "/collections/the-unconventional"]] },
  { h: "Company", l: [["About", "/about"], ["Our process", "/about#values"], ["Journal", "/#journal"]] },
  { h: "Help", l: [["Size guide", "/legal/size-guide"], ["Shipping", "/legal/shipping"], ["Returns", "/legal/returns"], ["FAQ", "/legal/faq"]] },
];

function Newsletter() {
  const [email, setEmail] = useState(""); const [state, setState] = useState<{ ok: boolean; msg: string } | null>(null); const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    const r = await subscribe(email); setState({ ok: r.ok, msg: r.message }); setBusy(false); if (r.ok) setEmail("");
  }
  return (
    <form onSubmit={submit} noValidate>
      <h3 className="font-serif text-3xl">Stay in the loop.</h3>
      <p className="mt-2 text-sm text-muted">Early access to drops, stories and behind-the-scenes.</p>
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <div className="mt-5 flex border border-ivory/25 focus-within:border-ivory">
        <input id="nl-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" aria-invalid={state ? !state.ok : undefined} aria-describedby="nl-msg"
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted" />
        <button type="submit" disabled={busy} aria-label="Subscribe" className="bg-ivory px-5 text-obsidian transition-colors hover:bg-silver disabled:opacity-60"><ArrowRight size={16} /></button>
      </div>
      <p id="nl-msg" role="status" className={`mt-3 min-h-5 text-xs ${state && !state.ok ? "text-red-300" : "text-muted"}`}>{state?.msg}</p>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-obsidian px-5 pb-8 pt-16 md:px-10">
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="font-display text-3xl tracking-[0.3em]">KAIZEN</p>
          <p className="mt-4 max-w-xs text-sm text-muted">Independent contemporary streetwear for people who move differently.</p>
          <div className="mt-6 flex gap-4 text-muted">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-ivory"><Instagram size={18} /></a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-ivory"><Twitter size={18} /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-ivory"><Youtube size={18} /></a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-5">
          {cols.map((c) => (
            <div key={c.h}><h3 className="label text-ivory">{c.h}</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted">{c.l.map(([t, h]) => <li key={t}><Link href={h} className="hover:text-ivory">{t}</Link></li>)}</ul></div>
          ))}
        </div>
        <div className="md:col-span-4"><Newsletter /></div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1600px] flex-col justify-between gap-3 border-t border-ivory/10 pt-6 text-xs text-muted sm:flex-row">
        <p>&copy; 2026 KAIZEN. Demo storefront.</p>
        <p className="flex gap-6"><Link href="/legal/privacy" className="hover:text-ivory">Privacy policy</Link><Link href="/legal/terms" className="hover:text-ivory">Terms</Link></p>
      </div>
    </footer>
  );
}
