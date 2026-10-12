"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

const process = [
  { number: "01", label: "Material", image: "/images/textile.webp", alt: "Close-up of woven black textile" },
  { number: "02", label: "Construction", image: "/images/stitch.webp", alt: "Careful stitching on black technical fabric" },
];

export default function BrandStory() {
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="story"
      className="relative scroll-mt-16 overflow-hidden border-y border-ivory/10 bg-obsidian lg:grid lg:min-h-[680px] lg:grid-cols-2"
      aria-labelledby="story-h"
    >
      <div className="relative min-h-[66vw] overflow-hidden sm:min-h-[440px] lg:min-h-0">
        <Image
          src="/images/more-than-clothing.png"
          alt="Close-up of a gunmetal zipper and a blank label on black technical fabric"
          fill
          sizes="(min-width:1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-obsidian/20" />
      </div>

      <div className="grid items-center gap-10 px-6 py-14 sm:px-10 md:grid-cols-[minmax(0,1fr)_minmax(100px,0.55fr)] md:gap-4 md:px-8 lg:px-10 lg:py-16 xl:gap-12 xl:px-16">
        <div className="max-w-xl">
          <p className="label">Behind the seams</p>
          <h2 id="story-h" className="headline mt-4 text-6xl md:text-7xl xl:text-8xl">
            More than<br />clothing.
          </h2>
          <motion.div
            className="my-6 h-px w-16 origin-left bg-ivory/60"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          />
          <p className="max-w-md text-sm leading-relaxed text-silver md:text-[15px]">
            Every stitch tells a story. From material selection to the final fit,
            our pieces are crafted to move with you — through ideas, cities, and
            everything in between.
          </p>
          <Link
            href="/journal/the-art-of-moving-differently"
            className="group mt-7 inline-flex items-center gap-3 border border-ivory/55 px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-colors hover:bg-ivory hover:text-obsidian"
          >
            Explore stories
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-1 md:gap-y-5">
          {process.map((item) => (
            <div key={item.number}>
              <div className="relative aspect-[1.12/1] overflow-hidden border border-ivory/15 bg-charcoal">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width:1024px) 15vw, (min-width:768px) 20vw, 45vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <p className="mt-2 flex items-center justify-between gap-2 text-[9px] uppercase tracking-[0.18em] text-silver sm:text-[10px]">
                <span>{item.number}</span>
                <span className="text-right text-ivory/80">{item.label}</span>
              </p>
            </div>
          ))}
          <Link
            href="/#movement"
            className="col-span-2 mt-1 flex items-center justify-between border-t border-ivory/15 pt-3 text-[9px] uppercase tracking-[0.18em] text-silver transition-colors hover:text-ivory md:col-span-1"
          >
            <span>03</span>
            <span className="flex items-center gap-2 text-ivory/80">
              Movement <ArrowRight size={13} />
            </span>
          </Link>
        </div>
      </div>

      <Link
        href="#journal"
        aria-label="Continue to the journal"
        className="group absolute left-1/2 top-[42%] z-10 hidden h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/55 bg-obsidian/80 text-ivory backdrop-blur-sm transition-colors hover:bg-ivory hover:text-obsidian lg:flex"
      >
        <svg className="absolute inset-0 h-full w-full animate-[spin_24s_linear_infinite]" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <path id="story-circle" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
          </defs>
          <text fill="currentColor" className="fill-current text-[8px] uppercase tracking-[2px]">
            <textPath href="#story-circle">Discover · Discover · Discover · </textPath>
          </text>
        </svg>
        <ArrowDown size={17} className="transition-transform group-hover:translate-y-1" />
      </Link>
    </section>
  );
}
