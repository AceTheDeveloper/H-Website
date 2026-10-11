import Link from "next/link";
import Image from "next/image";
import heroImage from "@/assets/guests-dining-3.jpg";
import { contact } from "@/lib/data";
import LedSign from "./LedSign";

/**
 * Red like the painted wall, lettered like it too. The room sits framed beside
 * the headline and the LED signboard hangs across the bottom.
 */
export default function Hero() {
  return (
    <section className="on-red bg-red text-chalk">
      <div className="page-shell grid grid-cols-1 items-center gap-10 py-10 md:py-14 lg:grid-cols-2 lg:gap-14">
        <div>
          <h1 className="poster text-[clamp(3rem,11vw,4.5rem)] md:text-[clamp(3.5rem,5.6vw,5rem)]">
            Everyday People
            <br />
            From Breakfast
            <br />
            To Bar
          </h1>
          <div className="mt-6 max-w-md space-y-1.5 text-lg text-chalk">
            <p>Every city moves to the rhythm of its people.</p>
            <p>Early mornings. Busy afternoons. Late nights.</p>
            <p>Different routines, different reasons, different stories.</p>
          </div>
          <p className="heading mt-5 text-2xl sm:text-3xl">
            H. For Our Local Heroes.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
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

        <div className="relative aspect-[4/3] border-2 border-ink">
          <Image
            src={heroImage}
            alt="Guests at their tables in the dining room at H Breakfast to Bar, with the coffee bar and red LED signs behind them"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-[50%_75%]"
          />
        </div>
      </div>

      <LedSign />
    </section>
  );
}
