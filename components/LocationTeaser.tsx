import Link from "next/link";
import MapPlaceholder from "./MapPlaceholder";
import HoursTable from "./HoursTable";
import { contact } from "@/lib/data";
import { IconPhone, IconPin } from "./Icons";
import Reveal from "./Reveal";

export default function LocationTeaser() {
  return (
    <section className="border-t border-sand bg-white">
      <div className="section page-shell grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <MapPlaceholder />
        </Reveal>

        <Reveal delay={150} className="flex flex-col justify-center">
          <p className="eyebrow">Visit us</p>
          <h2 className="display mt-5 text-3xl sm:text-4xl md:text-5xl">
            Find us on Diversion Road.
          </h2>

          <div className="mt-8 space-y-3 text-ink/80">
            <p className="flex items-start gap-3">
              <IconPin className="mt-1 h-5 w-5 shrink-0 text-red" />
              {contact.address}
            </p>
            <p className="flex items-start gap-3">
              <IconPhone className="mt-1 h-5 w-5 shrink-0 text-red" />
              <a href={contact.phoneHref} className="hover:text-red">
                {contact.phone}
              </a>
            </p>
          </div>

          <div className="mt-8 max-w-md">
            <HoursTable />
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={contact.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Get directions
            </a>
            {/* <Link href="/location#reserve" className="btn btn-outline on-light">
              Reserve a table
            </Link> */}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
