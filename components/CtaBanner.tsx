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
    <section className="bg-red text-white">
      <div className="page-shell flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
        <div>
          <h2 className="display text-3xl sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-md text-white/85">{description}</p>
        </div>
        <Link href={href} className="btn btn-outline on-dark shrink-0">
          {linkLabel}
        </Link>
      </div>
    </section>
  );
}
