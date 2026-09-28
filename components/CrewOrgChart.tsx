const crew = [
  {
    role: "Kitchen",
    note: "Breakfast, plates to share, pizza and pasta.",
  },
  {
    role: "Bar",
    note: "Cocktails, wine and beer from 9 pm to 2 am.",
  },
  {
    role: "Front of House",
    note: "The floor, the tables and the first hello.",
  },
  {
    role: "Coffee Bar",
    note: "Espresso and brews, first thing in the morning.",
  },
];

/**
 * A simple org chart standing in for headshots until the client sends real
 * names and photos — swap the tiles below for people once that's ready.
 */
export default function CrewOrgChart() {
  return (
    <div className="mt-14">
      <div className="flex justify-center">
        <div className="heading border-2 border-ink bg-ink px-8 py-4 text-center text-xl text-chalk sm:text-2xl">
          Owners &amp; Management
        </div>
      </div>

      <div className="mx-auto h-10 w-px bg-ink" aria-hidden />

      <div className="relative hidden lg:block">
        <div className="absolute left-[12.5%] right-[12.5%] top-0 h-px bg-ink" aria-hidden />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 pt-0 sm:grid-cols-2 lg:grid-cols-4 lg:pt-10">
        {crew.map((member) => (
          <div key={member.role} className="relative flex flex-col items-center text-center">
            <div className="hidden h-10 w-px bg-ink lg:-mt-10 lg:mb-0 lg:block" aria-hidden />
            <div className="heading w-full border-2 border-ink bg-chalk px-5 py-4 text-lg">
              {member.role}
            </div>
            <p className="mt-3 max-w-[16rem] text-sm text-ink/70">{member.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
