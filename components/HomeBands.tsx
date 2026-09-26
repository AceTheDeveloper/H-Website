import Link from "next/link";
import Image from "next/image";
import DayBand from "./DayBand";
import MenuCard from "./MenuCard";
import { contact, featuredIds, hours, menu } from "@/lib/data";
import bar from "@/assets/bar.jpg";

function pick(ids: string[]) {
  return ids.flatMap((id) =>
    menu.flatMap((category) =>
      category.items
        .filter((item) => item.id === id)
        .map((item) => ({ item, label: category.label })),
    ),
  );
}

export function MorningBand() {
  return (
    <DayBand
      tone="plaster"
      time="6 AM"
      id="breakfast"
      title="Breakfast, all day"
      description="Pancakes, waffles, tapa and the Big Breakfast. Order them any time the kitchen is open."
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {pick(featuredIds.morning).map(({ item }) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
      <Link href="/menu#allday" className="text-link mt-12 inline-block">
        See all breakfast plates
      </Link>
    </DayBand>
  );
}

export function MiddayBand() {
  return (
    <DayBand
      tone="sand"
      time="11:30 AM"
      title="Plates to share"
      description="Pizza, pasta and quick bites start at 11:30 am, next to the Filipino sets and Asian plates made for the middle of the table."
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
        {pick(featuredIds.midday).map(({ item, label }) => (
          <MenuCard key={item.id} item={item} label={label} />
        ))}
      </div>
      <Link href="/menu" className="text-link mt-12 inline-block">
        View the full menu
      </Link>
    </DayBand>
  );
}

export function NightBand() {
  return (
    <section className="on-dark bg-ink text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[560px]">
          <Image
            src={bar}
            alt="Guests at their tables inside the bar at night, lit red"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="band px-5 sm:px-10 lg:px-16 xl:px-24">
          <p className="poster text-6xl text-[#ff6a48] sm:text-7xl">4 PM</p>
          <h2 className="heading mt-6 max-w-lg text-4xl sm:text-5xl md:text-6xl">
            After 4 pm, the bar takes over
          </h2>
          <p className="lede mt-5 max-w-md text-white/75">
            House cocktails, wine and beer join the food menu. Kitchen and bar
            run until closing.
          </p>
          <dl className="mt-10 max-w-md divide-y divide-white/20 border-y border-white/20">
            {hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-6 py-3">
                <dt>{h.day}</dt>
                <dd className="font-semibold">{h.time.replace(/^.* – /, "Until ")}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={contact.phoneHref} className="btn btn-primary">
              Call {contact.phone}
            </a>
            <Link href="/location" className="btn btn-outline">
              Find us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
