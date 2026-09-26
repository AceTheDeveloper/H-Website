/**
 * Top of every inner page: a big poster headline on plaster, with the
 * supporting line set beside it on wide screens.
 */
export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="border-b-2 border-ink bg-plaster">
      <div className="page-shell grid grid-cols-1 gap-x-10 gap-y-6 py-14 md:grid-cols-12 md:items-end md:py-20">
        <h1 className="poster text-[clamp(3.25rem,10vw,7.5rem)] md:col-span-8">
          {title}
        </h1>
        <p className="lede text-ink/80 md:col-span-4 md:pb-2">{description}</p>
      </div>
    </section>
  );
}
