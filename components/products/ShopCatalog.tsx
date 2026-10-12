"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { collections, formatINR, products } from "@/lib/data";

type SortOrder = "featured" | "price-ascending" | "price-descending" | "name";

export default function ShopCatalog() {
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState("all");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [maxPrice, setMaxPrice] = useState(Math.max(...products.map((product) => product.price)));
  const [sort, setSort] = useState<SortOrder>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.trim().toLowerCase()) &&
      (collection === "all" || product.collections.includes(collection)) &&
      (!size || product.sizes.includes(size)) &&
      (!color || product.colors.some((swatch) => swatch.name === color)) &&
      product.price <= maxPrice
    );

    if (sort === "price-ascending") return filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-descending") return filtered.sort((a, b) => b.price - a.price);
    if (sort === "name") return filtered.sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [collection, color, maxPrice, query, size, sort]);

  const activeFilterCount = Number(collection !== "all") + Number(Boolean(size)) + Number(Boolean(color)) + Number(maxPrice < Math.max(...products.map((product) => product.price))) + Number(Boolean(query));
  const clearFilters = () => {
    setQuery(""); setCollection("all"); setSize(""); setColor("");
    setMaxPrice(Math.max(...products.map((product) => product.price)));
  };

  const filters = (
    <div className="space-y-8">
      <label className="block">
        <span className="label">Search products</span>
        <span className="mt-3 flex items-center gap-3 border-b border-obsidian/20 pb-2">
          <Search size={15} aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" className="w-full bg-transparent text-sm outline-none placeholder:text-obsidian/45" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={14} /></button>}
        </span>
      </label>

      <fieldset>
        <legend className="label">Collection</legend>
        <div className="mt-3 space-y-2.5 text-sm">
          <label className="flex cursor-pointer items-center gap-3"><input type="radio" name="collection" checked={collection === "all"} onChange={() => setCollection("all")} />All pieces</label>
          {collections.map((item) => <label key={item.slug} className="flex cursor-pointer items-center gap-3"><input type="radio" name="collection" checked={collection === item.slug} onChange={() => setCollection(item.slug)} />{item.name}</label>)}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label">Size</legend>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {["S", "M", "L", "XL"].map((item) => <button key={item} type="button" aria-pressed={size === item} onClick={() => setSize(size === item ? "" : item)} className={`h-10 border text-xs transition-colors ${size === item ? "border-obsidian bg-obsidian text-ivory" : "border-obsidian/20 hover:border-obsidian"}`}>{item}</button>)}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label">Color</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {Array.from(new Map(products.flatMap((product) => product.colors).map((swatch) => [swatch.name, swatch])).values()).map((swatch) => (
            <button key={swatch.name} type="button" title={swatch.name} aria-label={`Filter by ${swatch.name}`} aria-pressed={color === swatch.name} onClick={() => setColor(color === swatch.name ? "" : swatch.name)} className={`grid h-8 w-8 place-items-center rounded-full border ${color === swatch.name ? "border-obsidian ring-1 ring-obsidian ring-offset-2" : "border-obsidian/20"}`} style={{ background: swatch.hex }}><span className="sr-only">{swatch.name}</span></button>
          ))}
        </div>
        {color && <p className="mt-2 text-xs text-obsidian/60">{color}</p>}
      </fieldset>

      <label className="block">
        <span className="flex items-center justify-between"><span className="label">Maximum price</span><span className="text-xs">{formatINR(maxPrice)}</span></span>
        <input aria-label="Maximum price" type="range" min="999" max={Math.max(...products.map((product) => product.price))} step="100" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="mt-4 w-full accent-obsidian" />
        <span className="flex justify-between text-[10px] text-obsidian/50"><span>{formatINR(999)}</span><span>{formatINR(Math.max(...products.map((product) => product.price)))}</span></span>
      </label>

      {activeFilterCount > 0 && <button type="button" onClick={clearFilters} className="text-[10px] uppercase tracking-wider2 underline underline-offset-4">Clear all filters ({activeFilterCount})</button>}
    </div>
  );

  return (
    <>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-obsidian/15 py-4">
        <p className="text-xs text-obsidian/65" aria-live="polite">Showing <span className="font-medium text-obsidian">{visibleProducts.length}</span> of {products.length} pieces</p>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen} className="inline-flex items-center gap-2 border border-obsidian/20 px-4 py-2 text-[10px] uppercase tracking-wider2 lg:hidden"><SlidersHorizontal size={14} /> Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}</button>
          <label className="flex items-center gap-2 text-[10px] uppercase tracking-wider2">Sort by
            <select value={sort} onChange={(event) => setSort(event.target.value as SortOrder)} className="max-w-[150px] bg-transparent py-2 text-xs normal-case tracking-normal outline-none">
              <option value="featured">Featured</option><option value="price-ascending">Price: low to high</option><option value="price-descending">Price: high to low</option><option value="name">Name: A–Z</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="hidden lg:block" aria-label="Product filters">{filters}</aside>
        {filtersOpen && <div className="fixed inset-0 z-50 bg-obsidian/50 lg:hidden" role="presentation" onClick={() => setFiltersOpen(false)}>
          <section role="dialog" aria-modal="true" aria-label="Product filters" className="absolute inset-y-0 right-0 w-[min(88vw,380px)] overflow-y-auto bg-ivory p-6 text-obsidian" onClick={(event) => event.stopPropagation()}>
            <div className="mb-8 flex items-center justify-between"><h2 className="font-serif text-3xl">Filters</h2><button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X /></button></div>
            {filters}
            <button type="button" onClick={() => setFiltersOpen(false)} className="mt-8 min-h-12 w-full bg-obsidian px-5 text-[10px] uppercase tracking-wider2 text-ivory transition-colors hover:bg-obsidian/80">Show {visibleProducts.length} pieces</button>
          </section>
        </div>}

        <div>
          {visibleProducts.length > 0 ? <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-5 lg:grid-cols-3 xl:grid-cols-4">{visibleProducts.map((product) => <ProductCard key={product.slug} product={product} />)}</div> : (
            <div className="border border-obsidian/15 px-6 py-20 text-center"><p className="font-serif text-3xl">No pieces found</p><p className="mt-3 text-sm text-obsidian/60">Try adjusting your search or filters.</p><button type="button" onClick={clearFilters} className="mt-6 min-h-12 bg-obsidian px-5 text-[10px] uppercase tracking-wider2 text-ivory transition-colors hover:bg-obsidian/80">Clear filters</button></div>
          )}
        </div>
      </div>
    </>
  );
}
