import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import MapEmbed from "@/components/MapEmbed";
import HoursTable from "@/components/HoursTable";
import LedSign from "@/components/LedSign";
import { contact } from "@/lib/data";
import { IconPhone, IconPin } from "@/components/Icons";
import storefront from "@/assets/about.jpg";
// import ReservationForm from "@/components/ReservationForm";

export const metadata: Metadata = {
  title: "Location & Hours",
  description:
    "Find H Breakfast to Bar on Diversion Road, Mandurriao, Iloilo City. Opening hours, phone number and directions.",
  alternates: { canonical: "/location" },
  openGraph: pageOpenGraph("/location"),
};

export default function LocationPage() {
  return (
    <>
      <PageHeader
        title="Find us on Diversion Road"
        description="Easy to spot, easy to walk into, any time of day."
      />
      <LedSign />

      <section className="band bg-chalk">
        <div className="page-shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <h2 className="heading text-4xl sm:text-5xl">Address and phone</h2>
            <address className="mt-6 space-y-3 not-italic">
              <p className="flex items-start gap-3 text-lg">
                <IconPin className="mt-1.5 h-5 w-5 shrink-0 text-brick" />
                {contact.address}
              </p>
              <p className="flex items-start gap-3 text-lg">
                <IconPhone className="mt-1.5 h-5 w-5 shrink-0 text-brick" />
                <a href={contact.phoneHref} className="text-link">
                  {contact.phone}
                </a>
              </p>
            </address>

            <h2 className="heading mt-14 text-4xl sm:text-5xl">Opening hours</h2>
            <HoursTable className="mt-6" />
            <p className="mt-4 text-ink/80">
              Breakfast plates are served all day. Pizza, pasta and quick bites
              start at 11:30 am, and the bar opens at 4 pm.
            </p>

            <a
              href={contact.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-10"
            >
              Get directions
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:col-span-7">
            <MapEmbed className="aspect-[4/3] md:aspect-[16/10]" />
            <figure className="relative aspect-[16/10] border-2 border-ink">
              <Image
                src={storefront}
                alt="The H Breakfast to Bar building, with the large red H sign above the entrance"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover object-[50%_30%]"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Reservations are switched off for now. Restore this block to bring the form back.
      <section id="reserve" className="scroll-mt-20 border-t-2 border-ink bg-plaster">
        <div className="band page-shell grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <h2 className="heading text-4xl sm:text-5xl">Request a table</h2>
            <p className="mt-5 text-ink/80">
              Send a request and we&apos;ll confirm by phone. For same-day
              bookings, calling ahead is faster.
            </p>
            <a href={contact.phoneHref} className="text-link mt-8 inline-block">
              Call {contact.phone}
            </a>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <ReservationForm />
          </div>
        </div>
      </section>
      */}
    </>
  );
}
