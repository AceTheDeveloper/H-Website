import Link from "next/link";

export default function CtaBanner({
  title,
  description,
  href,
  linkLabel,
}: {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <section className="bg-red text-paper">
      <div className="page-shell flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-md text-paper/85">{description}</p>
        </div>
        <Link href={href} className="btn btn-outline on-dark shrink-0">
          {linkLabel}
        </Link>
      </div>
    </section>
  );
}
