import Image from "next/image";
import Link from "next/link";
import { formatINR, type Product } from "@/lib/data";
import QuickAdd from "./QuickAdd";

export default function ProductCard({ product, tone = "ivory" }: { product: Product; tone?: "ivory" | "dark" }) {
  const dark = tone === "dark";
  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className={`relative block aspect-[4/5] overflow-hidden ${dark ? "bg-soft" : "bg-obsidian/10"}`} aria-label={`View ${product.name}`}>
        <Image src={product.img} alt={product.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0" />
        <Image src={product.imgAlt} alt="" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" />
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-medium leading-snug"><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
          <p className={`mt-1 text-sm ${dark ? "text-muted" : "text-obsidian/60"}`}>{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(product.price)}</p>
          <ul className="mt-3 flex gap-2" aria-label="Available colors">{product.colors.map((c) => <li key={c.name} title={c.name} className="h-3.5 w-3.5 rounded-full border border-current/30" style={{ background: c.hex }}><span className="sr-only">{c.name}</span></li>)}</ul>
        </div>
        <QuickAdd product={product} />
      </div>
    </article>
  );
}
export { formatINR };
