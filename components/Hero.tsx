import Link from "next/link";
import Image from "next/image";
import heroImage from "@/assets/dining.jpg";
import { contact } from "@/lib/data";
import LedSign from "./LedSign";

/**
 * Red like the painted wall, lettered like it too. The photo bleeds off the
 * right edge and the LED signboard hangs across the bottom.
 */
export default function Hero() {
  return (
    <section className="on-red bg-red text-chalk">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="flex flex-col justify-center px-5 py-14 sm:px-10 sm:py-16 md:col-span-7 md:py-20 md:pr-8 lg:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]">
          <h1 className="poster text-[clamp(3.75rem,13vw,7rem)] md:text-[clamp(4.5rem,9vw,9rem)]">
            From first
            <br />
            coffee to
            <br />
            last call.
          </h1>
          <p className="lede mt-8 max-w-md text-chalk">
            An all-day restaurant and bar on Diversion Road, Mandurriao,
            Iloilo City. Breakfast plates, food for the table, and a full bar
            once the evening starts.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/menu" className="btn btn-chalk">
              View the menu
            </Link>
            <a
              href={contact.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Get directions
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/3] md:col-span-5 md:aspect-auto md:min-h-[560px]">
          <Image
            src={heroImage}
            alt="The dining room at H Breakfast to Bar, with the hand-painted “Live Live Local Daily” mural"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-cover object-[25%_50%]"
          />
        </div>
      </div>

      <LedSign />
    </section>
  );
}
