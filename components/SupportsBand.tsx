const supports = ["H Run Club", "Local Heroes"];

/** Sits directly under the hero: the names H stands behind. */
export default function SupportsBand() {
  return (
    <section className="border-b-2 border-ink bg-sand py-12 md:py-16">
      <div className="page-shell">
        <h2 className="heading text-2xl sm:text-3xl">What H supports</h2>
        <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-4 border-t-2 border-ink pt-6 sm:grid-cols-2">
          {supports.map((name) => (
            <li
              key={name}
              className="poster text-[clamp(2.75rem,8vw,5.5rem)] text-brick"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
