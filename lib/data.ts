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
  { slug: "oversized-graphic-tee", name: "Washed Graphic Tee", price: 1599, img: "/images/oversized-graphic-tee.png", imgAlt: "/images/oversized-graphic-tee.png",
    alt: "Washed charcoal oversized graphic tee", colors: [palette.black, palette.slate], sizes: SIZES, collections: ["the-minimalist", "the-unconventional"],
    description: "A heavyweight washed cotton tee with an easy boxy shape and quiet tonal artwork.",
    details: ["Oversized boxy fit", "Heavyweight cotton jersey", "Washed finish", "Tonal back artwork"] },
  { slug: "zip-through-hoodie", name: "Zip Through Hoodie", price: 2999, img: "/images/zip-through-hoodie.png", imgAlt: "/images/zip-through-hoodie.png",
    alt: "Black cropped oversized zip through hoodie", colors: [palette.black, palette.ash], sizes: SIZES, collections: ["the-after-hours", "the-unconventional"],
    description: "A substantial zip hoodie with a double-layer hood and a cropped, oversized silhouette.",
    details: ["Cropped oversized fit", "Double-layer hood", "Metal front zip", "Ribbed cuffs and hem"] },
  { slug: "relaxed-denim", name: "Relaxed Denim", price: 2799, img: "/images/relaxed-denim.png", imgAlt: "/images/relaxed-denim.png",
    alt: "Washed black relaxed wide leg denim jeans", colors: [palette.black, palette.slate], sizes: SIZES, collections: ["the-minimalist", "the-unconventional"],
    description: "Washed black denim with a relaxed wide leg and a timeless five-pocket construction.",
    details: ["Relaxed wide-leg fit", "Washed cotton denim", "Five-pocket construction", "Zip fly fastening"] },
  { slug: "parachute-trousers", name: "Parachute Trousers", price: 2799, img: "/images/parachute-trousers.png", imgAlt: "/images/parachute-trousers.png",
    alt: "Black relaxed technical parachute trousers", colors: [palette.black, palette.slate], sizes: SIZES, collections: ["the-after-hours", "the-unconventional"],
    description: "Lightweight technical trousers with generous volume, articulated knees and adjustable hems.",
    details: ["Relaxed volume fit", "Matte technical nylon", "Articulated knees", "Adjustable drawcord hems"] },
  { slug: "workwear-overshirt", name: "Field Overshirt", price: 2899, img: "/images/workwear-overshirt.png", imgAlt: "/images/workwear-overshirt.png",
    alt: "Olive cotton workwear overshirt with chest pockets", colors: [palette.sand, palette.black], sizes: SIZES, collections: ["the-unconventional", "the-minimalist"],
    description: "A sturdy cotton overshirt that layers easily, finished with a clean collar and generous chest pockets.",
    details: ["Relaxed boxy fit", "Structured cotton twill", "Two buttoned chest pockets", "Full button fastening"] },
  { slug: "quilted-vest", name: "Quilted Utility Vest", price: 2599, img: "/images/quilted-vest.png", imgAlt: "/images/quilted-vest.png",
    alt: "Black quilted utility vest with high collar", colors: [palette.black, palette.slate], sizes: SIZES, collections: ["the-after-hours", "the-unconventional"],
    description: "A minimal padded vest with a high collar and clean concealed fastening for lightweight layering.",
    details: ["Relaxed layered fit", "Lightweight quilted padding", "High stand collar", "Concealed front fastening"] },
  { slug: "longline-shirt", name: "Longline Shirt", price: 2299, img: "/images/longline-shirt.png", imgAlt: "/images/longline-shirt.png",
    alt: "Stone cotton longline shirt with clean hidden placket", colors: [palette.sand, palette.ash], sizes: SIZES, collections: ["the-minimalist", "the-unconventional"],
    description: "A crisp cotton shirt extended through the body, with dropped shoulders and a pared-back placket.",
    details: ["Longline relaxed fit", "Crisp cotton poplin", "Dropped shoulders", "Hidden button placket"] },
  { slug: "track-jacket", name: "Transit Track Jacket", price: 3499, img: "/images/track-jacket.png", imgAlt: "/images/track-jacket.png",
    alt: "Slate gray technical track jacket with stand collar", colors: [palette.slate, palette.black], sizes: SIZES, collections: ["the-after-hours", "the-minimalist"],
    description: "A clean-lined technical jacket with a stand collar, sculpted sleeves and a quiet matte finish.",
    details: ["Relaxed athletic fit", "Matte technical fabric", "Stand collar", "Full-length front zip"] },
  { slug: "utility-shorts", name: "Utility Shorts", price: 1999, img: "/images/utility-shorts.png", imgAlt: "/images/utility-shorts.png",
    alt: "Black relaxed utility shorts with cargo pockets", colors: [palette.black, palette.sand], sizes: SIZES, collections: ["the-unconventional", "the-after-hours"],
    description: "Wide-leg utility shorts with an adjustable waist and low-profile cargo pockets for everyday wear.",
    details: ["Relaxed knee-length fit", "Adjustable waistband", "Low-profile cargo pockets", "Durable cotton twill"] },
  { slug: "ribbed-tank", name: "Ribbed Tank", price: 999, img: "/images/ribbed-tank.png", imgAlt: "/images/ribbed-tank.png",
    alt: "Warm off-white heavyweight ribbed tank top", colors: [palette.ash, palette.black], sizes: SIZES, collections: ["the-minimalist", "the-unconventional"],
    description: "A substantial ribbed cotton tank with a clean neckline, made to wear alone or as a considered base layer.",
    details: ["Regular fit", "Heavyweight ribbed cotton", "Bound neckline and armholes", "Soft washed finish"] },
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
  { slug: "the-art-of-moving-differently", title: "The People Behind the Fits", category: "People / Culture", date: "Oct 2026", img: "/images/journal-people.png",
    excerpt: "Conversations, routines and real stories from our community.",
    body: ["Clothes are only part of the story. The people who wear them bring their own rituals, references and reasons for moving through the world differently.", "We met with artists, skaters and makers to talk about the pieces they reach for and the places that shaped their point of view.", "These are portraits of the people behind the fits, told in their own words."] },
  { slug: "inside-the-silhouette", title: "Cities We Carry", category: "Places / Travel", date: "Sep 2026", img: "/images/journal-cities.png",
    excerpt: "Different cities, same energy. How places influence what we wear.",
    body: ["Every city leaves a mark on the way we dress. The pace of the streets, the light at the end of the day and the people passing through all become part of the picture.", "We followed one familiar silhouette across changing neighborhoods and found a different mood on every block.", "Different cities, same energy: a visual journal of the places we carry with us."] },
  { slug: "after-hours-before-sunrise", title: "One Hoodie, Five Ways", category: "Style / Guides", date: "Aug 2026", img: "/images/journal-style.png",
    excerpt: "Different fits. Different moods. Find a new way to wear your everyday layer.",
    body: ["One good hoodie can move through the whole week. Start with a clean base, then change the proportions and layers around it.", "Wear it loose with denim, under a long coat, or balanced against a sharper trouser. Small shifts in shape change the whole feeling.", "Five looks, one dependable layer, and plenty of room to make it your own."] },
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
  { label: "About", href: "/about" },
  { label: "Journal", href: "/#journal" },
];
