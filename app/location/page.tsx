import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import MapPlaceholder from "@/components/MapPlaceholder";
import HoursTable from "@/components/HoursTable";
import ReservationForm from "@/components/ReservationForm";
import { contact } from "@/lib/data";
import { IconPhone, IconPin } from "@/components/Icons";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Location & Hours — H Breakfast to Bar",
  description:
    "Find H Breakfast to Bar on Diversion Road, Mandurriao, Iloilo City. See our hours, get directions, or request a table.",
};
export default function LocationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Visit us"
        title="Find us on Diversion Road."
        description="Easy to spot, easy to walk into — any time of day."
      />

      <section className="section page-shell grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <MapPlaceholder />
        </Reveal>

        <Reveal delay={150}>
          <h2 className="display text-2xl sm:text-3xl">Details</h2>
          <div className="mt-6 space-y-3 text-ink/80">
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

          <h2 className="display mt-12 text-2xl sm:text-3xl">Hours</h2>
          <div className="mt-6">
            <HoursTable />
          </div>
          <p className="mt-4 text-sm text-ink/55">
            Breakfast served until 11:30am. Bar opens at 4pm daily.
          </p>

          <a
            href={contact.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-10"
          >
            Get directions
          </a>
        </Reveal>
      </section>

      <section
        id="reserve"
        className="scroll-mt-20 border-t border-sand bg-white"
      >
        <div className="section page-shell grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">Reservations</p>
            <h2 className="display mt-5 text-3xl sm:text-4xl">
              Request a table.
            </h2>
            <p className="mt-5 text-ink/70">
              Send a request and we&apos;ll confirm by phone. For same-day
              bookings, calling ahead is faster.
            </p>
            <a href={contact.phoneHref} className="link-arrow mt-8">
              Call {contact.phone}
            </a>
          </Reveal>
          <Reveal delay={150} className="md:col-span-7 md:col-start-6">
            <ReservationForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
