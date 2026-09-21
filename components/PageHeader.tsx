export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="bg-ink text-paper">
      <div className="page-shell py-16 md:py-20">
        <h1 className="font-display text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-xl text-paper/65">{description}</p>
      </div>
    </section>
  );
}
