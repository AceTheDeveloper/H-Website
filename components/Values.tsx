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
    <section className="page-shell py-20">
      <h2 className="font-display text-3xl sm:text-4xl">What we care about</h2>
      <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {values.map((value) => (
          <div key={value.title} className="border-t border-mist pt-5">
            <h3 className="text-base font-medium">{value.title}</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/65">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
