"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Collection } from "@/lib/data";

export default function CollectionCard({ c, index, className = "" }: { c: Collection; index: number; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <Link ref={ref} href={`/collections/${c.slug}`} className={`group relative block aspect-[3/4] overflow-hidden bg-soft ${className}`} aria-label={`${c.name}: ${c.line}`}>
      <motion.div style={{ y }} className="absolute -inset-[8%]"><Image src={c.img} alt="" fill sizes="(min-width:768px) 30vw, 90vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" /></motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
      <span className="label absolute left-5 top-5">{String(index + 1).padStart(2, "0")}</span>
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
        <div><h3 className="headline text-4xl md:text-5xl">{c.name}</h3><p className="mt-2 text-sm text-silver">{c.line}</p></div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ivory/40 transition-all duration-300 group-hover:bg-ivory group-hover:text-obsidian"><ArrowUpRight size={16} /></span>
      </div>
    </Link>
  );
}
