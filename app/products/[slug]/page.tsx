import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/data";
import ProductGallery from "@/components/products/ProductGallery";
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));
export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug); if (!p) notFound();
  return <ProductGallery key={p.slug} product={p} />;
}
