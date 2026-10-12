import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, MoveUpRight, Users } from "lucide-react";

export const metadata = { title: "About Us — KAIZEN" };

const values = [
  { title: "Timeless design", copy: "Clean, functional pieces made to last.", image: "/images/textile.webp", alt: "Close detail of dark fabric" },
  { title: "Quality first", copy: "Considered materials for everyday wear.", image: "/images/macro-zipper.webp", alt: "Close-up of a metal garment zipper" },
  { title: "Less, but better", copy: "A focused wardrobe, without the noise.", image: "/images/journal-style.png", alt: "A range of considered streetwear silhouettes" },
  { title: "A stronger community", copy: "For people who move differently.", image: "/images/journal-cities.png", alt: "A streetwear look in the city" },
];

export default function AboutPage() {
  return (
    <main className="bg-obsidian pb-20 text-ivory">
      <section className="relative isolate min-h-[540px] overflow-hidden border-b border-ivory/10 pt-24 md:min-h-[600px]" aria-labelledby="about-title">
        <Image src="/images/about-hero.png" alt="A person in a black hoodie in a sunlit concrete passage" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/5" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian/50 via-transparent to-obsidian/20" />
        <div className="mx-auto flex min-h-[516px] max-w-[1400px] items-center px-5 pb-12 md:min-h-[576px] md:px-10">
          <div className="max-w-[480px]">
            <p className="label text-ivory/75">About us</p>
            <h1 id="about-title" className="headline mt-4 text-6xl md:text-7xl lg:text-8xl">A little<br />better<br />everyday.</h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ivory/75 md:text-base">KAIZEN is an independent streetwear label built on a simple idea: progress over perfection. We create everyday essentials for people who move differently.</p>
            <Link href="/#collections" className="group mt-6 inline-flex items-center gap-4 border border-ivory/55 px-6 py-3 text-[10px] uppercase tracking-wider2 transition-colors hover:bg-ivory hover:text-obsidian">Our collections <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></Link>
          </div>
          <p className="absolute bottom-12 right-[9%] hidden max-w-40 text-[10px] font-medium uppercase leading-relaxed tracking-[0.32em] text-ivory/65 lg:block">Discipline<br />creates<br />freedom.</p>
        </div>
      </section>

      <section id="story" className="mx-auto grid max-w-[1400px] gap-9 border-b border-ivory/10 px-5 py-10 md:px-10 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-12" aria-labelledby="story-title">
        <div className="relative min-h-[320px] overflow-hidden sm:min-h-[400px] lg:col-span-4">
          <Image src="/images/journal-people.png" alt="Streetwear portrait in a concrete setting" fill sizes="(min-width:1024px) 32vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent" />
          <div className="absolute bottom-4 right-4 w-[48%] border border-ivory/70 bg-obsidian p-1.5">
            <div className="relative aspect-[4/3] overflow-hidden"><Image src="/images/textile.webp" alt="A close-up of the fabric texture" fill sizes="200px" className="object-cover" /></div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <p className="label">Our story</p>
          <h2 id="story-title" className="headline mt-3 text-5xl md:text-6xl">Built on<br />progress.</h2>
          <p className="mt-5 text-sm leading-relaxed text-silver">KAIZEN started with a belief that small, consistent improvements can create a bigger impact. What began as a personal pursuit for better everyday wear grew into a point of view: intentional design, self-growth, and a different approach to style.</p>
          <p className="mt-4 text-sm leading-relaxed text-silver">We design pieces that feel familiar yet refined—made to move with your daily life, adapt to your pace, and stay relevant beyond trends.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          <div className="relative min-h-[210px] overflow-hidden sm:row-span-2 lg:min-h-[280px]">
            <Image src="/images/more-than-clothing.png" alt="KAIZEN streetwear editorial and brand details" fill sizes="(min-width:1024px) 24vw, 50vw" className="object-cover" />
          </div>
          <div className="sm:col-start-2 sm:row-start-1 lg:col-start-auto lg:row-start-auto">
            <p className="label">More than clothing</p>
            <p className="mt-3 text-sm leading-relaxed text-silver">KAIZEN is a mindset: showing up, putting in the work, and choosing a little better each day—in what you wear and how you live.</p>
            <ul className="mt-4 divide-y divide-ivory/10">
              <li className="flex items-center gap-4 py-3"><span className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20"><MoveUpRight size={17} /></span><span><b className="block text-[10px] uppercase tracking-wider2">Progress</b><span className="mt-1 block text-xs text-silver">Small steps, real change.</span></span></li>
              <li className="flex items-center gap-4 py-3"><span className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20"><Box size={17} /></span><span><b className="block text-[10px] uppercase tracking-wider2">Purpose</b><span className="mt-1 block text-xs text-silver">Thoughtful design, everyday use.</span></span></li>
              <li className="flex items-center gap-4 py-3"><span className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20"><Users size={17} /></span><span><b className="block text-[10px] uppercase tracking-wider2">Community</b><span className="mt-1 block text-xs text-silver">For the ones who move differently.</span></span></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="values" className="mx-auto grid max-w-[1400px] gap-8 px-5 py-10 md:px-10 md:py-12 lg:grid-cols-5 lg:gap-8" aria-labelledby="values-title">
        <div>
          <p className="label">Our values</p>
          <h2 id="values-title" className="headline mt-3 text-5xl md:text-6xl">Intentional<br />in everything<br />we do.</h2>
        </div>
        {values.map((value) => (
          <article key={value.title} className="border-ivory/10 sm:border-l sm:pl-5">
            <div className="relative aspect-[1.45/1] overflow-hidden bg-charcoal"><Image src={value.image} alt={value.alt} fill sizes="(min-width:1024px) 18vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-105" /></div>
            <h3 className="mt-3 text-[10px] font-semibold uppercase tracking-wider2">{value.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-silver">{value.copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
