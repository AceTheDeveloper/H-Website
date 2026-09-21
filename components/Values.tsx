import Reveal from "./Reveal";

const values = [
  {
    title: "Cooked from scratch",
    description:
      "Sauces, dressings and bread are made in-house daily — nothing comes out of a bag.",
  },
  {
    title: "Sourced close by",
    description:
      "Produce and coffee come from growers and roasters within a few hours of the kitchen.",
  },
  {
    title: "One table, all day",
    description:
      "You can sit down for breakfast and still be there for last call — nobody rushes you.",
  },
  {
    title: "Behind the bar",
    description:
      "Our bartenders build the cocktail list the same way the kitchen builds the menu.",
  },
];

export default function Values() {
  return (
    <section className="section page-shell">
      <p className="eyebrow">What we care about</p>
      <h2 className="display mt-5 max-w-2xl text-3xl sm:text-4xl md:text-5xl">
        Simple food, made properly.
      </h2>
      <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, i) => (
          <Reveal key={value.title} delay={i * 100} className="border-t border-ink pt-6">
            <span className="text-sm font-semibold tracking-[0.2em] text-red">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-xl font-semibold">{value.title}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/65">
              {value.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
