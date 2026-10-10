# KAIZEN — cinematic streetwear storefront (demo)

Next.js 14 (App Router) · TypeScript · Tailwind 3 · React Three Fiber · drei · GSAP · Framer Motion · Lucide

## Run
```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck && npm run lint && npm run build
```

## Structure
- `components/preloader/` — real 3D zipper (InstancedMesh teeth, RoundedBox slider, displaced fabric panels), GSAP-driven timeline, skip, session guard, reduced-motion/no-WebGL static fallback
- `components/three/RibbonScene.tsx` — shared fabric-ribbon scene (hero + The Movement), desktop-only, paused off-screen
- `components/hero/`, `products/`, `collections/`, `story/`, `journal/`, `layout/`
- `components/Providers.tsx` — cart (localStorage), search/drawer state, intro state
- `lib/data.ts` — products, collections, journal, legal copy. `lib/newsletter.ts` — isolated stub for a real API

## Assets you still need to supply
All images in `public/images/*.svg` are generated PLACEHOLDERS (`npm run assets` regenerates them). Replace with real photography and update paths in `lib/data.ts` / components:
hero.svg (model hero), jacket.svg (cutout jacket for The Movement), 4 products + `-alt` views, 3 collections, macro-zipper/textile/stitch, journal-1..3.
Optional: `public/video/kaizen-film.mp4` for WATCH FILM.
No GLB garment model is included; The Movement uses a jacket image floating in front of a real 3D ribbon/rock scene.

## Notes
- Checkout, sign-in and newsletter are intentionally NOT connected; the UI says so.
- Intro plays once per session (`sessionStorage: kaizen-intro`). Clear it to replay.
- Social links point to platform home pages; set your handles in `Footer.tsx`.
