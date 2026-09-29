"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

/**
 * Full-bleed, autoplaying crossfade of the dining room and the crowd, with the
 * "Love lives in Iloilo" line painted over the top. Opens the About page the
 * way the wall mural opens the room in person.
 */
export default function AboutSlideshow({
  images,
}: {
  images: { src: StaticImageData | string; alt: string }[];
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, 4500);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section className="on-red relative min-h-[55vh] overflow-hidden bg-red text-chalk md:min-h-[60vh]">
      {images.map((image, i) => (
        <Image
          key={image.alt}
          src={image.src}
          alt={image.alt}
          fill
          priority={i === 0}
          placeholder={typeof image.src === "string" ? undefined : "blur"}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-red/45" aria-hidden />

      <div className="page-shell relative flex min-h-[55vh] flex-col justify-end py-10 md:min-h-[60vh] md:py-14">
        <h1 className="poster text-[clamp(3.25rem,12vw,9rem)] drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
          H. Love lives
          <br />
          in Iloilo
        </h1>

        <div className="mt-8 flex gap-2" role="tablist" aria-label="Slideshow">
          {images.map((image, i) => (
            <button
              key={image.alt}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-8 bg-chalk" : "w-3 bg-chalk/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
