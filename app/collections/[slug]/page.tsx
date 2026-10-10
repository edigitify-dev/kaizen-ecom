import Image from "next/image";
import { notFound } from "next/navigation";
import { collections, getCollection, products } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";
export const generateStaticParams = () => collections.map((c) => ({ slug: c.slug }));
export default function CollectionPage({ params }: { params: { slug: string } }) {
  const c = getCollection(params.slug); if (!c) notFound();
  const items = products.filter((p) => p.collections.includes(c.slug));
  return (
    <>
      <section className="relative flex h-[70svh] items-end overflow-hidden"><Image src={c.img} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        <div className="relative px-5 pb-12 md:px-10"><p className="label">Collection</p><h1 className="headline mt-3 text-6xl md:text-9xl">{c.name}</h1><p className="mt-4 max-w-md text-silver">{c.blurb}</p></div></section>
      <section className="px-5 py-16 md:px-10"><div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.slug} product={p} tone="dark" />)}</div></section>
    </>
  );
}
