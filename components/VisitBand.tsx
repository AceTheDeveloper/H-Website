import Link from "next/link";
import Image from "next/image";
import HoursTable from "./HoursTable";
import { contact } from "@/lib/data";
import kitchen from "@/assets/kitchen.jpg";

/** Short "come and see us" band for the home page. The map lives on /location. */
export default function VisitBand() {
  return (
    <section className="on-dark border-t-2 border-white/20 bg-ink text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="px-5 py-12 sm:px-10 md:py-16 lg:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] lg:pr-16">
          <h2 className="heading max-w-md text-4xl sm:text-5xl">
            Find us on Diversion Road
          </h2>
          <address className="lede mt-6 not-italic text-white/85">
            {contact.address}
            <br />
            <a href={contact.phoneHref} className="text-link">
              {contact.phone}
            </a>
          </address>

          <HoursTable tone="dark" className="mt-7 max-w-md" />

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={contact.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Get directions
            </a>
            <Link href="/location" className="btn btn-outline">
              Map and hours
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px]">
          <Image
            src={kitchen}
            alt="The coffee bar at H Breakfast to Bar, with the red LED signs hanging above the counter"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
