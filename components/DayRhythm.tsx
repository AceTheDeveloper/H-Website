import { dayRhythm } from "@/lib/data";

export default function DayRhythm() {
  return (
    <section className="bg-ink text-paper">
      <div className="page-shell py-20">
        <h2 className="font-display text-3xl sm:text-4xl">How the day moves</h2>
        <p className="mt-3 max-w-md text-paper/65">
          Same room, same staff, one menu that turns over as the day does.
        </p>

        <div className="mt-12 grid gap-8 border-t border-paper/15 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-paper/15">
          {dayRhythm.map((step) => (
            <div key={step.title} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
              <p className="font-display text-2xl text-red">{step.time}</p>
              <h3 className="mt-3 text-base font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
