import Link from "next/link";
import Image from "next/image";
import heroImage from "@/assets/dining.jpg";
import { hours } from "@/lib/data";

export default function Hero() {
  return (
    <section className="bg-cream">
      <div className="page-shell grid items-stretch gap-10 py-10 md:grid-cols-12 md:gap-0 md:py-0 lg:min-h-[min(760px,calc(100svh-5rem))]">
        <div className="flex flex-col justify-center md:col-span-6 md:py-24 md:pr-16">
          <p className="eyebrow rise">
            Diversion Road · Mandurriao · Iloilo City
          </p>
          <h1
            className="display rise mt-6 text-[2.75rem] sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "120ms" }}
          >
            From first coffee
            <br />
            to <strong className="text-red">last call.</strong>
          </h1>
          <p
            className="rise mt-8 max-w-md text-lg text-ink/70"
            style={{ animationDelay: "260ms" }}
          >
            One kitchen, one room, the whole day. Eggs and coffee at sunrise,
            plates to share by afternoon, and a full bar once the lights come
            down.
          </p>
          <div
            className="rise mt-10 flex flex-wrap gap-4"
            style={{ animationDelay: "400ms" }}
          >
            <Link href="/menu" className="btn btn-primary">
              View the menu
            </Link>
            {/* <Link href="/location#reserve" className="btn btn-outline on-light">
              Reserve a table
            </Link> */}
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden md:col-span-6 md:my-10 md:min-h-0">
          <Image
            src={heroImage}
            alt="The dining room at H Breakfast to Bar, with the “Live Live Local Daily” mural"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="settle object-cover"
          />
          <div
            className="rise absolute bottom-0 left-0 bg-cream px-6 py-5 md:-left-px"
            style={{ animationDelay: "700ms" }}
          >
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-red">
              Open daily
            </p>
            <p className="mt-1 text-xl font-light">{hours[0].time}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
