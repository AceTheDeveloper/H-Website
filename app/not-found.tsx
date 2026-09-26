import Link from "next/link";

export default function NotFound() {
  return (
    <section className="band bg-plaster">
      <div className="page-shell">
        <h1 className="poster text-[clamp(3.5rem,12vw,9rem)]">
          Wrong turn
          <br />
          on Diversion Road
        </h1>
        <p className="lede mt-8 max-w-md text-ink/80">
          That page doesn&apos;t exist. The menu, vouchers and directions are
          all one click away.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/menu" className="btn btn-ink">
            View the menu
          </Link>
        </div>
      </div>
    </section>
  );
}
