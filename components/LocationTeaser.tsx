import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import MapPlaceholder from "@/components/MapPlaceholder";
import HoursTable from "@/components/HoursTable";
import ReservationForm from "@/components/ReservationForm";
import { contact } from "@/lib/data";
import { IconMail, IconPhone, IconPin } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Location — H Breakfast to Bar",
};

export default function LocationTeaser() {
  return (
    <>
      <PageHeader
        title="Find us"
        description="Corner spot with big windows — easy to spot, easy to walk into any time of day."
      />

      <section className="page-shell grid gap-10 py-16 md:grid-cols-2 md:gap-12">
        <MapPlaceholder />

        <div>
          <h2 className="font-display text-2xl">Details</h2>
          <div className="mt-5 space-y-3 text-sm">
            <p className="flex items-start gap-2.5">
              <IconPin className="w-5 h-5 mt-0.5 shrink-0 text-red" />{" "}
              {contact.address}
            </p>
            <p className="flex items-start gap-2.5">
              <IconPhone className="w-5 h-5 mt-0.5 shrink-0 text-red" />{" "}
              {contact.phone}
            </p>
            <p className="flex items-start gap-2.5">
              <IconMail className="w-5 h-5 mt-0.5 shrink-0 text-red" />{" "}
              {contact.email}
            </p>
          </div>

          <h2 className="mt-10 font-display text-2xl">Hours</h2>
          <div className="mt-5">
            <HoursTable />
          </div>
          <p className="mt-4 text-sm text-ink/50">
            Breakfast served until 11:30am. Bar opens at 4pm daily.
          </p>

          <h2 className="mt-10 font-display text-2xl">Getting here</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/65">
            Street parking is available out front, and there&apos;s a public car
            park two minutes&apos; walk away. We&apos;re a short walk from the
            nearest transit stop.
          </p>
        </div>
      </section>

      <section id="reserve" className="page-shell scroll-mt-24 pb-20">
        <h2 className="font-display text-2xl">Request a table</h2>
        <p className="mt-3 max-w-md text-sm text-ink/65">
          Send a request and we&apos;ll confirm by phone or email. For same-day
          bookings, calling ahead is faster.
        </p>
        {/* <div className="mt-6 max-w-2xl">
          <ReservationForm />
        </div> */}
      </section>
    </>
  );
}
