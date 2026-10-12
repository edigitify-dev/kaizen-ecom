import ShopCatalog from "@/components/products/ShopCatalog";
export const metadata = { title: "Shop — KAIZEN" };
export default function Shop() {
  return (
    <div className="on-ivory min-h-screen bg-ivory px-5 pb-24 pt-32 text-obsidian md:px-10">
      <div className="mx-auto max-w-[1600px]"><p className="label">The full collection</p><h1 className="mt-3 font-serif text-6xl md:text-8xl">Shop</h1><p className="mt-3 text-obsidian/70">Fresh silhouettes. Timeless attitude.</p>
        <ShopCatalog />
      </div>
    </div>
  );
}
