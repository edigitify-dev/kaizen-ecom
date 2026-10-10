"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function BrandStory() {
  const ease = [0.22, 1, 0.36, 1] as const;
  return (
    <section id="story" className="scroll-mt-16 grid min-h-[80svh] bg-charcoal md:grid-cols-2" aria-labelledby="story-h">
      <motion.div className="relative min-h-[60vw] md:min-h-0" initial={{ clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.3, ease }}>
        <Image src="/images/macro-zipper.webp" alt="Macro detail of a metal zipper on black technical fabric" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
      </motion.div>
      <div className="flex flex-col justify-center gap-10 px-5 py-16 md:px-14 lg:flex-row lg:items-center">
        <div className="max-w-md">
          <p className="label">Behind the seams</p>
          <h2 id="story-h" className="headline mt-4 text-6xl md:text-7xl">More than<br />clothing.</h2>
          <motion.div className="my-6 h-px w-24 origin-left bg-ivory/60" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease }} />
          <p className="leading-relaxed text-silver">Every stitch tells a story. From material selection to the final fit, our pieces are crafted to move with you — through ideas, cities, and everything in between.</p>
          <Link href="/journal/inside-the-silhouette" className="group mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-wider2">Our process <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></Link>
        </div>
        <div className="grid w-full max-w-[220px] grid-cols-2 gap-3 lg:grid-cols-1">
          <div className="relative aspect-[4/5] overflow-hidden"><Image src="/images/textile.webp" alt="Close-up of woven black textile" fill sizes="220px" className="object-cover" /></div>
          <div className="relative aspect-[4/5] overflow-hidden"><Image src="/images/stitch.webp" alt="Stitching detail on a garment seam" fill sizes="220px" className="object-cover" /></div>
        </div>
      </div>
    </section>
  );
}
