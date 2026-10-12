"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MoveUpRight, Ruler } from "lucide-react";
import { useApp } from "@/components/Providers";
import { formatINR, products, type Product } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";

type InfoTab = "description" | "details";

export default function ProductGallery({ product }: { product: Product }) {
  const { add } = useApp();
  const [size, setSize] = useState("M");
  const [color, setColor] = useState(product.colors[0].name);
  const [view, setView] = useState(0);
  const [activeTab, setActiveTab] = useState<InfoTab>("description");
  const [added, setAdded] = useState(false);
  const imgs = Array.from(new Set([product.img, product.imgAlt]));
  const recommendations = products
    .filter((item) => item.slug !== product.slug && item.collections.some((collection) => product.collections.includes(collection)))
    .slice(0, 4);
  const garmentName = product.name.split(" ").pop()?.toLowerCase() || "clothing";
  const detailImages = [product.img, product.imgAlt !== product.img ? product.imgAlt : "/images/textile.webp", "/images/stitch.webp"];
  const styleImages = [
    { src: "/images/journal-people.png", alt: "Streetwear editorial in a design studio" },
    { src: "/images/stories-in-motion-hero.png", alt: "Streetwear editorial on a city rooftop" },
    { src: "/images/journal-style.png", alt: "Streetwear silhouettes in a studio" },
    { src: "/images/journal-cities.png", alt: "Streetwear editorial overlooking the city" },
  ];

  return (
    <div className="bg-obsidian pb-24 pt-28 text-ivory md:pt-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-wider2 text-muted">
          <Link href="/shop" className="transition-colors hover:text-ivory">Shop</Link>
          <span aria-hidden>/</span>
          <span className="truncate text-ivory/80">{product.name}</span>
        </nav>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] md:gap-10 lg:gap-16">
          <section aria-label={`${product.name} images`}>
            <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
              <Image
                src={imgs[view]}
                alt={product.alt}
                fill
                priority
                sizes="(min-width:768px) 58vw, 100vw"
                className="object-cover"
              />
              {imgs.length > 1 && (
                <span className="absolute bottom-4 right-4 bg-obsidian/75 px-3 py-2 text-[9px] uppercase tracking-wider2 text-ivory backdrop-blur-sm">
                  {String(view + 1).padStart(2, "0")} / {String(imgs.length).padStart(2, "0")}
                </span>
              )}
            </div>
            {imgs.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {imgs.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setView(index)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={view === index}
                    className={`relative aspect-[4/5] overflow-hidden border transition-opacity ${view === index ? "border-ivory" : "border-transparent opacity-55 hover:opacity-90"}`}
                  >
                    <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="md:sticky md:top-28 md:h-fit" aria-labelledby="product-title">
            <p className="label">Kaizen / {product.collections[0]?.replaceAll("-", " ")}</p>
            <h1 id="product-title" className="headline mt-4 text-5xl md:text-6xl lg:text-7xl">{product.name}</h1>
            <div className="mt-5 border-b border-ivory/15 pb-5">
              <p className="text-lg">{formatINR(product.price)}</p>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-silver">{product.description}</p>

            <fieldset className="mt-7">
              <legend className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-wider2">
                Color <span className="text-muted">/</span> <span className="text-silver">{color}</span>
              </legend>
              <div className="flex gap-3">
                {product.colors.map((swatch) => (
                  <button
                    key={swatch.name}
                    type="button"
                    onClick={() => setColor(swatch.name)}
                    aria-label={swatch.name}
                    aria-pressed={color === swatch.name}
                    className={`grid h-9 w-9 place-items-center rounded-full border transition-all ${color === swatch.name ? "border-ivory ring-1 ring-ivory ring-offset-2 ring-offset-obsidian" : "border-ivory/20 hover:border-ivory/70"}`}
                    style={{ background: swatch.hex }}
                  >
                    <span className="sr-only">{swatch.name}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-7">
              <legend className="mb-3 flex w-full items-center justify-between text-[10px] uppercase tracking-wider2">
                <span>Choose size <span className="text-muted">/</span> {size}</span>
                <Link href="/legal/size-guide" className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ivory"><Ruler size={13} /> Size guide</Link>
              </legend>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((itemSize) => (
                  <button
                    key={itemSize}
                    type="button"
                    onClick={() => setSize(itemSize)}
                    aria-pressed={size === itemSize}
                    className={`h-12 border text-xs transition-colors ${size === itemSize ? "border-ivory bg-ivory text-obsidian" : "border-ivory/20 hover:border-ivory"}`}
                  >
                    {itemSize}
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={() => { add(product, size); setAdded(true); setTimeout(() => setAdded(false), 1500); }}
              className="btn btn-solid mt-7 flex min-h-14 w-full items-center justify-center gap-3"
            >
              {added ? <>Added to bag <Check size={15} /></> : "Add to bag"}
            </button>
            <div className="mt-8 border-y border-ivory/15">
              <div role="tablist" aria-label="Product information" className="flex gap-6 border-b border-ivory/10">
                {(["description", "details"] as const).map((tab) => (
                  <button
                    key={tab}
                    id={`product-tab-${tab}`}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab}
                    aria-controls="product-info-panel"
                    onClick={() => setActiveTab(tab)}
                    className={`relative py-4 text-[9px] uppercase tracking-[0.18em] transition-colors ${activeTab === tab ? "text-ivory" : "text-muted hover:text-ivory"}`}
                  >
                    {tab}
                    {activeTab === tab && <span className="absolute inset-x-0 bottom-0 h-px bg-ivory" />}
                  </button>
                ))}
              </div>
              <div id="product-info-panel" role="tabpanel" aria-labelledby={`product-tab-${activeTab}`} className="py-5 text-sm leading-relaxed text-silver">
                {activeTab === "description" ? (
                  <p>{product.description}</p>
                ) : (
                  <ul className="space-y-3">
                    {product.details.map((detail) => <li key={detail} className="flex items-start gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ivory/70" />{detail}</li>)}
                  </ul>
                )}
              </div>
            </div>
          </section>
        </div>

        <section className="mt-14 grid grid-cols-2 border-y border-ivory/15 py-5 md:grid-cols-4" aria-label="Product details at a glance">
          {product.details.slice(0, 4).map((detail, index) => (
            <div key={detail} className={`flex items-center gap-3 px-3 py-2 sm:px-5 ${index > 0 ? "border-l border-ivory/10" : ""}`}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ivory/25 text-muted"><Check size={14} /></span>
              <div><span className="label">0{index + 1}</span><p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-ivory/90">{detail}</p></div>
            </div>
          ))}
        </section>

        <section className="mt-20 grid gap-8 border-b border-ivory/15 pb-16 lg:grid-cols-12 lg:items-end" aria-labelledby="product-story-title">
          <div className="lg:col-span-3">
            <p className="label">Built for movement</p>
            <h2 id="product-story-title" className="headline mt-3 text-5xl md:text-6xl">More than<br />just {garmentName}.</h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-silver">{product.description}</p>
            <Link href={`/collections/${product.collections[0]}`} className="group mt-6 inline-flex items-center gap-3 border border-ivory/35 px-4 py-3 text-[9px] uppercase tracking-wider2 transition-colors hover:bg-ivory hover:text-obsidian">
              Explore the collection <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:col-span-9">
            {detailImages.map((src, index) => (
              <div key={`${src}-${index}`} className={`relative overflow-hidden bg-charcoal ${index === 0 ? "aspect-[0.82/1]" : "aspect-[0.82/1]"}`}>
                <Image src={src} alt={index === 0 ? product.alt : index === 1 ? "Fabric texture detail" : "Garment stitching detail"} fill sizes="(min-width:1024px) 24vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 border-b border-ivory/15 pb-16 lg:grid-cols-12" aria-labelledby="key-features-title">
          <div className="lg:col-span-3">
            <p className="label">Key features</p>
            <h2 id="key-features-title" className="headline mt-3 text-4xl md:text-5xl">Function meets form</h2>
            <p className="mt-4 text-sm leading-relaxed text-silver">Thoughtful details, shaped around the way you wear it.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-9">
            {product.details.slice(0, 4).map((detail, index) => (
              <article key={detail}>
                <div className="relative aspect-square overflow-hidden bg-charcoal">
                  <Image src={detailImages[index % detailImages.length]} alt="" fill sizes="(min-width:1024px) 18vw, 45vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                </div>
                <p className="label mt-3">0{index + 1} / Detail</p>
                <h3 className="mt-2 text-[10px] uppercase tracking-[0.12em]">{detail}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{product.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-4 lg:grid-cols-2" aria-label="Materials and size guide">
          <div className="relative min-h-[430px] overflow-hidden bg-charcoal p-6 sm:p-10">
            <Image src="/images/textile.webp" alt="Close-up of dark woven fabric" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover opacity-45" />
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/60 to-obsidian/20" />
            <div className="relative z-10 max-w-md">
              <p className="label">Product details</p>
              <h2 className="headline mt-3 text-5xl md:text-6xl">Made to move</h2>
              <p className="mt-4 text-sm leading-relaxed text-silver">{product.description}</p>
              <ul className="mt-7 space-y-4">
                {product.details.slice(0, 3).map((detail, index) => (
                  <li key={detail} className="flex items-center gap-3 border-t border-ivory/15 pt-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ivory/25 text-muted"><MoveUpRight size={14} /></span>
                    <div><p className="label">0{index + 1} / Detail</p><p className="mt-1 text-xs text-ivory/90">{detail}</p></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border border-ivory/15 p-6 sm:p-10">
            <p className="label">Size guide</p>
            <h2 className="headline mt-3 text-5xl md:text-6xl">Find your fit</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-silver">Choose from the sizes available for this piece. Your selected size is reflected in the product options above.</p>
            <div className="mt-7 overflow-hidden border border-ivory/15">
              <div className="grid grid-cols-2 bg-ivory/5 px-4 py-3 text-[9px] uppercase tracking-wider2 text-muted"><span>Available size</span><span className="text-right">Select</span></div>
              {product.sizes.map((itemSize) => (
                <button key={itemSize} type="button" onClick={() => { setSize(itemSize); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="grid w-full grid-cols-2 border-t border-ivory/10 px-4 py-3 text-left text-xs transition-colors hover:bg-ivory/5">
                  <span>{itemSize}</span><span className={`text-right uppercase tracking-wider2 ${size === itemSize ? "text-ivory" : "text-muted"}`}>{size === itemSize ? "Selected" : "Choose"}</span>
                </button>
              ))}
            </div>
            <Link href="/legal/size-guide" className="mt-5 inline-flex items-center gap-2 text-[9px] uppercase tracking-wider2 text-silver transition-colors hover:text-ivory"><Ruler size={13} /> View size guide</Link>
          </div>
        </section>

        <section className="mt-20 border-t border-ivory/15 pt-10" aria-labelledby="style-inspiration-title">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="label">Editorial styling</p><h2 id="style-inspiration-title" className="headline mt-2 text-5xl md:text-6xl">Styled in motion</h2></div>
            <p className="max-w-sm text-xs leading-relaxed text-muted">Streetwear references and silhouettes from the KAIZEN journal.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {styleImages.map((item) => (
              <div key={item.src} className="relative aspect-[0.82/1] overflow-hidden bg-charcoal">
                <Image src={item.src} alt={item.alt} fill sizes="(min-width:640px) 25vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </section>

        {recommendations.length > 0 && (
          <section className="mt-24 border-t border-ivory/15 pt-10" aria-labelledby="recommendations-title">
            <div className="mb-8 flex items-end justify-between">
              <div><p className="label">Complete the look</p><h2 id="recommendations-title" className="headline mt-2 text-4xl md:text-5xl">Pair it with</h2></div>
              <Link href="/shop" className="hidden items-center gap-2 text-[9px] uppercase tracking-wider2 transition-colors hover:text-silver sm:flex">View all <span aria-hidden>→</span></Link>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
              {recommendations.map((item) => <ProductCard key={item.slug} product={item} tone="dark" />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
