import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles, type Article } from "@/lib/data";
import Reveal from "@/components/effects/Reveal";

function Card({ a, big }: { a: Article; big?: boolean }) {
  return (
    <Link href={`/journal/${a.slug}`} className="group block">
      <div className={`relative overflow-hidden bg-obsidian/10 ${big ? "aspect-[16/11]" : "aspect-[4/3]"}`}><Image src={a.img} alt="" fill sizes={big ? "(min-width:1024px) 55vw, 100vw" : "(min-width:1024px) 30vw, 100vw"} className="object-cover transition-transform duration-1000 group-hover:scale-105" /></div>
      <p className="mt-4 text-[11px] uppercase tracking-wider2 text-obsidian/60">{a.category} — {a.date}</p>
      <h3 className={`mt-2 font-serif leading-tight ${big ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"}`}>{a.title}</h3>
      <span className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-wider2">Read article <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" /></span>
    </Link>
  );
}

export default function JournalSection() {
  return (
    <section id="journal" className="on-ivory scroll-mt-16 bg-[#e6e1d6] px-5 py-20 text-obsidian md:px-10 md:py-28" aria-labelledby="j-h">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="mb-12 max-w-xl"><h2 id="j-h" className="font-serif text-5xl md:text-7xl">Stories in Motion</h2>
          <p className="mt-3 text-obsidian/70">People, places, perspectives. Discover the culture behind the clothes.</p></Reveal>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7"><Card a={articles[0]} big /></Reveal>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">{articles.slice(1).map((a, i) => <Reveal key={a.slug} delay={0.1 * (i + 1)}><Card a={a} /></Reveal>)}</div>
        </div>
      </div>
    </section>
  );
}
