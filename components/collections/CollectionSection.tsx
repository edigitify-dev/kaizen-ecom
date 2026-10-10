import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/data";
import CollectionCard from "./CollectionCard";
import Reveal from "@/components/effects/Reveal";

export default function CollectionSection() {
  return (
    <section id="collections" className="scroll-mt-16 bg-obsidian px-5 py-20 md:px-10 md:py-28" aria-labelledby="col-h">
      <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-3 lg:pt-6">
          <h2 id="col-h" className="headline text-6xl md:text-7xl">Shop by<br />identity</h2>
          <p className="mt-5 max-w-[16rem] text-silver">Different minds. Different fits. Find who moves you.</p>
          <Link href="/shop" className="group mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-wider2">Explore all <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></Link>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3 lg:col-span-9">
          {collections.map((c, i) => <CollectionCard key={c.slug} c={c} index={i} className={i === 1 ? "md:mt-16" : i === 2 ? "md:mt-6" : ""} />)}
        </div>
      </div>
    </section>
  );
}
