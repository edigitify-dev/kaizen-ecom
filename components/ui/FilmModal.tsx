"use client";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import Overlay from "@/components/ui/Overlay";

/** Plays /public/video/kaizen-film.mp4 if present; otherwise shows an intentional placeholder. */
export default function FilmModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [missing, setMissing] = useState(false);
  return (
    <Overlay open={open} onClose={onClose} label="Campaign film">
      <button onClick={onClose} aria-label="Close film" data-autofocus className="absolute right-3 top-3 z-10 bg-obsidian/70 p-2"><X size={18} /></button>
      <div className="relative aspect-video bg-obsidian">
        {!missing ? <video src="/video/kaizen-film.mp4" poster="/images/film-poster.webp" controls autoPlay playsInline className="h-full w-full" onError={() => setMissing(true)} />
          : <><Image src="/images/film-poster.webp" alt="" fill className="object-cover opacity-60" />
            <div className="absolute inset-0 grid place-items-center p-6 text-center"><div><p className="headline text-4xl md:text-6xl">The film is coming.</p>
              <p className="mx-auto mt-4 max-w-md text-sm text-silver">Add your campaign video at <code>public/video/kaizen-film.mp4</code> and it will play here.</p></div></div></>}
      </div>
    </Overlay>
  );
}
