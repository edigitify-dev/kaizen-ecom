"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ArrowRight, Play } from "lucide-react";
import { useApp } from "@/components/Providers";
import { useCan3D, useInView } from "@/lib/hooks";
import FilmModal from "@/components/ui/FilmModal";

const RibbonScene = dynamic(() => import("@/components/three/RibbonScene"), {
  ssr: false,
});

export default function HeroSection() {
  const { introDone } = useApp();
  const root = useRef<HTMLElement>(null);
  const subject = useRef<HTMLDivElement>(null);
  const can3D = useCan3D();
  const [wrap, inView] = useInView<HTMLDivElement>();
  const progress = useRef(0);
  const [film, setFilm] = useState(false);

  useLayoutEffect(() => {
    // hold content hidden until the intro opens
    const ctx = gsap.context(() => {
      gsap.set(subject.current, { x: window.innerWidth < 768 ? 0 : "-22vw" });
      gsap.set(".h-line > span", {
        yPercent: 110,
        opacity: 0,
        filter: "blur(12px)",
      });
      gsap.set(".h-fade", { opacity: 0, y: 24, filter: "blur(12px)" });
      gsap.set(".hero-ribbons", { opacity: 0, filter: "blur(16px)" });
    }, root);
    return () => ctx.revert();
  }, []);
  useEffect(() => {
    if (!introDone) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (window.innerWidth < 768) {
        gsap.set(subject.current, { x: 0 });
      } else {
        tl.to(subject.current, { x: 0, duration: 1.1, ease: "power3.inOut" }, 0);
      }
      tl.to(
          ".hero-ribbons",
          { opacity: 1, filter: "blur(0px)", duration: 1.25 },
          0.65,
        )
        .to(
          ".h-line > span",
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.95,
            stagger: 0.12,
          },
          1.35,
        )
        .to(
          ".h-fade",
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.1,
          },
          1.65,
        );
    }, root);
    return () => ctx.revert();
  }, [introDone]);
  useEffect(() => {
    // pointer depth + scroll parallax
    if (!can3D) return;
    const mx = gsap.quickTo(".h-depth", "x", { duration: 1.2, ease: "power3" }),
      my = gsap.quickTo(".h-depth", "y", { duration: 1.2, ease: "power3" });
    const move = (e: PointerEvent) => {
      mx((e.clientX / innerWidth - 0.5) * -22);
      my((e.clientY / innerHeight - 0.5) * -14);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [can3D]);

  return (
    <section
      ref={root}
      className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden bg-obsidian"
      aria-label="KAIZEN new season"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="h-depth absolute -inset-6">
          <Image
            src="/images/hero-background.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center]"
          />
        </div>
      </div>
      <div
        ref={wrap}
        className="hero-ribbons pointer-events-none absolute inset-0 z-[1]"
      >
        {can3D && (
          <RibbonScene variant="hero" progress={progress} active={inView} />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-obsidian/90 via-obsidian/30 to-transparent md:from-obsidian/80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-1/3 bg-gradient-to-t from-obsidian to-transparent" />
      <div
        className="h-depth pointer-events-none absolute -inset-6 z-[3]"
        aria-hidden="true"
      >
        <div
          ref={subject}
          className="hero-subject absolute inset-0"
        >
          <Image
            src="/images/hero-model.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center]"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-[clamp(6.5rem,13vh,10rem)] md:px-24 translate-y-16">
        {/* <p className="h-fade label text-ivory/80">New season / 2026</p> */}
        <h1
          className="headline mt-5 text-[clamp(3.6rem,12vw,10rem)]"
          aria-label="Not made to blend."
        >
          {["NOT", "MADE", "TO BLEND."].map((l) => (
            <span
              key={l}
              className="h-line block overflow-hidden pb-1"
              aria-hidden
            >
              <span className="block">{l}</span>
            </span>
          ))}
        </h1>
        <p className="h-fade mt-6 max-w-sm text-sm leading-relaxed text-silver md:text-sm">
          Streetwear for the ones who move differently. Crafted with purpose,
          worn without rules.
        </p>
        <div className="h-fade mt-8 flex flex-wrap gap-3">
          <Link href="/#new-arrivals" className="btn btn-solid">
            Explore collection <ArrowRight size={14} />
          </Link>
          <button onClick={() => setFilm(true)} className="btn btn-ghost">
            Watch film <Play size={12} fill="currentColor" />
          </button>
        </div>
      </div>
      <div className="h-fade absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 text-right md:right-10 md:block">
        <p className="label text-ivory/55">01 / 04</p>
        <span className="my-3 ml-auto block h-px w-10 bg-ivory/35" />
        <p className="label text-ivory">Autumn</p>
        <p className="label">Collection &rsquo;26</p>
      </div>
      <p className="h-fade label absolute bottom-7 right-5 z-10 hidden text-ivory/55 md:right-10 md:block">
        KAIZEN / FORM STUDY 026
      </p>
      <FilmModal open={film} onClose={() => setFilm(false)} />
    </section>
  );
}
