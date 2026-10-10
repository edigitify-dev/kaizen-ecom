"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useCan3D, useInView, prefersReducedMotion } from "@/lib/hooks";

const MovementClothScene = dynamic(
  () => import("@/components/three/MovementClothScene"),
  { ssr: false },
);

export default function MovementSection() {
  const root = useRef<HTMLElement>(null);
  const girl = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const can3D = useCan3D();
  const [wrap, inView] = useInView<HTMLDivElement>("500px");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (prefersReducedMotion()) {
      progress.current = 1;
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(girl.current, { xPercent: -50, yPercent: 0 });
      gsap.set(".mv-copy > *", { autoAlpha: 0, y: 28, filter: "blur(12px)" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 3.5}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        },
      });

      timeline
        .to(girl.current, { yPercent: -11, duration: 0.9, ease: "none" }, 0)
        .fromTo(
          ".mv-copy > *",
          { autoAlpha: 0, y: 28, filter: "blur(12px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.76,
            stagger: 0.12,
            ease: "power3.out",
          },
          2.38,
        );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="movement"
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-obsidian"
      aria-labelledby="mv-h"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/movement-background.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-obsidian/55 via-transparent to-obsidian/25" />
      <div ref={wrap} className="pointer-events-none absolute inset-0 z-[2]">
        {can3D && <MovementClothScene progress={progress} active={inView} />}
      </div>
      <div
        ref={girl}
        className="pointer-events-none absolute bottom-0 left-1/2 z-[3] h-[72svh] w-[min(88vw,1080px)] max-w-none"
        style={{ transform: "translateX(-50%)" }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 scale-x-[1.12]">
          <Image
            src="/images/movement-girl.png"
            alt=""
            fill
            sizes="100vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>
      <div className="mv-copy absolute bottom-[8vh] left-5 z-10 max-w-[min(92vw,760px)] md:left-10">
        <p className="label text-ivory/70">
          Collection 008 <span className="mx-2 text-ivory/30">/</span> Form in
          motion
        </p>
        <h2 id="mv-h" className="headline mt-4 text-[clamp(3.5rem,10vw,8rem)]">
          The
          <br />
          Movement
        </h2>
        <p className="mt-5 max-w-xs text-silver">
          Inspired by motion. Designed for those who redefine it.
        </p>
        <Link
          href="/collections/the-unconventional"
          className="btn btn-solid mt-8 w-fit"
        >
          Explore collection <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
