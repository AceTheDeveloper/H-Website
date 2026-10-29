const supports = [
  {
    name: "H Run Club",
    description:
      "Placeholder: community runs, shared miles, and meet-ups around Iloilo.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-8 w-8"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="31" cy="8" r="4" fill="currentColor" />
        <path
          d="m23 17 7-5 7 5 5 1M23 17l-5 9 8 4 5-7 6 8M18 26l-7 7m12-3-4 9m15-11-2 11"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </svg>
    ),
  },
  {
    name: "Local Heroes",
    description:
      "Placeholder: the people and neighborhood projects H is proud to support.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-8 w-8"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M24 41S6 31 6 18a9 9 0 0 1 17-4 9 9 0 0 1 19 4c0 13-18 23-18 23Z"
          fill="currentColor"
        />
        <path
          d="m24 19 2 4 4 .6-3 3 .7 4.2-3.7-2-3.7 2 .7-4.2-3-3 4-.6 2-4Z"
          fill="#E2D3BE"
        />
      </svg>
    ),
  },
];

/** Sits directly under the hero: the names H stands behind. */
export default function SupportsBand() {
  return (
    <section className="border-b-2 border-ink bg-sand py-12 md:py-16">
      <div className="page-shell">
        <h2 className="heading text-2xl sm:text-3xl">What H supports</h2>
        <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-4 border-t-2 border-ink pt-6 sm:grid-cols-2">
          {supports.map(({ name, description, icon }) => (
            <li
              key={name}
              className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 border-b border-ink/15 pb-5 last:border-0"
            >
              <span className="row-span-2 grid h-14 w-14 place-items-center rounded-full bg-[#f5b82e] text-ink">
                {icon}
              </span>
              <span className="poster text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] text-brick">
                {name}
              </span>
              {/* <span className="text-sm leading-relaxed text-ink/75 sm:text-base">
                {description}
              </span> */}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
