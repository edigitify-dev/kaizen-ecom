export type Swatch = { name: string; hex: string };
export type Product = {
  slug: string; name: string; price: number; img: string; imgAlt: string; alt: string;
  colors: Swatch[]; sizes: string[]; collections: string[]; description: string; details: string[];
};
export const SIZES = ["S", "M", "L", "XL"];
const palette: Record<string, Swatch> = {
  black: { name: "Black", hex: "#0c0c0c" }, sand: { name: "Sand", hex: "#b7a58c" },
  slate: { name: "Slate", hex: "#4a4b4d" }, ash: { name: "Ash", hex: "#8a8985" },
};

export const products: Product[] = [
  { slug: "shadow-hoodie", name: "Shadow Hoodie", price: 2499, img: "/images/shadow-hoodie.webp", imgAlt: "/images/shadow-hoodie-alt.webp",
    alt: "Black oversized Shadow Hoodie", colors: [palette.black, palette.sand, palette.slate], sizes: SIZES, collections: ["the-minimalist", "the-after-hours"],
    description: "A heavyweight oversized hoodie cut with a dropped shoulder and a deep hood that holds its shape.",
    details: ["Oversized fit", "Dropped shoulder", "Double-layer hood", "Ribbed cuffs and hem"] },
  { slug: "utility-cargo-pants", name: "Utility Cargo Pants", price: 2299, img: "/images/utility-cargo.webp", imgAlt: "/images/utility-cargo-alt.webp",
    alt: "Black utility cargo pants", colors: [palette.sand, palette.black, palette.slate], sizes: SIZES, collections: ["the-unconventional", "the-after-hours"],
    description: "Relaxed cargo trousers with articulated knees and utility pockets built for everyday movement.",
    details: ["Relaxed straight leg", "Articulated knee", "Cargo pockets", "Adjustable hem"] },
  { slug: "oversized-tee", name: "Oversized Tee", price: 1499, img: "/images/oversized-tee.webp", imgAlt: "/images/oversized-tee-alt.webp",
    alt: "Black oversized tee", colors: [palette.black, palette.sand, palette.ash], sizes: SIZES, collections: ["the-minimalist", "the-unconventional"],
    description: "A boxy, heavy cotton tee with a clean neckline and a quiet chest mark.",
    details: ["Boxy oversized fit", "Heavy cotton jersey", "Ribbed collar", "Small chest mark"] },
  { slug: "nylon-jacket", name: "Nylon Jacket", price: 3299, img: "/images/nylon-jacket.webp", imgAlt: "/images/nylon-jacket-alt.webp",
    alt: "Black technical nylon jacket", colors: [palette.sand, palette.black, palette.slate], sizes: SIZES, collections: ["the-after-hours", "the-unconventional", "the-minimalist"],
    description: "A technical nylon jacket with a structured collar, concealed zip and a sculptural silhouette.",
    details: ["Structured collar", "Concealed front zip", "Water-resistant finish", "Sculpted sleeve"] },
];
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export type Collection = { slug: string; name: string; line: string; img: string; blurb: string };
export const collections: Collection[] = [
  { slug: "the-minimalist", name: "The Minimalist", line: "Clean. Timeless. Versatile.", img: "/images/minimalist.webp", blurb: "Quiet silhouettes and honest materials for people who let the fit do the talking." },
  { slug: "the-after-hours", name: "The After Hours", line: "Bold. Edgy. Expressive.", img: "/images/after-hours.webp", blurb: "Darker tones and stronger shapes, made for the part of the day that starts late." },
  { slug: "the-unconventional", name: "The Unconventional", line: "Experimental. Fearless. Different.", img: "/images/unconventional.webp", blurb: "Pieces that bend the rules of proportion, utility and finish." },
];
export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

export type Article = { slug: string; title: string; category: string; date: string; img: string; excerpt: string; body: string[] };
export const articles: Article[] = [
  { slug: "the-art-of-moving-differently", title: "The Art of Moving Differently", category: "Culture", date: "Oct 2026", img: "/images/journal-1.webp",
    excerpt: "On cities, silhouettes and the small decisions that make a way of dressing personal.",
    body: ["This is a demo article. Replace it with your own editorial copy.", "Style starts as a series of small decisions: how a sleeve falls, how a hem sits, how a jacket moves when you do. Over time those decisions add up to something that is yours.", "KAIZEN pieces are cut to give those decisions room, with generous volume and deliberate proportion."] },
  { slug: "inside-the-silhouette", title: "Inside the Silhouette", category: "Design", date: "Sep 2026", img: "/images/journal-2.webp",
    excerpt: "How shape, drape and weight come together in a single garment.",
    body: ["This is a demo article. Replace it with your own editorial copy.", "A silhouette is a promise about how a garment will behave. We start from the outline and work inward, testing weight and structure until the shape holds on its own.", "The result is clothing that looks considered at rest and in motion."] },
  { slug: "after-hours-before-sunrise", title: "After Hours, Before Sunrise", category: "Stories", date: "Aug 2026", img: "/images/journal-3.webp",
    excerpt: "A night walk through the city in the pieces made for it.",
    body: ["This is a demo article. Replace it with your own editorial copy.", "The city changes after midnight. Streets empty, light turns hard and directional, and everything you wear is seen differently.", "We photographed the After Hours pieces between the last train and the first."] },
];
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const legal: Record<string, { title: string; body: string[] }> = {
  privacy: { title: "Privacy Policy", body: ["Demo page. Replace with your real privacy policy before launch."] },
  terms: { title: "Terms", body: ["Demo page. Replace with your real terms of service before launch."] },
  "size-guide": { title: "Size Guide", body: ["Demo page. Add your measurement chart here."] },
  shipping: { title: "Shipping", body: ["Demo page. Add your shipping information here."] },
  returns: { title: "Returns", body: ["Demo page. Add your returns policy here."] },
  faq: { title: "FAQ", body: ["Demo page. Add your frequently asked questions here."] },
};

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/#collections" },
  { label: "About", href: "/#story" },
  { label: "Journal", href: "/#journal" },
];
