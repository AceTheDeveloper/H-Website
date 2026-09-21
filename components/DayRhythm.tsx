import { dayRhythm } from "@/lib/data";
import Reveal from "./Reveal";

export default function DayRhythm() {
  return (
    <section className="bg-espresso text-white">
      <div className="section page-shell">
        <Reveal>
          <p className="eyebrow !text-white/60">The rhythm of the day</p>
          <h2 className="display mt-5 max-w-2xl text-3xl sm:text-4xl md:text-5xl">
            Same room, same crew — the menu turns over as the day does.
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {dayRhythm.map((step, i) => (
            <li
              key={step.title}
              className="relative border-t border-white/20 pt-8"
            >
              <span className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full bg-red" />
              <Reveal delay={i * 120}>
                <p className="text-4xl font-light">{step.time}</p>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-white/65">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
