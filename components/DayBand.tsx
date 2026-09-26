const tones = {
  chalk: { surface: "bg-chalk text-ink", time: "text-brick", muted: "text-ink/75" },
  plaster: { surface: "bg-plaster text-ink", time: "text-brick", muted: "text-ink/75" },
  sand: { surface: "bg-sand text-ink", time: "text-brick", muted: "text-ink/80" },
  ink: { surface: "on-dark bg-ink text-white", time: "text-[#ff6a48]", muted: "text-white/75" },
  espresso: {
    surface: "on-dark bg-espresso text-white",
    time: "text-[#ff6a48]",
    muted: "text-white/75",
  },
} as const;

export type Tone = keyof typeof tones;

/**
 * One stretch of the day. The time on the left is real information: it is when
 * that part of the menu starts. Bands run light to dark down the page.
 */
export default function DayBand({
  time,
  title,
  description,
  tone,
  id,
  children,
}: {
  time: string;
  title: string;
  description?: string;
  tone: Tone;
  id?: string;
  children: React.ReactNode;
}) {
  const t = tones[tone];
  return (
    <section id={id} className={`band ${t.surface}`}>
      <div className="page-shell grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12">
        <p
          className={`poster whitespace-nowrap text-6xl sm:text-7xl lg:col-span-3 lg:text-6xl xl:text-7xl ${t.time}`}
        >
          {time}
        </p>
        <div className="lg:col-span-9">
          <h2 className="heading max-w-2xl text-4xl sm:text-5xl md:text-6xl">
            {title}
          </h2>
          {description && (
            <p className={`lede mt-5 max-w-xl ${t.muted}`}>{description}</p>
          )}
          <div className="mt-12">{children}</div>
        </div>
      </div>
    </section>
  );
}
