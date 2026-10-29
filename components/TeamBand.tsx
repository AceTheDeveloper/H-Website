import Image from "next/image";
import team from "@/assets/The_team.jpg";

/** The crew poster with its line. Shared by the home and about pages. */
export default function TeamBand() {
  return (
    <section className="border-y-2 border-ink bg-chalk py-12 md:py-16">
      <div className="page-shell grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <h2 className="poster text-[clamp(2.75rem,8vw,5.5rem)] text-brick">
            H runs on people
          </h2>
          <p className="lede mt-5 max-w-md text-ink/85">
            The same crew, from the first pour to last call.
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Image
            src={team}
            alt="Meet the team: Sha, shift supervisor; Miss Q, business manager; Earl, head barista; Jay, barista; Hero, junior server associate; Michael, CSR; Carl, head chef; Rhenz, creatives; Jill, carwash supervisor; Nash, HR and PR supervisor"
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full rounded-xl border border-ink/20"
          />
        </div>
      </div>
    </section>
  );
}
