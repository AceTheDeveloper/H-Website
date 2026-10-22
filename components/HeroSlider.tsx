"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type HeroSlide = {
  id: string;
  /** Short chip above the title: "Chef's Pick", "New", "Current offer". */
  label: string;
  title: string;
  /** Price line, already formatted. Omit for offers. */
  price?: string;
  image: string;
  alt: string;
  href: string;
  cta: string;
};

const INTERVAL_MS = 6000;

/**
 * The home page's showcase: best sellers, new dishes and a current offer, one
 * at a time. It advances by itself, stops while someone hovers or focuses it
 * (and for anyone who prefers reduced motion), and the dots are real buttons.
 */
export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion || slides.length < 2) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, slides.length]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Best sellers, new dishes and current offers"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(23,17,14,0.12)]"
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${slides.length}`}
          hidden={i !== active}
        >
          <div className="relative aspect-[4/3] bg-white">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-contain p-6 drop-shadow-[0_12px_12px_rgba(23,17,14,0.25)]"
            />
          </div>
          <div className="flex items-end justify-between gap-4 border-t border-ink/10 px-5 py-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brick">
                {slide.label}
              </p>
              <p className="heading mt-1 text-2xl sm:text-3xl">{slide.title}</p>
              {slide.price && (
                <p className="mt-0.5 font-semibold text-ink/80">{slide.price}</p>
              )}
            </div>
            <Link href={slide.href} className="btn btn-ink shrink-0 !px-4">
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}

      <div
        className="flex items-center justify-center gap-1 pb-3"
        role="group"
        aria-label="Choose a slide"
      >
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show ${slide.title}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className="grid h-11 w-8 place-items-center"
          >
            <span
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-7 bg-ink" : "w-3 bg-ink/30"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
