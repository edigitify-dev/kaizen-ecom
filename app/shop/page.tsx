import { products } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";
export const metadata = { title: "Shop — KAIZEN" };
export default function Shop() {
  return (
    <div className="on-ivory min-h-screen bg-ivory px-5 pb-24 pt-32 text-obsidian md:px-10">
      <div className="mx-auto max-w-[1600px]"><h1 className="font-serif text-6xl md:text-8xl">Shop</h1><p className="mt-3 text-obsidian/70">Fresh silhouettes. Timeless attitude.</p>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">{products.map((p) => <ProductCard key={p.slug} product={p} />)}</div></div>
    </div>
  );
}
