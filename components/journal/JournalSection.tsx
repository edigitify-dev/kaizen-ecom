"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { articles, type Article } from "@/lib/data";

const filters = ["All", "People", "Places", "Style", "Community", "Events"] as const;

function matchesFilter(article: Article, filter: (typeof filters)[number]) {
  if (filter === "All") return true;
  if (filter === "Community") return article.category.startsWith("People");
  return article.category.startsWith(filter);
}

function FeaturedStory({ article }: { article: Article }) {
  return (
    <Link href={`/journal/${article.slug}`} className="group relative block aspect-[1.55/1] min-h-[230px] overflow-hidden bg-obsidian text-ivory sm:aspect-[1.9/1] lg:aspect-[1.8/1]">
      <Image
        src={article.img}
        alt=""
        fill
        sizes="(min-width:1024px) 40vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-obsidian/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 max-w-lg p-5 sm:p-7">
        <p className="text-[9px] uppercase tracking-[0.22em] text-ivory/75">{article.category}</p>
        <h3 className="mt-3 max-w-sm font-serif text-3xl leading-[0.98] sm:text-4xl">{article.title}</h3>
        <p className="mt-3 max-w-xs text-xs leading-relaxed text-ivory/80">{article.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.2em]">
          Read article <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      <span className="absolute bottom-5 left-5 grid h-10 w-10 place-items-center rounded-full border border-ivory/80 bg-obsidian/20 sm:bottom-7 sm:left-auto sm:right-7">
        <span className="ml-0.5 block h-0 w-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-ivory" />
      </span>
    </Link>
  );
}

function StoryRow({ article }: { article: Article }) {
  return (
    <Link
      href={`/journal/${article.slug}`}
      className="group grid min-h-[176px] grid-cols-[minmax(0,1fr)_42%] border border-obsidian/15 bg-[#eeeae1] transition-colors hover:bg-white/50 sm:min-h-[190px]"
    >
      <div className="flex flex-col items-start justify-center p-4 sm:p-6">
        <p className="text-[8px] uppercase tracking-[0.2em] text-obsidian/55 sm:text-[9px]">{article.category}</p>
        <h3 className="mt-3 font-serif text-2xl leading-[0.98] sm:text-3xl">{article.title}</h3>
        <p className="mt-3 line-clamp-2 text-[11px] leading-relaxed text-obsidian/70 sm:text-xs">{article.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-[8px] uppercase tracking-[0.18em] sm:text-[9px]">
          Read article <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      <div className="relative min-h-full overflow-hidden bg-obsidian/10">
        <Image
          src={article.img}
          alt=""
          fill
          sizes="(min-width:1024px) 18vw, 42vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}

export default function JournalSection() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [offset, setOffset] = useState(0);
  const visibleStories = useMemo(() => {
    const matching = articles.filter((article) => matchesFilter(article, filter));
    if (matching.length < 2) return matching;
    const shift = offset % matching.length;
    return [...matching.slice(shift), ...matching.slice(0, shift)];
  }, [filter, offset]);

  const moveStoryOrder = (direction: -1 | 1) => {
    setOffset((current) => (current + direction + articles.length) % articles.length);
  };

  return (
    <section id="journal" className="on-ivory scroll-mt-16 overflow-hidden bg-[#e9e5dc] px-5 pb-6 pt-14 text-obsidian sm:px-8 md:px-10 md:pt-20" aria-labelledby="journal-title">
      <div className="mx-auto max-w-[1680px]">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-7">
          <div className="relative isolate min-h-[690px] overflow-hidden sm:min-h-[760px] lg:col-span-7 lg:min-h-[760px]">
            <div className="absolute inset-y-0 right-0 w-[76%] sm:w-[70%]">
              <Image
                src="/images/stories-in-motion-hero.png"
                alt="Streetwear portrait on a city rooftop at dusk"
                fill
                sizes="(min-width:1024px) 48vw, 80vw"
                className="object-cover object-[60%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#e9e5dc] via-[#e9e5dc]/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#e9e5dc]/65 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 flex min-h-[690px] flex-col items-start sm:min-h-[760px]">
              <p className="label text-obsidian">Journal</p>
              <h2 id="journal-title" className="headline mt-5 max-w-[92%] text-[clamp(4.8rem,10vw,9.7rem)] leading-[0.79] tracking-[-0.055em] sm:max-w-[76%] lg:text-[clamp(6.2rem,8.5vw,9.7rem)]">
                Stories<br /><span className="text-[#394637]">in Motion</span>
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-obsidian sm:text-base">
                Beyond the products. A look into the people, places and ideas that shape our world.
              </p>
              <Link href="#journal-stories" className="group mt-7 inline-flex items-center gap-4 bg-obsidian px-6 py-4 text-[9px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-[#394637]">
                Explore all stories <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <p className="mt-auto max-w-40 rotate-[-7deg] pb-8 pl-3 font-serif text-lg italic leading-[0.95] text-obsidian/80 sm:pl-10 sm:text-xl">
                People<br />places<br />perspectives
              </p>
            </div>
            <span className="pointer-events-none absolute bottom-5 right-[9%] z-10 hidden rotate-[-8deg] font-serif text-sm italic text-obsidian/80 sm:block">
              Same city.<br />Different perspective.
            </span>
          </div>

          <div id="journal-stories" className="scroll-mt-24 lg:col-span-5">
            <div className="mb-4 flex items-center justify-end gap-3">
              <Link href="#journal-stories" className="mr-auto text-[9px] font-medium uppercase tracking-[0.2em]">View all <span aria-hidden>→</span></Link>
              <button type="button" onClick={() => moveStoryOrder(-1)} aria-label="Previous stories" className="grid h-10 w-10 place-items-center rounded-full border border-obsidian/70 transition-colors hover:bg-obsidian hover:text-ivory"><ArrowLeft size={15} /></button>
              <button type="button" onClick={() => moveStoryOrder(1)} aria-label="Next stories" className="grid h-10 w-10 place-items-center rounded-full border border-obsidian/70 transition-colors hover:bg-obsidian hover:text-ivory"><ArrowRight size={15} /></button>
            </div>
            {visibleStories.length ? (
              <div className="grid gap-3 sm:gap-4">
                <FeaturedStory article={visibleStories[0]} />
                {visibleStories.slice(1).map((article) => <StoryRow key={article.slug} article={article} />)}
              </div>
            ) : (
              <div className="grid min-h-[240px] place-items-center border border-obsidian/20 p-8 text-center">
                <p className="font-serif text-2xl">More stories are on the way.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-obsidian/30 py-4 sm:gap-4">
          <span className="mr-2 text-[9px] font-medium uppercase tracking-[0.18em]">Explore more</span>
          <nav aria-label="Filter journal stories" className="flex max-w-full gap-2 overflow-x-auto pb-1">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => { setFilter(item); setOffset(0); }}
                className={`shrink-0 rounded-full border px-4 py-2 text-[10px] transition-colors ${filter === item ? "border-obsidian bg-obsidian text-ivory" : "border-obsidian/25 hover:border-obsidian"}`}
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="ml-auto hidden min-w-28 flex-1 items-center gap-1 md:flex" aria-hidden="true">
            <span className="h-px flex-1 bg-obsidian/70" />
            <span className="flex h-7 items-center gap-[2px] px-2">
              {[2, 1, 3, 1, 2, 1, 4, 1, 2].map((width, index) => <i key={index} className="h-6 bg-obsidian" style={{ width }} />)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
