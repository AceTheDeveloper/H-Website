export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-sand bg-cream">
      {/* Oversized brand mark, barely there — a quiet signature. */}
      <img
        src="/logo.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/2 hidden h-[130%] w-auto -translate-y-1/2 opacity-[0.06] md:block"
      />
      <div className="page-shell relative py-20 md:py-28">
        {eyebrow && <p className="eyebrow rise">{eyebrow}</p>}
        <h1
          className="display rise mt-5 max-w-3xl text-4xl sm:text-5xl md:text-6xl"
          style={{ animationDelay: "120ms" }}
        >
          {title}
        </h1>
        <p
          className="rise mt-6 max-w-xl text-ink/70"
          style={{ animationDelay: "240ms" }}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
