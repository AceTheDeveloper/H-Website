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
    <section className="on-red bg-red text-chalk">
      <div className="page-shell flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center md:py-16">
        <div>
          <h2 className="poster text-5xl sm:text-6xl">{title}</h2>
          <p className="lede mt-4 max-w-md">{description}</p>
        </div>
        <Link href={href} className="btn btn-chalk shrink-0">
          {linkLabel}
        </Link>
      </div>
    </section>
  );
}
